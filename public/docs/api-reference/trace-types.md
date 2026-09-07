> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Traces

> Reference for every trace type returned by the Conversations API.

Traces are the output of a RelVoca agent. Each time your application sends an action to the [Conversations API](/docs/api-reference/sections/running-agents), the runtime returns an array of trace objects describing how the agent responded. A single turn often produces multiple traces in sequence - for example, a message followed by a set of buttons.

Every trace has a `type` field that identifies what it contains, a `payload` with the relevant data, and a `time` value recording when that trace was generated as a Unix timestamp. The `time` field can be useful for debugging: steps like message generation may take noticeably longer than simple text steps, and the timestamps make that visible.

## Trace types

### text

Returned by the [Message step](/docs/documentation/build/steps/message), [Playbooks](/docs/documentation/build/steps/playbook), and no-match and no-reply reprompts.

```json theme={null}
{
  "type": "text",
  "time": 1720552033,
  "payload": {
    "slate": {
      "id": "unique-id",
      "content": [
        {
          "children": [{ "text": "Hello there!" }]
        },
        {
          "children": [{ "text": "Select an option or ask me a question" }]
        }
      ],
      "messageDelayMilliseconds": 1000
    },
    "message": "Hello there!\n\nSelect an option or ask me a question",
    "delay": 1000
  }
}
```

The `message` field contains the plain text content. The `slate` field contains the same content in a structured rich-text format. `delay` controls the pause in milliseconds before the next trace is rendered, defaulting to 1000ms.

### cardV2

Returned by the [Card step](/docs/documentation/build/steps/card). When a card contains buttons, each button's `request.type` is a Voiceflow-generated path ID. Pass that value as the `action.type` in your next request to advance the conversation along the corresponding path.

```json theme={null}
{
  "type": "cardV2",
  "time": 1720552033,
  "payload": {
    "title": "This is a Card title",
    "description": {
      "text": "This is a Card description",
      "slate": [
        {
          "children": [{ "text": "This is a Card description" }]
        }
      ]
    },
    "imageUrl": "https://assets-global.website-files.com/example-file.png",
    "buttons": [
      {
        "name": "Click for next step",
        "request": {
          "type": "path-generated-by-voiceflow",
          "payload": {
            "actions": [],
            "label": "Click for next step"
          }
        }
      }
    ]
  }
}
```

### carousel

Returned by the [Carousel step](/docs/documentation/build/steps/card). The same button handling applies as with `cardV2` -  pass the button's `request.type` as the `action.type` in your next request.

```json theme={null}
{
  "type": "carousel",
  "time": 1720552033,
  "payload": {
    "layout": "Carousel",
    "cards": [
      {
        "id": "unique-id",
        "title": "This is a Carousel card title",
        "description": {
          "text": "This is a Carousel card description",
          "slate": [
            {
              "children": [{ "text": "This is a Carousel card description" }]
            }
          ]
        },
        "imageUrl": "https://assets-global.website-files.com/example-file.png",
        "buttons": [
          {
            "name": "Click for next step",
            "request": {
              "type": "path-generated-by-voiceflow",
              "payload": {
                "label": "Click for next step",
                "actions": []
              }
            }
          }
        ]
      }
    ]
  }
}
```

### choice

Returned by the [Condition step](/docs/documentation/build/steps/condition) and [Playbooks](/docs/documentation/build/playbooks) or the Agent when the [buttons system tool](/docs/documentation/build/tools/system-tools) is enabled. How you handle a choice trace depends on what's in each button's `request.type`.

#### Path buttons

When buttons are connected to specific paths in your workflow, `request.type` is a Voiceflow-generated path ID. Pass it directly as `action.type` in your next request. The `label` field is optional - if included, its value is set as the `last_utterance` variable.

