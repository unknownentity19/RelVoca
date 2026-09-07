> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Crew

> Coordinate multiple playbooks to work together seamlessly.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/workflows/Crew-step-cover.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=cdf964c124f12465c706fed088ae5c00" alt="Crew Step Cover" width="1920" height="1080" data-path="images/steps/workflows/Crew-step-cover.png" />

The Crew step lets you group multiple playbooks together so they can hand off tasks between each other directly. Because routing happens within the step itself rather than through a separate routing agent, crews reduce latency and make for a smoother user experience. You might use a Crew step for customer support, where you can have separate playbooks for sales, billing, legal, and general inquiries, each handing off to the next as needed.

## Using the Crew step

Drag the **Crew step** onto the canvas and connect it to a workflow. Once added, configure your root playbook and any subagents.

Each playbook in the crew is aware of the strengths of other playbooks and can hand off tasks to them. With the Crew step, coordinating complex tasks that involve back-and-forth between multiple playbooks becomes seamless.

The root playbook is simply the first playbook triggered when the workflow enters the Crew step. There is no functional difference between the root playbook and other playbooks beyond this. The trigger on the crew configuration panel refers to the root playbook and tells the LLM when to return control back to it.

When prompting a playbook to hand off to another playbook in the crew, use the exact name of the target playbook.

### Exit conditions

Exit conditions are global within a Crew step. Any exit conditions set on individual playbooks inside the crew are ignored. Instead, the exit conditions you define on the Crew step itself apply to all playbooks in the crew equally.

### Configuration

* **Root playbook**: The playbook that is triggered first when the workflow enters the Crew step. Configure its trigger to help the LLM understand when to return control to it.
* **Other playbooks**: Additional playbooks available within the crew. Each playbook's trigger tells the LLM what the playbook does, so write these clearly and specifically to ensure accurate handoffs.
* **Exit conditions**: Conditions that end the crew and move the workflow forward. These apply globally to all playbooks in the crew.
* **Listen for other triggers**: Works identically to the same setting on a standard Agent step.
