> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# vf document create-text

> vf document create-text: create text document. Requires --environment-alias, --file and --project-id, with a worked example.

Create a new document from raw text.

## Usage

```bash theme={null}
vf document create-text [flags]
```

## Examples

```bash theme={null}
  vf document create-text --project-id <id> --environment-alias <value>
```

## Flags

```text theme={null}
  -c, --can-edit                           If true, the document content can be edited in the Creator after upload.
  -e, --environment-alias string           [required]
  -f, --file string                        Path to file to upload [required]
  -h, --help                               help for create-text
      --llm-based-chunks string            JSON value (one of: boolean | StableDocumentController_createText_llmBasedChunks_enum)
      --llm-content-summarization string   JSON value (one of: boolean | StableDocumentController_createText_llmContentSummarization_enum)
      --llm-generated-q string             JSON value (one of: boolean | StableDocumentController_createText_llmGeneratedQ_enum)
      --llm-prepend-context string         JSON value (one of: boolean | StableDocumentController_createText_llmPrependContext_enum)
      --markdown-conversion string         JSON value (one of: boolean | StableDocumentController_createText_markdownConversion_enum)
      --max-chunk-size string              JSON value (one of: string | number)
      --metadata { key, values }           A JSON-encoded array of { key, values } metadata tags attached to the document, used to filter knowledge base retrieval at runtime.
      --overwrite string                   JSON value (one of: boolean | StableDocumentController_createText_overwrite_enum)
  -p, --project-id string                  [required]
  -u, --url string                         An optional source URL to associate with the uploaded document.
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

* [vf document](/docs/cli/commands/document) - Operations for document
