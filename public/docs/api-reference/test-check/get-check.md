> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get check

> Returns a single test check by ID, with the fields that define it. A test check is one assertion about an agent turn, comparing the reply or the behaviour behind it.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/test-check/{checkID}
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
  /v1/stable/test-check/{checkID}:
    get:
      tags:
        - Test Check
      summary: Get check
      description: >-
        Returns a single test check by ID, with the fields that define it. A
        test check is one assertion about an agent turn, comparing the reply or
        the behaviour behind it.
      operationId: StableTestCheckController_get
      parameters:
        - name: checkID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test check to operate on.
          description: The ID of the test check to operate on.
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
      responses:
        '200':
          description: >-
            Returns one check with the `turnID` it belongs to and the payload
            for its type: the expected string or judge prompt for a response
            check, the routing target and whether it should be reached, or the
            tool and whether it should be called.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestCheckResponse'
          x-vf-doc:
            description: >-
              Returns one check with the `turnID` it belongs to and the payload
              for its type: the expected string or judge prompt for a response
              check, the routing target and whether it should be reached, or the
              tool and whether it should be called.
      security:
        - token: []
components:
  schemas:
    StableTestCheckResponse:
      type: object
      properties:
        check:
          $ref: '#/components/schemas/StableTestCheck'
      required:
        - check
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