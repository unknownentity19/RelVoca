> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP

> Use an MCP tool at a specific point in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/steps/workflows/MCP-step-cover.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=fd255721d3d7894e31dccc527f06e96f" alt="MCP tool" width="1920" height="1080" data-path="images/steps/workflows/MCP-step-cover.png" />

The MCP step lets you execute an [MCP tool](/docs/documentation/build/tools/mcp-tool) in your workflow. MCP tools connect to external services through the Model Context Protocol, a standardized way for AI agents to interact with third-party applications. Use this step when you need to perform actions in external systems as part of your workflow, like sending Slack messages or managing data in other platforms.

## Using the MCP step

Drag the MCP step onto the canvas and connect it to the step before it. Click on the step to select which MCP tool to run.

Select an existing MCP tool from the dropdown, or create a new one by clicking **New MCP tool**. Once selected, you'll see the input variables that the tool requires.

### Configuration

* **Input variables**: Provide values for each required input. Enter specific text, numbers, or use variables from your workflow. Each input variable has a description explaining what information it needs.
* **Capture response**: Optionally save the tool's response to a [variable](/docs/documentation/build/data/variables). If the response contains structured data (like JSON), you can specify an object path to extract specific information (eg: `data.user.email` to get just the email from a larger response object).
