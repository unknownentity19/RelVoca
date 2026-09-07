> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Behaviour

> Fine tune your agent for optimal performance.

The Behaviour tab controls your agent's default model, session handling, and fallback responses. Settings here apply project-wide - individual playbooks can override model settings where needed.

Some settings differ depending on whether you're building a **Chat** or **Voice** project. Differences are noted below.

## Model & reasoning

### Default model

The LLM that powers your agent. Select your primary model, temperature, and max token limit. These can be overridden at the playbook level.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Default-model-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=5c33ceb33b6154866b585527e678b1ee" alt="Default Model Docs" width="1294" height="658" data-path="images/Default-model-docs.png" />

* **Model** - your primary LLM (eg: Claude 4.6 Sonnet, Gemini 2.0 Flash)
* **Temperature** - controls how creative or deterministic responses are. Lower values (closer to 0) produce more consistent output, higher values (closer to 1) introduce more variation.
* **Max tokens** - maximum response length per turn

### Memory

How many conversation turns the agent keeps in context (10-100, default 50). Higher values give the agent more history to work with but increase latency and token usage.

Memory is stored in the `{vf_memory}` variable. Most agents work well between 25-50 turns. If you're hitting token limits or noticing slow responses, try reducing this value.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Max-memory-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=ebf02d7cd6c9c9513c45d43f1cd8072c" alt="Max Memory Docs" width="1294" height="348" data-path="images/Max-memory-docs.png" />

<Info>
  Conversation memory that exceeds this turn count isn't forgotten completely. Rather it's condensed and summarized so your agent still has access to critical information, while keeping its context window small for optimal performance.
</Info>

### Faster processing

Enables faster processing for supported models. Uses more credits. Off by default. When on, you can check any model dropdown in RelVoca to see supported models.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Priority-processing-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e25b101abf8c5afd6ef587287ffb3a45" alt="Priority Processing Docs" width="1294" height="236" data-path="images/Priority-processing-docs.png" />

### Outage protection

RelVoca automatically detects model provider outages and allows you to switch to a fallback LLM provider if your primary provider goes down. Configure a fallback for each provider independently - for example, route OpenAI failures to Claude, and Anthropic failures to GPT-4.1.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Outage-protection-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=f33007afb114dd443efe3d36cfb04f51" alt="Outage Protection Docs" width="1294" height="542" data-path="images/Outage-protection-docs.png" />

<Warning>
  **Note:** your agent can perform very differently when being powered by different models.
</Warning>

### Timezone

Sets the timezone for the `{vf_now}` and other built-in time variables, and any time-aware behavior.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Timezone-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=5781d246debcea51b7e0fdb85cd57204" alt="Timezone Docs" width="1294" height="288" data-path="images/Timezone-docs.png" />

<Info>
  You can think of this as your agents internal clock. You also have access to the built-in variable`{vf_user_timezone}`.
</Info>

## Voice output

<Info>
  Voice output is also available in **chat** projects as RelVoca's chat widget handles multi-modal usecases with voice mode.
</Info>

### Provider, voice, and model

Select your TTS provider (eg: ElevenLabs, Cartesia, Rime, Google Chirp, Amazon, Microsoft), choose a voice, and pick the synthesis model. You can also connect a custom voiceID from ElevenLabs if you have one.

### Sync audio and text output

Streams TTS in real time, keeping audio synced with the text output. Off by default.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Voice-output-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=6a0aebdd8665e1af3e1eb87ed057a858" alt="Voice Output Docs" width="1294" height="812" data-path="images/Voice-output-docs.png" />

### Voice tuning

Fine-tune how the voice sounds:

* **Similarity boost** (0-1, default 0.75) - how closely the output adheres to the source voice. Higher values are more accurate but may reduce naturalness.
* **Talking speed** (0.7-1.3, default 1.00) - playback speed of the voice.
* **Stability** (0-1, default 0.50) - higher values produce more consistent output across regenerations but can sound more monotone.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Talking-speed-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=1da9587d1fedbc74e82f0c6840d690ad" alt="Talking Speed Docs" width="1294" height="726" data-path="images/Talking-speed-docs.png" />

