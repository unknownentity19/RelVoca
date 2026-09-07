> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Playbooks

> Goal-based AI that navigates conversations toward an outcome.

<img src="https://mintcdn.com/voiceflow-009a8802/NgQm2d4PcDuGmYWV/images/Playbooks-docs.png?fit=max&auto=format&n=NgQm2d4PcDuGmYWV&q=85&s=12814b9faa2d15ae5c54d7c1d9e20eaa" alt="A playbook editor, showing the trigger, step-by-step instructions, and the tools the playbook can call" width="2820" height="1769" data-path="images/Playbooks-docs.png" />

Playbooks are goal-based. You define an outcome - resolve a support ticket, qualify a lead, process a return - and the agent navigates the conversation to get there.

What makes playbooks powerful is the tools they can use along the way. While the agent is talking to your customer, it can be looking up their order in Shopify, creating a ticket in Zendesk, updating a deal in Salesforce, or calling your own internal APIs - all in real time.

Unlike [workflows](/docs/documentation/build/workflows), which follow a fixed sequence of steps, playbooks let the agent decide how to reach the goal based on context. You write the instructions - the agent handles the conversation.

Playbooks can be triggered directly by your [agent](/docs/documentation/build/global-prompt), from within a workflow using the [playbook step](/docs/documentation/build/steps/playbook), or chained together using a [crew step](/docs/documentation/build/steps/crew).

## Tools

Playbooks can use tools to take action during a conversation:

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Integrations-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=5129a854299eb8cc99ca4e1f0f315694" alt="Integrations Docs" width="1294" height="726" data-path="images/Integrations-docs.png" />

* [**Integrations**](/docs/documentation/build/tools/overview) - pre-built connectors to tools your team already uses, like Zendesk, Salesforce, Shopify, HubSpot, Gmail, and more.
* [**API tool**](/docs/documentation/build/tools/api-tool) - connect to any REST API with a custom request. Use this for internal systems or any service without a pre-built integration.
* [**MCP tool**](/docs/documentation/build/tools/mcp-tool) - connect to any MCP server and expose its tools directly to the playbook.
* [**Function tool**](/docs/documentation/build/tools/function-tool) - run custom JavaScript logic mid-conversation, useful for data transformation, calculations, or lightweight processing without an external call.
* [**System tools**](/docs/documentation/build/tools/system-tools) - call the knowledge base, forward calls, end the conversation, display buttons, cards or carousels, search the web.

<Tip>
  Tools work best when their names and triggers give the model enough signal to know what they do and when to use them - the same principle as naming/describing the playbook itself.

  * **Name** - what the tool is. Short and literal. "Lookup Order", not "Order tool".
  * **Trigger** - what the tool does *and* when the agent should use it. Include both.
  * **Playbook instructions** - any additional context: ordering, error handling, or how the tool fits into the larger conversation.

  Put the "when" in the tool's description, not just in your instructions. Once a playbook is active, agent-level instructions are no longer in context - only the playbook's own instructions are. A tool's trigger that covers both what and when travels with the tool wherever it's used.
</Tip>

## Creating playbooks

<Steps>
  <Step title="Add or create a playbook" titleSize="h3">
    From the **Agent** tab, click **+** in the right editor. Select an existing playbook or create a new one.

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Adding-playbooks-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=33e365ecee3ffc468bdcadf61250e0d6" alt="Adding Playbooks Docs" width="1294" height="542" data-path="images/Adding-playbooks-docs.png" />

    <Info>
      You can also create playbooks from within a workflow using the [playbook step](/docs/documentation/build/steps/playbook), or from the playbook CMS tab.
    </Info>
  </Step>

  <Step title="Name your playbook and add a trigger" titleSize="h3">
    Give your playbook a clear name and trigger. The trigger should cover both what the playbook does and when the agent should route into it - this is what other playbooks, workflows, and the top-level agent read when deciding whether to call it. <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Create-playbook-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=e406570a4e50fb967802f04a79f05011" alt="Create Playbook Docs 1" width="1294" height="948" data-path="images/Create-playbook-docs-1.png" />
  </Step>

  <Step title="Write playbook instructions" titleSize="h3">
    You'll be taken to the playbook editor to write or generate instructions. Playbooks added from the agent tab are automatically attached to your agent. Click **×** in the top right (or 'esc' on keyboard) to return to the agent tab at any time.
  </Step>

  <Step title="Add tools" titleSize="h3">
    Use the **Tools** panel on the right to add any [integrations](/docs/documentation/build/tools/overview), [APIs](/docs/documentation/build/tools/api-tool), [MCPs](/docs/documentation/build/tools/mcp-tool), [functions](/docs/documentation/build/tools/function-tool) or [system tools](/docs/documentation/build/tools/system-tools) your playbook needs to achieve its goal.
  </Step>

  <Step title="Run your playbook" titleSize="h3">
    From the agent tab, press 'Run' in the top right, or use the shortcut  <kbd>Shift + R</kbd>  then initiate the playbook by typing or speaking a message.
  </Step>

  <Step title="Iterate" titleSize="h3">
    If your playbook isn't performing the way you expect, start by improving the instructions - they're almost always the culprit. From there, make sure your tools have clear names and triggers so the playbook knows when and how to use them. Changing the model should be a last resort, but can prove helpful given the goal at hand.
  </Step>
</Steps>

## Writing good instructions

