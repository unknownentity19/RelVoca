> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Live agent handoff

> Hand off conversations to a human agent in your contact center, relaying messages and files in both directions and logging them to your transcripts.

RelVoca supports handing off conversations to human agents through native integrations to contact center systems, using a handoff step. The handoff step manages the whole lifecycle: connecting the user to an agent, relaying messages and files in both directions, logging everything to your transcripts, and optionally returning the user to your AI agent afterward.

Systems currently supported include:

* Genesys
* Ujet
* Kustomer
* Dixa
* Zendesk

We add providers on request. If yours isn't listed, contact support or speak to your account representative.

## Core functionality

The following functionality is available for all supported platforms:

**File upload:** Users and agents exchange files in both directions. Accepted types and size limits<br />depend on the provider.

**Conversation context:** Pass context to the agent when the handoff starts: the full conversation<br />transcript, the contents of any variable you choose: a generated summary, an order ID, a routing reason or nothing at all.

**Back to AI:** Return the user to your RelVoca agent when the live conversation ends, with a<br />summary of the handoff already in the AI context. Useful for post-handoff surveys and follow-up flows.

**Transcript logging:** Live agent messages are written to your RelVoca transcripts as they<br />happen, so handoffs appear in transcript history and analytics alongside AI turns instead of<br />disappearing into the provider.

**Fail path:** If the handoff can't be started, the step follows a fail path instead of leaving the<br />user stranded, so you can retry, offer a callback, or fall back to AI. Transient provider errors are<br />retried automatically first, the fail path is only taken once those attempts are exhausted.

**Agent identity:** Where the provider reports it, the agent's name is shown to the user<br />rather than an anonymous "agent".

## Provider-specific capabilities

The table below outlines capabilities that have been implemented for each of these providers. With most providers, there is additional capability that has not yet been implemented. We can extend any of the providers based on their underlying APIs. Contact support or your account representative if there is additional capability required for a specific provider.

| Capability                | Genesys | Ujet | Kustomer | Dixa | Zendesk |
| :------------------------ | :------ | :--- | :------- | :--- | :------ |
| Wait time message         | Delay   | Time | -        | -    | -       |
| Internal note to agent    | -       | -    | ✓        | -    | -       |
| Inactivity timeout        | ✓       | -    | -        | -    | -       |
| Dismiss and resume        | -       | ✓    | -        | -    | -       |
| Localized system messages | -       | ✓    | -        | -    | -       |
| Agent-to-agent transfer   | -       | ✓    | -        | -    | -       |

**Wait time message.** Tells the user how long they're likely to wait. See `waitTimeMessage` below for the available formats.

**Internal note to agent.** Attaches a note to the conversation that agents can see but the user<br />can't. See `noteBodyText`.

**Inactivity timeout.** After a period of user silence, warns that the session is about to expire.<br />The timer resets whenever the user responds. Configured on the handoff step.

**Dismiss and resume.** If the user closes the chat, they're offered a transcript download and can<br />either continue the same conversation or start a new one.

**Localized system messages.** Status messages such as "agent joined", "agent left", and "chat<br />ended" follow the conversation language. English, French, and Spanish are supported today.

**Agent-to-agent transfer.** When an agent hands the user to a colleague, the user sees the transfer happen instead of sitting in silence.

### Handing off to Zendesk

Handoffs to Zendesk run over Zendesk messaging, which is built on Sunshine Conversations. Conversations arrive in the Agent Workspace, so your Zendesk account needs messaging enabled and your agents need to answer from there.

Each handoff opens a messaging ticket. Fill in the group, brand, and priority fields on the step to stamp them on that ticket, and your existing Zendesk routing rules and views can act on them to reach the right team. A group in Zendesk is a team of agents rather than a queue, so nothing is distributed or given a position in line.

Agent replies carry your brand name rather than the individual agent's name, because that is what Zendesk reports on messaging conversations. Users see your brand where other providers show an agent's name.

## Configuration

The step supports a number of optional settings. These are can be specified using a JSON object in the **Metadata** field of the live agent handoff step:

```json theme={null}
{
  "noteBodyText": "Escalated from billing flow. Customer summary: {summary}",
  "disableFileUpload": true,
  "waitTimeMessage": "None"
}
```

All settings are optional. Omit the ones you don't need, or leave the field empty for provider<br />defaults.

The provider coverage noted for each setting reflects current functionality, but is not fixed. Where a provider's API exposes the capability, we can extend any setting to it.

### Using variables

Any value can reference RelVoca variables with `{variable_name}`, including mid-sentence. When a value is exactly one variable, it keeps that variable's type, so<br />`"disableFileUpload": "{upload_flag}"` works when `upload_flag` holds a boolean.

### JSON syntax

The field must be valid JSON. Two rules that are important to follow:

* **Text and enum values need quotes:** `"waitTimeMessage": "None"`, not `waitTimeMessage: None`.
* **Booleans don't:** `"disableFileUpload": true`, not `"true"`.

*If the JSON is invalid, the **entire metadata object is ignored**, not just the offending line, so*<br />*a single unquoted value will silently drop your other settings too. Validate the JSON before*<br />*publishing. If one setting merely has the wrong type, only that setting is dropped and the rest*<br />*still apply.*

Unknown JSON keys are preserved rather than rejected, but only the settings below are supported:

## Settings reference

### `noteBodyText`

**Type:** string · **Providers:** Kustomer

An internal note attached to the conversation, visible to agents but not to the user. Commonly used to pass an escalation reason or a conversation summary.

### `disableFileUpload`

**Type:** boolean · **Providers:** all

When `true`, hides the file upload control so the user can't send files. Agents can still send files to the user.

### `waitTimeMessage`

**Type:** enum · **Providers:** Genesys, Ujet

Controls how the expected wait is communicated while the user waits for an agent.

| Value      | Shown as                                 | Available on      |
| :--------- | :--------------------------------------- | :---------------- |
| `None`     | No wait time message                     | Genesys, Ujet     |
| `Time`     | Expected connection time: "4:00 PM"      | Ujet              |
| `Delay`    | Expected wait in minutes: "in 2 minutes" | Genesys           |
| `Position` | Place in queue: "2nd"                    | Not yet available |

How each provider presents it:

* **Genesys** updates the estimate repeatedly while the user waits. `None` stops these updates.
* **Ujet** states the estimate once, in the opening message. `None` keeps that message but drops the estimate from it.
* **Kustomer**, **Dixa**, and **Zendesk** don't show a wait time message, so this setting has no effect.

If you pick a value a provider doesn't currently support, that provider falls back to its own<br />default rather than turning the message off. To disable the message, set `None` explicitly.

***

Each provider has additional functionality available that has not yet been implemented. Where the provider's API exposes the data, we can add others on request: `Delay` or `Position` for Ujet, or `Position` for Genesys, for example.

Live agent workflows tend to be specific to how each team operates. We are excited to continue extending the supported functionality. If you need a setting extended to another provider, a new configuration option, or a provider we don't yet support, contact support or reach out to your account representative.
