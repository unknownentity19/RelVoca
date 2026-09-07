> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Session lifecycle webhook

> Subscribe to session and call lifecycle webhook events so external systems get notified when RelVoca conversations start and end.

The session lifecycle webhook notifies your systems in real time whenever a conversation starts or ends, letting you run automations around each conversation without polling for changes.

A common use is running automations once a conversation ends, without adding latency to the conversation itself. For example, you can sync conversation data to your CRM, kick off a downstream workflow in your own systems, or notify another service that a conversation has wrapped up. Because this work runs on your side in response to the webhook, none of it slows down the live conversation.

Add your webhook URL to your project under **Settings → Webhooks**.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/0hQh3rlWscJCInRW/images/webhook-event-selection.png?fit=max&auto=format&n=0hQh3rlWscJCInRW&q=85&s=841c787d4a992ab67307eabbfede3379" alt="The session lifecycle webhook settings, showing the webhook URL, the event selection checklist grouped into call events and session events, and the webhook secret" width="634" height="616" data-path="images/webhook-event-selection.png" />
</Frame>

A new webhook listens for every event. To narrow that down, choose **Listen for specific events** and tick only the ones you want: each is listed with its event name, grouped into [session events](#session-events) and [call events](#call-events). You can change the selection at any time, and deprecated events are labelled as such in the list.

## Events

RelVoca will send POST requests to your webhook URL on the following events.

| Human-readable name | Name                                              | Category                          |
| ------------------- | ------------------------------------------------- | --------------------------------- |
| Session started     | [`runtime.session.start`](#runtime-session-start) | [Session events](#session-events) |
| Session ended       | [`runtime.session.end`](#runtime-session-end)     | [Session events](#session-events) |
| Call started        | [`runtime.call.start`](#runtime-call-start)       | [Call events](#call-events)       |
| Call ended          | [`runtime.call.end`](#runtime-call-end)           | [Call events](#call-events)       |

Three older `.v2` variants are deprecated and stop firing on **October 9, 2026**. See [Deprecated events](#deprecated-events).

## Session events

Session events fire whenever a conversation starts or ends, across every project and every channel. A session is the conversation itself, the state your agent builds up as it goes, so every conversation has one. These are the events most integrations listen for.

A session has to exist for these events to fire. The chat widget, voice conversations, and the Start session endpoint each create one; the deprecated legacy Interact endpoints don't, so conversations run through those produce no session events.

### `runtime.session.start`

This event is sent when a new session is started for a user.

```typescript theme={null}
{
  "type": "runtime.session.start",
  "data": {
    "userID": string,
    "projectID": string,
    "environmentID": string,
    "sessionID": string,
    "startTime": number, // unix timestamp MS

    // the fields below may be null or absent — see "Optional fields"
    "versionID"?: string | null, // same value as environmentID
    "transcriptID"?: string | null,
    "versionVariant"?: "draft" | "published" | null,
    "projectEnvironmentID"?: string | null,
    "projectEnvironmentAlias"?: string | null
  }
  "time": number // unix timestamp MS, event time
  "resource": string // project-{projectID}
}
```

<Accordion title="Example runtime.session.start payload">
  ```json theme={null}
  {
    "type": "runtime.session.start",
    "data": {
      "environmentID": "6a15b5f6a85b1b570a8773cf",
      "projectID": "69f9fa36eeb8f50e7cfd2d5f",
      "sessionID": "6a15b6093f95e60007ec4e04",
      "startTime": 1779807753396,
      "userID": "g4dq75wr6asov6z571860xg0",
      "versionID": "6a15b5f6a85b1b570a8773cf",
      "transcriptID": "6a15b6093f95e60007ec4e04",
      "versionVariant": "published",
      "projectEnvironmentID": "6a15b5f6a85b1b570a8773d4",
      "projectEnvironmentAlias": "production"
    },
    "resource": "project-69f9fa36eeb8f50e7cfd2d5f",
    "time": 1779807753433
  }
  ```
</Accordion>

### `runtime.session.end`

This event is sent when a session ends: because the conversation reached an end, because the caller hung up, or because the session sat idle past its timeout.

<Warning>
  This event doesn't necessarily arrive when the user stops talking to your agent. Closing a chat widget sends no end signal, so unless your agent explicitly ends the conversation, the session runs to its idle timeout and the event arrives then, potentially long after the user left. To react the moment a conversation stops, drive it from your agent's own end-of-conversation logic.
</Warning>

```typescript theme={null}
{
  "type": "runtime.session.end",
  "data": {
    "userID": string,
    "projectID": string,
    "environmentID": string,
    "sessionID": string,
    "startTime": number, // unix timestamp MS
    "endTime": number, // unix timestamp MS

    // the fields below may be null or absent — see "Optional fields"
    "endReason"?: string | null, // why the session ended, arbitrary string
    "versionID"?: string | null, // same value as environmentID
    "transcriptID"?: string | null,
    "versionVariant"?: "draft" | "published" | null,
    "projectEnvironmentID"?: string | null,
    "projectEnvironmentAlias"?: string | null
  }
  "time": number // unix timestamp MS, event time
  "resource": string // project-{projectID}
}
```

<Accordion title="Example runtime.session.end payload">
  ```json theme={null}
  {
    "type": "runtime.session.end",
    "data": {
      "endTime": 1779807762998,
      "environmentID": "6a15b5f6a85b1b570a8773cf",
      "projectID": "69f9fa36eeb8f50e7cfd2d5f",
      "sessionID": "6a15b6093f95e60007ec4e04",
      "startTime": 1779807753396,
      "userID": "g4dq75wr6asov6z571860xg0",
      "endReason": "Session ended due to inactivity timeout",
      "versionID": "6a15b5f6a85b1b570a8773cf",
      "transcriptID": "6a15b6093f95e60007ec4e04",
      "versionVariant": "published",
      "projectEnvironmentID": "6a15b5f6a85b1b570a8773d4",
      "projectEnvironmentAlias": "production"
    },
    "resource": "project-69f9fa36eeb8f50e7cfd2d5f",
    "time": 1779807763081
  }
  ```
</Accordion>

## Call events

Call events fire on voice conversations only. They carry call-level details that exist only on a call, such as the phone numbers involved and why the call ended.

A voice conversation emits call events **and** session events, because the two describe different things: the call is the voice connection, and the session is the conversation carried over it. Check `type` to tell which event you're handling, and use `data.sessionID` to join the two.

Their end events are not interchangeable either:

* `runtime.call.end` fires when the voice connection is torn down.
* `runtime.session.end` fires when the session expires. On a normal hangup that follows within a few seconds, because hanging up marks the session as expired. If the hangup never reaches RelVoca, the session ends on its idle timeout instead, which can be much later.

Use `runtime.call.end` for call duration and `runtime.session.end` for conversation lifetime.

<Info>
  Calls and sessions aren't one-to-one. A caller who reaches your agent again while their previous session is still active reuses that session, so the second call emits `runtime.call.start` and `runtime.call.end` with no new `runtime.session.start`. That session's `runtime.session.end` arrives once the session itself expires, after the last call. On a reused session, `data.sessionID` and `data.transcriptID` are `null` on `runtime.call.start`, so that event can't be joined to its session.
</Info>

### `runtime.call.start`

This event is sent when a voice call starts: an inbound or outbound phone call, or a voice call from the web widget, including test calls in the RelVoca editor.

```typescript theme={null}
{
  "type": "runtime.call.start",
  "data": {
    "userID": string,
    "projectID": string,
    "environmentID": string,
    "startTime": number, // unix timestamp MS
    "platform": "twilio" | "telnyx" | "vonage" | "relvoca" | "web-voice",
    "metadata": object, // depends on "platform"

    // the fields below may be null or absent — see "Optional fields"
    "sessionID"?: string | null, // the session this call is attached to
    "versionID"?: string | null, // same value as environmentID
    "transcriptID"?: string | null,
    "versionVariant"?: "draft" | "published" | null,
    "projectEnvironmentID"?: string | null,
    "projectEnvironmentAlias"?: string | null
  }
  "time": number // unix timestamp MS, event time
  "resource": string // project-{projectID}
}
```

<Accordion title="Example runtime.call.start payload">
  ```json theme={null}
  {
    "type": "runtime.call.start",
    "data": {
      "userID": "+19876543210",
      "environmentID": "69f3df348d8088f34a622739",
      "projectID": "6772da2e485189279fa5b9da",
      "startTime": 1743563467788,
      "platform": "twilio",
      "metadata": {
        "callSid": "CA01ed76f14fee29c50f5de59400474006",
        "callType": "inbound",
        "userNumber": "+19876543210",
        "agentNumber": "+17782006110"
      },
      "sessionID": "69f3df3a3f95e60007ec4e04",
      "versionID": "69f3df348d8088f34a622739",
      "transcriptID": "69f3df3a3f95e60007ec4e04",
      "versionVariant": "published",
      "projectEnvironmentID": "69f3df348d8088f34a62273f",
      "projectEnvironmentAlias": "production"
    },
    "time": 1743563467874,
    "resource": "project-6772da2e485189279fa5b9da"
  }
  ```
</Accordion>

### `runtime.call.end`

This event is sent when a call is completed.

```typescript theme={null}
{
  "type": "runtime.call.end",
  "data": {
    "userID": string,
    "projectID": string,
    "environmentID": string,
    "startTime": number, // unix timestamp MS
    "endTime": number, // unix timestamp MS
    "endReason": string, // why the call ended, arbitrary string, common reasons include "hangup" "end trace" "twiml" "answering machine"
    "platform": "twilio" | "telnyx" | "vonage" | "relvoca" | "web-voice",
    "metadata": object, // depends on "platform"

    // the fields below may be null or absent — see "Optional fields"
    "sessionID"?: string | null, // the session this call was attached to
    "versionID"?: string | null, // same value as environmentID
    "transcriptID"?: string | null,
    "versionVariant"?: "draft" | "published" | null,
    "projectEnvironmentID"?: string | null,
    "projectEnvironmentAlias"?: string | null
  }
  "time": number // unix timestamp MS
  "resource": string // project-{projectID}
}
```

<Accordion title="Example runtime.call.end payload">
  ```json theme={null}
  {
    "type": "runtime.call.end",
    "data": {
      "userID": "+19876543210",
      "environmentID": "69f3df348d8088f34a622739",
      "projectID": "6772da2e485189279fa5b9da",
      "startTime": 1743563467788,
      "endTime": 1743563467834,
      "endReason": "hangup",
      "platform": "twilio",
      "metadata": {
        "callSid": "CA01ed76f14fee29c50f5de59400474006",
        "callType": "inbound",
        "userNumber": "+19876543210",
        "agentNumber": "+17782006110"
      },
      "sessionID": "69f3df3a3f95e60007ec4e04",
      "versionID": "69f3df348d8088f34a622739",
      "transcriptID": "69f3df3a3f95e60007ec4e04",
      "versionVariant": "published",
      "projectEnvironmentID": "69f3df348d8088f34a62273f",
      "projectEnvironmentAlias": "production"
    },
    "time": 1743563467874,
    "resource": "project-6772da2e485189279fa5b9da"
  }
  ```
</Accordion>

## Optional fields

Several fields on the four events above are **optional and nullable**: `versionID`, `transcriptID`, `versionVariant`, `projectEnvironmentID`, `projectEnvironmentAlias`, `sessionID` (call events only), and `endReason` (on `runtime.session.end`).

They are populated whenever the value is available, and are `null` otherwise. Treat a missing or `null` value as "not known for this conversation" rather than as an error, and don't require them to be present when parsing a payload.

`endReason` on `runtime.session.end` is typed as nullable but in practice always carries a value. Sessions that simply time out report `"Session ended due to inactivity timeout"`, and a session displaced by a new one reports `"Session expired because a new one was started"`. It's an arbitrary string, so match on it defensively rather than treating the set as fixed.

`versionID` carries the same value as `environmentID`. It exists so that consumers written against the deprecated `.v2` events, which used the name `versionID`, keep working after migrating.

`transcriptID` carries the same value as `sessionID`, because a conversation's transcript is keyed on the session that produced it. It's `null` when transcripts are disabled for the session, which is the case to guard against if you use it to build transcript links.

## Deprecated events

<Warning>
  `runtime.session.start.v2`, `runtime.call.start.v2` and `runtime.call.end.v2` are deprecated. They will **stop firing on October 9, 2026**. If you subscribe to any of them, switch to the corresponding event without the `.v2` suffix before then.
</Warning>

Until that date the deprecated events keep firing exactly as they do today, alongside their replacements, so you can migrate at your own pace. If you subscribe to both an event and its `.v2` variant during this window you'll receive both, and should ignore one of them.

| Deprecated event           | Replace with                                      |
| -------------------------- | ------------------------------------------------- |
| `runtime.session.start.v2` | [`runtime.session.start`](#runtime-session-start) |
| `runtime.call.start.v2`    | [`runtime.call.start`](#runtime-call-start)       |
| `runtime.call.end.v2`      | [`runtime.call.end`](#runtime-call-end)           |

The `.v2` events existed only to add richer metadata. That metadata now ships on the standard events, so the two payloads carry the same information. Differences to handle when you migrate:

| Field on the `.v2` event                                                                         | On the replacement event                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `versionID`                                                                                      | `versionID`, carrying the same value. The replacement events also include `environmentID` with that value.                                                                                                             |
| `sessionID`, `transcriptID`, `versionVariant`, `projectEnvironmentID`, `projectEnvironmentAlias` | Same names and values, but [optional and nullable](#optional-fields). The `.v2` events only fired when these were all known; the replacements fire on every session or call, so your handler needs to tolerate `null`. |
| `endReason` (on `runtime.call.end.v2`)                                                           | `endReason` on `runtime.call.end`, always present and never `null`.                                                                                                                                                    |

`runtime.session.end.v2` has also been removed. Unlike the events above it never fired, because its trigger condition depended on data that was never recorded, so it has no subscribers and no migration path is needed. Use [`runtime.session.end`](#runtime-session-end), which now carries the fields `runtime.session.end.v2` was intended to add.

## Best practices

* Check `type` when evaluating a response. There may be additional types of events in the future with a different shaped request body, as well as new properties and metadata.
* **Parse payloads permissively.** New fields are added to existing events without introducing a new event name or version, so treat unrecognized properties as expected. A new event *name* is only introduced when an existing field's meaning or shape changes.
* Don't require the [optional fields](#optional-fields) to be present. Handle `null`.
* `data.metadata` is only included on call events. Check `data.platform` before reading it, as the available fields vary by platform (eg: `data.metadata.callSid` isn't present on a `"web-voice"` call).
* Join call events to session events on `data.sessionID` where it's present, and don't assume one call per session. See [Call events](#call-events).
* If you're using the same webhook URL across multiple projects, check `data.projectID` to tell them apart.
