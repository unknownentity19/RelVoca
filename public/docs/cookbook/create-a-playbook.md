> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create and edit a playbook

> Create a playbook over HTTP, read it back, patch its instructions, and delete it: the full lifecycle every Build resource follows.

A playbook is the agentic half of a RelVoca agent: instructions that drive
toward a goal rather than a fixed path through a canvas. This recipe creates
one over HTTP, reads it back, edits its instructions, and deletes it, which is
the full lifecycle of any resource in the Build section.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: create-a-playbook
#
# Builds one of an agent's parts from outside the Studio: create a playbook,
# read it back, change its instructions, then remove it. The same shape works
# for functions, tools and variables.
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
Q="projectID=$VF_PROJECT_ID&environmentAlias=$ENVIRONMENT"

fail() { echo "FAIL at $1" >&2; exit 1; }

# Every build endpoint is scoped to BOTH a project and an environment: the same
# project's draft and its other environments hold different playbooks.
NAME="cookbook-$(date +%s)"

# 1. Create. Only `name` is required - everything else has a default, so the
#    smallest useful create is one field.
CREATED=$(curl -sf -X POST "$BASE/playbook?$Q" -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"name\":\"$NAME\",\"description\":\"Created by the RelVoca cookbook\",\"instructions\":[\"Answer the user question in one sentence.\"]}") \
  || fail "create the playbook (422 'expected array, received string' means instructions was sent as a string - it is an ARRAY of lines; 400 'invalid environment tag' means environmentAlias does not exist on this project)"

ID=$(echo "$CREATED" | jq -r '.playbook.id')
echo "$CREATED" | jq -e '.playbook.id | type == "string"' > /dev/null \
  || fail "create returned no playbook id"

# Clean up even if a later step fails, so a broken run does not leave objects
# behind in the project.
cleanup() { curl -sf -X DELETE "$BASE/playbook/$ID?$Q" -H "$AUTH" > /dev/null 2>&1 || true; }
trap cleanup EXIT

# 2. Read it back. Creating and then re-reading is what proves the write landed
#    in the environment you meant, rather than merely that the call returned.
FETCHED=$(curl -sf "$BASE/playbook/$ID?$Q" -H "$AUTH") \
  || fail "read the playbook back"
echo "$FETCHED" | jq -e --arg n "$NAME" '.playbook.name == $n' > /dev/null \
  || fail "the playbook read back under a different name"

# 3. Update. PATCH returns a confirmation message, NOT the updated object, so
#    anything holding the old copy has to refetch.
UPDATED=$(curl -sf -X PATCH "$BASE/playbook/$ID?$Q" -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"instructions":["Answer in one sentence.","Then offer to go deeper."]}') \
  || fail "update the playbook"
echo "$UPDATED" | jq -e '.message | type == "string"' > /dev/null \
  || fail "update returned no confirmation message"

REFETCHED=$(curl -sf "$BASE/playbook/$ID?$Q" -H "$AUTH") || fail "refetch after update"
echo "$REFETCHED" | jq -e '[.playbook.instructions[] | select(test("go deeper"))] | length > 0' > /dev/null \
  || fail "the update did not stick"

# 4. Delete, and prove it is gone rather than trusting the 200.
trap - EXIT
curl -sf -X DELETE "$BASE/playbook/$ID?$Q" -H "$AUTH" > /dev/null || fail "delete the playbook"
if curl -sf -o /dev/null "$BASE/playbook/$ID?$Q" -H "$AUTH" 2>/dev/null; then
  fail "the playbook still resolves after deletion"
fi

echo "ok: created playbook $ID as '$NAME', updated its instructions, refetched to confirm, deleted it and confirmed it no longer resolves"
```

## How it works

* [Create playbook](/docs/api-reference/playbook/create-playbook) takes `name` and
  `instructions`. Instructions are an **array of strings**, one per line of
  guidance, not a single block of prose.
* [Get playbook](/docs/api-reference/playbook/get-playbook) reads it back. Doing
  this after a write is what distinguishes a call that returned 200 from a
  change that actually landed.
* [Update playbook](/docs/api-reference/playbook/update-playbook) patches in place,
  so send only the fields you are changing.
* [Delete playbook](/docs/api-reference/playbook/delete-playbook) removes it. This
  recipe deletes in a `trap` so a failure midway does not leave a playbook
  behind in your project.
* Playbooks call tools and hand off to other playbooks. See
  the [Build overview](/docs/api-reference/sections/build) for how
  the pieces connect.

## When it fails

| Symptom                                         | Cause                                                        | Fix                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `422` naming `instructions`                     | `instructions` was sent as a string                          | Send an array of strings, even for a single instruction                                         |
| The playbook exists but the agent never uses it | Creating a playbook does not route to it                     | Add it to the agent's routing, described in the [Build overview](/docs/api-reference/sections/build) |
| A failed run leaves test playbooks behind       | The script exited before its delete                          | Clean up in a `trap cleanup EXIT`, as this recipe does                                          |
| `404` on update immediately after create        | The ID was read from the wrong nesting level of the response | The ID is at `.playbook.id`, not `.id`                                                          |
