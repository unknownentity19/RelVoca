> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build your first workflow

> Create a deterministic flow with a financial disclaimer, buttons, and an embedded playbook for guided conversations.

In this tutorial, you'll build a [workflow](/docs/documentation/build/workflows) for NestEgg, a fictional Canadian financial guidance platform. Workflows are step-by-step flows where every step runs in sequence, exactly as you designed it, with no room for the agent to improvise. They're ideal for processes that must happen in a specific order, like compliance disclaimers, identity verification, or onboarding checklists.

When a user asks Nesty, NestEgg's assistant, for financial advice, the agent will route to the workflow you build. The workflow will display a legal disclaimer, present [buttons](/docs/documentation/build/steps/buttons) to accept or decline, and hand off to a [playbook](/docs/documentation/build/steps/playbook) for a flexible financial conversation if the user agrees. If they decline, control returns to the [agent](/docs/documentation/build/global-prompt). This should take about 5 minutes.

<Steps>
  <Step title="Clone the template project">
    Open the NestEgg Agent template below, choose a workspace to import it to, then click **Import** to add it to your workspace.

    <Card title="Clone NestEgg Agent template" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/copy.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=0167fc06fbc2ac84bbad6668956ceee5" href="/dashboard?import=69cad241da53b8fcd833abed" width="24" height="24" data-path="images/icons/copy.svg">
      Pre-configured NestEgg agent with playbooks and knowledge base content.
    </Card>

    The template comes pre-configured with a global prompt, instructions, and knowledge base content for NestEgg. Two playbooks, **Explain NestEgg** and **Glossary Helper**, are already attached to the agent and handle platform questions and financial term definitions. A third playbook, **Explore Finances**, is included but not yet connected. You'll embed it inside the workflow you're about to build.

    The only piece missing is a **Financial Guidance** workflow that gates financial advice behind a legal disclaimer. You'll build that now.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-1-NEW-2.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=15b32f9f43dc5b99727b4fc57bf23c52" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-1-NEW-2.mp4" />
  </Step>

  <Step title="Create the Financial Guidance workflow">
    In the **Agent** tab, click **+** in the **Skills** panel to create a new [workflow](/docs/documentation/build/workflows). Name it "Financial guidance".

    Set the **Trigger** to:

    ```text theme={null}
    Displays the financial disclaimer and collects the user's agreement before providing financial guidance.
    ```

    Then click **Create workflow**. You'll  be taken to the canvas where you'll build the workflow step by step.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-2.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=0ce1cef580da9cf869d6520004e17605" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-2.mp4" />
  </Step>

  <Step title="Add the disclaimer message">
    Drag a [**Message** step](/docs/documentation/build/steps/message) onto the canvas and connect it to the Start chip. If you don't see the Message step, press the **⌵** button at the top of the step sidebar to show scripted steps.

    In the message step, write the following disclaimer message:

    ```text theme={null}
    Before we continue, please review the following disclaimer:

    NestEgg provides general financial education and information only. Nothing shared in this conversation constitutes personalized financial advice, investment recommendations, or a solicitation to buy or sell any financial product. Your financial situation is unique. Please consult a licensed financial advisor before making any investment decisions.
    ```

    Leave **Wait for user input** disabled. The buttons in the next step will handle that.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-3-NEW.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=5018fb07a87cb26d915bddaa6731692a" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-3-NEW.mp4" />
  </Step>

  <Step title="Add buttons to accept or decline">
    Drag a [**Buttons** step](/docs/documentation/build/steps/buttons) onto the bottom of your Message step to add buttons to your message. Then, add two buttons:

    * `I agree`
    * `I don't agree`

    Each button creates its own connection point on the step. You'll wire each one to a different path.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-4.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=5bc95339463624894dbd80b37e9993a3" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-4.mp4" />
  </Step>

  <Step title="Connect the 'I agree' path to the Explore Finances playbook">
    Drag a [**Playbook** step](/docs/documentation/build/steps/playbook) onto the canvas and connect it to the "I agree" button's connection point. If you don't see the Playbook step, click the **⌵** button at the top of the step sidebar to switch back to agentic steps.

    Then, click into the Playbook step you just added and select the "**Explore finances**" playbook. You should also ensure the **Playbook talks first** is enabled so the playbook greets the user immediately after they accept the disclaimer.

    Once you select the playbook, you'll see an [exit condition](/docs/documentation/build/playbooks) called "User is finished exploring" appear as a connection point on the step. This is how the playbook signals to the workflow that the conversation is finished. Leave it unconnected - when a connection point in a workflow has no target, control passes back to your [agent](/docs/documentation/build/global-prompt) automatically.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-5.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=0185a058e9de0b2c512d1848a696d1a0" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-5.mp4" />
  </Step>

  <Step title="Connect the 'I don't agree' path back to the agent">
    Drag a [**Message** step](/docs/documentation/build/steps/message) onto the canvas and connect it to the "I don't agree" button's connection point. Write a short acknowledgment:

    ```text theme={null}
    No problem. If you change your mind, just ask and I can bring up the disclaimer again. Is there anything else I can help you with?
    ```

    Enable **Wait for user input** on this message so the workflow pauses for the user to respond before handing off to the agent. Leave the output port unconnected. This returns control to the agent.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-6.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=0ebb721312ed4466a3ae8b02203b7682" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-6.mp4" />

    Your completed workflow should look like this:

    <Frame>
      <img alt="Finishedworkflow" lightAlt="Finishedworkflow" darkAlt="Finishedworkflow" src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Finishedworkflow(1).png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=424a20fd34eed13f0981d643736886b7" className="dark:hidden" width="1816" height="918" data-path="images/Finishedworkflow(1).png" />

      <img alt="Finishedworkflow" lightAlt="Finishedworkflow" darkAlt="Finishedworkflow" src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Finishedworkflow(1)-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=26680c53491c84200e11fa8d6ad78c01" className="hidden dark:block" width="1816" height="918" data-path="images/Finishedworkflow(1)-1.png" />
    </Frame>
  </Step>

  <Step title="Test your agent">
    Click **Run** in the top-right corner to test your agent. Try the following:

    **Trigger the workflow:**

    ```text theme={null}
    "What's the difference between a TFSA and an RRSP?"
    ```

    The agent should route to the Financial Guidance workflow. You should see the disclaimer message followed by the two buttons.

    **Accept the disclaimer:**

    Click "I agree". The Explore Finances playbook should take over and start a conversation about your financial question. Try asking follow-up questions to see the playbook navigate the conversation.

    **Decline the disclaimer:**

    This time, open the **Agent** tab and press the **Run** button in the top right of that tab. This will allow you to fully test whether the workflow passes control back to the Agent after the user fails to agree to the terms and conditions.

    Ask the same question as before - `"What's the difference between a TFSA and an RRSP?"` , but this time click **I don't agree**. The Agent will switch to the financial guidance workflow and you should see the acknowledgment message, and then be returned to the agent. Then, try asking a non-financial question to confirm the agent is back in control: `Tell me about NestEgg`. You'll see that this question is still answered using the **Explain NestEgg** playbook, as this doesn't require the terms to be accepted.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/workflows-7.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=12d920cb9fd1fc948db4e0e8f1f14059" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/workflows-7.mp4" />
  </Step>
