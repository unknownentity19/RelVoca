> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# What the REST API covers

> Everything the RelVoca REST API can do, grouped by the job you came to do: build an agent, run a conversation, publish it, and measure it.

The RelVoca REST API covers the whole lifecycle of an agent. You can build
one from parts, run conversations against it, publish it through environments,
and read back what happened, all without opening the Studio.

Every request carries a [personal access token](/docs/api-reference/authentication).
One credential authenticates the REST API, the `vf` CLI, and the MCP server.

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/workspace" \
  -H "Authorization: Bearer $VF_PAT"
```

New to the API? [Quickstart](/docs/api-reference/quickstart) gets you a first
response in a few minutes.

## Build and run

<Card icon="https://mintcdn.com/voiceflow-009a8802/64sKM9xJme1x5KmF/images/icons/tools.svg?fit=max&auto=format&n=64sKM9xJme1x5KmF&q=85&s=be029f4316efac4451bdf6f2435b849a" horizontal href="/docs/api-reference/sections/build" title="Build" width="24" height="24" data-path="images/icons/tools.svg">
  Create and manage the pieces an agent is built from: playbooks, functions, tools, API tools, MCP servers, variables and knowledge base documents.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/conversation.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=5e173e3f90d13aeef5a9fde2d6b03965" horizontal href="/docs/api-reference/sections/running-agents" title="Running agents" width="24" height="24" data-path="images/icons/conversation.svg">
  Run conversations against an agent over HTTP. Send what a user would say, read the traces that come back, and inspect or reset the state between turns.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/Deti6n82HHVK8mCG/images/icons/publish.svg?fit=max&auto=format&n=Deti6n82HHVK8mCG&q=85&s=6798b4a677138a2975088e76ab515be2" horizontal href="/docs/api-reference/sections/publishing" title="Publishing" width="24" height="24" data-path="images/icons/publish.svg">
  Ship changes with environments. Edit a draft, publish it live, clone one to work in isolation, merge it back, and split traffic between versions.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/Deti6n82HHVK8mCG/images/icons/organization.svg?fit=max&auto=format&n=Deti6n82HHVK8mCG&q=85&s=67c0cc298ab9aeada4a3d4c46cbd4bde" horizontal href="/docs/api-reference/sections/manage" title="Manage" width="24" height="24" data-path="images/icons/organization.svg">
  Create and administer the containers your agents live in: workspaces that group projects and people, and projects that each own a single agent.
</Card>

## Measure and improve

<Card icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/list.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=daa732d04c073adc87ce3fbf7639396b" horizontal href="/docs/api-reference/sections/observe" title="Observe" width="24" height="24" data-path="images/icons/list.svg">
  Read the conversations your agent actually had. Search transcripts, fetch a single one, and attach your own properties to record what happened.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/insights.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=f7dcdab88161906ab15ed769231e6668" horizontal href="/docs/api-reference/sections/insights" title="Insights" width="24" height="24" data-path="images/icons/insights.svg">
  Score conversations against criteria you define, so agent quality becomes a number you can track over time instead of a sample you skim.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/Deti6n82HHVK8mCG/images/icons/tests.svg?fit=max&auto=format&n=Deti6n82HHVK8mCG&q=85&s=c81d4f6390c277c873f8f353cc50a737" horizontal href="/docs/api-reference/sections/qa" title="QA" width="24" height="24" data-path="images/icons/tests.svg">
  Replay scripted conversations against your agent and assert what it does, so a change that breaks a scenario fails loudly instead of silently.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/uPQXwAnel1aMDlUg/images/icons/analytics.svg?fit=max&auto=format&n=uPQXwAnel1aMDlUg&q=85&s=d356f212c624e505c728a8234f49b878" horizontal href="/docs/api-reference/sections/analytics" title="Analytics" width="24" height="24" data-path="images/icons/analytics.svg">
  Query usage and cost: tokens, calls, conversations and unique users, plus the spend attributed to individual functions, playbooks and tools.
</Card>

## Webhooks

<Card icon="https://mintcdn.com/voiceflow-009a8802/64sKM9xJme1x5KmF/images/icons/webhook.svg?fit=max&auto=format&n=64sKM9xJme1x5KmF&q=85&s=13a90587809b535bacb405a84fdb7e3b" horizontal href="/docs/api-reference/webhooks/session-lifecycle" title="Session lifecycle webhook" width="24" height="24" data-path="images/icons/webhook.svg">
  Receive events whenever conversations start or end, on both chat and voice.
</Card>

<Card icon="https://mintcdn.com/voiceflow-009a8802/64sKM9xJme1x5KmF/images/icons/webhook.svg?fit=max&auto=format&n=64sKM9xJme1x5KmF&q=85&s=13a90587809b535bacb405a84fdb7e3b" horizontal href="/docs/api-reference/webhooks/org-events" title="Organization events webhooks" width="24" height="24" data-path="images/icons/webhook.svg">
  Receive events when projects are created, published, or deleted.
</Card>
