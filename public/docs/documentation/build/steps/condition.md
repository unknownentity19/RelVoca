> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Condition

> Route your workflow based on variable values or logic.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Condition-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=401d7243d2e7061fae38c939700cda74" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Condition-step-cover.png" />

The Condition step lets you create different paths in your workflow based on whether specific conditions are met. You might use it to check if a user is logged in, verify that a form is complete, or route users differently based on their account type.

## Using the Condition step

Drag the Condition step onto the canvas and connect it to the step before it. Click on the step to set up your conditions and paths.

### Configuration

* **Paths**: Create paths that your workflow can follow. For each path, define conditions by selecting a variable, choosing a comparison operator (eg: is, contains, greater than), and entering a value to compare against. Use **Match all** for AND logic or **Match any** for OR logic when adding multiple conditions to a path.
* **Else path**: Toggle this on to add a fallback path when no conditions are met.
