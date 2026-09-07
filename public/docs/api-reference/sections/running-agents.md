> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Running agents overview

> Run conversations against an agent over HTTP. Send what a user would say, read the traces that come back, and inspect or reset the state between turns.

A conversation is the agent doing its job: a user says something, the agent
decides what to do, and everything it did comes back as typed events.

Driving that from your own code is how you put the agent behind a different
interface, or check how a change behaves before anyone else sees it.
Conversation state sits alongside, so you can read what the agent currently
believes, change a variable mid-turn, or start over.

## Endpoints

### Conversation

| Endpoint                                                                             | Description                     |
| ------------------------------------------------------------------------------------ | ------------------------------- |
| <Badge color="purple" size="sm">PUT</Badge> [Send](/docs/api-reference/conversation/send) | Send message to a conversation. |

### Conversation state

| Endpoint                                                                                                             | Description                                                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [Get state](/docs/api-reference/conversation-state/get-state)                  | Get conversation state for a user.                                                              |
| <Badge color="orange" size="sm">PATCH</Badge> [Update state](/docs/api-reference/conversation-state/update-state)         | Update conversation state for a user.                                                           |
| <Badge color="red" size="sm">DELETE</Badge> [Delete state](/docs/api-reference/conversation-state/delete-state)           | Delete conversation state for a user.                                                           |
| <Badge color="orange" size="sm">PATCH</Badge> [Update variables](/docs/api-reference/conversation-state/update-variables) | Updates variables in the conversation state by merging with the properties in the request body. |

### Knowledge base query

| Endpoint                                                                                                              | Description                                              |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| <Badge color="blue" size="sm">POST</Badge> [Query knowledge base](/docs/api-reference/knowledge-base/query-knowledge-base) | Execute a query against documents in the knowledge base. |

## A conversation is a userID

There is no session to create. The `userID` in the path *is* the conversation:
call the same path again and the agent continues where it left off, call it
with a new `userID` and you get a fresh one.

```bash theme={null}
curl -X PUT "https://realtime-api.voiceflow.com/v1/stable/conversation/user-123?projectID=$VF_PROJECT_ID&environmentAlias=main" \
  -H "Authorization: Bearer $VF_PAT" \
  -H "Content-Type: application/json" \
  -d '{ "action": { "type": "launch" }, "version": "published" }'
```

That returns an array of [traces](/docs/api-reference/trace-types) describing
everything the agent did in response.

## The two fields that matter

`action` is what the user did. `launch` starts the agent from its entry point;
`text` sends something they typed:

```json theme={null}
{ "action": { "type": "text", "payload": "What can you help me with?" }, "version": "published" }
```

`version` chooses which build answers. `published` runs the live version of the
environment; `draft` runs what you are currently editing, which is what you want
while testing a change.

## Reading the response

The agent's output is a list of traces, not a single message. A chat agent's
words arrive as `text` traces; a voice agent answers with `speak`. Buttons,
cards, carousels and debug output each have their own type, and the
[trace reference](/docs/api-reference/trace-types) documents every one.

Two things worth handling from the start:

* Iterate the traces rather than taking the first. A single turn routinely
  returns a message, then buttons, then debug output.
* Strip control characters before parsing. The runtime can emit raw control
  characters inside trace payload strings, which strict JSON parsers reject.

## Conversation state

The state endpoints let you inspect what the agent currently believes, change a
variable mid-conversation, or delete the state to start over without changing
the `userID`.

## Where to go next

The [first conversation turn](/docs/cookbook/first-conversation-turn) recipe is this
flow as a script you can run, verified against a live agent.
