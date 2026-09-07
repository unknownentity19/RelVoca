> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# The vf command line interface

> Manage RelVoca agents, knowledge bases, transcripts, analytics, and environments from your terminal or CI with the official vf CLI.

The `vf` CLI is the official command line interface for RelVoca. It covers the
same surface as the dashboard for day-to-day operations: inspect and update
agents, manage knowledge base documents, fetch transcripts and analytics, run
evaluations, and publish environments, all scriptable from your terminal or CI.

The CLI is built for automation first. Every command supports structured output
(`--output-format json`, `yaml`, `table`, or `toon`), a `--jq` flag for inline
filtering, and `--dry-run` to preview any request before it executes. Running
inside a coding agent such as Claude Code or Cursor enables `--agent-mode`
automatically, which switches on structured errors designed for tools to parse.

<Columns cols={2}>
  <Column>
    <Card title="Install" href="/docs/cli/install" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/download-m.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=5e9f0390f71dd279edc06e07b97cbed2" width="24" height="24" data-path="images/icons/download-m.svg">
      One command on macOS, Linux, or Windows.
    </Card>
  </Column>

  <Column>
    <Card title="Authenticate" href="/docs/cli/authentication" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/key.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=f04994fd319efae3674e47b401d70e37" width="24" height="24" data-path="images/icons/key.svg">
      Connect the CLI to your RelVoca account.
    </Card>
  </Column>

  <Column>
    <Card title="Command reference" href="/docs/cli/commands/overview" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/console.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=43df1e6a56a95756709ee7e376cb6c8d" width="24" height="24" data-path="images/icons/console.svg">
      Every command, flag, and default, generated from the CLI itself.
    </Card>
  </Column>

  <Column>
    <Card title="Migrating from the community CLI" href="/docs/cli/migrating-from-the-community-cli" icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/arrow-right.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=c5c00b6330181301354d9126e4777d36" width="24" height="24" data-path="images/icons/arrow-right.svg">
      Command mapping from the retired third-party voiceflow-cli.
    </Card>
  </Column>
</Columns>

## A first command

List your workspaces after [authenticating](/docs/cli/authentication). It doubles
as proof that the token works:

```bash theme={null}
vf workspace list --output-format json
```

Then list the agent projects in a workspace, using an `id` from that output:

```bash theme={null}
vf project list --workspace-id <workspace-id> --output-format json
```

Every command accepts `--help`, and the [command reference](/docs/cli/commands/overview)
carries the full tree. The reference is generated from the CLI source at a
pinned version, so it always matches the binary it documents.

## Where the CLI fits

* Use the CLI for scripting, CI pipelines, and bulk operations.
* Use the [APIs](/docs/api-reference/api-overview) when you are building an
  application or integration.
* Use the [MCP server](/docs/mcp/overview) when you are working from a coding
  assistant.

The CLI source lives at [github.com/voiceflow/cli](https://github.com/voiceflow/cli),
where releases and issues are tracked.
