> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate with third-party tools

> Connect your agent with the outside world in 5 minutes.

RelVoca's tools let you connect your agent to external services so it can take real-world actions during a conversation. This guide walks you through a complete integration using the [Gmail tool](/docs/documentation/build/tools/gmail-tool), which you can use to automatically send emails directly from your agent.

### What can integrating tools be used for?

RelVoca offers the option to link other softwares (ie. Gmail, Excel, etc.) to your agent in a couple of simple steps. For example, you want your agent to send an email? Integrate the Gmail tool and it can do that!

<Steps>
  <Step title="Set up your agent">
    In a new project or an existing one, open the [Agent](/docs/documentation/build/global-prompt) tab. Make sure your agent has a global prompt that defines its overall behaviour and purpose. If this is your first time setting up an agent, [visit our getting started guide](/docs/courses/chat-agent-quick-start) before continuing.
  </Step>

  <Step title="Create a playbook">
    Create a new [playbook](/docs/documentation/build/playbooks) and title it "Send summary email". In the playbook's **Trigger**, describe its purpose so the agent knows when to invoke it.

    For this integration, your playbook will need to collect an `{email_address}` from the user to send emails to. Use the example prompt below as a starting point for your "Send summary email" playbook.

    ```text theme={null}
    Your goal is to wrap up the conversation by sending the user a summary of what was discussed over email.

    **Steps:**
    1. Ask the user for their email address in a friendly way (eg: "Before I send that over, could I grab your email address?")
    2. Store it as {email_address}
    3. Confirm the address back to the user before sending
    ```
  </Step>

  <Step title="Connect the Gmail tool">
    Inside your playbook, add the Gmail tool. Select **Connect** → **Connect**, then choose your Gmail account. Once connected, select **Send email** as the action.

    In the tool's **Trigger**, describe what you want the tool to send (eg: a summary of the conversation sent to `{email_address}`). Use the example below as a reference.

    Send a friendly summary email to email\_address. The subject line should be "Here's a summary of our conversation". In the body, write a short, warm recap of the key points discussed, any actions the user said they'd take, and anything you agreed to follow up on. Keep it concise and easy to skim.

    ```text theme={null}
    Send a summary email to {email_address} with the following:

    **To:** {email_address}
    **Subject:** Here's a summary of our conversation

    **Body:**
    - A short, warm intro (1-2 sentences)
    - Key points discussed
    - Any actions the user said they'd take
    - Anything you agreed to follow up on

    Keep it concise and easy to skim.
    ```
  </Step>

  <Step title="Publish your agent">
    Open **Agent** → **Publish** in the top-right corner. Your agent is now live and can automatically send emails from your connected Gmail account!
  </Step>
</Steps>

## What's next?

Now that you've connected your first integration, you're ready to explore all the tools available for your agent.

<Card icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/integration.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=84140036a98f211c30645b08808ccecb" href="/docs/documentation/build/tools/overview" title="Third-party integrations" width="24" height="24" data-path="images/icons/integration.svg">
  All of RelVoca's officially supported integrations.
</Card>

Want to connect to another service? You can use the [API tool](/docs/documentation/build/tools/api-tool) in a playbook or the [API step](/docs/documentation/build/steps/api) in a workflow to connect to any external API.
