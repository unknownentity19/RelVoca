> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get variable

> Returns a single variable by ID, with the fields that define it. A variable is a named slot of project state an agent can read and write.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/variable/{variableID}
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
  /v1/stable/variable/{variableID}:
    get:
      tags:
        - Variable
      summary: Get variable
      description: >-
        Returns a single variable by ID, with the fields that define it. A
        variable is a named slot of project state an agent can read and write.
      operationId: StableVariableController_get
      parameters:
        - name: variableID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the variable to operate on.
          description: The ID of the variable to operate on.
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
            Returns a single variable by ID, carrying its current description,
            default value, colour, and timestamps.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableVariableResponse'
          x-vf-doc:
            description: >-
              Returns a single variable by ID, carrying its current description,
              default value, colour, and timestamps.
      security:
        - token: []
components:
  schemas:
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