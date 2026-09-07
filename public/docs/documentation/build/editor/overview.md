> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# The agent instructions editor

> Add headings, lists, and callouts, reorder blocks by dragging, and reference your tools directly while writing agent and playbook instructions.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-overview-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=742a7fc4bab2453edc017a8a8bad2cd3" alt="Editor Overview Docs" width="2000" height="1224" data-path="images/Editor-overview-docs.png" />

The editor is where you write everything your agent reads: the [global prompt](/docs/documentation/build/global-prompt), your [agent instructions](/docs/documentation/build/instructions), and the instructions inside every [playbook](/docs/documentation/build/playbooks).

It works like a document editor. You can add headings, lists, and callouts, drag lines around to reorder them, and format text as you type. Structure is not decoration - well-organized instructions are easier for you to maintain, and easier for the model to follow.

## Three things worth knowing first

* **Type <kbd>/</kbd> to insert anything.** One menu covers headings, lists, callouts, steps, and references to your tools.
* **You can point at your tools instead of naming them.** A [reference](/docs/documentation/build/editor/references) links to the real tool, playbook, or workflow, so renaming it never breaks your instructions.
* **Markdown works as you type.** Typing `## ` makes a heading, `**text**` makes it bold. See [markdown shortcuts](/docs/documentation/build/editor/markdown).

## Adding blocks with the insert menu

Type <kbd>/</kbd> on any empty line to open the insert menu. Keep typing to filter, use the arrow keys to move through the results, and press <kbd>Enter</kbd> to insert. Press <kbd>Esc</kbd> to close the menu and go back to typing.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-insert-menu-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=c162354ca99ec419a9c92fb45b05f316" alt="Editor Insert Menu Docs" width="2000" height="1224" data-path="images/Editor-insert-menu-docs.png" />

The menu has two sections.

**Formatting** turns the current line into a block:

| Option            | Markdown shortcut |
| ----------------- | ----------------- |
| **Heading 1**     | `#`               |
| **Heading 2**     | `##`              |
| **Heading 3**     | `###`             |
| **Bulleted list** | `-`               |
| **Numbered list** | `1.`              |
| **Callout**       | `>`               |
| **Steps**         | `>>`              |

**Reference** inserts a link to something your agent can use - a tool, system tool, playbook, or workflow. Categories with nothing in them yet appear greyed out. See [references](/docs/documentation/build/editor/references) for the full detail.

<Tip>
  The <kbd>/</kbd> menu only opens at the start of a line or after a space, so you can still type things like `and/or` without interrupting yourself.
</Tip>

## Changing formatting on selected text

Select any text and a small toolbar appears above it.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-floating-toolbar-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=3c31d1aeb531492eff58193aeb6c2414" alt="Editor Floating Toolbar Docs" width="2000" height="1224" data-path="images/Editor-floating-toolbar-docs.png" />

On the left is the **Turn into** dropdown, showing what the current line is. Open it to convert the line to something else - a heading, a list, a callout, or back to plain text. If you have several lines selected, all of them convert together.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-turn-into-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=23e5bf29b7b783d216cc6a9a57ebee51" alt="Editor Turn Into Docs" width="2000" height="1224" data-path="images/Editor-turn-into-docs.png" />

To the right are **Bold**, **Italic**, **Underline**, and **Strikethrough**. Press <kbd>Esc</kbd> to dismiss the toolbar.

Paste a URL into the editor and it becomes a link. Click any link to edit its address or the text it shows, or to remove it.

## Reordering and selecting blocks

Hover over any line and a drag handle appears in the left margin. Drag it to move the line, and a dark line shows where it will land. Whole lists move as one block. Dragging near the top or bottom of the editor scrolls the page for you, and pressing <kbd>Esc</kbd> mid-drag cancels the move.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-drag-handle-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=2b6c611ec0c9075c09fe9c5ee3e02ed3" alt="Editor Drag Handle Docs" width="2000" height="1224" data-path="images/Editor-drag-handle-docs.png" />

Clicking the handle instead of dragging selects the line. You can also click and drag across empty space in the editor to select several lines at once, the same way you would select files on your desktop.

Once one or more lines are selected, [keyboard shortcuts](/docs/documentation/build/editor/keyboard-shortcuts) let you duplicate, delete, or extend the selection.

## Breaking instructions into steps

When a playbook needs to happen in a set order, a **Steps** block makes that order explicit. Type `>>` followed by a space, or pick **Steps** from the insert menu.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-steps-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=0f9ec47daf35caa4790c7408bd69ced6" alt="Editor Steps Docs" width="2000" height="1224" data-path="images/Editor-steps-docs.png" />

Each step gets a number and a title, with room for as much detail as you need underneath. Press <kbd>Enter</kbd> in the title to move down into the body. To add another step, click **+** below the last one. Steps renumber themselves as you add, remove, or drag them around.

Steps hold plain text only, so headings and lists are not available inside one.

## Navigating long instructions

Once your instructions have headings, an outline appears down the right-hand side. Hover it to see your headings by name, and click any one to jump to it.

<img src="https://mintcdn.com/voiceflow-009a8802/gYAKoLGZSGa5zsHO/images/Editor-table-of-contents-docs.png?fit=max&auto=format&n=gYAKoLGZSGa5zsHO&q=85&s=ba86db071a3409da37db1130a17ea913" alt="Editor Table Of Contents Docs" width="2000" height="1224" data-path="images/Editor-table-of-contents-docs.png" />

Only Heading 1, Heading 2, and Heading 3 appear in the outline.

## Next steps

<CardGroup cols={2}>
  <Card title="References" iconType="solid" href="/docs/documentation/build/editor/references">
    Point at your tools, playbooks, and workflows by name.
  </Card>

  <Card title="Markdown shortcuts" iconType="solid" href="/docs/documentation/build/editor/markdown">
    Format as you type, and paste markdown from anywhere.
  </Card>

  <Card title="Keyboard shortcuts" iconType="solid" href="/docs/documentation/build/editor/keyboard-shortcuts">
    Every shortcut for formatting, blocks, and menus.
  </Card>

  <Card title="Variables" iconType="solid" href="/docs/documentation/build/data/variables">
    Store and reuse information across a conversation.
  </Card>
</CardGroup>
