> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get test

> Returns a single test by ID, with the fields that define it. A test is a scripted conversation replayed against the agent.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/test/{testID}
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
  /v1/stable/test/{testID}:
    get:
      tags:
        - Test
      summary: Get test
      description: >-
        Returns a single test by ID, with the fields that define it. A test is a
        scripted conversation replayed against the agent.
      operationId: StableTestController_get
      parameters:
        - name: testID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test to operate on.
          description: The ID of the test to operate on.
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
            Returns one test's name, launch settings, and `turnOrder`, which is
            the IDs of its turns in the order they run. Fetch the turns
            themselves by test ID, and their checks by turn ID.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestResponse'
          x-vf-doc:
            description: >-
              Returns one test's name, launch settings, and `turnOrder`, which
              is the IDs of its turns in the order they run. Fetch the turns
              themselves by test ID, and their checks by turn ID.
      security:
        - token: []
components:
  schemas:
    StableTestResponse:
      type: object
      properties:
        test:
          $ref: '#/components/schemas/StableTest'
      required:
        - test
    StableTest:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        settings:
          $ref: '#/components/schemas/SimulationSettings'
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
        turnOrder:
          type: array
          items:
            type: string
          description: The IDs of the test's turns, in execution order.
      required:
        - id
        - name
        - settings
        - createdAt
        - updatedAt
        - turnOrder
    SimulationSettings:
      type: object
      properties:
        launchEvent:
          nullable: true
          type: string
        variableStates:
          default: []
          anyOf:
            - type: string
            - type: array
              items:
                $ref: '#/components/schemas/PersonaItem'
      required:
        - launchEvent
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