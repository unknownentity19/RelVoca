> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update tool

> Changes an existing tool in place. The response carries only a confirmation message, so refetch the tool to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/tool/{toolID}
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
  /v1/stable/tool/{toolID}:
    patch:
      tags:
        - Tool
      summary: Update tool
      description: >-
        Changes an existing tool in place. The response carries only a
        confirmation message, so refetch the tool to read its new values.
      operationId: StableToolController_update
      parameters:
        - name: toolID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the tool to operate on.
          description: The ID of the tool to operate on.
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableToolUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the attachment's wiring was updated, meaning its
            description, input mappings, or capture settings rather than the API
            tool, function, or MCP tool it points at. The body is a message
            only, so refetch the tool to read its current state.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the attachment's wiring was updated, meaning its
              description, input mappings, or capture settings rather than the
              API tool, function, or MCP tool it points at. The body is a
              message only, so refetch the tool to read its current state.
      security:
        - token: []
components:
  schemas:
    StableToolUpdateRequest:
      oneOf:
        - type: object
          properties:
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
            - type
          additionalProperties: false
        - type: object
          properties:
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
            - type
          additionalProperties: false
        - type: object
          properties:
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
            - type
          additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
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