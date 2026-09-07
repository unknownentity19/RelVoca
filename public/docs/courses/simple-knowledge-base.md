> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a simple FAQ agent

> Create a support agent grounded in FAQ data from your knowledge base.

In this tutorial, you will build a customer support agent for a fictional enterprise software company called NovaTech. Your agent will answer common support questions using FAQ data stored in the knowledge base. This should take about 5 minutes.

<Steps>
  <Step title="Create a new project">
    From the [Dashboard](/dashboard), go to **Projects** → **New project**. Name your project "NovaTech Support", set the type to **Chat**, and select **Start from scratch**.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-simple-step-1.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=33b2ae446c44dc21682efc6760eaa6f9" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-simple-step-1.mp4" />

    This opens the global agent view, where you'll configure your agent's high-level behaviour.
  </Step>

  <Step title="Import your FAQ data">
    Download the sample CSV below and upload it to get started. It contains 50 FAQ entries across Account, Billing, Technical, Features, and General categories.

    <Card title="Download NovaTech FAQ CSV" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/download-m.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=5e9f0390f71dd279edc06e07b97cbed2" href="https://voiceflow.github.io/docs-resources/tutorials/novatech-faq.csv" width="24" height="24" data-path="images/icons/download-m.svg">
      50 sample FAQ entries for the NovaTech support agent.
    </Card>

    To upload the CSV to your knowledge base, click **Knowledge Base** in the left sidebar, then **Add data sources**. Select **Table** and upload the CSV file containing NovaTech's support FAQs.

    Each row in the CSV becomes a separate chunk, and column headers become field names. This makes it easy for the agent to find the right answer for a given question.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-simple-step-2.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=a3aa1046ce3c98e6f50c3b07e5b41ff4" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-simple-step-2.mp4" />
  </Step>

  <Step title="Set up the agent">
    Click the **Agent** tab. You'll configure two things here: the **Global prompt** and the **Instructions**. The global prompt defines your agent's personality and applies to every turn. Instructions tell the agent how to handle different types of requests.

    In the **Global prompt** section, define your agent's identity:

    ```text theme={null}
    # Personality
    You are a friendly and efficient support agent for NovaTech, an enterprise software platform. You help customers resolve issues quickly and clearly.

    # Tone
    Warm, professional, and concise. Avoid jargon. Speak like a helpful colleague, not a robot.

    # Guardrails
    Only provide information grounded in the knowledge base. Never guess at steps, settings, or policies. If you're unsure, say so honestly rather than making something up.
    ```

    Then in the **Instructions** field, tell the agent how to handle incoming questions:

    ```text theme={null}
    Always search the knowledge base before answering a question. Use the information you find to give a clear, step-by-step response.

    If the knowledge base doesn't have a relevant answer, let the customer know honestly and offer to connect them with the NovaTech support team.

    Do not answer questions that are unrelated to NovaTech.
    ```

    Make sure the **Knowledge base** toggle is enabled under **System tools**. This lets your agent automatically search the FAQ data when answering questions.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-simple-step-3.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=8f91f1f7d4d7531ab1f3f5d8f85a42c7" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-simple-step-3.mp4" />
  </Step>

  <Step title="Test your agent">
    Click **Run** in the top-right corner to test your agent. Try prompts like:

    * *"How do I add someone to my team?"*
    * *"My dashboard is super slow, what's going on?"*
    * *"I need to set up 2FA on my account"*
    * *"How do I schedule a report?"*

    Your agent will search the knowledge base and respond with the relevant FAQ answer. If a question doesn't match anything in the CSV, the agent should let the user know that it couldn't find information about their query rather than making up information.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-simple-step-4-1.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=11cb53f9ba8566c7429d4dd50714b97c" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-simple-step-4-1.mp4" />
  </Step>
</Steps>

## Tips for refining your agent

* **Expand your FAQ data.** The more Q\&A pairs in your CSV, the more questions your agent can handle accurately. Add rows as you discover common support requests.
* **Iterate on your prompt.** Small tweaks to the global prompt can make a big difference. Try adjusting the tone or adding specific guardrails based on what you see in testing.
* **Layer on complexity.** Once the basics work, you can add [playbooks](/docs/documentation/build/playbooks) for specific support scenarios (eg: guided troubleshooting, billing disputes) and use [system tools](/docs/documentation/build/tools/system-tools) like Cards or Buttons to make responses more interactive.

## What's next?

Now you've built your first support agent, you're ready to learn about RelVoca's advanced knowledge base functionality.

<Card title="Build an advanced FAQ agent" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/add-data.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=d56d31858427ae430c371a094e0ce9e6" href="/docs/courses/advanced-knowledge-base" width="24" height="24" data-path="images/icons/add-data.svg">
  Learn how to use website importing, metadata filtering, the knowledge base tool inside playbooks, and more.
</Card>
