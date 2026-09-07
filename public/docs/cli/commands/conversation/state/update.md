> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf conversation state update

> vf conversation state update: update state. Requires --environment-alias, --project-id, --stack, --storage, --user-id, --variables and --version-param.

Update conversation state for a user.

## Usage

```bash theme={null}
vf conversation state update [flags]
```

## Examples

```bash theme={null}
  vf state update --user-id <id> --project-id <id> --environment-alias <value> --version-param published --stack '[]'
```

## Flags

```text theme={null}
      --body string                Request body as JSON (alternative to individual flags). Can also be provided via stdin.
  -e, --environment-alias string   [required]
  -h, --help                       help for update
  -p, --project-id string          [required]
      --stack string               The execution stack for the conversation, from root to innermost frame. [required]
      --storage string             Internal runtime storage persisted across turns of the session. [required]
  -u, --user-id string             [required]
      --variables string           The current values of the agent variables for this session. [required]
      --version-param string       options: draft, published [required]
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

* [vf conversation state](/docs/cli/commands/conversation/state) - Operations for state
