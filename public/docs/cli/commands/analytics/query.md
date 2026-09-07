> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf analytics query

> vf analytics query: operations for query. Groups 25 subcommands, including api-tool-usage, call-count, call-duration, category-token-usage, daily-token-usage.

Operations for query.

## Usage

```bash theme={null}
vf analytics query [flags]
```

## Flags

```text theme={null}
  -h, --help   help for query
```

## Global flags

These flags are inherited from the parent command and work on every invocation.

```text theme={null}
      --agent-mode             Enable structured errors and default TOON output for AI coding agents. Automatically enabled when a known agent environment is detected (CLAUDE_CODE, CURSOR_AGENT, etc.). Use --agent-mode=false to disable.
      --color string           Control colored output: auto (color when output is a TTY), always, or never. Respects NO_COLOR and FORCE_COLOR env vars. (default "auto")
  -d, --debug                  Log request and response diagnostics to stderr
      --dry-run                Preview the request that would be sent without executing it (output to stderr)
  -H, --header stringArray     Set a custom HTTP request header (format: "Key: Value"). Can be specified multiple times.
      --include-headers        Include HTTP response headers in the output
  -q, --jq string              Filter and transform output using a jq expression (e.g., '.name', '.items[] | .id')
      --no-interactive         Disable all interactive features (auto-prompting, explorer auto-launch, TUI forms)
  -o, --output-format string   Specify the output format. Options: pretty, json, yaml, table, toon. (default "pretty")
      --server-url string      Override the default server URL
      --timeout string         HTTP request timeout (e.g., 30s, 5m, 100ms)
      --token string           RelVoca bearer token
      --usage                  Print the CLI Usage schema in KDL format
```

## See also

* [vf analytics](/docs/cli/commands/analytics) - Operations for analytics
* [vf analytics query api-tool-usage](/docs/cli/commands/analytics/query/api-tool-usage) - Query API tool usage
* [vf analytics query call-count](/docs/cli/commands/analytics/query/call-count) - Query call count
* [vf analytics query call-duration](/docs/cli/commands/analytics/query/call-duration) - Query call duration
* [vf analytics query category-token-usage](/docs/cli/commands/analytics/query/category-token-usage) - Query category token usage
* [vf analytics query daily-token-usage](/docs/cli/commands/analytics/query/daily-token-usage) - Query daily token usage
* [vf analytics query entity-token-usage](/docs/cli/commands/analytics/query/entity-token-usage) - Query entity token usage
* [vf analytics query function-usage](/docs/cli/commands/analytics/query/function-usage) - Query function usage
* [vf analytics query hourly-organization-token-usage](/docs/cli/commands/analytics/query/hourly-organization-token-usage) - Query hourly organization token usage
* [vf analytics query hourly-project-token-usage](/docs/cli/commands/analytics/query/hourly-project-token-usage) - Query hourly project token usage
* [vf analytics query integration-usage](/docs/cli/commands/analytics/query/integration-usage) - Query integration usage
* [vf analytics query intent-usage](/docs/cli/commands/analytics/query/intent-usage) - Query intent usage
* [vf analytics query knowledge-base-document-usage](/docs/cli/commands/analytics/query/knowledge-base-document-usage) - Query knowledge base document usage
* [vf analytics query mcp-tool-usage](/docs/cli/commands/analytics/query/mcp-tool-usage) - Query MCP tool usage
* [vf analytics query organization-token-usage](/docs/cli/commands/analytics/query/organization-token-usage) - Query organization token usage
* [vf analytics query playbook-usage](/docs/cli/commands/analytics/query/playbook-usage) - Query playbook usage
* [vf analytics query project-interaction-count](/docs/cli/commands/analytics/query/project-interaction-count) - Query project interaction count
* [vf analytics query project-token-usage](/docs/cli/commands/analytics/query/project-token-usage) - Query project token usage
* [vf analytics query project-transcript-cost](/docs/cli/commands/analytics/query/project-transcript-cost) - Query transcript cost
* [vf analytics query project-transcript-count](/docs/cli/commands/analytics/query/project-transcript-count) - Query project transcript count
* [vf analytics query prompt-usage](/docs/cli/commands/analytics/query/prompt-usage) - Query prompt usage
* [vf analytics query unique-user-count](/docs/cli/commands/analytics/query/unique-user-count) - Query unique user count
* [vf analytics query workflow-usage](/docs/cli/commands/analytics/query/workflow-usage) - Query workflow usage
* [vf analytics query workspace-interaction-count](/docs/cli/commands/analytics/query/workspace-interaction-count) - Query workspace interaction count
* [vf analytics query workspace-token-usage](/docs/cli/commands/analytics/query/workspace-token-usage) - Query workspace token usage
* [vf analytics query workspace-transcript-count](/docs/cli/commands/analytics/query/workspace-transcript-count) - Query workspace transcript count
