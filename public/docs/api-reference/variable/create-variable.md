> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create variable

> Adds a variable to the project, a named slot of project state an agent can read and write. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/variable
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
  /v1/stable/variable:
    post:
      tags:
        - Variable
      summary: Create variable
      description: >-
        Adds a variable to the project, a named slot of project state an agent
        can read and write. The response carries the ID that later calls address
        it by.
      operationId: StableVariableController_create
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
              $ref: '#/components/schemas/StableVariableCreateRequest'
      responses:
        '201':
          description: >-
            Returns the newly created variable in full, including the ID
            assigned to it and its creation timestamps.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableVariableResponse'
          x-vf-doc:
            description: >-
              Returns the newly created variable in full, including the ID
              assigned to it and its creation timestamps.
      security:
        - token: []
components:
  schemas:
    StableVariableCreateRequest:
      type: object
      properties:
        name:
          type: string
        color:
          type: string
          description: The display color of the variable in the RelVoca editor.
        description:
          nullable: true
          description: A short description of what the variable stores.
          type: string
        defaultValue:
          nullable: true
          description: The initial value of the variable at the start of a conversation.
          type: string
      required:
        - name
        - color
      additionalProperties: false
    StableVariableResponse:
      type: object
      properties:
        variable:
          $ref: '#/components/schemas/StableVariable'
      required:
        - variable
    StableVariable:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        color:
          type: string
          description: The display color of the variable in the RelVoca editor.
        isSystem:
          type: boolean
          description: >-
            Whether this is a built-in system variable, which cannot be updated
            or deleted.
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
        description:
          nullable: true
          description: A short description of what the variable stores.
          type: string
        defaultValue:
          nullable: true
          description: The initial value of the variable at the start of a conversation.
          type: string
      required:
        - id
        - name
        - color
        - isSystem
        - createdAt
        - updatedAt
        - description
        - defaultValue
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````