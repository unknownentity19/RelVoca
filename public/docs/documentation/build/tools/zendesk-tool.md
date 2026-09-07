> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Zendesk tool

> Manage support tickets, users, and organizations in Zendesk. 

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/tools/integrations/Zendeskcover-1.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=2afc83ed344b8aeeb7634c91981e33f0" alt="Zendesk tool cover" width="1920" height="1080" data-path="images/tools/integrations/Zendeskcover-1.png" />

The Zendesk tool lets your agent interact with your Zendesk account during a conversation. Use it to create and update support tickets, look up users, add comments to ongoing cases, or search for existing tickets based on custom criteria.

## Using the Zendesk tool

Add the Zendesk tool to your agent from **Tools** → **Add tool** → **Zendesk**. You can also add tools directly from inside a [Playbook](/docs/documentation/build/steps/playbook) or [Integration step](/docs/documentation/build/steps/integration). Once added, you can call the Zendesk tool from inside a [Playbook](/docs/documentation/build/playbooks) or [Workflow](/docs/documentation/build/workflows).

### Actions

| Action                  | Description                                                                      |
| ----------------------- | -------------------------------------------------------------------------------- |
| **Create ticket**       | Create a new support ticket with a subject, description, tags, and other fields. |
| **Update ticket**       | Modify an existing ticket's priority, status, tags, or other fields.             |
| **Add ticket comment**  | Append a public or private comment to an existing ticket.                        |
| **Find ticket(s)**      | Search for tickets by user ID, status, or other criteria.                        |
| **Find latest comment** | Retrieve the most recent comment on a specific ticket.                           |
| **Find user**           | Search for users by email, name, or other identifiers.                           |
| **Find group**          | Look up support groups by ID or name.                                            |
| **Update organization** | Edit an organization's details such as domain, name, or notes.                   |

For actions that support custom fields, RelVoca automatically detects and displays the available fields from your Zendesk account.

## Syncing Zendesk Help Center with your Knowledge Base

You can also connect your Zendesk Help Center to RelVoca's [Knowledge base](/docs/documentation/build/importing-data-sources). This lets your agent answer questions using your existing help articles, product guides, FAQs, and support policies.

To connect your Zendesk Help Center, go to **Knowledge base** → **Add data source** → **Zendesk** inside your project.

## Learn more about integrations

<Card title="Integrate with third-party tools" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/integration.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=84140036a98f211c30645b08808ccecb" href="/docs/courses/integrate-with-third-party-tools" cta="Learn now (5 mins)" width="24" height="24" data-path="images/icons/integration.svg">
  The best agents use tools to interact with the outside world. Learn how to get started with our bitesized course.
</Card>
