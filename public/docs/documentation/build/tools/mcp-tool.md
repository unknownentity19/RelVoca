> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP tool

> Connect your agent to MCP servers and use their tools.

<Info>
  RelVoca supports hosted MCP servers accessible from the internet. Local MCP servers are not supported. You can use a service like [Zapier MCP](https://zapier.com) to build a hosted server.
</Info>

MCP (Model Context Protocol) is a standardized way for AI agents to connect to external services. Unlike API tools where you configure individual endpoints, an MCP server can expose multiple tools at once - each with its own description, parameters, and context that helps your agent understand how and when to use them.

## Creating an MCP tool

<Steps>
  <Step title="Add an MCP server">
    You can add MCP tools from a server, or connect to a new server  directly from within a [playbook](/docs/documentation/build/playbooks).

    <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/MCP-playbook-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=3e916b4b5a5865a9a03ee3edcbd23288" alt="MCP Playbook Docs" width="1294" height="728" data-path="images/MCP-playbook-docs.png" />

    <Info>
      You can also add MCP servers  from within a workflow using the [MCP step](/docs/documentation/build/steps/mcp), or from the tools CMS tab. Servers can be managed centrally in Settings → MCP servers. Once a tool exists, you can [reference it](/docs/documentation/build/editor/references) directly in your instructions.
    </Info>
  </Step>

  <Step title="Connect your server">
    Enter your server details:

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Create-MCP-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=38deafcb533dfbb59bad451ae79a7ec0" alt="Create MCP Docs" width="1294" height="946" data-path="images/Create-MCP-docs.png" />

    | Field                   | Description                                                              |
    | ----------------------- | ------------------------------------------------------------------------ |
    | **Server name & image** | A friendly label shown inside RelVoca and optional image               |
    | **Server URL**          | The root URL of your hosted MCP server                                   |
    | **Headers**             | Optional key-value pairs for authentication (API keys, tokens)           |
    | **Image**               | Optional icon displayed next to the tool in playbooks and workflow steps |
  </Step>

  <Step title="Select tools">
    Once connected, RelVoca fetches the available tools from your server. Select the ones you want your agent to have access to - you don't have to enable all of them and can refresh the server when you choose to access new tools.
  </Step>
</Steps>

Each tool from an MCP server comes with a name, description, and parameters defined on the server itself. If your agent isn't using a tool correctly, check the tool descriptions on your server - they're what the model reads to decide when and how to call them.

## Using the MCP tool

There are two ways to use an MCP tool:

### In a playbook

Add MCP tools to a playbook's Tools editor. The agent calls the individual tools autonomously based on the conversation context, your playbook instructions, and the tool descriptions from the server. For example, a CRM MCP server might expose "lookup contact", "create ticket", and "update deal stage" tools. Add the individual tools to a support playbook and the agent will call the right tool at the right time.

Give the tools a clear name and description inside RelVoca that covers both what the tool is for and when the agent should reach for it.

### In a workflow

Drag an [MCP step](/docs/documentation/build/steps/mcp) onto the canvas and select the specific tool you want to call. Input variables are mapped explicitly in the step config: the workflow executes it at that point in the flow every time.

Use this when the MCP call is part of a fixed process - for example, always logging a ticket after a complaint, or always syncing a record after a form is completed.
