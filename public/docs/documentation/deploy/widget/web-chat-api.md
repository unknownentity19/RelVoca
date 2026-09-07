> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat widget API

> Control the chat widget from your own code: choose its environment, persist conversations, pass a user ID and variables, trigger intents, and listen for events.

RelVoca's chat widget API gives you programmatic control over the [widget's](/docs/documentation/deploy/widget/embedding-the-chat-widget) behavior. You can customize how conversations persist, pass in user data, trigger intents, send proactive messages, and listen for events.

## Understanding the default snippet

When you copy the widget code from **Widget** in the sidebar, you get a snippet like this:

```javascript theme={null}
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: 'YOUR_PROJECT_ID' },
          url: 'https://general-runtime.voiceflow.com',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
	  v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

The `chat.load()` function initializes the widget. You can extend it with additional configuration options described in this guide.

## Choosing which environment the widget loads

By default, the widget respects your project's [traffic split](/docs/documentation/deploy/environments/traffic-split): each new session is routed to an environment based on the split you've configured, so the widget works with A/B tests and gradual rollouts without any extra configuration.

To force the widget to load a specific environment, pass that environment's alias as `versionID`. Copy the alias from the **Alias** column in **Settings** → **Environments**.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  versionID: 'my-feature'
});
```

When `versionID` is set, the widget loads that environment's live version and ignores the traffic split. If the environment has no published version yet, the widget won't render any messages.

<Note>
  If your project was created before environments launched and has not yet been migrated, the legacy `development`, `staging`, and `production` values continue to work as `versionID`. After migrating, update your snippet to use your new environment aliases (or remove `versionID` to use the traffic split).
</Note>

## Setting the runtime URL

<Callout icon="/images/icons/enterprise.svg">
  This feature is only available to Enterprise customers who are hosted on a Private Cloud.
</Callout>

The `url` property defines the runtime endpoint the widget communicates with. Private Cloud customers should replace the default URL with their dedicated runtime endpoint provided by RelVoca.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://your-private-cloud-endpoint.com'
});
```

## Configuring chat persistence

Chat persistence determines whether users return to an ongoing conversation or start fresh when they reload the page, open a new tab, or come back later. Configure this with the `persistence` property inside the `assistant` object.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  assistant: {
    persistence: 'localStorage'
  }
});
```

| Option           | Behavior                                                                      |
| ---------------- | ----------------------------------------------------------------------------- |
| `localStorage`   | Default. Conversations persist across page reloads and browser sessions.      |
| `sessionStorage` | Conversations persist across page reloads but reset when all tabs are closed. |
| `memory`         | Conversations reset on every page reload or new tab.                          |

## Passing a custom user ID

You can assign a unique ID to each user with the `userID` property. This ID becomes available in your agent as the built-in `{user_id}` variable, which is useful for identifying users across sessions and personalizing interactions.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  userID: 'user_12345'
});
```

## Passing custom variables

You can pre-fill variables when the widget loads using the `launch.event.payload` field. These values populate the `last_event` system variable and can be accessed using [Code step](/docs/documentation/build/steps/code).

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  launch: {
    event: {
      type: 'launch',
      payload: {
        user_name: 'Mary',
        user_email: 'mary@example.com'
      }
    }
  }
});
```

These values can be accessed using a Code step in the format shown below. Many users use an [initialization workflow](/docs/documentation/build/framework/initialization-workflow) to run logic based on these values.

```javascript theme={null}
user_name = last_event.payload.user_name
user_email = last_event.payload.user_email
```

Note that the Code step can't create new [variables](/docs/documentation/build/data/variables). You'll need to create `user_name` and `user_email` as variables in your project first. Also, `last_event` is updated on each user interaction (eg: when the widget loads, an intent triggers, or a button is clicked), so capture these values at the start of the conversation.

## Annotating transcripts with metadata

