> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Card

> Display a card with an image, text, and buttons.

<Info>
  For agentic card generation where cards are dynamically created based on conversation context, use the [cards system tool](/docs/documentation/build/tools/system-tools) inside a [Playbook](/docs/documentation/build/playbooks) instead of the Card step.
</Info>

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Cardstepcover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=dc5ed98fcdb7b4b200a6a94e38d4bd98" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Cardstepcover.png" />

The Card step shows a visual card in your chat interface. Cards combine an image, title, description, and buttons in a single interactive element. Use this step when you want to present information visually, like displaying product details, showing profile summaries, or highlighting key features with actions users can take.

## Using the Card step

Drag the Card step onto the canvas and connect it to the step before it. Click on the step to configure your card's content.

<video autoPlay={true} muted={true} loop={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/cards.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=f088bfb416367ac7a17540ec949ce6df" data-path="videos/cards.mp4" />

Add an image by either uploading a file or providing a URL. Enter a title and description for your card, using text or variables. Then add buttons that users can click to continue the conversation.

### Configuration

* **Image**: Upload an image file or provide a URL. Supported formats include .png, .jpg, and .gif.
* **Card title**: Enter the heading text that appears on the card. You can use [variables](/docs/documentation/build/data/variables) by wrapping them in curly braces (eg: `{product_name}`).
* **Card description**: Enter descriptive text that appears below the title. You can use variables and basic formatting.
* **Buttons**: Add clickable buttons to your card. Each button creates a connection point that you can connect to other steps in your workflow. Optionally add URLs to buttons. Unlike the [Buttons step](/docs/documentation/build/steps/buttons), card buttons persist after the user clicks them, so users can return to the card and make another selection.

### Additional settings

* **No match**: When enabled, handles situations where the user's response doesn't match any button label. Your agent can send a message or follow a path in situations where the user's response is invalid.
* **No reply**: When enabled, handles situations where the user doesn't respond within a specified time. Your agent can either send messages periodically or follow a path after the specified time.
