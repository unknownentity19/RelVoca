> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf document

> vf document: operations for document. Groups 7 subcommands: create-table, create-text, create-url, delete, get, list, update.

Operations for document.

## Usage

```bash theme={null}
vf document [flags]
```

## Flags

```text theme={null}
  -h, --help   help for document
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
* [vf document create-table](/docs/cli/commands/document/create-table) - Create table document
* [vf document create-text](/docs/cli/commands/document/create-text) - Create text document
* [vf document create-url](/docs/cli/commands/document/create-url) - Create URL document
* [vf document delete](/docs/cli/commands/document/delete) - Delete document
* [vf document get](/docs/cli/commands/document/get) - Get document
* [vf document list](/docs/cli/commands/document/list) - List documents
* [vf document update](/docs/cli/commands/document/update) - Update document
