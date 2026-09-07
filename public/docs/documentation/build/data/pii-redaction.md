> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PII redaction

> Automatically redact personally identifiable information from transcripts.

<Callout icon="/images/icons/enterprise.svg">
  The PII redaction feature must be subscribed to by [contacting our sales team](mailto:sales@voiceflow.com).
</Callout>

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/PIIRedaction.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=e2082714c0f390204a0cfa3079355c9c" alt="PII Redaction" width="1920" height="1080" data-path="images/PIIRedaction.png" />

PII redaction automatically detects and removes personally identifiable information from your production transcripts. When enabled, data like names, email addresses, phone numbers, and financial details are replaced with generic markers (eg: `[NAME]`, `[EMAIL_ADDRESS]`) before transcripts are stored. Sensitive user information never persists in your conversation logs.

## How it works

PII is detected using a machine learning model hosted within RelVoca's infrastructure. Your data is never sent to any third-party service during the redaction process.

Key behaviours:

* **Production only.** Redaction applies only to production conversations. Development and test conversations are not redacted, so you can debug freely.
* **Not retroactive.** Enabling redaction does not affect existing transcripts. Disabling it does not unredact previously redacted transcripts. Only future conversations are affected.
* **Structure preserved.** The overall structure of your traces and requests remains the same. Only the content of specific text properties is modified.

## Enabling PII redaction

<Steps>
  <Step title="Subscribe to the PII redaction add-on">
    You can unlock the PII redaction feature by subscribing the applicable add-on. To do so, [contact our sales team](mailto:sales@voiceflow.com). If you're on an enterprise plan, reach out to your account manager to have the feature enabled for your organization.
  </Step>

  <Step title="Enable PII redaction on your project">
    Open the project that you'd like to redact PII from. Then, head to **Settings → Security** and enable the PII redaction feature.

    <Frame>
      <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-05-01-at-18.08.41@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=021b512dd2a5666e8cbe924f8278c92d" alt="Clean Shot 2026 05 01 At 18 08 41@2x" width="1516" height="352" data-path="images/CleanShot-2026-05-01-at-18.08.41@2x.png" />
    </Frame>
  </Step>

  <Step title="Repeat for other projects">
    PII redaction is a project-level setting. If you'd like to redact PII from multiple projects, enable it in **Settings → Security** on each individual project.
  </Step>
</Steps>

## Viewing unredacted transcripts

After redaction is enabled, you can temporarily view the original unredacted version of a transcript using the toggle in the transcript detail view. This is intended for debugging purposes.

<Info>
  Unredacted transcripts are only available for **48 hours** after the conversation takes place. After that, the original data is permanently deleted and cannot be recovered.
</Info>

## What gets redacted

PII redaction scans both your agent's responses (traces) and user inputs (requests), covering a wide range of PII types across different data structures.

### Detected PII types

The redaction system detects over 35 types of personally identifiable information:

| Category           | Examples                                                             |
| ------------------ | -------------------------------------------------------------------- |
| **Identity**       | Names, date of birth, age, gender, marital status, nationality       |
| **Contact**        | Email addresses, phone numbers, physical addresses, IP addresses     |
| **Financial**      | Credit card numbers, bank accounts, routing numbers, CVV codes       |
| **Government IDs** | Social Security numbers, driver's license, passport numbers, tax IDs |
| **Health**         | Medical conditions, medications, blood type, medical procedures      |
| **Authentication** | Usernames, passwords, PINs                                           |
| **Other**          | Organization names, URLs, vehicle identifiers, device IDs            |

### Protection methods

The system uses four approaches depending on the type of content:

