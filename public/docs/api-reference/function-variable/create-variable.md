> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create variable

> Adds a function variable to its function, an input or output a function declares. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function-variable
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
  /v1/stable/function-variable:
    post:
      tags:
        - Function Variable
      summary: Create variable
      description: >-
        Adds a function variable to its function, an input or output a function
        declares. The response carries the ID that later calls address it by.
      operationId: StableFunctionVariableController_create
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
              $ref: '#/components/schemas/StableFunctionVariableCreateRequest'
      responses:
        '201':
          description: >-
            Creates the function variable and returns it, including its new ID,
            whether it is an input or an output, and the functionID of the
            function that declares it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionVariableResponse'
          x-vf-doc:
            description: >-
              Creates the function variable and returns it, including its new
              ID, whether it is an input or an output, and the functionID of the
              function that declares it.
      security:
        - token: []
components:
  schemas:
    StableFunctionVariableCreateRequest:
      type: object
      properties:
        name:
          type: string
          description: The name used to reference the variable in the function code.
        type:
          $ref: '#/components/schemas/FunctionVariableKind'
        functionID:
          type: string
          description: The ID of the function this variable belongs to.
        description:
          nullable: true
          description: A human-readable description of what the variable holds.
          type: string
      required:
        - name
        - type
        - functionID
      additionalProperties: false
    StableFunctionVariableResponse:
      type: object
      properties:
        variable:
          $ref: '#/components/schemas/StableFunctionVariable'
      required:
        - variable
    FunctionVariableKind:
      type: string
      enum:
        - input
        - output
      x-enumNames:
        - INPUT
        - OUTPUT
    StableFunctionVariable:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
          description: The name used to reference the variable in the function code.
        type:
          $ref: '#/components/schemas/FunctionVariableKind'
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
        functionID:
          type: string
          description: The ID of the function this variable belongs to.
        description:
          nullable: true
          description: A human-readable description of what the variable holds.
          type: string
      required:
        - id
        - name
        - type
        - createdAt
        - updatedAt
        - functionID
        - description
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````