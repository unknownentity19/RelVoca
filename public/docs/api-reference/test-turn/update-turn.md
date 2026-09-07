> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update turn

> Changes an existing test turn in place. The response carries only a confirmation message, so refetch the test turn to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/test-turn/{turnID}
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
  /v1/stable/test-turn/{turnID}:
    patch:
      tags:
        - Test Turn
      summary: Update turn
      description: >-
        Changes an existing test turn in place. The response carries only a
        confirmation message, so refetch the test turn to read its new values.
      operationId: StableTestTurnController_update
      parameters:
        - name: turnID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test turn to operate on.
          description: The ID of the test turn to operate on.
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
              $ref: '#/components/schemas/StableTestTurnUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the turn's payload was updated, along with its `checkOrder`
            on an agent turn. The body is a message only, not the revised turn.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the turn's payload was updated, along with its
              `checkOrder` on an agent turn. The body is a message only, not the
              revised turn.
      security:
        - token: []
components:
  schemas:
    StableTestTurnUpdateRequest:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - user
              description: Identifies a turn that sends a scripted user message.
              x-enumNames:
                - USER
            payload:
              type: object
              properties:
                response:
                  type: string
                variableStates:
                  anyOf:
                    - type: string
                    - type: array
                      items:
                        $ref: '#/components/schemas/PersonaItem'
              required:
                - response
                - variableStates
              additionalProperties: false
          required:
            - type
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - agent
              description: >-
                Identifies a turn that asserts on the agent's behavior via its
                attached checks.
              x-enumNames:
                - AGENT
            payload:
              type: object
              properties:
                sequential:
                  type: boolean
                  description: >-
                    Whether the checks must pass in checkOrder rather than in
                    any order.
              required:
                - sequential
              additionalProperties: false
            checkOrder:
              type: array
              items:
                type: string
              description: The IDs of the turn's checks, in evaluation order.
          required:
            - type
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - simulation
              description: >-
                Identifies a turn that hands off to an LLM-driven persona
                conversation.
              x-enumNames:
                - SIMULATION
            payload:
              type: object
              properties:
                scenario:
                  type: string
                maxTurns:
                  type: number
                variableStates:
                  anyOf:
                    - type: string
                    - type: array
                      items:
                        $ref: '#/components/schemas/PersonaItem'
                successCriteria:
                  type: string
              required:
                - scenario
                - maxTurns
                - variableStates
                - successCriteria
              additionalProperties: false
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
    PersonaItem:
      type: object
      properties:
        id:
          type: string
        variableID:
          nullable: true
          type: string
        value:
          nullable: true
          type: string
      required:
        - id
        - variableID
        - value
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````