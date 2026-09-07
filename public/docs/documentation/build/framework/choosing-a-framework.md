> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Choosing a framework

> Choose the agent framework that's best for your use case.

## Agentic vs. Conversation flow

When you create a project, you choose a framework. This shapes how your agent handles conversations and the tools you use to build it.

### Agentic (recommended)

The agent uses playbooks, workflows, tools, and reasoning to navigate conversations autonomously. It decides what to do next based on the user's input, your instructions, and the conversation context.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Agentic-framework-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=99056413e6c1badb0bacf9838ff8c80f" alt="Agentic Framework Docs" width="2108" height="1026" data-path="images/Agentic-framework-docs.png" />

You can still build fully deterministic workflows in the agentic framework - the difference is that routing to and from those workflows is handled by an intelligent agent that you control through instructions, not by manual flow logic. This gives you the precision of workflows where you need it, with the flexibility of AI routing everywhere else.

### Conversation flow

You design the conversation path in the visual builder, with or without AI. The agent follows it step by step with no autonomous decision-making, unless defined by you. Every branch, every transition, every fallback is explicitly defined by you.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Conversational-flow-framework-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=a4ba60e8afa3dee18d0152879d1d4a04" alt="Conversational Flow Framework Docs" width="2108" height="684" data-path="images/Conversational-flow-framework-docs.png" />

This works for simple, predictable use cases. But as complexity grows, manual routing becomes a liability. Adding a new playbook means rewiring exit conditions across multiple flows. Edge cases multiply. Touching one path can quietly break another. Most teams that start with conversation flow for its upfront simplicity eventually hit a ceiling - the maintenance cost overtakes the control it was supposed to provide.

<Tip>
  If you're unsure, start with the **Agentic** framework. You get the same deterministic control where you need it, plus AI-powered routing that scales with your agent's complexity. You can change your framework at any time from the framework tab.
</Tip>
