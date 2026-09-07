> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Building an agent

> Build AI agents with playbooks, workflows, and powerful customization options.

The Build section covers everything you need to create production-ready agents - from defining their behavior and logic to connecting external tools and knowledge sources.

## Key concepts

| **Goal**                                                        | **Docs**                                                         | **Description**                                                           |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Define global prompt, instructions, and skills                  | [Agent](/docs/documentation/build/global-prompt)                      | Design how your agent responds and what skills it has to get things done  |
| Create agentic, goal based conversations<br />with tool calling | [Playbooks](/docs/documentation/build/playbooks)                      | Give your agent flexible reasoning to navigate open-ended conversations   |
| Handle complex, multi-step processes - with or without AI       | [Workflows](/docs/documentation/build/workflows)                      | Design precise, step-by-step conversation flows with the visual builder   |
| Add knowledge to your agent                                     | [Knowledge base](/docs/documentation/build/importing-data-sources)    | Upload documents and data to ground your agent's responses                |
| Connect external tools                                          | [Tools](/docs/documentation/build/tools/api-tool)                     | Enable your agent to call APIs, integrations, functions and MCP servers   |
| Store and manage data                                           | [Variables](/docs/documentation/build/data/variables)                 | Use variables to capture, store, and pass data through conversations      |
| Manage sensitive data                                           | [Secrets](/docs/documentation/build/data/secrets)                     | Securely store API keys and credentials for use in tools and integrations |
| Select agent framework                                          | [Framework](/docs/documentation/build/framework/choosing-a-framework) | Select between agentic (recommended) or conversational flow framework     |

### Agent

Control how your agent thinks, responds and routes users:

* [Global prompt](/docs/documentation/build/global-prompt): Applied to every turn to shape how the agent responds, independent of routing or skills. This usually includes `# Personality`, `# Goal`, `# Tone`, and `# Guardrails`.
* [Instructions](/docs/documentation/build/instructions): Defines how the agent routes requests and decides which skills to use.

### Playbooks & workflows

Playbooks and workflows control what your agent can do for users - things like checking an order status, booking a demo, processing a return, or resetting a password.

* [Playbooks](/docs/documentation/build/playbooks): Autonomous reasoning for open-ended conversations - your agent decides how to navigate based on context, intent, and goals.
* [Workflows](/docs/documentation/build/workflows): Visual workflow builder for more deterministic, multi-step conversation flows with branching, conditions, and integrations.

<Tip>
  Workflows can use playbooks & other AI-powered steps, so you can build agentic experiences with deterministic control where it matters. You can also build fully scripted interactions with scripted messages, buttons, conditions, and other non-AI steps.
</Tip>

This is a **critical decision** you'll make when building AI agents in RelVoca:

| Use a **playbook** when...                       | Use a **workflow** when...                       |
| ------------------------------------------------ | ------------------------------------------------ |
| **Flexibility** matters more than predictability | **Predictability** matters more than flexibility |
| The conversation is **open-ended**               | The process has strict **business logic**        |
| The agent needs to reason about what to do       | The steps are the same every time                |
| There are many possible paths                    | There's one, or a few correct paths              |

<Info>
  There’s no universally correct choice - selecting a playbook or a workflow comes down to your specific use case and the needs of your business.

  If you're unsure, we recommend starting with a playbook as it provides more flexibility and is easier to iterate on as you learn what your customers actually need. You can always introduce workflows later to handle specific conversations that benefit from a more structured approach.
</Info>

### Knowledge base

Extend your agent with external data and integrations that sync automatically:

* [Import data sources](/docs/documentation/build/importing-data-sources): Upload URLs, sitemaps, and documents to ground responses in real information via RAG.
* [Connect to external data sources](/docs/documentation/build/importing-data-sources): Connect your knowledge base to Zendesk, Shopify, Kustomer, Salesforce, and more.

### Tools

Tools can be used in playbooks or workflows:

* [API tools](/docs/documentation/build/tools/api-tool): Connect to external REST APIs to fetch data or trigger actions.
* [Function tools](/docs/documentation/build/tools/function-tool): Write custom JavaScript logic that runs during conversations.
* [Integration tools](/docs/documentation/build/tools/overview): Pre-built connectors for Salesforce, HubSpot, Zendesk, Twilio, and more.
* [MCP tools](/docs/documentation/build/tools/mcp-tool): Use Model Context Protocol servers to extend agent capabilities.
* [Global tools](/docs/documentation/build/tools/global-tools): Added at the agent level, and accessibly throughout your agent.
* [System tools](/docs/documentation/build/tools/system-tools): Update the internal state of conversations and show native UI artifacts.

### Data management

Capture and use data throughout conversations:

* [Variables](/docs/documentation/build/data/variables): Store user inputs, API responses, and conversation state to personalize interactions.
* [Secrets](/docs/documentation/build/data/secrets): Securely manage API keys and credentials used by tools and integrations.

## Next steps

<CardGroup cols={2}>
  <Card title="Agent" iconType="solid" href="/docs/documentation/build/global-prompt" img="https://mintcdn.com/voiceflow-009a8802/NgQm2d4PcDuGmYWV/images/Global-prompt-docs.png?fit=max&auto=format&n=NgQm2d4PcDuGmYWV&q=85&s=b701c8b2ef4244d18954c337167fe0f1" width="2820" height="1769" data-path="images/Global-prompt-docs.png">
    Define global prompt, instructions, and skills (playbooks & workflows).
  </Card>

  <Card title="Playbooks" iconType="solid" href="/docs/documentation/build/playbooks" img="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Playbooks-docs-inline-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=46eb183ad0e6ba349d90d28a4f3f38a7" width="2820" height="1556" data-path="images/Playbooks-docs-inline-docs.png">
    Create agentic, goal based conversations\
    with tool calling.
  </Card>

  <Card title="Workflows" iconType="solid" href="/docs/documentation/build/workflows" img="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Workflow-docs-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e62f511747b7ed44cbe4ba2572536a59" width="2820" height="1518" data-path="images/Workflow-docs-2.png">
    Handle complex, multi-step processes - with or without AI.
  </Card>

  <Card title="Knowledge base" iconType="solid" href="/docs/documentation/build/importing-data-sources" img="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Knowledge-base-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=b49674e006c1a8a6a5d001da0f999e96" width="2820" height="1500" data-path="images/Knowledge-base-docs.png">
    Add knowledge to your agent & connect to tools like Zendesk & Shopify.
  </Card>
</CardGroup>
