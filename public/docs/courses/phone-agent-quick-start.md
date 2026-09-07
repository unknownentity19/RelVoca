> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Voice agent quick start guide

> Build and launch your first voice agent in 3 minutes or less.

Create, configure, and call your first voice agent on RelVoca. No coding required.

<Steps>
  <Step title="Create a new project">
    From the [Dashboard](/dashboard), go to **Projects** → **New project**. Name your project, set the type to **Voice**, and select **Start from scratch**.

    <video autoPlay={true} loop={true} muted={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/voice.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=3d69d4aa621e0b7323ab975c3ce502b5" data-path="videos/voice.mp4" />

    This opens the global agent view, where you'll configure your agent's high-level behavior.
  </Step>

  <Step title="Set up your agent's persona">
    In the **Global agent** description, click **generate** and describe your agent's actions, goals, and personality. You can also customize the agent's tone, speed, and how long it waits for a user to reply. RelVoca will automatically create a detailed prompt in seconds.

    For example:

    ```text theme={null}
    You are Alex, a calm and friendly voice support agent for AcmeCorp.
    Help customers with orders, returns, billing, and product questions.
    Speak naturally in short, conversational sentences — avoid long
    lists or complex phrasing. Stay warm, patient, and reassuring.
    If you can't resolve an issue, offer to create a support ticket.
    ```
  </Step>

  <Step title="Add a knowledge base (optional)">
    To give your agent real information to reference, click the **Knowledge Base** icon in the left sidebar. You can add context by:

    * **Uploading documents** - PDFs, text files, or CSVs (e.g., your FAQ, product catalog, or return policy).
    * **Pasting a URL** - Your agent will index the content directly from the page.
    * **Adding text manually** - Paste in key information directly.

    Your agent will use this knowledge to answer questions accurately.
  </Step>

  <Step title="Publish and call your agent">
    Back in the **Agent** tab, click **Publish** in the top-right corner. To receive a call from your agent, click **Call** in the top-right, enter your phone number, and start speaking with your agent!

    <video autoPlay={true} loop={true} muted={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/voice-publish.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=fe31604a35124eb048e4a3ae58885953" data-path="videos/voice-publish.mp4" />
  </Step>
</Steps>

That's it! Your agent is now deployed and available to use.

## Tips for refining your voice agent

* **Start simple.** Get a basic agent working first, then layer on complexity. You can add deterministic [Workflows](/docs/documentation/build/workflows) and agentic [Playbooks](/docs/documentation/build/playbooks) to get the most out of your agent.
* **Use your knowledge base.** The more relevant content you upload, the more accurate your agent's responses will be.
* **Iterate on your prompt.** Small tweaks to the system prompt can make a big difference in response quality.
* **Set up a phone number.** [Configure a dedicated number](/docs/documentation/deploy/phone/connect-a-phone-number) so your agent can be reached by simply dialing in.

## What's next?

You've built your first voice agent on RelVoca. Now learn how to build production-grade agents with our documentation.

<Columns cols={2}>
  <Card title="Playbooks" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/documentation.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=3cc1ccb7332cb518c4867900c5351b68" href="/docs/documentation/build/playbooks" width="24" height="24" data-path="images/icons/documentation.svg">
    Complete specialized tasks using AI.
  </Card>

  <Card title="Workflows" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/grid.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=d110c5da52029280eef514f1d07353c8" href="/docs/documentation/build/workflows" width="24" height="24" data-path="images/icons/grid.svg">
    Add logic and determinism to your agent.
  </Card>
</Columns>
