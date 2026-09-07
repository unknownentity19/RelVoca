> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Initialization workflow

> Run a workflow before your agent takes control of the conversation.

The initialization workflow is the first thing that runs when a conversation starts - before your agent sees any messages. It gives you a controlled, deterministic space to handle setup: load user data, authenticate, set variables, or send a static greeting. Once the workflow completes, control passes to your agent and the conversation continues normally.

If you don't set an initialization workflow, conversations begin directly with your agent.

## Setting an initialization workflow

Open the **Framework** tab in the sidebar. Click the **Add workflow** on the initialization node and select an existing workflow, or click **create** to build a new one.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Init-workflow.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=7d11771a82784bd764809a1f0a77553f" alt="Init Workflow" width="1286" height="814" data-path="images/Init-workflow.png" />

Once set, this workflow runs automatically at the start of every conversation. When the workflow ends - or when any step has an empty output port - the conversation navigates directly to your agent. You don't need to explicitly route to the agent; any unconnected port does this automatically.

## Common patterns

### Loading context

The most common use case. Make API calls at the start of a conversation to fetch user data - account info, order history, subscription tier etc. - and store it in variables. Your agent and playbooks have the context they need from the very first turn.

**Predictive conversations** - Run these calls asynchronously to load data in the background while the conversation is already happening. Fetch a customer's recent orders during authentication, pull account details while the agent greets the user. By the time the agent needs the data, it's already there - no loading state, no awkward pause. Your agent can open with "I see you have an order arriving later today — is that what you're calling about?" instead of asking the customer to state their intention.

### Static start message

If you want your agent to open with a specific greeting rather than generating one, add a text response step to your initialization workflow. Turn on **Wait for user input** after the message so the workflow pauses for the user to respond before handing off to the agent - otherwise the agent will immediately start talking over your greeting.

### Authentication

Gate the conversation behind identity verification. Check a user token, validate credentials via API, or collect an account number before your agent has access to any sensitive tools or data.

### Onboarding

Collect required information upfront - name, language preference, reason for contact - using a structured flow before the agent takes over. This is useful when you need specific variables set before any playbook can run effectively.
