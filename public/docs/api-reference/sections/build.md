> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Build overview

> Create and manage the pieces an agent is built from: playbooks, functions, tools, API tools, MCP servers, variables and knowledge base documents.

An agent is assembled from parts: a playbook and the tools it can call, a
function with its branches and variables, an API tool, an MCP server, the
project's variables, and the documents its knowledge base retrieves from.

All of them can be created and changed from outside the Studio, which is what
makes generating agents from a template, importing them from another system, or
keeping a set of projects consistent with each other possible.

## Endpoints

### Agent

| Endpoint                                                                                        | Description                 |
| ----------------------------------------------------------------------------------------------- | --------------------------- |
| <Badge color="green" size="sm">GET</Badge> [Get agent](/docs/api-reference/agent/get-agent)          | Get agent configuration.    |
| <Badge color="orange" size="sm">PATCH</Badge> [Update agent](/docs/api-reference/agent/update-agent) | Update agent configuration. |

### Playbook

| Endpoint                                                                                                          | Description                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List playbooks](/docs/api-reference/playbook/list-playbooks)               | List all playbooks by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create playbook](/docs/api-reference/playbook/create-playbook)             | Create a new playbook.            |
| <Badge color="blue" size="sm">POST</Badge> [Create many playbooks](/docs/api-reference/playbook/create-many-playbooks) | Create multiple new playbooks.    |
| <Badge color="green" size="sm">GET</Badge> [Get playbook](/docs/api-reference/playbook/get-playbook)                   | Get a playbook by ID.             |
| <Badge color="orange" size="sm">PATCH</Badge> [Update playbook](/docs/api-reference/playbook/update-playbook)          | Update a playbook by ID.          |
| <Badge color="red" size="sm">DELETE</Badge> [Delete playbook](/docs/api-reference/playbook/delete-playbook)            | Delete a playbook by ID.          |

### Function

| Endpoint                                                                                                          | Description                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List functions](/docs/api-reference/function/list-functions)               | List all functions by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create function](/docs/api-reference/function/create-function)             | Create a new function.            |
| <Badge color="blue" size="sm">POST</Badge> [Create many functions](/docs/api-reference/function/create-many-functions) | Create multiple new functions.    |
| <Badge color="green" size="sm">GET</Badge> [Get function](/docs/api-reference/function/get-function)                   | Get a function by ID.             |
| <Badge color="orange" size="sm">PATCH</Badge> [Update function](/docs/api-reference/function/update-function)          | Update a function by ID.          |
| <Badge color="red" size="sm">DELETE</Badge> [Delete function](/docs/api-reference/function/delete-function)            | Delete a function by ID.          |

### Function path

| Endpoint                                                                                                       | Description                    |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| <Badge color="green" size="sm">GET</Badge> [List paths](/docs/api-reference/function-path/list-paths)               | List all paths by function ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create path](/docs/api-reference/function-path/create-path)             | Create a new path.             |
| <Badge color="blue" size="sm">POST</Badge> [Create many paths](/docs/api-reference/function-path/create-many-paths) | Create multiple new paths.     |
| <Badge color="green" size="sm">GET</Badge> [Get path](/docs/api-reference/function-path/get-path)                   | Get a path by ID.              |
| <Badge color="orange" size="sm">PATCH</Badge> [Update path](/docs/api-reference/function-path/update-path)          | Update a path by ID.           |
| <Badge color="red" size="sm">DELETE</Badge> [Delete path](/docs/api-reference/function-path/delete-path)            | Delete a path by ID.           |

### Function variable

| Endpoint                                                                                                                   | Description                        |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List variables](/docs/api-reference/function-variable/list-variables)               | List all variables by function ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create variable](/docs/api-reference/function-variable/create-variable)             | Create a new variable.             |
| <Badge color="blue" size="sm">POST</Badge> [Create many variables](/docs/api-reference/function-variable/create-many-variables) | Create multiple new variables.     |
| <Badge color="green" size="sm">GET</Badge> [Get variable](/docs/api-reference/function-variable/get-variable)                   | Get a variable by ID.              |
| <Badge color="orange" size="sm">PATCH</Badge> [Update variable](/docs/api-reference/function-variable/update-variable)          | Update a variable by ID.           |
| <Badge color="red" size="sm">DELETE</Badge> [Delete variable](/docs/api-reference/function-variable/delete-variable)            | Delete a variable by ID.           |

