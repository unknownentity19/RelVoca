> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Transcripts

> Review and analyze every conversation your agent has with users.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Transcripts-docs-1.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=828524e0bb37a937bc83f6a7ea683af1" alt="Transcripts Docs 1" width="2820" height="1556" data-path="images/Transcripts-docs-1.png" />

Transcripts are automatically generated records of conversations between your agent and its users. Every interaction across chat and voice is captured, giving you complete visibility into how your agent performs in production and helping you identify opportunities to improve it. You can access transcripts from the **Transcripts** tab in the sidebar.

## Understanding the transcripts table

The transcripts table displays key information about each conversation at a glance. By default, you'll see the date, platform, user ID, environment, credits consumed, and duration. You can customize which columns appear by clicking the table settings icon and adding or removing fields.

Evaluation results can also be displayed as columns, letting you quickly scan conversation quality metrics like customer satisfaction or resolution rate directly from the table view.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/trasncripts-view.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=4e4ee5695fe25847eb960656774ab292" alt="Transcripts View" width="3024" height="1718" data-path="images/trasncripts-view.png" />

## Filtering transcripts

Use the filter chips at the top of the table to narrow down your view. You can filter by date range, platform, user ID, [environment](/docs/documentation/deploy/environments), credits consumed, duration, evaluation results, or custom properties. Filters help you focus on specific conversation types, such as high-cost interactions or conversations with low satisfaction scores.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Screenshot2026-02-18at11.22.45AM.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=f41959f1388ed8b903a540cd68062a5d" alt="Screenshot2026 02 18at11 22 45AM" width="3024" height="1720" data-path="images/Screenshot2026-02-18at11.22.45AM.png" />

## Reviewing individual transcripts

Click any transcript to open the detailed view. The full conversation appears on the right, with metadata and evaluation results on the left.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Screenshot2026-02-18at11.23.00AM.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=2a1d89abd2a0a73bd79d5bd802cca51d" alt="Screenshot2026 02 18at11 23 00AM" width="3024" height="1714" data-path="images/Screenshot2026-02-18at11.23.00AM.png" />

The metadata panel displays the date, user ID, platform, duration, and credits consumed for the conversation. If the user has had previous conversations with your agent, you can access them directly from the **Previous conversations** link.

Any [evaluations](/docs/documentation/measure/evaluations) that ran on the transcript appear below the metadata. Each evaluation shows its result along with the model's reasoning, helping you understand how the score was determined.

The **Logs** section at the bottom provides a timestamped breakdown of everything that happened during the conversation, including inputs, outputs, warnings, debug information, and credit consumption for each step. Use logs to debug issues or understand why your agent responded a certain way.

## Attaching custom properties

Properties let you attach custom metadata to transcripts from within your workflows. Unlike variables, properties aren't used during the conversation. They're saved to the transcript for later filtering and analysis.

For example, you might set properties for the customer's plan tier, the topic of their inquiry, or whether a sale was made. You can then filter transcripts by these properties to analyze specific segments of conversations.

To set a property, use the [Set step](/docs/documentation/build/steps/set) in a workflow and add the property under the **Properties to set** header. To manage available properties, click **Manage properties** in the transcripts view.

## Customizing the table view

Click the table settings icon to choose which columns appear in your transcripts table. You can add or remove default fields, evaluation results, and custom properties to build a view tailored to the metrics that matter most to your team.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/table-view.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=288e7b09bffa4724b04a355408ae8d7d" alt="Table View" width="3024" height="1718" data-path="images/table-view.png" />

## Configuring transcript settings

Click the settings icon to access transcript preferences. **Save tests to transcripts** saves conversations from the test tool as reviewable transcripts, which is useful for QA workflows. **Save transcripts with no interaction** controls whether transcripts are saved when the user never responds. Disable this to reduce noise from abandoned sessions.

## Running batch evaluations

You can run [evaluations](/docs/documentation/measure/evaluations) on past transcripts to retroactively score conversations. Select one or more transcripts, click **Batch run evaluation**, and choose which evaluations to apply. This is useful for backfilling metrics when you create new evaluations or want to analyze historical performance.
