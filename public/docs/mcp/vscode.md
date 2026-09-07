> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up RelVoca in VS Code

> Add the RelVoca MCP server to VS Code by creating mcp.json with an http server entry, then sign in when prompted.

VS Code reads MCP servers from a JSON file, and unlike most clients it requires you to declare the transport.

## Add the server

<Steps>
  <Step title="Open the configuration file">
    | Scope           | Where                                                  |
    | --------------- | ------------------------------------------------------ |
    | This workspace  | `.vscode/mcp.json`                                     |
    | Every workspace | Command Palette, then **MCP: Open User Configuration** |
  </Step>

  <Step title="Add RelVoca">
    ```json theme={null}
    {
      "servers": {
        "relvoca": {
          "type": "http",
          "url": "https://mcp.voiceflow.com/mcp"
        }
      }
    }
    ```

    Two details differ from other clients and both matter. The wrapper key is `servers`, not `mcpServers`. And `"type": "http"` is required, because VS Code will otherwise treat the entry as a local process to launch.
  </Step>

  <Step title="Sign in">
    VS Code prompts you to authenticate and opens your browser. Approve the request, and the tab redirects back.

    See [Authentication](/docs/mcp/authentication) for what the grant covers.
  </Step>

  <Step title="Confirm it worked">
    Ask Copilot Chat in agent mode to **list your RelVoca projects**. A list means the transport, the grant, and your account access are all working.
  </Step>
</Steps>

## If it does not connect

| Symptom                        | Likely cause                                                           |
| ------------------------------ | ---------------------------------------------------------------------- |
| VS Code tries to run a command | `"type": "http"` is missing                                            |
| The server never appears       | The entry went in under `mcpServers` rather than `servers`             |
| It appears but has no tools    | The OAuth flow did not finish. Reconnect and complete the browser step |
| The tools never get called     | Copilot Chat is not in agent mode                                      |

To disconnect, remove the `relvoca` entry. That drops this machine's copy of the token; revoke access in RelVoca to end every client's session at once.
