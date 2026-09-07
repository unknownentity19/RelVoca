> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent tools

> Pre-built integrations to the platforms you already use.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Integrations-section-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=fff0b47920d7b835921f3763f99c5874" alt="Integrations Section Docs" width="2308" height="912" data-path="images/Integrations-section-docs.png" />

Integration tools are pre-built connectors that let your agent interact with external platforms without configuring raw API requests. Each integration comes with ready-made tools - like creating a ticket in Zendesk, updating a lead in Salesforce, or sending an SMS in Twilio - so you can connect your agent to the tools your team already uses.

## Available integrations

| Integration                                                        | What your agent can do                                                                   |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [**Airtable**](/docs/documentation/build/tools/airtable-tool)           | Read, create, and update records in your bases                                           |
| [**Gmail**](/docs/documentation/build/tools/gmail-tool)                 | Send emails and create drafts                                                            |
| [**Google Sheets**](/docs/documentation/build/tools/google-sheets-tool) | Read and write rows in spreadsheets                                                      |
| [**HubSpot**](/docs/documentation/build/tools/hubspot-tool)             | Create and update contacts, deals, and tickets                                           |
| [**Make**](/docs/documentation/build/tools/make-tool)                   | Trigger scenarios and pass data to automations                                           |
| [**Salesforce**](/docs/documentation/build/tools/salesforce-tool)       | Create and update contacts, leads, and cases; add comments to cases                      |
| [**Shopify**](/docs/documentation/build/tools/shopify)                  | Look up orders, products, and customers; cancel and update orders; update customer info  |
| [**Twilio**](/docs/documentation/build/tools/twilio-tool)               | Send SMS messages                                                                        |
| [**Zendesk**](/docs/documentation/build/tools/zendesk-tool)             | Create, find, and update tickets; add comments; look up users, groups, and organizations |

<Tip>
  RelVoca regularly adds new integrations based on customer demand. Need something we're missing? [Book a demo](https://www.voiceflow.com/demo)
</Tip>

## Setting up an integration

<Steps>
  <Step title="Connect to the provider">
    You can add, or connect an integration tools directly from within a [playbook](/docs/documentation/build/playbooks).

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Adding-integration-tool-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=a6c9524b8205648871281ce5b5bc43a3" alt="Adding Integration Tool Docs 1" width="2518" height="1536" data-path="images/Adding-integration-tool-docs-1.png" />

    <Info>
      You can also add integration tools from within a workflow using the [Integration step](/docs/documentation/build/steps/integration), or from the tools CMS tab. Integrations can be managed centrally in Settings → Integrations. Once a tool exists, you can [reference it](/docs/documentation/build/editor/references) directly in your instructions.
    </Info>
  </Step>

  <Step title="Authenticate">
    Follow the OAuth flow or enter API credentials to connect your account. Each integration has its own authentication method.
  </Step>

  <Step title="Select tools">
    Choose which actions you want your agent to have access to. You don't need to enable everything - only add what's relevant to your use case.
  </Step>
</Steps>

## Using integration tools

There are two ways to use an integration tool:

### In a playbook

Add integration tool to a playbook's Tools editor. The agent will call it autonomously when it determines they're needed based on the conversation context, the tool's description, and your playbook instructions.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Integrations-playbook-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=6ceabb9f837dffc819966e4e1125cece" alt="Integrations Playbook Docs" width="1294" height="728" data-path="images/Integrations-playbook-docs.png" />

Give your tool a clear name and description - together they tell your AI agent what the tool does and when to use it. For extra guidance on when to call it, add that to your instructions.

### In a workflow

Drag an integration step onto the canvas and select the specific tool you want to run. Input variables are mapped explicitly in the step config - the agent doesn't decide whether to call it, the workflow executes it at that point in the flow every time.

Use this when the action is part of a fixed process - for example, always creating a Salesforce case after collecting a complaint, or always sending a confirmation email through Gmail after a booking is made.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Integration-step-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=4c01a20abdd2ced8847b8c3841e81969" alt="Integration Step Docs" width="1294" height="728" data-path="images/Integration-step-docs.png" />
