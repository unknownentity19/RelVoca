> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create test

> Adds a test to the environment, a scripted conversation replayed against the agent. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/test
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
  /v1/stable/test:
    post:
      tags:
        - Test
      summary: Create test
      description: >-
        Adds a test to the environment, a scripted conversation replayed against
        the agent. The response carries the ID that later calls address it by.
      operationId: StableTestController_create
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
              $ref: '#/components/schemas/StableTestCreateRequest'
      responses:
        '201':
          description: >-
            Creates the test and returns it with its assigned `id`. A test holds
            no conversation of its own, so use that `id` to create the turns
            that make it up.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestResponse'
          x-vf-doc:
            description: >-
              Creates the test and returns it with its assigned `id`. A test
              holds no conversation of its own, so use that `id` to create the
              turns that make it up.
      security:
        - token: []
components:
  schemas:
    StableTestCreateRequest:
      type: object
      properties:
        name:
          type: string
        settings:
          default:
            launchEvent: null
            variableStates: []
          allOf:
            - $ref: '#/components/schemas/SimulationSettings'
      required:
        - name
      additionalProperties: false
    StableTestResponse:
      type: object
      properties:
        test:
          $ref: '#/components/schemas/StableTest'
      required:
        - test
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