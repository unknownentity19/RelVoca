> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Environments

> Work on multiple versions of your agent in parallel, conduct A/B tests with traffic splits, and roll changes back with confidence.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Envs-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=4e4e051fd76b339cac0367d4e519e412" alt="Envs Docs" width="2820" height="870" data-path="images/Envs-docs.png" />

Environments are independent copies of your AI agent. This makes it safe to test a change in isolation, compare two versions of your agent against each other (A/B test), or roll out a new version gradually.  Environments are independent copies of your AI agent. This makes it safe to test a change in isolation, compare two versions of your agent against each other (A/B test), or roll out a new version gradually.

Each environment has its own [draft version](/docs/documentation/deploy/environments/publishing), **live version,** and independent [version history](/docs/documentation/deploy/environments/publishing#version-history-and-reverting). Every project starts with a single environment called `Main`, which is what your users connect to by default.

## Key concepts

| Concept                    | What it is                                                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Environment**            | An independent copy of your agent.                                                                                                                  |
| **Draft version**          | An auto-saved working version of the environment, updated as you make edits.                                                                        |
| **Live version**           | The most recently published version of the environment that's [receiving traffic](/docs/documentation/deploy/environments/traffic-split), if configured. |
| **Traffic splitting**      | Control what % of live traffic is reaching which environment.                                                                                       |
| **Merging**                | Promoting a specific environment to Main.                                                                                                           |
| **Environment protection** | Restricting publish and merge on an environment to admins and owners.                                                                               |
| **Version history**        | Snapshots of an environments versions over time.                                                                                                    |

## Best practices

Use the following workflow for any meaningful change to your agent. `Main` keeps serving users throughout, and you can roll back at any step.

<Steps>
  <Step title="Clone Main">
    Create a new environment cloned from `Main` and name it after the change(s) you're making.
  </Step>

  <Step title="Iterate">
    Work on the new environment and save <kbd>⇧⌘S</kbd> or [publish versions](/docs/documentation/deploy/environments/publishing) as you go.
  </Step>

  <Step title="Route a small percentage of live traffic">
    Once you're happy with the changes, open [**edit traffic split**](/docs/documentation/deploy/environments/traffic-split) and send a small percentage of live traffic to the new environment.
  </Step>

  <Step title="View results (A/B test)">
    Compare this environment to `Main` using your KPIs in [Analytics](/docs/documentation/measure/analytics), [Evaluations](/docs/documentation/measure/evaluations) and [Transcripts](/docs/documentation/measure/transcripts).
  </Step>

  <Step title="Merge and clean up">
    If this environments proves to be performing better than Main, [merge](/docs/documentation/deploy/environments/merging) the environment to `Main`. Delete the environment on merge to keep your project clean.
  </Step>

  <Step title="Repeat">
    Repeat this process to continually improve your agent over time.
  </Step>
</Steps>

<Info>
  Each project supports up to 10 environments, including Main. If you're close to the limit, merge or delete the ones you no longer need.
</Info>

## Managing environments

You can manage a project's environments from **Settings** → **Environments** when editing a project. Or click the environment name in the left menu under the project name and press 'view all'.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-04-29-at-13.09.52@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=b6ec8e606f1291f516800d0d6c859d49" alt="Clean Shot 2026 04 29 At 13 09 52@2x" width="2564" height="1038" data-path="images/CleanShot-2026-04-29-at-13.09.52@2x.png" />
</Frame>

### Creating an environment

Click **New environment** in the top right. Give the environment a name, pick an environment to **Clone from**, and click **Create**.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/New-env.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=ef911c1ad18750e414a715a47f38879c" alt="New Env" width="1732" height="1040" data-path="images/New-env.png" />

Most of content from the environment that you chose to clone from will be copied into your new environment - see below for the exceptions.

| Data type                                                                                        | Behaviour when cloning                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workflows, playbooks, and tools                                                                  | Cloned into the new environment.                                                                                                                                                                                                                                                                                                               |
| Agent configuration (model, instructions, guardrails)                                            | Cloned into the new environment.                                                                                                                                                                                                                                                                                                               |
| Widget settings                                                                                  | Cloned into the new environment.                                                                                                                                                                                                                                                                                                               |
| Variables                                                                                        | Cloned into the new environment.                                                                                                                                                                                                                                                                                                               |
| Knowledge base documents                                                                         | The contents of each knowledge base document are shared project-wide. The list of documents included in the original environment is cloned into the new environment. This means that adding or removing documents in the knowledge base is environment-specific, but modifying a document affects all environments that contain that document. |
| Knowledge base metadata                                                                          | Environment specific. Adding or removing metadata from a document only affects a specific environment.                                                                                                                                                                                                                                         |
| Knowledge base [integrations](/docs/documentation/build/importing-data-sources) (Shopify and Zendesk) | Shared project-wide.                                                                                                                                                                                                                                                                                                                           |
| Phone numbers                                                                                    | Shared project-wide, but assigned to a specific environment.                                                                                                                                                                                                                                                                                   |
| Secrets                                                                                          | Shared project-wide, with [per-environment overrides](/docs/documentation/build/data/secrets) available for both draft and live versions of each environment.                                                                                                                                                                                       |
| Evaluations                                                                                      | Shared project wide. Results can be filtered to a specific environment and version.                                                                                                                                                                                                                                                            |
| Analytics                                                                                        | Shared project wide. Data can be filtered to a specific environment and version.                                                                                                                                                                                                                                                               |

### Switching between environments

Use the environment switcher at the top of the sidebar of any page inside your project to switch between environments. You can edit any environment, including ones your users are currently interacting with. Edits only affect the draft version until you [publish your environment](/docs/documentation/deploy/environments/publishing).

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/env-switching.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=0a390eca8c7e9b6dfe764ac1524eb981" alt="Env Switching" width="3012" height="776" data-path="images/env-switching.png" />
</Frame>

### Cloning to new environment

Press the dropdown arrow next to the publish button, and select **Clone environment** to clone the current draft version to a new environment.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/env---clone.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=1ec510d9272f007b17304d5c60272a64" alt="Env Clone" width="1160" height="612" data-path="images/env---clone.png" />
</Frame>

### Discarding changes

Press the dropdown arrow next to the publish button, and select **Discard changes** to open a diff view where you can confirm the selection.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/envdiscard.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=1e76a32559e035fae9c057eea2184bdc" alt="Envdiscard" width="1160" height="612" data-path="images/envdiscard.png" />
</Frame>

### Environment protection

Protecting an environment restricts who can change what your users see. On a protected environment, only workspace admins and owners can publish or merge. Everyone else keeps full access to build, edit, and test. They just can't make their changes live there.

Protection is off by default and set per environment. Turn it on from the ••• menu on the environment's row in **Settings** → **Environments**.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-07-31-at-10.04.09@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=56570aeda75a487ff07c16e574503716" alt="Environment protection" width="1456" height="1002" data-path="images/CleanShot-2026-07-31-at-10.04.09@2x.png" />
</Frame>

Anyone can still create environments and clone from a protected one, so day-to-day building is unaffected. Protection is most useful on `Main`, and on any other environment carrying live traffic.

### Aliases

Every environment has a short, URL-safe **alias** used in API calls, the chat widget, and any other programmatic reference. `Main`'s alias is `main`. Aliases don't change when you rename an environment, so integrations keep working.

Copy an environment's alias from the **Alias** column in **Settings** → **Environments**.

### Legacy projects

Projects created before environments launched use three fixed environments (Development, Staging, and Production) with aliases `development`, `staging`, and `production`. These keep working until you opt into migration.

After migrating, update integrations that use the legacy aliases, including the [chat widget snippet](/docs/documentation/deploy/widget/web-chat-api#choosing-which-environment-the-widget-loads). If you're making use of the [start session API endpoint](/docs/api-reference/v4interact/start-session-specific-environment), you'll also need to update this to point to the `main` environment, rather than `production`.
