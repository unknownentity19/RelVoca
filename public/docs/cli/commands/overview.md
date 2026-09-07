> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf

> vf - Realtime: Realtime gateway API service. Groups 22 subcommands, including agent, analytics, api-tool, auth, configure, conversation, document, environment.

Realtime: Realtime gateway API service.

## Usage

```bash theme={null}
vf [flags]
```

## Flags

```text theme={null}
      --agent-mode             Enable structured errors and default TOON output for AI coding agents. Automatically enabled when a known agent environment is detected (CLAUDE_CODE, CURSOR_AGENT, etc.). Use --agent-mode=false to disable.
      --color string           Control colored output: auto (color when output is a TTY), always, or never. Respects NO_COLOR and FORCE_COLOR env vars. (default "auto")
  -d, --debug                  Log request and response diagnostics to stderr
      --dry-run                Preview the request that would be sent without executing it (output to stderr)
  -H, --header stringArray     Set a custom HTTP request header (format: "Key: Value"). Can be specified multiple times.
  -h, --help                   help for vf
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

* [vf agent](/docs/cli/commands/agent) - Operations for agent
* [vf analytics](/docs/cli/commands/analytics) - Operations for analytics
* [vf api-tool](/docs/cli/commands/api-tool) - Operations for api-tool
* [vf auth](/docs/cli/commands/auth) - Manage authentication credentials
* [vf configure](/docs/cli/commands/configure) - Configure authentication credentials and preferences
* [vf conversation](/docs/cli/commands/conversation) - Operations for conversation
* [vf document](/docs/cli/commands/document) - Operations for document
* [vf environment](/docs/cli/commands/environment) - Operations for environment
* [vf evaluation](/docs/cli/commands/evaluation) - Operations for evaluation
* [vf explore](/docs/cli/commands/explore) - Interactively browse and run commands
* [vf function](/docs/cli/commands/function) - Operations for function
* [vf knowledge-base](/docs/cli/commands/knowledge-base) - Operations for knowledge-base
* [vf mcp-server](/docs/cli/commands/mcp-server) - Operations for mcp-server
* [vf mcp-tool](/docs/cli/commands/mcp-tool) - Operations for mcp-tool
* [vf playbook](/docs/cli/commands/playbook) - Operations for playbook
* [vf project](/docs/cli/commands/project) - Operations for project
* [vf tool](/docs/cli/commands/tool) - Operations for tool
* [vf transcript](/docs/cli/commands/transcript) - Operations for transcript
* [vf variable](/docs/cli/commands/variable) - Operations for variable
* [vf version](/docs/cli/commands/version) - Print the CLI version
* [vf whoami](/docs/cli/commands/whoami) - Display current authentication configuration
* [vf workspace](/docs/cli/commands/workspace) - Operations for workspace
