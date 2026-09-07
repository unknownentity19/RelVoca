> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set

> Set or update variable values in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/images/steps/workflows/Setstepcover.png?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=4c79d8b54a9f17c45f7d2df2e2a3bb19" alt="Set step" width="1920" height="1080" data-path="images/steps/workflows/Setstepcover.png" />

The Set step lets you set or update the value of [variables](/docs/documentation/build/data/variables) during your workflow. Use it to store user preferences, save important pieces of context, or reset variables at specific points in your conversation flow.

If you'd like to set the value of a variable using code, use the [Code step](/docs/documentation/build/steps/code) instead.

## Using the Set step

Drag the Set step onto the canvas and connect it to the step before it. Click on the step to configure which variables to set and their values.

### Configuration

* **Variables to set**: Add one or more variables to update. For each variable, choose how to set its value:
  * **Value**: Enter a specific text or number value directly.
  * **Prompt**: Use AI to generate the variable's value based on a prompt you write.
* **Properties to set**: Add one or more [transcript properties](/docs/documentation/measure/transcripts) to attach custom metadata to the conversation transcript. Unlike variables, properties aren't used during the conversation. They're saved to the transcript for later filtering and analysis.
* **Parallel execution**: Toggle this on to allow the workflow to continue immediately without waiting for all variables to be set. When off, the workflow waits for all variables to be set before moving to the next step.
