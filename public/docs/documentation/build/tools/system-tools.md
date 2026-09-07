> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# System tools

> Built-in tools your agent can use automatically.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/System-tools-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=c1af225719e3138ebc72301f39294c82" alt="System Tools Docs" width="2820" height="1556" data-path="images/System-tools-docs.png" />

System tools are native capabilities built directly into RelVoca that your agent can use without additional setup. Unlike other tools, system tools appear as toggles in the [Agent](/docs/documentation/build/global-prompt) tab and inside [Playbooks](/docs/documentation/build/playbooks). When enabled, your agent decides when to use them based on the conversation context and your instructions.

## Enabling system tools

Open the **Agent** tab or a **Playbook** to see the **System tools** section in the right editor. Toggle a tool on to make it available, or off to disable it. When a system tool is enabled, your agent will automatically use it when appropriate.

## Available system tools

### Knowledge base

The knowledge base tool lets your agent search your [knowledge base](/docs/documentation/build/importing-data-sources) to answer questions. When enabled, your agent will automatically query your knowledge base when it needs information it doesn't already have. This system tool has advances configuration that you can learn about [here](/docs/documentation/build/querying-the-knowledge-base).

### Buttons

The buttons tool allows your agent to generate clickable button options in its responses. Use buttons to offer users quick choices without requiring them to type. When a user clicks a button, it's treated as if they typed the button's label.

### Call forward

The call forward tool forward the active call to a phone number or SIP address. Available in **voice** projects only. Configure a destination phone number (with optional extension) or a SIP endpoint. When enabled, your agent can transfer the call to a live agent or external line when the conversation requires human support.

### Cards

The card tool enables your agent to display rich cards with titles, descriptions, images, and action buttons. Cards are useful for presenting structured information like products, articles, or options.

### Carousels

The carousel tool lets your agent show multiple cards in a horizontally scrollable carousel. Use carousels when you need to present several options or items at once.

### Web search

The web search tool gives your agent the ability to search the web for current information. This is useful when users ask questions that require up-to-date information beyond what's in your knowledge base.

### Skip turn

The skip turn tool lets the agent stay quiet and wait for the user instead of replying. Use it when the user asks for a moment - things like "hold on," "give me a sec," "let me think," or "one moment" - so the agent doesn't talk over them or fill the pause with something unnecessary.

### End

The end tool allows your agent to end the conversation when appropriate. When enabled, your agent can determine when a conversation has reached a natural conclusion and close the session.

## Getting the most out of system tools

System tools come with opinionated descriptions that cover both what they do and when the agent should use them - in most cases you won't need to touch them. You can shape usage further in two places:

* **Edit the Trigger** on a system tool (at the agent or playbook level) to tighten up when it should or shouldn't fire.
* **Add instructions** in your global prompt or playbook for cross-cutting rules that go beyond a single tool.
* **[Reference the tool](/docs/documentation/build/editor/references) by name** in those instructions by typing `/`, so a rule about ordering points at the exact tool you mean.

A few examples of instruction-level rules:

* "Always offer buttons when presenting more than two options"
* "Search the knowledge base before falling back to web search"
* "Only forward calls if the customer explicitly asks to speak to someone"
* "Use cards when showing product details, carousels when showing multiple products"

### Local overrides

System tools enabled at the **agent level** are available across all playbooks by default. Inside a playbook, you can customize a tool's settings and trigger to fit that specific context - but you can't disable a tool that's already enabled at the agent level.

You can, however, **enable** a tool inside a playbook that's turned off at the agent level. For example, you might keep web search off globally but enable it in a single research-focused playbook.
