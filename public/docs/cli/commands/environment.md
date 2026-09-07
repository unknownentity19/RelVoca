> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf environment

> vf environment: operations for environment. Groups 9 subcommands: clone, compile, delete, get, list, merge, publish, update, update-traffic-split.

Operations for environment.

## Usage

```bash theme={null}
vf environment [flags]
```

## Flags

```text theme={null}
  -h, --help   help for environment
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
* [vf environment clone](/docs/cli/commands/environment/clone) - Clone environment
* [vf environment compile](/docs/cli/commands/environment/compile) - Compile environment
* [vf environment delete](/docs/cli/commands/environment/delete) - Delete environment
* [vf environment get](/docs/cli/commands/environment/get) - Get environment
* [vf environment list](/docs/cli/commands/environment/list) - List environments
* [vf environment merge](/docs/cli/commands/environment/merge) - Merge environments
* [vf environment publish](/docs/cli/commands/environment/publish) - Publish environment
* [vf environment update](/docs/cli/commands/environment/update) - Update environment
* [vf environment update-traffic-split](/docs/cli/commands/environment/update-traffic-split) - Update traffic split
