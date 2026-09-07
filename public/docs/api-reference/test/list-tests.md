> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List tests

> Returns every test in the environment. A test is a scripted conversation replayed against the agent. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/test
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
    get:
      tags:
        - Test
      summary: List tests
      description: >-
        Returns every test in the environment. A test is a scripted conversation
        replayed against the agent. The call takes no paging parameters, so one
        request yields the whole set.
      operationId: StableTestController_list
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
      responses:
        '200':
          description: >-
            Returns every test defined on the project's environment, each with
            its launch settings and a `turnOrder` listing the IDs of its turns
            in execution order. The turns themselves are fetched separately.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestListResponse'
          x-vf-doc:
            description: >-
              Returns every test defined on the project's environment, each with
              its launch settings and a `turnOrder` listing the IDs of its turns
              in execution order. The turns themselves are fetched separately.
      security:
        - token: []
components:
  schemas:
    StableTestListResponse:
      type: object
      properties:
        tests:
          type: array
          items:
            $ref: '#/components/schemas/StableTest'
      required:
        - tests
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