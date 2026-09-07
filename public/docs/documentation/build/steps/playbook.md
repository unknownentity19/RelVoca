> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Playbook

> Add agentic playbooks to your deterministic workflows.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/steps/workflows/Playbook-step-cover.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=81df878b874fc9b390383366eea706f0" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Playbook-step-cover.png" />

The Playbook step lets you call a [Playbook](/docs/documentation/build/playbooks) from within your workflow. Playbooks are agentic AI components that respond dynamically to users based on instructions, rather than following a fixed sequence of steps. Use this step when you want your workflow to hand off to an intelligent, flexible conversation before returning to your deterministic logic.

## Using the Playbook step

Drag the Playbook step onto the canvas and connect it to the step before it. Click on the step to select which playbook to run.

Select an existing playbook from the dropdown, or create a new one by clicking **New playbook**. Once selected, you can configure how the playbook behaves within your workflow and define exit conditions that create paths back to your workflow.

### Configuration

* **Listen for other triggers**: When enabled, allows your agent to recognize and respond to [events](/docs/documentation/build/behaviour), [DTMF inputs](/docs/documentation/build/behaviour), and switch to your [Agent](/docs/documentation/build/global-prompt) while the playbook is active. When disabled, the playbook focuses solely on its instructions.
* **Playbook talks first**: When enabled, the playbook sends its first response immediately upon entering the step. When disabled, the playbook waits for user input before responding.
* **Exit every conversational turn**: When enabled, the playbook returns control to the workflow after each message exchange with the user, creating a connection point labeled **Exit conversational turn**. When disabled, the playbook continues handling the conversation until an exit condition is met.

### Exit conditions

Exit conditions let your playbook hand off control to other parts of your workflow when specific situations arise. Each exit condition creates a connection point on the step that you can connect to other steps in your workflow. For example, you might create an exit condition called "Speak to human" that triggers when a user requests human assistance, then connect it to a Call forward step. [Learn more about exit conditions](/docs/documentation/build/playbooks).
