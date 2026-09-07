> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Completion Events

> Stream an agent reply token by token instead of waiting for the finished message, using the start, content, and end completion event states.

When conversing with LLMs such as ChatGPT or Claude, you notice that unlike human communications, where we send complete message by complete message, it "streams" in the text one piece at a time, and not even necessarily in complete words. LLMs work by generating their responses token by token.

<img align="center" width="60% " src="https://mintcdn.com/voiceflow-009a8802/RcBeNfx36Gq3y9dL/images/completion-events-token-streaming.png?fit=max&auto=format&n=RcBeNfx36Gq3y9dL&q=85&s=fd11b33080e070b52386fa5b0f468d63" data-path="images/completion-events-token-streaming.png" />

It can take quite long for an LLM to write a complete paragraph - even for the fastest models.

With the **Response AI / Prompt** step, by default the API will wait for the entire response to be generated before sending the text back. This can often take a few seconds and mean users have to wait a long time and then suddenly get a very long message.

By setting the `?completion_events=true` query parameter in the [Interact Stream](/docs/api-reference/v4interact/interact-stream) API, RelVoca will return output from the **Response AI / Prompt** steps as a text stream as it's generated, which can be shown to the user on an interface capable of handling partial responses.

> 📘 Only the  **Response AI / Prompt** step produces completion events

## Example Response `completion_events=false`

```json Response theme={null}
event: trace
id: 1
data: {
  "type": "text",
	"payload": {
    "message": "Welcome to our service. How can I help you today? Perhaps you're interested in our latest offers or need assistance with an existing order? Let me know if you have any other questions!",
  },
  "time": 1725899197143
}

event: end
id: 2
```

This is what a response might look like normally. The user might have to wait a bit before seeing the message.

## Example Response `completion_events=true`

```json Response theme={null}
event: trace
id: 1
data: {
  "type": "completion",
  "payload": {
    "state": "start"
  },
  "time": 1725899197143
}

event: trace
id: 2
data: {
  "type": "completion",
  "payload": {
    "state": "content",
    "content": "Welcome to our service. How can I help you today? Perh",
  },
  "time": 1725899197144
}

event: trace
id: 3
data: {
  "type": "completion",
  "payload": {
    "state": "content",
    "content": "aps you're interested in our latest offers or need ",
  },
  "time": 1725899197145
}

event: trace
id: 4
data: {
  "type": "completion",
  "payload": {
    "state": "content",
    "content": "assistance with an existing order? Let",
  },
  "time": 1725899197146
}

event: trace
id: 5
data: {
  "type": "completion",
  "payload": {
    "state": "content",
    "content": " me know if you have any other questions!",
  },
  "time": 1725899197147
}

event: trace
id: 6
data: {
  "type": "completion",
  "payload": {
    "state": "end",
  },
  "time": 1725899197148
}

event: end
id: 7
```

With `completion_events` turned on, it still takes the same total time to get the entire message, but the user will be able to see the first chunk of text within milliseconds: *Welcome to our servi..."*

Enabling `completion_events` means the API will return a `completion` trace instead of a `text` (or `speak`) trace. There is a `payload.state` property which is one of three values:

* `state: "start"` to signal the start of a completion stream.
* `state: "content"` to stream in additional text to the same text block, under the `content` property
* `state: "end"` to signal that the completion is now finished, and the final LLM token usage

These trace types facilitate the delivery of text streaming as the large language model (LLM) generates the response message. Note, the `content` data may not always be in complete sentences or words.

It is the responsibility of the API caller to stitch the data together and have it reflect live on the conversation interface.

## Examples

See our [`streaming-wizard`](https://github.com/voiceflow/streaming-wizard) demo (NodeJS). Note the use of the `"end"` state as a marker to start a new line in the conversation.

## Deterministic and Streamed Messages

It may be jarring to pair this with existing deterministic messages that come out fully completed. Some messages stream in, while others are sent as whole. To mitigate this, you can either:

* create a fake streaming effect for deterministic messages that matches what messages streamed through completion events look like
* accumulate enough completion traces  to form a complete sentence, and send group streamed responses into sentences before displaying them. Look for delimiters such as `.` `?` `!` `;` `\n` (newline). You can then send the completion as a group of smaller complete messages.
