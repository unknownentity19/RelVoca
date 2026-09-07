> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How MCP authentication works

> The RelVoca MCP server signs you in with OAuth rather than an API key. What the two scopes cover, and what a client has to support.

The server authenticates with OAuth, so there is no API key to copy, paste, or rotate. You sign in to RelVoca once in a browser, the client stores the token it receives, and it refreshes that token on its own.

That has a consequence worth knowing before you pick a client: **a client that cannot complete an OAuth flow cannot use this server.** There is no static token to fall back on. [Setup](/docs/mcp/setup) covers what else a client needs, and the client pages give the exact configuration for each.

## What you are approving

Signing in grants a token, and the server publishes exactly two scopes:

| Scope                       | Covers                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `universal.workspace.read`  | Reading what is in the workspace: projects, prompts, tools, knowledge base documents, transcripts, evaluations, and analytics |
| `universal.workspace.write` | Changing those things: creating and editing projects, prompts, tools and documents, and publishing environments               |

**The server requires both.** An unauthenticated request is answered with a challenge naming them together, so a grant of only `universal.workspace.read` does not produce a working session. Connecting the server therefore grants write access, and a client that only ever reads is choosing to rather than being held to it. A well-behaved client confirms changes with you before applying them.

Access is still bounded by your own account. The scopes cannot reach a workspace you could not open yourself.

## The mechanics

|                      |                                         |
| -------------------- | --------------------------------------- |
| Server               | `https://mcp.voiceflow.com/mcp`         |
| Authorization server | `https://auth-api.voiceflow.com`        |
| Grant                | Authorization code with PKCE (`S256`)   |
| Renewal              | Refresh tokens                          |
| Token transport      | Bearer, in the `Authorization` header   |
| Client registration  | Dynamic, so clients register themselves |

Dynamic registration is the reason most clients need nothing from you beyond the URL: the client registers itself, opens a browser, and takes it from there.

<Note>
  Every line above is published at
  `https://mcp.voiceflow.com/.well-known/oauth-protected-resource` and
  `https://auth-api.voiceflow.com/.well-known/oauth-authorization-server`. Both
  are public, so you can check the current values yourself rather than taking
  this page's word for them.
</Note>

## Signing out

Revoke access in RelVoca to end every session at once. Removing the server from a single client only removes that client's copy of the token, which is the right move when you are reconfiguring and the wrong one when a machine is lost.

<Card title="Set up the RelVoca MCP server" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/integration.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=84140036a98f211c30645b08808ccecb" href="/docs/mcp/setup" width="24" height="24" data-path="images/icons/integration.svg">
  The URL, the transport, and how to tell the connection worked.
</Card>
