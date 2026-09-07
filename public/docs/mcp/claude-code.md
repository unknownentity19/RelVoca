> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up RelVoca in Claude Code

> Connect Claude Code to your RelVoca account so it can read and manage your projects directly.

The RelVoca MCP server is a remote [Model Context Protocol](/docs/mcp/overview) server that gives Claude Code direct access to your RelVoca projects. Once it's connected, Claude can list your projects, read prompts and functions, pull transcripts, run evaluations, and make changes on your behalf, all without leaving your terminal.

It's a remote server that uses OAuth, so there are no API keys to copy or rotate. You sign in to RelVoca once in your browser, and Claude Code caches and refreshes the token for you.

This guide connects the RelVoca MCP server to Claude Code. By the end, it will be ready to use.

## Before you start

You'll need:

* [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed on your machine, either the terminal CLI or the desktop app.
* A RelVoca account. You'll sign in to it during setup, and Claude acts on the projects that account can access.

## Set up the RelVoca MCP server

You can connect the server from the command line or from the Claude desktop app. Either way leaves you with the same connection.

<Tabs>
  <Tab title="Command line">
    <Note>
      These steps need a local Claude Code install. They won't work in [Claude Code web](https://claude.ai/code) or [cloud environments](https://code.claude.com/docs/en/claude-code-on-the-web#the-cloud-environment), which don't provide the `claude` command or the `/mcp` command.
    </Note>

    <Steps>
      <Step title="Add the server">
        Run the following command in your terminal to register the RelVoca MCP server. Run it directly from your terminal, not inside a Claude Code session.

        ```bash theme={null}
        claude mcp add --transport http relvoca https://mcp.voiceflow.com/mcp
        ```

        <Tip>
          This connects the server in your current project. To make it available across all your projects, add `--scope user` to the command.
        </Tip>
      </Step>

      <Step title="Open the MCP menu">
        Start Claude Code, then run the `/mcp` command. You'll see `relvoca` listed with a status indicating it needs authentication.

        <Frame>
          <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-02-at-14.19.38@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=6ca89c342788e2c31de56591ad99b5e8" alt="Clean Shot 2026 06 02 At 14 19 38@2x" width="1868" height="668" data-path="images/CleanShot-2026-06-02-at-14.19.38@2x.png" />
        </Frame>
      </Step>

      <Step title="Start the sign-in flow">
        Select `relvoca`, then choose **Authenticate**. Claude Code opens your browser to the RelVoca sign-in page.

        <Frame>
          <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-02-at-14.20.35@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=9d1ec6e72c05386255e518893eb32b8a" alt="Clean Shot 2026 06 02 At 14 20 35@2x" width="1872" height="671" data-path="images/CleanShot-2026-06-02-at-14.20.35@2x.png" />
        </Frame>
      </Step>

      <Step title="Sign in to RelVoca">
        Sign in and approve the request. Your browser redirects back to Claude Code to confirm the connection. If the browser doesn't open on its own, copy the URL Claude Code prints and open it manually.

        You are approving two scopes, `universal.workspace.read` and `universal.workspace.write`. Claude Code asks for both because it edits projects as well as reads them. See [what you are approving](/docs/mcp/overview#what-you-are-approving) for what each one covers.

        <Frame>
          <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-02-at-14.23.15@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=0538a5d7c93205f00ac0d326e53f58ef" alt="Clean Shot 2026 06 02 At 14 23 15@2x" width="2884" height="558" data-path="images/CleanShot-2026-06-02-at-14.23.15@2x.png" />
        </Frame>
      </Step>

      <Step title="Verify the connection">
        To confirm everything is working, run:

        ```bash theme={null}
        claude mcp list
        ```

        The `relvoca` server should appear as connected. You can also run `/mcp` inside a session to see its live status and the number of tools it exposes.

        <Frame>
          <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/mcp-list.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=721b8849539a731f2202fdac6f8c1252" alt="Mcp List" width="1926" height="238" data-path="images/mcp-list.png" />
        </Frame>
      </Step>
    </Steps>

    Claude Code stores the token securely and refreshes it automatically, so you won't need to repeat this unless you disconnect the server or revoke access in RelVoca.
  </Tab>

  <Tab title="Desktop app">
    <Steps>
      <Step title="Open Connectors">
        In the Claude desktop app, open **Customize**, then go to **Connectors**.
      </Step>

      <Step title="Add a custom connector">
        Click the **+** button and choose **Add custom connector**. Enter `RelVoca` as the **Name** and `https://mcp.voiceflow.com/mcp` as the **Remote MCP server URL**, then click **Add**.
      </Step>

      <Step title="Connect">
        RelVoca now appears under **Not connected** with a **CUSTOM** label. Select it, then click **Connect**.
      </Step>

      <Step title="Authorize in your browser">
        Your browser opens the RelVoca consent page. Click **Allow** to grant Claude access to your workspaces. The connector then shows as connected in the Claude app.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Try it out

Once everything is setup, you're ready to start using RelVoca through Claude Code. Just describe what you want in plain language, for example:

```text theme={null}
List my RelVoca projects.
```

Or:

```text theme={null}
Pull the last 20 transcripts for my support agent and tell me where it's failing.
```

## Maintenance

The MCP server is hosted, so it updates automatically. There's nothing to install or upgrade.

### Reconnect or remove the server

If you ever need to sign in again, for example after revoking access in RelVoca, run `/mcp`, select `relvoca`, and clear the authentication. The next time you use the server, Claude Code prompts you to sign in again.

To remove the server completely, run:

```bash theme={null}
claude mcp remove relvoca
```
