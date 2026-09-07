> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get turn

> Returns a single test turn by ID, with the fields that define it. A test turn is one side of a scripted conversation, either what the user says or the agent reply the checks assert on.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/test-turn/{turnID}
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
    get:
      tags:
        - Test Turn
      summary: Get turn
      description: >-
        Returns a single test turn by ID, with the fields that define it. A test
        turn is one side of a scripted conversation, either what the user says
        or the agent reply the checks assert on.
      operationId: StableTestTurnController_get
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
      responses:
        '200':
          description: >-
            Returns one turn: the `testID` it belongs to, the payload for its
            type, and, on an agent turn, the `checkOrder` naming the checks that
            run against it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestTurnResponse'
          x-vf-doc:
            description: >-
              Returns one turn: the `testID` it belongs to, the payload for its
              type, and, on an agent turn, the `checkOrder` naming the checks
              that run against it.
      security:
        - token: []
components:
  schemas:
    StableTestTurnResponse:
      type: object
      properties:
        turn:
          $ref: '#/components/schemas/StableTestTurn'
      required:
        - turn
    StableTestTurn:
      oneOf:
        - type: object
          properties:
            id:
              type: string
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
            - id
            - testID
            - createdAt
            - updatedAt
            - type
            - payload
        - type: object
          properties:
            id:
              type: string
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
            - id
            - testID
            - createdAt
            - updatedAt
            - type
            - payload
            - checkOrder
        - type: object
          properties:
            id:
              type: string
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
            - id
            - testID
            - createdAt
            - updatedAt
            - type
            - payload
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