```json theme={null}
{
  "type": "choice",
  "time": 1753108390491,
  "payload": {
    "buttons": [
      {
        "name": "Order coffee",
        "request": {
          "type": "path-cmd906pp400433b7ujbsbiotm",
          "payload": {
            "label": "Order coffee"
          }
        }
      }
    ]
  }
}
```

To handle this button click, send:

```json theme={null}
{
  "action": {
    "type": "path-cmd906pp400433b7ujbsbiotm",
    "payload": {
      "label": "Order coffee"
    }
  }
}
```

#### Agent-generated buttons

When the [buttons system tool](/docs/documentation/build/tools/system-tools) is enabled on Playbook or on the Agent, the agent may dynamically generate buttons. These use `request.type: "text"` and simulate raw user input rather than triggering a specific path:

```json theme={null}
{
  "type": "choice",
  "time": 1753110520157,
  "payload": {
    "buttons": [
      {
        "name": "Check account balance",
        "request": {
          "type": "text",
          "payload": "Check account balance"
        }
      }
    ]
  }
}
```

### no-reply

Returned when a No Reply timeout is active. The `timeout` value is in seconds.

```json theme={null}
{
  "type": "no-reply",
  "time": 1720552033,
  "payload": {
    "timeout": 10
  }
}
```

If the user doesn't respond within the timeout window, send a `no-reply` action to retrieve the configured reprompt:

```json theme={null}
{
  "action": {
    "type": "no-reply"
  }
}
```

## Additional trace types

Every remaining `type` value in the runtime schema. Field tables are projected from the spec. Some payloads have several shapes, distinguished by a field such as `state`; where they do, the table says under which condition each field appears, and marks a field required only when every shape requires it.

### `audio`

An audio response event. The payload's `state` field selects the shape: `start` announces a `messageID`, `content` carries the audio in `content` with its `encoding`, and `end` carries the state alone.

| Field       | Type                                                | Required | Present when         |
| ----------- | --------------------------------------------------- | -------- | -------------------- |
| `content`   | string                                              | no       | `state` is `content` |
| `delay`     | number                                              | no       | `state` is `start`   |
| `duration`  | number                                              | no       | `state` is `content` |
| `encoding`  | `"audio/mp3"` or `"audio/x-mulaw"` or `"audio/pcm"` | no       | `state` is `content` |
| `messageID` | string                                              | no       | `state` is `start`   |
| `state`     | `"start"` or `"content"` or `"end"`                 | yes      | always               |

### `block`

Marks the conversation entering a block, identified by its block ID.

| Field     | Type   | Required |
| --------- | ------ | -------- |
| `blockID` | string | yes      |

### `call-forward`

Signals that the call is being forwarded. The payload always carries the destination in `address` and its kind in `addressType`; a `phone` forward may also carry an `extension` and a `callerIDPassthrough` flag. See the call forward step for configuration.

| Field                 | Type                 | Required | Present when             |
| --------------------- | -------------------- | -------- | ------------------------ |
| `address`             | string               | yes      | always                   |
| `addressType`         | `"phone"` or `"sip"` | yes      | always                   |
| `callerIDPassthrough` | boolean              | no       | `addressType` is `phone` |
| `extension`           | string               | no       | `addressType` is `phone` |

### `channel-action`

A channel-specific action, named by the channel integration, with an action-defined payload.

| Field     | Type   | Required |
| --------- | ------ | -------- |
| `name`    | string | yes      |
| `payload` | object | yes      |

### `completion`

Marks a model completion event during the turn. Streaming clients receive the completion lifecycle described under completion event traces.

| Field        | Type                                | Required | Present when                |
| ------------ | ----------------------------------- | -------- | --------------------------- |
| `ai`         | boolean                             | no       | `state` is `start`          |
| `content`    | string                              | no       | `state` is `content`        |
| `delay`      | number                              | no       | `state` is `start`          |
| `messageID`  | string                              | no       | `state` is `start`          |
| `ref`        | DebugTraceRef                       | no       | `state` is `start` or `end` |
| `sourceUrls` | object\[]                           | no       | `state` is `start`          |
| `state`      | `"start"` or `"content"` or `"end"` | yes      | always                      |