### Tool

| Endpoint                                                                                              | Description                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List tools](/docs/api-reference/tool/list-tools)               | List all tools for the agent or a specific playbook. |
| <Badge color="blue" size="sm">POST</Badge> [Create tool](/docs/api-reference/tool/create-tool)             | Create a new tool.                                   |
| <Badge color="blue" size="sm">POST</Badge> [Create many tools](/docs/api-reference/tool/create-many-tools) | Create multiple new tools.                           |
| <Badge color="green" size="sm">GET</Badge> [Get tool](/docs/api-reference/tool/get-tool)                   | Get a tool by ID.                                    |
| <Badge color="orange" size="sm">PATCH</Badge> [Update tool](/docs/api-reference/tool/update-tool)          | Update a tool by ID.                                 |
| <Badge color="red" size="sm">DELETE</Badge> [Delete tool](/docs/api-reference/tool/delete-tool)            | Delete a tool by ID.                                 |

### API tool

| Endpoint                                                                                                          | Description                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List API tools](/docs/api-reference/api-tool/list-api-tools)               | List all API tools by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create API tool](/docs/api-reference/api-tool/create-api-tool)             | Create a new API tool.            |
| <Badge color="blue" size="sm">POST</Badge> [Create many API tools](/docs/api-reference/api-tool/create-many-api-tools) | Create multiple new API tools.    |
| <Badge color="green" size="sm">GET</Badge> [Get API tool](/docs/api-reference/api-tool/get-api-tool)                   | Get an API tool by ID.            |
| <Badge color="orange" size="sm">PATCH</Badge> [Update API tool](/docs/api-reference/api-tool/update-api-tool)          | Update an API tool by ID.         |
| <Badge color="red" size="sm">DELETE</Badge> [Delete API tool](/docs/api-reference/api-tool/delete-api-tool)            | Delete an API tool by ID.         |

### API tool variable

| Endpoint                                                                                                                   | Description                        |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List variables](/docs/api-reference/api-tool-variable/list-variables)               | List all variables by API tool ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create variable](/docs/api-reference/api-tool-variable/create-variable)             | Create a new variable.             |
| <Badge color="blue" size="sm">POST</Badge> [Create many variables](/docs/api-reference/api-tool-variable/create-many-variables) | Create multiple new variables.     |
| <Badge color="green" size="sm">GET</Badge> [Get variable](/docs/api-reference/api-tool-variable/get-variable)                   | Get an variable by ID.             |
| <Badge color="orange" size="sm">PATCH</Badge> [Update variable](/docs/api-reference/api-tool-variable/update-variable)          | Update an variable by ID.          |
| <Badge color="red" size="sm">DELETE</Badge> [Delete variable](/docs/api-reference/api-tool-variable/delete-variable)            | Delete an variable by ID.          |

### Variable

| Endpoint                                                                                                          | Description                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List variables](/docs/api-reference/variable/list-variables)               | List all variables by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create variable](/docs/api-reference/variable/create-variable)             | Create a new variable.            |
| <Badge color="blue" size="sm">POST</Badge> [Create many variables](/docs/api-reference/variable/create-many-variables) | Create multiple new variables.    |
| <Badge color="green" size="sm">GET</Badge> [Get variable](/docs/api-reference/variable/get-variable)                   | Get a variable by ID.             |
| <Badge color="orange" size="sm">PATCH</Badge> [Update variable](/docs/api-reference/variable/update-variable)          | Update a variable by ID.          |
| <Badge color="red" size="sm">DELETE</Badge> [Delete variable](/docs/api-reference/variable/delete-variable)            | Delete a variable by ID.          |

### MCP server

