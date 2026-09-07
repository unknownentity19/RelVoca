> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Organization events webhooks

> Receive organization level events to your webhooks.

If you're using RelVoca within a larger organization, you might want to integrate with your existing observability or testing tools. Organization events webhooks let you automatically receive updates whenever something happens in your organization - for example, when a new project is created. Just provide a webhook URL, and RelVoca will send event data there in real time.

## Configuring your webhook settings

<Info>
  If you're less technical, we recommend using a tool like Make to generate a webhook URL and run automations. If you're a developer, you can hook into your existing infrastructure using any tool that can receive and process JSON payloads.
</Info>

To enable sending data to a webhook whenever key events happen within an organization, head to your [RelVoca dashboard](/dashboard), click the **Settings** button in the bottom left corner, then select **Organization**. You can then add the URL that you'd like to send events to in the box provided.

Once you've set a webhook URL, all future events will be automatically sent to it.

## Supported events

The following organization-level events will be sent to the provided URL:

| Human-readable name           | Name                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| New project created           | [`organization.project.created`](#organization-project-created)                             |
| Project deleted               | [`organization.project.deleted`](#organization-project-deleted)                             |
| Project environment created   | [`organization.project.environment.created`](#organization-project-environment-created)     |
| Project environment published | [`organization.project.environment.published`](#organization-project-environment-published) |
| Project environment merged    | [`organization.project.environment.merged`](#organization-project-environment-merged)       |
| Project environment deleted   | [`organization.project.environment.deleted`](#organization-project-environment-deleted)     |

### `organization.project.created`

Sent when a new project is created in the organization.

```typescript theme={null}
{
  "type": "organization.project.created",
  "data": {
    "createdBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example organization.project.created payload">
  ```json theme={null}
  {
    "data": {
      "createdBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "organizationID": "LVkmPy8AE2",
      "projectID": "6a16f4549e4196323d8a49b9",
      "projectMetadata": {
        "name": "My new project"
      },
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889237608,
    "type": "organization.project.created"
  }
  ```
</Accordion>

### `organization.project.deleted`

Sent when a project is deleted from the organization.

```typescript theme={null}
{
  "type": "organization.project.deleted",
  "data": {
    "deletedBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example organization.project.deleted payload">
  ```json theme={null}
  {
    "data": {
      "deletedBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "organizationID": "LVkmPy8AE2",
      "projectID": "6a16f4789e4196323d8a49c3",
      "projectMetadata": {
        "name": "Legacy support agent"
      },
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889287387,
    "type": "organization.project.deleted"
  }
  ```
</Accordion>

### `organization.project.environment.created`

Sent when a new environment is created within a project. The `source` describes the environment the new one was branched from.

```typescript theme={null}
{
  "type": "organization.project.environment.created",
  "data": {
    "createdBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "createdProjectEnvironmentID": string,
    "createdProjectEnvironmentMetadata": {
      "alias": string,
      "isLive": boolean,
      "name": string,
      "trafficPercentage": number
    },
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "source": {
      "environmentID": string,
      "environmentMetadata": {
        "alias": string,
        "isLive": boolean,
        "name": string,
        "trafficPercentage": number
      },
      "type": string // e.g. "environment"
    },
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example organization.project.environment.created payload">
  ```json theme={null}
  {
    "data": {
      "createdBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "createdProjectEnvironmentID": "6a16f4dc9e4196323d8a49e5",
      "createdProjectEnvironmentMetadata": {
        "alias": "optimizeglobalprompt",
        "isLive": false,
        "name": "Optimize global prompt",
        "trafficPercentage": 0
      },
      "organizationID": "LVkmPy8AE2",
      "projectID": "69e8b60a99c9a35e1a5e8872",
      "projectMetadata": {
        "name": "My support agent"
      },
      "source": {
        "environmentID": "69e8b60a99c9a35e1a5e8875",
        "environmentMetadata": {
          "alias": "main",
          "isLive": true,
          "name": "Main",
          "trafficPercentage": 70
        },
        "type": "environment"
      },
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889372749,
    "type": "organization.project.environment.created"
  }
  ```
</Accordion>

### `organization.project.environment.published`

Sent when an environment within a project is published. `publishedVersionIDBefore` and `publishedVersionIDAfter` let you track what changed.

```typescript theme={null}
{
  "type": "organization.project.environment.published",
  "data": {
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "publishedBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "publishedProjectEnvironmentID": string,
    "publishedProjectEnvironmentMetadata": {
      "alias": string,
      "isLive": boolean,
      "name": string,
      "trafficPercentage": number
    },
    "publishedVersionIDAfter": string,
    "publishedVersionIDBefore": string,
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example payload - publishing the live Main environment">
  ```json theme={null}
  {
    "data": {
      "organizationID": "LVkmPy8AE2",
      "projectID": "69e8b60a99c9a35e1a5e8872",
      "projectMetadata": {
        "name": "My support agent"
      },
      "publishedBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "publishedProjectEnvironmentID": "69e8b60a99c9a35e1a5e8875",
      "publishedProjectEnvironmentMetadata": {
        "alias": "main",
        "isLive": true,
        "name": "Main",
        "trafficPercentage": 70
      },
      "publishedVersionIDAfter": "6a16f4b29e4196323d8a49db",
      "publishedVersionIDBefore": "69e8e543ce546b913fc2c965",
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889330124,
    "type": "organization.project.environment.published"
  }
  ```
</Accordion>

<Accordion title="Example payload - publishing a non-live environment">
  ```json theme={null}
  {
    "data": {
      "organizationID": "LVkmPy8AE2",
      "projectID": "69e8b60a99c9a35e1a5e8872",
      "projectMetadata": {
        "name": "My support agent"
      },
      "publishedBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "publishedProjectEnvironmentID": "6a16f4dc9e4196323d8a49e5",
      "publishedProjectEnvironmentMetadata": {
        "alias": "optimizeglobalprompt",
        "isLive": false,
        "name": "Optimize global prompt",
        "trafficPercentage": 0
      },
      "publishedVersionIDAfter": "6a16f5129e4196323d8a49f1",
      "publishedVersionIDBefore": "6a16f4dc9e4196323d8a49e3",
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889426435,
    "type": "organization.project.environment.published"
  }
  ```
</Accordion>

### `organization.project.environment.merged`

Sent when one environment is merged into another. `sourceProjectEnvironmentRemoved` indicates whether the source environment was deleted as part of the merge.

```typescript theme={null}
{
  "type": "organization.project.environment.merged",
  "data": {
    "mergedBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "sourceProjectEnvironmentID": string,
    "sourceProjectEnvironmentMetadata": {
      "alias": string,
      "isLive": boolean,
      "name": string,
      "trafficPercentage": number
    },
    "sourceProjectEnvironmentRemoved": boolean,
    "targetProjectEnvironmentID": string,
    "targetProjectEnvironmentMetadata": {
      "alias": string,
      "isLive": boolean,
      "name": string,
      "trafficPercentage": number
    },
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example organization.project.environment.merged payload">
  ```json theme={null}
  {
    "data": {
      "mergedBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "organizationID": "LVkmPy8AE2",
      "projectID": "69e8b60a99c9a35e1a5e8872",
      "projectMetadata": {
        "name": "My support agent"
      },
      "sourceProjectEnvironmentID": "6a16f4dc9e4196323d8a49e5",
      "sourceProjectEnvironmentMetadata": {
        "alias": "optimizeglobalprompt",
        "isLive": false,
        "name": "Optimize global prompt",
        "trafficPercentage": 0
      },
      "sourceProjectEnvironmentRemoved": true,
      "targetProjectEnvironmentID": "69e8b60a99c9a35e1a5e8875",
      "targetProjectEnvironmentMetadata": {
        "alias": "main",
        "isLive": true,
        "name": "Main",
        "trafficPercentage": 70
      },
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889488361,
    "type": "organization.project.environment.merged"
  }
  ```
</Accordion>

### `organization.project.environment.deleted`

Sent when an environment is deleted from a project.

```typescript theme={null}
{
  "type": "organization.project.environment.deleted",
  "data": {
    "deletedBy": {
      "type": string, // e.g. "user"
      "userEmail": string
    },
    "deletedProjectEnvironmentID": string,
    "deletedProjectEnvironmentMetadata": {
      "alias": string,
      "isLive": boolean,
      "name": string,
      "trafficPercentage": number
    },
    "organizationID": string,
    "projectID": string,
    "projectMetadata": {
      "name": string
    },
    "workspaceID": string
  },
  "resource": string, // organization-{organizationID}
  "time": number // unix timestamp MS, event time
}
```

<Accordion title="Example organization.project.environment.deleted payload">
  ```json theme={null}
  {
    "data": {
      "deletedBy": {
        "type": "user",
        "userEmail": "user@voiceflow.com"
      },
      "deletedProjectEnvironmentID": "69e8b64d99c9a35e1a5e888b",
      "deletedProjectEnvironmentMetadata": {
        "alias": "feature-upselling",
        "isLive": false,
        "name": "Old unused environment",
        "trafficPercentage": 0
      },
      "organizationID": "LVkmPy8AE2",
      "projectID": "69e8b60a99c9a35e1a5e8872",
      "projectMetadata": {
        "name": "My support agent"
      },
      "workspaceID": "95kwAZ63nO"
    },
    "resource": "organization-LVkmPy8AE2",
    "time": 1779889527687,
    "type": "organization.project.environment.deleted"
  }
  ```
</Accordion>

## Verifying requests come from RelVoca

Once you enter a webhook URL into the settings page, you'll automatically be provided with a webhook secret. This can be used to verify that events received by the webhook were really sent by RelVoca. [Follow these instructions to learn how to verify events using the webhook secret](https://docs.svix.com/receiving/verifying-payloads/how-manual).

If you accidentally leak your webhook secret, you can regenerate it using the 🔄 button on the settings page. Note that your previous webhook secret will remain valid for 24 hours after you regenerate it.

If you're receiving data from behind a restrictive firewall, you should know that events will come from one of [Svix's IP addresses](https://docs.svix.com/receiving/source-ips), rather than RelVoca's.
