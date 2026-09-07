> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update test

> Changes an existing test in place. The response carries only a confirmation message, so refetch the test to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/test/{testID}
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
    patch:
      tags:
        - Test
      summary: Update test
      description: >-
        Changes an existing test in place. The response carries only a
        confirmation message, so refetch the test to read its new values.
      operationId: StableTestController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableTestUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the test's name, launch settings, or `turnOrder` were
            updated. The body is a message only, and `turnOrder` is where a
            conversation's sequence lives, since turns carry no position of
            their own.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the test's name, launch settings, or `turnOrder` were
              updated. The body is a message only, and `turnOrder` is where a
              conversation's sequence lives, since turns carry no position of
              their own.
      security:
        - token: []
components:
  schemas:
    StableTestUpdateRequest:
      type: object
      properties:
        name:
          type: string
        settings:
          allOf:
            - $ref: '#/components/schemas/SimulationSettings'
        turnOrder:
          type: array
          items:
            type: string
          description: The IDs of the test's turns, in execution order.
      additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
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