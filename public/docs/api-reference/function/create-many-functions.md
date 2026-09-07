> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many functions

> Adds several functions to the environment in one request, each taking the fields the single-create call takes. The response carries the created functions in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function/batch
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
  /v1/stable/function/batch:
    post:
      tags:
        - Function
      summary: Create many functions
      description: >-
        Adds several functions to the environment in one request, each taking
        the fields the single-create call takes. The response carries the
        created functions in the same shape the list call returns.
      operationId: StableFunctionController_createMany
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
              $ref: '#/components/schemas/StableFunctionCreateManyRequest'
      responses:
        '201':
          description: >-
            Creates every function in the request and returns them all, each
            with its own ID, stored JavaScript source, and exit path order.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionListResponse'
          x-vf-doc:
            description: >-
              Creates every function in the request and returns them all, each
              with its own ID, stored JavaScript source, and exit path order.
      security:
        - token: []
components:
  schemas:
    StableFunctionCreateManyRequest:
      type: object
      properties:
        functions:
          type: array
          items:
            $ref: '#/components/schemas/StableFunctionCreateRequest'
      required:
        - functions
    StableFunctionListResponse:
      type: object
      properties:
        functions:
          type: array
          items:
            $ref: '#/components/schemas/StableFunction'
      required:
        - functions
    StableFunctionCreateRequest:
      type: object
      properties:
        name:
          type: string
        code:
          type: string
          maxLength: 1048576
          description: The JavaScript source code executed when the function runs.
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/FunctionSettings'
        description:
          nullable: true
          description: A human-readable description of what the function does.
          type: string
      required:
        - name
        - code
      additionalProperties: false
    StableFunction:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        code:
          type: string
          maxLength: 1048576
          description: The JavaScript source code executed when the function runs.
        image:
          nullable: true
          description: The URL of the image displayed for the function in the RelVoca UI.
          type: string
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/FunctionSettings'
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
        pathOrder:
          type: array
          items:
            type: string
          description: >-
            An ordered list of path IDs controlling the display order of the
            function's exit paths.
        description:
          nullable: true
          description: A human-readable description of what the function does.
          type: string
      required:
        - id
        - name
        - code
        - image
        - settings
        - createdAt
        - updatedAt
        - pathOrder
        - description
    FunctionSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````