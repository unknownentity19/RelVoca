> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Message

> Send a message to the user.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/steps/workflows/Message-step-cover.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=94793e8268433e3aa01ed5f4b8e25bc0" alt="Message step" width="1920" height="1080" data-path="images/steps/workflows/Message-step-cover.png" />

The Message step sends a single message to the user. You can write a static message with optional variants, or use AI to generate a dynamic message based on the conversation context. Use this step when you need to provide information, confirm an action, or give feedback without expecting a back-and-forth conversation.

## Using the Message step

Drag the Message step onto the canvas and connect it to the step before it. Click on the step to write your message or configure an AI prompt.

<video autoPlay={true} muted={true} loop={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/message.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=2d20e28e050817ca40c5d4cfe68eabc4" data-path="videos/message.mp4" />

### Configuration

The Message step supports two modes:

* **Scripted**: Write a pre-defined message and optionally variants to test different versions of your message with users. You can format text with bold, italics, underline, and include links or emojis.
* **Prompt**: Use AI to generate a single message using a prompt. For multi-turn conversational interactions, use the [Playbook step](/docs/documentation/build/steps/playbook) instead.

Enable the **Wait for user input setting** to pause the workflow after sending the message and wait for the user to respond before continuing.
