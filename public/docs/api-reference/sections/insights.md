> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Insights overview

> Score conversations against criteria you define, so agent quality becomes a number you can track over time instead of a sample you skim.

An evaluation is a set of criteria you define and then run against
conversations that already happened. It turns "is the agent doing a good job"
into a score you can watch over time, rather than a handful of transcripts
somebody read on a Friday.

## Endpoints

### Evaluation

| Endpoint                                                                                                       | Description                         |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| <Badge color="green" size="sm">GET</Badge> [List evaluations](/docs/api-reference/evaluation/list-evaluations)      | List all evaluations by project ID. |
| <Badge color="blue" size="sm">POST</Badge> [Create evaluation](/docs/api-reference/evaluation/create-evaluation)    | Create a new evaluation.            |
| <Badge color="green" size="sm">GET</Badge> [Get evaluation](/docs/api-reference/evaluation/get-evaluation)          | Get an evaluation by ID.            |
| <Badge color="orange" size="sm">PATCH</Badge> [Update evaluation](/docs/api-reference/evaluation/update-evaluation) | Update an evaluation by ID.         |
| <Badge color="red" size="sm">DELETE</Badge> [Delete evaluation](/docs/api-reference/evaluation/delete-evaluation)   | Delete an evaluation by ID.         |
| <Badge color="blue" size="sm">POST</Badge> [Run evaluation](/docs/api-reference/evaluation/run-evaluation)          | Run an evaluation.                  |

## The shape

An **evaluation** is a definition: what you are measuring and how. Creating one
does not score anything by itself. Running it applies it and produces a result.

```bash theme={null}
curl -X POST "https://realtime-api.voiceflow.com/v1/stable/evaluation/$EVALUATION_ID/run" \
  -H "Authorization: Bearer $VF_PAT"
```

That split is deliberate. The definition is stable and version-controlled by
you; runs accumulate against it, so a score means something over time rather
than being a one-off measurement with its own private criteria.

## Evaluations and transcripts

Evaluations score conversations that already happened, which makes
[Observe](/docs/api-reference/sections/observe) the source of what they measure.
Search for the transcripts you care about, then evaluate that set.

## How this differs from automated testing

Evaluations judge real conversations after the fact.
[QA](/docs/api-reference/sections/qa) does the opposite: it replays scripted
conversations you wrote, and asserts the agent still answers the way you
decided it should. Use evaluations to find out what is happening in production,
and QA to stop a change breaking what already worked.

## Where to go next

Once you know what to look for, encode it as a [test](/docs/api-reference/sections/qa)
so a regression fails loudly instead of showing up in next month's numbers.
