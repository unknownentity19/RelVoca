> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many tests

> Adds several tests to the environment in one request, each taking the fields the single-create call takes. The response carries the created tests in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/test/batch
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
  /v1/stable/test/batch:
    post:
      tags:
        - Test
      summary: Create many tests
      description: >-
        Adds several tests to the environment in one request, each taking the
        fields the single-create call takes. The response carries the created
        tests in the same shape the list call returns.
      operationId: StableTestController_createMany
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
              $ref: '#/components/schemas/StableTestCreateManyRequest'
      responses:
        '201':
          description: >-
            Creates one test per entry in the request body and returns them all
            with their assigned IDs. Turns are attached afterwards, and a turn
            batch targets one test at a time.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestListResponse'
          x-vf-doc:
            description: >-
              Creates one test per entry in the request body and returns them
              all with their assigned IDs. Turns are attached afterwards, and a
              turn batch targets one test at a time.
      security:
        - token: []
components:
  schemas:
    StableTestCreateManyRequest:
      type: object
      properties:
        tests:
          type: array
          items:
            $ref: '#/components/schemas/StableTestCreateRequest'
      required:
        - tests
    StableTestListResponse:
      type: object
      properties:
        tests:
          type: array
          items:
            $ref: '#/components/schemas/StableTest'
      required:
        - tests
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