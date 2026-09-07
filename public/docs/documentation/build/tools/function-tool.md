> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Function tool

> Run custom JavaScript during a conversation.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Fucntion-tool-docs-2.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=d1451bc3fcc1cb6a913954031afd5dcf" alt="The Function tool configuration panel in the RelVoca editor" width="2820" height="924" data-path="images/Fucntion-tool-docs-2.png" />

The Function tool lets your agent run custom JavaScript mid-conversation. Use it for data transformation, calculations, formatting, or any lightweight processing that doesn't require an external API call.

## Creating a Function tool

<Steps>
  <Step title="Create the tool">
    You can add, or create a Function tool directly from within a [playbook](/docs/documentation/build/playbooks).

    <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Function-playbook-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=07dba7fbeee724f5ddb36602665b1c71" alt="Function Playbook Docs" width="1294" height="728" data-path="images/Function-playbook-docs.png" />

    <Info>
      You can also create Function tools from within a workflow using the [Function step](/docs/documentation/build/steps/function), or from the tools CMS tab. Once the tool exists, you can [reference it](/docs/documentation/build/editor/references) directly in your instructions.
    </Info>
  </Step>

  <Step title="Define input variables">
    Add the variables your function needs as inputs. These are passed in by a [playbook](/docs/documentation/build/playbooks) or a [Function step](/docs/documentation/build/steps/function) and are accessible inside your code. Add a description to each so the agent knows what to pass.
  </Step>

  <Step title="Write your function">
    Write your JavaScript function code in the  editor.  Return your output by setting the output variable values - these are passed back to the conversation.
  </Step>

  <Step title="Define output variables">
    Add output variables for any values your function should return to the agent. These are available in the conversation after the function runs.
  </Step>

  <Step title="Test the function">
    Click **Run** in the top right corner to test. Click **Variables** to enter test values for your inputs, then **Run** to execute. The output panel shows your returned values and any console logs.
  </Step>
</Steps>

## Using the Function tool

There are two ways to use a Function tool:

### In a playbook

Add the Function tool to a playbook's Tools editor. The agent calls it autonomously when the conversation requires it - based on the tool's description, your playbook instructions, and the conversation context.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Function-playbook-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=07dba7fbeee724f5ddb36602665b1c71" alt="Function Playbook Docs" width="1294" height="728" data-path="images/Function-playbook-docs.png" />

For example, a "Calculate Shipping Cost" function added to an order playbook - the agent passes in the order weight and destination, runs the calculation, and uses the result in its response.

Give the tool a clear name and description that covers both what it does and when the agent should use it. Use playbook instructions to layer on any supporting context.

### In a workflow

Drag a [Function step](/docs/documentation/build/steps/function) onto the canvas and select the Function tool you want to run. Input variables are mapped explicitly in the step config - the function runs at that point in the flow every time.

Use this when the logic is part of a fixed process - for example, always formatting a date before displaying it, or always calculating a total before confirming an order.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Functions-step-docs.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=dca417e1303a06948c659c7ccd6793f3" alt="Functions Step Docs" width="1294" height="728" data-path="images/Functions-step-docs.png" />

## Running Function tools asynchronously

Both Function tools in workflows or playbooks can run async. The async toggle is available at the instance level, not tool level allowing you to use the same tool, with different config.

<img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/Async-function-docs-1.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=75bc2989ef23d792384d93692b6d6471" alt="Async Function Docs 1" width="2192" height="1216" data-path="images/Async-function-docs-1.png" />

When you run an API tool async, it will immediately continue the conversation without waiting for the results of the API tool to return.

### Fire and forget

Use async when you don't need the Function response to continue the conversation. The call fires in the background and the agent moves on immediately.

This is ideal for logging and side effects - sending an event to an analytics platform, writing to a CRM, triggering a webhook, or any operation where the agent doesn't need to reference the result. The user gets a faster experience because the conversation never pauses for a background task.

### Async with deferred response

Use async when the Function call is slow or not immediately relevant, but the response still matters. The call fires in the background and the agent continues the conversation naturally. When the response arrives, it's captured and the agent can reference it on the next turn.

For example, during your [initialization workflow](/docs/documentation/build/framework/initialization-workflow), you authenticate the user and simultaneously fire an async call to fetch their recent orders. By the time authentication completes and the agent takes over, the order data is already available. The agent can open the conversation with "I see you have a recent order for a queen mattress arriving Thursday — is that what you're calling about?" instead of asking the user to explain why they're reaching out.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Starting-message-docs-2.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=c1921b4b1a90864606db298065181449" alt="Starting Message Docs 2" width="2310" height="1342" data-path="images/Starting-message-docs-2.png" />

