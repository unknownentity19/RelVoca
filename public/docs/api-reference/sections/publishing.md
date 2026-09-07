> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Publishing overview

> Ship changes with environments. Edit a draft, publish it live, clone one to work in isolation, merge it back, and split traffic between versions.

An environment is a copy of your agent with its own draft and its own live
version. Publishing promotes the draft; until you do, nothing you change
reaches users.

These endpoints let you work in an environment of your own, merge it back when
it is ready, and route a share of real traffic to it to compare two versions
against each other.

## Endpoints

### Environment

| Endpoint                                                                                                            | Description                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <Badge color="green" size="sm">GET</Badge> [List environments](/docs/api-reference/environment/list-environments)        | List all environments by project ID.                         |
| <Badge color="purple" size="sm">PUT</Badge> [Merge environments](/docs/api-reference/environment/merge-environments)     | Merge one environment into another.                          |
| <Badge color="purple" size="sm">PUT</Badge> [Update traffic split](/docs/api-reference/environment/update-traffic-split) | Update the percentage of traffic routed to each environment. |
| <Badge color="green" size="sm">GET</Badge> [Get environment](/docs/api-reference/environment/get-environment)            | Get an environment by alias or ID.                           |
| <Badge color="orange" size="sm">PATCH</Badge> [Update environment](/docs/api-reference/environment/update-environment)   | Update a environment by alias or ID.                         |
| <Badge color="red" size="sm">DELETE</Badge> [Delete environment](/docs/api-reference/environment/delete-environment)     | Delete an environment by alias or ID.                        |
| <Badge color="green" size="sm">GET</Badge> [Export environment](/docs/api-reference/environment/export-environment)      | Export all data from environment.                            |
| <Badge color="purple" size="sm">PUT</Badge> [Compile environment](/docs/api-reference/environment/compile-environment)   | Compile an environment.                                      |
| <Badge color="blue" size="sm">POST</Badge> [Clone environment](/docs/api-reference/environment/clone-environment)        | Clone an environment.                                        |
| <Badge color="blue" size="sm">POST</Badge> [Publish environment](/docs/api-reference/environment/publish-environment)    | Publish live version of an environment.                      |

## Draft and published

Every environment holds two versions of the agent. The **draft** is what you
edit and what `version: "draft"` runs when you
[send a conversation](/docs/api-reference/sections/running-agents). The **published** version is
what real traffic reaches. Publishing promotes the draft to published; nothing
you change before that is visible to users.

New projects start with a single environment called `main`. Passing an alias
the project does not have returns `400 invalid environment tag`, so list them
first if you are not sure:

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/environment?projectID=$VF_PROJECT_ID" \
  -H "Authorization: Bearer $VF_PAT"
```

## Working with more than one

* **Clone** copies an existing environment into a new one. This is how you get
  a second environment to build against without touching `main`.
* **Merge** folds one environment's changes back into another.
* **Publish** promotes an environment's draft to its published version.
* **Update traffic split** routes a share of live conversations to a different
  environment, which is how you run one version against another on real
  traffic.
* **Export** returns the environment as JSON, for backup or for inspecting a
  build outside RelVoca.
* **Compile** builds the environment without publishing it, so you can surface
  errors before users would.

## Secrets

Secret values are environment-scoped, so the same secret name can hold a test
value in one environment and a production value in another. They are not
managed through the environment endpoints today.

## Where to go next

After publishing, [watch what happens](/docs/api-reference/sections/observe) in the
transcripts, and [measure it](/docs/api-reference/sections/insights).
