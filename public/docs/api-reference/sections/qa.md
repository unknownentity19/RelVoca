> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# QA overview

> Replay scripted conversations against your agent and assert what it does, so a change that breaks a scenario fails loudly instead of silently.

A test is a conversation you have written down, together with the assertions
that must hold when it runs. Execute it after a change and a broken scenario
fails immediately, instead of surfacing later in production.

## Endpoints

### Test

| Endpoint                                                                                              | Description                   |
| ----------------------------------------------------------------------------------------------------- | ----------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List tests](/docs/api-reference/test/list-tests)               | List all tests by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create test](/docs/api-reference/test/create-test)             | Create a new test.            |
| <Badge color="blue" size="sm">POST</Badge> [Create many tests](/docs/api-reference/test/create-many-tests) | Create multiple new tests.    |
| <Badge color="green" size="sm">GET</Badge> [Get test](/docs/api-reference/test/get-test)                   | Get a test by ID.             |
| <Badge color="orange" size="sm">PATCH</Badge> [Update test](/docs/api-reference/test/update-test)          | Update a test by ID.          |
| <Badge color="red" size="sm">DELETE</Badge> [Delete test](/docs/api-reference/test/delete-test)            | Delete a test by ID.          |

### Test turn

| Endpoint                                                                                                   | Description                |
| ---------------------------------------------------------------------------------------------------------- | -------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List turns](/docs/api-reference/test-turn/list-turns)               | List all turns by test ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create turn](/docs/api-reference/test-turn/create-turn)             | Create a new turn.         |
| <Badge color="blue" size="sm">POST</Badge> [Create many turns](/docs/api-reference/test-turn/create-many-turns) | Create multiple new turns. |
| <Badge color="green" size="sm">GET</Badge> [Get turn](/docs/api-reference/test-turn/get-turn)                   | Get a turn by ID.          |
| <Badge color="orange" size="sm">PATCH</Badge> [Update turn](/docs/api-reference/test-turn/update-turn)          | Update a turn by ID.       |
| <Badge color="red" size="sm">DELETE</Badge> [Delete turn](/docs/api-reference/test-turn/delete-turn)            | Delete a turn by ID.       |

### Test check

| Endpoint                                                                                                      | Description                 |
| ------------------------------------------------------------------------------------------------------------- | --------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List checks](/docs/api-reference/test-check/list-checks)               | List all checks by turn ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create check](/docs/api-reference/test-check/create-check)             | Create a new check.         |
| <Badge color="blue" size="sm">POST</Badge> [Create many checks](/docs/api-reference/test-check/create-many-checks) | Create multiple new checks. |
| <Badge color="green" size="sm">GET</Badge> [Get check](/docs/api-reference/test-check/get-check)                   | Get a check by ID.          |
| <Badge color="orange" size="sm">PATCH</Badge> [Update check](/docs/api-reference/test-check/update-check)          | Update a check by ID.       |
| <Badge color="red" size="sm">DELETE</Badge> [Delete check](/docs/api-reference/test-check/delete-check)            | Delete a check by ID.       |

### Test run

| Endpoint                                                                                                | Description                |
| ------------------------------------------------------------------------------------------------------- | -------------------------- |
| <Badge color="blue" size="sm">POST</Badge> [Search runs](/docs/api-reference/test-run/search-runs)           | Search runs by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create run](/docs/api-reference/test-run/create-run)             | Create a new run.          |
| <Badge color="blue" size="sm">POST</Badge> [Create many runs](/docs/api-reference/test-run/create-many-runs) | Create multiple new runs.  |
| <Badge color="green" size="sm">GET</Badge> [Get run](/docs/api-reference/test-run/get-run)                   | Get a run by ID.           |

## Four resources, one idea

| Resource       | What it is                                                  |
| -------------- | ----------------------------------------------------------- |
| **Test**       | the scenario: a named conversation you want to keep working |
| **Test turn**  | one exchange inside it, in order                            |
| **Test check** | an assertion about what the agent should do                 |
| **Test run**   | one execution of a test, and its result                     |

A test is the container. Turns are the script. Checks are what must be true.
Runs are what happened each time you executed it.

Turns and checks are managed independently of the test, so you can add a check
to an existing scenario without rewriting the conversation, or extend the
conversation without touching the assertions.

## Creating a suite

Each resource has a `batch` endpoint, which is what you want when defining a
suite from a file rather than clicking through it:

```bash theme={null}
curl -X POST "https://realtime-api.voiceflow.com/v1/stable/test/batch?projectID=$VF_PROJECT_ID&environmentAlias=main" \
  -H "Authorization: Bearer $VF_PAT" \
  -H "Content-Type: application/json" \
  -d '{ "data": [ ... ] }'
```

## Reading results

Runs are searchable rather than merely listable, so the useful question is not
"what ran" but "what failed, and since when". Search runs, then fetch the ones
you care about.

## How this differs from evaluations

These are different jobs and it is worth keeping them apart.
QA replays conversations *you* wrote and fails when the agent stops behaving as
decided. [Insights](/docs/api-reference/sections/insights) scores conversations *real
users* had, and tells you how it is going. One protects against regressions; the
other finds things you did not think to test.

## Where to go next

Run tests against a cloned [environment](/docs/api-reference/sections/publishing)
before merging into `main`, so a failing check blocks the change rather than
reporting on it afterwards.
