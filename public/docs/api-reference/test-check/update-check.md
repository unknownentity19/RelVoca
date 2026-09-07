> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update check

> Changes an existing test check in place. The response carries only a confirmation message, so refetch the test check to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/test-check/{checkID}
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
    patch:
      tags:
        - Test Check
      summary: Update check
      description: >-
        Changes an existing test check in place. The response carries only a
        confirmation message, so refetch the test check to read its new values.
      operationId: StableTestCheckController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableTestCheckUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the check's payload was updated, such as a new judge prompt
            or a different routing target. The body carries a message only, so
            read the check back to see what was stored.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the check's payload was updated, such as a new judge
              prompt or a different routing target. The body carries a message
              only, so read the check back to see what was stored.
      security:
        - token: []
components:
  schemas:
    StableTestCheckUpdateRequest:
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
            payload:
              allOf:
                - $ref: '#/components/schemas/ResponseSimulationTurnTestPayload'
          required:
            - type
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
            payload:
              allOf:
                - $ref: '#/components/schemas/ToolSimulationTurnTestPayload'
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