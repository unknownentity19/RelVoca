> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Function

> Run custom code as a function tool in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Function-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=ac4b887d88475d17a93c0cfe97f4d0f2" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Function-step-cover.png" />

The Function step lets you execute a [function tool](/docs/documentation/build/tools/function-tool) at a specific point in your workflow. Function tools are reusable pieces of custom code that perform specific tasks, like data transformations, API calls, or complex calculations. Use this step when you need to run custom logic that goes beyond what built-in steps can do.

## Using the Function step

Drag the Function step onto the canvas and connect it to the step before it. Click on the step to select which function tool to run.

Select an existing function tool from the dropdown, or create a new one by clicking **New function tool**. Once selected, you can map the function's outputs to variables in your workflow.

### Configuration

* **Output variables**: Map each output from the function to a [variable](/docs/documentation/build/data/variables) in your agent. Click on an output variable and select which variable should receive that data. Any outputs you don't map won't be saved.
* **Async execution**: Toggle this on to allow your workflow to continue immediately without waiting for the function to complete. When off, the workflow waits for the function to finish before moving to the next step. This is useful for functions that take a long time to run but that your agent doesn't rely on, such as analytics collection functions.

### Function Code

When the workflow reaches a Function step, the runtime resolves the step's input mappings into `args.inputVars `
