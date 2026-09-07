> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics overview

> Query usage and cost: tokens, calls, conversations and unique users, plus the spend attributed to individual functions, playbooks and tools.

Every conversation an agent handles spends tokens, costs money, and exercises
some subset of its playbooks, functions and tools. Analytics turns that into
numbers you can query: scoped to an organization, a workspace or a single
project, and broken down by the component that caused the spend.

## Endpoints

### Analytics query

| Endpoint                                                                                                                                           | Description                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| <Badge color="blue" size="sm">POST</Badge> [Query call count](/docs/api-reference/analytics/query-call-count)                                           | Query call count for a project.                                                                |
| <Badge color="blue" size="sm">POST</Badge> [Query call duration](/docs/api-reference/analytics/query-call-duration)                                     | Query real call duration (talk time) for a project.                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query workspace transcript count](/docs/api-reference/analytics/query-workspace-transcript-count)           | Query transcript count for a workspace.                                                        |
| <Badge color="blue" size="sm">POST</Badge> [Query project transcript count](/docs/api-reference/analytics/query-project-transcript-count)               | Query transcript count for a project.                                                          |
| <Badge color="blue" size="sm">POST</Badge> [Query transcript cost](/docs/api-reference/analytics/query-transcript-cost)                                 | Query per-interval cost and transcript count for a project.                                    |
| <Badge color="blue" size="sm">POST</Badge> [Query workspace interaction count](/docs/api-reference/analytics/query-workspace-interaction-count)         | Query interaction count for a workspace.                                                       |
| <Badge color="blue" size="sm">POST</Badge> [Query project interaction count](/docs/api-reference/analytics/query-project-interaction-count)             | Query interaction count for a project.                                                         |
| <Badge color="blue" size="sm">POST</Badge> [Query organization token usage](/docs/api-reference/analytics/query-organization-token-usage)               | Query token usage for an organization.                                                         |
| <Badge color="blue" size="sm">POST</Badge> [Query workspace token usage](/docs/api-reference/analytics/query-workspace-token-usage)                     | Query token usage for a workspace.                                                             |
| <Badge color="blue" size="sm">POST</Badge> [Query project token usage](/docs/api-reference/analytics/query-project-token-usage)                         | Query token usage for a project.                                                               |
| <Badge color="blue" size="sm">POST</Badge> [Query hourly organization token usage](/docs/api-reference/analytics/query-hourly-organization-token-usage) | Query hourly token usage for an organization with optional workspace/project filters.          |
| <Badge color="blue" size="sm">POST</Badge> [Query hourly project token usage](/docs/api-reference/analytics/query-hourly-project-token-usage)           | Query timezone-aware hourly token usage for a project.                                         |
| <Badge color="blue" size="sm">POST</Badge> [Query daily token usage](/docs/api-reference/analytics/query-daily-token-usage)                             | Daily breakdown of organization token usage grouped by class and category within a date range. |
| <Badge color="blue" size="sm">POST</Badge> [Query entity token usage](/docs/api-reference/analytics/query-entity-token-usage)                           | Token totals grouped per project and per workspace for an organization.                        |
| <Badge color="blue" size="sm">POST</Badge> [Query category token usage](/docs/api-reference/analytics/query-category-token-usage)                       | Query timezone-aware hourly token usage for a project grouped by usage category.               |
| <Badge color="blue" size="sm">POST</Badge> [Query playbook usage](/docs/api-reference/analytics/query-playbook-usage)                                   | Query playbook usage for a project.                                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query workflow usage](/docs/api-reference/analytics/query-workflow-usage)                                   | Query workflow usage for a project.                                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query prompt usage](/docs/api-reference/analytics/query-prompt-usage)                                       | Query prompt usage for a project.                                                              |
| <Badge color="blue" size="sm">POST</Badge> [Query intent usage](/docs/api-reference/analytics/query-intent-usage)                                       | Query intent usage for a project.                                                              |
| <Badge color="blue" size="sm">POST</Badge> [Query function usage](/docs/api-reference/analytics/query-function-usage)                                   | Query function usage for a project.                                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query API tool usage](/docs/api-reference/analytics/query-api-tool-usage)                                   | Query API tool usage for a project.                                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query MCP tool usage](/docs/api-reference/analytics/query-mcp-tool-usage)                                   | Query MCP tool usage for a project.                                                            |
| <Badge color="blue" size="sm">POST</Badge> [Query knowledge base document usage](/docs/api-reference/analytics/query-knowledge-base-document-usage)     | Query knowledge base document usage for a project.                                             |
| <Badge color="blue" size="sm">POST</Badge> [Query integration usage](/docs/api-reference/analytics/query-integration-usage)                             | Query integration usage for a project.                                                         |
| <Badge color="blue" size="sm">POST</Badge> [Query unique user count](/docs/api-reference/analytics/query-unique-user-count)                             | Query unique users for a project.                                                              |

## Every query has a scope

Analytics endpoints end in the level they measure, and the level is part of the
path:

```text theme={null}
/v1/stable/analytics/query/token-usage/organization/{organizationID}
/v1/stable/analytics/query/token-usage/workspace/{workspaceID}
/v1/stable/analytics/query/token-usage/project/{projectID}
```

Not every metric exists at every level, which is itself informative: interaction
counts are project and workspace, entity token usage is organization only.

## What you can measure

* **Spend** - token usage overall, by hour, by day, by category, and by entity;
  plus transcript cost.
* **Volume** - interactions, transcripts, unique users, call count and call
  duration.
* **Where it goes** - usage attributed to functions, playbooks, workflows,
  intents, prompts, integrations, API tools, MCP tools and knowledge base
  documents.

That last group is the one most people skip. It answers which parts of an agent
are actually costing money, rather than what the agent cost in total.

## Sending a query

Each query takes a request body describing the window and grouping you want, so
they are `POST` rather than `GET` despite being reads.

## What analytics does not return

Analytics returns numbers about conversations, never the conversations
themselves. To read what was actually said, use
[Observe](/docs/api-reference/sections/observe).
