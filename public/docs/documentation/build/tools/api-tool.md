> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API tool

> Make HTTP requests to external APIs.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/API-tools-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=3f5ede107404037c06b52de1a0ffdfd2" alt="API Tools Docs 1" width="2820" height="1370" data-path="images/API-tools-docs-1.png" />

The API tool lets your agent call external APIs during a conversation. Use it to fetch data from third-party services, submit information to webhooks, or integrate with any REST API. Unlike the [Function tool](/docs/documentation/build/tools/function-tool), the API tool requires no JavaScript code, making it accessible to less-technical builders.

## Creating an API tool

<Steps>
  <Step title="Create the tool">
    You can add, or create an API tool directly from within a [playbook](/docs/documentation/build/playbooks).

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/API-playbook-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=e1ad7075a60b6cdcdb86bcc92c3f06ec" alt="API Playbook Docs" width="1294" height="728" data-path="images/API-playbook-docs.png" />

    <Info>
      You can also create API tools from within a workflow using the [API step](/docs/documentation/build/steps/api), or from the tools CMS tab. Once the tool exists, you can [reference it](/docs/documentation/build/editor/references) directly in your instructions.
    </Info>
  </Step>

  <Step title="Configure the request">
    Define your HTTP request:

    | Field          | Description                                                                                                               |
    | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
    | **Method**     | `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`                                                                                |
    | **URL**        | The endpoint to call. Use curly braces for variables (e.g. `https://api.example.com/users/{user_id}`)                     |
    | **Headers**    | Key-value pairs like `Authorization` or `Content-Type`                                                                    |
    | **Parameters** | Query parameters appended to the URL                                                                                      |
    | **Body**       | Request body for `POST`, `PUT`, and `PATCH` requests - choose from **Form data**, **URL encoded**, or **Raw** (e.g. JSON) |
  </Step>

  <Step title="Add input variables">
    Optionally define input variables that can be passed in by a [playbook](/docs/documentation/build/playbooks) or an [API step](/docs/documentation/build/steps/api). Use them in your URL, headers, or parameters by wrapping them in curly braces. Add a description to each so the agent knows what to pass.
  </Step>

  <Step title="Test the request">
    Click **Run** in the top right corner to test your API call. Click **Variables** to enter test values, then **Run** to execute. The response panel shows the JSON body, status code, size, and response time (e.g. `200 OK · 11.3 kB · 354ms`). Use **Show raw** for the unformatted response, or the **Headers** tab to inspect response headers.
  </Step>
</Steps>

## Testing the API tool

Click **Run** in the top right corner of the API tool editor to test your API call. Click **Variables** to enter test values for your input variables, then click **Run** to execute the request.

The response panel displays the JSON response body along with the status code, response size, and response time (eg: `200 OK · 11.3 kB · 354ms`). Click **Show raw** to see the unformatted response, or use the **Headers** tab to inspect the response headers.

## Using the API tool

There are two ways to use an API tool:

### In a playbook

Add the API tool to a playbook's Tools editor. The agent will call it autonomously when it determines the tool is needed based on the conversation context, the tool's description, and your playbook instructions. For example, an "Order Lookup" API tool added to an order status playbook: the agent decides when to call it, passes the right input variables, and uses the response to answer the customer.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/API-playbook-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=e1ad7075a60b6cdcdb86bcc92c3f06ec" alt="API Playbook Docs" width="1294" height="728" data-path="images/API-playbook-docs.png" />

Give the tool a clear name and description that covers both what it does and when the agent should use it. The tool description is always in context when the agent considers calling a tool, so the "when" belongs here.

Use playbook instructions for supporting context - ordering, error handling, or how the tool fits into the larger flow.

### In a workflow

Drag an [API step](/docs/documentation/build/steps/api) onto the canvas and select the API tool you want to call. Input variables are mapped explicitly in the step config: the agent doesn't decide whether to call it, the workflow executes it at that point in the flow every time.

Use this when the API call is part of a fixed process - for example, always verifying identity before accessing account data, or always sending a confirmation after a booking is made.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/API-step-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=30e6a6016e75518b3f2bef3fea8d50e0" alt="API Step Docs 1" width="1294" height="728" data-path="images/API-step-docs-1.png" />

## Running API tools asynchronously

Both API tools in workflows or playbooks can run async. The async toggle is available at the instance level, not tool level allowing you to use the same tool, with different config.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Async-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=bcbf4118428a033accd74a27e259f9b6" alt="Async Docs 1" width="2192" height="1216" data-path="images/Async-docs-1.png" />

When you run an API tool async, it will immediately continue the conversation without waiting for the results of the API tool to return.

### Fire and forget

Use async when you don't need the API response to continue the conversation. The call fires in the background and the agent moves on immediately.

This is ideal for logging and side effects - sending an event to an analytics platform, writing to a CRM, triggering a webhook, or any operation where the agent doesn't need to reference the result. The user gets a faster experience because the conversation never pauses for a background task.

### Async with deferred response

Use async when the API call is slow or not immediately relevant, but the response still matters. The call fires in the background and the agent continues the conversation naturally. When the response arrives, it's captured and the agent can reference it on the next turn.

For example, during your [initialization workflow](/docs/documentation/build/framework/initialization-workflow), you authenticate the user and simultaneously fire an async call to fetch their recent orders. By the time authentication completes and the agent takes over, the order data is already available. The agent can open the conversation with "I see you have a recent order for a queen mattress arriving Thursday — is that what you're calling about?" instead of asking the user to explain why they're reaching out.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Starting-message-docs-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=c1921b4b1a90864606db298065181449" alt="Starting Message Docs 2" width="2310" height="1342" data-path="images/Starting-message-docs-2.png" />

This pattern is powerful for predictive experiences - preloading context the agent will likely need so the conversation starts ahead of the user. It also works for long-running operations, large dataset searches, or any third-party service with unpredictable latency. Instead of the user waiting on a loading state, the agent keeps moving and weaves the result in when it's ready.
