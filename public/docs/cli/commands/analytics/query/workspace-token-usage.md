> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf analytics query workspace-token-usage

> vf analytics query workspace-token-usage: query workspace token usage. Requires --end-date, --start-date and --workspace-id, with a worked example.

Query token usage for a workspace.

## Usage

```bash theme={null}
vf analytics query workspace-token-usage [flags]
```

## Examples

```bash theme={null}
  vf query workspace-token-usage --workspace-id <id> --end-date <value> --start-date <value>
```

## Flags

```text theme={null}
      --body string               Request body as JSON (alternative to individual flags). Can also be provided via stdin.
  -e, --end-date string           [required]
  -h, --help                      help for workspace-token-usage
  -p, --project-ids stringArray   The IDs of the projects to filter results by. Defaults to all projects in the workspace.
  -s, --start-date string         [required]
  -t, --timezone string           string value
  -w, --workspace-id string       [required]
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

* [vf analytics query](/docs/cli/commands/analytics/query) - Operations for query