### Pronunciation dictionary

The pronunciation dictionary rewrites words or phrases in your agent's responses before they're sent to text-to-speech. This ensures correct pronunciation of names, places, or technical terms:

* enforce brand pronunciations (`nginx` → `engine x`)
* expand abbreviations (`Dr.` → `Doctor`)
* spell out acronyms (`TTS` → `Text to Speech`)
* normalize locale spellings (`colour` → `color`)

Matching is case-insensitive and respects whole-word boundaries. The JSON view is used for bulk editing of large dictionaries.

For finer control you can use **TTS provider-specific phonetic markup** in the `to` field.

* **Cartesia** uses a proprietary IPA syntax `<<phoneme|phoneme|...>>` ([guide](https://docs.cartesia.ai/build-with-cartesia/capability-guides/custom-pronunciations))
* **ElevenLabs** (Turbo v2 / Multilingual v2 <u>only</u>) uses SSML `<phoneme>` tags with either IPA or CMU Arpabet ([guide](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#pronunciation))

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/KeEstcJ8OOnJejgd/images/pronunciation.avif?fit=max&auto=format&n=KeEstcJ8OOnJejgd&q=85&s=04fd42af34aab144ef804799f25bea96" alt="Pronunciation" width="1262" height="198" data-path="images/pronunciation.avif" />
</Frame>

### Background audio and audio cues

<Info>
  Audio cues is also available in **chat** projects as RelVoca's chat widget handles multi-modal usecases with voice mode.
</Info>

Add optional ambient audio or audio effects during conversations.

1. **Background audio** - ambient audio that plays in the background for the duration of a call
2. **Audio cue** - a subtle sound effect that plays when the agent starts thinking

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Audio-cues-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=3860949d564c4e15408ac322102bb66c" alt="Audio Cues Docs" width="1294" height="440" data-path="images/Audio-cues-docs.png" />

## Voice input

<Info>
  Voice input is also available in **chat** projects as RelVoca's chat widget handles multi-modal usecases with voice mode.
</Info>

### Provider, model, and language

Select your STT provider (eg: Deepgram, Gladia, Cartesia, AssemblyAI, Google), transcription model (eg: Flux), and language.

<Check>
  We highly recommend using the **Deepgram Flux** model. It's incredibly strong at understanding when the user is done talking, which can massively reduced the perceived latency of voice conversations.
</Check>

### Keywords

Comma-separated list of words to boost recognition for - proper nouns, product names, or industry-specific terms that standard transcription might miss.

**Good keyword examples:**

* **Product and company names**: Brand names, service names, competitor names
* **Industry-specific terminology**: Medical terms (`tretinoin`, `diagnosis`)
* **Multi-word phrases**: Common phrases in your domain (`account number`, `customer service`)
* **Proper nouns**: Names, brands, titles with appropriate capitalization (`Deepgram`, `iPhone`, `Dr. Smith`)

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Voice-input-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=2b049e912b231e313afca05d0c0e8f33" alt="Voice Input Docs" width="1294" height="784" data-path="images/Voice-input-docs.png" />

### End-of-turn detection

Controls when the agent decides the user has finished speaking:

* **End-of-turn confidence** (0.5-0.9, default 0.60) - minimum confidence score required to close a turn. Lower values make the agent more responsive, higher values wait for more certainty.
* **End-of-turn timeout** (0.5-5s, default 0.60s) - how long to wait after the user stops speaking before closing the turn, regardless of confidence. Increase this if users are getting cut off mid-sentence.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/End-of-turn-confidence-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=7cb0c6bc6360f8eef00ce97412293c15" alt="End Of Turn Confidence Docs" width="1294" height="512" data-path="images/End-of-turn-confidence-docs.png" />

### Keypad input

Allow users to input digits via keypad (DTMF) during a call. When enabled, configure:

<Info>
  Keypad input is only available in **voice** projects.
</Info>

* **Timeout** (0-10s, default 2) - how long to wait before processing the input. Set to 0 to process only after a delimiter is pressed.
* **Delimiter** - the key that signals input is complete. Options: Pound (#) or Star (\*). If both a delimiter and timeout are set, whichever comes first triggers processing.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Keypad-input-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=125dc52c0c47c74e805b5406536bd17a" alt="Keypad Input Docs" width="1294" height="770" data-path="images/Keypad-input-docs.png" />

## Session & timeout

### Session timeout (Chat projects)

Time in minutes before an inactive chat session ends (1-2,880 min (2 days), default 15 minutes). Toggle off to keep sessions alive indefinitely.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Timeout-chat-docs-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=0f24fa72757dcc9e36e8c04e15488d4a" alt="Timeout Chat Docs 2" width="1294" height="424" data-path="images/Timeout-chat-docs-2.png" />

### Session timeout (Voice projects)

How long to wait before a call is automatically ended due to inactivity (10-300 seconds, default 60).

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Timeout-voice-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=91483c11d1d37185b2eb9eb114f82e05" alt="Timeout Voice Docs" width="1294" height="314" data-path="images/Timeout-voice-docs.png" />

### Chat persistence

Controls how and whether chat history is stored between sessions.

<Info>
  Chat persistence is only available in **chat** projects.
</Info>

* **Never forget** - conversation history persists indefinitely. The user can return at any time and pick up where they left off.
* **Forget after all tabs are closed** - history is cleared when the user closes all browser tabs with the chat widget. Reopening starts a fresh session.
* **Forget after page refresh** - history is cleared every time the page reloads. Each page visit is a new conversation.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Chat-persistence.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=469c80548a4359647841d3aa09ac0672" alt="Chat Persistence" width="1294" height="334" data-path="images/Chat-persistence.png" />

## Events

Events let you trigger agent behavior from outside the conversation - a webhook, a CRM update, a system alert, or any external signal your application sends.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Events-behaviour-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=480e5619b9ed4e0389187201b1463923" alt="Events Behaviour Docs" width="1294" height="638" data-path="images/Events-behaviour-docs.png" />

To create an event, click **New event**, give it a name, and choose its behaviour:

| Behaviour                 | When to use                                                                                                                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Continue conversation** | The event updates user state without changing the conversation state. The agent keeps doing whatever it was doing.                                                                                         |
| **Return to agent**       | The event hands control back to the agent to decide what to do next. Use this when the event changes context and the agent needs to re-evaluate - for example, a priority flag being set mid-conversation. |
| **Run workflow**          | The event triggers a specific workflow directly. Use this when you know exactly what should happen - for example, an order status change should always kick off the order update flow.                     |

## Fallback

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/No-match-reply-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=6bb5572b219ba22879d37ee617943e05" alt="No Match Reply Docs" width="1294" height="400" data-path="images/No-match-reply-docs.png" />

### Global no-match

How the agent responds when it can't match any skill, user intention, or knowledge base result. Click **Edit** to configure:

* **Generative** - provide a prompt that tells the agent how to handle the situation. The agent generates a response dynamically based on your instructions.
* **Scripted** - write a fixed response that's sent every time. Use this when you want exact control over the wording.
  <Info>
    If you're building a fully agentic project, you don't need to worry about this behaviour setting. It's really for experiences that don't rely on an agent to handle un-happy path dialogs.
  </Info>

### Global no-reply

How the agent responds when the user says nothing. Off by default. When enabled, click **Edit** to configure:

* **Generative** - provide a prompt for how to re-engage the user (eg: "Ask them if they're still there, or nudge them toward the conversation's goal").
* **Scripted** - write a fixed follow-up message.
* **Inactivity time** - how many seconds of silence before the agent responds (default 10).
* **Max no-reply messages per turn** - how many times the agent will follow up before ending the session (default 5). For example, with 10 seconds and 5 attempts, the session ends after 50 seconds of total silence.
