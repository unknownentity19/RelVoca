> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream a response token by token

> Consume the server-sent event stream from POST /v4/interact/stream with curl, reassemble the reply from completion deltas, and verify it arrives incrementally.

`POST /v4/interact/stream` answers with server-sent events instead of JSON, so
your interface can show the agent's reply while the model is still writing it.
Each frame is one trace, and the stream closes with a single `end` event.

This recipe opens a session, streams a turn with `completionEvents` on,
reassembles the reply from the token deltas, and checks that the frames really
did arrive one at a time rather than in a single buffered lump. It needs
nothing but `curl` and `jq`.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: stream-a-response
#
# Consumes /v4/interact/stream, which answers with server-sent events rather
# than JSON: one `event: trace` frame per trace, then a final `event: end`.
# Proves the frames arrive incrementally by stamping each one with the second
# it was read in, and reassembles the agent's reply from the token deltas.
#
# Required environment:
#   VF_API_KEY     project API key (Settings -> API keys), VF.DM....
#   VF_PROJECT_ID  the project ID (Settings -> General -> Metadata)
set -euo pipefail

: "${VF_API_KEY:?set VF_API_KEY to a project API key}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project ID}"

BASE="https://general-runtime.voiceflow.com"
USER_ID="cookbook-$(date +%s)"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# The runtime can emit raw control characters inside trace payload strings,
# which strict JSON parsers reject. Strip them before jq.
json() { tr -d '\000-\037'; }

fail() { echo "FAIL at $1" >&2; exit 1; }

# 1. Start a session. Authenticates with the PROJECT API KEY.
SESSION=$(curl -sf -X POST "$BASE/v4/project/$VF_PROJECT_ID/session" \
  -H "Authorization: $VF_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{ \"userID\": \"$USER_ID\" }") || fail "start session (a 401 here means the API key is wrong)"
SESSION_KEY=$(printf '%s' "$SESSION" | json | jq -er '.sessionKey') || fail "no sessionKey in the response"

# 2. Launch the conversation, streamed. Every call below authenticates with
#    the SESSION KEY, never the API key.
curl -sfN -X POST "$BASE/v4/interact/stream" \
  -H "Authorization: $SESSION_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "action": { "type": "launch" } }' > "$WORK/launch" \
  || fail "launch (a 401 here means the API key was sent where the session key belongs)"
grep -q '^event: end$' "$WORK/launch" || fail "the launch stream never sent its end event"

# 3. Send a user message. `completionEvents` asks the runtime to emit the
#    generated text token by token instead of one finished text trace.
#
#    Read the body line by line as it arrives, stamping each line with the
#    seconds elapsed since the request went out. SECONDS is a shell builtin,
#    so the stamp costs no subprocess and cannot itself delay the read.
SECONDS=0
curl -sfN -D "$WORK/headers" -X POST "$BASE/v4/interact/stream" \
  -H "Authorization: $SESSION_KEY" \
  -H "Content-Type: application/json" \
  -d '{
        "action": { "type": "text", "payload": "In a few sentences, what can you help me with?" },
        "config": { "completionEvents": true }
      }' \
  | while IFS= read -r line; do printf '%s %s\n' "$SECONDS" "$line"; done > "$WORK/turn" \
  || fail "stream the turn (a 401 here means the API key was sent where the session key belongs)"

grep -qi '^content-type: text/event-stream' "$WORK/headers" \
  || fail "the response was not an event stream (check the Content-Type header)"

# Each frame is three lines - `event: <name>`, `id: <n>`, `data: <json>` -
# followed by a blank line. Split the stamp back off before parsing.
BODY=$(cut -d' ' -f2- < "$WORK/turn")
EVENTS=$(printf '%s\n' "$BODY" | sed -n 's/^event: //p')
FRAMES=$(printf '%s\n' "$BODY" | sed -n 's/^data: //p' | json | jq -s '.') \
  || fail "a data: line was not a complete JSON document"