You can pass user profile information that appears in your [Transcripts](/docs/documentation/measure/transcripts). This metadata is for labeling conversations in the UI only and isn't available to your agent's logic.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  user: {
    name: 'Mary',
    image: 'https://example.com/avatar.jpg'
  }
});
```

## API methods

Once the widget script loads, it registers the API as `window.voiceflow.chat`. You can use these methods to control the widget programmatically.

| Method                        | Description                                                                                                                                                                        | Available in overlay mode | Available in embedded mode |
| :---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------: | :------------------------: |
| `load({ config })`            | Initializes the chat widget. Parses configuration, fetches remote assistant settings from the RelVoca API. Nothing works until `load` is called.                                 |            Yes            |             Yes            |
| `open()`                      | Opens the chat window. If the session is idle, also triggers the launch event (starts the conversation). Emits a `relvoca:open` broadcast event. Only effective in overlay mode. |            Yes            |             No             |
| `close()`                     | Closes the chat window, interrupts audio, clears no-reply timeouts, and saves the session. Emits a `relvoca:close` broadcast event. Only effective in overlay mode.              |            Yes            |             No             |
| `destroy()`                   | After calling this, all methods become no-ops until `load` is called again..                                                                                                       |            Yes            |             Yes            |
| `show()`                      | Shows the widget again after it was hidden with `hide()`. Only effective in overlay mode.                                                                                          |            Yes            |             No             |
| `hide()`                      | Hides the entire widget (chat window AND launcher button) from view. Only effective in overlay mode.                                                                               |            Yes            |             No             |
| `showPopover()`               | Shows the chat as a popover dialog. Only effective in overlay mode.                                                                                                                |            Yes            |             No             |
| `hidePopover()`               | Hides the popover dialog with a closing animation. Only effective in overlay mode.                                                                                                 |            Yes            |             No             |
| `isPopoverShowing()`          | Returns whether the popover is currently visible (including during close animation). Only effective in overlay mode.                                                               |            Yes            |             No             |
| `interact({ action })`        | Sends a simulated user action. Can trigger specific intents or events.                                                                                                             |            Yes            |             Yes            |
| `proactive.push(...messages)` | Pushes proactive messages (speech bubbles) that appear near the launcher button before the user opens chat. Only effective in overlay mode.                                        |            Yes            |             No             |
| `proactive.clear()`           | Clears all proactive messages. Only effective in overlay mode.                                                                                                                     |            Yes            |            No-op           |

### Examples

**Open the widget automatically after 3 seconds:**

```javascript theme={null}
setTimeout(() => {
  window.voiceflow.chat.open();
}, 3000);
```

**Trigger an intent when a button is clicked:**

```javascript theme={null}
document.getElementById('support-btn').addEventListener('click', () => {
  window.voiceflow.chat.open();
  window.voiceflow.chat.interact({
    type: 'intent',
    payload: { intent: { name: 'support_request' } }
  });
});
```

## Sending proactive messages

Proactive messages appear outside the chat window before users open it. They're useful for prompting engagement, such as offering help or announcing promotions. These messages don't appear in transcripts and don't consume credits.

### Pushing messages

Use `window.voiceflow.chat.proactive.push()` to send one or more messages:

```javascript theme={null}
// Single message
window.voiceflow.chat.proactive.push({
  type: 'text',
  payload: { message: 'Need help? Ask me anything!' }
});

// Multiple messages
window.voiceflow.chat.proactive.push(
  { type: 'text', payload: { message: 'Welcome back!' } },
  { type: 'text', payload: { message: 'Check out our new features.' } }
);
```

### Clearing messages

Use `window.voiceflow.chat.proactive.clear()` to hide all proactive messages:

```javascript theme={null}
window.voiceflow.chat.proactive.clear();
```

### Triggering messages based on user behavior

You can trigger proactive messages when users perform specific actions. For example, show a message when someone visits a certain page:

```javascript theme={null}
if (window.location.pathname === '/pricing') {
  window.voiceflow.chat.proactive.clear();
  window.voiceflow.chat.proactive.push({
    type: 'text',
    payload: { message: 'Have questions about our plans? I can help!' }
  });
}
```

## Listening for events

The widget emits events you can listen for using the `message` event listener. RelVoca events are stringified JSON objects with a `type` beginning with `relvoca:`.

```javascript theme={null}
window.addEventListener('message', (event) => {
  if (typeof event.data === 'string' && event.data.startsWith('{"type":"relvoca:')) {
    const data = JSON.parse(event.data);
    console.log(data.type);
  }
});
```

| Event type               | Description                                |
| ------------------------ | ------------------------------------------ |
| `relvoca:open`         | The widget was opened.                     |
| `relvoca:close`        | The widget was closed.                     |
| `relvoca:interact`     | The assistant responded to an interaction. |
| `relvoca:save_session` | The conversation state was cached.         |

## Allowing dangerous HTML elements

<Danger>
  Only enable dangerous HTML if you understand XSS risks and are using your own trusted code. [Learn more about XSS vulnerabilities](https://owasp.org/www-community/attacks/xss/).
</Danger>

By default, certain HTML elements like `<script>` and `<iframe>` are blocked in messages for security reasons. You can enable them, but doing so introduces cross-site scripting (XSS) vulnerabilities.

```javascript theme={null}
window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  allowDangerousHTML: true
});
```

The following elements are allowed by default:

```text theme={null}
a, audio, b, blockquote, br, code, dd, del, details, div, dl, dt, em, h1, h2, h3, h4, h5, h6, hr, i, img, input, ins, kbd, li, ol, p, picture, pre, q, rp, rt, ruby, s, samp, section, source, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, tr, tt, ul, var, video
```
