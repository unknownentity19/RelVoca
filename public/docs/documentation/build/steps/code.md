> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Code

> Run JavaScript code in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Code-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=28062a6c395dc0a972182347f6b55427" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Code-step-cover.png" />

The Code step lets you write and execute JavaScript snippets directly in your workflow. Use it for tasks like parsing data, manipulating variables, performing calculations, or adding conditional logic that determines which path your workflow follows next.

The Code step is best suited for short code snippets. If you'd like to build reusable functions, use the [Function step](/docs/documentation/build/steps/function) instead.

## Using the Code step

Drag the Code step onto the canvas and connect it to the step before it. Click on the step to open the code editor where you can write your JavaScript code.

All of your agent's variables are automatically available in the code editor. You can reference and modify them directly without using curly braces. For example, to increment a `score` variable by 1, simply write `score = score + 1`.

## Configuring paths

The Code step includes two paths:

* **Default path**: The workflow follows this path when your code runs successfully.
* **Failure path**: The workflow follows this path if your code encounters an error during execution. Toggle this path on to handle errors gracefully.

You can also add up to 10 custom paths to route users based on your code's logic. Name each custom path, then use `return [path_name]` in your code to direct the workflow to that specific path. If your code doesn't return a path name, the workflow continues through the `Default` path.

## Limitations

* The Code step cannot make requests to external servers or call external APIs. Use the [API step](/docs/documentation/build/steps/api) or [Function step](/docs/documentation/build/steps/function) for these tasks.
* The Code step does not support importing JavaScript modules.
* Variables created inside the Code step only exist while the step is running. To use a variable after the Code step finishes, [create it as a variable inside your project first](/docs/documentation/build/data/variables) before referencing it in your code.
