> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Referencing tools in prompts

> Insert tools, system tools, playbooks, and workflows directly into your instructions so the agent knows exactly which one to use and when.

A reference is a link to something your agent can use, placed directly in a sentence of your instructions. Instead of writing the name of a tool and hoping the agent matches it up, you point at the real thing.

References remove a whole category of small errors. A typo in a tool name, a tool that was renamed last week, two playbooks with similar names - none of those trip up an agent reading a reference, because the reference points at the resource itself rather than at whatever you typed.

You can reference tools, system tools, playbooks, and workflows anywhere the [editor](/docs/documentation/build/editor/overview) appears: the [global prompt](/docs/documentation/build/global-prompt), your [agent instructions](/docs/documentation/build/instructions), and inside any [playbook](/docs/documentation/build/playbooks).

## Adding a reference

<Steps>
  <Step title="Open the insert menu">
    Type <kbd>/</kbd> where you want the reference to appear. The menu opens with a **Reference** section listing **Tools**, **System tools**, **Playbooks**, and **Workflows**.

    <img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-reference-menu-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=68c7c045a617760d3a63486309b20901" alt="Editor Reference Menu Docs" width="2000" height="1224" data-path="images/Editor-reference-menu-docs.png" />

    A category with nothing in it appears greyed out and can't be selected.
  </Step>

  <Step title="Pick a category">
    Select the category you want. The menu opens a searchable list of everything available in that category.

    <img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-reference-tools-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=0b0f2ff359ebbeeb77e232784721d4b3" alt="Editor Reference Tools Docs" width="2000" height="1224" data-path="images/Editor-reference-tools-docs.png" />
  </Step>

  <Step title="Search and select">
    Start typing to narrow the list, then press <kbd>Enter</kbd> or click to insert. The reference appears inline as a small chip showing the resource name and its icon.
  </Step>
</Steps>

You can also filter from the top level. Typing part of a category name after the slash, such as `/work`, narrows the menu down to **Workflows**, and pressing <kbd>Enter</kbd> opens it.

<Tip>
  Adding a reference attaches that resource to your agent automatically, so there is no separate step to make it available. Playbooks and workflows are attached at the agent level, meaning they become reachable from anywhere in the agent.
</Tip>

## What you can reference

| Category         | What it includes                                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tools**        | [API tools](/docs/documentation/build/tools/api-tool), [Function tools](/docs/documentation/build/tools/function-tool), [MCP tools](/docs/documentation/build/tools/mcp-tool), and [integrations](/docs/documentation/build/tools/overview) such as Zendesk, Salesforce, Shopify, and HubSpot |
| **System tools** | RelVoca's built-in capabilities, like the knowledge base and web search                                                                                                                                                                                                 |
| **Playbooks**    | Any [playbook](/docs/documentation/build/playbooks) in this agent                                                                                                                                                                                                              |
| **Workflows**    | Any [workflow](/docs/documentation/build/workflows) in this agent                                                                                                                                                                                                              |

Tools of every kind are grouped into one searchable list, so you don't need to remember whether something was built as an API tool or a function.

## Creating tools before you reference them

The reference menu selects from what already exists. It does not create anything.

If the tool, playbook, or workflow you want isn't in the list, create it first, then come back to your instructions and reference it. Once it exists, it appears in the menu straight away.

<CardGroup cols={2}>
  <Card title="API tool" iconType="solid" href="/docs/documentation/build/tools/api-tool">
    Connect to any REST API with a custom request.
  </Card>

  <Card title="Function tool" iconType="solid" href="/docs/documentation/build/tools/function-tool">
    Run custom JavaScript logic mid-conversation.
  </Card>

  <Card title="MCP tool" iconType="solid" href="/docs/documentation/build/tools/mcp-tool">
    Connect an MCP server and expose its tools.
  </Card>

  <Card title="Integrations" iconType="solid" href="/docs/documentation/build/tools/overview">
    Pre-built connectors for Zendesk, Salesforce, Shopify, and more.
  </Card>
</CardGroup>

Playbooks and workflows work the same way. Create them from the **Agent** tab, from a [playbook step](/docs/documentation/build/steps/playbook) or [workflow step](/docs/documentation/build/steps/workflow), or from the **Playbooks** and **Workflows** tabs in the sidebar.

