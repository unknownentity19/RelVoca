> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create turn

> Adds a test turn to its test, one side of a scripted conversation, either what the user says or the agent reply the checks assert on. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/test-turn
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
  /v1/stable/test-turn:
    post:
      tags:
        - Test Turn
      summary: Create turn
      description: >-
        Adds a test turn to its test, one side of a scripted conversation,
        either what the user says or the agent reply the checks assert on. The
        response carries the ID that later calls address it by.
      operationId: StableTestTurnController_create
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
              $ref: '#/components/schemas/StableTestTurnCreateRequest'
      responses:
        '201':
          description: >-
            Creates one turn on the test named in the body and returns it with
            its assigned `id`. Where the turn sits in the conversation is held
            by the test's `turnOrder`, not by the turn.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestTurnResponse'
          x-vf-doc:
            description: >-
              Creates one turn on the test named in the body and returns it with
              its assigned `id`. Where the turn sits in the conversation is held
              by the test's `turnOrder`, not by the turn.
      security:
        - token: []
components:
  schemas:
    StableTestTurnCreateRequest:
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
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
            - testID
            - payload
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
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
          required:
            - type
            - testID
            - payload
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
            testID:
              type: string
              description: The ID of the test this turn belongs to.
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
            - testID
            - payload
          additionalProperties: false
    StableTestTurnResponse:
      type: object
      properties:
        turn:
          $ref: '#/components/schemas/StableTestTurn'
      required:
        - turn
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````