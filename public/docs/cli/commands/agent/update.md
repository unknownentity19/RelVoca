> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf agent update - Update agent

> vf agent update: update agent. Requires --environment-alias and --project-id, with a worked example.

Update agent configuration.

## Usage

```bash theme={null}
vf agent update [flags]
```

## Examples

```bash theme={null}
  vf agent update --project-id <id> --environment-alias <value>
```

## Flags

```text theme={null}
      --body string                   Request body as JSON (alternative to individual flags). Can also be provided via stdin.
  -b, --button-tool string            JSON object
      --call-forward-tool string      JSON object
      --card-tool string              JSON object
      --carousel-tool string          JSON object
      --end-tool string               JSON object
      --environment-alias string      [required]
  -h, --help                          help for update
      --include-guidelines            Whether to append the default prompting guidelines to the global prompt.
      --instructions string           list of values
  -k, --knowledge-base-tool string    JSON object
  -l, --llm string                    JSON object
      --path-tool-order stringArray   The ordered list of path tool IDs that controls the order of the agent exit paths.
      --playbooks string              Playbooks available for the agent to invoke.
      --project-id string             [required]
      --prompt string                 list of values
  -s, --skip-turn-tool string         JSON object
  -v, --voice string                  JSON object
      --web-search-tool string        JSON object
      --workflows string              Workflows available for the agent to invoke.
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

* [vf agent](/docs/cli/commands/agent) - Operations for agent