<Info>
  Variables and secrets are the exception. Those can be created inline while you write, without leaving the editor.
</Info>

## Referencing system tools

System tools are built into RelVoca and need no setup. Which ones appear in the menu depends on your agent, since some are specific to chat or voice:

* **Knowledge base** - search your [knowledge base](/docs/documentation/build/importing-data-sources) for an answer
* **Buttons** - offer clickable options instead of asking the user to type
* **Cards** - show a rich card with a title, description, and image
* **Carousels** - show several cards in a scrollable row
* **Call forward** - transfer the call to a phone number or SIP address
* **Web search** - look up current information on the web
* **Skip turn** - stay quiet and wait rather than replying
* **End** - close the conversation

Referencing a system tool is useful when you want to be specific about ordering. For a full description of each tool and how to configure its trigger, see [system tools](/docs/documentation/build/tools/system-tools).

In the editor a reference shows as a chip with the tool's name. Read as plain text, the same instructions look like this:

```text Example theme={null}
# Answering product questions
Search @system:knowledgeBaseTool before anything else. If it
returns nothing useful, fall back to @system:webSearchTool and
tell the customer where the answer came from.
```

You don't need to type these. Insert them with <kbd>/</kbd> and the editor writes the right one for you.

## Editing and removing a reference

Click any reference to open its menu.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-reference-edit-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=95019a9c9f110d88e3cff9769341fbfc" alt="Editor Reference Edit Docs" width="2000" height="1224" data-path="images/Editor-reference-edit-docs.png" />

From here you can:

* **Swap it** for a different resource by picking another from the list, which replaces the chip in place
* **Open it** by hovering the row and clicking **Edit**, which takes you to that tool, playbook, or workflow
* **Remove it** by pressing <kbd>Backspace</kbd> or <kbd>Delete</kbd>

Renaming a resource elsewhere updates every reference to it automatically, so there is nothing to go back and fix.

## When a reference goes missing

If a reference turns into a **Missing reference** warning, the resource it pointed at is no longer available to this agent. That usually means it was deleted, or it was removed from the agent's tools.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-missing-reference-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=443c98fd02bd74e18cd6f70c044493cf" alt="Editor Missing Reference Docs" width="2000" height="1224" data-path="images/Editor-missing-reference-docs.png" />

The warning is safe to leave while you sort it out, and clicking it opens the same menu so you can point it somewhere else or remove it. Variables and secrets behave the same way, showing **Missing variable** or **Missing secret**.

Fix a missing reference by either recreating the resource, or selecting a replacement from the menu.

## Referencing variables and secrets

Type <kbd>\{</kbd> to insert a [variable](/docs/documentation/build/data/variables) or a secret. The menu has a tab for each, a search field, and a **Create variable** button if the one you need doesn't exist yet.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-variable-menu-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=741a4352efc6d920ce3de2401445553e" alt="Editor Variable Menu Docs" width="2000" height="1224" data-path="images/Editor-variable-menu-docs.png" />

Variables appear as coloured chips and are replaced with their live value when the agent runs, so `{customer_name}` in your instructions becomes the customer's actual name in the conversation.

<Warning>
  A few built-in variables are greyed out and can't be inserted into a prompt, including `vf_now`, `vf_time`, `last_utterance`, and `vf_memory`. Their values change on every turn, which prevents the model from reusing its cache and makes your agent slower and more expensive.
</Warning>

<Note>
  Copying instructions into a plain text document writes each reference out in its `@type:id` form, and each variable as `{name}`. Pasting that text back into the editor turns them into working references again, so you can move instructions between agents without rebuilding them by hand.
</Note>

## Next steps

<CardGroup cols={2}>
  <Card title="Markdown shortcuts" iconType="solid" href="/docs/documentation/build/editor/markdown">
    Format as you type, and paste markdown from anywhere.
  </Card>

  <Card title="Keyboard shortcuts" iconType="solid" href="/docs/documentation/build/editor/keyboard-shortcuts">
    Every shortcut for formatting, blocks, and menus.
  </Card>
</CardGroup>
