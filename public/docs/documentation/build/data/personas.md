> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Personas

> Test your agent as a specific kind of user.

Personas let you start a conversation with specific [variable](/docs/documentation/build/data/variables) values already in place. They're useful for testing how your agent handles different customer types or account states without setting things up by hand each time.

You can create a new persona or use an existing persona in three places:

* **Run panel**: pick a persona when manually testing your agent with the **Run** button.
* **Prototype links**: pick a persona when generating a prototype link, and it applies for anyone who opens the link.
* [**Tests**](/docs/documentation/measure/tests): click **Add persona** at the top of a test to run it as a specific persona every time.

Personas can't be used when you embed the chat widget on a live site. They're meant for testing, not for real users.

## Personas and environments

Personas are scoped to the [environment](/docs/documentation/deploy/environments/overview) they were created in. Cloning an environment duplicates its personas. Merging an environment into `Main` replaces the personas there with the ones from the source.
