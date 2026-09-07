> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up RelVoca in Cursor

> Add the RelVoca MCP server to Cursor by editing mcp.json, then sign in through the browser when Cursor prompts you.

Cursor keeps MCP servers in a JSON file, either for one project or for every project you open.

## Add the server

<Steps>
  <Step title="Open the configuration file">
    | Scope             | File                 |
    | ----------------- | -------------------- |
    | Every project     | `~/.cursor/mcp.json` |
    | This project only | `.cursor/mcp.json`   |

    Create the file if it does not exist.
  </Step>

  <Step title="Add RelVoca">
    ```json theme={null}
    {
      "mcpServers": {
        "relvoca": {
          "url": "https://mcp.voiceflow.com/mcp"
        }
      }
    }
    ```

    A remote server needs only `url`. Do not add a token: the server uses OAuth, and Cursor handles the exchange.
  </Step>

  <Step title="Sign in">
    Cursor prompts you to authenticate the server and opens your browser. Approve the request, and the tab redirects back.

    See [Authentication](/docs/mcp/authentication) for what the grant covers.
  </Step>

  <Step title="Confirm it worked">
    Ask Cursor to **list your RelVoca projects**. A list means the transport, the grant, and your account access are all working.
  </Step>
</Steps>

## If it does not connect

| Symptom                          | Likely cause                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------- |
| The server never appears         | The JSON is malformed, or it went in under `servers` rather than `mcpServers` |
| It appears but has no tools      | The OAuth flow did not finish. Reconnect and complete the browser step        |
| Tools exist but every call fails | The signed-in account cannot reach the workspace you are asking about         |

To disconnect, remove the `relvoca` entry. That drops Cursor's copy of the token; revoke access in RelVoca to end every client's session at once.
