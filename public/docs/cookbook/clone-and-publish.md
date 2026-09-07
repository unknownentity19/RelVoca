> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Clone an environment and publish

> Clone the live environment, publish a release inside the copy, verify it landed, then delete the clone, all without touching production.

Shipping a change safely means working somewhere that is not live. This recipe
clones the main environment into a throwaway one, publishes a release inside
the clone, verifies the release exists, then deletes the clone, which is the
whole isolated-release cycle without touching production.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: clone-and-publish
#
# Ships a change the way you would in production: clone the live environment so
# you can work without touching it, publish the copy, and confirm the release
# landed. Then remove the copy.
#
# Required environment:
#   VF_PAT         personal access token (Settings -> Access tokens), vfp_..._...
#   VF_PROJECT_ID  the project ID (Settings -> General -> Metadata)
set -euo pipefail

: "${VF_PAT:?set VF_PAT to a personal access token from Settings -> Access tokens}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project ID from Settings -> General -> Metadata}"

BASE="https://realtime-api.voiceflow.com/v1/stable"
AUTH="Authorization: Bearer $VF_PAT"
Q="projectID=$VF_PROJECT_ID"

fail() { echo "FAIL at $1" >&2; exit 1; }

# Read the main alias rather than assuming "main": isMain survives a rename.
ENVS=$(curl -sf "$BASE/environment?$Q" -H "$AUTH") || fail "list environments"
SOURCE=$(echo "$ENVS" | jq -r '.environments[] | select(.isMain) | .alias')
[ -n "$SOURCE" ] || fail "no environment is flagged isMain"

ALIAS="cookbook$(date +%s)"

# 1. Clone. The copy starts as a full duplicate of the source, so you can edit
#    it without any traffic reaching your change.
CLONE=$(curl -sf -X POST "$BASE/environment/$SOURCE/clone?$Q" -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"name\":\"Cookbook clone\",\"alias\":\"$ALIAS\"}") \
  || fail "clone environment '$SOURCE' (a 400 'invalid environment tag' means the source alias does not exist)"
echo "$CLONE" | jq -e '.environment.alias | type == "string"' > /dev/null \
  || fail "clone returned no environment"

cleanup() { curl -sf -X DELETE "$BASE/environment/$ALIAS?$Q" -H "$AUTH" > /dev/null 2>&1 || true; }
trap cleanup EXIT

# 2. Publish the clone. This promotes its DRAFT to its PUBLISHED version - it
#    does not touch the environment you cloned from.
PUBLISHED=$(curl -sf -X POST "$BASE/environment/$ALIAS/publish?$Q" -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"name":"Cookbook release","description":"Published by the RelVoca cookbook"}') \
  || fail "publish environment '$ALIAS' (422 'expected string, received undefined' at path name means the body omitted the RELEASE name - publish names the release it creates, it is not optional)"

# 3. Confirm a release exists. Publishing is the only thing that creates one,
#    so a non-empty releases list is the proof the promotion happened.
AFTER=$(curl -sf "$BASE/environment?$Q" -H "$AUTH") || fail "re-list environments"
echo "$AFTER" | jq -e --arg a "$ALIAS" '[.environments[] | select(.alias == $a)] | length == 1' > /dev/null \
  || fail "the clone is not in the environment list"
echo "$AFTER" | jq -e --arg a "$ALIAS" '.environments[] | select(.alias == $a) | .releases | length > 0' > /dev/null \
  || fail "the published clone carries no release"

# 4. Remove the clone and prove it is gone.
trap - EXIT
curl -sf -X DELETE "$BASE/environment/$ALIAS?$Q" -H "$AUTH" > /dev/null || fail "delete the clone"
FINAL=$(curl -sf "$BASE/environment?$Q" -H "$AUTH") || fail "re-list after delete"
echo "$FINAL" | jq -e --arg a "$ALIAS" '[.environments[] | select(.alias == $a)] | length == 0' > /dev/null \
  || fail "the clone still exists after deletion"

echo "ok: cloned '$SOURCE' to '$ALIAS', published it ($(echo "$AFTER" | jq -r --arg a "$ALIAS" '.environments[] | select(.alias==$a) | .releases | length') release), deleted it; project is back to $(echo "$FINAL" | jq '.environments | length') environment(s)"
```

## How it works

* [Clone environment](/docs/api-reference/environment/clone-environment) copies an
  existing environment, agent and all, into a new alias. The source here is
  whichever environment reports `isMain: true`.
* [Publish environment](/docs/api-reference/environment/publish-environment)
  promotes the draft to live **within that environment**. Publishing a clone
  cannot affect production, which is the reason to work in one.
* A publish requires a release `name`. That name is what appears in the
  environment's release history, so it is worth making it meaningful.
* [Delete environment](/docs/api-reference/environment/delete-environment) removes
  the clone. This recipe asserts the environment is gone afterwards rather than
  trusting the delete's status code.
* Merging a clone back and splitting live traffic are the other two halves of
  this workflow. See
  the [Publishing overview](/docs/api-reference/sections/publishing).

## When it fails

| Symptom                                                        | Cause                                                                  | Fix                                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `422` on publish                                               | The request body omitted the release `name`                            | Send `{"name": "..."}`; publish will not default it                 |
| The clone's alias is not what you asked for                    | Aliases are normalized and must be unique in the project               | Read the alias back from the clone response rather than assuming it |
| `releases` is empty after a successful publish                 | You read the release list from the source environment, not the clone   | Query the clone's alias                                             |
| Deleting the environment appears to succeed but it still lists | The delete targeted an alias that did not exist, which is not an error | Assert the environment is absent afterwards, as this recipe does    |
| You cannot delete an environment                               | It is the main environment                                             | Main cannot be deleted. Clone, work, and delete the clone           |
