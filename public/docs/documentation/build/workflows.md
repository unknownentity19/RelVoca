> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Workflows

> Deterministic control with AI reasoning baked in wherever you need it.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Workflow-docs-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e62f511747b7ed44cbe4ba2572536a59" alt="Workflow Docs 2" width="2820" height="1518" data-path="images/Workflow-docs-2.png" />

Workflows let you build structured, step-by-step logic for your agent. Unlike playbooks, which let the model reason freely toward a goal, workflows follow a defined path - every step executes in order, exactly as you designed it.

<Tip>
  Workflows aren't purely scripted. You can embed [playbooks](/docs/documentation/build/steps/playbook), [operators](/docs/documentation/build/steps/operator), [set steps](/docs/documentation/build/steps/set), and [crews](/docs/documentation/build/steps/crew) anywhere in the flow, giving you deterministic control with AI reasoning baked in wherever you need it.
</Tip>

## Creating workflows

<Steps>
  <Step title="Add or create a workflow" titleSize="h3">
    From the **Agent** tab, click **+** in the right editor. Select an existing workflow or create a new one.

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Adding-workflows-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=32ecbc15165039f4f0ed1647e2fa985a" alt="Adding Workflows Docs" width="1294" height="542" data-path="images/Adding-workflows-docs.png" />

    <Info>
      You can also create workflows from within a workflow using the [workflow step](/docs/documentation/build/steps/workflow), or from the workflow CMS tab.
    </Info>
  </Step>

  <Step title="Name your workflow and add a trigger" titleSize="h3">
    Give your workflow a clear name and trigger. The trigger should cover both what the workflow does and when the agent should route into it - this is what the top-level agent and other playbooks read when deciding whether to call it. <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Create-workflow-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=27078f4727de094ccea199bd928d0683" alt="Create Workflow Docs 1" width="1294" height="948" data-path="images/Create-workflow-docs-1.png" />
  </Step>

  <Step title="Design your workflow" titleSize="h3">
    On creation, you'll be taken to the canvas to start building. Workflows added from the agent tab are automatically attached to your agent. Click **×** in the top right to return to the agent tab at any time.
  </Step>

  <Step title="Run your workflow" titleSize="h3">
    Press 'Run' in the top right, or use the shortcut  <kbd>Shift + R</kbd>  then initiate the workflow. When initiated from on the canvas, your workflow will run in isolation. When initiated from the agent tab, workflow can be called and will run with all previous state.
  </Step>

  <Step title="Iterate" titleSize="h3">
    When running a workflow in RelVoca, you can see the full logs in real-time, along with canvas follow along. This makes it super easy to de-bug and improve your workflows quickly.
  </Step>
</Steps>

## Steps

Steps are the building blocks of workflows, organized into four categories:

| Category     | What it does                                                                                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentic**  | Embed AI reasoning mid-flow using [playbook](/docs/documentation/build/steps/playbook), [crew](/docs/documentation/build/steps/crew), and [operator](/docs/documentation/build/steps/operator) steps                                                                                    |
| **Scripted** | Send [messages](/docs/documentation/build/steps/message), [cards](/docs/documentation/build/steps/card), [carousels](/docs/documentation/build/steps/carousel), [buttons](/docs/documentation/build/steps/buttons), and capture input with [listen](/docs/documentation/build/steps/listen) steps |
| **Tools**    | Connect to external services via [integrations](/docs/documentation/build/steps/integration), [APIs](/docs/documentation/build/steps/api), [MCP servers](/docs/documentation/build/steps/mcp), and [functions](/docs/documentation/build/steps/function)                                     |
| **Logic**    | Control execution with [set](/docs/documentation/build/steps/set), [conditions](/docs/documentation/build/steps/condition), [code](/docs/documentation/build/steps/code), [workflow](/docs/documentation/build/steps/workflow), [end](/docs/documentation/build/steps/end) and handoff steps      |

## Actions

Actions let you keep your canvas clean without losing any functionality.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Actions-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=49d55f302b4752e8816ef645aca6edd3" alt="Actions Docs" width="1294" height="728" data-path="images/Actions-docs.png" />

To add an action, click any port and then click on empty canvas space to expose the step menu. This is also the fastest way to add steps without dragging from the sidebar.

## Nesting workflows

Workflows can call other workflows using the [workflow step](/docs/documentation/build/steps/workflow). This lets you break complex processes into smaller, reusable pieces - build once, use across multiple workflows. For example, an identity verification workflow can be called from your returns flow, your account management flow, and your payment flow without duplicating the logic in each one.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Nesting-workflows-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=abcb96d8d15ff85bd1e8d91cca3a9392" alt="Nesting Workflows Docs" width="1294" height="728" data-path="images/Nesting-workflows-docs.png" />

<Info>
  Workflows only run if they're added to the agent, or referenced directly inside a workflow. If a workflow exists in your project but isn't connected to either, the agent will never use it.
</Info>

## Entry conditions and required variables

<Info>
  Entry conditions and required variables can only be applied when a workflow is routed to directly by the [agent](/docs/documentation/build/global-prompt). They're not available when the workflow is called via a [workflow step](/docs/documentation/build/steps/workflow) inside another workflow.
</Info>

Entry conditions and required variables control when the agent can route into a workflow. Until they're met, the workflow stays unavailable, so the agent won't hand off to it no matter what the customer says. This gives you precise, rule-based control over when each workflow becomes reachable.

### Entry conditions

Entry conditions are deterministic checks that must evaluate to true before the workflow can be routed to. If the checks don't pass, the workflow stays unavailable for routing. For example, you could gate a support ticket escalation workflow so only users whose `{account_type}` [variable](/docs/documentation/build/data/variables) is set to `enterprise` are able to escalate tickets to their account manager.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-18.17.52@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=c87136344c23de9e4998906646644ff1" alt="Clean Shot 2026 06 24 At 18 17 52@2x" width="2392" height="1110" data-path="images/CleanShot-2026-06-24-at-18.17.52@2x.png" />
</Frame>

### Required variables

You can also require that specific variables have a value before the agent can route in. Until every required variable is filled, the workflow stays unavailable. For example, require `{order_id}` before the agent can hand off to a returns workflow, so it never starts without the information it needs.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-18.21.16@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=e7d86a6874ec8703f0c9375a6cfe3e72" alt="Clean Shot 2026 06 24 At 18 21 16@2x" width="2496" height="1526" data-path="images/CleanShot-2026-06-24-at-18.21.16@2x.png" />
</Frame>
