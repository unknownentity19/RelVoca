> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Global tools

> Give your agent tools that are available everywhere, across all playbooks and workflows.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Global-tools-docs-2.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=77cd3348f334d6c01f95d9d3fac04138" alt="Global Tools Docs 2" width="2820" height="1556" data-path="images/Global-tools-docs-2.png" />

Global tools are [APIs](/docs/documentation/build/tools/api-tool), [integrations](/docs/documentation/build/tools/overview), [MCPs](/docs/documentation/build/tools/mcp-tool), and [functions](/docs/documentation/build/tools/function-tool) that you add directly at the agent level. Once added, they're available at the agent level, and in any playbook throughout your AI agent - without needing to add them individually to each one.

## Adding a global tool

Open the **Agent** tab and find the **Global tools** section in the right editor. Click the **+** to open the tool configuration panel - the same experience you'd use inside a playbook. From here you can connect an API, add an MCP server, connect an integration, or define a function.

## When are global tools are available for my agent to use?

Global tools are only available when your agent is in an agentic context - that is, when the LLM is actively reasoning and deciding what to do. This includes the global agent, [playbooks](/docs/documentation/build/playbooks), and [crews](/docs/documentation/build/steps/crew).

They are not available when the user is on a scripted step inside a workflow, such as a [buttons](/docs/documentation/build/steps/buttons) or [listen](/docs/documentation/build/steps/listen) step. Because the flow is deterministic at that point, the agent isn't making free-form decisions and global tools aren't accessible. If you need a tool during a scripted sequence, add it to that workflow directly via a [tool step](/docs/documentation/build/steps/api).

A simple way to think about it: if the LLM is in control, global tools are available. If the step is scripted, they're not.

## Getting the most out of global tools

Add a tool globally when it's something your agent should be able to use anywhere. A few examples of good candidates:

* A CRM lookup that any playbook might need to identify the customer
* A ticketing API your agent uses across multiple support flows
* A shared function that formats or transforms data consistently

If a tool is only relevant in one specific playbook, it's better to add it there instead. Global tools work best when the capability is genuinely cross-cutting.

The primary lever for controlling when a global tool fires is the tool's own trigger - write it to cover both what the tool does and when the agent should use it. Because global tools are available inside every playbook, that trigger travels with the tool everywhere. Use your global prompt or instructions to layer on cross-cutting rules on top. For example:

* "Always look up the customer record before responding to account-related questions"
* "Only call the ticketing API if the user has confirmed the issue in their own words"

## Keeping it simple

If your agent is straightforward - a few tools and a clear purpose - you can consider not using playbooks or workflows at all. Simply add your tools globally and let the agent handle everything from the top level, guided by your [global prompt](/docs/documentation/build/global-prompt) and [instructions](/docs/documentation/build/instructions).

This works well for agents with a small, well-defined toolset where the LLM can reliably decide when and how to use each tool without additional structure. Adding playbooks and workflows is useful for more complex agents that need distinct behaviours or scripted sequences, but they're not a hard requirement.
