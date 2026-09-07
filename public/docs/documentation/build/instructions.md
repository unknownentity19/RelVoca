> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Instructions

> Defines how the agent routes requests and decides which tools to use

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Agent-instructions-docs-1.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=b3f126704cc0f6bde7149796e53fc06b" alt="The instructions editor, showing triage and routing rules that hand the conversation to the right playbook" width="2820" height="1769" data-path="images/Agent-instructions-docs-1.png" />

## What are agent instructions?

Instructions are the decision-making layer of your agent. Where the global prompt defines *how* your agent behaves, instructions define *when* it does things.

When a user message comes in, the agent reads its instructions and picks the most appropriate way to handle it. Instructions are written in plain language, not code.

You write them in the [editor](/docs/documentation/build/editor/overview), which supports headings, lists, and markdown shortcuts, and lets you [reference](/docs/documentation/build/editor/references) your tools, playbooks, and workflows by name.

| Layer             | What it controls              | When it applies                    |
| ----------------- | ----------------------------- | ---------------------------------- |
| **Global prompt** | Personality, tone, guardrails | Every agentic turn, always         |
| **Instructions**  | Routing, tool selection       | When deciding what to do next      |
| **Playbook**      | Goal-specific behavior        | When a specific playbook is active |

## Writing agent instructions

Instructions work best when they're clear about which tool handles which type of request. Think of it like a brief for a team - each member needs to know what they own.

Every playbook, workflow, and tool has a name and a trigger. You can layer supporting context on top in the agent instructions, or playbook instructions.

* **Name** - what it is. Short and literal.
* **Trigger** - what it does *and* when the AI agent should use it. This is the primary signal the agent reads when deciding whether to call a tool or route into a playbook.
* **Instructions** - any additional context, routing reminders, phrasing rules, or ordering that apply on top of the trigger.

|                  | Good                                                                                                                                               | Bad                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Name**         | Order Status                                                                                                                                       | Handle order related things |
| **Trigger**      | Looks up the status of an existing order by order ID or email. Use when the customer asks about an existing order, a delivery, or tracking info.   | Helps customers with orders |
| **Instructions** | Route to Order Status for any order-related question. If the customer then wants to return or exchange the item, hand off to the Returns workflow. | N/A                         |

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/LLM-description-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=71d6fa8ee621df6abbef6d52a1abd1d4" alt="LLM Description Docs 1" width="1886" height="796" data-path="images/LLM-description-docs-1.png" />

We recommend putting both the *what* and the *when* in the trigger. Agent instructions are only in context when the agent is routing at the top level - once a playbook is active, only the global prompt and that playbook's own instructions are visible. If a playbook needs to jump to another playbook or decide which tool to call, it reads the names and descriptions. Any "when to use this" guidance that lives only in agent instructions won't reach those decisions. The instructions field is still useful for routing reinforcement and supporting context; it just shouldn't be the only place the "when" lives:

```text Simple agent insturctions example theme={null}
# Routing
Route to the Order Status playbook if the customer is asking
about an existing order, delivery, or tracking information.

Route to the Returns workflow if the customer wants to return,
exchange, or get a refund on a product.

Route to the Product Info playbook if the customer is asking
about product details, availability, or compatibility.

If the customer's request doesn't fit any tool, let them
know what you can help with and ask them to rephrase, or use the knowledge
base to provide accurate information.
```

### Adding a start message

If you want to define an agentic start message in your agent, you can add it to agent instructions.

```text theme={null}
# Starting Message
Greet the user and offer assitance, use buttons to show the user
quick options of what they can do.

# Tools
```

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Starting-message-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e591d7271504ce309917c16450d2caea" alt="Starting Message Docs" width="1294" height="726" data-path="images/Starting-message-docs.png" />

The above instruction would result in something like the chat above. The agent has followed the instructions and greeted the user, while also using the buttons tool to deliver dynamic options based on tools available.

If you want to deliver a very specific start message, you can instruct your agent to do so, or use the [initialization workflow](/docs/documentation/build/framework/initialization-workflow) to design something truly deterministic with a [message step](/docs/documentation/build/steps/message).

## Testing instructions

<Steps>
  <Step title="Run your agent">
    From the agent tab, press 'Run' in the top right, or use the shortcut  <kbd>Shift + R</kbd>
  </Step>

  <Step title="Ask your agent a question">
    Type or talk to your agent from the message input
  </Step>

  <Step title="See if your agent routed correctly">
    Check logs the logs section and state viewer to see if your agent is routing correctly

    <Frame>
      <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot2026-03-11at14.18.36@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=b665a37f192c519b55f50ba2d2a45623" alt="Clean Shot2026 03 11at14 18 36@2x" width="3454" height="1984" data-path="images/CleanShot2026-03-11at14.18.36@2x.png" />
    </Frame>
  </Step>

  <Step title="Iterate">
    If your agent doesn't route  make sure you're following best practices for tool name and trigger. From there, try improving the instructions for that tool.
  </Step>
</Steps>