| Endpoint                                                                                                       | Description                                |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| <Badge color="green" size="sm">GET</Badge> [List MCP servers](/docs/api-reference/mcp-server/list-mcp-servers)      | List all MCP servers by project ID.        |
| <Badge color="blue" size="sm">POST</Badge> [Create MCP server](/docs/api-reference/mcp-server/create-mcp-server)    | Create a new MCP server.                   |
| <Badge color="green" size="sm">GET</Badge> [Get MCP server](/docs/api-reference/mcp-server/get-mcp-server)          | Get an MCP server by ID.                   |
| <Badge color="orange" size="sm">PATCH</Badge> [Update MCP server](/docs/api-reference/mcp-server/update-mcp-server) | Update an MCP server by ID.                |
| <Badge color="red" size="sm">DELETE</Badge> [Delete MCP server](/docs/api-reference/mcp-server/delete-mcp-server)   | Delete an MCP server by ID.                |
| <Badge color="purple" size="sm">PUT</Badge> [Sync MCP server](/docs/api-reference/mcp-server/sync-mcp-server)       | Sync tool changes for an MCP server by ID. |

### MCP tool

| Endpoint                                                                                            | Description                       |
| --------------------------------------------------------------------------------------------------- | --------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List MCP tools](/docs/api-reference/mcp-tool/list-mcp-tools) | List all MCP tools by project ID. |
| <Badge color="green" size="sm">GET</Badge> [Get MCP tool](/docs/api-reference/mcp-tool/get-mcp-tool)     | Get an MCP tool by ID.            |

### Knowledge base document

| Endpoint                                                                                                          | Description                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List documents](/docs/api-reference/document/list-documents)               | List all documents by project ID.           |
| <Badge color="blue" size="sm">POST</Badge> [Create URL document](/docs/api-reference/document/create-url-document)     | Create a new document from a URL.           |
| <Badge color="blue" size="sm">POST</Badge> [Create text document](/docs/api-reference/document/create-text-document)   | Create a new document from raw text.        |
| <Badge color="blue" size="sm">POST</Badge> [Create table document](/docs/api-reference/document/create-table-document) | Create a new document from structured data. |
| <Badge color="green" size="sm">GET</Badge> [Get document](/docs/api-reference/document/get-document)                   | Get a document by ID.                       |
| <Badge color="orange" size="sm">PATCH</Badge> [Update document](/docs/api-reference/document/update-document)          | Update a document by ID.                    |
| <Badge color="red" size="sm">DELETE</Badge> [Delete document](/docs/api-reference/document/delete-document)            | Delete a document by ID.                    |

## How the build endpoints are shaped

Every resource follows the same six-verb pattern, so learning one teaches the
rest:

| Verb     | Path                | Purpose                        |
| -------- | ------------------- | ------------------------------ |
| `GET`    | `/{resource}`       | list everything in the project |
| `POST`   | `/{resource}`       | create one                     |
| `POST`   | `/{resource}/batch` | create many in a single call   |
| `GET`    | `/{resource}/{id}`  | fetch one                      |
| `PATCH`  | `/{resource}/{id}`  | change part of one             |
| `DELETE` | `/{resource}/{id}`  | remove one                     |

The `batch` variant matters when you are importing. Creating fifty variables
one call at a time is fifty round trips and fifty chances to end up half
migrated; one batch call is atomic from your side.

## Scoping every call

Build endpoints act inside one environment of one project, so both are
required query parameters:

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/function?projectID=$VF_PROJECT_ID&environmentAlias=main" \
  -H "Authorization: Bearer $VF_PAT"
```

Editing `main` changes what your team sees in the Creator. To stage changes
without touching it, clone an environment first, build against the clone, and
[merge](/docs/api-reference/environment/merge-environments) when you are satisfied.

## How the pieces relate

* A **playbook** is the unit of agent behaviour. It holds instructions and the
  tools it may call.
* **Tools** are what a playbook can do. An **API tool** calls an HTTP endpoint;
  a **function** runs your own code; an **MCP server** contributes a set of
  **MCP tools** discovered from that server.
* **Function paths** are the branches a function can exit through, and
  **function variables** are its inputs and outputs. Both belong to a function
  and are managed separately, so you can add a branch without rewriting the
  function.
* **Variables** are project state that persists across a conversation.
* **Knowledge base documents** are the corpus the agent retrieves from. Create
  them from a URL, from text, or by uploading a table.

## Where to go next

Once an agent is built, [publish it](/docs/api-reference/sections/publishing) to make
the changes live, and [run a conversation](/docs/api-reference/sections/running-agents) against
it to see how it behaves.
