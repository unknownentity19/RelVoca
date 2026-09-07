> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying the knowledge base

> Turn on the knowledge base system tool so your agent can search your documents, then tune how it retrieves and cites what it finds.

To give your agent access to the knowledge base, open the **Agent** and make sure the **knowledge base** toggle is on in [system tools](/docs/documentation/build/tools/system-tools). When on, your agent will automatically use this tool when it needs information to answer a question.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/KB-toggle-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=5bf65d7b7816c2c6b9e3f0eb1a2f676e" alt="KB Toggle Docs 1" width="1256" height="536" data-path="images/KB-toggle-docs-1.png" />

<Info>
  When on at the agent level, individual [playbooks](/docs/documentation/build/playbooks) can also query the knowledge base. You can override query settings at the playbook level without impacting the agent or other playbooks.
</Info>

## Configuring the knowledge base tool

When you enable the knowledge base system tool in your agent, you can configure how it queries your content.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Knowledge-base-tool-config-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=8d96134440ffdcbcfcbee0cd2bec8da4" alt="Knowledge Base Tool Config Docs" width="2234" height="1494" data-path="images/Knowledge-base-tool-config-docs.png" />

### Trigger

Describes what this tool does and when the agent should use it. By default this is pre-filled with an opinionated description, however, you can reset it to a simpler default, or override it to your use-case. You can also add examples in your agent or playbook instructions showing when to use - or avoid - this tool for better retrieval accuracy.

```text Opinionated default we apply to new projects theme={null}
Use this tool when answering any question about your company, product, service,
or purpose, unless the answer has already been retrieved in the current
conversation.

Never answer these questions from your own knowledge - only use information
retrieved from this tool or web search. Before searching, reformat the user's
query for retrieval by extracting key terms and intent, stripping filler, and
including relevant conversation context.

If no results are found, try web search (if available) before saying you don't
have information. Never mention the knowledge base, or your use of it, to users.
```

```text Simple default you can reset to theme={null}
Searches an external knowledge base to retrieve relevant information,
supplementing or replacing the language model's internal context.
```

### Custom query

By default, the agent uses the user's last message as the search query. Use a custom query to override this - useful when you want to search on a specific variable or a reformulated version of the user's input. To insert a variable, type `{` in the input.

### Query re-writing

When enabled, the model rewrites the user's last message before searching based on your instructions - improving retrieval for conversational or ambiguous inputs. Useful when users don't phrase questions the way your content is written.

```text Query re-writing example theme={null}
Search for the underlying user intent rather than the user's exact words. 
For example:

- "it won't let me log in" = "login error troubleshooting"
- "my thing never showed up" = "missing order or delivery issue"
- "how much is it" = "pricing and plan information"
```

### Chunk limit

Controls how many content chunks are returned per query (1-10, default 3). Higher values return more context but increase latency and token usage. Start at 3 and increase if the agent is missing relevant information.

### Meta data filtering

<Info>
  Unfamiliar with adding meta data in the knowledge base? [Learn more](/docs/documentation/build/importing-data-sources)
</Info>

Filter which data sources are queried based on metadata tags. Useful when you have content for different plans, regions, or product lines and want to make sure the agent only retrieves what's relevant for the current user.

Meta data filtering lets you apply values manually, or let the agent/playbook apply query values at runtime based on the conversation history.

You can add a variable to the default value field by typing`{` .

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Meta-data-filtering-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=747294449c8a654f12095751e0cec62a" alt="Meta Data Filtering Docs 1" width="2192" height="678" data-path="images/Meta-data-filtering-docs-1.png" />

### Tool messages

Customize what the user sees while the knowledge base tool is running. You can set scripted messages for four states:

* **Start** - shown when the tool begins querying
* **Complete** - shown when results are returned
* **Fail** - shown when the query returns nothing or errors
* **Delay** - shown if the query takes longer than expected (you set the delay threshold)

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tool-messages-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=dad258fae075b5c00caafb3972cf4a20" alt="Tool Messages Docs" width="2192" height="1028" data-path="images/Tool-messages-docs.png" />

Each state supports multiple message variants - the agent picks one randomly to avoid repetition. You can also set conditional variants that trigger based on variables or context, giving you fine-grained control over what the user sees depending on the situation.

### Show source URL(s)

<Info>
  This feature is only available in **chat** projects.
</Info>

When enabled, the agent includes the source URL alongside its response so users can verify or read more. Recommended for help centers and documentation.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Show-source-url-kb-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=34c5c90c9a3ea1399360438928b2e1cb" alt="Show Source Url Kb Docs 1" width="2192" height="1232" data-path="images/Show-source-url-kb-docs-1.png" />

## Developers

<Card title="Knowledge base API" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/documentation.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=3cc1ccb7332cb518c4867900c5351b68" href="/docs/api-reference/sections/build" width="24" height="24" data-path="images/icons/documentation.svg">
  The Knowledge base API gives you programmatic access to the documents that power your agent’s knowledge base. You can use it to [create](/docs/api-reference/document/create-text-document), [retrieve](/docs/api-reference/document/get-document), [update](/docs/api-reference/document/update-document), and [delete](/docs/api-reference/document/delete-document) documents, as well as manage their metadata and individual chunks.
</Card>
