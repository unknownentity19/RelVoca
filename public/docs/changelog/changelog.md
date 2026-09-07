> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Stay up to date with RelVoca product updates, new features, bug fixes, and platform improvements shipped across the agent builder and APIs.

<Update label="August 31st, 2026" tags={["Improved"]}>
  ## Atlas improvements

  <a id="atlas-s-prompt-and-instruction-edits-stream-into-the-prompt-" />

  Atlas now edits prompts in front of you. Ask it to change your global prompt, agent instructions or a playbook's instructions, and you watch the rewrite happen in the editor rather than waiting for a finished result. In Safe mode the proposal appears as a word-level diff you accept or reject; in Autonomous mode the text is typed straight in.

  You can also ask about one part of a prompt instead of the whole thing. Select any text in an editor and choose **Ask Atlas** from the toolbar above the selection, and that passage is attached to your next question as a chip.

  And Atlas can set up credentials with you. When something needs a secret, an integration or an MCP server, it offers a card that opens the normal RelVoca flow. You fill it in, the card reports back, and Atlas carries on from where it stopped. **The credential is entered by you and never passes through the chat or the model.**
</Update>

<Update label="August 31st, 2026" tags={["Added"]}>
  ## Secret and integration endpoints

  <a id="secret-and-integration-resource-families-on-the-stable-api-w" />

  Secrets and third-party integrations can now be listed, created, connected and disconnected through the stable API, the CLI and the RelVoca MCP server, scoped by project. Secret values are write-only and never returned.

  Integrations report whether they can be connected through the API at all. Browser-flow ones such as Zendesk and Salesforce still have to be connected in the builder. A credential value is refused when it arrives from an MCP client.
</Update>

<Update label="August 31st, 2026" tags={["Improved"]}>
  ## Pending changes indicator

  <a id="an-environment-with-unpublished-work-is-marked-on-the-publis" />

  An environment with unpublished work now says so. The **Publish** control carries an amber dot, and its menu offers **View pending changes** so you can read the diff without opening the Publish form. The environments table shows the same dot in place of the old Draft tag.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/vefiNDOYalpHil1V/images/changelog_images/pending-changes.png?fit=max&auto=format&n=vefiNDOYalpHil1V&q=85&s=45548c63d50afb823f7ea081cfc37403" alt="Pending changes indicator" width="536" height="110" data-path="images/changelog_images/pending-changes.png" />
  </Frame>
</Update>

<Update label="August 26th, 2026" tags={["Added"]}>
  ## Atlas

  <a id="atlas-the-builder-ai-assistant-rebuilt-as-a-persistent-panel" />

  Meet Atlas, your in-app copilot for building and monitoring agents. Ask how an agent performed this week, how that compares to last week, or where customers are dropping off. Ask for a change to the agent and Atlas makes it.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/atlas-workspace-level.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=0085f1cb048be9c0afeac8e6e8e7c12c" alt="Atlas" width="1518" height="952" data-path="images/changelog_images/atlas-workspace-level.png" />
  </Frame>

  Atlas holds a single conversation as you move around the product, so you never have to re-explain what you are working on. You can watch it think: a live activity line shows the tools it is calling and the reasoning behind each step.

  Anything you find yourself asking repeatedly can become a Skill. Save your own in **Settings → Skills**, then pick them from Atlas whenever you need them.

  Atlas is in Beta, available on agentic projects, and its usage is broken out in your workspace usage charts.
</Update>

<Update label="August 20th, 2026" tags={["Added"]}>
  ## Transcript keyword search

  <a id="transcripts-can-be-searched-by-keywords-in-user-and-agent-me" />

  You can now find transcripts by what was actually said in them. Search for a phrase and the list narrows to conversations containing it, with each result showing how many messages matched and a short excerpt around the first hit.

  You can also narrow to just what the user said, or just the agent. Search terms can be up to 256 characters, and the same filter is available on the transcript search API.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/transcript_search.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=4a4f94e43ca8980dd88bcec52adc3675" alt="Transcript keyword search" width="2104" height="640" data-path="images/changelog_images/transcript_search.png" />
  </Frame>
</Update>

<Update label="August 20th, 2026" tags={["Improved"]}>
  ## Max conversation duration

  <a id="max-conversation-duration-is-always-on-set-with-a-slider-and" />

  Voice conversations can now run up to sixty minutes, double the previous ceiling. You can set the limit from **Behaviour → Session & timeout**.

  Agents that had the setting switched off move to a thirty-minute default. If you previously entered a value above thirty minutes, note that it was silently capped before and will now apply in full.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/max-conversation-duration.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=8bdd9dc4ce143cb243a3cbba521eca28" alt="Max conversation duration" width="1320" height="520" data-path="images/changelog_images/max-conversation-duration.png" />
  </Frame>
</Update>

<Update label="August 20th, 2026" tags={["Improved"]}>
  ## MCP token authentication

  <a id="the-voiceflow-mcp-server-accepts-a-personal-access-token-ins" />

  The RelVoca MCP server now accepts a personal access token as a bearer credential, so a client that cannot open a browser for OAuth can connect using the same token that authenticates the REST API and the CLI. Send it in the `Authorization` header instead of completing the browser sign-in. The OAuth flow is unchanged.
</Update>

<Update label="August 20th, 2026" tags={["Improved"]}>
  ## Trace filtering on the conversation endpoint

  <a id="trace-types-can-be-excluded-from-the-stable-conversation-end" />

  A caller of the stable conversation endpoint can now list trace types to drop from the response, so an integration only receives the traces it renders. Send a `config` object alongside the action with `excludeTypes` listing the types to drop. Omit it and every trace comes back as before.

  One trace is always returned even when its type is excluded: the debug trace reporting that the credit limit was reached.
</Update>

<Update label="August 19th, 2026" tags={["Improved"]}>
  ## Late variable writes

  <a id="a-variable-written-after-a-turn-is-sealed-is-no-longer-rever" />

  A variable set after the agent has already replied, which is the normal case for an asynchronous tool that finishes late, now survives into the following turn instead of being quietly reverted. The agent reads what was actually written.

  Nothing to configure. If your agent was built to expect late writes to be discarded, note that it will now see the updated values instead.
</Update>

<Update label="August 18th, 2026" tags={["Improved"]}>
  ## Multilingual Cartesia voices

  <a id="cartesia-voices-support-forty-languages-with-samples-that-pl" />

  Cartesia text-to-speech now covers over forty languages, up from fifteen. Each voice declares which languages it speaks, and the preview sample plays in the language you selected. Choose a provider, voice and language from **Settings → Behaviour → Voice output**.

  The voice menu now filters by language, so a voice that does not support the language you pick will not appear in the list. Existing selections are untouched.
</Update>

<Update label="August 18th, 2026" tags={["Improved"]}>
  ## Knowledge base logs in evaluations

  <a id="an-evaluation-can-be-given-the-agent-s-knowledge-base-search" />

  **Knowledge base logs** joins Playbook, Workflow and Tool logs in an evaluation's **Log visibility** settings. With it on, the evaluating model can see the knowledge base searches your agent ran, so a criterion about whether an answer came from your content is something it can actually check. As with the other log types, including them makes each prompt longer and raises the average cost per evaluation.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/evaluation-settings-kb-logs.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=e4e4a11c70533f600f3996ff051f8a83" alt="Knowledge base logs" width="918" height="1608" data-path="images/changelog_images/evaluation-settings-kb-logs.png" />
  </Frame>
</Update>

<Update label="August 18th, 2026" tags={["Improved"]}>
  ## Transcript environment fields

  <a id="transcripts-from-the-stable-rest-api-carry-their-environment" />

  A transcript fetched from the REST API now reports which environment the conversation ran in, and whether it ran against the draft or published version. Both fields are null for conversations recorded before environments existed.
</Update>

<Update label="August 17th, 2026" tags={["Added"]}>
  ## Live agent typing indicator

  <a id="a-typing-indicator-while-a-live-agent-is-replying-during-a-h" />

  When a live agent is composing a reply during a handoff, the user now sees that the agent is typing instead of waiting in silence.

  Nothing to configure. This currently applies to handoffs to Dixa; other providers are unchanged.
</Update>

<Update label="August 14th, 2026" tags={["Improved"]}>
  ## Parallel tool calls

  <a id="more-than-one-knowledge-base-search-in-a-single-turn-no-long" />

  When an agent makes several tool calls in a single turn, all of them now run and every result comes back. Previously all but the last were discarded, so an agent that searched the knowledge base three times answered from one search.

  Nothing to configure. This covers every kind of tool call an agent makes in a turn, including knowledge base searches, API tools, functions and integrations. Each result is matched back to the call that asked for it, and turns that make several calls are faster.
</Update>

<Update label="August 11th, 2026" tags={["Added"]}>
  ## Tool message traces

  <a id="a-generated-tool-call-message-reaches-callers-that-do-not-co" />

  The message an agent speaks while a slow tool runs now reaches applications that call the API without streaming. It arrives as an ordinary `text` trace for chat or a `speak` trace for voice, generated through the same path as any other agent message. Previously it was dropped.

  Nothing to configure. If your integration consumes completion events, it keeps receiving the message as a completion sequence. If it does not, responses from non-streaming endpoints now carry one additional trace.
</Update>

<Update label="August 11th, 2026" tags={["Improved"]}>
  ## Out-of-credit call handling

  <a id="voice-calls-are-declined-when-the-organization-has-run-out-o" />

  Phone calls are now declined when your organization has run out of credits, instead of connecting to an agent that cannot respond. The caller hears that no agents are available. A test call from the builder tells you to add credits.

  Organization admins are emailed when this occurs.
</Update>

<Update label="August 11th, 2026" tags={["Added"]}>
  ## Personal access tokens

  <a id="personal-access-token-management-page-with-project-api-keys-" />

  You can now create a personal access token with an expiry you choose, and use it in place of the shared project API key for RelVoca's APIs and the CLI. Create and revoke tokens from **Settings → Access tokens**. Project API keys will keep working.

  Pick an expiry when you create a token, and copy the value once. A searchable table lists your tokens with their expiry and the actions available for each.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/personal-access-tokens.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=247354d7e0d89f7d078ae7a6eebc9c8e" alt="Access tokens" width="2912" height="744" data-path="images/changelog_images/personal-access-tokens.png" />
  </Frame>
</Update>

<Update label="August 11th, 2026" tags={["Added"]}>
  ## Live transcripts

  <a id="a-transcript-for-a-conversation-still-in-progress-follows-it" />

  You can now follow a conversation while it is still in progress. Open **Transcripts** and click a conversation that has not ended, and each turn appears as it happens while the view scrolls itself, so you no longer have to wait for a conversation to finish before you can read it.

  The view refreshes every four seconds and pauses while the browser tab is in the background. Once the conversation closes it keeps listening briefly so the final message still arrives, then settles.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5znL4KWzSTKhTdXE/images/changelog_images/live-transcripts.png?fit=max&auto=format&n=5znL4KWzSTKhTdXE&q=85&s=666d9794845a9a5aa8efbfec6bc78228" alt="Live transcripts" width="2000" height="1058" data-path="images/changelog_images/live-transcripts.png" />
  </Frame>
</Update>

<Update label="August 10th, 2026" tags={["Added"]}>
  ## Tag tools, playbooks, and workflows in your instructions

  You can now reference a resource directly instead of naming it in plain text. Press `/` in the global prompt, agent instructions, or playbook instructions, choose a type (playbook, workflow, system tool, or tool), then pick from your project. It's inserted as a chip bound to that resource. Variables continue to be referenced using `{`.

  If a tagged resource isn't available in that context, the chip flags it rather than silently failing.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/QBE82P2FNpEfq7Pi/images/changelog_images/2026-08-10-markdown-resource-tagging.png?fit=max&auto=format&n=QBE82P2FNpEfq7Pi&q=85&s=066e1e4f77110e3ba02946fc266b23b7" alt="Image" width="2118" height="1620" data-path="images/changelog_images/2026-08-10-markdown-resource-tagging.png" />
  </Frame>
</Update>

<Update label="August 10th, 2026" tags={["Added"]}>
  ## Markdown editor

  The global prompt, agent instructions, and playbook instructions now use a Markdown editor. Structure your instructions with headings, lists, bold and italic, either with standard Markdown shortcuts (`## ` for a heading, `**bold**`, `> ` for a quote) or by pressing `/` to open the formatting menu. Agents built from a prompt come back formatted this way by default.

  Existing instructions migrate automatically. The underlying data is unchanged, only how it's rendered and edited.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/QBE82P2FNpEfq7Pi/images/changelog_images/2026-08-10-markdown-prompt-editor.png?fit=max&auto=format&n=QBE82P2FNpEfq7Pi&q=85&s=81b577d5720bd120bf75f76504f606f9" alt="Image" width="2116" height="1618" data-path="images/changelog_images/2026-08-10-markdown-prompt-editor.png" />
  </Frame>
</Update>

<Update label="August 10th, 2026" tags={["Added"]}>
  ## Widget width

  You can now set the chat widget's width from Interface → Widget, instead of overriding the `vfrc-chat` class with custom CSS. Minimum is 320px, and the widget stays responsive if the width you set exceeds the browser window.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/U3eLa2KjcqjWaYri/images/changelog_images/august-10-2026-widget-width/widget-width-setting.png?fit=max&auto=format&n=U3eLa2KjcqjWaYri&q=85&s=bd74cec9f41c467ccaa8dc13fa68b604" alt="Image" width="1396" height="178" data-path="images/changelog_images/august-10-2026-widget-width/widget-width-setting.png" />
  </Frame>
</Update>

<Update label="August 5th, 2026" tags={["Improved","Deprecated"]}>
  ## Session lifecycle webhook: richer payloads, `.v2` events deprecated

  All four session lifecycle events (`runtime.session.start`, `runtime.session.end`, `runtime.call.start` and `runtime.call.end`) now carry the metadata that previously appeared only on their `.v2` variants: `versionID`, `transcriptID`, `versionVariant`, `projectEnvironmentID` and `projectEnvironmentAlias`, plus `endReason` on `runtime.session.end` and `sessionID` on the call events. `sessionID` on call events is new information: call and session events can now be correlated with each other for the first time.

  These fields are **optional and nullable**. The `.v2` events only fired when every one of them was known, whereas the standard events fire on every session and call, so your handler should tolerate `null`. `versionID` carries the same value as `environmentID`.

  **Deprecation:** `runtime.session.start.v2`, `runtime.call.start.v2` and `runtime.call.end.v2` will **stop firing on October 9, 2026**. Until then they continue to be delivered alongside their replacements, so you can migrate at your own pace. Switch to the event name without the `.v2` suffix.

  `runtime.session.end.v2` has been removed. It never fired, because its trigger condition depended on data that was never recorded, so it had no subscribers.

  We've also clarified a point that causes recurring confusion: session events fire on **every channel**, chat included. A voice conversation emits both `runtime.call.*` and `runtime.session.*` because a call and a session are different things with different end conditions. See [Session lifecycle webhook](/docs/api-reference/webhooks/session-lifecycle) for the full breakdown.
</Update>

<Update label="August 5th, 2026" tags={["Added"]}>
  ## Soniox speech to text model

  RelVoca now supports Soniox's V5 real-time speech to text model.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/hLt9cGqwcYujkzt-/images/CleanShot-2026-08-05-at-09.35.26@2x.png?fit=max&auto=format&n=hLt9cGqwcYujkzt-&q=85&s=04229e14243f098c78aa444ce29fd34e" alt="Clean Shot 2026 08 05 At 09 35 26@2x" width="1172" height="1176" data-path="images/CleanShot-2026-08-05-at-09.35.26@2x.png" />
  </Frame>
</Update>

<Update label="August 5th, 2026" tags={["Added"]}>
  ## Generative tool messages

  In addition to scripted tool messages, you can now provide generative tool messages that use the conversation history to provide a contextually correct tool message at that point in the conversation. You can accompany generative tool messages with examples as hints for how your agent should reply. Generative tool messages also work nicely in multilingual agents and will reply in the language of the current conversation.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/hLt9cGqwcYujkzt-/images/CleanShot-2026-08-05-at-09.32.28@2x.png?fit=max&auto=format&n=hLt9cGqwcYujkzt-&q=85&s=4c21525818cfbec71040a185c01734df" alt="Clean Shot 2026 08 05 At 09 32 28@2x" width="2404" height="1126" data-path="images/CleanShot-2026-08-05-at-09.32.28@2x.png" />
  </Frame>
</Update>

<Update label="July 31st, 2026" tags={["Improved"]}>
  ## Project Analytics Updates

  We made it easier to understand your agent's performance and ROI, by introducing a summary section on the **Analytics** page. Key evaluations and metrics now sit at the top: resolution rate and customer satisfaction are surfaced by default, alongside total conversations, spend, and average cost per conversation.

  A number of new metrics were also added. This includes:

  * LLM Cost
  * TTS Cost
  * SST Cost
</Update>

<Update label="July 30th, 2026" tags={["Added"]}>
  ## Environment Protection

  You can now lock down individual environments so only admins or owners can publish or merge into them. Turn on **Environment protection** from the environment's ••• menu in **Settings → Environments**. Everyone else keeps their normal access to build and test - they just can't merge changes into that environment.

  This is most useful on Main and on any environment carrying live traffic. Anyone can still create a new environment, this protects production environments from accidental or unauthorized changes.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-31-at-10.04.09@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=56570aeda75a487ff07c16e574503716" alt="Clean Shot 2026 07 31 At 10 04 09@2x" width="1456" height="1002" data-path="images/CleanShot-2026-07-31-at-10.04.09@2x.png" />
  </Frame>
</Update>

<Update label="July 30th, 2026" tags={["Added"]}>
  ## Cost limit per conversation

  You can now set a maximum spend per conversation. Define a dollar amount, and once a session's cost exceeds it, RelVoca ends the session automatically - a hard ceiling on any single conversation, no matter how long it runs or how many tools it calls.

  For voice calls, this pairs with Max conversation duration: duration caps how long a conversation lasts, while cost limit caps what it spends. A short conversation that hammers an expensive model can cost more than a long, quiet one, so the two guardrails catch different failure modes.

  As with duration, you can set an optional **End message** that's sent before the session closes.

  This setting is off by default. Find it in **Settings → Behaviour.**

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-31-at-10.02.39@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=8f9202e9099f3c5f80f254a5fb93e601" alt="Clean Shot 2026 07 31 At 10 02 39@2x" width="1356" height="564" data-path="images/CleanShot-2026-07-31-at-10.02.39@2x.png" />
  </Frame>
</Update>

