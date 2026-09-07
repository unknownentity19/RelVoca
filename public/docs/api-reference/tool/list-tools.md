> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List tools

> Returns every tool in the environment. A tool is something a playbook can call during a conversation. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/tool
openapi: 3.0.0
info:
  title: Realtime
  description: Realtime gateway API service
  version: 1.0.0
  contact: {}
servers:
  - url: https://realtime-api.voiceflow.com
security: []
tags: []
paths:
  /v1/stable/tool:
    get:
      tags:
        - Tool
      summary: List tools
      description: >-
        Returns every tool in the environment. A tool is something a playbook
        can call during a conversation. The call takes no paging parameters, so
        one request yields the whole set.
      operationId: StableToolController_list
      parameters:
        - name: global
          required: false
          in: query
          schema:
            description: Target the agent. Cannot be used with playbookID.
            type: boolean
        - name: playbookID
          required: false
          in: query
          schema:
            description: Target a specific playbook. Cannot be used with global.
            type: string
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
        - name: environmentAlias
          required: true
          in: query
          schema:
            type: string
            description: The alias of the environment to operate on (e.g. `main`).
        - name: type
          required: false
          in: query
          schema:
            description: When provided, only tools of this type are returned.
            type: string
            enum:
              - api
              - mcp
              - function
            x-enumNames:
              - API
              - MCP
              - FUNCTION
      responses:
        '200':
          description: >-
            Returns the tools attached to the agent or to a single playbook,
            depending on whether you pass global or playbookID. Each entry is
            the attachment rather than the underlying resource: it points at an
            API tool, function, or MCP tool by ID and carries the description,
            input mappings, and response capture used when the agent calls it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableToolListResponse'
          x-vf-doc:
            description: >-
              Returns the tools attached to the agent or to a single playbook,
              depending on whether you pass global or playbookID. Each entry is
              the attachment rather than the underlying resource: it points at
              an API tool, function, or MCP tool by ID and carries the
              description, input mappings, and response capture used when the
              agent calls it.
      security:
        - token: []
