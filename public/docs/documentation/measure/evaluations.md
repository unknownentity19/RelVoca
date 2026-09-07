> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Evaluations

> Automatically score RelVoca agent transcripts with custom LLM evaluations to measure resolution, satisfaction, and conversation quality at scale.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Evaluations-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=dafd860125a66d0c8490306f9931e50b" alt="Evaluations Docs" width="2820" height="1556" data-path="images/Evaluations-docs.png" />

Evaluations use AI to analyze transcripts and score them based on criteria you define. Instead of manually reviewing every conversation, you can set up evaluations to automatically assess things like customer satisfaction, resolution rate, or any custom metric that matters to your business. Enabled evaluations run on every new transcript, and you can also run them retroactively on historical conversations. Access evaluations from the **Evaluations** tab in the sidebar of your project.

## Understanding evaluations

Each evaluation consists of a name, a model that performs the analysis, a metric type that determines how results are formatted, and criteria that describe what the model should look for. When an evaluation runs, the model reads the full transcript and returns a score based on your criteria, along with reasoning that explains how it reached that conclusion.

The evaluations table shows all your evaluations with their criteria, type, number of logs (transcripts evaluated), and average credit cost per evaluation. Use the toggle on the right to enable or disable each evaluation.

## Creating an evaluation

<video autoPlay={true} muted={true} loop={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/evaluations.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=fa2bf3554be0a3c05f4d7e41446a07f5" data-path="videos/evaluations.mp4" />

Click **New evaluation** to create a custom evaluation. Give it a descriptive **Name** like "Technical accuracy" or "Upsell success rate", then select a **Model** to analyze the transcripts. GPT-4o mini is the default and works well for most use cases while keeping costs low.

Choose a **Metric** type that determines how results are formatted:

* **Rating** scores transcripts on a numeric scale you define, such as 1 to 5, and works well for subjective measures like satisfaction.
* **Binary** returns a simple pass or fail, useful for yes/no questions like "Did the agent resolve the issue?".
* **Options** lets you define a set of possible outcomes for categorizing conversations.
* **Text** returns a free-form response for open-ended analysis like summaries.

Write a **Criteria** that tells the model exactly what to evaluate. Be specific: rather than "Rate customer satisfaction", write "Rate how satisfied the customer appears based on their tone, whether their questions were answered, and whether they expressed frustration or gratitude."

Before saving, click **Test on last transcript** to see how it performs on a real conversation. This helps you refine your criteria before enabling the evaluation on all future transcripts.

## Viewing evaluation results

Click any evaluation to see its performance over time. The detail view shows a chart of results, the average score, total number of transcripts evaluated, and average credit cost. Below the chart, you can see individual results for each transcript.

Evaluation results are also shown on [transcripts](/docs/documentation/measure/transcripts) and the [analytics page](/docs/documentation/measure/analytics).

## Default evaluations

RelVoca includes three evaluations out of the box:

* **Customer satisfaction** rates how satisfied the customer appears based on conversation tone and content, on a scale of 1 to 5.
* **Deflection rate** determines whether the customer's issue was resolved through self-service or automation without requiring human intervention.
* **Resolution rate** classifies each conversation by outcome: resolved, escalated to a ticket, unresolved, abandoned, or unrelated.

If you need different criteria or metrics, edit the default or create a custom evaluation.

### Resolution categories

The Resolution evaluation sorts every conversation into one of five outcomes. These outcomes feed the Resolution chart on the [Analytics dashboard](/docs/documentation/measure/analytics).

* **Resolved** covers conversations where the agent answered the question, completed the requested action, pointed the customer to the right self-serve resource, or gave a concrete fix or set of next steps to try. A conversation still counts as Resolved when the customer never confirms the fix worked.
* **Ticket created** applies when the agent could not resolve the request inline but successfully created a support ticket on the customer's behalf, and the customer received a ticket ID. This counts as a successful escalation.
* **Unresolved** means the agent neither addressed the request nor escalated it, for example by giving wrong information, looping, hitting a dead end, or saying it can't help with no direction forward.
* **Abandoned** means the customer had an in-scope request but left before the agent delivered anything usable, whether that's an early drop-off or leaving while the agent was still gathering information or asking clarifying questions.
* **Unrelated** means the request had no in-scope purpose the agent could serve: spam, gibberish, adversarial input, or a well-formed but out-of-scope request the agent correctly declined and redirected.

Two boundaries are easy to get wrong. A customer who stops replying after the agent has already delivered a usable answer counts as Resolved, not Abandoned. A request the agent correctly declined because it was out of scope counts as Unrelated, not Abandoned. Interactive elements also count: buttons, cards, and carousels are agent responses even when the turn contains no text, so a customer who leaves after being shown clarifying buttons without clicking is classified as Abandoned rather than Unresolved.

You can review the exact criteria used to classify each conversation from the Analytics drill-down's **Prompt** tab.

## Running evaluations on past transcripts

Evaluations only run automatically on new transcripts created after they're enabled. To score historical conversations, select one or more transcripts in the **Transcripts** tab and click **Batch run evaluation**. Choose which evaluations to apply and they'll run on all selected transcripts.

This is useful when you create a new evaluation and want to backfill results, or when you want to re-evaluate conversations after refining your criteria.

## Evaluation costs

Each evaluation consumes a small amount of credits because it uses an AI model to analyze the transcript. The exact cost depends on the model you select and the length of the transcript. You can see the average credit cost for each evaluation in the table and detail views