This pattern is powerful for predictive experiences - preloading context the agent will likely need so the conversation starts ahead of the user. It also works for long-running operations, large dataset searches, or any third-party service with unpredictable latency. Instead of the user waiting on a loading state, the agent keeps moving and weaves the result in when it's ready.

## How function code works

Function code runs remotely in a secure, isolated sandbox. On each execution, the runtime sends your code and input values to the sandbox, and executes it.

It receives `args`, and returns an object describing what the runtime should do next:

```javascript theme={null}
export default async function main(args) {
  const { user_name } = args.inputVars;
  return {
    outputVars: { user_email: `${user_name}@example.com` },
    trace: [{ type: 'text', payload: { message: `Hello, ${user_name}!` } }],
    next: { path: 'success' },
  };
}
```

<Warning>
  Functions run on ES6 JavaScript using the V8 engine. Browser APIs (e.g. `window`, `document`) and module imports (`require`, `import`) are not supported.
</Warning>

### Accessing input variables

`args.inputVars` contains one key per **input variable** declared on the function. Input values come from the Function step's input mappings, or are generated by the agent when called from a playbook.

```javascript theme={null}
const { order_id, customer_email } = args.inputVars;
```

### The return value

Your function communicates back exclusively through its return value - nothing else persists between runs. An invalid malformed return value fails the step.

```typescript theme={null}
{
  outputVars?: Record<string, string | number | boolean | null>;
  next?: { path: string }; // function step only
  trace?: Array<{ type: string; payload?: unknown }>;
}
```

#### `outputVars`: setting variables

Maps the function's declared **output variables** to values. Keys must match declared output variables and values must be plain data (`string`, `number`, `boolean`, or `null`).

```javascript theme={null}
return {
  outputVars: { order_total: 129.99, order_status: 'shipped' },
};
```

#### `next`: choosing a path

Paths are only applied in function steps, not within a playbook or agent.

Selects which of the function's declared **paths** the workflow follows. The `path` value must exactly match a declared path code - returning an unknown code fails the step.

```javascript theme={null}
return {
  next: { path: 'found' },
};
```

* If the function declares paths but your code returns no `next`, the workflow stops.
* If the function declares no paths, `next` is ignored and the step continues through the default port.

<Info>
  **Advanced:** `next` also accepts `{ listen: true }` to pause on the step and wait for the user's next input or event - used to build interactive [chat widget extensions](/docs/documentation/deploy/widget/web-chat-extensions).
</Info>

#### `trace`: sending messages and custom events

An array of [trace](/docs/api-reference/trace-types) objects appended to the agent's response, in order. Every trace needs a `type` and`payload`.

```javascript theme={null}
return {
  trace: [{ type: 'text', payload: { message: 'Your order has shipped! 🎉' } }],
};
```

### Making API requests with `fetch`

Functions include a global `fetch` for HTTP requests. It's similar to the standard Fetch API, with one key difference: **the response body is fetched and parsed**, and returned as a plain object - there are no `.json()` or `.text()` methods to call.

```javascript theme={null}
export default async function main(args) {
  const response = await fetch('https://api.example.com/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: args.inputVars.user_id }),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const order = response.json; // a property, not a method
  return {
    outputVars: { order_id: order.id },
    next: { path: 'success' },
  };
}
```

The second argument supports the standard options (`method`, `headers`, `body`). The resolved response object contains:

| Property               | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `ok`                   | `true` when the status is 2xx                               |
| `status`, `statusText` | HTTP status code and message                                |
| `json`                 | The parsed body, when the response's `Content-Type` is JSON |
| `text`                 | The body as a string, for all other content types           |
| `headers`              | Response headers - each key maps to an **array** of values  |
| `url`, `redirected`    | Final URL and whether any redirects were followed           |

By default, the body lands in `response.json` when the `Content-Type` header indicates JSON, and in `response.text` otherwise. To force a specific format, pass a third argument: `fetch(url, init, { parseType: 'json' | 'text' | 'arrayBuffer' | 'blob' })`.

* Response bodies are limited to **1 MB** - larger responses throw an error.
* Requests are bounded by the function's overall timeout; streaming responses and WebSockets are not supported.
* A network failure, timeout, or oversized response throws - uncaught, this fails the step and routes it down the error path.
