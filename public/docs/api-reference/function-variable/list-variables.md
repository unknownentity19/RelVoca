> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List variables

> Returns every function variable in its function. A function variable is an input or output a function declares. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/function-variable
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
    get:
      tags:
        - Function Variable
      summary: List variables
      description: >-
        Returns every function variable in its function. A function variable is
        an input or output a function declares. The call takes no paging
        parameters, so one request yields the whole set.
      operationId: StableFunctionVariableController_list
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
        - name: functionID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the function whose variables to list.
      responses:
        '200':
          description: >-
            Returns every variable declared on a single function, selected by
            the functionID query parameter, each marked as an input or an output
            and named as the function code references it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionVariableListResponse'
          x-vf-doc:
            description: >-
              Returns every variable declared on a single function, selected by
              the functionID query parameter, each marked as an input or an
              output and named as the function code references it.
      security:
        - token: []
components:
  schemas:
    StableFunctionVariableListResponse:
      type: object
      properties:
        variables:
          type: array
          items:
            $ref: '#/components/schemas/StableFunctionVariable'
      required:
        - variables
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
    FunctionVariableKind:
      type: string
      enum:
        - input
        - output
      x-enumNames:
        - INPUT
        - OUTPUT
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````