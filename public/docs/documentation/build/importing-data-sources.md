> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Importing data sources

> Ground your agent's responses in your own content.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Knowledge-base-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=f44ab9c923f5d0b1679c0ee7e2497c2d" alt="Knowledge Base Docs 1" width="2820" height="1500" data-path="images/Knowledge-base-docs-1.png" />

The knowledge base gives your agent access to your own content - product docs, support articles, company policies, pricing pages, FAQs. When a user asks a question, the agent retrieves the most relevant content and uses it to generate an accurate, grounded response.

Instead of scripting every possible answer, you upload your content once and let the agent find what it needs.

## Adding a data source

<Steps>
  <Step title="Navigate to the knowledge base" stepNumber={1} titleSize="h3">
    Click 'Knowledge base' in the navigation menu, or use the shortcut  <kbd>Shift + K</kbd>
  </Step>

  <Step title="Press 'Add data sources'" titleSize="h3">
    Select the type of data you'd like to import

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Adding-data-sources-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=30104ea767ae69ca77109dd0d626efad" alt="Adding Data Sources Docs" width="1294" height="1010" data-path="images/Adding-data-sources-docs.png" />
  </Step>
</Steps>

## Data types

RelVoca supports an array of data sources:

| Type            | What it imports                                                                              |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Web page(s)** | One or more URLs - paste each on a new line. Must be publicly accessible.                    |
| **Sitemap**     | All pages from a site via sitemap URL. Ideal for full help centers or doc sites.             |
| **Docs**        | `.pdf`, `.txt`, or `.docx` files up to 10 MB. Only text content is imported.                 |
| **Table**       | `.csv` or `.xlsx` files up to 10 MB. Each row is a chunk; column headers become field names. |
| **Plain text**  | Paste raw content directly.                                                                  |
| **Zendesk**     | Import articles directly from your Zendesk knowledge base.                                   |
| **Shopify**     | Import product catalogues, inventory data and SKU info.                                      |

<Tip>
  You an also import and manage data sources through the [Knowledge base API](/docs/api-reference/sections/build).
</Tip>

## Refresh rate

For URL and integration data sources, set a refresh rate to keep your knowledge base in sync with the source. You can do this on import, or retroactively by pressing the checkbox next to the data source or folder.

| Option      | Best for                                       |
| ----------- | ---------------------------------------------- |
| **Never**   | Static content that won't change               |
| **Daily**   | Frequently updated content (blogs, news sites) |
| **Weekly**  | Occasionally updated content (support centers) |
| **Monthly** | Stable content (policies, pricing pages)       |

## LLM chunking strategies

When your agent queries the knowledge base, it finds chunks of content most similar to the user's question. LLM chunking strategies use AI to split your content into optimized chunks - improving retrieval quality and helping your agent find useful answers.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/smart-chunking.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=9d835ea85eded98a0563915732d0bb08" alt="Smart Chunking" width="1060" height="1140" data-path="images/smart-chunking.png" />

| Strategy                  | Description                                               | Best for                                                            |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| **Smart chunking**        | Breaks content into logical sections grouped by topic     | Complex documents with varied topics (policy docs, course catalogs) |
| **FAQ optimization**      | Generates sample questions each section could answer      | Product info, help center content                                   |
| **Remove HTML and noise** | Cleans up messy formatting to make text easier to process | Blog posts, markdown-heavy docs, CMS exports                        |
| **Add topic headers**     | Adds brief summaries at the start of each section         | Long documents needing context (research papers, onboarding guides) |
| **Summarize**             | Keeps only key points and removes filler                  | Dense, lengthy content (legal agreements, strategy briefs)          |

<Info>
  LLM chunking strategies consume credits on each sync. If your content doesn't change often, reduce your refresh rate to avoid unnecessary credit usage. No credits are consumed when syncing without an LLM chunking strategy selected.
</Info>

Chunking strategies aren't one-size-fits-all. Experiment with different combinations on each data source to find what gets your agent the best results.

## Metadata

Attach metadata to any data source to filter what gets returned when your agent [queries the knowledge base](/docs/documentation/build/querying-the-knowledge-base). Useful when you have multiple brands, product lines, locales, or subscription tiers and your agent needs to make sure the right information reaches the right users.

For example, if you have different policies for enterprise and self-serve customers, tag each data source with `plan: enterprise` or `plan: self-serve` and filter queries accordingly.

Click **+** in the **Metadata** section of the import config to add key-value pairs:

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Meta-data-docs.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=0eba659229f3527d86c87b9ac0dcb0da" alt="Meta Data Docs" width="1294" height="908" data-path="images/Meta-data-docs.png" />

## Knowledge base and environments

Every environment in your project shares the same knowledge base, but each environment decides which documents from the shared set it uses, and stores its own metadata for those documents.

Changes to the knowledge base go live when you publish the environment, just like any other change to your agent.

Here's a few important things to keep in mind:

* **Content edits apply everywhere the document is used.** When you edit a knowledge base document and publish, this edit will be applied to all environments. When an environment is published, this edit will become visible to users interacting with that environment. Other environments that use the same document will pick up the new content the next time each of them publishes.
* **Metadata can be different on each environment.** The same document can carry different metadata on different environments, which is useful for testing how different metadata affects what the agent retrieves.
* **Integrations only need to be set up once.** After you connect Shopify or Zendesk as knowledge base sources on one environment, you can use the same connection from every other environment.

When you create a new environment by cloning an existing one, the new environment starts with the same set of documents as the one you cloned from.

## Troubleshooting imports

If an import fails, hover over the error icon for details. Failed files are handled gracefully - they won't break your project and the rest of your import will still process.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Error-importing-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=82588df6d82f10043c272c3574327a82" alt="Error Importing Docs" width="1294" height="562" data-path="images/Error-importing-docs.png" />
</Frame>

## Developers

<Card title="Knowledge base API" icon="https://mintcdn.com/voiceflow-009a8802/7tXLhWFbjNcyq704/images/icons/documentation.svg?fit=max&auto=format&n=7tXLhWFbjNcyq704&q=85&s=3cc1ccb7332cb518c4867900c5351b68" href="/docs/api-reference/sections/build" width="24" height="24" data-path="images/icons/documentation.svg">
  The Knowledge base API gives you programmatic access to the documents that power your agent’s knowledge base. You can use it to [create](/docs/api-reference/document/create-text-document), [retrieve](/docs/api-reference/document/get-document), [update](/docs/api-reference/document/update-document), and [delete](/docs/api-reference/document/delete-document) documents, as well as manage their metadata and individual chunks.
</Card>
