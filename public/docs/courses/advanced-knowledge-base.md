> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build an advanced FAQ agent

> Create a support agent for different user types using metadata filtering to serve the right content.

In this tutorial, you will build a support agent for GoRoute, a fictional ride-sharing and delivery platform. GoRoute has two user types, drivers and couriers, each with different policies, FAQs, and workflows. You'll import content from two separate help sites using LLM chunking strategies, tag each with metadata, and build playbooks that filter the knowledge base so drivers only see driver content and couriers only see courier content.

Before you start, visit [goroute.demo.voiceflow.com](https://goroute.demo.voiceflow.com/) to explore the GoRoute website and see the content you'll be importing into the knowledge base.

<Steps>
  <Step title="Create a new project">
    From the [Dashboard](/dashboard), go to **Projects** → **New project**. Name your project "GoRoute Support", set the type to **Chat**, and select **Start from scratch**.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-1-1.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=a280ae8a58f84875393ec8949b4bd4b5" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-1-1.mp4" />
  </Step>

  <Step title="Import driver help content">
    Click **Knowledge Base** in the left sidebar, then **Add data sources**. Select **Sitemap** and paste the URL for the driver help center:

    ```text theme={null}
    https://goroute.demo.voiceflow.com/driver
    ```

    RelVoca will crawl the sitemap and import all pages under this URL. Under the **Folder** dropdown, click **Create folder** and name it "Driver". This keeps your driver content organized and easy to find as your knowledge base grows.

    Under **LLM chunking strategies**, enable the following three options:

    * **Smart chunking**: splits content into logical, topic-based sections, which works well for help articles that cover multiple topics on a single page.
    * **FAQ optimization**: generates sample questions each section could answer, improving retrieval when users phrase things differently than the source content.
    * **Remove HTML and noise**: cleans up messy formatting from web pages so the agent processes clean text.

    <Tip>
      Different types of content benefit from different chunking strategies. The combination above works well for help center sites, but when you import your own data, experiment with different strategies to find what gets the best results for your content.
    </Tip>

    Before importing, click **+** in the **Metadata** section and add the following tag:

    | Key         | Value    |
    | ----------- | -------- |
    | `user_type` | `driver` |

    This metadata tag is what allows you to filter queries later so the agent only retrieves driver-specific content when helping a driver.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-2-fixed.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=1c9c45fefe261c6c3e974f4818b29295" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-2-fixed.mp4" />
  </Step>

  <Step title="Import courier help content">
    Click **Add data sources** again. Select **Sitemap** and paste the courier help center URL:

    ```text theme={null}
    https://goroute.demo.voiceflow.com/courier
    ```

    Create a new folder called "Courier" under the **Folder** dropdown. Then select the same three **LLM chunking strategies** as before: **Smart chunking**, **FAQ optimization**, and **Remove HTML and noise**. Add the metadata tag:

    | Key         | Value     |
    | ----------- | --------- |
    | `user_type` | `courier` |

    After both imports finish, your knowledge base will contain content from both help centers. Each article will be tagged based on `user_type`. You can verify this by clicking on a data source and checking its metadata in the right panel. You'll also notice that each page has been split into multiple chunks based on the sections of the page. This is the LLM chunking strategies at work, breaking content into logical, topic-based pieces so the agent can retrieve more precise answers.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-3.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=8ff6a8b95f84ef39553e988f7fa3ac22" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-3.mp4" />
  </Step>

  <Step title="Set up the agent">
    Click the **Agent** tab. You'll configure two things here: the **Global prompt** and the **Instructions**. The global prompt defines your agent's personality and applies to every turn. Instructions tell the agent how to route requests to the right skill.

    In the **Global prompt** section, define your agent's identity:

    ```text highlight={3-4} theme={null}
    # Personality
    You are a support agent for GoRoute, a ride-sharing and delivery platform. You help both drivers and couriers with questions about the platform, policies, earnings, and troubleshooting.

    # Tone
    Friendly, clear, and efficient. Keep answers concise. Use simple language, as many users are checking between rides or deliveries.

    # Guardrails
    Never provide information meant for drivers to couriers, or vice versa. The policies are different and mixing them up causes real problems. If you're unsure which user type someone is, ask before answering. Never guess at pay rates, bonuses, or policy details.
    ```

    Then in the **Instructions** field, add routing logic. You'll reference the playbooks you create in the next steps, so come back here to update the skill names if needed:

    ```text theme={null}
    # Identify the user
    At the start of the conversation, determine whether the user is a driver or a courier. If it's not clear from their first message, ask: "Are you a GoRoute driver or a courier?"

    # Skills
    Route to the Driver Support playbook when the user is a driver and asks about ride policies, earnings, vehicle requirements, driver app issues, or any driver-specific topic.

    Route to the Courier Support playbook when the user is a courier and asks about delivery policies, earnings, bag requirements, courier app issues, or any courier-specific topic.

    If the user asks about something that applies to both (like account settings or payment methods), route to whichever playbook matches the user type they identified as.
    ```

    Finally,  toggle off the **Knowledge base** in the **System tools** section of the sidebar. In this tutorial, you only want the knowledge base queried from inside playbooks where metadata filtering is configured. Leaving it on at the agent level would let the agent query all content without any filtering, which could return the wrong information for the user type.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-4.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=d8e4ead8b3270ec5b86033712da2a390" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-4.mp4" />
  </Step>

  <Step title="Create the driver support playbook">
    In the **Agent** tab, click **+** in the **Skills** panel to create a new [playbook](/docs/documentation/build/playbooks). Name it "Driver Support".

    Set the **Trigger**:

    ```text theme={null}
    Answers questions about GoRoute driver topics including ride policies, earnings, vehicle requirements, and driver app issues.
    ```

    Then write the playbook **instructions**:

    ```text theme={null}
    # Goal
    Help the driver find accurate answers to their questions about driving on the GoRoute platform.

    # Steps
    1. Search the knowledge base for information related to the driver's question.
    2. Provide a clear, concise answer based on what you find.
    3. If the answer involves multiple steps (like a setup process or troubleshooting flow), walk through them one at a time.
    4. If no relevant information is found, let the driver know and offer to connect them with the GoRoute driver support team.

    # Important
    Only use information retrieved from the knowledge base. Do not answer driver questions from general knowledge. GoRoute policies are specific to the platform.
    ```

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-5.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=eea3af632dcbd3d91b34b40080ebeb91" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-5.mp4" />
  </Step>

  <Step title="Add knowledge base filtering to the driver playbook">
    In the **System tools** section on the right, enable the **Knowledge base** tool. Then, click on the tool to expand its settings. Open **Advanced query settings**, then under **Metadata filtering** click **+** to add a filter:

    | Key         | Value    |
    | ----------- | -------- |
    | `user_type` | `driver` |

    This ensures that when the agent runs the Driver Support playbook, it only retrieves content tagged with `user_type: driver`. Courier content will never appear in the results.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-6.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=bac6fd1ec9336a048b86256bb023d23c" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-6.mp4" />
  </Step>

  <Step title="Create the courier support playbook">
    Create another playbook called "Courier Support".

    Set the **Trigger**:

    ```text theme={null}
    Answers questions about GoRoute courier topics including delivery policies, earnings, bag requirements, and courier app issues.
    ```

    Then write the playbook **instructions**:

    ```text theme={null}
    # Goal
    Help the courier find accurate answers to their questions about delivering on the GoRoute platform.

    # Steps
    1. Search the knowledge base for information related to the courier's question.
    2. Provide a clear, concise answer based on what you find.
    3. If the answer involves multiple steps, walk through them one at a time.
    4. If no relevant information is found, let the courier know and offer to connect them with the GoRoute courier support team.

    # Important
    Only use information retrieved from the knowledge base. Do not answer courier questions from general knowledge. GoRoute policies are specific to the platform.
    ```

    Then configure metadata filtering on this playbook's Knowledge base tool. Open **Advanced query settings**, click **+** next to **Metadata filtering**, and this time set the value to `courier`:

    | Key         | Value     |
    | ----------- | --------- |
    | `user_type` | `courier` |

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-7.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=eeef2fb66b9add324e2c58e6f1f26e55" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-7.mp4" />
  </Step>

  <Step title="Test with both user types">
    Click **Run** in the top-right corner to test your agent. Try sending these messages to verify routing and filtering are working correctly:

    ```text theme={null}
    Driver test: "I'm a driver. What are the vehicle requirements to drive for GoRoute?"

    Courier test: "Hey, I do deliveries for GoRoute. What kind of bag do I need?"

    Ambiguous test: "How do I update my payment info?"
    ```

    Check the conversation logs to confirm:

    * The correct playbook was triggered for each user type
    * The knowledge base query results only contain content matching the right `user_type` metadata tag
    * The ambiguous test prompts the agent to ask which user type they are, unless you've already mentioned your user type.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/kb-advanced-step-8-compressed.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=07225e440afb1f3beac6dd36d24fc967" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/kb-advanced-step-8-compressed.mp4" />
  </Step>
</Steps>

## Tips for building filtered knowledge bases

* **Verify your filtering.** Monitor the logs panel while testing and click into the logs labelled `[Agent] knowledge base search completed`. You should only see chunks tagged with the correct `user_type`. If you see mixed results, double-check your metadata tags on the data sources and the filter configuration in each playbook.
* **Combine chunking strategies for web content.** Smart chunking splits pages into logical sections, FAQ optimization helps match varied user phrasing, and Remove HTML and noise cleans up web formatting. Together, they significantly improve retrieval quality for help center content.
* **Scale this pattern.** You can add more user types (eg: `user_type: restaurant_partner`) by importing more content with new metadata values and creating additional playbooks with the corresponding filters.

## What's next?

You've built an agent that serves different content to different user types using metadata filtering. Explore these resources to go deeper.

<Columns cols={2}>
  <Card title="Querying the knowledge base" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/add-data.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=d56d31858427ae430c371a094e0ce9e6" href="/docs/documentation/build/querying-the-knowledge-base" width="24" height="24" data-path="images/icons/add-data.svg">
    Advanced configuration for knowledge base queries, including custom queries and query re-writing.
  </Card>

  <Card title="Knowledge base API" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/api.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=90c110ad0e560b2a46a59ba4eef64c2d" href="/docs/api-reference/sections/build" width="24" height="24" data-path="images/icons/api.svg">
    Programmatically import data into your knowledge base, ensuring it always stays up to date.
  </Card>
</Columns>
