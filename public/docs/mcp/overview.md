> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RelVoca MCP overview

> Connect Claude and other AI clients to your RelVoca account through the Model Context Protocol.

The **RelVoca MCP server** is a remote [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that connects AI clients like [Claude Code](/docs/mcp/claude-code) directly to your RelVoca account. Once it's connected, the assistant can work with your projects much like you would in Creator: listing projects, reading and editing prompts, building functions and tools, querying the knowledge base, pulling transcripts, running evaluations, and testing agents, all without copying anything back and forth.

It's a hosted server at `https://mcp.voiceflow.com/mcp` that authenticates with OAuth, so there are no API keys to manage. You sign in to RelVoca once, and the assistant acts on the projects your account can access.

The [setup guide](/docs/mcp/claude-code) walks through connecting the server to Claude Code.

## What you can do

The server exposes RelVoca's agent-management surface as tools, grouped by capability:

| Area                        | What the assistant can do                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Projects & environments** | List projects, manage environments, publish, compile, export, and handle variables and secrets                                         |
| **Agent design**            | Edit the global prompt, agent instructions, and routing; create and update playbooks and workflows; configure model and voice behavior |
| **Tools**                   | Create and wire functions, API tools, MCP tools, and prebuilt integrations, at the agent or playbook level                             |
| **Knowledge base**          | Manage documents and data sources, and run retrieval queries to test coverage                                                          |
| **Testing**                 | Run live test conversations through the Dialog Manager and automated end-to-end simulations                                            |
| **Measurement**             | Fetch and search transcripts, design and run evaluations, and query analytics and usage                                                |

## What you are approving

Connecting the server grants an OAuth token covering both reading and changing your workspace. There is no API key, and no lesser grant that still produces a working session.

<Card title="How MCP authentication works" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/key.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=f04994fd319efae3674e47b401d70e37" href="/docs/mcp/authentication" width="24" height="24" data-path="images/icons/key.svg">
  The two scopes, what each covers, and what a client has to support.
</Card>

## How it works

* **Plain language, not tool names.** Once connected, you don't call tools directly. You describe what you want, for example "pull the last 50 transcripts for my support agent and find where it's failing", and the client picks the right tools.
* **Namespaced tools.** Every tool is exposed to the client as `mcp__voiceflow__*`, so it never collides with other servers you've connected.
* **Scoped to your account.** The assistant can only see and change the projects your signed-in RelVoca account has access to.
* **Standard OAuth, no shared secret.** Authorization code with PKCE (`S256`), refresh tokens for renewal, and the token sent as a bearer header. Clients can register themselves, so there is nothing to paste and nothing to rotate by hand.

<Tip>
  Not sure where to start? After connecting, ask the assistant to "list my RelVoca projects". It's the quickest way to confirm the server is working and see what's available.
</Tip>

## Get started

<Card title="Set up RelVoca in Claude Code" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/integration.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=84140036a98f211c30645b08808ccecb" href="/docs/mcp/claude-code" width="24" height="24" data-path="images/icons/integration.svg">
  Connect the MCP server to Claude Code and sign in with your account.
</Card>