| Method               | What it does                                                                               | Example                                          |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| **Censor**           | Replaces detected PII with markers like `[NAME]` or `[EMAIL_ADDRESS]`                      | `"Hi John"` → `"Hi [NAME]"`                      |
| **Erase**            | Sets the property to an empty string (used for content that can't be selectively redacted) | Audio URLs are removed entirely                  |
| **Override**         | Replaces the value with a safe placeholder                                                 | Image URLs are replaced with a placeholder image |
| **Censor rich text** | Strips rich text formatting and replaces content with redacted plain text                  | Slate content is flattened and censored          |

### Trace data

Traces represent the messages and content your agent sends during a conversation, including text responses, cards, carousels, and media. PII redaction processes each trace type differently depending on the properties it contains.

<AccordionGroup>
  <Accordion title="Text trace">
    **Modified properties:**

    * `payload.message`: Censor redaction
    * `payload.slate.content`: Censor rich text redaction
    * `payload.audio.src`: Erase redaction

    ```json Before redaction theme={null}
    {
      "type": "text",
      "payload": {
        "audio": {
          "message": "Hi, my name is John Smith and my email is john@email.com",
          "src": "https://example.com/audio/user-message.mp3"
        },
        "slate": {
          "id": 1,
          "content": [
            {
              "children": [
                { "text": "Hi, my name is John Smith and my email is john@email.com" }
              ]
            }
          ]
        }
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "text",
      "payload": {
        "audio": {
          "message": "Hi, my name is [NAME] and my email is [EMAIL_ADDRESS]",
          "src": ""
        },
        "slate": {
          "id": 1,
          "content": [
            {
              "children": [
                { "text": "Hi, my name is [NAME] and my email is [EMAIL_ADDRESS]" }
              ]
            }
          ]
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="Speak trace">
    **Modified properties:**

    * `payload.message`: Censor redaction
    * `payload.src`: Erase redaction

    ```json Before redaction theme={null}
    {
      "type": "speak",
      "payload": {
        "type": "message",
        "message": "Hello Sarah, your appointment at 123 Main Street is confirmed",
        "src": "https://example.com/audio/response.mp3"
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "speak",
      "payload": {
        "type": "message",
        "message": "Hello [NAME], your appointment at [LOCATION_ADDRESS] is confirmed",
        "src": ""
      }
    }
    ```
  </Accordion>

  <Accordion title="CardV2 trace">
    **Modified properties:**

    * `payload.title`: Censor redaction
    * `payload.description.text`: Censor redaction
    * `payload.description.slate`: Censor rich text redaction
    * `payload.imageUrl`: Override redaction
    * `payload.buttons[].name`: Censor redaction
    * `payload.buttons[].request.payload.label`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "cardV2",
      "payload": {
        "title": "Contact John Smith",
        "description": {
          "text": "Call John at 555-123-4567"
        },
        "imageUrl": "https://example.com/photos/john-profile.jpg",
        "buttons": [
          {
            "name": "Call John",
            "request": {
              "type": "path",
              "payload": { "label": "Contact John Smith" }
            }
          }
        ]
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "cardV2",
      "payload": {
        "title": "Contact [NAME]",
        "description": {
          "text": "Call [NAME] at [PHONE_NUMBER]"
        },
        "imageUrl": "https://cdn.voiceflow.com/assets/pii_redaction_placeholder_img.png",
        "buttons": [
          {
            "name": "Call [NAME]",
            "request": {
              "type": "path",
              "payload": { "label": "Contact [NAME]" }
            }
          }
        ]
      }
    }
    ```
  </Accordion>

  <Accordion title="Carousel trace">
    Each card in the carousel is processed the same way as a CardV2 trace.

    **Modified properties (per card):**

    * `payload.cards[].title`: Censor redaction
    * `payload.cards[].description.text`: Censor redaction
    * `payload.cards[].description.slate`: Censor rich text redaction
    * `payload.cards[].imageUrl`: Override redaction
    * `payload.cards[].buttons[].name`: Censor redaction
    * `payload.cards[].buttons[].request.payload.label`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "carousel",
      "payload": {
        "layout": "Carousel",
        "cards": [
          {
            "title": "Dr. Sarah Johnson",
            "description": {
              "text": "Cardiology specialist at Boston Medical Center"
            },
            "imageUrl": "https://example.com/photos/dr-sarah.jpg",
            "buttons": [
              {
                "name": "Book with Dr. Johnson",
                "request": {
                  "type": "Action",
                  "payload": { "label": "Schedule with Sarah Johnson" }
                }
              }
            ]
          },
          {
            "title": "Dr. Michael Chen",
            "description": {
              "text": "Located at 456 Health Ave, contact at mike@clinic.com"
            },
            "imageUrl": "https://example.com/photos/dr-chen.jpg"
          }
        ]
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "carousel",
      "payload": {
        "layout": "Carousel",
        "cards": [
          {
            "title": "Dr. [NAME]",
            "description": {
              "text": "Cardiology specialist at [ORGANIZATION]"
            },
            "imageUrl": "https://cdn.voiceflow.com/assets/pii_redaction_placeholder_img.png",
            "buttons": [
              {
                "name": "Book with Dr. [NAME]",
                "request": {
                  "type": "Action",
                  "payload": { "label": "Schedule with [NAME]" }
                }
              }
            ]
          },
          {
            "title": "Dr. [NAME]",
            "description": {
              "text": "Located at [LOCATION_ADDRESS], contact at [EMAIL_ADDRESS]"
            },
            "imageUrl": "https://cdn.voiceflow.com/assets/pii_redaction_placeholder_img.png"
          }
        ]
      }
    }
    ```
  </Accordion>

  <Accordion title="Choice trace">
    **Modified properties:**

    * `payload.buttons[].name`: Censor redaction
    * `payload.buttons[].request.payload.label`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "choice",
      "payload": {
        "buttons": [
          {
            "name": "Contact Dr. Smith",
            "request": {
              "type": "text",
              "payload": { "label": "Reach out to Dr. Smith at his office" }
            }
          },
          {
            "name": "Call Dr. Smith's office",
            "request": {
              "type": "text",
              "payload": { "label": "Phone: 555-123-4567" }
            }
          }
        ]
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "choice",
      "payload": {
        "buttons": [
          {
            "name": "Contact Dr. [NAME]",
            "request": {
              "payload": { "label": "Reach out to Dr. [NAME] at his office" }
            }
          },
          {
            "name": "Call Dr. [NAME] office",
            "request": {
              "payload": { "label": "Phone: [PHONE_NUMBER]" }
            }
          }
        ]
      }
    }
    ```
  </Accordion>

  <Accordion title="Visual trace">
    **Modified properties:**

    * `payload.image`: Override redaction

    ```json Before redaction theme={null}
    {
      "type": "visual",
      "payload": {
        "image": "https://example.com/user-photos/john-selfie.jpg",
        "visualType": "image",
        "device": "mobile",
        "dimensions": { "width": 800, "height": 600 }
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "visual",
      "payload": {
        "image": "https://cdn.voiceflow.com/assets/pii_redaction_placeholder_img.png",
        "visualType": "image",
        "device": "mobile",
        "dimensions": { "width": 800, "height": 600 }
      }
    }
    ```
  </Accordion>
</AccordionGroup>

### Request data

Requests represent user inputs sent to your agent, such as typed messages, button presses, and intent matches. These are redacted in the same way as traces to ensure PII is removed from both sides of the conversation.

<AccordionGroup>
  <Accordion title="Text request">
    **Modified properties:**

    * `payload`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "text",
      "payload": "Hi, my name is Sarah Johnson and I need help with my account. You can reach me at sarah@email.com or 555-123-4567"
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "text",
      "payload": "Hi, my name is [NAME] and I need help with my account. You can reach me at [EMAIL_ADDRESS] or [PHONE_NUMBER]"
    }
    ```
  </Accordion>

  <Accordion title="Intent request">
    **Modified properties:**

    * `payload.query`: Censor redaction
    * `payload.entities[].value`: Censor redaction

    Intent names and entity types are preserved.

    ```json Before redaction theme={null}
    {
      "type": "intent",
      "payload": {
        "intent": { "name": "book_appointment" },
        "query": "I want to book an appointment with Dr. Smith for John Doe on March 15th",
        "entities": [
          { "name": "doctor_name", "value": "Dr. Smith" },
          { "name": "patient_name", "value": "John Doe" },
          { "name": "date", "value": "March 15th" }
        ]
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "intent",
      "payload": {
        "intent": { "name": "book_appointment" },
        "query": "I want to book an appointment with Dr. [NAME] for [NAME] on [DATE]",
        "entities": [
          { "name": "doctor_name", "value": "[NAME]" },
          { "name": "patient_name", "value": "[NAME]" },
          { "name": "date", "value": "[DATE]" }
        ]
      }
    }
    ```
  </Accordion>

  <Accordion title="Path request">
    **Modified properties:**

    * `payload.label`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "path",
      "payload": {
        "label": "Contact Dr. Sarah Johnson at Boston Medical"
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "path",
      "payload": {
        "label": "Contact Dr. [NAME] at [ORGANIZATION]"
      }
    }
    ```
  </Accordion>

  <Accordion title="Message request">
    **Modified properties:**

    * `payload.message`: Censor redaction

    ```json Before redaction theme={null}
    {
      "type": "message",
      "payload": {
        "message": "Please send the invoice to john.smith@company.com and call me at 555-123-4567"
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "message",
      "payload": {
        "message": "Please send the invoice to [EMAIL_ADDRESS] and call me at [PHONE_NUMBER]"
      }
    }
    ```
  </Accordion>

  <Accordion title="Action request">
    **Modified properties:**

    * `payload.label`: Censor redaction (if present)

    ```json Before redaction theme={null}
    {
      "type": "action",
      "payload": {
        "label": "Send confirmation email to sarah.johnson@email.com"
      }
    }
    ```

    ```json After redaction theme={null}
    {
      "type": "action",
      "payload": {
        "label": "Send confirmation email to [EMAIL_ADDRESS]"
      }
    }
    ```
  </Accordion>
</AccordionGroup>

### Debug traces

Debug traces contain technical information about your agent's operation, such as model usage, latency metrics, and navigation data. These are handled differently from regular traces using an allowlist system. All properties in `payload.metadata` are redacted by default unless explicitly allowlisted.

<Accordion title="Full list of allowlisted properties">
  The following properties are preserved as-is and never redacted:

  * `userID` - User identifier
  * `versionID` - Version identifier
  * `tools` - Tool registration and agent step data
  * `model` - AI model identifiers
  * `provider` - Service provider information
  * `voice` - Voice configuration
  * `postMultiplierTokensConsumption` - Token consumption metrics
  * `variant` - Message variant information
  * `code` - Execution code
  * `latency` - Performance timing metrics
  * `maxTokens` - Token limits
  * `queryTokens` - Query token counts
  * `answerTokens` - Answer token counts
  * `temperature` - AI temperature settings
  * `tokens` - Token counts
  * `multiplier` - Token multipliers
  * `nextID` - Navigation identifiers
  * `diagramID` - Diagram identifiers
  * `intent` - Intent information
  * `confidence` - Confidence scores
  * `tokensMultiplier` - Token multiplier values
  * `tokensConsumption` - Token consumption data
  * `nodeID` - Node identifiers
  * `result` - Result data
  * `status` - Status information
  * `tokenConsumption` - Token consumption data
</Accordion>

All other properties are replaced with PII detection markers or the message `[Restricted due to potential PII]`. This ensures new debug metadata properties are automatically protected until explicitly reviewed.

### Redaction examples

These quick examples show how common types of PII appear in your transcript data before and after redaction is applied:

**Text content:**

* Before: `"Hello, I'm Sarah Johnson from Acme Corp"`
* After: `"Hello, I'm [NAME] from [ORGANIZATION]"`

**Contact information:**

* Before: `"Call me at 555-123-4567 or email sarah@acme.com"`
* After: `"Call me at [PHONE_NUMBER] or email [EMAIL_ADDRESS]"`

**Address information:**

* Before: `"I live at 123 Main St, Boston, MA 02101"`
* After: `"I live at [LOCATION_ADDRESS], [LOCATION_CITY], [LOCATION_STATE] [LOCATION_ZIP]"`

## Limitations

There are a few things to keep in mind when using PII redaction. These limitations are by design to balance privacy protection with usability.

* **Development conversations are not redacted.** Only production conversations are processed.
* **Redaction is not retroactive.** Enabling or disabling PII redaction only affects future conversations.
* **Audio is erased entirely.** Audio URLs are set to empty strings because audio content cannot be selectively edited to remove only PII.
* **Images are replaced with a placeholder.** All image URLs are overridden with a standard placeholder to prevent potential PII exposure through images.
* **Detection is English only.** The PII detection model analyzes text in English.
