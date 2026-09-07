> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up RelVoca in Codex

> Add the RelVoca MCP server to the Codex CLI by editing config.toml, then approve the browser sign-in when Codex connects.

Codex keeps MCP servers in a TOML file rather than JSON, and remote servers are configured by editing it directly.

## Add the server

<Steps>
  <Step title="Open the configuration file">
    `~/.codex/config.toml`. Create it if it does not exist.

    Note that `codex mcp add` is documented for `stdio` servers - the ones Codex launches as a local process. A remote server such as this one goes in the file by hand.
  </Step>

  <Step title="Add RelVoca">
    ```toml theme={null}
    [mcp_servers.voiceflow]
    url = "https://mcp.voiceflow.com/mcp"
    ```

    The table name carries the server's local name, so `[mcp_servers.voiceflow]` is what produces the `relvoca` prefix. `url` is the only required key.
  </Step>

  <Step title="Sign in">
    Start Codex and let it connect. It opens a browser to RelVoca; approve the request and the tab redirects back.

    Codex also supports a bearer token read from an environment variable for remote servers. That route does not apply here - RelVoca issues no static token, and the browser sign-in is the whole of it. See [Authentication](/docs/mcp/authentication).
  </Step>

  <Step title="Confirm it worked">
    Ask Codex to **list your RelVoca projects**. A list means the transport, the grant, and your account access are all working.
  </Step>
</Steps>

## If it does not connect

| Symptom                          | Likely cause                                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Codex reports no such server     | The table is `[mcp_server.voiceflow]`; it is `mcp_servers`, plural                                                    |
| It connects but exposes no tools | The OAuth flow did not complete. Reconnect and finish the browser step                                                |
| It asks for a token              | Codex is taking the bearer-token path. There is no token to give it; remove any `bearer_token_env_var` from the table |

To disconnect, delete the `[mcp_servers.voiceflow]` table. Revoke access in RelVoca to end every client's session at once.
