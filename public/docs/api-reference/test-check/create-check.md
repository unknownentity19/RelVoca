> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create check

> Adds a test check to its turn, one assertion about an agent turn, comparing the reply or the behaviour behind it. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/test-check
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
  /v1/stable/test-check:
    post:
      tags:
        - Test Check
      summary: Create check
      description: >-
        Adds a test check to its turn, one assertion about an agent turn,
        comparing the reply or the behaviour behind it. The response carries the
        ID that later calls address it by.
      operationId: StableTestCheckController_create
      parameters:
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
              $ref: '#/components/schemas/StableTestCheckCreateRequest'
      responses:
        '201':
          description: >-
            Creates one check on the turn named in the body and returns it with
            its assigned `id`. Checks hang off agent turns, which are the turns
            that carry a `checkOrder`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestCheckResponse'
          x-vf-doc:
            description: >-
              Creates one check on the turn named in the body and returns it
              with its assigned `id`. Checks hang off agent turns, which are the
              turns that carry a `checkOrder`.
      security:
        - token: []
components:
  schemas:
    StableTestCheckCreateRequest:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - response
              description: >-
                Identifies a check that judges the agent's response text against
                expected criteria.
              x-enumNames:
                - RESPONSE
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
            payload:
              $ref: '#/components/schemas/ResponseSimulationTurnTestPayload'
          required:
            - type
            - turnID
            - payload
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - routing
              description: >-
                Identifies a check that verifies whether the agent routed to a
                specific playbook or workflow.
              x-enumNames:
                - ROUTING
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
            payload:
              type: object
              properties:
                routeTo:
                  nullable: true
                  description: >-
                    The routing target to check against, paired with
                    shouldRoute. Null when asserting no routing at all.
                  type: object
                  properties:
                    resourceID:
                      type: string
                      description: >-
                        The ID of the playbook or workflow the check routes
                        against.
                    resourceType:
                      type: string
                      enum:
                        - playbook
                        - workflow
                      description: Whether resourceID is a playbook or a workflow.
                      x-enumNames:
                        - PLAYBOOK
                        - WORKFLOW
                  required:
                    - resourceID
                    - resourceType
                shouldRoute:
                  type: boolean
              required:
                - routeTo
                - shouldRoute
          required:
            - type
            - turnID
            - payload
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - tool
              description: >-
                Identifies a check that verifies whether the agent called a
                specific tool.
              x-enumNames:
                - TOOL
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
            payload:
              $ref: '#/components/schemas/ToolSimulationTurnTestPayload'
          required:
            - type
            - turnID
            - payload
          additionalProperties: false
    StableTestCheckResponse:
      type: object
      properties:
        check:
          $ref: '#/components/schemas/StableTestCheck'
      required:
        - check
    ResponseSimulationTurnTestPayload:
      oneOf:
        - $ref: '#/components/schemas/SimulationTurnTestJudgeEqual'
        - $ref: '#/components/schemas/SimulationTurnTestJudgeLLMEval'
    ToolSimulationTurnTestPayload:
      type: object
      properties:
        tool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolSimulationTurnTestPayloadTool'
        shouldCall:
          type: boolean
      required:
        - tool
        - shouldCall
    StableTestCheck:
      oneOf:
        - type: object
          properties:
            id:
              type: string
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
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
            type:
              type: string
              enum:
                - response
              description: >-
                Identifies a check that judges the agent's response text against
                expected criteria.
              x-enumNames:
                - RESPONSE
            payload:
              $ref: '#/components/schemas/ResponseSimulationTurnTestPayload'
          required:
            - id
            - turnID
            - createdAt
            - updatedAt
            - type
            - payload
        - type: object
          properties:
            id:
              type: string
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
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
            type:
              type: string
              enum:
                - routing
              description: >-
                Identifies a check that verifies whether the agent routed to a
                specific playbook or workflow.
              x-enumNames:
                - ROUTING
            payload:
              type: object
              properties:
                routeTo:
                  nullable: true
                  description: >-
                    The routing target to check against, paired with
                    shouldRoute. Null when asserting no routing at all.
                  type: object
                  properties:
                    resourceID:
                      type: string
                      description: >-
                        The ID of the playbook or workflow the check routes
                        against.
                    resourceType:
                      type: string
                      enum:
                        - playbook
                        - workflow
                      description: Whether resourceID is a playbook or a workflow.
                      x-enumNames:
                        - PLAYBOOK
                        - WORKFLOW
                  required:
                    - resourceID
                    - resourceType
                shouldRoute:
                  type: boolean
              required:
                - routeTo
                - shouldRoute
          required:
            - id
            - turnID
            - createdAt
            - updatedAt
            - type
            - payload
        - type: object
          properties:
            id:
              type: string
            turnID:
              type: string
              description: The ID of the turn this check belongs to.
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
            type:
              type: string
              enum:
                - tool
              description: >-
                Identifies a check that verifies whether the agent called a
                specific tool.
              x-enumNames:
                - TOOL
            payload:
              $ref: '#/components/schemas/ToolSimulationTurnTestPayload'
          required:
            - id
            - turnID
            - createdAt
            - updatedAt
            - type
            - payload
    SimulationTurnTestJudgeEqual:
      type: object
      properties:
        type:
          type: string
          enum:
            - equal
          x-enumNames:
            - EQUAL
        value:
          type: string
      required:
        - type
        - value
    SimulationTurnTestJudgeLLMEval:
      type: object
      properties:
        type:
          type: string
          enum:
            - llm_eval
          x-enumNames:
            - LLM_EVAL
        prompt:
          type: string
      required:
        - type
        - prompt
    ToolSimulationTurnTestPayloadTool:
      oneOf:
        - $ref: '#/components/schemas/NativeToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/ApiCallToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/FunctionToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/IntegrationToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/McpIntegrationToolSimulationTurnTestPayload'
    NativeToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - native
          x-enumNames:
            - NATIVE
        kind:
          $ref: '#/components/schemas/SimulationTurnTestToolNativeKind'
      required:
        - type
        - kind
    ApiCallToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - api-call
          x-enumNames:
            - API_CALL
        toolID:
          type: string
      required:
        - type
        - toolID
    FunctionToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - function
          x-enumNames:
            - FUNCTION
        toolID:
          type: string
      required:
        - type
        - toolID
    IntegrationToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - integration
          x-enumNames:
            - INTEGRATION
        toolID:
          type: string
      required:
        - type
        - toolID
    McpIntegrationToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - mcp-integration
          x-enumNames:
            - MCP_INTEGRATION
        toolID:
          type: string
      required:
        - type
        - toolID
    SimulationTurnTestToolNativeKind:
      type: string
      enum:
        - end
        - card
        - button
        - carousel
        - skip-turn
        - web-search
        - call-forward
        - knowledge-base
      x-enumNames:
        - END
        - CARD
        - BUTTON
        - CAROUSEL
        - SKIP_TURN
        - WEB_SEARCH
        - CALL_FORWARD
        - KNOWLEDGE_BASE
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````