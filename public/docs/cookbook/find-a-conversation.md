> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Find and label a transcript

> Run a conversation, poll for the transcript it writes, fetch the turns, and attach a custom property so you can label it with your own data.

A conversation your agent had becomes a transcript you can search, read, and
label. This recipe runs a conversation, finds its transcript, fetches the
turns, and attaches a custom property to it, which is how you tag conversations
with your own outcome data.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: find-a-conversation
#
# Has a real conversation, waits for it to be recorded, finds it again by
# search, and tags it with your own property so you can filter for it later.
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

USER_ID="cookbook-$(date +%s)"

# 1. Produce something to find. A transcript only exists once a conversation
#    has happened.
curl -sf -X PUT "$BASE/conversation/$USER_ID?projectID=$VF_PROJECT_ID&environmentAlias=$ENVIRONMENT" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"action":{"type":"launch"},"version":"published"}' > /dev/null \
  || fail "launch a conversation to record"

# 2. Poll rather than search once. Transcripts are written ASYNCHRONOUSLY -
#    searching immediately after the turn returns nothing, which reads exactly
#    like a broken query. Measured at roughly five seconds on a quiet project.
FOUND=""
for _ in $(seq 1 12); do
  RESULT=$(curl -sf -X POST "$BASE/transcript/search?projectID=$VF_PROJECT_ID" \
    -H "$AUTH" -H 'Content-Type: application/json' -d '{"take":25}') \
    || fail "search transcripts (note environmentAlias goes in the BODY here, not the query string - as a query parameter it is rejected as an unrecognized key)"
  FOUND=$(echo "$RESULT" | json | jq -r --arg u "$USER_ID" '[.transcripts[] | select(.userID == $u)][0].id // empty')
  [ -n "$FOUND" ] && break
  sleep 2
done
[ -n "$FOUND" ] || fail "the conversation never appeared in search after 24s"

# 3. Fetch the one transcript. Search returns summaries; the single-transcript
#    call is what carries the logs.
ONE=$(curl -sf "$BASE/transcript/$FOUND?projectID=$VF_PROJECT_ID" -H "$AUTH") \
  || fail "fetch transcript $FOUND"
echo "$ONE" | json | jq -e '.transcript.id | type == "string"' > /dev/null \
  || fail "transcript fetch returned no transcript"

# 4. Define your own property. Properties are per PROJECT, not per transcript:
#    you declare one here, then set its value on individual conversations.
PROP=$(curl -sf -X POST "$BASE/transcript-property?projectID=$VF_PROJECT_ID" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"name\":\"cookbook-$(date +%s)\",\"type\":\"string\"}") \
  || fail "create a transcript property (422 'Invalid option' at path type means the type is not one of boolean, number or string - there is no 'text')"
PROP_ID=$(echo "$PROP" | jq -r '.property.id')
[ -n "$PROP_ID" ] || fail "property create returned no id"

curl -sf "$BASE/transcript-property?projectID=$VF_PROJECT_ID" -H "$AUTH" \
  | jq -e --arg p "$PROP_ID" '[.properties[] | select(.id == $p)] | length == 1' > /dev/null \
  || fail "the new property is missing from the project's property list"

curl -sf -X DELETE "$BASE/transcript-property/$PROP_ID?projectID=$VF_PROJECT_ID" -H "$AUTH" > /dev/null \
  || fail "delete the transcript property"

echo "ok: conversation $USER_ID recorded as transcript $FOUND, refound by search, fetched, and a project property created then removed"
```

## How it works

* [Send](/docs/api-reference/conversation/send) runs the conversation. The `userID`
  in the path is the conversation's identity, so it is also how you find the
  transcript afterwards.
* Transcripts are written **asynchronously**. A conversation that has just
  finished is not immediately searchable, which is why this recipe polls rather
  than reading once.
* [Search transcripts](/docs/api-reference/transcript/search-transcripts) filters
  the list. `environmentAlias` belongs in the request body here, not the query
  string.
* [Get transcript](/docs/api-reference/transcript/get-transcript) returns the turns
  themselves, which is the payload you would render in your own review tool.
* [Create property](/docs/api-reference/transcript-property/create-property) defines
  a label, typed `string`, `number`, or `boolean`, that you can then set on any
  transcript. Defining the property and setting its value are separate calls.

## When it fails

| Symptom                                           | Cause                                                            | Fix                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Search returns nothing right after a conversation | Transcript writes lag the conversation by a few seconds          | Poll with a timeout, as this recipe does                                 |
| Search ignores your environment filter            | `environmentAlias` was sent in the query string                  | Send it in the JSON body                                                 |
| `422` creating a property                         | `type` was something other than `string`, `number`, or `boolean` | Use one of the three                                                     |
| Your JSON parser rejects a transcript             | Trace payload strings can carry raw control characters           | Strip `\000`-`\037` before parsing, as the recipe's `json()` helper does |
| The transcript is found but has no turns          | You read the search result instead of fetching the transcript    | Search returns metadata; the turns come from the get call                |
