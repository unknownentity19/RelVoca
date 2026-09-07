> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many variables

> Adds several function variables to its function in one request, each taking the fields the single-create call takes. The response carries the created function variables in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function-variable/batch
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
  /v1/stable/function-variable/batch:
    post:
      tags:
        - Function Variable
      summary: Create many variables
      description: >-
        Adds several function variables to its function in one request, each
        taking the fields the single-create call takes. The response carries the
        created function variables in the same shape the list call returns.
      operationId: StableFunctionVariableController_createMany
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
              $ref: '#/components/schemas/StableFunctionVariableCreateManyRequest'
      responses:
        '201':
          description: >-
            Returns the newly created function variables, each with its own ID,
            its input or output kind, and the functionID of the function it was
            attached to.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionVariableListResponse'
          x-vf-doc:
            description: >-
              Returns the newly created function variables, each with its own
              ID, its input or output kind, and the functionID of the function
              it was attached to.
      security:
        - token: []
components:
  schemas:
    StableFunctionVariableCreateManyRequest:
      type: object
      properties:
        functionID:
          type: string
          description: The ID of the function to create the variables for.
        variables:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
                description: The name used to reference the variable in the function code.
              type:
                $ref: '#/components/schemas/FunctionVariableKind'
              description:
                nullable: true
                description: A human-readable description of what the variable holds.
                type: string
            required:
              - name
              - type
            additionalProperties: false
      required:
        - functionID
        - variables
    StableFunctionVariableListResponse:
      type: object
      properties:
        variables:
          type: array
          items:
            $ref: '#/components/schemas/StableFunctionVariable'
      required:
        - variables
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