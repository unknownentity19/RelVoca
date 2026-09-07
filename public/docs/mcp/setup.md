> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up the RelVoca MCP server

> One hosted URL, one OAuth sign-in, and a client that speaks streamable HTTP. What to point your client at, and how to tell it worked.

There is nothing to install and nothing to run. The server is hosted, and connecting it means giving a client one URL and signing in.

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| URL            | `https://mcp.voiceflow.com/mcp`                              |
| Transport      | Streamable HTTP                                              |
| Authentication | OAuth, no API key. See [Authentication](/docs/mcp/authentication) |
| Suggested name | `relvoca`                                                  |

The name is what your client calls the server locally. `relvoca` is what the client-specific pages use, and it is what determines the tool prefix you will see, `mcp__voiceflow__*`.

## What a client needs to support

Two things, and a client missing either cannot connect:

* **Streamable HTTP transport.** The server is remote. A client that only launches local `stdio` processes has nothing to point at.
* **An interactive OAuth flow.** The client has to open a browser, receive a redirect, and store a refresh token. There is no static token to paste instead.

The redirect is the part that varies. The server accepts a **loopback address** - `localhost`, `127.0.0.1`, or `[::1]` on any port - which is what most terminal clients use, and it accepts the published callback URLs of clients that use a hosted one. A client doing neither is refused at the authorization step rather than failing later, so a connection that never reaches a browser is usually this.

Most current coding agents do both. The [client pages](/docs/mcp/claude-code) give the exact configuration for each.

## Confirm it worked

However you connected, the same check tells you the server is live: ask the assistant to **list your RelVoca projects**.

A list means the transport, the OAuth grant, and your account access are all working at once. That is worth more than reading a "connected" badge, which only tells you the client resolved the URL.

If the assistant answers with anything other than a project list, [Authentication](/docs/mcp/authentication) covers what the grant involves, and the client pages cover where each one keeps its configuration.

## What the server exposes

Tools spanning RelVoca's agent-management surface: projects and environments, agent design, tools and integrations, the knowledge base, testing, and measurement. The [overview](/docs/mcp/overview) groups them by capability.

You do not call tools by name. You describe what you want, and the client picks.
