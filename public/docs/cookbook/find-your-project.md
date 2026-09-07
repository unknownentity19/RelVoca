> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Find your project and environment

> Resolve a project ID upward to the workspace that owns it and the environments inside it, and identify which environment is currently live.

Nearly every RelVoca API call needs a `projectID`, and most need an
environment alias too. If all you have is a token, the way to find them is to
resolve upward from the project rather than listing every workspace you can
see. This recipe reads a project, the workspace that owns it, and the
environments inside it, then identifies which one is live.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: find-your-project
#
# Every other call in this cookbook needs a projectID, an environmentAlias, and
# often a workspaceID. This resolves all three from the one ID you can read off
# the dashboard, and proves the token actually reaches that project.
#
# Required environment:
#   VF_PAT         personal access token (Settings -> Access tokens), vfp_..._...
#   VF_PROJECT_ID  the project ID (Settings -> General -> Metadata)
set -euo pipefail

: "${VF_PAT:?set VF_PAT to a personal access token from Settings -> Access tokens}"
: "${VF_PROJECT_ID:?set VF_PROJECT_ID to the project ID from Settings -> General -> Metadata}"

BASE="https://realtime-api.voiceflow.com/v1/stable"
AUTH="Authorization: Bearer $VF_PAT"

fail() { echo "FAIL at $1" >&2; exit 1; }

# 1. Resolve UPWARD from the project you named, rather than listing workspaces
#    and taking the first. A personal access token is user-scoped - it reaches
#    every workspace the account belongs to - so "the first workspace" is an
#    arbitrary one that may not be yours to touch. Start from the ID you know.
PROJECT=$(curl -sf "$BASE/project/$VF_PROJECT_ID" -H "$AUTH") \
  || fail "read project $VF_PROJECT_ID (a 401 means the token is wrong or expired; a 404 means this token's account cannot see that project)"

WORKSPACE_ID=$(echo "$PROJECT" | jq -r '.project.workspaceID')
echo "$PROJECT" | jq -e '.project.workspaceID | type == "string"' > /dev/null \
  || fail "project carries no workspaceID"

# 2. Confirm the project really sits in the workspace it claims. Reading the
#    ID back is what turns "I pasted an ID" into "this token can reach it".
WORKSPACE=$(curl -sf "$BASE/workspace/$WORKSPACE_ID" -H "$AUTH") \
  || fail "read workspace $WORKSPACE_ID"
echo "$WORKSPACE" | jq -e --arg w "$WORKSPACE_ID" '.workspace.id == $w' > /dev/null \
  || fail "workspace $WORKSPACE_ID did not return itself"

# 3. Environments carry the alias every later call needs. A new project has one
#    called `main`; `isMain` marks it whatever it was later renamed to, so read
#    the flag rather than hard-coding the string.
ENVS=$(curl -sf "$BASE/environment?projectID=$VF_PROJECT_ID" -H "$AUTH") \
  || fail "list environments for project $VF_PROJECT_ID"
echo "$ENVS" | jq -e '[.environments[] | select(.isMain)] | length == 1' > /dev/null \
  || fail "expected exactly one environment flagged isMain"

ALIAS=$(echo "$ENVS" | jq -r '.environments[] | select(.isMain) | .alias')

echo "ok: project '$(echo "$PROJECT" | jq -r '.project.name')' sits in workspace '$(echo "$WORKSPACE" | jq -r '.workspace.name')' ($WORKSPACE_ID) with $(echo "$ENVS" | jq '.environments | length') environment(s); main alias is '$ALIAS'"
```

## How it works

* [Get project](/docs/api-reference/project/get-project) returns the project along
  with the `teamID` of the workspace that owns it, so one call gives you both
  halves of the identity.
* [Get workspace](/docs/api-reference/workspace/get-workspace) turns that `teamID`
  into a name, which is the check worth making before any write: an ID alone
  never tells you which workspace you are about to change.
* [List environments](/docs/api-reference/environment/list-environments) returns
  every environment in the project. Exactly one carries `isMain: true`, and
  that is the one the Studio calls Production.
* Environments are addressed by **alias**, not by ID, everywhere else in the
  API. See the [Publishing overview](/docs/api-reference/sections/publishing).
* Every call here authenticates with a personal access token. See
  [Authentication](/docs/api-reference/authentication).

## When it fails

| Symptom                                          | Cause                                                                                                         | Fix                                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `401` on the first call                          | The token is wrong, expired, or was pasted with surrounding whitespace                                        | Reissue it from **Settings** then **Access tokens**                                                     |
| `404` on a project ID copied from the Studio URL | The URL also carries a version or canvas ID after the project ID                                              | Take only the first ID segment after `/project/`                                                        |
| The workspace name is not the one you expected   | A token reaches every workspace its account belongs to, so a valid ID from the wrong workspace still resolves | Assert on the workspace name before any write, as this recipe does                                      |
| No environment has `isMain: true`                | You queried a project that was never published                                                                | Publish once from the Studio, or see [Clone an environment and publish it](/docs/cookbook/clone-and-publish) |
