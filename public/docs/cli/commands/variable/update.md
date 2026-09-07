> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf variable update - Update variable

> vf variable update: update variable. Requires --environment-alias, --project-id and --variable-id, with a worked example.

Update a variable by ID.

## Usage

```bash theme={null}
vf variable update [flags]
```

## Examples

```bash theme={null}
  vf variable update --variable-id <id> --project-id <id> --environment-alias <value>
```

## Flags

```text theme={null}
      --body string                Request body as JSON (alternative to individual flags). Can also be provided via stdin.
  -c, --color-param string         The display color of the variable in the RelVoca editor.
      --default-value string       The initial value of the variable at the start of a conversation.
      --description string         A short description of what the variable stores.
  -e, --environment-alias string   [required]
  -h, --help                       help for update
  -n, --name string                string value
  -p, --project-id string          [required]
  -v, --variable-id string         [required]
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

* [vf variable](/docs/cli/commands/variable) - Operations for variable
