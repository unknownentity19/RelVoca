> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Call forward

> Transfer calls from your agent to a live representative or another phone number.

<Info>
  This feature is only available on **phone** projects.
</Info>

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Callforwardingstepcover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=a33fd0cb26d68955182ca8e257622eb2" alt="Callforwardingstepcover" width="1920" height="1080" data-path="images/steps/workflows/Callforwardingstepcover.png" />

The Call forward step lets you hand off active phone conversations to real people or other phone systems. When your agent reaches this step during a call, it transfers the caller to the phone number you specify, creating a smooth transition from AI to human support or other automated systems.

## Using the Call forward step

Drag the Call forward step into a workflow and connect it to the step before it. Click on the step to configure where calls should be forwarded.

### Configuration

The Call forward step requires a phone number and supports optional extensions:

* **Phone number**: Enter the destination phone number in international format (eg: +1234567890). You can forward to standard phone numbers, international numbers, or SIP addresses.
* **Extension**: Add an extension to navigate phone menus after the call connects. This uses DTMF tones to automatically bypass IVR systems and enter menu options or extensions. The syntax depends on your telephony provider:
  * **Voiceflow-provided number, Telnyx, and Twilio**: Use `w` for a 0.5 second pause or `W` for a 1 second pause between digits. Example: `1W23` presses 1, waits 1 second, then presses 2 and 3.
  * **Vonage**: Use `p` for a 0.5 second pause between digits. Example: `1pp23` presses 1, waits 1 second, then presses 2 and 3.
* **CallerID passthrough:** On forwarded inbound calls, show the *original caller's* number as the caller ID instead of the agent's number.
  > **Note:** Not supported on Vonage numbers.
  * **Inbound:** When caller **A** reaches agent **B** and the call forwards to **C**, **C** normally sees the call from **B**. With passthrough on, **C** sees **A**'s phone number instead.
  * **Outbound:** When agent **B** calls user **A** and forwards to **C**, **C** always sees **B** - passthrough has no effect here. This is a carrier regulatory restriction.
