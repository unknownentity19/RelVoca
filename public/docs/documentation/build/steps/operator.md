> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Operator

> Route your workflow with LLM-powered conditional logic, no code required.

<img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Operatorstepcover.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=42d6f532854288840ab8326dda7b1ec9" alt="Operatorstepcover" width="1920" height="1080" data-path="images/Operatorstepcover.png" />

The Operator step is a **silent**, LLM-powered step that evaluates conditions and routes your workflow accordingly. Unlike traditional code-based conditionals, it uses an LLM to interpret the conditions you define, giving it the flexibility to evaluate variable values, user input, and session state without requiring exact string matches or rigid logic. It can also draw on any tools you configure to help it evaluate conditions more accurately. The Operator step produces no output visible to the user: it simply evaluates once and directs the conversation down the appropriate path.

## Using the Operator step

Drag the **Operator step** onto the canvas and connect it to the preceding step in your workflow. Once added, configure your prompt and connect each exit path to the next step in your flow.

### Configuration

The Operator step is configured through a prompt, tools, and a set of exit conditions that you define.

* **Prompt**: Write a prompt to guide the LLM on how to evaluate your routing logic and provide any additional context it needs to route accurately.
* **Tools**: The Operator step has access to tools to help it evaluate conditions. See the Integration tools documentation for more details.
* **Exit conditions**: Each exit condition represents a named path the workflow can take. You can write a trigger for each one, giving the LLM instructions on when to route to that path. You can also specify required variables, meaning the LLM can only exit to that path if those variables are filled.

If the LLM is uncertain which condition to route to, it will retry a few times before selecting the closest match. In practice this resolves quickly, but keeping your conditions clear and distinct will minimise ambiguity.
