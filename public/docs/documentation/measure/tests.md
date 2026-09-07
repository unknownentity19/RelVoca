> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Tests

> Run conversations against your agent and check that it behaves the way you expect.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/tests-cover.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=345d8660cde80f98423aae7c6a85641a" alt="Tests Cover" width="3840" height="2160" data-path="images/tests-cover.png" />
</Frame>

Tests let you verify your agent's behaviour before real users see it. Each test simulates a conversation between a user and your agent, then checks that things like the agent's responses, where it routed, and which tools it called match what you expected.

## Key concepts

| Concept      | What it is                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test**     | A simulated conversation between a user and your agent, with checks that confirm specific behaviour like "the agent escalates angry customers" or "the refund flow ends with a confirmation email."                |
| **Turn**     | A single message in the conversation. A turn is either a **User turn** (a message you wrote), an **Agent turn** (your agent's actual response), or a **Simulation** (an AI-generated section of the conversation). |
| **Check**    | A condition that runs on one of your agent's turns. Checks look at the agent's response, where it routed, or what tools it called.                                                                                 |
| **Persona**  | A saved set of starting variable values. Use personas to start a test as a specific kind of user.                                                                                                                  |
| **Past run** | The saved results from a previous time you ran a test. Useful for seeing how your agent's behaviour has changed over time.                                                                                         |

## Best practices

Follow this workflow for any meaningful change to your agent.

<Steps>
  <Step title="Clone Main">
    Create a new [environment](/docs/documentation/deploy/environments/overview) cloned from `Main` and name it after the change you're making.
  </Step>

  <Step title="Make your change">
    Update playbooks, workflows, tools, or anything else in the new environment.
  </Step>

  <Step title="Add tests if needed">
    Write new tests for any behaviour you've introduced or changed. If your existing tests already cover what you're working on, you can skip this step.
  </Step>

  <Step title="Run your tests">
    Click **Run all tests** in the **Tests** tab to run both your new tests and any tests that were already on the environment. Existing tests catch behaviour you didn't mean to change.
  </Step>

  <Step title="Iterate">
    If anything failed, dig into the result, adjust your changes, and re-run the tests. Repeat until everything passes.
  </Step>

  <Step title="Ship the change">
    Once your tests are green, [merge](/docs/documentation/deploy/environments/merging) the environment back to `Main`. Or, [route some traffic](/docs/documentation/deploy/environments/traffic-split) to the new environment first to A/B test it with humans before merging it to `Main`.
  </Step>
</Steps>

## Creating a test

To create a test, open **Tests** in the sidebar and click **New test**.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests---create.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=8bc72a4727c0411b8c54624dc21ea82f" alt="Tests Create" width="3446" height="676" data-path="images/Tests---create.png" />
</Frame>

A test conversation is built from turns. Use the buttons at the bottom of the editor to add turns:

* **User turn** is an exact user message you script.
* **Agent turn** waits for your agent's real response. Your agent's messages are generated using your playbooks and workflows each time a test is run.
* **Simulation** lets an AI play the user across a section of the conversation. You describe a scenario and success criteria, and the simulation passes if the AI reaches the criteria within a turn cap you set.

Click **Add persona** at the top of the editor to start the test with a saved [persona](/docs/documentation/build/data/personas) (a set of starting variable values).

If your agent uses [events](/docs/documentation/build/behaviour), the **Launch** dropdown lets you start the test from a specific event instead of the default launch state.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests---event-and-persona-(1).png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=cc0bc21e97830c1b4689bd6905b09140" alt="Tests Event And Persona (1)" width="2224" height="734" data-path="images/Tests---event-and-persona-(1).png" />
</Frame>

### Adding checks to an agent turn

Checks allow you to verify that certain criteria are met during a turn. Click **Add check** on an agent turn and pick a type. Multiple checks can run on the same turn.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests-add-check.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=ba7ae9f4d6660ce9586b05066a4ac4a4" alt="Tests Add Check" width="1990" height="464" data-path="images/Tests-add-check.png" />
</Frame>

| Check type    | What it checks                                                                                                                                                                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Response**  | What your agent said. Choose **Exact response** to match a specific string, or **LLM as judge** to describe what you expect and let an AI grade the reply.                                                                                                                                   |
| **Routing**   | Whether your agent routed to a specific playbook or workflow.                                                                                                                                                                                                                                |
| **Tool call** | Whether a specific [API](/docs/documentation/build/tools/api-tool), [Function](/docs/documentation/build/tools/function-tool), [Integration](/docs/documentation/build/steps/integration), [MCP](/docs/documentation/build/tools/mcp-tool) or [System tool](/docs/documentation/build/tools/system-tools) was called. |

You can choose whether to run checks independently or sequentially on each turn by clicking the **...** button on a turn:

* **Independently**: each check runs on its own with no shared context. Use when order doesn't matter.
* **Sequentially**: checks run in order, each picking up where the last left off. Use when checks depend on each other.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests---checks-run.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=c77db92e17a6512f631897922fb7da6b" alt="Tests Checks Run" width="2164" height="864" data-path="images/Tests---checks-run.png" />
</Frame>

## Running tests

Tests never run automatically. You always start them yourself, either as a single test or as a batch. For each test you run, you can see the conversation as it plays out, whether each check passed or failed along with the reasoning, and the full conversation logs.

### Running a single test

While editing a test, click **Run** in the top right to start it.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests---run-single.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=69a563667c0a44397e649aee9b50e25d" alt="Tests Run Single" width="1658" height="404" data-path="images/Tests---run-single.png" />
</Frame>

### Running multiple tests

From the **Tests** tab, click **Run all tests** to run every test, or select specific tests and click **Run \[number] tests**.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Tests---run-multiple.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=37f04e1080ed5a71370607e22eee6c38" alt="Tests Run Multiple" width="2726" height="374" data-path="images/Tests---run-multiple.png" />
</Frame>

Tests run in parallel, and the runner shows each one passing or failing as it finishes. Click a test to see its full results. Use **Retry failed** to re-run just the failures, or **Retry all** to start over.

## Reviewing past runs

The **Past runs** tab lists every test and test batch that's been run on this environment. Open a past run to see exactly what failed, then go fix the issue in your agent.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Test---past-runs-(1).png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=d22613cf52ba318296b4bbe9d786dc46" alt="Test Past Runs (1)" width="2750" height="756" data-path="images/Test---past-runs-(1).png" />
</Frame>

Once you've made a change, use **Retry failed** to re-run only the tests that didn't pass, or hit the retry icon next to a single test to re-run just that one and verify your fix.

## Test costs

Tests consume credits when LLM-powered features are used, the same as in a real conversation. See the [credits pricing table](/docs/documentation/account-management/billing/credits-pricing-table) for what consumes credits.