Instructions are the core of every playbook. They tell the agent what to do, and when to use its tools. Write in plain language.

The [editor](/docs/documentation/build/editor/overview) gives you headings, lists, callouts, and numbered steps to organize longer instructions, along with markdown shortcuts if you prefer to type them. You can also [reference](/docs/documentation/build/editor/references) a tool, playbook, or workflow directly in a sentence rather than typing out its name.

The quality of your instructions directly affects the quality of your agent. Vague instructions produce inconsistent behavior. Specific instructions produce reliable, predictable agents.

**Instead of:**

```text theme={null}
Help customers check their order status, use the order lookup tool.
```

**Write:**

```text theme={null}
# Goal
Give {customer_name} a clear, accurate status update on
their order. Handle common order situations directly where
possible, and set clear expectations when you can't.

# Looking up an order
Ask for their order number or the email used at checkout.
Use the Order Lookup tool to retrieve the order before
saying anything about its status.

If the lookup returns multiple orders, list them with the
item name and order date and ask which one they're referring
to.

# Delivering the status
Share the item name, current status, and estimated delivery
date. Be direct — don't pad the response.

# Handling common situations

**Order is delayed:** Acknowledge it without over-apologizing.
Give the revised ETA from {delivery_eta} if available. If
no ETA is in the system, say so and offer to follow up when
it updates.

**Order shows delivered but customer didn't receive it:**
Confirm the delivery address on file. Ask if they've checked
with neighbors or in a safe spot. If it's still missing,
let them know this needs to go to the support team and
collect the details before handing off.

**Order was cancelled:** Explain why if the system shows
a reason. Confirm whether a refund was issued and the
expected timeline.

**Partial shipment:** Let them know which items have shipped
and which are still pending. Give separate ETAs if available.

**Wrong item received:** Apologize once, confirm what they
ordered vs what arrived, and let them know the support team
will sort it — collect the details before handing off.

# If the order can't be found
Double-check the order number or email. If still nothing,
let the customer know and offer to connect them with the
support team.
```

<Tip>
  You can edit instructions manually or click the AI button to open the prompt editor, which helps you generate and refine your playbook from scratch.

  When editing manually, type <kbd>/</kbd> to add a heading, list, or [reference to a tool](/docs/documentation/build/editor/references), and <kbd>\{</kbd> to insert a [variable](/docs/documentation/build/data/variables).
</Tip>

## Model settings

Click **Model** in the top right corner of the playbook editor to configure:

* **AI model** - which model powers this playbook (eg: Claude Sonnet 4.6)
* **Temperature** - lower for consistency, higher for variation
* **Max tokens** - maximum response length

By default, playbooks inherit the model settings from your agent. Override them here if a specific playbook needs different behavior - for example, a lower temperature for a compliance-sensitive flow, or a more capable model for complex reasoning tasks.

## Entry conditions and required variables

<Info>
  Entry conditions and required variables can only be applied when a playbook is routed to directly by the [agent](/docs/documentation/build/global-prompt). They're not available when the playbook is called via a [playbook step](/docs/documentation/build/steps/playbook) inside a [workflow](/docs/documentation/build/workflows).
</Info>

Entry conditions and required variables control when the [agent](/docs/documentation/build/global-prompt) can route into a playbook. Until they're met, the playbook stays unavailable, so the agent won't hand off to it no matter what the customer says. This gives you precise, rule-based control over when each playbook becomes reachable.

### Entry conditions

Entry conditions are deterministic checks that must evaluate to true before the playbook can be routed to. If the checks don't pass, the playbook stays unavailable for routing. For example, you might only make a checkout playbook reachable once the`{cart_total}` [variable](/docs/documentation/build/data/variables) is greater than zero, or gate an account management playbook behind `{is_authenticated}` being true.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-08.58.30@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=d9542c6aac9d7253d1aad4ec48d6630a" alt="Entry conditions" width="2490" height="1100" data-path="images/CleanShot-2026-06-24-at-08.58.30@2x.png" />
</Frame>

### Required variables

You can also require that specific [variables](/docs/documentation/build/data/variables) have a value before the agent can route in. Until every required variable is filled, the playbook stays unavailable. For example, you could require the `{account_id}` variable to be set before the agent can hand off to an account management playbook, so it never starts without the information it needs.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-09.10.52@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=2712e3f2d690db5024b6639fc6bc1b8b" alt="Required variables" width="1736" height="1164" data-path="images/CleanShot-2026-06-24-at-09.10.52@2x.png" />
</Frame>

## Exit conditions

<Info>
  Exit conditions only apply when a playbook is used via a [playbook step](/docs/documentation/build/steps/playbook) inside a [workflow](/docs/documentation/build/workflows). When triggered directly by the agent, exit conditions are ignored as routing is handled by the agent.
</Info>

Playbooks can have **exit conditions** - the criteria that must be met before the agent considers the playbook complete.

You can add **required variables** to any exit condition. These variables must have a value before the condition can trigger - even if the conversation seems resolved, the playbook won't exit until they're filled.

For example, a Lead Capture playbook with an exit condition of "User is qualified" might require `{company_size}`, `{use_case}`, and `{email}`. The agent will keep the conversation going until all three are collected, then exit.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Required-vars-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=84a4b92ba3618a8e27ed4b8424abfbc9" alt="Required Vars Docs" width="2192" height="1216" data-path="images/Required-vars-docs.png" />
