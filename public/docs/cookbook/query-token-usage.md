> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query token usage and calls

> Query token usage, call count, and unique users for a project over a date range, using the one request body every analytics measure shares.

Token spend is the number most teams want first, and the analytics endpoints
answer it without exporting anything. This recipe queries token usage, call
count, and unique users for a project over a date range, and shows that all
three take the same request body.

## The recipe

```bash main.sh theme={null}
#!/usr/bin/env bash
# Recipe: query-token-usage
#
# Asks what a project actually spent: total tokens over a date range, bucketed
# so you can chart it. Every analytics query takes the same three body fields.
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

# Analytics queries are POSTs even though they only read. The scope is in the
# PATH (project, workspace or organization) and the window is in the BODY.
START=$(date -u -v-30d +%Y-%m-%dT00:00:00.000Z 2>/dev/null || date -u -d '30 days ago' +%Y-%m-%dT00:00:00.000Z)
END=$(date -u +%Y-%m-%dT23:59:59.999Z)

query() { # $1 = measure
  curl -sf -X POST "$BASE/analytics/query/$1/project/$VF_PROJECT_ID" \
    -H "$AUTH" -H 'Content-Type: application/json' \
    -d "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"interval\":\"day\"}"
}

# 1. Token usage. `interval` buckets the rows; without it the request is
#    rejected, because there is no implicit default.
TOKENS=$(query token-usage) \
  || fail "query token usage (422 usually means startDate/endDate/interval is missing or not an ISO-8601 instant)"
echo "$TOKENS" | jq -e 'has("usage") or has("rows")' > /dev/null \
  || fail "token-usage returned neither usage nor rows"

# 2. The same body shape works for every other measure, which is the point:
#    learn it once and the whole Analytics section is available.
INTERACTIONS=$(query interaction-count) || fail "query interaction count"
TRANSCRIPTS=$(query transcript-count)   || fail "query transcript count"

echo "ok: 30-day window $START to $END; token-usage keys $(echo "$TOKENS" | jq -c 'keys'), interaction-count keys $(echo "$INTERACTIONS" | jq -c 'keys'), transcript-count keys $(echo "$TRANSCRIPTS" | jq -c 'keys')"
```

## How it works

* [Query project token usage](/docs/api-reference/analytics/query-project-token-usage)
  is a `POST`, not a `GET`, because the date range and grouping travel in the
  body.
* Every analytics measure shares one request shape: `startDate`, `endDate`, and
  an `interval` of `day`, `hour`, or `month`. Swapping the measure in the path
  is the only change needed, which is why this recipe queries three in a loop.
* Dates are ISO 8601. A range whose end precedes its start returns an empty
  series rather than an error, so assert on the shape you expect.
* The same measures exist at workspace and organization scope. See the
  [Analytics section](/docs/api-reference/sections/analytics) for the full list.
* Usage attributed to individual functions, playbooks, and tools is a separate
  set of measures under the same prefix.

## When it fails

| Symptom                                 | Cause                                                                                        | Fix                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `405 Method Not Allowed`                | The request was sent as a `GET`                                                              | Analytics queries are `POST` with a JSON body             |
| An empty `result` array                 | The range predates the project's first conversation, or the project genuinely had no traffic | Widen the range before concluding the endpoint is broken  |
| Numbers lower than the Studio dashboard | The dashboard's default range differs from the one you sent                                  | Match the range explicitly rather than comparing defaults |
| `422` naming `interval`                 | An interval outside `day`, `hour`, or `month`                                                | Use one of the three                                      |
