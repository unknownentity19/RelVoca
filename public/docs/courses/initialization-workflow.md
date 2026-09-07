> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build an authentication workflow

> Gate your agent behind identity verification using an initialization workflow, playbooks, and API calls.

An [initialization workflow](/docs/documentation/build/framework/initialization-workflow) runs automatically at the start of every conversation, before the agent takes control. It gives you a deterministic space to handle setup like loading user data, verifying identity, or collecting required information. Once the workflow completes, control passes to your agent and the conversation continues normally.

In this tutorial, you'll build an initialization workflow for GoRoute, a fictional ride-sharing and delivery platform. Before the agent can help a user, the workflow will collect their email and PIN, validate the credentials against an API, and only let the conversation continue once authentication succeeds. This should take about 10 minutes.

<Steps>
  <Step title="Clone the template project">
    Open the GoRoute support template below, choose a workspace to import it to, and click **Import** to add it to your workspace. Then, open the project.

    <Card title="Clone the GoRoute support template" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/copy.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=0167fc06fbc2ac84bbad6668956ceee5" href="/dashboard?import=69de467986fa885f75b97737" width="24" height="24" data-path="images/icons/copy.svg">
      Pre-configured GoRoute support agent with playbooks and knowledge base content.
    </Card>

    The template comes pre-configured with a global prompt, instructions, knowledge base content, and playbooks for GoRoute's driver and courier support. It also includes a pre-built **GoRoute authenticator** [API tool](/docs/documentation/build/tools/api-tool) that validates user credentials against the GoRoute API. You'll build an authentication layer on top of this so the agent knows who it's talking to before answering any questions.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-1.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=d14f90a1c262cd4d276dcb982d8a5c90" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-1.mp4" />
  </Step>

  <Step title="Create the initialization workflow">
    Open the **Framework** tab in the sidebar and click **Add workflow** on the initialization node, then **Create workflow**. Name it "Authentication" and set the **Trigger** to:

    ```text theme={null}
    Authenticates the user by collecting their email and PIN before allowing access to the agent.
    ```

    Click **Create workflow**. To open the workflow on the canvas, click the pencil icon next to its name.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-2.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=38294ce397f4940e112fd68607613add" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-2.mp4" />
  </Step>

  <Step title="Create the Authenticate user playbook">
    Drag a [**Playbook** step](/docs/documentation/build/steps/playbook) onto the canvas and connect it to the Start chip. Click on the step, select **New playbook**, and name it "Authenticate user".

    Set the **Trigger** to:

    ```text theme={null}
    Collects the user's email address and 4-digit PIN code for authentication.
    ```

    Click **Create playbook**. In the playbook editor, write the following **instructions**:

    ```text theme={null}
    # Goal
    Collect the user's email address and 4-digit PIN code so they can be authenticated against the GoRoute system.

    # Steps
    1. Check the conversation history. If this is the start of the conversation, greet the user and let them know you need to verify their identity before you can help. If the user has already attempted to log in and been sent back, let them know the credentials didn't match and ask them to try again.
    2. Ask for their email address associated with their GoRoute account.
    3. Once you have the email, ask for their 4-digit PIN code.
    4. As soon as you have both values, use the GoRoute authenticator tool to validate their credentials.
    5. If the tool returns the user's account details, use the User is authenticated tool to exit.
    6. If the tool returns an error, let the user know the credentials didn't match and start again from step 2.

    # Important
    - Do not accept anything other than an email format for the email field.
    - The PIN must be exactly 4 digits.
    - If the user provides both email and PIN in a single message, accept them both.
    - Never repeat the user's email or PIN back to them.
    - Do not send a confirmation message after successful authentication. Call the User is authenticated tool immediately.
    ```

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-3.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=355f4937aa85a3295efcefb1bba58927" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-3.mp4" />
  </Step>

  <Step title="Add the GoRoute authenticator API tool">
    In the **Tools** panel on the right side of the playbook editor, click **+** next to **Tools**, then **API** to filter to API tools. Select **GoRoute authenticator**. This [API tool](/docs/documentation/build/tools/api-tool) is already configured in the template and sends the user's email and PIN to the GoRoute API. It returns their account details on success, or an error if the credentials are invalid.

    Once added, you'll see it listed under **Tools**. Click on it to inspect its configuration. The tool has two input variables, `email` and `pin`, both set to **Agent collect**. This means the playbook will automatically collect these values from the conversation and pass them into the tool.

    <Tip>
      The GoRoute authenticator API tool is included for this tutorial. In your own projects, you can create an [API tool](/docs/documentation/build/tools/api-tool) that connects to your own authentication API. Click the pencil icon next to **GoRoute authenticator** to see how this one is set up, or [view the full documentation for the demo API here](https://goroute.demo.voiceflow.com/docs).
    </Tip>

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-4.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=98dc6735151b24b72b37598f72e63a0c" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-4.mp4" />
  </Step>

  <Step title="Capture the API response">
    You need to save the user's account details from a successful API call so the agent can use them later.

    Click on the **GoRoute authenticator** tool and press **▶** next to the **Capture response** option. Enter `james.wilson@example.com` for email and `1234` for pin, then click **Run**. You should see a `200 OK` response with a `data` object containing the user's account details.

    Click on `data` in the response preview and create a new variable by clicking **Create variable**. Name it `user_data` and set the description to:

    ```text theme={null}
    Information about the current user, such as their name and account type.
    ```

    Then, click **Create variable**. You should now see `data → user_data` listed under **Capture response**. This means the user's account details (name, account type, and more) will be automatically saved to the `{user_data}` [variable](/docs/documentation/build/data/variables) whenever the API call succeeds.

    When the credentials are invalid, the API response does not contain a `data` key, so `{user_data}` stays empty. You'll use this in the next step to make sure the playbook can only exit after a successful authentication.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-5.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=951296016f4656a1635b2575b63c4500" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-5.mp4" />
  </Step>

  <Step title="Add the exit condition">
    In the **Exit conditions** panel on the right side of the playbook editor, click **+** to add a new exit condition. Name it "User is authenticated" and set the **Trigger** to:

    ```text theme={null}
    The user has provided valid credentials and their account details have been successfully retrieved.
    ```

    Then add `{user_data}` as a **required variable** on this exit condition. Because `{user_data}` only gets populated after a successful API call, the playbook can't exit until the user provides valid credentials. If authentication fails, `{user_data}` stays empty and the playbook keeps the conversation going.

    Close the playbook editor to return to the canvas. You'll see "User is authenticated" appear as a connection point on the Playbook step.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-6.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=67b6c1e167902faa7986ffe1e59a3504" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-6.mp4" />
  </Step>

  <Step title="Add the success message">
    Connect the "User is authenticated" exit to a [**Message** step](/docs/documentation/build/steps/message). Set the Message step's text to the following:

    ```text theme={null}
    You were successfully authenticated! Please note that all conversations with GoRoute support are logged so that we can serve you better.
    ```

    Leave the Message step's output port unconnected. This passes control to the [agent](/docs/documentation/build/global-prompt) after the message is sent.

    <Tip>
      This workflow sends a simple message after authentication, but you could chain on additional logic here. For example, use a [Set step](/docs/documentation/build/steps/set) to extract fields from `{user_data}` into individual variables, route to another playbook for onboarding questions, or make additional API calls to preload the user's recent activity.
    </Tip>

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-7.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=9a5ef339151638c2edb9ccde2cc0b6f3" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-7.mp4" />
  </Step>

  <Step title="Test the authentication workflow">
    Go back to the **Agent** tab, then click **Run** in the top-right corner to test your agent. The initialization workflow will start automatically.

    **Test with invalid credentials:**

    Try entering a wrong PIN or a non-existent email. The playbook should let you know the credentials didn't match and ask you to try again, without leaving the playbook.

    **Test with valid credentials:**

    Use any of the test accounts below:

    | Email                      | PIN    | Name         |
    | -------------------------- | ------ | ------------ |
    | `james.wilson@example.com` | `1234` | James Wilson |
    | `mei.chen@example.com`     | `5678` | Mei Chen     |
    | `oliver.brown@example.com` | `9012` | Oliver Brown |

    The playbook should ask for your email and PIN, call the API to validate them, and then show the success message before handing off to the agent.

    **Test the authenticated agent:**

    After successful authentication, try asking a question like "What are the vehicle requirements to drive with GoRoute?" If you authenticated as James Wilson (a driver), the agent should route to the driver support playbook and answer using driver-specific content.

    <video src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/auth-workflow-8.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=c71172c93a56e1cd7490844cda161623" autoPlay={true} controls={true} loop={true} muted={true} playsInline={true} className="w-full" data-path="videos/auth-workflow-8.mp4" />

    <Tip>
      You run the agent from the **Agent** tab rather than from the workflow's canvas so you can see the initialization workflow in action. If you run the workflow from the canvas, only the workflow will run - the agent won't continue after the user authenticates.
    </Tip>
  </Step>
</Steps>

## Tips for building authentication workflows

* **The playbook handles the retry loop.** The playbook manages the entire authentication conversation, including retries. If the API returns an error, the playbook tells the user and asks them to try again. This keeps the workflow canvas simple.
* **Use API tools for authentication.** The GoRoute authenticator is an [API tool](/docs/documentation/build/tools/api-tool) that sends credentials to an external API. You can create your own API tools to connect to any authentication system.
* **Capture response data for later.** The API tool saves the response to `{user_data}`, which your agent can reference in its global prompt and instructions to personalize the conversation.
* **Initialization workflows run before the agent.** Anything you put in the initialization workflow happens before the agent sees any messages. This is useful for gating access, loading context, or sending a static greeting.
* **Automate some of these steps.** In the real world, you can pass variables directly into the conversation [through the chat widget](/docs/documentation/deploy/widget/web-chat-api), or automatically detect a user's phone number using the `user_id` variable.

## What's next?

You've built an initialization workflow that authenticates users before the agent takes over. Explore these resources to go deeper.

<Columns cols={2}>
  <Card title="Initialization workflows" icon="https://mintcdn.com/voiceflow-009a8802/Deti6n82HHVK8mCG/images/icons/play-s.svg?fit=max&auto=format&n=Deti6n82HHVK8mCG&q=85&s=5f1327b3daf072b30d69b4bc3b59165f" href="/docs/documentation/build/framework/initialization-workflow" width="24" height="24" data-path="images/icons/play-s.svg">
    Learn more about initialization workflows and common patterns like loading context, static greetings, and onboarding flows.
  </Card>

  <Card title="API tools" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/integration.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=84140036a98f211c30645b08808ccecb" href="/docs/documentation/build/tools/api-tool" width="24" height="24" data-path="images/icons/integration.svg">
    Create custom API tools to connect your agent to any external service.
  </Card>
</Columns>
