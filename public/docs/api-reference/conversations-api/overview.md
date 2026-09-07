> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Conversations API

> Use the Conversations API to run turns, manage session state, inject variables, and control your RelVoca agent's runtime over HTTP.

RelVoca's Conversations API allows you to programmatically interact with a RelVoca agent. This allows you to build custom interfaces for users to access your agent through, or to pull information about active sessions into your tooling.

You can use the Conversations API to run [conversation turns](/docs/api-reference/v4interact/interact-non-stream), [send events](/docs/api-reference/session/emit-session-event), [read](/docs/api-reference/state/get-conversation-state) and [modify session state](/docs/api-reference/state/update-conversation-state), and [inject variables](/docs/api-reference/state/update-conversation-variables) - giving you full control over how your agent runs inside your own application.

## Available endpoints

| Endpoint                                                                                                                | Description                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Conversation**                                                                                                        |                                                                                                                                                                             |
| <Badge color="blue">POST</Badge> [Interact (non-stream)](/docs/api-reference/v4interact/interact-non-stream)                 | Returns an array of traces in response to a user interaction. Accepts state variables, request, action, and config in the body.                                             |
| <Badge color="blue">POST</Badge> [Interact (stream)](/docs/api-reference/v4interact/interact-stream)                         | SSE endpoint that returns a stream of `trace` events followed by an `end` event. Supports audio, completion streaming, modality selection, and state return.                |
| <Badge color="blue">POST</Badge> [Interact - legacy (non-stream)](/docs/api-reference/state/interact--legacy-non-stream)     | **Deprecated** Returns an array of traces in response to a user interaction. Accepts state variables, request, action, and config in the body.                              |
| <Badge color="blue">POST</Badge> [Interact - legacy (stream)](/docs/api-reference/conversation/interact--legacy-stream)      | **Deprecated** SSE endpoint that returns a stream of `trace` events followed by an `end` event. Supports audio, completion streaming, modality selection, and state return. |
| **State**                                                                                                               |                                                                                                                                                                             |
| <Badge color="green">GET</Badge> [Get conversation state](/docs/api-reference/state/get-conversation-state)                  | Fetches the current state of a user's conversation, including stack, variables, and storage.                                                                                |
| <Badge color="yellow">PUT</Badge> [Update conversation state](/docs/api-reference/state/update-conversation-state)           | Replaces the full state of a user's conversation (stack, variables, storage).                                                                                               |
| <Badge color="red">DEL</Badge> [Delete conversation state](/docs/api-reference/state/delete-conversation-state)              | Deletes all state and session data for a user's conversation.                                                                                                               |
| <Badge color="orange">PATCH</Badge> [Update conversation variables](/docs/api-reference/state/update-conversation-variables) | Merges the provided variables into the user's current conversation state.                                                                                                   |
| **Session**                                                                                                             |                                                                                                                                                                             |
| <Badge color="blue">POST</Badge> [Start session](/docs/api-reference/v4interact/start-session-specific-environment)          | Starts a new relvoca conversation session. Used for v4 session management.                                                                                                |
| <Badge color="blue">POST</Badge> [Emit session event](/docs/api-reference/session/emit-session-event)                        | Sends an event to an active session. Useful for injecting actions mid-conversation.                                                                                         |

## Actions and traces

When a user [interacts](/docs/api-reference/v4interact/interact-non-stream) with your agent, the request goes to RelVoca's runtime - the engine that processes each conversation turn, runs your agent's logic, and produces a response. The Conversations API is your interface to that runtime.

Each turn follows a request-response pattern. Your application sends an **action** describing what happened on the user's side, and the runtime processes it and returns a set of **traces** describing how the agent responds.

An action can be a user's message, a launch request to start a new conversation, a button selection, a system event, a no-reply signal, or a handoff continuation. The most common is `text`:

```json theme={null}
{
  "action": {
    "type": "text",
    "payload": "I need help with my order"
  }
}
```

Traces are the agent's output. Each turn returns an array of trace objects - a single response often contains several in sequence. For example, a `text` trace with a message, then a `choice` trace presenting reply options. Your application is responsible for rendering each trace type appropriately.

See [Trace types](/docs/api-reference/trace-types) for a complete reference.

## Session state

RelVoca maintains state for each user across turns using the `userID` you provide. In most cases this is automatic, but the state endpoints give you direct access when you need it. You can [fetch a user's current state](/docs/api-reference/state/get-conversation-state), [update it](/docs/api-reference/state/update-conversation-state), or [delete it to reset the session](/docs/api-reference/state/delete-conversation-state) - useful for testing, debugging, or building custom session management into your integration.

## Variables

Variables let you pass context into an agent's session that it can reference during a conversation. You can [update a user's variables at any point](/docs/api-reference/state/update-conversation-variables) without replacing the full session state. This is useful for pre-loading information before a conversation begins (eg: the user's name, account tier, or current page) so the agent can personalize its responses from the first turn. Note that variables are not automatically reset when a conversation's state is reset.

## Environments

Each request runs against a specific environment in your project. Pass the environment's alias in the `environment` parameter to target it. By default, new projects have a single environment called **Main** with alias `main`; see [Environments](/docs/documentation/deploy/environments) for how to create more.

If your project was created before environments launched and has not yet been migrated, the legacy `development`, `staging`, and `production` aliases continue to work.