### `debug`

Debug output for the turn, with a message and optional level, context, and metadata. Surfaced in agent logs rather than to end users.

| Field      | Type                                                        | Required |
| ---------- | ----------------------------------------------------------- | -------- |
| `context`  | string                                                      | no       |
| `level`    | `"fatal"` or `"error"` or `"warn"` or `"info"` or `"debug"` | no       |
| `message`  | string                                                      | yes      |
| `metadata` | object                                                      | no       |
| `ref`      | DebugTraceRef                                               | no       |
| `type`     | string                                                      | no       |

### `dtmf`

Configures keypad (DTMF) input collection on a call: whether it is enabled, the timeout, the ending delimiter, and the digit cap.

| Field              | Type              | Required |
| ------------------ | ----------------- | -------- |
| `delimiter`        | `"#"` or `"*"`\[] | yes      |
| `enabled`          | boolean           | yes      |
| `maxDigits`        | number            | yes      |
| `timeoutInSeconds` | number            | yes      |

### `entity-filling`

Requests a value for a named entity, wrapping the intent request being filled.

| Field          | Type          | Required |
| -------------- | ------------- | -------- |
| `entityToFill` | string        | yes      |
| `intent`       | IntentRequest | yes      |

### `flow`

Marks the conversation entering a flow, identified by its diagram ID.

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| `diagramID` | string | yes      |
| `name`      | string | no       |

### `goto`

Instructs the client to re-send the wrapped request on the next turn.

| Field     | Type        | Required |
| --------- | ----------- | -------- |
| `request` | BaseRequest | yes      |

### `knowledgeBase`

Reports a knowledge base retrieval: the chunks returned and the query that produced them.

| Field    | Type      | Required |
| -------- | --------- | -------- |
| `chunks` | object\[] | yes      |
| `query`  | object    | no       |

### `live-agent-handoff`

Signals a handoff of the conversation to a live agent platform. Every shape of the payload carries `conversationID`, `message`, and `event`; the remaining fields vary by shape, and some carry a `provider` naming the platform.

This payload has 4 shapes; a field is listed once, and marked required only when every shape both has and requires it.

| Field                    | Type                                                | Required | Present when         |
| ------------------------ | --------------------------------------------------- | -------- | -------------------- |
| `agent`                  | object                                              | no       | always               |
| `config`                 | LiveAgentHandoffWidgetConfig                        | no       | some shapes (1 of 4) |
| `continueMessage`        | string                                              | no       | some shapes (1 of 4) |
| `conversationID`         | string                                              | yes      | always               |
| `downloadMessage`        | string                                              | no       | some shapes (1 of 4) |
| `event`                  | `"chat_started"`                                    | yes      | always               |
| `file`                   | object                                              | no       | some shapes (1 of 4) |
| `message`                | string                                              | yes      | always               |
| `newConversationMessage` | string                                              | no       | some shapes (1 of 4) |
| `provider`               | `"ujet"` or `"genesys"` or `"kustomer"` or `"dixa"` | no       | some shapes (1 of 4) |
| `translationKey`         | string                                              | no       | always               |
| `translationParams`      | object                                              | no       | always               |

### `log`

Diagnostic log output attached to the turn. The `payload` is always present and is a free-form object: the spec declares no named fields on it and permits any.

### `path`

Reports which path the conversation took out of a step.

| Field  | Type   | Required |
| ------ | ------ | -------- |
| `path` | string | yes      |

### `realtime-agent`

Marks realtime agent activity on the turn. The payload's `action` field selects the shape: `START` carries `input` and `output`, while `END` and `INTERRUPTED` carry the action alone.

