> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf tool delete - Delete tool

> vf tool delete: delete tool. Requires --environment-alias, --project-id, --tool-id and --type, with a worked example.

Delete a tool by ID.

## Usage

```bash theme={null}
vf tool delete [flags]
```

## Examples

```bash theme={null}
  vf tool delete --tool-id <id> --project-id <id> --environment-alias <value> --type mcp
```

## Flags

```text theme={null}
  -e, --environment-alias string   [required]
  -h, --help                       help for delete
  -p, --project-id string          [required]
      --tool-id string             [required]
      --type string                The type of the tool to delete. (options: api, mcp, function) [required]
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

* [vf tool](/docs/cli/commands/tool) - Operations for tool