<Update label="July 30th, 2026" tags={["Added"]}>
  ## Max conversation duration for phone calls

  You can now cap how long a single conversation is allowed to run. Set a limit in seconds, and once a conversation hits it, RelVoca ends it automatically - so a caller who stays on the line indefinitely, or an agent stuck in a loop, can't quietly burn through credits.

  You can also define an optional **End message** that plays before the conversation closes, so the user gets a graceful sign-off instead of a dropped call.

  This setting is off by default. Find it in **Behaviour → Session & timeout**.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-31-at-10.03.07@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=444adc50b23d29ece6b4fe43bfde35a6" alt="Clean Shot 2026 07 31 At 10 03 07@2x" width="1346" height="564" data-path="images/CleanShot-2026-07-31-at-10.03.07@2x.png" />
  </Frame>
</Update>

<Update label="July 30th, 2026" tags={["Added"]}>
  ## File upload in chat widget

  The chat widget now natively supports file and image uploads for both AI agent and human handoff conversations. To turn file uploads on, open **Widget → Modality & Interface** and enable **Allow file attachments**.

  Users can upload up to 10 files during a conversation. Supported file types include PDF, JPEG, JPG, PNG and WEBP.

  Files are stored in a secure RelVoca storage repository and are never publicly accessible. [Learn more](/docs/documentation/deploy/widget/custom-web-chat-styling#enabling-file-uploads)

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-31-at-10.09.37@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=509f2392839226157ba01fe80f7fb2a8" alt="Clean Shot 2026 07 31 At 10 09 37@2x" width="872" height="510" data-path="images/CleanShot-2026-07-31-at-10.09.37@2x.png" />
  </Frame>
</Update>

<Update label="July 13th, 2026" tags={["Added"]}>
  ## Improvements to tool call sounds

  Tool call sounds now:

  1. Have manual volume control
  2. Include more sound options
  3. Automatically decrease volume when agent it talking over it
  4. Fade in and out to create a more natural dialog

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-15-at-12.27.34@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=a490af0f383ad379eb2ae030dac6d59a" alt="Clean Shot 2026 07 15 At 12 27 34@2x" width="2382" height="1290" data-path="images/CleanShot-2026-07-15-at-12.27.34@2x.png" />
  </Frame>
</Update>

<Update label="July 13th, 2026" tags={["Added"]}>
  ## Background audio for all telephony providers

  All Telephony providers (RelVoca, Twilio, Vonage, Telnyx) now support background audio. Background audio configuration can be found in the behaviour tab of your project.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-15-at-12.18.46@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=b11d99ae49ac611ee63f473a4084d080" alt="Clean Shot 2026 07 15 At 12 18 46@2x" width="1372" height="584" data-path="images/CleanShot-2026-07-15-at-12.18.46@2x.png" />
  </Frame>
</Update>

<Update label="July 3rd, 2026" tags={["Added"]}>
  ## Secrets conflict resolution

  When merging an environment into Main, RelVoca detects secrets whose values differ between the two environments. Before the merge completes, you choose how to resolve them: keep Main's existing values (default), or enable **Override Main secrets** to replace them with the incoming environment's values. This prevents merges from silently overwriting production credentials - like API keys pointed at staging systems - without an explicit decision.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-09-at-09.49.15@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=5300d623c95e4fd124682db20c441029" alt="Clean Shot 2026 07 09 At 09 49 15@2x" width="2124" height="610" data-path="images/CleanShot-2026-07-09-at-09.49.15@2x.png" />
  </Frame>
</Update>

<Update label="July 3rd, 2026" tags={["Added"]}>
  ## Evaluations with log visibility

  Evaluations just got a lot more observant. With the new **Log visibility** setting, you control exactly what your evaluating model can see when it scores a transcript - going beyond the conversation itself and into what your agent actually *did* behind the scenes.

  Choose which logs to include in each evaluation:

  * **Playbook logs** - see which playbooks fired and how they reasoned toward their goal
  * **Workflow logs** - trace the deterministic steps a conversation passed through
  * **Tool logs** - inspect every tool call, input, and response

  Each log type is opt-in, so you stay in control of the trade-off: more logs give the evaluating model richer context, while fewer logs keep credit usage lean. Enable all three, mix and match, or include none - whatever fits the question you're trying to answer.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-03-at-17.09.43@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=0d2f1bd773e6166b1689d162cea85543" alt="Clean Shot 2026 07 03 At 17 09 43@2x" width="3456" height="1994" data-path="images/CleanShot-2026-07-03-at-17.09.43@2x.png" />
  </Frame>
</Update>

<Update label="July 3rd, 2026" tags={["Added"]}>
  ## Variable persistence control

  You can now control whether individual variables persists across user sessions. Define what should carry across sessions (name, preferences, tier) for returning users, and ignore what shouldn't. [Learn more](/docs/documentation/build/data/variables#persisting-variables-across-sessions)

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-03-at-12.10.12@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=2b665698d96508537f531fdc32fca112" alt="Clean Shot 2026 07 03 At 12 10 12@2x" width="1630" height="1122" data-path="images/CleanShot-2026-07-03-at-12.10.12@2x.png" />
  </Frame>
</Update>

<Update label="June 24th, 2026" tags={["Added"]}>
  ## Required variables for workflows & playbooks

  Specify variables that must be filled before a playbook or workflow can be routed to. Until every required variable has a value, the agent won't hand off to it.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-09.10.52@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=2712e3f2d690db5024b6639fc6bc1b8b" alt="Clean Shot 2026 06 24 At 09 10 52@2x" width="1736" height="1164" data-path="images/CleanShot-2026-06-24-at-09.10.52@2x.png" />
  </Frame>
</Update>

<Update label="June 24th, 2026" tags={["Added"]}>
  ## Entry conditions

  You can now gate playbooks and workflows behind entry conditions - deterministic checks that must evaluate to true before the agent can access that playbook or workflow. If the conditions aren't met, the playbook/workflow stays unavailable for routing, giving you precise, rule-based control over when each one becomes reachable.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-24-at-08.58.30@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=d9542c6aac9d7253d1aad4ec48d6630a" alt="Clean Shot 2026 06 24 At 08 58 30@2x" width="2490" height="1100" data-path="images/CleanShot-2026-06-24-at-08.58.30@2x.png" />
  </Frame>
</Update>

<Update label="June 17th, 2026" tags={["Added"]}>
  ## Organization level usage breakdown

  You can now see exactly where your spend is going from a birds eye view. Usage breakdowns now include spend across workspaces and projects, broken down by Runtime, Measure, Development, and Generation features. Drill into a specific workspace, project, or date range to track costs over time and understand what's driving them.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-17-at-18.12.18@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=c1bc1a81ebc539513d32438d7b2b0295" alt="Clean Shot 2026 06 17 At 18 12 18@2x" width="3446" height="1982" data-path="images/CleanShot-2026-06-17-at-18.12.18@2x.png" />
  </Frame>
</Update>

<Update label="June 17th, 2026" tags={["Added"]}>
  ## Transcript filtering by workflow, playbook and tool usage

  You can now filter transcripts by a specific workflow, playbook, or tool and see only the conversations where it was used.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-17-at-18.32.22@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=92785bb693c40f4095e590c24cc6b988" alt="Clean Shot 2026 06 17 At 18 32 22@2x" width="1120" height="556" data-path="images/CleanShot-2026-06-17-at-18.32.22@2x.png" />
  </Frame>
</Update>

<Update label="June 17th, 2026" tags={["Added"]}>
  ## Caller ID passthrough

  When using the Call forward system tool, the forwarded destination can now see the original caller's number. This can be helpful to ensure your contact center platform receives accurate caller information for routing, logging, and CRM matching.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-17-at-17.24.40@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=90645685ddeb2c3428e8ae1a81c5bd95" alt="Clean Shot 2026 06 17 At 17 24 40@2x" width="2090" height="1186" data-path="images/CleanShot-2026-06-17-at-17.24.40@2x.png" />
  </Frame>
</Update>

<Update label="June 15th, 2026" tags={["Added"]}>
  ## Save tool responses to properties

  Tool outputs can now be saved to [properties](/docs/documentation/measure/transcripts#attaching-custom-properties), not just variables. Previously, when an agent called a tool, you could capture the response to a RelVoca variable - now you can map it to a property as well, which is useful for tracking and transcript tagging.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-17-at-18.33.06@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=58c4b9977bd8a65f011dd715aa2f7b0c" alt="Clean Shot 2026 06 17 At 18 33 06@2x" width="2412" height="1460" data-path="images/CleanShot-2026-06-17-at-18.33.06@2x.png" />
  </Frame>
</Update>

<Update label="June 15th, 2026" tags={["Added"]}>
  ## Merge conflict awareness

  When merging an environment back into main, you can now see whether main has changed since you branched off it. This makes it clear when your branch is working from an outdated version of main, so you can review and reconcile those changes before merging.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-15-at-17.39.57@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=4c8051e168bd2a311efd7210438e4e1f" alt="Clean Shot 2026 06 15 At 17 39 57@2x" width="3448" height="1984" data-path="images/CleanShot-2026-06-15-at-17.39.57@2x.png" />
  </Frame>
</Update>

<Update label="June 10th, 2026" tags={["Added"]}>
  ## Personas

  Personas let you test conversations with specific variable values already in place. They’re useful for testing how your agent handles different customer types or account states without setting things up by hand each time. [Learn more](/docs/documentation/build/data/personas)
</Update>

<Update label="June 9th, 2026" tags={["Added"]}>
  ## Tests

  Tests let you verify your agent’s behaviour before real users see it. Each test simulates a conversation between a user and your agent, then checks that things like the agent’s responses, where it routed, and which tools it called match what you expected. [Learn more](/docs/documentation/measure/tests)

  <img src="https://mintcdn.com/voiceflow-009a8802/wSx4TsrcyCGU1FNa/images/tests-cover.avif?fit=max&auto=format&n=wSx4TsrcyCGU1FNa&q=85&s=3dc483c76ff034a5311045f74c79752f" alt="Tests Cover" width="1650" height="928" data-path="images/tests-cover.avif" />
</Update>

<Update label="June 9th, 2026" tags={["Added"]}>
  ## Project converter

  You can convert a chat project to voice (or voice to chat) right from your workspace dashboard. Select the project, click the ellipsis (•••) button, and choose **Convert to voice** or **Convert to chat**.
</Update>

<Update label="May 20th, 2026" tags={["Added"]}>
  ## Query re-writing

  When enabled, the model rewrites the user’s last message before searching based on your instructions - improving retrieval for conversational or ambiguous inputs. Useful when users don’t phrase questions the way your content is written. [Learn more](/docs/documentation/build/querying-the-knowledge-base#query-re-writing)

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Query-re-writing-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=cf7bd5660200fd9ee2f67e6d6aea46ea" alt="Query Re Writing Docs 1" width="2234" height="1006" data-path="images/Query-re-writing-docs-1.png" />
</Update>

<Update label="May 14th, 2026" tags={["Added"]}>
  ## New model: RelVoca Core

  RelVoca Core is our first model, optimized for the kinds of tasks agents actually do - tool calling, multi-turn reasoning, instruction following inside playbooks. We benchmarked it on RelVoca's agentic framework against the models we currently support (Anthropic, OpenAI, Gemini) and saw stronger quality, at a lower per-token cost. Core is rolling out as a selectable model across all plans.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/VoiceflowCore-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=2969cd6af964b080c2fd404a23e42eca" alt="RelVoca Core Docs" width="930" height="376" data-path="images/VoiceflowCore-docs.png" />
</Update>

<Update label="May 13th, 2026" tags={["Added"]}>
  ## Pronunciation dictionaries

  The pronunciation dictionary rewrites words or phrases in your agent’s responses before they’re sent to text-to-speech. This ensures correct pronunciation of names, places, or technical terms. You can find this setting in Behaviour/Voice Output/Pronunciation dictionary. [Learn more](/docs/documentation/build/behaviour#pronunciation-dictionary)

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Pronunciation-dic.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=7ed290138f64d56574641571bf02ab64" alt="Pronunciation Dic" width="2820" height="532" data-path="images/Pronunciation-dic.png" />
</Update>

<Update label="May 5th, 2026" tags={["Added"]}>
  ## Environments

  Work on multiple versions of your agent in parallel, conduct A/B tests with traffic splits, and roll changes back with confidence. [Learn more](/docs/documentation/deploy/environments/overview)

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Traffic-splitting.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=2a5235cdfb100bf2d132c5341abeb791" alt="Traffic Splitting" width="1732" height="942" data-path="images/Traffic-splitting.png" />
</Update>

<Update label="May 4th, 2026" tags={["Added"]}>
  ## Tool call sounds

  You can now play an audio snippets while a tool call is running, so users aren't sitting in dead air during longer-running tools. Pick from sounds like keyboard typing, elevator music, and others directly in the tool call configuration.

  This is a voice specific feature, so it's only available on voice projects.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tool-call-sounds-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=43b4ebf349f516d7622490922a3a2159" alt="Tool Call Sounds Docs" width="2820" height="1394" data-path="images/Tool-call-sounds-docs.png" />
</Update>

<Update label="May 1st, 2026" tags={["Added"]}>
  ## Evaluation preview cards

  Evaluation results now open with summary cards at the top of the page, so you can see the key numbers at a glance without digging into the details.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Eval-Preview-Chips.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=0b0cae065696bc8e5a57b75f27b43f87" alt="Eval Preview Chips" width="2820" height="870" data-path="images/Eval-Preview-Chips.png" />
</Update>

<Update label="April 29th, 2026" tags={["Added"]}>
  ## Flux multilingual

  Flux Multilingual extends Flux to 10 languages. We highly recommend switching to Flux as it's the most performant STT model in market.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Flux-multi.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=44205f870952f36b367c1f865d5b729e" alt="Flux Multi" width="1732" height="754" data-path="images/Flux-multi.png" />
</Update>

<Update label="April 29th, 2026" tags={["Added"]}>
  ## Skip turn system tool

  The skip turn tool lets the agent stay quiet and wait for the user instead of replying. Use it when the user asks for a moment - things like "hold on," "give me a sec," "let me think," or "one moment" - so the agent doesn't talk over them or fill the pause with something unnecessary.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Skip-turn.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=0b9bc3d5e548efd6b688c469059ac0b2" alt="Skip Turn" width="1256" height="536" data-path="images/Skip-turn.png" />
</Update>

<Update label="April 27th, 2026" tags={["Added"]}>
  ## New default properties for chat transcripts

  Chat transcripts now include OS, Device, Browser & Country properties by default. You can also filter your transcripts or evaluation results by any of these properties.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Meta-data-filters.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=a91e182fec2921374596e11c14903595" alt="Meta Data Filters" width="1672" height="774" data-path="images/Meta-data-filters.png" />
</Update>

<Update label="April 24rd, 2026" tags={["Added"]}>
  ## Shopify tools

  Connect your Shopify store to RelVoca in a couple of clicks and give your agent instant access to real order and product data - no custom API wiring required.

  What your agent can now do out of the box:

  * **Answer product questions with live data** - stock levels, sizing, variants, and specs pulled straight from your catalog, so customers get accurate answers instead of hallucinated ones
  * **Resolve "where's my order?" without a human** - customers self-serve status, tracking, and history just by asking
  * **Turn support chats into revenue** - recommend the right next product based on what the customer is already looking at or buying
  * **Handle cancellations end-to-end** - refund-ready cancellations happen inside the conversation instead of in a support queue

      <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Shopify-tool-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=bfebd25be6b725f8d2c54cc309da300a" alt="Shopify Tool Docs" width="1600" height="900" data-path="images/Shopify-tool-docs.png" />
</Update>

<Update label="April 23rd, 2026" tags={["Added"]}>
  ## Native fail path on Function and API steps

  You can now enable a native failure path on Function and API tool steps. When a tool responds with an error code, or times out, the failure path triggers if enabled.

  * If the Failure path is disabled and the tool errors or times out, the step exits through the first available port.
  * This does not apply to API or Function tools used in the global agent or playbooks - the agent handles all cases.
  * If the Failure path is disabled and the tool errors or times out, the step exits through the first available port.
  * This does not apply to API or Function tools used in the global agent or playbooks - the agent handles all cases.
  * If the Failure path is disabled and the tool errors or times out, the step exits through the first available port.
  * This does not apply to API or Function tools used in the global agent or playbooks - the agent handles all cases.
</Update>

<Update label="April 22nd, 2026" tags={["Added"]}>
  ## Workflow usage

  You can now see workflow usage, alongside playbook usage in analytics. If you're not immediately seeing it in your analytics view, try adding it by editing the view from the page header.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Workflow-usagae-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=2543113d7027f6837691a93b86ffba5a" alt="Workflow Usage Docs" width="2192" height="1216" data-path="images/Workflow-usagae-docs.png" />
</Update>

<Update label="April 14th, 2026" tags={["Added"]}>
  ## Global tools

  You can now add [API](/docs/documentation/build/tools/api-tool), [MCP](/docs/documentation/build/tools/mcp-tool), [integration](/docs/documentation/build/tools/overview) and [function](/docs/documentation/build/tools/function-tool) tools directly at the agent level, making them available across your agent.

  [Global tools are available](/docs/documentation/build/tools/global-tools#when-are-global-tools-are-available-for-my-agent-to-use) any time the user is in an agentic context.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Global-tools-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=d2046794e1c19be752e78c225d45abcc" alt="Global Tools Docs 1" width="2820" height="1556" data-path="images/Global-tools-docs-1.png" />
</Update>

<Update label="April 13th, 2026" tags={["Added"]}>
  ## Custom timeouts for API and function tools

  You can now configure a custom timeout on [API](/docs/documentation/build/tools/api-tool) and [function](/docs/documentation/build/tools/function-tool) tools. If a tool doesn't respond within the set limit, it times out and triggers the fail path - so any fail tool messages or fallback paths you've configured will fire on timeout as well. The default timeout is 20 seconds.

  Maximum timeout limits by plan:

  | Plan       | Maximum timeout |
  | ---------- | --------------- |
  | Enterprise | 600s (10 min)   |
  | Business   | 150s (2.5 min)  |
  | Pro        | 150s (2.5 min)  |
  | Trial      | 60s (1 min)     |

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Request-timeout-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=25ae6f4bae000644c86e245e1653cd20" alt="Request Timeout Docs 1" width="2234" height="1494" data-path="images/Request-timeout-docs-1.png" />
</Update>

<Update label="April 9th, 2026" tags={["Added"]}>
  ## Live conversations indication in transcripts

  Your Transcripts table just got a heartbeat. Active conversations now appear have an indicator, alongside current cost - giving you a live pulse on every session as it happens. Refresh the table to pull in the latest updates without leaving the page.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Live-conversations-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=933f9323ec38bd35a45491296d3f17d7" alt="Live Conversations Docs" width="1816" height="1162" data-path="images/Live-conversations-docs.png" />
</Update>

<Update label="April 8th, 2026" tags={["Improved"]}>
  ## Interact with responses while they stream

  Links are now clickable and text is copyable while the agent is still generating a response - so you can act on information the moment it appears, not after the last word lands.
</Update>

<Update label="April 6th, 2026" tags={["Improved"]}>
  ## Resizable conversation editor in run mode

  The conversation editor in run mode can now be resized, giving you more space when you need it.

  <Frame>
    <img src="https://mintcdn.com/voiceflow-009a8802/5sSXeTOLjrb5XPDK/images/ezgif-62f101d76f530fd5.gif?s=72788d0c050f5acaff2ebcdc0d4dc1cf" alt="Ezgif 62f101d76f530fd5" width="1280" height="735" data-path="images/ezgif-62f101d76f530fd5.gif" />
  </Frame>
</Update>

<Update label="April 2nd, 2026" tags={["Improved"]}>
  ## Run mode & transcript improvements

  Run mode and historical transcripts now surface three new layers of detail to make testing and reviewing your AI agents more informative:

  **Agent navigation** - When routing occurs, the transcript shows the path inline (eg: *Agent → Reservations specialist)*, giving you a clear trace of how conversations are routed throughout your AI agent.

  **Latency indicators** - Each agent response shows its response time in milliseconds or seconds, making it easy to spot slow steps in your flow. Hover a latency chip to see more detail.

  **Input types** - User turns are tagged with how the input was received (eg: *Voice input*, *Keypad input*, *Button input*, *Text input*), so you can better understand how your customers are interacting with your agent.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Run-updates-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=ee08c3e314e6516593927f312759912a" alt="Run Updates Docs" width="2192" height="1216" data-path="images/Run-updates-docs.png" />
</Update>

<Update label="March 28th, 2026" tags={["Improved"]}>
  ## Improved evaluation filters

  You can now apply more granular filters to your evaluations - making it easier to track performance trends, compare results across specific time ranges, and pinpoint where your agent is improving or regressing.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Eval-filters-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=b9546f484d2df3089509e3fadbdb8cc3" alt="Eval Filters Docs" width="2820" height="642" data-path="images/Eval-filters-docs.png" />
</Update>

<Update label="March 26th, 2026" tags={["Added"]}>
  ## Customize widget loader

  You can now choose how your agent looks while it's thinking. Pick between a spinner with text or a minimal dots loader, and customize the loading message to match your brand. Find it under Interface → Widget. This is a chat only feature.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Loader-type-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=beb366b695a114a8c44d3357897a5969" alt="Loader Type Docs" width="2192" height="1218" data-path="images/Loader-type-docs.png" />
</Update>

<Update label="March 24th, 2026" tags={["Added"]}>
  ## Async tool response capture

  API and Function tools running asynchronously can now save their response to a RelVoca variable. Previously, async was fire-and-forget - useful for logging and side effects, but the response was lost. Now you can fire an async call, continue the conversation, and reference the result as soon as it arrives.

  This unlocks predictive experiences. Fetch a customer's recent orders during authentication, pull account data while the agent greets the user, or query a slow third-party service while the conversation moves forward.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Async-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=bcbf4118428a033accd74a27e259f9b6" alt="Async Docs 1" width="2192" height="1216" data-path="images/Async-docs-1.png" />
</Update>

<Update label="March 19th, 2026" tags={["Added"]}>
  ## ElevenLabs Scribe v2 Realtime STT

  We’ve added support for ElevenLabs' newest and most accurate speech-to-speech model, Scribe v2 Realtime. Supporting 90+ languages.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Scribe-changelog.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=811205e4e5271a86f4ded7d1336b5078" alt="Scribe Changelog" width="1508" height="1584" data-path="images/Scribe-changelog.png" />
</Update>

<Update label="March 19th, 2026" tags={["Added"]}>
  ## Eleven v3 TTS

  We’ve added support for ElevenLabs' newest and most expressive text-to-speech model, Eleven v3. Supporting 70+ languages.

  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Eleven3-changelog.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=63f79a550f41853e54696999fa54c1c4" alt="Eleven3 Changelog" width="1162" height="848" data-path="images/Eleven3-changelog.png" />
</Update>

<Update label="March 13th, 2026" tags={["Added"]}>
  ## Show source URLs in responses

  When enabled, the agent includes the source URL (If public URL) alongside its response so users can verify or learn more. Recommended for help centers and documentation.

  This feature is available for both the knowledge base and web search system tools.<br /><br />You can set the maximum number of sources you want to show per agent message (defaulted to 1).

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Show-source-url-kb-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=34c5c90c9a3ea1399360438928b2e1cb" alt="Show Source Url Kb Docs 1" width="2192" height="1232" data-path="images/Show-source-url-kb-docs-1.png" />
</Update>

<Update label="January 27th, 2026" tags={["Added"]}>
  ## Async functions and API tools

  You can now run Function and API tool steps asynchronously.

  Async execution allows the conversation to continue immediately without waiting for the tools to complete. No outputs or variables from the step will be returned or updated.

  This is ideal for non-blocking tasks such as logging, analytics, telemetry, or background reporting that don’t affect the conversation.

  Note: This setting applies to the reference of the Function or API tool - either where the tool is attached to an agent or where it’s used as a step on the canvas. It is not part of the underlying API or function definition, which allows the same tool to be reused with different async behaviour throughout your project.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_27th,_2026_Async_functions_and_API_tools/e0054d0f209b16ded7284c4b9d5bcec0b547d01f8637dde9c05994c767e887cc-CleanShot_2026-01-27_at_14.45.392x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a7db0bd809136662a82d07b17091b463" alt="Async functions and API tools" width="2820" height="1986" data-path="images/changelog_images/January_27th,_2026_Async_functions_and_API_tools/e0054d0f209b16ded7284c4b9d5bcec0b547d01f8637dde9c05994c767e887cc-CleanShot_2026-01-27_at_14.45.392x.png" />
</Update>

<Update label="January 8th, 2026" tags={["Added"]}>
  ## Tool messages

  Tool messages let you define static messages that are surfaced to the user as a tool progresses through its lifecycle:

  1. Start - Message delivered when the tool is initiated
  2. Complete - Message delivered when the tool finishes successfully
  3. Failed - Message delivered if the tool encounters an error
  4. Delayed - Message delivered if the tool takes longer than a specified duration (default: 3000ms, configurable)

  This provides clear, predictable feedback during tool execution, improving transparency and user trust - especially for long-running or failure-prone tools.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_8th,_2026_Tool_messages/e10e6fa4e60475d5c2cb53d537599101b5fe8307f4f4fd9216234163a8522078-CleanShot_2026-01-08_at_10.32.522x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=3a955ac3a713b0b8dce74863f6913fd1" alt="Tool messages" width="3456" height="1984" data-path="images/changelog_images/January_8th,_2026_Tool_messages/e10e6fa4e60475d5c2cb53d537599101b5fe8307f4f4fd9216234163a8522078-CleanShot_2026-01-08_at_10.32.522x.png" />
</Update>

<Update label="January 8th, 2026" tags={["Added"]}>
  ## GPT 5.2

  Added global support for GPT 5.2

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_8th,_2026_GPT_5.2/dac926fc53de12728c51e5dbaa6a112b6bda8d71d010496438da27405be57a9a-CleanShot_2026-01-08_at_10.27.372x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=03fef901262bdb7d5b2e93dda4adb683" alt="GPT 5.2" width="888" height="540" data-path="images/changelog_images/January_8th,_2026_GPT_5.2/dac926fc53de12728c51e5dbaa6a112b6bda8d71d010496438da27405be57a9a-CleanShot_2026-01-08_at_10.27.372x.png" />
</Update>

<Update label="December 5th, 2025" tags={["Added"]}>
  ## Voice mode in web widget

  Your web widget now supports hands-free, real-time voice conversations. Enable it from the Widget tab for existing projects - it’s on by default for new ones.

  Users can talk naturally, see transcripts stream in instantly, and get a frictionless voice-first experience. It also doubles as the perfect in-browser way to test your phone conversations - no dialing in, just open the widget and run the full voice flow instantly.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/6304f2fa3891792ea71fe42cdfde7853afbc31cf5eaa2355cf77f5d26e7f287b-ezgif-8a4a7d6c05eab371.gif?s=9c93db7e3bfeba0a4bdb5ca540c6813f" alt="Voice mode in web widget" width="800" height="963" data-path="images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/6304f2fa3891792ea71fe42cdfde7853afbc31cf5eaa2355cf77f5d26e7f287b-ezgif-8a4a7d6c05eab371.gif" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/5caa633ab568f04e526e166d3c996555e62606f007baabe3512235e2a3617228-CleanShot_2025-12-05_at_10.04.432x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=6ce9819fb3310dc26a36b7aadf56bba0" alt="Voice mode in web widget" width="3456" height="1986" data-path="images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/5caa633ab568f04e526e166d3c996555e62606f007baabe3512235e2a3617228-CleanShot_2025-12-05_at_10.04.432x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/8ac89748035ec2b298f47ce90cee81dbde2e8e7d79cb5a034deda91dfe34195c-CleanShot_2025-12-05_at_10.05.462x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=6e3b11478cf6b10cb566b5293c48652d" alt="Voice mode in web widget" width="3456" height="1984" data-path="images/changelog_images/December_5th,_2025_Voice_mode_in_web_widget/8ac89748035ec2b298f47ce90cee81dbde2e8e7d79cb5a034deda91dfe34195c-CleanShot_2025-12-05_at_10.05.462x.png" />
</Update>

<Update label="November 27th, 2025" tags={["Added"]}>
  ## Native web search tool

  We’ve shipped a native Web Search tool so your agents can look up real-time information on the web mid-conversation - no custom integrations required.

  * Toggle on the web search tool in any agent to answer questions that need live data (news, prices, schedules, etc.).
  * Configure search prompts and guardrails so the agent only pulls what you want it to.
  * Results are summarized and grounded back into the conversation for more accurate, up-to-date answers.
  * Toggle on the web search tool in any agent to answer questions that need live data (news, prices, schedules, etc.).
  * Configure search prompts and guardrails so the agent only pulls what you want it to.
  * Results are summarized and grounded back into the conversation for more accurate, up-to-date answers.
  * Toggle on the web search tool in any agent to answer questions that need live data (news, prices, schedules, etc.).
  * Configure search prompts and guardrails so the agent only pulls what you want it to.
  * Results are summarized and grounded back into the conversation for more accurate, up-to-date answers.

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/November_27th,_2025_Native_web_search_tool/4833aab6f3db28b0a3b9dbf9fa9e31be34ceb2be7b8f72595e0b55422fbb48e0-CleanShot_2025-11-27_at_09.38.572x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=30eee44b19d001431912cf8e0631edd3" alt="Native web search tool" width="1646" height="1018" data-path="images/changelog_images/November_27th,_2025_Native_web_search_tool/4833aab6f3db28b0a3b9dbf9fa9e31be34ceb2be7b8f72595e0b55422fbb48e0-CleanShot_2025-11-27_at_09.38.572x.png" />
</Update>

<Update label="November 11th, 2025" tags={["Added"]}>
  ## Telnyx telephony integration

  You can now connect your Telnyx account to import and manage phone numbers directly in RelVoca, enabling Telnyx as your telephony provider for both inbound and outbound calls..

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/November_11th,_2025_Telnyx_telephony_integration/d574df792ae922fdf58b842a3d219a9406cc8621a954d9d3e6183d6103bf244c-CleanShot_2025-11-11_at_10.05.202x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=dcca8fced7797576749a8f27987c4963" alt="Telnyx telephony integration" width="1320" height="1080" data-path="images/changelog_images/November_11th,_2025_Telnyx_telephony_integration/d574df792ae922fdf58b842a3d219a9406cc8621a954d9d3e6183d6103bf244c-CleanShot_2025-11-11_at_10.05.202x.png" />
</Update>

<Update label="November 10th, 2025" tags={["Added"]}>
  ## Native support for keypad input (DTMF)

  Added native support for DTMF keypad input in phone conversations. Users can now enter digits via their phone keypad, sending a DTMF trace to the runtime. Configure timeout and delimiters (#, \*) to control when input is processed. See [documentation here](/docs/docs/dtmf#/).

  * Keypad input is off by default and can be turned on from Settings/Behaviour/Voice.
  * When on in project settings, keypad input can be turned off at the step level via the "Listen for other triggers" toggle.
  * [View full documentation here](/docs/docs/dtmf#/)
  * Keypad input is off by default and can be turned on from Settings/Behaviour/Voice.
  * When on in project settings, keypad input can be turned off at the step level via the "Listen for other triggers" toggle.
  * [View full documentation here](/docs/docs/dtmf#/)
  * Keypad input is off by default and can be turned on from Settings/Behaviour/Voice.
  * When on in project settings, keypad input can be turned off at the step level via the "Listen for other triggers" toggle.
  * [View full documentation here](/docs/docs/dtmf#/)

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/November_10th,_2025_Native_support_for_keypad_input_(DTMF)/cde84932767adb0d81388512a5095eb21cdd6f3d9d2f7ae5ac97cb384842ec6c-CleanShot_2025-11-10_at_11.50.552x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=083688f25ac0bb9167c1fe01f4f3d6b3" alt="Native support for keypad input (DTMF)" width="1420" height="750" data-path="images/changelog_images/November_10th,_2025_Native_support_for_keypad_input_(DTMF)/cde84932767adb0d81388512a5095eb21cdd6f3d9d2f7ae5ac97cb384842ec6c-CleanShot_2025-11-10_at_11.50.552x.png" />
</Update>

<Update label="October 31st, 2025" tags={["Added"]}>
  ## Knowledge base metadata

  Add metadata to your Knowledge Base sources to deliver more relevant, localized, and precise answers, helping customers find what they need faster and improving overall resolution speed.

  1. Adding metadata on knowledge import

  When uploading files, URLs, or tabular data to the Knowledge Base, you can attach metadata at import time. This metadata is stored with each document or data chunk, enabling structured filtering and contextual retrieval later. For example, when importing car rental policies, you might tag each file with metadata like "locale": "US, CA, EU", or "serviceType": "car\_rental, equipment\_rental". This ensures that when the agent queries using metadata filters (static or dynamic), it only retrieves content relevant to the user’s local region or service context.

  2. Dynamically, or statically apply metadata at runtime

  From the Knowledge Base tool in your agent, define the metadata your agent should use when querying the tool. You can specify a static value (or variable) to consistently filter results, or let the agent dynamically assign metadata at runtime - allowing it to query the Knowledge Base contextually based on each unique conversation.

  Example - Car Booking Service

  If your Knowledge Base includes information for multiple locales (eg: US, CA, EU), you can set a metadata field like locale. Instead of hardcoding a single locale, the agent can dynamically apply the user’s locale at runtime - for example:

  If a user says “I want to book a car in New York,” the agent automatically filters Knowledge Base results with locale: US, ensuring responses only reference policies, pricing, and availability relevant to that locale.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_31st,_2025_Knowledge_base_metadata/bcc1ce71b0660cc042cf8da92ab81eaaf7e45b3a547a03b10d65f2effff61d6e-CleanShot_2025-10-31_at_14.16.002x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=9fd71565e1df4e8e5a8d56827e546043" alt="Knowledge base metadata" width="3456" height="1982" data-path="images/changelog_images/October_31st,_2025_Knowledge_base_metadata/bcc1ce71b0660cc042cf8da92ab81eaaf7e45b3a547a03b10d65f2effff61d6e-CleanShot_2025-10-31_at_14.16.002x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_31st,_2025_Knowledge_base_metadata/1b06a1504f441c32a5b2d5746d8d6fe98091cb9b067257eec9d3ed992e95553d-CleanShot_2025-10-31_at_14.16.362x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a643ea7077d65e39021196c07aaa4413" alt="Knowledge base metadata" width="3456" height="1984" data-path="images/changelog_images/October_31st,_2025_Knowledge_base_metadata/1b06a1504f441c32a5b2d5746d8d6fe98091cb9b067257eec9d3ed992e95553d-CleanShot_2025-10-31_at_14.16.362x.png" />
</Update>

<Update label="October 29th, 2025" tags={["Added"]}>
  ## Built-in time variables

  We’ve added a set of built-in time variables that make it easier to access and use time within your agents - no external API calls or workarounds required. Perfect for agents that depend on current or relative time inputs.

  Project timezone can be set in project/behaviour settings:

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_29th,_2025_Built-in_time_variables/fcdef0273694a068b2457af8856cdf7b52a68596e25749ff4aa5e76794689709-CleanShot_2025-10-29_at_13.28.47.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=6701380b1b94bf89f58764e1c3ed323d" alt="Built-in time variables" width="1920" height="989" data-path="images/changelog_images/October_29th,_2025_Built-in_time_variables/fcdef0273694a068b2457af8856cdf7b52a68596e25749ff4aa5e76794689709-CleanShot_2025-10-29_at_13.28.47.png" />
</Update>

<Update label="October 20th, 2025" tags={["Added"]}>
  ## Deepgram Flux ASR model

  We've added [Deepgram Flux](https://flux.deepgram.com/), their ASR newest model built specifically for Voice AI.

  Flux is the first conversational speech recognition model built specifically for voice agents. Unlike traditional STT that just transcribes words, Flux understands conversational flow and automatically handles turn-taking.

  Flux tackles the most critical challenges for voice agents today: knowing when to listen, when to think, and when to speak. The model features first-of-its-kind model-integrated end-of-turn detection, configurable turn-taking dynamics, and ultra-low latency optimized for voice agent pipelines, all with Nova-3 level accuracy.

  Flux is Perfect for: turn-based voice agents, customer service bots, phone assistants, and real-time conversation tools.

  Key Benefits:

  * Smart turn detection - Knows when speakers finish talking
  * Ultra-low latency - \~260ms end-of-turn detection
  * Early LLM responses - EagerEndOfTurn events for faster replies
  * Turn-based transcripts - Clean conversation structure
  * Natural interruptions - Built-in barge-in handling
  * Nova-3 accuracy - Best-in-class transcription quality

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_20th,_2025_Deepgram_Flux_ASR_model/4e71ede01a33ca9cf97d015f803e993eb962bf42aaf877283848361aca7666f3-CleanShot_2025-10-20_at_10.29.342x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=09af1395f21f82a0d93f575ab3bae5ce" alt="Deepgram Flux ASR model" width="2526" height="1990" data-path="images/changelog_images/October_20th,_2025_Deepgram_Flux_ASR_model/4e71ede01a33ca9cf97d015f803e993eb962bf42aaf877283848361aca7666f3-CleanShot_2025-10-20_at_10.29.342x.png" />
</Update>

<Update label="October 17th, 2025" tags={["Added"]}>
  ## Sync audio and text output

  Converts text to speech in real time and keeps the spoken audio perfectly aligned with the displayed text. This ensures call transcripts are an accurate, word-for-word representation of what was actually said.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_17th,_2025_Sync_audio_and_text_output/f7c6119f62a94ea333e65e342492d3191364ab051b1d651e6817241785fcadcb-CleanShot_2025-10-17_at_10.23.332x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=79e5a4bc46c2038d5a06ccac85a8df3c" alt="Sync audio and text output" width="3456" height="1984" data-path="images/changelog_images/October_17th,_2025_Sync_audio_and_text_output/f7c6119f62a94ea333e65e342492d3191364ab051b1d651e6817241785fcadcb-CleanShot_2025-10-17_at_10.23.332x.png" />
</Update>

<Update label="October 16th, 2025" tags={["Added"]}>
  ## Transcript inactivity timeout

  This setting lets you define how long a conversation can stay inactive before the transcript automatically ends.

  This is different from session timeout - the session stays open, but the transcript closes after the set inactivity period, enabling more accurate reporting and evaluations.

  Important: ending the transcript does not end the user’s ability to re-engage. If the user responds again, a new transcript will begin within the same session.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_16th,_2025_Transcript_inactivity_timeout/87477a3dbf2126f505d672328fd71fb43f8231c0f86c4cdae8586e7cc8d3703d-CleanShot_2025-10-16_at_10.59.132x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=72a775208942175aaafdb3a1a68bcac6" alt="Transcript inactivity timeout" width="3456" height="1986" data-path="images/changelog_images/October_16th,_2025_Transcript_inactivity_timeout/87477a3dbf2126f505d672328fd71fb43f8231c0f86c4cdae8586e7cc8d3703d-CleanShot_2025-10-16_at_10.59.132x.png" />
</Update>

<Update label="October 14th, 2025" tags={["Added"]}>
  ## Priority processing for Open AI models

  We’ve added a new [Priority Processing](https://openai.com/api-priority-processing/) setting for OAI-supported models. When enabled, your requests will be given higher processing priority for faster response times and reduced latency. Note: this will consume more credits.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/October_14th,_2025_Priority_processing_for_Open_AI_models/a768c0c6aeceba9ac0b810161fca588acca242027c5053a8fb11843976128f1d-CleanShot_2025-10-14_at_16.52.132x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=b301408113bb951bf5b13463a61aa3fb" alt="Priority processing for Open AI models" width="3456" height="1986" data-path="images/changelog_images/October_14th,_2025_Priority_processing_for_Open_AI_models/a768c0c6aeceba9ac0b810161fca588acca242027c5053a8fb11843976128f1d-CleanShot_2025-10-14_at_16.52.132x.png" />
</Update>

<Update label="September 29th, 2025" tags={["Added"]}>
  ## MCP tools

  Supercharge your agents by connecting directly to MCP servers.

  * 🔌 Connect to MCP servers in just a few clicks
  * 📥 Add MCP server tools to your agents
  * 🔄 Sync MCP servers to stay up-to-date

  Bring in any tool, expand what your agents can do, and take your workflows to the next level.

  [Documentation](/docs/docs/mcp-tool#/)

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/September_29th,_2025_MCP_tools/bb4f13b06db9a8ed554515b301a4e57b7b5ee6c3985ecbb72d9baeffed70fc4e-CleanShot_2025-09-29_at_13.57.202x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=f89bf24772ba95b94a06d061fb374239" alt="MCP tools" width="3456" height="1984" data-path="images/changelog_images/September_29th,_2025_MCP_tools/bb4f13b06db9a8ed554515b301a4e57b7b5ee6c3985ecbb72d9baeffed70fc4e-CleanShot_2025-09-29_at_13.57.202x.png" />
</Update>

<Update label="September 23rd, 2025" tags={["Added"]}>
  ## Call forwarding tool in agents

  You can now enable your agents to forward calls to a different number, SIP address, or extension.

  * 📞 Seamlessly transfer callers to the right person or agent
  * 🔀 Supports phone numbers, SIP addresses, and extensions
  * 🛠️ Configure forwarding directly in your agent’s tools

  This makes it easier to connect customers with the right destination without breaking the flow of the conversation.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/September_23rd,_2025_Call_forwarding_tool_in_agents/0e2c617601290ea3c7ee4819e21575c955c342bb97b008ca82e7f542271624e6-CleanShot_2025-09-23_at_13.39.322x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=41dfe5bd71b19c9cba638772b4a3e3ab" alt="Call forwarding tool in agents" width="1968" height="1800" data-path="images/changelog_images/September_23rd,_2025_Call_forwarding_tool_in_agents/0e2c617601290ea3c7ee4819e21575c955c342bb97b008ca82e7f542271624e6-CleanShot_2025-09-23_at_13.39.322x.png" />
</Update>

<Update label="September 12th, 2025" tags={["Added"]}>
  ## Control reasoning effort for supporting GPT models

  We've added a reasoning effort slider for all supporting GPT models (GPT-5, GPT-5 mini, GPT-5 nano, GPT-o3 and GPT-o4-mini).

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/September_12th,_2025_Control_reasoning_effort_for_supporting_GPT_models/fdef0f633910a7561ac216aa297afb1e843dde68ac1595f0bd03b0bb0bfeb28a-CleanShot_2025-09-12_at_10.25.352x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=163948c406e9611d608acc1d3dc532ee" alt="Control reasoning effort for supporting GPT models" width="1018" height="906" data-path="images/changelog_images/September_12th,_2025_Control_reasoning_effort_for_supporting_GPT_models/fdef0f633910a7561ac216aa297afb1e843dde68ac1595f0bd03b0bb0bfeb28a-CleanShot_2025-09-12_at_10.25.352x.png" />
</Update>

<Update label="September 11th, 2025" tags={["Improved"]}>
  ## Shareable links now match your AI agent

  Shareable links have been upgraded to better reflect the agent you’re building. Each link now points to a hosted version of your AI agent that mirrors your selected environment (dev, staging, production) and interface, so what you share is exactly what others will experience. Password protection is also available for secure access.

  * 🔗 Sharable links now mirror your actual AI agent
  * 🛠️ Environment-specific links (dev, staging, production)
  * 🎨 Customize the look and feel via the Interfaces tab
  * 🔒 Optional password protection for secure sharing

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/September_11th,_2025_Shareable_links_now_match_your_AI_agent/2f723431f98ac5b99a9f926d5d738010cf52d5996d2de0af43a894f1f4a8db88-CleanShot_2025-09-11_at_17.42.022x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=2e4482cdc4e1c179df15dd2932c04c55" alt="Shareable links now match your AI agent" width="1152" height="766" data-path="images/changelog_images/September_11th,_2025_Shareable_links_now_match_your_AI_agent/2f723431f98ac5b99a9f926d5d738010cf52d5996d2de0af43a894f1f4a8db88-CleanShot_2025-09-11_at_17.42.022x.png" />
</Update>

<Update label="September 11th, 2025" tags={["Added"]}>
  ## Staging environment added

  We’ve introduced a new staging environment to help you manage deployments more effectively. You can now publish between development, staging, and production to test changes before going live.

  * New staging environment for pre-production testing
  * Publish across dev → staging → production
  * More control and confidence in deployment flows
  * Override secrets per environment for greater flexibility

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/September_11th,_2025_Staging_environment_added/3c355c0da66ae5d49e5554a69d27383d59d7f6004b3373fbad4a52f955ea6d95-CleanShot_2025-09-11_at_17.27.592x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a73d2347564c2f69451e9da8c2e04432" alt="Staging environment added" width="1130" height="1012" data-path="images/changelog_images/September_11th,_2025_Staging_environment_added/3c355c0da66ae5d49e5554a69d27383d59d7f6004b3373fbad4a52f955ea6d95-CleanShot_2025-09-11_at_17.27.592x.png" />
</Update>

<Update label="September 8th, 2025" tags={["Improved"]}>
  ## Duplicating projects now clones knowledge base

  You can now duplicate projects along with their entire knowledge base. When cloning a project, all connected documents and data sources are copied as well - so your new project starts with the same knowledge setup as the original.

  This enhancement only applies to project duplication. Knowledge bases are not yet cloned when using project import.
</Update>

<Update label="August 28th, 2025" tags={["Added"]}>
  ## Control saving of empty transcripts

  You can now choose whether to save transcripts where the bot spoke but the user never replied. Use this toggle to keep your transcript logs cleaner and focused on real interactions. By default, all new projects will save all conversations to transcripts.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/August_28th,_2025_Control_saving_of_empty_transcripts/2af05683580919ff481007da67c318f5ae425925b15422a309009a221b746c39-CleanShot_2025-08-28_at_12.35.012x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=1a2fb2eb2f0aaca23fafef31f408b23c" alt="Control saving of empty transcripts" width="2238" height="1052" data-path="images/changelog_images/August_28th,_2025_Control_saving_of_empty_transcripts/2af05683580919ff481007da67c318f5ae425925b15422a309009a221b746c39-CleanShot_2025-08-28_at_12.35.012x.png" />
</Update>

<Update label="August 21st, 2025" tags={["Added"]}>
  ## Save input variables in tool calls

  Previous to this release, you could only capture the output of a tool call (eg: the response from an API). Now, you can also persist the inputs (the parameters sent to the tool) as RelVoca variables. This means both sides of the transaction - request and response - can be tracked, reused, or referenced later in the conversation.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/August_21st,_2025_Save_input_variables_in_tool_calls/cdb1bdfe3d458fce34a5567b954ea6a5bcd38c261a5ce38aad63757a17adda25-CleanShot_2025-08-21_at_10.09.512x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=3403efdd4fd3790e01eeccb9fe856b38" alt="Save input variables in tool calls" width="3448" height="1980" data-path="images/changelog_images/August_21st,_2025_Save_input_variables_in_tool_calls/cdb1bdfe3d458fce34a5567b954ea6a5bcd38c261a5ce38aad63757a17adda25-CleanShot_2025-08-21_at_10.09.512x.png" />
</Update>

<Update label="August 14th, 2025" tags={["Added"]}>
  ## GPT-5 models

  GPT-5 models are now available in RelVoca.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/August_14th,_2025_GPT-5_models/a6d6d378c35236595e6a3dcef016003b4d874c0f5da8a4f93f0b0fc916d1c5f8-CleanShot_2025-08-14_at_09.46.162x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=9a5d2e53cbb626a200b6904412c7dcb5" alt="GPT-5 models" width="886" height="814" data-path="images/changelog_images/August_14th,_2025_GPT-5_models/a6d6d378c35236595e6a3dcef016003b4d874c0f5da8a4f93f0b0fc916d1c5f8-CleanShot_2025-08-14_at_09.46.162x.png" />
</Update>

<Update label="August 14th, 2025" tags={["Improved"]}>
  ## Double-click to open agent step

  You can now double-click an agent step to jump straight into its editor - saving yourself an extra click.

  <img src="https://mintcdn.com/voiceflow-009a8802/4w80VjSYHtllKRvi/images/changelog_images/August_14th,_2025_Double-click_to_open_agent_step/1564e6b9febc8f40654a47e8b9d86b0fad9a813bba9d029ddda98bec39213aa5-CleanShot_2025-08-14_at_09.43.58.gif?s=3268e57a90ee45f080bf8709771d2009" alt="Double-click to open agent step" width="2000" height="1150" data-path="images/changelog_images/August_14th,_2025_Double-click_to_open_agent_step/1564e6b9febc8f40654a47e8b9d86b0fad9a813bba9d029ddda98bec39213aa5-CleanShot_2025-08-14_at_09.43.58.gif" />
</Update>

<Update label="August 5th, 2025" tags={["Added"]}>
  ## Tool step

  You can now run tools outside of the agent step using the new Tool Step.

  This lets you trigger any tool in your agent - like sending an email or making an API call - anywhere in your workflows.

  🛠️ You’ll find the call forwarding Step in the ‘Dev’ section of the step menu for now.

  Tools can also be used as actions:

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/August_5th,_2025_Tool_step/d18a9ac48b14f06f0fd40e95b018fd0582d1dbfce7a2672be83157afc34594d4-CleanShot_2025-08-05_at_14.08.182x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=96457b7a0e8f60f52aace75247997612" alt="Tool step" width="1980" height="1092" data-path="images/changelog_images/August_5th,_2025_Tool_step/d18a9ac48b14f06f0fd40e95b018fd0582d1dbfce7a2672be83157afc34594d4-CleanShot_2025-08-05_at_14.08.182x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/August_5th,_2025_Tool_step/602171e884646385bb4ffe102dd0eab33704537db3e893ce070d1362cc7a11fd-CleanShot_2025-08-05_at_14.12.282x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=8bc2a6c45aa46efce62da1ae4be7edce" alt="Tool step" width="1494" height="890" data-path="images/changelog_images/August_5th,_2025_Tool_step/602171e884646385bb4ffe102dd0eab33704537db3e893ce070d1362cc7a11fd-CleanShot_2025-08-05_at_14.12.282x.png" />
</Update>

<Update label="August 5th, 2025" tags={["Added"]}>
  ## New analytics API

  A few months ago, we released a new analytics view - giving you deeper insights into agent performance, tool usage, credit consumption, and more.

  Today, we're releasing an updated [Analytics API](/docs/reference/querypubliccontroller_queryusagev2#/) to match. This new version gives you programmatic access to the same powerful data, so you can:

  Track agent performance over time

  Monitor tool and credit usage

  Build custom dashboards and reports

  Use the new API to integrate analytics directly into your workflows and get the insights you need - where you need them.
</Update>

<Update label="July 29th, 2025" tags={["Added"]}>
  ## Custom query control & chunk limit for knowledge base tool

  You now have more control over how your agents retrieve knowledge. Customize the query your agent uses to search the knowledge base, and fine-tune the chunk size limit to better match your content. This gives you more precision, better answers, and smarter agents.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_29th,_2025_Custom_query_control_&_chunk_limit_for_knowledge_base_tool/f1b4c72d8f70e8289947d71cc6d8a955493beda32ca6a7ae0163864b7e5eae45-CleanShot_2025-07-29_at_14.54.242x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=c80cfde01a01940543dde45f1738f93a" alt="Custom query control & chunk limit for knowledge base tool" width="1708" height="1684" data-path="images/changelog_images/July_29th,_2025_Custom_query_control_&_chunk_limit_for_knowledge_base_tool/f1b4c72d8f70e8289947d71cc6d8a955493beda32ca6a7ae0163864b7e5eae45-CleanShot_2025-07-29_at_14.54.242x.png" />
</Update>

<Update label="July 28th, 2025" tags={["Added"]}>
  ## Better transcripts. Custom evaluations. Better AI agents.

  Your AI agents just got a massive upgrade:

  [**🔥 What’s new**](#-whats-new)

  * Transcripts, reimagined - Replay calls, debug step-by-step, filter with precision, and visualize user actions like button clicks - all in a faster, cleaner UI.
  * Evaluations, your way - Define what “good” looks like with customizable evaluation templates, multiple scoring types (rating, binary, text), auto-run support, and performance tracking over time.

  [**📝 Transcripts**](#-transcripts)

  A full overhaul of the transcripts experience, built to help teams analyze, debug, and improve agents faster.

  1. Call recordings - Replay conversations to hear how your agent performs in the real world
  2. Robust debug logs - Trace agent decisions step-by-step
  3. Granular filtering - Slice data by time, user ID, evaluation result, and more
  4. Button click visualization - See exactly where users clicked in the conversation
  5. Cleaner UI - Faster load times, more usable data

  [**📊 Evaluations**](#-evaluations)

  Define what “good” looks like - and measure it, your way. Build (or generate) your own evaluation criteria, tailor analysis to your business goals, and iterate with confidence.

  Eval types - support for:

  1. ⭐ Rating evals (eg: 1-5)
  2. ✅ Binary evals (Pass/Fail)
  3. 📝 Text evals (open-ended notes)

  Also includes:

  * Batch or auto-run - Evaluate hundreds of transcripts in a few clicks, or automatically as they come in
  * Analytics & logs - See detailed results per message or overall trends over time

  [**APIs**](#apis)

  * We've release a brand new [Evaluations API](/docs/documentation/measure/evaluations)
  * We've release a new [Transcripts API](/docs/documentation/measure/transcripts) The legacy Transcripts API is still supported and currently has no deprecation timeline

  🕓 Transition Period: Until September 28, 2025, all transcripts will be available in the legacy view, for existing projects. On September 28th, 2025 the old view will be hidden and the new transcripts view will be the default. Transcripts older than 60 days will still be accessible via API for the foreseeable future.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./dad6eeed328350abb2f607579fd2cc50fe8e69b782b1c380bedeed85c5f512c0-System_shows_overview_when_call_recording_exists.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=871935871fa6dc656a245513fb7530b8" alt="Better transcripts. Custom evaluations. Better AI agents." width="2970" height="1800" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./dad6eeed328350abb2f607579fd2cc50fe8e69b782b1c380bedeed85c5f512c0-System_shows_overview_when_call_recording_exists.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./5948180270badf7ac43f6cd0eb37d9a3574b88a4b5db76cec7b973148753aea2-CleanShot_2025-07-28_at_15.40.012x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=aa5402498cc6e49fd748ceebda554263" alt="Better transcripts. Custom evaluations. Better AI agents." width="3448" height="1976" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./5948180270badf7ac43f6cd0eb37d9a3574b88a4b5db76cec7b973148753aea2-CleanShot_2025-07-28_at_15.40.012x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./491e374d7a68ac9a31ef3a786a2b62fff6c6ca080641278cd50c292ea919f38b-CleanShot_2025-07-28_at_15.40.592x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=db056d046b8ea8cd4bec7eeedcae5df4" alt="Better transcripts. Custom evaluations. Better AI agents." width="1192" height="1132" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./491e374d7a68ac9a31ef3a786a2b62fff6c6ca080641278cd50c292ea919f38b-CleanShot_2025-07-28_at_15.40.592x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./0a3228e567c2b655ea6aeec28c27e4ac3a5acdf30cd4cfec01858864e1fe73d0-CleanShot_2025-07-28_at_15.44.422x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=930d5826e8dca1d5b9ba8a68109a7bda" alt="Better transcripts. Custom evaluations. Better AI agents." width="2524" height="1058" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./0a3228e567c2b655ea6aeec28c27e4ac3a5acdf30cd4cfec01858864e1fe73d0-CleanShot_2025-07-28_at_15.44.422x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./7f5aeb99eacd4e96d79a3940f13812c57bd0336e6f8f85adcd4040cd3a12471d-CleanShot_2025-07-28_at_15.46.212x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a3c20d88eff021ae247dc0c4d69ee166" alt="Better transcripts. Custom evaluations. Better AI agents." width="3456" height="1982" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./7f5aeb99eacd4e96d79a3940f13812c57bd0336e6f8f85adcd4040cd3a12471d-CleanShot_2025-07-28_at_15.46.212x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./77a7875d4adfaab4378739405828eec5266961115ba4a43461475f6f5fc954c7-CleanShot_2025-07-28_at_15.51.282x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=4522deabb64ed56364368da994b4a9df" alt="Better transcripts. Custom evaluations. Better AI agents." width="2626" height="1790" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./77a7875d4adfaab4378739405828eec5266961115ba4a43461475f6f5fc954c7-CleanShot_2025-07-28_at_15.51.282x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./61290780205589b0d4e468c9ea80227aed7ef96b8cc6db35640b4a6d34d18545-CleanShot_2025-07-28_at_15.53.012x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=bc965ec2ca98d619685359f86fafbf81" alt="Better transcripts. Custom evaluations. Better AI agents." width="1318" height="824" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./61290780205589b0d4e468c9ea80227aed7ef96b8cc6db35640b4a6d34d18545-CleanShot_2025-07-28_at_15.53.012x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./04ac777f1dd48e289eab497323a2b589ec7ac68da3f92bdf11de0d5025f0bc76-CleanShot_2025-07-28_at_15.53.422x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=2a6552bc13030c1f84f5d2461fef8d3b" alt="Better transcripts. Custom evaluations. Better AI agents." width="3454" height="1984" data-path="images/changelog_images/July_28th,_2025_Better_transcripts._Custom_evaluations._Better_AI_agents./04ac777f1dd48e289eab497323a2b589ec7ac68da3f92bdf11de0d5025f0bc76-CleanShot_2025-07-28_at_15.53.422x.png" />
</Update>

<Update label="July 28th, 2025" tags={["Added"]}>
  ## Gmail tools: let your AI agents send emails

  Agents can now send emails seamlessly as part of any conversation. Whether it’s a confirmation, follow-up, or lead nurture message - the new Send Email tool makes it easy to automate communication right from your agent. Just connect your Gmail account and you’re ready to go.

  Make sure to instruct your agent on how to use this tool properly. Give it a try in the agent step!

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Gmail_tools_let_your_AI_agents_send_emails/58f98818239956c04a9688f24bf18e9ae13054bbe39d35b224a89900c92551e3-CleanShot_2025-07-28_at_10.58.502x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=427f01d770b5b7b7dd1ba0c7b033e99d" alt="Gmail tools: let your AI agents send emails" width="860" height="700" data-path="images/changelog_images/July_28th,_2025_Gmail_tools_let_your_AI_agents_send_emails/58f98818239956c04a9688f24bf18e9ae13054bbe39d35b224a89900c92551e3-CleanShot_2025-07-28_at_10.58.502x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_28th,_2025_Gmail_tools_let_your_AI_agents_send_emails/327858ba1851bba7fe132f7598587b9e9c5bf6d215549b8e04a6c28bccfe6b5f-CleanShot_2025-07-28_at_11.00.372x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=b07af55b3582f6d901c7998d53af1448" alt="Gmail tools: let your AI agents send emails" width="874" height="512" data-path="images/changelog_images/July_28th,_2025_Gmail_tools_let_your_AI_agents_send_emails/327858ba1851bba7fe132f7598587b9e9c5bf6d215549b8e04a6c28bccfe6b5f-CleanShot_2025-07-28_at_11.00.372x.png" />
</Update>

<Update label="July 25th, 2025" tags={["Added"]}>
  ## Call forwarding step

  Seamlessly connect your voice AI agent to the real world with call forwarding.

  The new call forwarding step lets your AI agent hand off calls to a real person (or another AI agent) - instantly and smoothly.

  * ✅ Route to phone numbers
  * ✅ Include optional extensions
  * ✅ Support for SIP addresses

  Build smarter, more human-ready voice agents - without sacrificing automation.

  🛠️ You’ll find the call forwarding Step in the ‘Dev’ section of the step menu for now. We’re planning to introduce a dedicated voice section soon - stay tuned!

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_25th,_2025_Call_forwarding_step/224cf13ff154677844782b7bf4699bed7ce642ea234dbb598e160c289f0a11fd-CleanShot_2025-07-25_at_15.30.062x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=0df255dedc1eb4afa7410c80466db873" alt="Call forwarding step" width="2590" height="1784" data-path="images/changelog_images/July_25th,_2025_Call_forwarding_step/224cf13ff154677844782b7bf4699bed7ce642ea234dbb598e160c289f0a11fd-CleanShot_2025-07-25_at_15.30.062x.png" />
</Update>

<Update label="July 23rd, 2025" tags={["Added"]}>
  ## Hubspot tools

  Connect your agents to Hubspot to create contacts, leads and tickets.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_23rd,_2025_Hubspot_tools/db3d1a3cefd7b9009e8645e9bffb6a7255fbe83d80fa1ab952daf36043ca6b7d-CleanShot_2025-07-23_at_08.43.552x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=2561a0d58d5d73b49b3e0af18298afb8" alt="Hubspot tools" width="762" height="596" data-path="images/changelog_images/July_23rd,_2025_Hubspot_tools/db3d1a3cefd7b9009e8645e9bffb6a7255fbe83d80fa1ab952daf36043ca6b7d-CleanShot_2025-07-23_at_08.43.552x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_23rd,_2025_Hubspot_tools/fd41399af99129a7fdbd6ccf309b3c009eaac95d8f6285efed17b6769f5d7a88-CleanShot_2025-07-23_at_08.43.182x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=27249b0a9e532b2b9be3e0e36ecba491" alt="Hubspot tools" width="858" height="752" data-path="images/changelog_images/July_23rd,_2025_Hubspot_tools/fd41399af99129a7fdbd6ccf309b3c009eaac95d8f6285efed17b6769f5d7a88-CleanShot_2025-07-23_at_08.43.182x.png" />
</Update>

<Update label="July 23rd, 2025" tags={["Added"]}>
  ## SMS messaging with Twilio tools

  Enable your agents to send SMS messages with an effortless connection to Twilio. Try it now in the agent step.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_23rd,_2025_SMS_messaging_with_Twilio_tools/7f3335cb865b702fceac3a004f97d8d1b1ce6452ace34dbe823fa34609cd2695-CleanShot_2025-07-23_at_08.39.272x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=80d41a3a0d80b1c6ae7ff4ea7968948e" alt="SMS messaging with Twilio tools" width="764" height="612" data-path="images/changelog_images/July_23rd,_2025_SMS_messaging_with_Twilio_tools/7f3335cb865b702fceac3a004f97d8d1b1ce6452ace34dbe823fa34609cd2695-CleanShot_2025-07-23_at_08.39.272x.png" />
</Update>

<Update label="July 15th, 2025" tags={["Added"]}>
  ## Create AI agents instantly - from just a prompt

  We’ve made building AI agents dramatically faster.

  You can now generate a fully-functional agent by simply describing what you want it to do. No setup. No manual flow-building. Just write a detailed prompt - and RelVoca will generate everything for you:

  ✅ Agent instructions

  ✅ Tools and workflows

  ✅ Conversation logic and components

  This means less time configuring, more time testing and refining your agent behavior.

  Today, we’re launching:

  1. Prompt-to-project generation - go from idea to working prototype in seconds
  2. Prompt-to-workflow generation - describe a capability, get a complete workflow
  3. Prompt-to-component generation - create specific tools and logic on the fly

  This is a foundational leap in how AI agents get built on RelVoca - we can’t wait to see what you create.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_15th,_2025_Create_AI_agents_instantly_from_just_a_prompt/40d95e7e1d89f36d4be0570692ded7014c035ddafad5c5889562cc53d21ceacd-CleanShot_2025-07-15_at_11.00.342x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=b3a00cab51dd8ee6ce1b44e075e3a7e5" alt="Create AI agents instantly - from just a prompt" width="3450" height="1972" data-path="images/changelog_images/July_15th,_2025_Create_AI_agents_instantly_from_just_a_prompt/40d95e7e1d89f36d4be0570692ded7014c035ddafad5c5889562cc53d21ceacd-CleanShot_2025-07-15_at_11.00.342x.png" />
</Update>

<Update label="July 10th, 2025" tags={["Added"]}>
  ## Vonage integration for telephony

  RelVoca now supports importing phone numbers from Vonage as an alternative to Twilio. Vonage offers a minor latency improvement (\~200-400ms) over Twilio, for more responsive calls.

  For more information: [https://dashboard.nexmo.com/](https://dashboard.nexmo.com/) [https://www.vonage.ca/en/communications-apis/voice/](https://www.vonage.ca/en/communications-apis/voice/)

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_10th,_2025_Vonage_integration_for_telephony/d2f1ac7e4093d3874fbe4efffe808a02c392be9ebaf46dd650c0861747db3632-Capture_decran_le_2025-07-10_a_10.09.01.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=6db438190bff2f62b99f975a0b8ceac7" alt="Vonage integration for telephony" width="3024" height="1184" data-path="images/changelog_images/July_10th,_2025_Vonage_integration_for_telephony/d2f1ac7e4093d3874fbe4efffe808a02c392be9ebaf46dd650c0861747db3632-Capture_decran_le_2025-07-10_a_10.09.01.png" />
</Update>

<Update label="July 9th, 2025" tags={["Added"]}>
  ## Smarter knowledge base building with LLM chunking strategies

  Your Knowledge Base just got a major upgrade. With our new LLM chunking strategies, you can now prep your data for AI like a pro - no manual formatting needed.

  We’ve introduced 5 powerful strategies to help structure and optimize your content for maximum retrieval performance:

  🧠 Smart chunking Automatically breaks content into logical, topic-based sections. Ideal for complex documents with multiple subjects.

  ❓ FAQ optimization Generates sample questions per section, perfect for creating high-impact FAQs.

  🧹HTML & noise removal Cleans up messy website markup and boilerplate. Best used on content pulled from the web or markdown.

  📝Add topic headers Inserts short, helpful summaries above each section. Great for longform content that needs context.

  🔍 Summarize Distills each section to its key points, removing fluff. Perfect for dense reports or research.

  These chunking strategies help you get more accurate, more relevant answers from your AI - especially for data sources not originally built for Retrieval-Augmented Generation (RAG).

  Ready to make your Knowledge Base smarter? Try out some LLM chunking strategies and watch the results speak for themselves.

  Note - LLM chunking strategies use credits. Before processing, we’ll show you a clear estimate of how many credits will be used - so you’re always in control.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_9th,_2025_Smarter_knowledge_base_building_with_LLM_chunking_strategies/218badbb9bdabedac1d93a7d457c81643b923d8bf4094464d9fd44c2a709fc96-CleanShot_2025-07-09_at_13.04.402x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=0ef7138f5ea7b9473c880f319759c886" alt="Smarter knowledge base building with LLM chunking strategies" width="3456" height="1984" data-path="images/changelog_images/July_9th,_2025_Smarter_knowledge_base_building_with_LLM_chunking_strategies/218badbb9bdabedac1d93a7d457c81643b923d8bf4094464d9fd44c2a709fc96-CleanShot_2025-07-09_at_13.04.402x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_9th,_2025_Smarter_knowledge_base_building_with_LLM_chunking_strategies/b49e5d1d35b1bba5fb033cd2fbe2b1948f4c4c199b2455a34b5fc7c403442a5f-CleanShot_2025-07-09_at_13.11.332x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=85763e1e16b715f6c1b67ef8e65ad5f9" alt="Smarter knowledge base building with LLM chunking strategies" width="1214" height="740" data-path="images/changelog_images/July_9th,_2025_Smarter_knowledge_base_building_with_LLM_chunking_strategies/b49e5d1d35b1bba5fb033cd2fbe2b1948f4c4c199b2455a34b5fc7c403442a5f-CleanShot_2025-07-09_at_13.11.332x.png" />
</Update>

<Update label="July 8th, 2025" tags={["Added"]}>
  ## Make.com tool

  Connect your agents to Make.com with a couple clicks to run your automations from your RelVoca AI agents.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_8th,_2025_Make.com_tool/ff95d7b2e24e12b1b2d5ec4b74f993bde35b5321c0d8bf0197f690361e692378-CleanShot_2025-07-08_at_16.25.312x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=3341c7ba77ec6949f9aeffe3830fc3b7" alt="Make.com tool" width="902" height="656" data-path="images/changelog_images/July_8th,_2025_Make.com_tool/ff95d7b2e24e12b1b2d5ec4b74f993bde35b5321c0d8bf0197f690361e692378-CleanShot_2025-07-08_at_16.25.312x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_8th,_2025_Make.com_tool/3d942c3e8c87dda3189e7a41b6015893a3f63cb1a5dbd1d6d3385d36169fcf5c-CleanShot_2025-07-08_at_16.26.092x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=cc23b73fd9e2eb05236b2882c1cfca11" alt="Make.com tool" width="880" height="502" data-path="images/changelog_images/July_8th,_2025_Make.com_tool/3d942c3e8c87dda3189e7a41b6015893a3f63cb1a5dbd1d6d3385d36169fcf5c-CleanShot_2025-07-08_at_16.26.092x.png" />
</Update>

<Update label="July 8th, 2025" tags={["Added"]}>
  ## Airtable tools

  Connect your agents to Airtable  with a couple clicks. Supported tools include: Create records, Delete records, Get record, List records, Update records.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_8th,_2025_Airtable_tools/e7e5867509b7190c3d707a93ef857e1a5684cbf41ee31a9d2277b59c744ea17d-CleanShot_2025-07-08_at_13.33.102x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=3cba5947ccd4b56bf9a319febc9c6040" alt="Airtable tools" width="1050" height="662" data-path="images/changelog_images/July_8th,_2025_Airtable_tools/e7e5867509b7190c3d707a93ef857e1a5684cbf41ee31a9d2277b59c744ea17d-CleanShot_2025-07-08_at_13.33.102x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_8th,_2025_Airtable_tools/1b683e990ea6b611db6cae79ebe4826307eabc549bd78f92b49f58a5a7d31fd3-CleanShot_2025-07-08_at_13.33.512x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=878162bd0982497522788b24f1295a2a" alt="Airtable tools" width="884" height="928" data-path="images/changelog_images/July_8th,_2025_Airtable_tools/1b683e990ea6b611db6cae79ebe4826307eabc549bd78f92b49f58a5a7d31fd3-CleanShot_2025-07-08_at_13.33.512x.png" />
</Update>

<Update label="July 2nd, 2025" tags={["Added"]}>
  ## Agents can now automatically use buttons, cards, and carousels to enrich conversations

  By enabling these options and providing guidance on when to use (or avoid) each special tool, your agent will intelligently enhance interactions with visual tools like buttons, cards, and carousels.

  Note: these configurations are ignored during phone-based conversations, meaning it will not prohibit your ability to create multi-modal AI agents with RelVoca.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/July_2nd,_2025_Agents_can_now_automatically_use_buttons,_cards,_and_carousels_to_enrich_conversations/3ba12cb0d1f093a4efaf42fe08b7a8493ad7d3dbe799a3c41d2c0174256b458e-CleanShot_2025-07-02_at_15.46.402x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a054bd96d46723ab0c7c5bd5f834624a" alt="Agents can now automatically use buttons, cards, and carousels to enrich conversations" width="1572" height="1204" data-path="images/changelog_images/July_2nd,_2025_Agents_can_now_automatically_use_buttons,_cards,_and_carousels_to_enrich_conversations/3ba12cb0d1f093a4efaf42fe08b7a8493ad7d3dbe799a3c41d2c0174256b458e-CleanShot_2025-07-02_at_15.46.402x.png" />
</Update>

<Update label="June 28th, 2025" tags={["Deprecated"]}>
  ## \[Deprecation] Dialog Manager API Logs

  Legacy `log` traces are no longer supported, which are sent when with the query parameter `?log=true`. This system has not been updated for a significant period and is out of date, especially with new steps.

  `log` traces will no longer be returned, after Friday, July 4th, 2025.

  This affects a small subset of users and should not impact the output or performance of an agent.

  Going forward, it will be unified with a more robust `debug` trace system, along with a new debugger UI.
</Update>

<Update label="June 18th, 2025" tags={["Added"]}>
  ## New Speech-to-Text Providers

  * Added Cartesia's [Ink-Whisper](https://cartesia.ai/blog/introducing-ink-speech-to-text) STT model This leverages OpenAI's whisper model, upgraded for realtime call performance Expanded language support and selection
  * Added AssemblyAI [Universal](https://www.assemblyai.com/products/speech-to-text) STT model Advanced tuning options
  * Added specific model selection for Deepgram STT Nova-2, Nova-3, and Nova-3 Medical

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/June_18th,_2025_New_Speech-to-Text_Providers/308931b6c0f1f565e43a1639831c7b04e04043518316e3f29548008897a5ac63-Capture_decran_le_2025-06-18_a_11.52.13.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=30183ec64b3772f2274c8607f9b21b79" alt="New Speech-to-Text Providers" width="710" height="421" data-path="images/changelog_images/June_18th,_2025_New_Speech-to-Text_Providers/308931b6c0f1f565e43a1639831c7b04e04043518316e3f29548008897a5ac63-Capture_decran_le_2025-06-18_a_11.52.13.png" />
</Update>

<Update label="June 16th, 2025" tags={["Added"]}>
  ## Google Sheets tools

  Connect your agents to Google Sheets with a couple clicks. Supported tools include: Add to sheet, Create new sheet, Get rows, Get sheet, Update sheet.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/June_16th,_2025_Google_Sheets_tools/22fca54c1ee9017393b89eff34a25cb4ae93272516ca657a1b9a356c409dd04c-2B.Image.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=ce26038ebcce48d6788f1541b18ce4d2" alt="Google Sheets tools" width="2110" height="1178" data-path="images/changelog_images/June_16th,_2025_Google_Sheets_tools/22fca54c1ee9017393b89eff34a25cb4ae93272516ca657a1b9a356c409dd04c-2B.Image.png" />
</Update>

<Update label="June 10th, 2025" tags={["Added"]}>
  ## Cartesia voices

  We've added Cartesia to RelVoca. You can select from over 100 new voices across two Cartesia models (Sonic 2 & Sonic Turbo).

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/June_10th,_2025_Cartesia_voices/691b75bb935dbc5c415fcd1d05c8dc849a906604bec6fda411f8b34d64ff10f4-CleanShot_2025-06-10_at_09.41.452x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=c8d393c6d395732767f10fbb913210e9" alt="Cartesia voices" width="1524" height="1298" data-path="images/changelog_images/June_10th,_2025_Cartesia_voices/691b75bb935dbc5c415fcd1d05c8dc849a906604bec6fda411f8b34d64ff10f4-CleanShot_2025-06-10_at_09.41.452x.png" />
</Update>

<Update label="June 5th, 2025" tags={["Added"]}>
  ## Added tool usage to project analytics

  We've added all tool types to your projects analytics dashboard:

  * Integration tools
  * API tools
  * Function tools

  You can now see the number of times each tool has been used, along with the average latency and success/failure rate if you hover a specific tool.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/June_5th,_2025_Added_tool_usage_to_project_analytics/800f165abf4c0a466705c132124b8dc43f8d00bc5af8c4c4c3e8ab80a40507aa-CleanShot_2025-06-05_at_12.35.112x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=2a4ea8a076df8bba9ddb31ff2ee0f0bb" alt="Added tool usage to project analytics" width="1392" height="782" data-path="images/changelog_images/June_5th,_2025_Added_tool_usage_to_project_analytics/800f165abf4c0a466705c132124b8dc43f8d00bc5af8c4c4c3e8ab80a40507aa-CleanShot_2025-06-05_at_12.35.112x.png" />
</Update>

<Update label="June 4th, 2025" tags={["Improved"]}>
  ## New workspace dashboard

  * We've made updates to the workspace dashboard to make it easier to organize your projects, and manage your workspace.
  * We've added folders, to further organize your projects. Note, if you previously used the Kanban view (deprecated), we've automatically converted swim-lanes into folders.
  * Home tab (coming soon)
  * Community tab (coming soon)
  * Tutorials tab (coming soon)

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/June_4th,_2025_New_workspace_dashboard/aaa2c963d5fcdd01890543d5006ec74f9ea5dccdaa5386ddaaaa686f35f3b55f-User_hovers_button_and_system_exposes_tooltip.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=c7379f6eb5adfc15ed9b4881d8621f2b" alt="New workspace dashboard" width="2970" height="1800" data-path="images/changelog_images/June_4th,_2025_New_workspace_dashboard/aaa2c963d5fcdd01890543d5006ec74f9ea5dccdaa5386ddaaaa686f35f3b55f-User_hovers_button_and_system_exposes_tooltip.png" />
</Update>

<Update label="May 28th, 2025" tags={["Added"]}>
  ## New navigation

  We've listened to your feedback and made RelVoca easier to navigate. It's the same RelVoca, just faster to get around!

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_28th,_2025_New_navigation/9ec868711793385b1f8e03a3baa647bac8fd64dbb7fb55a84f590d6b6c8b4326-IA.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=591f5fe222f17336beab6dc7d616a222" alt="New navigation" width="2110" height="1178" data-path="images/changelog_images/May_28th,_2025_New_navigation/9ec868711793385b1f8e03a3baa647bac8fd64dbb7fb55a84f590d6b6c8b4326-IA.png" />
</Update>

<Update label="May 28th, 2025" tags={["Added"]}>
  ## Claude Opus 4 & Sonnet 4

  We've added Claude Opus 4 & Claude Sonnet 4 to RelVoca.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_28th,_2025_Claude_Opus_4_&_Sonnet_4/644ec398803aefb49746f1f59cab66263224d17217d67652a89c21b3a8602742-CleanShot_2025-05-28_at_11.26.232x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a78a2dab9871391ebc84bf3fe74ba064" alt="Claude Opus 4 & Sonnet 4" width="886" height="852" data-path="images/changelog_images/May_28th,_2025_Claude_Opus_4_&_Sonnet_4/644ec398803aefb49746f1f59cab66263224d17217d67652a89c21b3a8602742-CleanShot_2025-05-28_at_11.26.232x.png" />
</Update>

<Update label="May 28th, 2025" tags={["Added"]}>
  ## Gemini 2.5 Pro & 2.5 Flash

  We've added Gemini 2.5 Pro & 2.5 Flash to RelVoca.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_28th,_2025_Gemini_2.5_Pro_&_2.5_Flash/be4561c037346e4ebfd86808218ef2664756f3896b7668ac70deced78e8bf801-CleanShot_2025-05-28_at_11.24.342x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=8455aa6c8a3a03a963c19a21cafaa6f5" alt="Gemini 2.5 Pro & 2.5 Flash" width="880" height="840" data-path="images/changelog_images/May_28th,_2025_Gemini_2.5_Pro_&_2.5_Flash/be4561c037346e4ebfd86808218ef2664756f3896b7668ac70deced78e8bf801-CleanShot_2025-05-28_at_11.24.342x.png" />
</Update>

<Update label="May 23rd, 2025" tags={["Added"]}>
  ## Security Settings for Widget

  * Ability to whitelist domains
  * Ability to have a custom privacy message before users engage with your AI agent
  * Ability to not save transcripts

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_23rd,_2025_Security_Settings_for_Widget/5942a8dc9fb93339360b36087112223cc9158340c8f98ba4827f76e9a9ffc108-CleanShot_2025-05-23_at_10.54.292x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=840f6dda16afd1e1534104f162ed4837" alt="Security Settings for Widget" width="3456" height="1986" data-path="images/changelog_images/May_23rd,_2025_Security_Settings_for_Widget/5942a8dc9fb93339360b36087112223cc9158340c8f98ba4827f76e9a9ffc108-CleanShot_2025-05-23_at_10.54.292x.png" />
</Update>

<Update label="May 23rd, 2025" tags={["Added"]}>
  ## Generative No Reply

  Use generative no-reply to dynamically re-engage users that haven't responded in a while. Responses will be contextual to the conversation.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_23rd,_2025_Generative_No_Reply/b1b4864c17f068727df7342d43370a8e87cf454cafa010c3fc7d157d03f06600-CleanShot_2025-05-23_at_10.49.442x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=397be948e9565f1f90d5f8be28ba26ab" alt="Generative No Reply" width="2354" height="1598" data-path="images/changelog_images/May_23rd,_2025_Generative_No_Reply/b1b4864c17f068727df7342d43370a8e87cf454cafa010c3fc7d157d03f06600-CleanShot_2025-05-23_at_10.49.442x.png" />
</Update>

<Update label="May 16th, 2025" tags={["Added"]}>
  ## API Raw Content-Type select

  The API (agent) tool and step now have a content-type option on POST requests with a "Raw" body. This will automatically apply the `Content-Type` header, for a quality-of-life convenience.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_16th,_2025_API_Raw_Content-Type_select/88893602b6dff4f1c4b135e8b2d36cbda3223c3455ff1035e25cad1f536c9e7c-Capture_decran_le_2025-05-16_a_10.25.54.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=d238679be9bb94bb4f87317d6d2811d5" alt="API Raw Content-Type select" width="1838" height="964" data-path="images/changelog_images/May_16th,_2025_API_Raw_Content-Type_select/88893602b6dff4f1c4b135e8b2d36cbda3223c3455ff1035e25cad1f536c9e7c-Capture_decran_le_2025-05-16_a_10.25.54.png" />
</Update>

<Update label="May 16th, 2025" tags={["Added"]}>
  ## Rimelabs Arcana Voices

  Rimelabs recently released a new set of [Arcana](https://www.rime.ai/blog/introducing-arcana/) voices, that sound far more natural with intonations and speech patterns such as breathing, pauses.

  Arcana is still under development and we are working with the Rimelabs team to improve it, we're aware of some issues with consistency and slurring of speech.

  Arcana adds \~250ms of latency to the voice pipeline, roughly the same as 11labs.

  In the future it may be possible to define your own voices by description, eg: "old man with hoarse southern accent"

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_16th,_2025_Rimelabs_Arcana_Voices/af7f42336d67136e20066f2d9a66321a146e8c0be873394191947335f0b0561a-Capture_decran_le_2025-05-16_a_10.44.27.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=36c0191ab1e86f7ccb95fc2cbe278839" alt="Rimelabs Arcana Voices" width="2652" height="1630" data-path="images/changelog_images/May_16th,_2025_Rimelabs_Arcana_Voices/af7f42336d67136e20066f2d9a66321a146e8c0be873394191947335f0b0561a-Capture_decran_le_2025-05-16_a_10.44.27.png" />
</Update>

<Update label="May 16th, 2025" tags={["Added"]}>
  ## Krisp Noise Cancellation

  [**Krisp Noise Cancellation**](#krisp-noise-cancellation)

  Latency is one piece of the puzzle - but quality matters too. That’s why we’ve added [Krisp](https://krisp.ai/noise-cancellation/).

  Background noise, especially speech or music, can seriously throw off voice agents. STT systems transcribe everything they hear, so voices in a coffee shop or lyrics from background music can easily get mistaken for the user’s input, leading to weird or incorrect responses. It can also confuse the agent into thinking the user isn’t done talking, delaying responses or interrupting playback. In short: noise kills both quality and speed.

  All voice projects (web-voice widget and Twilio) automatically have Krisp noise cancellation applied.

  [**Before Krisp:**](#before-krisp)

  [**After Krisp:**](#after-krisp)

  Here are two spectrograms, the upper one visualizing the audio that would be heard by STT without Krisp, and the lower one showing the audio after having been processed with Krisp.

  Through our testing:

  We've determined that this significantly boosts the accuracy of speech detection and transcription in noisy environments: cafes, offices, on the street, background broadcasts, etc.

  Krisp noise cancellation adds \~20ms of latency to the audio pipeline, while drastically improving speech detection and transcription accuracy. This ultimately leads to faster final transcriptions, reducing overall speech-to-speech latency by \~100ms.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_16th,_2025_Krisp_Noise_Cancellation/33235bd4b6d4236c7e2fbbd51bdb6e970f1193d7179fbca544d83ecd18ac0302-image.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=83f9cd08758570f574e36de85d55391b" alt="Krisp Noise Cancellation" width="1940" height="694" data-path="images/changelog_images/May_16th,_2025_Krisp_Noise_Cancellation/33235bd4b6d4236c7e2fbbd51bdb6e970f1193d7179fbca544d83ecd18ac0302-image.png" />
</Update>

<Update label="May 15th, 2025" tags={["Added"]}>
  ## Salesforce tools

  We've added Salesforce tools to the agent step. You can now authenticate with Salesforce and add tools to enable your agent to get work done in Salesforce.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_15th,_2025_Salesforce_tools/f653802973e7700173817044e85a8287deb521de130ba10d3346a5c9583e7a99-CleanShot_2025-05-15_at_11.09.422x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=d3d92e320e0c07ed4650ea4499dd1dbc" alt="Salesforce tools" width="3456" height="1982" data-path="images/changelog_images/May_15th,_2025_Salesforce_tools/f653802973e7700173817044e85a8287deb521de130ba10d3346a5c9583e7a99-CleanShot_2025-05-15_at_11.09.422x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_15th,_2025_Salesforce_tools/fb0ea09a88d182e4c90338983fa30fc445898d5f6549792d713d49e609088ef3-CleanShot_2025-05-15_at_11.10.132x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=72a560997b7360e7d001f6bd840cf897" alt="Salesforce tools" width="888" height="1192" data-path="images/changelog_images/May_15th,_2025_Salesforce_tools/fb0ea09a88d182e4c90338983fa30fc445898d5f6549792d713d49e609088ef3-CleanShot_2025-05-15_at_11.10.132x.png" />
</Update>

<Update label="May 15th, 2025" tags={["Added"]}>
  ## Zendesk tools

  We've added Zendesk tools to the agent step. You can now authenticate with Zendesk and add tools to enable your agent to get work done in Zendesk.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_15th,_2025_Zendesk_tools/c2923a92d72b2935e840380ed569fe75ee27f3a83e114d82c029b7861fbb503d-CleanShot_2025-05-15_at_11.04.462x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=cb265b4059b9854f8be7262da15379b4" alt="Zendesk tools" width="3456" height="1980" data-path="images/changelog_images/May_15th,_2025_Zendesk_tools/c2923a92d72b2935e840380ed569fe75ee27f3a83e114d82c029b7861fbb503d-CleanShot_2025-05-15_at_11.04.462x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_15th,_2025_Zendesk_tools/12f977d52c2c69b297d5982af25906e93a3baa616dc11c683fc9afa3411fa09a-CleanShot_2025-05-15_at_11.06.062x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=52622669089e9feb05c7b9bbc7211aed" alt="Zendesk tools" width="874" height="1242" data-path="images/changelog_images/May_15th,_2025_Zendesk_tools/12f977d52c2c69b297d5982af25906e93a3baa616dc11c683fc9afa3411fa09a-CleanShot_2025-05-15_at_11.06.062x.png" />
</Update>

<Update label="May 5th, 2025" tags={["Added"]}>
  ## Voice Keywords / Multilingual Speech-to-text

  [**Keywords**](#keywords)

  For voice calls we're introducing keywords. This allows your agent to understand hard to pronounce proper nouns (like product and company names), industry jargon, phrases and more. This is an optional field.

  [**Multilingual**](#multilingual)

  We're exposing Deepgram's latest [Nova-3](https://deepgram.com/learn/introducing-nova-3-speech-to-text-api) multilingual model as an STT option, capable of understanding and transcribing 8 different languages.

  In addition, the standard English STT is being updated from Nova-2 to Nova-3, for a boost in performance.

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_5th,_2025_Voice_Keywords__Multilingual_Speech-to-text/0a8710c0887a8518f22cd3db1ce78c6c5b750a6a6e9d2ff9ffcd63a1b78b99cd-image.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=dadf2806048c794bf3b5938cc91942eb" alt="Voice Keywords / Multilingual Speech-to-text" width="1386" height="518" data-path="images/changelog_images/May_5th,_2025_Voice_Keywords__Multilingual_Speech-to-text/0a8710c0887a8518f22cd3db1ce78c6c5b750a6a6e9d2ff9ffcd63a1b78b99cd-image.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/May_5th,_2025_Voice_Keywords__Multilingual_Speech-to-text/b9809a479c576b6a77368a39162a2adc255ca8b7551ecf4ce12acb9829c7bbfe-image.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=bf4b728a660ab021d30bf0ee4cc51991" alt="Voice Keywords / Multilingual Speech-to-text" width="1362" height="568" data-path="images/changelog_images/May_5th,_2025_Voice_Keywords__Multilingual_Speech-to-text/b9809a479c576b6a77368a39162a2adc255ca8b7551ecf4ce12acb9829c7bbfe-image.png" />
</Update>

<Update label="April 29th, 2025" tags={["Added"]}>
  ## Introducing RelVoca Credits: A simpler way to track usage

  Today marks a significant milestone in RelVoca's journey as we officially launch our new credit-based billing system. This update represents a fundamental shift in how you'll track, manage, and optimize your RelVoca usage - all designed to bring greater simplicity, transparency, and predictability to your experience.

  [**What's New**](#whats-new)

  [**🎉 RelVoca Credits**](#-voiceflow-credits)

  We've completely overhauled our billing system, moving away from the complex token-based approach to a streamlined credit system that unifies tracking across all platform features:

  * Simplified Measurement: One unified credit system for all actions (calls, messages, LLM responses, TTS)
  * Predictable Costs: Clear pricing tiers that make budget planning straightforward
  * Transparent Usage: Detailed visibility into exactly how your credits are being consumed
  * Developer-Friendly: Messages only count toward credits when your agent is used in production - not when developing in-app or using shareable prototypes

  [**📊 New Usage Dashboard**](#-new-usage-dashboard)

  We've launched a brand-new Usage Dashboard that gives you comprehensive insights into your credit consumption. The dashboard allows you to:

  * View your total available and used credits
  * Track usage across all agents or drill down into specific ones
  * Monitor editor and agent allocation
  * Analyze usage patterns over time

  [**💼 Enhanced Team Management**](#-enhanced-team-management)

  Additional editor seats are now just \$50 per month with no complicated caps or restrictions. Add as many team members as needed, whenever you need them.

  [**🏢 Business Plans (formerly Teams)**](#-business-plans-formerly-teams)

  As part of this update, we're renaming our Teams plans to Business plans, with enhanced features and capabilities for enterprise customers.

  [**Resources to Help You Transition**](#resources-to-help-you-transition)

  We've created dedicated resources to help you understand and make the most of the new credit system:

  * [What are RelVoca Credits?](https://www.voiceflow.com/lessons/what-are-credits) - A comprehensive guide to understanding how credits work
  * [Introducing RelVoca Credits](https://www.voiceflow.com/pathways/introducing-voiceflow-credits) - Learn about the philosophy behind the change and how it benefits you
  * [Credit Calculator](https://www.voiceflow.com/pathways/introducing-voiceflow-credits#calculator) - Estimate your credit needs based on your specific usage patterns

  [**Frequently Asked Questions**](#frequently-asked-questions)

  What do I need to do? Use our [Credit Calculator](https://www.voiceflow.com/pathways/introducing-voiceflow-credits#calculator) to understand your usage. For most users, no action is required.

  Will my monthly bill increase? Most organizations will see a decrease in costs, particularly those with multiple editor seats. There are three changes to be aware of:

  * Annual plans now offer a 10% discount (previously 20%)
  * Editor seats now cost \$50/month with no restrictions (a price reduction)
  * Business plan (formerly Teams) base tier increases from \$125 to \$150

  Do credits roll over? Credits expire at the end of your subscription period. For monthly plans, unused credits don't roll over month-to-month. Annual subscribers receive all credits at once to use throughout the year.

  What happens if I exceed my credit allocation? You'll receive a notification as you approach your limit. There's no automatic charging - you can choose whether to upgrade to a higher credit package.

  Do messages in development count toward my credit usage? No, messages only count toward credits when your agent is used in production. Messages sent while developing in-app or when using shareable prototypes don't consume credits, giving you the freedom to build and test without worrying about credit usage.

  We're committed to making this transition as smooth as possible. If you have any questions or need assistance, please reach out to [support@voiceflow.com](mailto:support@voiceflow.com).

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/April_29th,_2025_Introducing_Voiceflow_Credits_A_simpler_way_to_track_usage/f259af3fa0edb8e739968b3109eb5233211eb514cf1c0fb6d8b8c49a5a49789b-CleanShot_2025-04-29_at_14.31.072x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=6e1689f461625418b3e20bc6f135321b" alt="Introducing RelVoca Credits: A simpler way to track usage" width="3564" height="2276" data-path="images/changelog_images/April_29th,_2025_Introducing_Voiceflow_Credits_A_simpler_way_to_track_usage/f259af3fa0edb8e739968b3109eb5233211eb514cf1c0fb6d8b8c49a5a49789b-CleanShot_2025-04-29_at_14.31.072x.png" />
</Update>

<Update label="April 25th, 2025" tags={["Added"]}>
  ## Support for OpenAI o3 and o4 mini

  [**Added:**](#added)

  * Support for OpenAI o3 and o4 mini

      <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/April_25th,_2025_Support_for_OpenAI_o3_and_o4_mini/58615952fee0758445198df58206cc46c80cf5bcbd3e099320e6f1ac6af56889-CleanShot_2025-04-25_at_12.29.162x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=090efbbd6b9dd442d575e701e03632d3" alt="Support for OpenAI o3 and o4 mini" width="672" height="624" data-path="images/changelog_images/April_25th,_2025_Support_for_OpenAI_o3_and_o4_mini/58615952fee0758445198df58206cc46c80cf5bcbd3e099320e6f1ac6af56889-CleanShot_2025-04-25_at_12.29.162x.png" />
</Update>

<Update label="April 16th, 2025" tags={["Added"]}>
  ## Support for GPT 4.1 models

  [**Added:**](#added)

  * Support for GPT 4.1, GPT 4.1 mini and GPT 4.1 nano

      <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/April_16th,_2025_Support_for_GPT_4.1_models/197ba8bb49bc606230a0d6d2bd978195d2db2131f7a288ea38084bc002c35878-CleanShot_2025-04-16_at_12.38.152x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e17180ef910023ab63ae1333fe6d4ca3" alt="Support for GPT 4.1 models" width="690" height="670" data-path="images/changelog_images/April_16th,_2025_Support_for_GPT_4.1_models/197ba8bb49bc606230a0d6d2bd978195d2db2131f7a288ea38084bc002c35878-CleanShot_2025-04-16_at_12.38.152x.png" />
</Update>

<Update label="April 11th, 2025" tags={["Fixed"]}>
  ## Minor Updates / Fixes

  [**Improvements:**](#improvements)

  * Voice Widget latency decreased by up to 750ms
  * Voice Widget now streams with more consistent linear16\@16kHz encoding

  [**Fixes:**](#fixes)

  * Reset memory when a new conversation is launched (launch request)
  * Global no reply not working on Agent steps
  * The maximum allowed length for `&#123;userID&#125;` in the [Dialog API](/docs/reference/interact-stream) will be set to 128 characters, effective April 18th
  * Unable to remove webhook URLs
  * Analytics visualization UI bug
  * Voice Widget always setting userID to test on transcripts
  * Chat Widget no audio output after page reload
  * Export variables fails when project has large number of variables
</Update>

<Update label="April 7th, 2025" tags={["Added"]}>
  ## Call Events Webhook

  [**Changes:**](#changes)

  * New support added to subscribe to call events via webhook, for both twilio IVR and voice widget projects [Call Events Documentation](/docs/reference/call-events) Webhook system is capable of broadcasting additional events in the future

      <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/April_7th,_2025_Call_Events_Webhook/ca091837ebae8d3f9d6fe47852a7037838632296c3d470780b2f9dffc9b7a57f-Capture_decran_le_2025-04-08_a_01.06.04.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=a6a8e3e178166164b84841b74c1db5e3" alt="Call Events Webhook" width="2738" height="898" data-path="images/changelog_images/April_7th,_2025_Call_Events_Webhook/ca091837ebae8d3f9d6fe47852a7037838632296c3d470780b2f9dffc9b7a57f-Capture_decran_le_2025-04-08_a_01.06.04.png" />
</Update>

<Update label="April 1st, 2025" tags={["Improved"]}>
  ## Streaming Text in Chat Widget Now Optional

  [**Changes:**](#changes)

  * Added option to disable streaming text in chat widget Stream text can now be turned off in the Modality & interface settings When disabled, the full agent response will be displayed at once instead of being streamed out. Useful for situations where streaming longer messages is not desired

      <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/April_1st,_2025_Streaming_Text_in_Chat_Widget_Now_Optional/13748170b217afac3e7304254f8b373a679efa94102b7b899c3c1e0f38a806b6-image.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=64c3d9fc81255f5d95727fd007fab825" alt="Streaming Text in Chat Widget Now Optional" width="3456" height="1982" data-path="images/changelog_images/April_1st,_2025_Streaming_Text_in_Chat_Widget_Now_Optional/13748170b217afac3e7304254f8b373a679efa94102b7b899c3c1e0f38a806b6-image.png" />
</Update>

<Update label="March 31st, 2025" tags={["Added"]}>
  ## Max Memory Turns Setting

  Conversation memory is a critical component of the Agent and Prompt steps. Having longer memory gives the LLM model more context about the conversation so far, and make better decisions based on previous dialogs.

  However, larger memory adds latency and costs more input tokens, so there is a drawback.

  Before, memory was always set to 10 turns. All new projects will now have a default of 25 turns in memory. This can now be adjusted this in the settings, up to 100 turns.

  For more information on how memory works, reference: [/docs/documentation/introduction)

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/March_31st,_2025_Max_Memory_Turns_Setting/9f442556f0bf5a4fe6fdb5d6b5a9f9307feedd50a26a4508056e975e99afb7c6-Capture_decran_le_2025-03-31_a_17.13.55.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=93cbbfb1d2089500015f519a5bf9bdfe" alt="Max Memory Turns Setting" width="2080" height="962" data-path="images/changelog_images/March_31st,_2025_Max_Memory_Turns_Setting/9f442556f0bf5a4fe6fdb5d6b5a9f9307feedd50a26a4508056e975e99afb7c6-Capture_decran_le_2025-03-31_a_17.13.55.png" />
</Update>

<Update label="March 31st, 2025" tags={["Update"]}>
  ## Agent Step, Structured Output Improvements, Gemini 2.0 Flash

  We're excited to introduce several major updates that enhance the capabilities of the Agent step and expand our model offerings. These improvements provide more flexibility, control, and opportunities for creating powerful AI agents.

  [**🧠 Agent Step: Your All-in-One Solution**](#-agent-step-your-all-in-one-solution)

  The Agent step has been supercharged to create AI agents that can intelligently respond to user queries, search knowledge bases, follow specific conversation paths, and execute functions - all within a single step. Key features include:

  * Intelligent Prompting: Craft detailed instructions to guide your agent's behavior and responses.
  * Function Integration: Connect your agent with external services to retrieve and update data.
  * Conversation Paths: Define specific flows for your agent to follow based on user intent.
  * Knowledge Base Integration: Enable your agent to automatically search your knowledge base for relevant information.

  For a comprehensive guide on using the Agent step, check out our [Agent Step Documentation](/docs/docs/agents).

  [**🎨 Expanded Support for Structured Output**](#-expanded-support-for-structured-output)

  We've significantly expanded our support for structured output, unlocking more use cases and giving you greater control over your agent's responses:

  * Arrays and Nested Arrays: You can now define arrays and nested arrays in your output structure.
  * Nested Objects: Structured output now supports nested objects, allowing for more complex data structures.

  These enhancements enable you to create more sophisticated agents that generate highly structured and detailed responses, reducing the risk of hallucinations and ensuring more accurate outputs.

  [**⚡ Gemini 2.0 Flash Support**](#-gemini-20-flash-support)

  We've added support for the Gemini 2.0 Flash model, offering you even more options for powering your AI agents. Gemini 2.0 Flash delivers exceptional performance and speed, enabling faster response times and improved user experiences.

  To start using Gemini 2.0 Flash, simply select it from the model dropdown when configuring your Agent step.

  We can't wait to see what you'll build with these new features and capabilities! As always, we welcome your feedback and suggestions as we continue to improve our platform.

  Happy building! 🛠️

  The RelVoca Team

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/March_31st,_2025_Agent_Step,_Structured_Output_Improvements,_Gemini_2.0_Flash/f9257557d4af514910389299ac712bf91e5c3df810b03601147130a2c8ddbae0-image.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=324521ece2313114ad873a2ee86ec170" alt="Agent Step, Structured Output Improvements, Gemini 2.0 Flash" width="2560" height="1440" data-path="images/changelog_images/March_31st,_2025_Agent_Step,_Structured_Output_Improvements,_Gemini_2.0_Flash/f9257557d4af514910389299ac712bf91e5c3df810b03601147130a2c8ddbae0-image.png" />
</Update>

<Update label="March 28th, 2025" tags={["Improved"]}>
  ## Variable Handling Update: Consistent Behavior for Undefined Values

  [**Changes:**](#changes)

  * Updated RelVoca variable handling for consistency in previously undefined behavior: Variables can be any JavaScript object that is JSON serializable. Any variable set to `undefined` will be saved as `null` (this conversion happens at the end of the step, so it does not affect the internal workings of JavaScript steps and functions). Functions can now return `null` (rather than throwing an error) and can no longer return `undefined` (which could cause agents to crash). Functions that attempt to return `undefined` will now return `null` (to ensure backwards compatibility).

  These changes will go info effect March 31st.
</Update>

<Update label="March 6th, 2025" tags={["Improved"]}>
  ## New Analytics Dashboard: Gain Deeper Insights into Your Agent's Performance

  We've revamped our Agent Analytics Dashboard, not only giving it a fresh new look but also introducing a range of powerful visualizations that provide unprecedented visibility into your agent's performance.

  [**🌟 New Visualizations**](#-new-visualizations)

  The updated Analytics Dashboard offers a comprehensive set of visualizations that allow you to track and analyze various aspects of your agent's performance:

  * Tokens Usage: Monitor AI token consumption over time across all models, giving you a clear picture of your agent's token utilization.
  * Total Interactions: Keep track of the total number of interactions (requests) between users and your agent over time, providing insights into engagement levels.
  * Latency Monitoring: Measure the average response time of your agent to ensure optimal performance and identify any potential bottlenecks.
  * Total Call Minutes: Gain visibility into the cumulative duration of voice calls in minutes, helping you understand the volume and significance of voice interactions.
  * Unique Users: Identify the count of distinct users interacting with your agent over time, allowing you to track adoption and growth.
  * KB Documents Usage: Analyze the frequency of knowledge base document access, with the ability to toggle between ascending and descending order to identify the most or least used documents.
  * Intents Usage: Visualize the distribution of triggered intents, with sorting options to analyze intent frequency and identify popular or underutilized intents.
  * Functions Usage: Monitor the frequency of function calls, their success/failure and latency, with sorting capabilities to identify the most or least used functions and optimize your agent's functionality.
  * Prompts Usage: Gain insights into the usage frequency of agent prompts, with the ability to toggle between ascending and descending order to analyze prompt utilization and effectiveness.

  [**📅 Data Availability**](#-data-availability)

  Please note that the new Analytics Dashboard service only has data starting from February 9th, 2025. If you require data prior to that date, you can still access it through our Analytics API.

  [**🔧 Upcoming Analytics API Update**](#-upcoming-analytics-api-update)

  We're also working on a new version of the Analytics API that will include the additional data points tracked by the new Analytics Dashboard service. Stay tuned for more information on this exciting update!

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/March_6th,_2025_New_Analytics_Dashboard_Gain_Deeper_Insights_into_Your_Agent's_Performance/d36d98733a17caf4067caaa8c564bfbe22c384f8c8d9c7aa6d103cafeebcab27-CleanShot_2025-03-06_at_12.21.11.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=0875aa270b2b297a52d14892a6e4e424" alt="New Analytics Dashboard: Gain Deeper Insights into Your Agent's Performance" width="1794" height="1122" data-path="images/changelog_images/March_6th,_2025_New_Analytics_Dashboard_Gain_Deeper_Insights_into_Your_Agent's_Performance/d36d98733a17caf4067caaa8c564bfbe22c384f8c8d9c7aa6d103cafeebcab27-CleanShot_2025-03-06_at_12.21.11.png" />
</Update>

<Update label="February 27th, 2025" tags={["Added"]}>
  ## New Models, Function Editor Enhancements, and Call Recording

  We're thrilled to announce several exciting updates that expand your AI agent building capabilities and improve your workflow. Let's dive into what's new!

  [**🧠 New Models: Deepseek R1, Llama 3.1 Instant, and Llama 3.2**](#-new-models-deepseek-r1-llama-31-instant-and-llama-32)

  We've expanded our model offerings to give you even more options for creating powerful AI agents:

  * Deepseek R1: Harness the potential of Deepseek's R1 model for enhanced natural language understanding and generation.
  * Llama 3.1 Instant: Experience lightning-fast responses with the Llama 3.1 Instant model.
  * Llama 3.2: Leverage the advanced capabilities of Llama 3.2

  These new models are available on all paid plans.

  [**⚙️ Function Editor Enhancements: Modal View and Snippets**](#️-function-editor-enhancements-modal-view-and-snippets)

  We've made some significant improvements to the Function Editor to streamline your development process:

  * Modal View: You can now open the Function Editor as a modal directly from the canvas. This allows you to make quick updates and navigate between your functions and the canvas seamlessly.
  * Snippets: We've introduced a new snippets feature that enables you to insert pre-written code snippets for common concepts in RelVoca functions.

  [**📞 Call Recording for Twilio Phone Calls**](#-call-recording-for-twilio-phone-calls)

  We're excited to introduce call recording functionality for phone calls made through Twilio:

  * Automatic Call Recording: All phone calls between users and your AI agent will now be automatically recorded.
  * Twilio Integration: The call recordings will be accessible directly in your Twilio account for easy review and management.

  You can enable this option in the Agent Settings page under Voice.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_27th,_2025_New_Models,_Function_Editor_Enhancements,_and_Call_Recording/6fbfae34da32ceb35ac2138cc8a46f8ad6a3e8a52ee82a36361296a5d1aa1edc-image.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=118bea025d7fa36479161b89a90157c5" alt="New Models, Function Editor Enhancements, and Call Recording" width="800" height="800" data-path="images/changelog_images/February_27th,_2025_New_Models,_Function_Editor_Enhancements,_and_Call_Recording/6fbfae34da32ceb35ac2138cc8a46f8ad6a3e8a52ee82a36361296a5d1aa1edc-image.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_27th,_2025_New_Models,_Function_Editor_Enhancements,_and_Call_Recording/4214cc2d8375259e8db9d11030540ebe4fdefd05ecbb5f05136a8825956cafbd-image.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=def225672c33e065f52c8ca3d29845c1" alt="New Models, Function Editor Enhancements, and Call Recording" width="727" height="1004" data-path="images/changelog_images/February_27th,_2025_New_Models,_Function_Editor_Enhancements,_and_Call_Recording/4214cc2d8375259e8db9d11030540ebe4fdefd05ecbb5f05136a8825956cafbd-image.png" />
</Update>

<Update label="February 27th, 2025" tags={["Added"]}>
  ## Retrieval-Augmented Generation (RAG) for Intent Recognition

  We're excited to announce a significant upgrade to our intent recognition system, moving from the traditional Natural Language Understanding (NLU) approach to Retrieval-Augmented Generation (RAG) model using embeddings. This transition brings notable improvements to the speed, accuracy, and overall user experience when interacting with AI agents on our platform.

  [**📅 Phased Rollout**](#-phased-rollout)

  To ensure a smooth adoption, we will be rolling out the RAG-based intent recognition system to all users in phases over the next week. This gradual deployment allows us to monitor performance and gather feedback while providing ample time for you to adjust to the new system.

  [**🆕 Default for New Projects**](#-default-for-new-projects)

  For all new projects created on our platform, the RAG-based intent recognition will be the default system. This means that new AI agents will automatically benefit from the enhanced speed, accuracy, and natural conversation capabilities offered by RAG.

  [**🌟 Faster Training and Interaction**](#-faster-training-and-interaction)

  With the new RAG system, agent training and intent recognition are now substantially faster and more efficient. For example, an agent with 37 intents and 305 utterances now trains about 20 times faster, in just around 1 second. This means quicker agent development and smoother conversations for end-users.

  [**🧠 Automatic Agent Training**](#-automatic-agent-training)

  Thanks to the advanced training speed enabled by RAG, explicit training is no longer necessary. Simply test your agent, and the training will happen automatically behind the scenes, streamlining your workflow.

  [**🎯 Enhanced Understanding of Complex Queries**](#-enhanced-understanding-of-complex-queries)

  RAG leverages embeddings to capture the deeper context and meaning behind words, even when phrased differently. This allows the system to better understand and accurately match complex, detailed questions to the appropriate intents, providing more precise responses to users.

  [**🗣️ More Natural Conversations**](#️-more-natural-conversations)

  With the improved understanding of casual language, slang, and diverse phrasing, the RAG system enables a more natural, conversational experience for users interacting with AI agents on our platform.

  [**🔄 Seamless Transition for Existing Projects**](#-seamless-transition-for-existing-projects)

  For existing projects, we will keep both the NLU and RAG systems running concurrently for a period of time. This allows you to explore the new system, test it thoroughly, and make any necessary adjustments to your agents. You can easily switch between the NLU and RAG systems in the intent classification settings within the Intents CMS.

  We're thrilled to bring you this enhanced experience and look forward to hearing your feedback as you interact with the new RAG-based intent recognition system. Your input is invaluable in helping us continue to innovate and improve our platform to better serve your needs.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_27th,_2025_Retrieval-Augmented_Generation_(RAG)_for_Intent_Recognition/57c510d9a8056fb12195a4bb1522dd15694b942f794421db4bdba86b9af825e7-CleanShot_2025-02-27_at_10.55.212x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=54bef5336eb9cd53ddd993e59f7f413c" alt="Retrieval-Augmented Generation (RAG) for Intent Recognition" width="2306" height="1622" data-path="images/changelog_images/February_27th,_2025_Retrieval-Augmented_Generation_(RAG)_for_Intent_Recognition/57c510d9a8056fb12195a4bb1522dd15694b942f794421db4bdba86b9af825e7-CleanShot_2025-02-27_at_10.55.212x.png" />
</Update>

<Update label="February 20th, 2025" tags={["Added"]}>
  ## Expanding the Possibilities of User Interaction with Voice

  In our mission to redefine how users interact with AI agents, we have introduced a new voice modality option to our web widget. This addition is a step towards creating more natural, intuitive, and engaging user experiences. By enabling voice-based conversations, we are empowering businesses to connect with their customers in a way that feels authentic and effortless.

  Voice technology has become an increasingly popular and preferred mode of interaction for many users. By integrating voice functionality into our web widget, we are meeting users where they are and providing them with a seamless way to engage with AI agents. This not only enhances the user experience but also opens up new possibilities for businesses to assist, inform, and guide their customers throughout the customer journey.

  [**Natural Voice Interaction**](#natural-voice-interaction)

  The web widget now supports voice-based communication, allowing users to speak naturally with AI agents. Businesses can integrate this feature to provide their customers with a hands-free, intuitive way to ask questions, receive recommendations, and get assistance while browsing the site.

  [**Customization Options**](#customization-options)

  The voice widget offers customization options to ensure seamless integration with your website's branding:

  * Launcher Style: Select a launcher style that complements your site's design.
  * Color Palette: Choose colors that match your brand guidelines.
  * Font Family: Pick a font that aligns with your website's typography.

  These options allow you to maintain a consistent brand experience across all customer touchpoints.

  [**Powered by Advanced Voice Tech**](#powered-by-advanced-voice-tech)

  The voice functionality in the widget leverages the best in voice technologies to deliver high-quality conversations:

  * Automated Speech Recognition: Our platform uses advanced STT technology from Deepgram to accurately transcribe user speech in real-time.
  * Organic Text-to-Speech: We've integrated with leading providers like 11 Labs and Rime to offer a variety of natural-sounding voices that bring AI agents to life.

  These technologies ensure that conversations with AI agents feel authentic, engaging, and representative of your brand's personality.

  [**Start Exploring Voice**](#start-exploring-voice)

  We invite all our users to start experimenting with the voice capabilities.

  As you explore voice functionality, we value your feedback and ideas s- join our Discord community! Your input plays a crucial role in shaping the future of voice-based interactions in the web widget and helping us refine the user experience.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_20th,_2025_Expanding_the_Possibilities_of_User_Interaction_with_Voice/e3ac8dc46c5a6247b8174a7dc6e278ff66b9e984e0eb1fb78f89547a3cc28bc0-CleanShot_2025-02-20_at_13.18.112x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=4c7a2d4d762742e6aa4187d5b345d194" alt="Expanding the Possibilities of User Interaction with Voice" width="712" height="870" data-path="images/changelog_images/February_20th,_2025_Expanding_the_Possibilities_of_User_Interaction_with_Voice/e3ac8dc46c5a6247b8174a7dc6e278ff66b9e984e0eb1fb78f89547a3cc28bc0-CleanShot_2025-02-20_at_13.18.112x.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_20th,_2025_Expanding_the_Possibilities_of_User_Interaction_with_Voice/b8a688f2e8e9a0afae8a1a07c8b1e870d22346494784dca51b7b2c3c4d59e7a5-CleanShot_2025-02-20_at_13.21.172x.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=7c6adcb4f85bcfa5c7530e3f2631d563" alt="Expanding the Possibilities of User Interaction with Voice" width="3224" height="2184" data-path="images/changelog_images/February_20th,_2025_Expanding_the_Possibilities_of_User_Interaction_with_Voice/b8a688f2e8e9a0afae8a1a07c8b1e870d22346494784dca51b7b2c3c4d59e7a5-CleanShot_2025-02-20_at_13.21.172x.png" />
</Update>

<Update label="February 11th, 2025" tags={["Added"]}>
  ## AI Fallback

  We're excited to introduce AI Fallback, a powerful new feature in beta that enhances the reliability and continuity of your AI operations. This feature ensures your AI services remain operational even during provider outages or service interruptions.

  [**🔄 Automatic Fallback Switching**](#-automatic-fallback-switching)

  AI Fallback automatically switches between models when issues arise. When your primary AI model experiences difficulties, the system seamlessly transitions to your configured backup model, ensuring continuous operation of your AI services.

  [**⚙️ Easy Configuration**](#️-easy-configuration)

  Setting up AI Fallback is straightforward:

  1. Access your agent
  2. Navigate to agent settings
  3. Set your preferred fallback model by provider

  That's all there is to it! The system handles everything else automatically.

  [**📈 Enhanced Reliability**](#-enhanced-reliability)

  AI Fallback delivers key benefits:

  * Minimizes service disruptions during model outages
  * Maintains consistent AI performance
  * Reduces operational impact of provider issues
  * Ensures business continuity

  [**🔬 Under the Hood**](#-under-the-hood)

  The system continuously monitors your primary AI model's performance and availability. When issues are detected, it automatically:

  * Identifies the next available model in your sequence
  * Switches ongoing operations to the backup model
  * Returns to the primary model once issues are resolved

  [**🚀 Getting Started**](#-getting-started)

  AI Model Fallback is available exclusively for Teams and Enterprise customers. We're excited to hear your feedback during the beta phase! 🎯

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_11th,_2025_AI_Fallback/82a47056cbe2eb31c18c1ba6c6d5f554f1a706aed46f7c185bc1075ae30ee54f-CleanShot_2025-02-12_at_14.40.10.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=36621a3eb2493a40936aff603b924245" alt="AI Fallback" width="1800" height="1088" data-path="images/changelog_images/February_11th,_2025_AI_Fallback/82a47056cbe2eb31c18c1ba6c6d5f554f1a706aed46f7c185bc1075ae30ee54f-CleanShot_2025-02-12_at_14.40.10.png" />
</Update>

<Update label="February 3rd, 2025" tags={["Added"]}>
  ## New Features: Structured Outputs and Variable Pathing

  Today we're introducing two powerful new capabilities in RelVoca: Structured Outputs and Variable Pathing. These features expand the possibilities for working with data from large language models (LLMs) in your agents. Let's explore what they enable!

  [**🎉 Structured Outputs**](#-structured-outputs)

  Structured Outputs let you define the format of the data you expect an LLM to return, giving you more control and predictability over the results.

  * In a prompt step, enable the new "JSON Output" option to specify the structure of the LLM's response.
  * Today, Structured Outputs support the following data types: String Number Boolean Integer Enum
  * Support for arrays and nested objects is planned for the near future.
  * Structured Outputs are available with `gpt-4o-mini` and `gpt-4o` models.

  [**💪 Variable Pathing**](#-variable-pathing)

  Variable Pathing provides a streamlined way to work with complex data structures in your RelVoca project.

  * Store an entire object in a single variable, then access its properties using dot notation (eg: `user.name`, `user.email`).
  * Capture Structured Output responses or API results as objects.
  * Use object properties directly in conditions, messages, and other steps.
  * Reduce the need for multiple variables to represent a single entity.

  [**🍰 Bringing it All Together**](#-bringing-it-all-together)

  Combining Structured Outputs and Variable Pathing opens up new design patterns for crafting agent experiences:

  * Define precise data requirements for LLMs to provide relevant information
  * Capture responses as feature-rich objects in a single step
  * Access and manipulate object properties throughout your project
  * Streamline your project's design while expanding its capabilities

  We're excited to see the voice experiences you create with these new tools! Feel free to share your questions and feedback with us.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_3rd,_2025_New_Features_Structured_Outputs_and_Variable_Pathing/25d61d7f71cc8f1cb7ec00a8212bfb072e07fd7df070fbef2d238f40ea1ee5b8-CleanShot_2025-02-03_at_09.41.38.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=9ae54306aa5f7821ad96e4156e441dab" alt="New Features: Structured Outputs and Variable Pathing" width="1843" height="1089" data-path="images/changelog_images/February_3rd,_2025_New_Features_Structured_Outputs_and_Variable_Pathing/25d61d7f71cc8f1cb7ec00a8212bfb072e07fd7df070fbef2d238f40ea1ee5b8-CleanShot_2025-02-03_at_09.41.38.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/February_3rd,_2025_New_Features_Structured_Outputs_and_Variable_Pathing/569b093f723d7a24b0acb66f2758988eb318d1f925852965ff0e1a54c1d8fc42-CleanShot_2025-02-03_at_09.44.36.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=8cb664a3f1645460664c1e5843966ea6" alt="New Features: Structured Outputs and Variable Pathing" width="790" height="436" data-path="images/changelog_images/February_3rd,_2025_New_Features_Structured_Outputs_and_Variable_Pathing/569b093f723d7a24b0acb66f2758988eb318d1f925852965ff0e1a54c1d8fc42-CleanShot_2025-02-03_at_09.44.36.png" />
</Update>

<Update label="January 23rd, 2025" tags={["Added"]}>
  ## RelVoca Telephony

  We're excited to announce the release of RelVoca Telephony, bringing enterprise-grade voice capabilities to your conversational experiences. This release represents a significant milestone in our mission to provide comprehensive, low-latency voice solutions for businesses of all sizes.

  [**Native Twilio Integration**](#native-twilio-integration)

  We've integrated with Twilio to make phone-based interactions as simple as possible. The new integration allows you to:

  * Import existing Twilio phone numbers directly into RelVoca
  * Associate phone numbers with specific agents
  * Configure separate numbers for development and production environments
  * Test different versions of your agent against different phone numbers

  Setting up telephony is straightforward: simply connect your Twilio account with existing phone numbers, import them into RelVoca, and assign them to your agents. Your voice experience will be live within minutes.

  [**High-Performance Voice**](#high-performance-voice)

  [**Streaming Technology**](#streaming-technology)

  We've built our telephony feature on top of our streaming API, delivering exceptional performance improvements:

  * Dramatically reduced response times
  * Near real-time agent reactions
  * Optimized voice processing pipeline

  [**Speech Recognition**](#speech-recognition)

  We've selected Deepgram to provide industry-leading Speech To Text (STT):

  * High-accuracy transcription
  * Low-latency processing
  * Support for over 20 languages

  [**Advanced Voice Capabilities**](#advanced-voice-capabilities)

  [**Outbound Calling**](#outbound-calling)

  We've introduced powerful outbound calling capabilities:

  * Programmatically initiate calls to any phone number
  * Test outbound calls directly from the RelVoca interface
  * Integrate outbound calling into your existing workflows

  [**Voice Technology Stack**](#voice-technology-stack)

  Our comprehensive voice stack includes:

  * Premium text-to-speech voices from industry leaders, such as: ElevenLabs Rime Google
  * Support for advanced telephony features through custom actions: Call forwarding DTMF handling Interruption behaviour

  [**Voice Experience Configuration**](#voice-experience-configuration)

  We've exposed detailed configuration options to fine-tune your voice experiences:

  [**Audio Settings**](#audio-settings)

  * Background audio customization
  * Audio cue configuration

  [**Interaction Parameters**](#interaction-parameters)

  * Interruption threshold controls
  * Utterance end detection
  * Response timing optimization
  * User input acceptance timing

  [**Beta Program Details**](#beta-program-details)

  [**Access and Limitations**](#access-and-limitations)

  During the beta period, all users will have access to telephony features with the following concurrent call limits:

  [**Coming Soon**](#coming-soon)

  * Enhanced call analytics and reporting
  * Additional voice customization options

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/6ae7d67b51c77b9d2792ca288ccb020648b9bb976974b5add098153c8bfe1188-CleanShot_2025-01-23_at_09.20.322x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=d883d333926e985af97dde4819effab0" alt="RelVoca Telephony" width="3493" height="2139" data-path="images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/6ae7d67b51c77b9d2792ca288ccb020648b9bb976974b5add098153c8bfe1188-CleanShot_2025-01-23_at_09.20.322x.png" />

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/e3bbcf96730659f9f946d231ff8fbbfe57aa3dfc07964a08ba437b0c2dfe23a0-CleanShot_2025-01-23_at_09.18.372x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=807b29277252e9223b76587c92b23aa4" alt="RelVoca Telephony" width="3586" height="2238" data-path="images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/e3bbcf96730659f9f946d231ff8fbbfe57aa3dfc07964a08ba437b0c2dfe23a0-CleanShot_2025-01-23_at_09.18.372x.png" />

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/1503cd01692f7c6011497cc206a5aab4a8b256c88a5ead425e0cc822db3d9365-CleanShot_2025-01-23_at_09.16.322x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=eb116752c86f8ffa60f05613fc4c523f" alt="RelVoca Telephony" width="1234" height="1342" data-path="images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/1503cd01692f7c6011497cc206a5aab4a8b256c88a5ead425e0cc822db3d9365-CleanShot_2025-01-23_at_09.16.322x.png" />

      <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/e298dce83384c9b105eb6ac87fc9a68ae190fc2129073f9fbeed140e686817c5-CleanShot_2025-01-23_at_09.13.512x.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=2e2c1a80ff4fd78698c31f4944c96c9f" alt="RelVoca Telephony" width="3592" height="2234" data-path="images/changelog_images/January_23rd,_2025_Voiceflow_Telephony/e298dce83384c9b105eb6ac87fc9a68ae190fc2129073f9fbeed140e686817c5-CleanShot_2025-01-23_at_09.13.512x.png" />
</Update>

<Update label="January 22nd, 2025" tags={["Added"]}>
  ## New AI-Native Webchat

  We're excited to announce a complete reimagining of the RelVoca webchat experience. This new version introduces AI-native capabilities, enhanced customization options, and flexible deployment methods to help you create more engaging conversational experiences.

  [**AI-Native**](#ai-native)

  Our webchat has been rebuilt from the ground up to provide a more natural, AI-driven conversation experience:

  * Streaming Text Support: Experience real-time message generation with character-by-word streaming, creating a more engaging and dynamic conversation flow. Users can see responses being crafted in real-time, similar to popular AI chat interfaces.
  * AI Disclaimers: Built-in support for displaying AI disclosure messages and customizable AI usage notifications to maintain transparency with your users.

  [**Enhanced Customization**](#enhanced-customization)

  We've significantly expanded the customization capabilities to give you more control over your chat interface:

  [**Interface Types**](#interface-types)

  You can now choose from three distinct interface modes:

  * Widget: Traditional chat window that appears in the corner of your website
  * Popover: Full-screen chat experience that overlays your content
  * Embed: Seamlessly integrate the chat interface directly into your webpage layout

  [**Visual Customization**](#visual-customization)

  The new version introduces comprehensive styling options:

  * Color System: Expanded colour palette support with primary, secondary, and accent colour definitions
  * Typography: Custom font family support
  * Launcher Variations: Classic bubble launcher with customizable icons Button-style launcher with text support

  [**Important Notes**](#important-notes)

  * Chat Persistence: Now configured through the snippet rather than UI settings.
  * Custom CSS: Maintained compatibility with most existing class names.
  * Proactive Messages: Temporarily unavailable in this release, with support coming soon

  You can find more details [here](/docs/docs/web-chat-migration).

  [**Migration**](#migration)

  For detailed instructions on migrating from the legacy webchat, please refer to our [Migration Guide](/docs/docs/web-chat-migration).

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_22nd,_2025_New_AI-Native_Webchat/d40480fe732539569c80a6019711b5a97a48f771e452f2ae4e96d1fa645aeea8-CleanShot_2025-01-22_at_12.27.41.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=69371a50c3428c7a25f4b940851b6bc8" alt="New AI-Native Webchat" width="1754" height="1072" data-path="images/changelog_images/January_22nd,_2025_New_AI-Native_Webchat/d40480fe732539569c80a6019711b5a97a48f771e452f2ae4e96d1fa645aeea8-CleanShot_2025-01-22_at_12.27.41.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/changelog_images/January_22nd,_2025_New_AI-Native_Webchat/fd18d87781702534443f2327e46efef82b3629b0f1ef76c63d8c7698f3141c2b-CleanShot_2025-01-22_at_12.28.42.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=c3f86a5a9a67f54efc25a878055e2862" alt="New AI-Native Webchat" width="1788" height="1104" data-path="images/changelog_images/January_22nd,_2025_New_AI-Native_Webchat/fd18d87781702534443f2327e46efef82b3629b0f1ef76c63d8c7698f3141c2b-CleanShot_2025-01-22_at_12.28.42.png" />
</Update>

<Update label="January 17th, 2025" tags={["Added"]}>
  ## Function libraries, starter templates and ElevenLabs support

  [**Function Libraries**](#function-libraries)

  Integrate your agent with your favorite tools using our new function libraries. Access pre-built functions for popular platforms like Hubspot, Intercom, Shopify, Zendesk, and Zapier. These functions, sourced from RelVoca and the community, make it easier than ever to connect Rev with your existing workflows. Showcase readily available integrations to your team and clients.

  [**Transcript Review Hotkeys**](#transcript-review-hotkeys)

  Reviewing transcripts just got faster and more efficient. You can now press `R` to mark a transcript as Reviewed or `S` to Save it for Later. These handy shortcut keys are perfect for power users who review a high volume of transcripts.

  [**Project Starter Templates**](#project-starter-templates)

  Getting started is now a breeze. When creating a new project, choose from a set of templates tailored for common use cases like customer support, ecommerce support, and scheduling. These templates help you hit the ground running without the need for extensive setup and customization. Ideal for new users and busy teams.

  [**Expanded Voice Support**](#expanded-voice-support)

  We now offer an even greater selection of natural-sounding AI voices. We've added support for a variety of new options from ElevenLabs and Rime. Please note that using these voices consumes AI tokens. Check them out for your projects that could benefit from additional voice choices.

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/38302c5867521b729b5528f3a368185f789faceaa26f56b2a5299439aba63f35-image.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=ac88796fbe88356620d8f71e30f4b3a8" alt="Function libraries, starter templates and ElevenLabs support" width="2908" height="1938" data-path="images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/38302c5867521b729b5528f3a368185f789faceaa26f56b2a5299439aba63f35-image.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/77882a5a4f443a06191533ec4c69abed39b0c26854b7689117bc4c475026d04f-image.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=c80aa3ac2c444fbf2e5df78e691945c5" alt="Function libraries, starter templates and ElevenLabs support" width="1170" height="1528" data-path="images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/77882a5a4f443a06191533ec4c69abed39b0c26854b7689117bc4c475026d04f-image.png" />

  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/74208dd702b61a9b683d9277b111a1c4406e74fb672a0b1f477d94c5c0e5cb29-CleanShot_2025-01-21_at_08.15.32.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=d23b11c10a3e3a0e0f9077fc4ba11b09" alt="Function libraries, starter templates and ElevenLabs support" width="1365" height="764" data-path="images/changelog_images/January_17th,_2025_Function_libraries,_starter_templates_and_ElevenLabs_support/74208dd702b61a9b683d9277b111a1c4406e74fb672a0b1f477d94c5c0e5cb29-CleanShot_2025-01-21_at_08.15.32.png" />
</Update>

<Update label="January 8th, 2025" tags={["Deprecated"]}>
  ## Important Update: Deprecation of AI Response and AI Set Steps

  This is an important update to our platform. As part of our ongoing commitment to enhancing your experience and providing the most advanced tools for AI agent development, we have made the decision to deprecate the AI Response and AI Set steps.

  What does this mean for you?

  * On February 4th, 2025, the AI Response and AI Set steps will be disabled from the step toolbar in the RelVoca interface to encourage users to move away of these deprecated steps. Existing steps will remain untouched and will continue working as per normal.
  * On June 3rd, 2025, these steps will no longer be supported. Any existing projects using these steps will need to be migrated to the new [Prompt](/docs/docs/prompt-step) and [Set](/docs/docs/variables-set) steps. We will be sending out additional communication in advance to the sunset date.

  We understand that this change may require some adjustments to your workflow, but rest assured that we are here to support you throughout this transition. The new Prompt and Set steps, along with our powerful Prompt CMS, offer even more flexibility and control over your conversational experiences.

  Some key benefits of the new approach include:

  * Centralized prompt management:[The Prompt CMS](/docs/docs/prompts-cms-and-editor) serves as a hub for all your prompts, making it easy to create, edit, and reuse them across your projects.
  * Advanced prompt configuration: Leverage system prompts, message pairs, conversation history, and variables to craft highly contextual and dynamic responses.
  * Seamless integration: The Prompt step allows you to bring your prompts directly into your conversation flows, while the Set step lets you assign prompt outputs to variables for enhanced logic and control.
  * Continued innovation: We are committed to expanding the capabilities of these new features, with exciting updates planned for the near future.

  For those using the Knowledge Base, we recommend transitioning to the[KB Search step](/docs/docs/kb-search). This step allows you to query your Knowledge Base and feed the results into a prompt, enabling even more intelligent and relevant responses.

  To help guide you through migrating from the AI steps to the Prompt step, check our walkthrough below:

  We value your feedback and are here to address any questions or concerns you may have. Our team is dedicated to ensuring a smooth transition and helping you unlock the full potential of these powerful new features.

  Thank you for your understanding and continued support. We are excited about the future of conversational AI development on RelVoca and look forward to seeing the incredible experiences you will create with these enhanced capabilities.

  Best regards,

  RelVoca
</Update>
