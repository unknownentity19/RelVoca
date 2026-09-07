> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf function variable create

> vf function variable create: create variable. Requires --environment-alias, --function-id, --name, --project-id and --type, with a worked example.

Create a new variable.

## Usage

```bash theme={null}
vf function variable create [flags]
```

## Examples

```bash theme={null}
  vf function-variable create --project-id <id> --environment-alias <value> --name <value> --type input --function-id <id>
```

## Flags

```text theme={null}
      --body string                Request body as JSON (alternative to individual flags). Can also be provided via stdin.
      --description string         A human-readable description of what the variable holds.
  -e, --environment-alias string   [required]
  -f, --function-id string         The ID of the function this variable belongs to. [required]
  -h, --help                       help for create
  -n, --name string                The name used to reference the variable in the function code. [required]
  -p, --project-id string          [required]
  -t, --type string                options: input, output [required]
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

* [vf function variable](/docs/cli/commands/function/variable) - Operations for function-variable
