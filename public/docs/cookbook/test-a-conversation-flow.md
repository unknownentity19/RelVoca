> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a regression test

> Build a regression test from a user turn, an agent turn, and two kinds of check, then run it and poll for the number of checks that passed.

A regression test replays a scripted conversation and asserts what the agent
does, so a prompt change that breaks a scenario fails loudly. This recipe
builds one from a user turn, an agent turn, and two kinds of check, then runs
it and reads the verdict.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Build a regression test from turns and checks, then run it.
set -euo pipefail

: "${VF_PAT:?set VF_PAT to a personal access token}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project to test}"

BASE="https://realtime-api.voiceflow.com/v1/stable"
AUTH="Authorization: Bearer $VF_PAT"
ENVIRONMENT="${VF_ENVIRONMENT:-main}"
Q="projectID=$VF_PROJECT_ID&environmentAlias=$ENVIRONMENT"

fail() { echo "FAIL at $1" >&2; exit 1; }
json() { tr -d '\000-\037'; }

post() {
  curl -sf -X POST "$BASE/$1?$Q" -H "$AUTH" -H 'Content-Type: application/json' -d "$2" | json
}

# 1. A test is the container. Turns hang off it, checks hang off a turn.
TEST_ID=$(post test '{"name":"Cookbook: greeting regression"}' \
  | jq -er '.test.id') \
  || fail "create the test (a 401 here means VF_PAT is wrong)"

cleanup() { curl -sf -X DELETE "$BASE/test/$TEST_ID?$Q" -H "$AUTH" > /dev/null || true; }
trap cleanup EXIT

# 2. A user turn is what the person SAYS. `response` holds the utterance, and
#    `variableStates` seeds variables for the turn - an empty array means
#    "whatever the agent starts with".
USER_TURN=$(post test-turn "$(jq -nc --arg t "$TEST_ID" \
  '{testID:$t, type:"user", payload:{response:"Hi, what can you help me with?", variableStates:[]}}')" \
  | jq -er '.turn.id') \
  || fail "add the user turn"

# 3. An agent turn is where you ASSERT. It carries no expected text of its own:
#    the assertions are checks attached to it. `sequential` controls whether its
#    checks must hold in order.
AGENT_TURN=$(post test-turn "$(jq -nc --arg t "$TEST_ID" \
  '{testID:$t, type:"agent", payload:{sequential:false}}')" \
  | jq -er '.turn.id') \
  || fail "add the agent turn"

# 4. Two kinds of assertion on a response, and the choice matters:
#      equal    - exact string match. Brittle against a model, right for a
#                 scripted reply.
#      llm_eval - a model judges the reply against a prompt. Use this for
#                 anything an agent phrases freely.
CHECK_LLM=$(post test-check "$(jq -nc --arg t "$AGENT_TURN" \
  '{type:"response", turnID:$t, payload:{type:"llm_eval", prompt:"The reply greets the user and offers help."}}')" \
  | jq -er '.check.id') \
  || fail "add the llm_eval check"

# `routing` and `tool` checks assert BEHAVIOUR rather than text - that the agent
# handed off to a given playbook, or called a given tool.
post test-check "$(jq -nc --arg t "$AGENT_TURN" \
  '{type:"response", turnID:$t, payload:{type:"equal", value:"Hi there! I am here to help with Acme Corp support."}}')" \
  | jq -e '.check.id' > /dev/null \
  || fail "add the equal check"

# 5. Running is ASYNCHRONOUS. The POST returns status "idle" with
#    passedChecks: null - the verdict is not in that response, so poll for it.
RUN_ID=$(post test-run "$(jq -nc --arg t "$TEST_ID" '{testID:$t}')" \
  | jq -er '.run.id') \
  || fail "start the run"

for _ in $(seq 1 20); do
  RUN=$(curl -sf "$BASE/test-run/$RUN_ID?$Q" -H "$AUTH" | json) \
    || fail "poll the run"
  STATUS=$(echo "$RUN" | jq -r '.run.status')
  # Break on anything that is NOT still pending, rather than listing the
  # terminal states. A run that ends "failed" is terminal, and an allow-list
  # that omits one state polls for the full timeout before noticing.
  case "$STATUS" in
    idle | running) ;;
    *) break ;;
  esac
  sleep 3
done

case "$STATUS" in
  idle | running) fail "the run was still $STATUS after 60s" ;;
esac

# 6. A finished run reports how many checks passed out of how many ran. Note
#    that a FAILING test is a successful API call: the run completing and the
#    checks passing are different questions, and CI should key on the second.
echo "$RUN" | jq -e '.run.passedChecks != null' > /dev/null \
  || fail "the run finished with no check results"

TOTAL=$(echo "$RUN" | jq -r '.run.totalChecks')
PASSED=$(echo "$RUN" | jq -r '.run.passedChecks')
[ "$TOTAL" = "2" ] || fail "expected 2 checks on the run, got $TOTAL"

# This test is BUILT to half-fail, and that is the lesson: the llm_eval check
# passes because the agent did greet and offer help, while the equal check
# fails on wording no one can predict. Assert the run's own verdict rather than
# a green light - if both passed here, the exact-match check would be matching
# by luck.
[ "$PASSED" -ge 1 ] || fail "no check passed - the agent did not greet at all"

trap - EXIT
cleanup

echo "ok: test $TEST_ID ran as $RUN_ID -> status=$STATUS, $PASSED/$TOTAL checks passed (llm_eval $CHECK_LLM on turn $AGENT_TURN, after user turn $USER_TURN)"
```

## How it works

* [Create test](/docs/api-reference/test/create-test) makes the container. Turns
  belong to a test, and checks belong to a turn, so the three build a
  hierarchy rather than a flat list.
* [Create turn](/docs/api-reference/test-turn/create-turn) adds either side of the
  conversation. A `user` turn carries the utterance in `payload.response`; an
  `agent` turn carries no expected text at all, only a `sequential` flag
  controlling whether its checks must hold in order.
* [Create check](/docs/api-reference/test-check/create-check) is where the assertion
  lives. A `response` check compares what the agent said, while `routing` and
  `tool` checks assert behaviour: that it handed off to a given playbook, or
  called a given tool.
* A response check is `equal` or `llm_eval`. Use `equal` for a scripted reply
  and `llm_eval` for anything the agent phrases freely, since exact matching
  against a model is a test that fails on rewording alone.
* [Create run](/docs/api-reference/test-run/create-run) starts execution and returns
  immediately with `status: "idle"`. Poll
  [get run](/docs/api-reference/test-run/get-run) for the verdict.

## When it fails

| Symptom                                                       | Cause                                                         | Fix                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| `422` naming `payload.response`                               | A user turn was sent with `message` instead                   | The field is `response`, alongside `variableStates`        |
| `422` naming `payload.sequential`                             | An agent turn omitted the flag                                | Send `{"sequential": false}` unless the checks are ordered |
| `Invalid discriminator value. Expected 'equal' \| 'llm_eval'` | A response check used a type such as `contains`               | Only those two exist                                       |
| `passedChecks` is `null`                                      | The run has not finished                                      | Poll until `status` leaves `idle` and `running`            |
| An `equal` check fails on a correct answer                    | The agent reworded a reply no one pinned                      | Use `llm_eval` for generated text                          |
| The run polls for the full timeout                            | The status allow-list omits a terminal state such as `failed` | Break on anything that is not `idle` or `running`          |
