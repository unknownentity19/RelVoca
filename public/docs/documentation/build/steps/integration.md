> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integration

> Use a third-party integration tool in your workflow.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Integration-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=166f8f8e55a1bc2d20ac839e19dba7c1" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/workflows/Integration-step-cover.png" />

The Integration step lets you call any [third-party integration tool](/docs/documentation/build/tools/overview) at a specific point in your workflow. Use it to interact with external services like [Gmail](/docs/documentation/build/tools/gmail-tool), [Salesforce](/docs/documentation/build/tools/salesforce-tool), or [Zendesk](/docs/documentation/build/tools/zendesk-tool), triggering actions such as sending emails, updating records, or fetching data when your workflow reaches this step.

## Using the Integration step

Drag the Integration step onto the canvas and connect it to the step before it. Click on the step to select which integration tool to use.

First, choose the integration you want to use (eg: [Gmail](/docs/documentation/build/tools/gmail-tool), [Google Sheets](/docs/documentation/build/tools/google-sheets-tool), [Zendesk](/docs/documentation/build/tools/zendesk-tool)). Then, select the specific tool from that integration (eg: "Send email" for Gmail, or "Get customer" for Shopify). If the integration isn't connected yet, you'll need to connect it before you can use its tools. You can then configure each input variable for your tool call (eg: the email address that you'd like to send an email to) - if you'd prefer to set these agentically, use the integration via a [Playbook](/docs/documentation/build/playbooks) instead.

### Configuration

* **Input variables**: Provide the required information for the tool to work. Each tool has different required inputs. For example, Gmail's "Send email" tool needs a recipient address, subject, and body. Click on each input to enter a value or select a variable.
* **Capture response**: Save the tool's response to a variable for use later in your workflow. Click **+ Add** to create a new variable that will store the response data. You can specify an object path to capture specific parts of the response.
