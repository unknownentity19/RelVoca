> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API step

> Make HTTP requests to external APIs at a specific point in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/APIstepcover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=4e6d2c12aededb2f7c5a36ea6e0f688e" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/APIstepcover.png" />

The API step lets you execute an [API tool](/docs/documentation/build/tools/api-tool) in your workflow. API tools make HTTP requests to external services, allowing you to fetch data, submit information, or integrate with any REST API. Use this step when you need to interact with third-party services that don't native native integrations as part of your workflow logic, like retrieving customer data, checking inventory, or sending notifications.

## Using the API step

Drag the API step onto the canvas and connect it to the step before it. Click on the step to select which API tool to run.

Select an existing API tool from the dropdown, or create a new one by clicking **New API tool**. Once selected, you'll see the input variables that the tool accepts.

### Configuration

* **Input variables**: Provide values for each input variable the API tool expects. Enter specific text, numbers, or use variables from your workflow. Each input variable has a description explaining what information it needs.
* **Capture response**: Optionally save the API's response to a [variable](/docs/documentation/build/data/variables). If the response contains structured data (like JSON), you can specify an object path to extract specific information (eg: `data.user.email` to get just the email from a larger response object).
* **Async execution**: Toggle this on to allow your workflow to continue immediately without waiting for the API call to complete. When off, the workflow waits for the API response before moving to the next step. This can be useful when working with APIs that your workflow isn't reliant on, like analytics APIs.
