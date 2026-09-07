> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat agent quick start guide

> Build and launch your first chat agent in 3 minutes or less.

Create, configure, and publish your first chat agent on RelVoca. No coding required.

<Steps>
  <Step title="Create a new project">
    From the [Dashboard](/dashboard), go to **Projects** → **New project**. Name your project, keep the default settings, and select **Start from scratch**.

    <video autoPlay={true} loop={true} muted={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/chat.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=1352a3d15390b3e2bebb8af81d4622fe" data-path="videos/chat.mp4" />

    This opens the global agent view, where you'll configure your agent's high-level behavior.
  </Step>

  <Step title="Set up your agent's persona">
    In the **Global agent** description, click **generate** and describe your agent's actions, goals, and personality. RelVoca will automatically create a detailed prompt in seconds.

    For example:

    ```text theme={null}
    You are Alex, a friendly customer support agent for AcmeCorp.
    Help customers with orders, returns, billing, and product questions.
    Be concise, empathetic, and professional. If you can't resolve an
    issue, offer to create a support ticket.
    ```

    <video autoPlay={true} loop={true} muted={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/chat-generate.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=87323acb8d520c1363147d543c226dac" data-path="videos/chat-generate.mp4" />
  </Step>

  <Step title="Add a knowledge base (optional)">
    To give your agent real information to reference, click the **Knowledge Base** icon in the left sidebar. You can add context by:

    * **Uploading documents** - PDFs, text files, or CSVs (e.g., your FAQ, product catalog, or return policy).
    * **Pasting a URL** - Your agent will index the content directly from the page.
    * **Adding text manually** - Paste in key information directly.

    Your agent will use this knowledge to answer questions accurately.
  </Step>

  <Step title="Publish your agent">
    Back in the **Agent** tab, click **Publish** in the top-right corner. Your agent is now ready to use!
  </Step>
</Steps>

That's it! Your agent is now deployed and available to use. Try it out using the widget in the bottom-right corner of the editor.

## Tips for refining your chat agent

* **Start simple.** Get a basic agent working first, then layer on complexity. You can add deterministic [Workflow](/docs/documentation/build/workflows) steps and agentic [Playbooks](/docs/documentation/build/playbooks) to get the most out of your agent.
* **Use your knowledge base.** The more relevant content you upload, the more accurate your agent's responses will be.
* **Iterate on your prompt.** Small tweaks to the system prompt can make a big difference in response quality.

## What's next?

You've built your first chat agent on RelVoca. Now learn how to build production-grade agents with our documentation.

<Columns cols={2}>
  <Card title="Playbooks" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/documentation.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=3cc1ccb7332cb518c4867900c5351b68" href="/docs/documentation/build/playbooks" width="24" height="24" data-path="images/icons/documentation.svg">
    Complete specialized tasks using AI.
  </Card>

  <Card title="Workflows" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/grid.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=d110c5da52029280eef514f1d07353c8" href="/docs/documentation/build/workflows" width="24" height="24" data-path="images/icons/grid.svg">
    Add logic and determinism to your agent.
  </Card>
</Columns>

/
