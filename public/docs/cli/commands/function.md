> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf function - Operations for function

> vf function: operations for function. Groups 7 subcommands: create, delete, get, list, path, update, variable.

Operations for function.

## Usage

```bash theme={null}
vf function [flags]
```

## Flags

```text theme={null}
  -h, --help   help for function
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
* [vf function create](/docs/cli/commands/function/create) - Create function
* [vf function delete](/docs/cli/commands/function/delete) - Delete function
* [vf function get](/docs/cli/commands/function/get) - Get function
* [vf function list](/docs/cli/commands/function/list) - List functions
* [vf function path](/docs/cli/commands/function/path) - Operations for path
* [vf function update](/docs/cli/commands/function/update) - Update function
* [vf function variable](/docs/cli/commands/function/variable) - Operations for function-variable