| Field    | Type                                    | Required | Present when        |
| -------- | --------------------------------------- | -------- | ------------------- |
| `action` | `"START"` or `"END"` or `"INTERRUPTED"` | yes      | always              |
| `input`  | object                                  | no       | `action` is `START` |
| `output` | object                                  | no       | `action` is `START` |

### `reasoning`

Marks model reasoning activity during the turn. The payload's `state` field selects the shape: `content` carries a `content` string, `final` carries a `message`, and `start` and `end` carry the state alone.

| Field     | Type                                             | Required | Present when         |
| --------- | ------------------------------------------------ | -------- | -------------------- |
| `content` | string                                           | no       | `state` is `content` |
| `message` | string                                           | no       | `state` is `final`   |
| `state`   | `"start"` or `"content"` or `"end"` or `"final"` | yes      | always               |

### `speak`

A spoken response for voice channels, carrying the message text and optionally a synthesized audio source and voice name.

| Field      | Type                     | Required |
| ---------- | ------------------------ | -------- |
| `ai`       | boolean                  | no       |
| `isPrompt` | boolean                  | no       |
| `message`  | string                   | yes      |
| `src`      | string                   | no       |
| `type`     | `"audio"` or `"message"` | yes      |
| `voice`    | string                   | no       |

### `stream`

An audio stream event. The payload carries the source in `src`, a `token`, and an `action` of `LOOP`, `PLAY`, `PAUSE`, or `END`; `title`, `description`, `iconImage`, `backgroundImage`, and `loop` are optional.

| Field             | Type                                         | Required |
| ----------------- | -------------------------------------------- | -------- |
| `action`          | `"LOOP"` or `"PLAY"` or `"PAUSE"` or `"END"` | yes      |
| `backgroundImage` | string                                       | no       |
| `description`     | string                                       | no       |
| `iconImage`       | string                                       | no       |
| `loop`            | boolean                                      | no       |
| `src`             | string                                       | yes      |
| `title`           | string                                       | no       |
| `token`           | string                                       | yes      |

### `tool-call`

Marks a tool call made by the agent during the turn. The payload always carries the `callID` and a `state` of `start` or `end`; a `start` may also carry a `sound`.

| Field    | Type                 | Required | Present when       |
| -------- | -------------------- | -------- | ------------------ |
| `callID` | string               | yes      | always             |
| `sound`  | object               | no       | `state` is `start` |
| `state`  | `"start"` or `"end"` | yes      | always             |

### `visual`

Displays an image, with optional device sizing and layout options.

| Field              | Type                                  | Required |
| ------------------ | ------------------------------------- | -------- |
| `canvasVisibility` | `"full"` or `"hidden"` or `"cropped"` | no       |
| `device`           | string                                | no       |
| `dimensions`       | object                                | no       |
| `frameType`        | string                                | no       |
| `image`            | string                                | yes      |
| `options`          | object                                | no       |
| `visualType`       | `"image"`                             | no       |

### Custom actions

Custom action traces can be returned by functions and use the string you defined in RelVoca as the `type` value. The `defaultPath` field indicates which path is set as the default: `0` for the first path, `1` for the second, and so on. Their payload is provided as JSON, as shown:

```json theme={null}
{
  "type": "calendar",
  "time": 1720552033,
  "payload": {
    "today": 1700096585398
  },
  "defaultPath": 0,
  "paths": [
    { "event": { "type": "done" } },
    { "event": { "type": "cancel" } }
  ]
}
```

### end

Returned when the conversation reaches an End step. On receiving this trace, your application should treat the session as closed.

```json theme={null}
{
  "type": "end",
  "time": 1720552033,
  "payload": null
}
```

## Completion event traces

When using the streaming endpoint, you may also encounter `completion` traces. A single `completion` type marks the lifecycle of an AI generation event within a stream: the payload's `state` field moves through `start`, `content`, and `end`. See [Completion events](/docs/api-reference/conversations-api/completion-events) for the full stream format.
