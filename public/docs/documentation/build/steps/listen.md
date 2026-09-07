> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Listen

> Capture the user's response and save it to a variable.

<Info>
  While the Listen step is a great way to collect information during scripted flows, most of the time, it's better to use a [Playbook step](/docs/documentation/build/steps/playbook) to capture user input. The Playbook step allows you to have two-way conversations inside a workflow, meaning you can build a much more powerful agent.
</Info>

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Listen-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=0f1ff65757958ffdfe408018569f1808" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Listen-step-cover.png" />

The Listen step pauses your workflow and waits for the user to respond. When they do, their entire message is saved to a variable that you can use later in your agent. Use it when you need to collect open-ended input like feedback, descriptions, or any freeform text response during a scripted flow.

## Using the Listen step

Drag the Listen step onto the canvas and connect it to the step before it. Click on the step to configure where the user's response should be saved.

### Configuration

* **Save entire reply to**: Select or create a variable where the user's complete message will be stored. This variable can be referenced later in your workflow.
* **No reply**: Toggle this on to handle situations when the user doesn't respond within a set timeframe. Configure how long to wait and what message to send as a reminder.
* **Listen for other triggers**: Toggle this on to allow your agent to respond to other triggers while waiting for the user's reply. When off, the agent focuses only on capturing the user's input at this step.
