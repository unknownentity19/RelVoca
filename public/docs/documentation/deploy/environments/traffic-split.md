> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# A/B testing

> Split traffic across multiple environments at once for A/B testing and gradual rollouts.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Traffic-splitting-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=38dbafca9a57de72c5217e16f93b290f" alt="Traffic Splitting 2" width="1732" height="942" data-path="images/Traffic-splitting-2.png" />

Traffic splitting allows you to assign a percentage of incoming traffic to different [environments](/docs/documentation/deploy/environments). Allowing for A/B testing, and gradual rollouts.

<Info>
  Individual users stay on the same environment across sessions so their experience is consistent.
</Info>

## When to use a traffic split

Use a traffic split when you want to measure a meaningful change before it reaches everyone, or compare two approaches head-to-head in production. For small, well-understood edits - copy tweaks, typos, minor prompt updates - you can simply edit `Main` and publish.

Once an environment has been validated as the winner, you should [merge it back into ](/docs/documentation/deploy/environments/merging)`Main` rather than leave it running under a traffic split.

<Tip>
  Use the Main environment as the source of truth for your agent. Once a change is ready - or an A/B test resolves in favour of the new environment - merge it back into Main, rather than leaving another environment serving 100% of traffic indefinitely.
</Tip>

## Editing traffic split

Click **Edit traffic split** in the top right of **Settings** → **Environments**. Add a row for each environment you want to include, set its percentage, and click **Deploy**. Percentages must add up to 100%. Removing an environment from the traffic split prevents users from automatically being routed to it but doesn't remove the environment from your project.

<Info>
  When a traffic split is changed, the new settings will only be enforced for new sessions. Existing sessions will continue on their current environment.
</Info>

## Recommended rollout

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
    If this environments proves to be performing better than the live version of Main, [merge](/docs/documentation/deploy/environments/merging) the environment to `Main`. Delete the environment on merge to keep your project clean.
  </Step>

  <Step title="Repeat">
    Repeat this process to continually improve your agent over time.
  </Step>
</Steps>

## Considerations

* Users are automatically routed to an environment based on your specified traffic split. You can't pick specific users or cohorts to land on a particular environment. If you need cohort-based routing, pass a specific environment alias when your users connect (for example, in your [chat widget](/docs/documentation/deploy/widget/embedding-the-chat-widget) snippet) instead of relying on this feature.
* Traffic split applies to every way your users connect to your agent (chat widget, phone, API, custom clients). If you need different routing per channel, point each channel at a specific [environment alias](/docs/documentation/deploy/environments/overview#aliases).

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Traffic-splitting-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=38dbafca9a57de72c5217e16f93b290f" alt="Traffic Splitting 2" width="1732" height="942" data-path="images/Traffic-splitting-2.png" />
