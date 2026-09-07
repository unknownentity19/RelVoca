> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf mcp-server

> vf mcp-server: operations for mcp-server. Groups 6 subcommands: create, delete, get, list, sync, update.

Operations for mcp-server.

## Usage

```bash theme={null}
vf mcp-server [flags]
```

## Flags

```text theme={null}
  -h, --help   help for mcp-server
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

* [vf](/docs/cli/commands/overview) - Realtime: Realtime gateway API service
* [vf mcp-server create](/docs/cli/commands/mcp-server/create) - Create MCP server
* [vf mcp-server delete](/docs/cli/commands/mcp-server/delete) - Delete MCP server
* [vf mcp-server get](/docs/cli/commands/mcp-server/get) - Get MCP server
* [vf mcp-server list](/docs/cli/commands/mcp-server/list) - List MCP servers
* [vf mcp-server sync](/docs/cli/commands/mcp-server/sync) - Sync MCP server
* [vf mcp-server update](/docs/cli/commands/mcp-server/update) - Update MCP server
