> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Outbound calling

> Programmatically trigger your agent to call any phone number.

<Info>
  In some regions, automated outbound calls without consent may violate local regulations. You are responsible for ensuring compliance with all relevant laws.
</Info>

Outbound calling lets your agent initiate phone calls programmatically. You can use this to automate voice interactions like welcome calls, appointment reminders, or follow-ups, triggered from tools like Zapier or your own backend scripts.

Outbound calling is supported for Twilio, Vonage, and Telnyx phone numbers. RelVoca phone numbers currently don't support outbound calling.

## Making an outbound call

To trigger an outbound call, send a `POST` request to your agent's outbound API endpoint. You can find this endpoint by opening **Phone numbers** in the sidebar, then clicking **View** in the **Outbound call API** column for your number.

<video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/outbound.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=8533207c888584bd071a95d42e2391dc" data-path="videos/outbound.mp4" />

The modal displays a ready-to-use curl command with your agent's endpoint and required headers. You can also test the call directly from this modal by entering a phone number and clicking **Call**.

## API reference

### Endpoint

```
POST https://runtime-api.voiceflow.com/v1/phone-number/<PHONE_NUMBER_ID>/outbound
```

### Headers

| Header          | Value                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `Authorization` | Your [Dialog Manager API key](/docs/documentation/introduction) |
| `Content-Type`  | `application/json`                                                                                            |

### Request body

```json theme={null}
{
  "to": "+15551234567",
  "variables": {
    "user_name": "Jane",
    "account_type": "Premium"
  },
  "amd": true
}
```

| Field       | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `to`        | The phone number to call in E.164 format (eg: `+15551234567`).               |
| `variables` | Optional. A JSON object containing variables to inject when the call starts. |
| `amd`       | Optional. Set to `true` to enable answering machine detection.               |

## Concurrency limits

Outbound calls share the same concurrency pool as inbound calls. The number of simultaneous calls you can make depends on your [plan limits](https://voiceflow.com/pricing).
