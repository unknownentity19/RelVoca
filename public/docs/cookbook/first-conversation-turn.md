> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run your first conversation turn

> Start a session, launch the conversation, and send a user message with three curl calls, reading the traces the agent returns at each step.

Running a conversation over the API takes two calls: launch the agent, then
send what the user said. A conversation is identified by the `userID` in the
path, so there is no session to create and nothing to thread between calls.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: first-conversation-turn
#
# Runs a real conversation against a RelVoca agent over the REST API: launch
# it, then send a user message, reading the traces returned at each step.
#
# Required environment:
#   VF_PAT         personal access token (Settings -> Access tokens), vfp_..._...
#   VF_PROJECT_ID  the project ID (Settings -> General -> Metadata)
set -euo pipefail

: "${VF_PAT:?set VF_PAT to a personal access token from Settings -> Access tokens}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project ID}"

BASE="https://realtime-api.voiceflow.com/v1/stable"
ENVIRONMENT="${VF_ENVIRONMENT:-main}"

# A conversation is identified by the userID in the path. There is no separate
# session to create: the first call starts one, and later calls with the same
# userID continue it.
USER_ID="cookbook-$(date +%s)"

# The runtime can emit raw control characters inside trace payload strings,
# which strict JSON parsers reject. Strip them before jq.
json() { tr -d '\000-\037'; }

# The runner keys on this prefix to tell a product change (exit 20) from a
# broken script (exit 30). Always route step failures through it.
fail() { echo "FAIL at $1" >&2; exit 1; }

send() {
  curl -sf -X PUT "$BASE/conversation/$USER_ID?projectID=$VF_PROJECT_ID&environmentAlias=$ENVIRONMENT" \
    -H "Authorization: Bearer $VF_PAT" \
    -H "Content-Type: application/json" \
    -d "$1"
}

# 1. Launch the conversation. `version` selects the draft or the published
#    build of the environment, so the same call can exercise either.
LAUNCH=$(send '{ "action": { "type": "launch" }, "version": "published" }') \
  || fail "launch the conversation (a 401 here means the token is wrong or expired; a 400 saying 'invalid environment tag' means the environmentAlias does not exist on this project)"
printf '%s' "$LAUNCH" | json | jq -e '.traces | length > 0' > /dev/null \
  || fail "launch returned no traces"

# 2. Send a user message to the SAME userID. The agent picks up where the
#    launch left off - nothing needs to be threaded through by hand.
REPLY=$(send '{ "action": { "type": "text", "payload": "What can you help me with?" }, "version": "published" }') \
  || fail "send a user message"
printf '%s' "$REPLY" | json | jq -e '.traces | length > 0' > /dev/null \
  || fail "reply returned no traces"

# 3. The agent's words arrive as `text` traces. Assert one came back, so the
#    recipe proves a real answer rather than just a 200.
printf '%s' "$REPLY" | json | jq -e '[.traces[] | select(.type == "text")] | length > 0' > /dev/null \
  || fail "reply contained no text trace (a voice agent answers with speak instead)"

echo "ok: launch returned $(printf '%s' "$LAUNCH" | json | jq '.traces | length') trace(s), reply returned $(printf '%s' "$REPLY" | json | jq '.traces | length') trace(s), types: $(printf '%s' "$REPLY" | json | jq -c '[.traces[].type] | unique')"
```

## How it works

* The `userID` in the path IS the conversation. Call the same path again and
  the agent picks up where it left off; call it with a new `userID` and you get
  a fresh conversation.
* `action` is what the user did. `launch` starts the agent from its entry
  point, `text` sends something they typed. The full set is in the
  [trace reference](/docs/api-reference/trace-types).
* `version` chooses which build answers: `published` runs the live version of
  the environment, `draft` runs what you are currently editing. A project that
  has never been published has no published build yet, so use `draft` until
  the first publish.
* The response is an array of [traces](/docs/api-reference/trace-types) describing
  what the agent did. `text` carries the words a chat agent said; a voice agent
  answers with `speak` instead.
* `environmentAlias` names the environment to run. New projects start with
  `main`.

## When it fails

| Symptom                                                | Cause                                                                           | Fix                                                                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `401`                                                  | The token is missing, wrong, or expired                                         | Personal access tokens expire, up to a maximum of a year. Create a new one under **Settings** → **Access tokens** |
| `400 invalid environment tag`                          | The `environmentAlias` does not exist on this project                           | List the real ones with `GET /v1/stable/environment?projectID=...`. New projects use `main`, not `production`     |
| Launch fails or returns nothing on a brand new project | The environment has never been published, so there is no published build to run | Send `"version": "draft"`, which runs what you are editing and works on a fresh project                           |
| `jq` reports invalid JSON                              | The runtime emits raw control characters inside trace payload strings           | Strip them before parsing, as this recipe does with `tr -d '\000-\037'`                                           |
| Traces come back but none is `text`                    | The agent replied with audio                                                    | A voice agent answers with `speak`; assert on that instead                                                        |
