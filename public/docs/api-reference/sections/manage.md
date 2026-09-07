> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage overview

> Create and administer the containers your agents live in: workspaces that group projects and people, and projects that each own a single agent.

Workspaces group projects and the people who can reach them. A project owns a
single agent and everything inside it.

These endpoints create and administer both, and they are where you get the
`projectID` that almost every other endpoint in this API asks for.

## Endpoints

### Project

| Endpoint                                                                                              | Description                        |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List projects](/docs/api-reference/project/list-projects)      | List all projects by workspace ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create project](/docs/api-reference/project/create-project)    | Create a new project.              |
| <Badge color="green" size="sm">GET</Badge> [Get project](/docs/api-reference/project/get-project)          | Get a project by ID.               |
| <Badge color="orange" size="sm">PATCH</Badge> [Update project](/docs/api-reference/project/update-project) | Update a project by ID.            |
| <Badge color="red" size="sm">DELETE</Badge> [Delete project](/docs/api-reference/project/delete-project)   | Delete a project by ID.            |

### Workspace

| Endpoint                                                                                                    | Description                                                |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List workspaces](/docs/api-reference/workspace/list-workspaces)      | List all workspaces the authorized account is a member of. |
| <Badge color="blue" size="sm">POST</Badge> [Create workspace](/docs/api-reference/workspace/create-workspace)    | Create a new workspace.                                    |
| <Badge color="green" size="sm">GET</Badge> [Get workspace](/docs/api-reference/workspace/get-workspace)          | Get a single workspace by ID.                              |
| <Badge color="orange" size="sm">PATCH</Badge> [Update workspace](/docs/api-reference/workspace/update-workspace) | Update a single workspace by ID.                           |
| <Badge color="red" size="sm">DELETE</Badge> [Delete workspace](/docs/api-reference/workspace/delete-workspace)   | Delete a single workspace by ID.                           |

## The hierarchy

An organization contains **workspaces**. A workspace contains **projects**. A
project owns exactly one agent, along with its playbooks, tools, variables,
knowledge base and environments.

Most other endpoints in this API take a `projectID`, which you get by listing
the projects in a workspace:

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/project?workspaceID=$VF_WORKSPACE_ID" \
  -H "Authorization: Bearer $VF_PAT"
```

## What a token can see

A [personal access token](/docs/api-reference/authentication) carries your own
access. Listing workspaces returns every workspace your account belongs to, not
a subset scoped to the integration, so a script that iterates workspaces will
reach further than you might expect. Pin the IDs you mean to operate on rather
than discovering them at runtime.

## Deleting

Deleting a project removes the agent and everything in it, including
transcripts. Deleting a workspace removes every project inside it. Neither is
recoverable through the API.

## Where to go next

With a project in hand, [build its agent](/docs/api-reference/sections/build) and
[ship it through environments](/docs/api-reference/sections/publishing).
