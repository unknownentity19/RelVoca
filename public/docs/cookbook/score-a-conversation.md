> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Score a conversation

> End a conversation, define a boolean evaluation, and score the transcript, reading back both the verdict and the reasoning behind it.

An evaluation turns a question about agent quality into a number you can track.
This recipe runs a conversation, ends it, defines a boolean evaluation, and
scores the resulting transcript, returning both the verdict and the model's
reasoning.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: score-a-conversation
#
# Turns "is the agent doing a good job" into a number: define a criterion, run
# it against a real conversation, and read the score back off the transcript.
#
# Required environment:
#   VF_PAT         personal access token (Settings -> Access tokens), vfp_..._...
#   VF_PROJECT_ID  the project ID (Settings -> General -> Metadata)
set -euo pipefail

: "${VF_PAT:?set VF_PAT to a personal access token from Settings -> Access tokens}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project ID from Settings -> General -> Metadata}"

BASE="https://realtime-api.voiceflow.com/v1/stable"
AUTH="Authorization: Bearer $VF_PAT"
ENVIRONMENT="${VF_ENVIRONMENT:-main}"

json() { tr -d '\000-\037'; }
fail() { echo "FAIL at $1" >&2; exit 1; }

# 1. An evaluation scores a conversation that ALREADY HAPPENED, so there has to
#    be one. Produce it, then wait: transcripts are written asynchronously and
#    searching straight after the turn returns nothing.
USER_ID="cookbook-$(date +%s)"
turn() {
  curl -sf -X PUT "$BASE/conversation/$USER_ID?projectID=$VF_PROJECT_ID&environmentAlias=$ENVIRONMENT" \
    -H "$AUTH" -H 'Content-Type: application/json' -d "$1"
}
turn '{"action":{"type":"launch"},"version":"published"}' > /dev/null \
  || fail "launch a conversation to score"

# An evaluation can only target a FINISHED conversation: running against a live
# one returns 400 "has not ended yet and cannot be targeted for evaluation".
# Sending the `end` action closes it and stamps endedAt. Deleting the
# conversation state does NOT - the state goes, the transcript stays open.
turn '{"action":{"type":"end"},"version":"published"}' > /dev/null \
  || fail "end the conversation"

TRANSCRIPT=""
for _ in $(seq 1 12); do
  TRANSCRIPT=$(curl -sf -X POST "$BASE/transcript/search?projectID=$VF_PROJECT_ID" \
    -H "$AUTH" -H 'Content-Type: application/json' -d '{"take":25}' \
    | json | jq -r --arg u "$USER_ID" '[.transcripts[] | select(.userID == $u and .endedAt != null)][0].id // empty') \
    || fail "search transcripts"
  [ -n "$TRANSCRIPT" ] && break
  sleep 2
done
[ -n "$TRANSCRIPT" ] || fail "no ENDED transcript for this conversation appeared after 24s"

# 2. Define the criterion. `type` decides the answer shape: `boolean` for a
#    yes/no judgement, `option` for one of a fixed set.
EVAL=$(curl -sf -X POST "$BASE/evaluation?projectID=$VF_PROJECT_ID" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"name\":\"cookbook-$(date +%s)\",\"type\":\"boolean\",\"enabled\":true,\"prompt\":\"Did the agent greet the user?\",\"truePrompt\":\"The agent greeted the user.\",\"falsePrompt\":\"The agent did not greet the user.\"}") \
  || fail "create the evaluation (422 naming truePrompt, falsePrompt or enabled means the boolean form needs all three - and none of them come back when you READ an evaluation, so the read shape is not a template for the write)"
EVAL_ID=$(echo "$EVAL" | jq -r '.evaluation.id')
[ -n "$EVAL_ID" ] || fail "evaluation create returned no id"

cleanup() { curl -sf -X DELETE "$BASE/evaluation/$EVAL_ID?projectID=$VF_PROJECT_ID" -H "$AUTH" > /dev/null 2>&1 || true; }
trap cleanup EXIT

# 3. Run it against the one transcript. The transcript is named in the BODY;
#    the evaluation is in the path.
RUN=$(curl -sf -X POST "$BASE/evaluation/$EVAL_ID/run?projectID=$VF_PROJECT_ID" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"transcriptID\":\"$TRANSCRIPT\"}") \
  || fail "run the evaluation against transcript $TRANSCRIPT"

# 4. The score comes back FROM THE RUN, synchronously - `value` is the verdict
#    and `reason` is the model's justification. There is nothing to poll for.
echo "$RUN" | jq -e '.result.value != null' > /dev/null \
  || fail "the run returned no result value"
echo "$RUN" | jq -e '.result.reason | type == "string"' > /dev/null \
  || fail "the run returned no reason"
echo "$RUN" | jq -e --arg t "$TRANSCRIPT" '.result.transcriptID == $t' > /dev/null \
  || fail "the result names a different transcript"

# The same score is also written onto the transcript, alongside whatever
# default evaluations the project runs automatically. Note the key there is
# `id`, not `evaluationID`.
SCORED=$(curl -sf "$BASE/transcript/$TRANSCRIPT?projectID=$VF_PROJECT_ID" -H "$AUTH" \
  | json | jq -c --arg e "$EVAL_ID" '[.transcript.evaluations[]? | select(.id == $e)][0] // "not yet on the transcript"') \
  || fail "refetch the transcript"

trap - EXIT
curl -sf -X DELETE "$BASE/evaluation/$EVAL_ID?projectID=$VF_PROJECT_ID" -H "$AUTH" > /dev/null || fail "delete the evaluation"

echo "ok: scored transcript $TRANSCRIPT with evaluation $EVAL_ID -> value=$(echo "$RUN" | jq -c '.result.value'), cost=$(echo "$RUN" | jq -r '.result.cost'), reason: $(echo "$RUN" | jq -r '.result.reason' | head -c 90)..."
```

## How it works

* [Create evaluation](/docs/api-reference/evaluation/create-evaluation) defines the
  criterion. A `boolean` evaluation needs `prompt`, `truePrompt`, `falsePrompt`,
  and `enabled`: the two branch prompts tell the judging model what each verdict
  means.
* An evaluation can only score a **finished** conversation. Sending an `end`
  action closes it; deleting the conversation state does not, because the state
  and the transcript are different things.
* [Run evaluation](/docs/api-reference/evaluation/run-evaluation) returns the score
  **synchronously**, in the run response itself. There is nothing to poll for.
* The result carries `reason` alongside `value`, so a score always comes with
  the justification behind it. That is what makes a failing score actionable.
* Scores are also written onto the transcript, next to whichever default
  evaluations the project runs automatically. See the
  [Insights section](/docs/api-reference/sections/insights).

## When it fails

| Symptom                                                       | Cause                                                                 | Fix                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `400 has not ended yet and cannot be targeted for evaluation` | The transcript is still open                                          | Send `{"action": {"type": "end"}}` to the same `userID` and wait for `endedAt` |
| Deleting the conversation state does not end the transcript   | State and transcript have separate lifecycles                         | Use the `end` action                                                           |
| `422` creating a boolean evaluation                           | `truePrompt`, `falsePrompt`, or `enabled` was omitted                 | All three are required alongside `prompt`                                      |
| The score never appears on the transcript                     | You looked for `evaluationID` in the transcript's `evaluations` array | Entries there are keyed by `id`                                                |
| The run returns a result but you polled anyway                | The verdict is in the run response                                    | Read `.result.value` and `.result.reason` from the `POST`                      |
