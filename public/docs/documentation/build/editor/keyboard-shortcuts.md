> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Keyboard shortcuts for the editor

> Every keyboard shortcut in the instructions editor, covering text formatting, duplicating and deleting blocks, menus, and moving around a document.

Shortcuts work anywhere the editor appears: the global prompt, agent instructions, and playbook instructions.

On Windows, use <kbd>Ctrl</kbd> anywhere <kbd>Cmd</kbd> is listed.

## Opening menus

| Shortcut       | Action                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| <kbd>/</kbd>   | Open the insert menu for blocks and [references](/docs/documentation/build/editor/references) |
| <kbd>\{</kbd>  | Insert a [variable](/docs/documentation/build/data/variables) or secret                       |
| <kbd>Esc</kbd> | Close the open menu, then deselect                                                       |

Both menus only open at the start of a line or after a space.

## Formatting text

| Shortcut           | Action    |
| ------------------ | --------- |
| <kbd>Cmd + B</kbd> | Bold      |
| <kbd>Cmd + I</kbd> | Italic    |
| <kbd>Cmd + U</kbd> | Underline |

Strikethrough, highlight, and inline code have no shortcut. Use the formatting toolbar or a [markdown shortcut](/docs/documentation/build/editor/markdown) instead.

## Working with blocks

| Shortcut                                  | Action                                                         |
| ----------------------------------------- | -------------------------------------------------------------- |
| <kbd>Cmd + A</kbd>                        | Select the current line, then press again to select everything |
| <kbd>Cmd + D</kbd>                        | Duplicate the selected lines                                   |
| <kbd>Backspace</kbd> or <kbd>Delete</kbd> | Delete the selected lines                                      |
| <kbd>Shift</kbd> + arrow keys             | Extend the selection up or down                                |
| <kbd>Enter</kbd>                          | Put your cursor back at the end of a selected line             |
| <kbd>Tab</kbd>                            | Indent the current line                                        |
| <kbd>Shift + Tab</kbd>                    | Outdent the current line                                       |
| <kbd>Shift + Enter</kbd>                  | Start a new line inside the same block                         |

## Editing

| Shortcut                   | Action |
| -------------------------- | ------ |
| <kbd>Cmd + Z</kbd>         | Undo   |
| <kbd>Cmd + Shift + Z</kbd> | Redo   |

Undo covers block moves and deletions as well as typing, so a drag that lands in the wrong place is one keystroke away from being fixed.

<Tip>
  <kbd>Esc</kbd> works through one layer at a time. The first press closes an open menu, and the next clears your selection.
</Tip>
