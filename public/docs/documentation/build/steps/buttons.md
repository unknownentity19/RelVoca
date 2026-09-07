> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Buttons

> Display clickable buttons for users to interact with.

<Info>
  For agentic button generation where buttons are dynamically created based on conversation context, use the [buttons system tool](/docs/documentation/build/tools/system-tools) inside a [Playbook](/docs/documentation/build/playbooks) instead of the Buttons step.
</Info>

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Buttonstepcover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=96044f2cc0da78decb66b13f1a0df0e0" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Buttonstepcover.png" />

The Buttons step shows clickable buttons in your chat interface. Each button can either trigger a specific path in your workflow or open a URL. Use this step when you want to present clear options to users, like choosing between different services, confirming a selection, or navigating to external resources.

## Using the Buttons step

Drag the Buttons step onto the canvas and connect it to the step before it. Click on the step to add and configure your buttons.

Click the **+** icon to add a button. Enter a button label using text or a variable. You can add multiple buttons by clicking **Add another**.

## Using the Buttons step

Drag the Buttons step onto the canvas and connect it to the step before it. Click on the step to add and configure your buttons.

<video autoPlay={true} muted={true} loop={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/button.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=307fd28c44709ba3701397631bfc7bde" data-path="videos/button.mp4" />

Click the **+** icon to add a button. Enter a button label using text or a variable. Each button creates a connection point on the step that you can connect to other steps in your workflow. Click **Add another** to create multiple buttons.

### Configuration

* **Button**: Enter the text that appears on the button. You can use variables by wrapping them in curly braces (eg: `{product_name}`).
* **URL**: Optionally add a URL that opens when the button is clicked. Choose whether it opens in a new tab or the existing tab. The workflow will still continue down the button's connected path even when a URL is set.

### Additional settings

* **No match**: When enabled, handles situations where the user's response doesn't match any button label. Your agent can send a message or follow a path in situations where the user's response is invalid.
* **No reply**: When enabled, handles situations where the user doesn't respond within a specified time. Your agent can either send messages periodically or follow a path after the specified time.
* **Listen for other triggers**: When enabled, allows your agent to recognize and respond to [events](/docs/documentation/build/behaviour), [DTMF inputs](/docs/documentation/build/behaviour), and route to Playbooks attached to your [Agent](/docs/documentation/build/instructions) while waiting for a button selection. When disabled, the agent only responds to button clicks.
