> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Observe overview

> Read the conversations your agent actually had. Search transcripts, fetch a single one, and attach your own properties to record what happened.

Every conversation your agent has is kept as a transcript. These endpoints let
you search them, read an individual one turn by turn, and attach your own
fields to record things the runtime cannot know, such as whether the
conversation was escalated or how it ended.

## Endpoints

### Transcript

| Endpoint                                                                                                      | Description                       |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="blue" size="sm">POST</Badge> [Search transcripts](/docs/api-reference/transcript/search-transcripts) | Search transcripts by project ID. |
| <Badge color="green" size="sm">GET</Badge> [Get transcript](/docs/api-reference/transcript/get-transcript)         | Get a transcript by ID.           |

### Transcript property

| Endpoint                                                                                                                | Description                           |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List properties](/docs/api-reference/transcript-property/list-properties)        | List all properties by project ID.    |
| <Badge color="blue" size="sm">POST</Badge> [Create property](/docs/api-reference/transcript-property/create-property)        | Create a new property.                |
| <Badge color="green" size="sm">GET</Badge> [Get property](/docs/api-reference/transcript-property/get-property)              | Get property by ID.                   |
| <Badge color="orange" size="sm">PATCH</Badge> [Update property](/docs/api-reference/transcript-property/update-property)     | Update a property by ID.              |
| <Badge color="red" size="sm">DELETE</Badge> [Delete property](/docs/api-reference/transcript-property/delete-property)       | Delete a property by ID.              |
| <Badge color="purple" size="sm">PUT</Badge> [Set property value](/docs/api-reference/transcript-property/set-property-value) | Set a property value on a transcript. |

## Finding conversations

Transcript search is a `POST` rather than a `GET`, because the filters are rich
enough to need a body:

```bash theme={null}
curl -X POST "https://realtime-api.voiceflow.com/v1/stable/transcript/search" \
  -H "Authorization: Bearer $VF_PAT" \
  -H "Content-Type: application/json" \
  -d '{ "projectID": "'"$VF_PROJECT_ID"'" }'
```

Fetching a single transcript by ID returns its turns, so a common shape is
search for the conversations you care about, then fetch each one.

## Properties are your own metadata

A **transcript property** is a field you define on the project, and a property
value is that field set on one transcript. Use them to record things the runtime
cannot know: whether the conversation was escalated, which experiment a user was
in, what the outcome was.

Define the property once, then set its value per transcript. Because properties
are project-level, they also become the vocabulary you filter searches by.

## What transcripts are not for

Transcript endpoints return conversations, not counts. If you want totals,
costs, or usage over time, that is
[Analytics](/docs/api-reference/sections/analytics). If you want quality scored
against criteria, that is [Insights](/docs/api-reference/sections/insights).

## Where to go next

Transcripts are the input to [evaluations](/docs/api-reference/sections/insights) -
you can run an evaluation over conversations that already happened.