</Steps>

## Tips for building workflows

* **Use workflows for things that must happen in order.** Legal disclaimers, identity verification, onboarding checklists. Anywhere you need guaranteed steps in a guaranteed sequence, use a workflow. If the conversation can be flexible, use a [playbook](/docs/documentation/build/playbooks) instead.
* **Embed playbooks for flexible moments.** The Explore Finances playbook inside this workflow is a good example. The disclaimer and button choice are deterministic. They happen the same way every time. But the financial conversation afterward is open-ended, so a playbook handles it. This pattern is useful any time you need a controlled entry point followed by a free-form conversation.
* **Leave output ports unconnected to return to the agent.** When a step in a workflow has an empty output port, control passes back to your agent. You don't need to explicitly route back, just leave the port empty.
* **Remember the user's agreement with variables.** Right now, the disclaimer appears every time the workflow runs. In a production agent, you could use a [set step](/docs/documentation/build/steps/set) to save a [variable](/docs/documentation/build/data/variables) like `{disclaimer_accepted}` after the user agrees, and a [condition step](/docs/documentation/build/steps/condition) at the start of the workflow to skip the disclaimer if it's already been accepted.

## What's next?

You've built your first workflow with a deterministic disclaimer flow and an embedded playbook. Explore these resources to go deeper.

<Columns cols={2}>
  <Card title="Workflows" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/grid.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=d110c5da52029280eef514f1d07353c8" href="/docs/documentation/build/workflows" width="24" height="24" data-path="images/icons/grid.svg">
    Learn about all the steps available in workflows, nesting workflows, and more.
  </Card>

  <Card title="Playbooks" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/documentation.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=3cc1ccb7332cb518c4867900c5351b68" href="/docs/documentation/build/playbooks" width="24" height="24" data-path="images/icons/documentation.svg">
    Write better playbook instructions, configure exit conditions, and add tools.
  </Card>
</Columns>