components:
  schemas:
    StableToolListResponse:
      type: object
      properties:
        tools:
          type: array
          items:
            $ref: '#/components/schemas/StableTool'
      required:
        - tools
    StableTool:
      oneOf:
        - type: object
          properties:
            id:
              type: string
            createdAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            updatedAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            messages:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AgentToolMessages'
            description:
              nullable: true
              description: >-
                A description of what the tool does, used by the agent to decide
                when to call it.
              type: string
            captureInputVariables:
              nullable: true
              description: >-
                A map of tool input names to the variables or entities whose
                values are captured into them.
              type: object
              additionalProperties:
                $ref: '#/components/schemas/AgentToolCaptureInputVariable'
            type:
              type: string
              enum:
                - api
              description: Discriminator indicating this tool executes a saved API request.
              x-enumNames:
                - API
            apiToolID:
              type: string
              description: The ID of the API resource this tool executes.
            asyncExecution:
              type: boolean
              description: >-
                When enabled, the tool runs in the background without blocking
                the conversation.
            inputVariables:
              type: object
              additionalProperties:
                type: object
                properties:
                  description:
                    default: null
                    nullable: true
                    type: string
                  defaultValue:
                    default: null
                    nullable: true
                    allOf:
                      - $ref: '#/components/schemas/Markup'
                  apiToolInputVariableID:
                    type: string
                  captureType:
                    allOf:
                      - $ref: '#/components/schemas/ToolNodeCaptureType'
                  required:
                    default: true
                    description: Whether the agent must provide a value for this input.
                    type: boolean
                required:
                  - apiToolInputVariableID
              description: >-
                A map of input names to the values the agent supplies when
                calling the tool.
            captureResponse:
              type: object
              additionalProperties:
                $ref: '#/components/schemas/ToolNodeDataAPICaptureResponse'
              description: >-
                A map of variable names to the parts of the tool response
                captured into them.
          required:
            - id
            - createdAt
            - updatedAt
            - messages
            - description
            - captureInputVariables
            - type
            - apiToolID
            - asyncExecution
            - inputVariables
            - captureResponse
        - type: object
          properties:
            id:
              type: string
            createdAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            updatedAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            messages:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AgentToolMessages'
            description:
              nullable: true
              description: >-
                A description of what the tool does, used by the agent to decide
                when to call it.
              type: string
            captureInputVariables:
              nullable: true
              description: >-
                A map of tool input names to the variables or entities whose
                values are captured into them.
              type: object
              additionalProperties:
                $ref: '#/components/schemas/AgentToolCaptureInputVariable'
            type:
              type: string
              enum:
                - function
              description: Discriminator indicating this tool executes a custom function.
              x-enumNames:
                - FUNCTION
            functionID:
              type: string
              description: The ID of the function resource this tool executes.
            asyncExecution:
              type: boolean
              description: >-
                When enabled, the tool runs in the background without blocking
                the conversation.
            inputVariables:
              type: object
              additionalProperties:
                type: object
                properties:
                  description:
                    default: null
                    nullable: true
                    type: string
                  defaultValue:
                    default: null
                    nullable: true
                    allOf:
                      - $ref: '#/components/schemas/Markup'
                  functionInputVariableID:
                    type: string
                  captureType:
                    allOf:
                      - $ref: '#/components/schemas/ToolNodeCaptureType'
                  required:
                    default: true
                    description: Whether the agent must provide a value for this input.
                    type: boolean
                required:
                  - functionInputVariableID
              description: >-
                A map of input names to the values the agent supplies when
                calling the tool.
            captureResponse:
              type: object
              additionalProperties:
                $ref: '#/components/schemas/ToolNodeDataFunctionCaptureResponse'
              description: >-
                A map of variable names to the parts of the tool response
                captured into them.
          required:
            - id
            - createdAt
            - updatedAt
            - messages
            - description
            - captureInputVariables
            - type
            - functionID
            - asyncExecution
            - inputVariables
            - captureResponse
        - type: object
          properties:
            id:
              type: string
            createdAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            updatedAt:
              type: string
              format: date-time
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            messages:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AgentToolMessages'
            description:
              nullable: true
              description: >-
                A description of what the tool does, used by the agent to decide
                when to call it.
              type: string
            captureInputVariables:
              nullable: true
              description: >-
                A map of tool input names to the variables or entities whose
                values are captured into them.
              type: object
              additionalProperties:
                $ref: '#/components/schemas/AgentToolCaptureInputVariable'
            type:
              type: string
              enum:
                - mcp
              description: >-
                Discriminator indicating this tool calls a tool from an MCP
                server.
              x-enumNames:
                - MCP
            mcpToolID:
              type: string
              description: The ID of the MCP tool resource this tool calls.
            inputVariables:
              type: object
              additionalProperties:
                type: object
                properties:
                  description:
                    default: null
                    nullable: true
                    type: string
                  defaultValue:
                    default: null
                    nullable: true
                    allOf:
                      - $ref: '#/components/schemas/Markup'
                  mcpIntegrationVariableName:
                    type: string
                  captureType:
                    allOf:
                      - $ref: '#/components/schemas/ToolNodeCaptureType'
                  required:
                    default: true
                    description: Whether the agent must provide a value for this input.
                    type: boolean
                required:
                  - mcpIntegrationVariableName
              description: >-
                A map of input names to the values the agent supplies when
                calling the tool.
            captureResponse:
              type: object
              additionalProperties:
                $ref: '#/components/schemas/ToolNodeDataMcpIntegrationCaptureResponse'
              description: >-
                A map of variable names to the parts of the tool response
                captured into them.
          required:
            - id
            - createdAt
            - updatedAt
            - messages
            - description
            - captureInputVariables
            - type
            - mcpToolID
            - inputVariables
            - captureResponse
    AgentToolMessages:
      type: object
      properties:
        delayMessageID:
          nullable: true
          type: string
        failureMessageID:
          nullable: true
          type: string
        executionMessageID:
          nullable: true
          type: string
        completionMessageID:
          nullable: true
          type: string
        delayMessageSeconds:
          nullable: true
          type: number
        generative:
          type: object
          properties:
            execution:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            failure:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            delay:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            completion:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
      required:
        - delayMessageID
        - failureMessageID
        - executionMessageID
        - completionMessageID
        - delayMessageSeconds
    AgentToolCaptureInputVariable:
      type: object
      properties:
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - variableOrEntityID
    Markup:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/MarkupSpan'
          - $ref: '#/components/schemas/MarkupToolReference'
          - $ref: '#/components/schemas/MarkupSecretReference'
          - $ref: '#/components/schemas/MarkupEntityReference'
          - $ref: '#/components/schemas/MarkupVariableReference'
    ToolNodeCaptureType:
      type: string
      enum:
        - variable
        - property
      x-enumNames:
        - VARIABLE
        - PROPERTY
    ToolNodeDataAPICaptureResponse:
      type: object
      properties:
        path:
          type: string
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - path
        - variableOrEntityID
    ToolNodeDataFunctionCaptureResponse:
      type: object
      properties:
        variableOrEntityID:
          nullable: true
          type: string
        functionOutputVariableID:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - variableOrEntityID
        - functionOutputVariableID
    ToolNodeDataMcpIntegrationCaptureResponse:
      type: object
      properties:
        path:
          type: string
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - path
        - variableOrEntityID
    ToolMessageGenerative:
      type: object
      properties:
        enabled:
          type: boolean
        examples:
          type: array
          items:
            $ref: '#/components/schemas/Markup'
      required:
        - enabled
    MarkupSpan:
      type: object
      properties:
        text:
          $ref: '#/components/schemas/Markup'
        attributes:
          type: object
          additionalProperties: {}
      required:
        - text
    MarkupToolReference:
      type: object
      properties:
        resourceID:
          type: string
        referenceType:
          $ref: '#/components/schemas/MarkupToolReferenceType'
      required:
        - resourceID
        - referenceType
    MarkupSecretReference:
      type: object
      properties:
        secretID:
          type: string
      required:
        - secretID
    MarkupEntityReference:
      type: object
      properties:
        entityID:
          type: string
      required:
        - entityID
    MarkupVariableReference:
      type: object
      properties:
        variableID:
          type: string
        path:
          type: string
      required:
        - variableID
    MarkupToolReferenceType:
      type: string
      enum:
        - function
        - api-call
        - integration
        - mcp-integration
        - flow
        - agent
        - path-tool
        - system-tool
      x-enumNames:
        - FUNCTION
        - API_CALL
        - INTEGRATION
        - MCP_INTEGRATION
        - FLOW
        - AGENT
        - PATH_TOOL
        - SYSTEM_TOOL
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````