printf '%s\n' "$EVENTS" | grep -qx 'trace' || fail "the stream carried no trace events"
printf '%s\n' "$EVENTS" | tail -1 | grep -qx 'end' || fail "the stream did not terminate with an end event"

# The generated text arrives as completion traces: one `start`, many
# `content` deltas, one `end`. Reassembling them is the whole point.
printf '%s' "$FRAMES" | jq -e 'map(select(.type == "completion") | .payload.state) | index("start") != null and index("end") != null' > /dev/null \
  || fail "no completion trace pair (state start .. end) in the stream"
DELTAS=$(printf '%s' "$FRAMES" | jq '[.[] | select(.type == "completion" and .payload.state == "content")] | length')
[ "$DELTAS" -gt 1 ] || fail "expected many content deltas, got $DELTAS (is completionEvents set in the request BODY?)"
REPLY=$(printf '%s' "$FRAMES" | jq -rj '.[] | select(.type == "completion" and .payload.state == "content") | .payload.content')
[ -n "$REPLY" ] || fail "the reassembled reply was empty"

# A turn that exhausted the workspace's credits reports it as a debug trace,
# not as a transport error. Catch it here rather than shipping a blank reply.
if printf '%s' "$FRAMES" | jq -e 'any(.[]; tostring | test("credit_limit_reached"))' > /dev/null; then
  fail "the turn hit the workspace credit limit"
fi

# Incremental delivery is the claim this endpoint makes. If the response were
# buffered, every frame would be read in the same second.
FIRST=$(head -1 "$WORK/turn" | cut -d' ' -f1)
LAST=$(tail -1 "$WORK/turn" | cut -d' ' -f1)
SPREAD=$((LAST - FIRST))
[ "$SPREAD" -ge 1 ] || fail "every frame arrived in the same second, which is what a buffered response looks like"

echo "ok: $(printf '%s\n' "$EVENTS" | grep -cx trace) trace event(s) over ${SPREAD}s, $DELTAS content deltas reassembling to ${#REPLY} characters, types: $(printf '%s' "$FRAMES" | jq -c '[.[] | .type // empty] | unique')"
```

## How it works

* [Interact (stream)](/docs/api-reference/v4interact/interact-stream) sends one
  `event: trace` frame per trace and closes with a single `event: end`, whose
  `data` is an empty object.
* The frames carry the same [trace types](/docs/api-reference/trace-types) that the
  non-streaming endpoint returns as an array, so a renderer written for one
  works for the other.
* `config.completionEvents` replaces the finished `text` trace with
  `completion` deltas. [Completion events](/docs/api-reference/conversations-api/completion-events)
  describes the `start`, `content`, and `end` states you stitch back together.
* Every streamed request authorizes with the session key from
  [start session](/docs/api-reference/v4interact/start-session-specific-environment),
  never with the project API key. See
  [Authentication](/docs/api-reference/authentication).
* If you only need the finished reply, the non-streaming endpoint is simpler:
  see [Run your first conversation turn](/docs/cookbook/first-conversation-turn).

## When it fails

| Symptom                                                 | Cause                                                                                       | Fix                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `?completion_events=true` changes nothing               | On `/v4/interact/stream` the flag is read from the request body, not the query string       | Send `"config": { "completionEvents": true }`                               |
| One `text` trace where you expected `completion` deltas | Only generated text streams token by token. A reply from a fixed Message step arrives whole | See [Completion events](/docs/api-reference/conversations-api/completion-events) |
| `401` with a JSON body on a stream request              | You passed the project API key instead of the session key                                   | Pass the `sessionKey` from the start session call                           |
| Your SSE parser emits an empty first frame              | The response body opens with a blank line before the first `event:` field                   | Ignore frames that carry no `event:` field                                  |
| Every frame lands at the same moment                    | Something between you and the runtime buffered the response                                 | Disable buffering in your client. `curl` needs `-N`                         |
| Your JSON parser rejects a `data:` line                 | Trace payload strings can carry raw control characters, which strict parsers reject         | Strip `\000`-`\037` before parsing, as the recipe's `json()` helper does    |
