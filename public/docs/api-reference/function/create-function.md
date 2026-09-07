> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create function

> Adds a function to the environment, custom JavaScript that runs in RelVoca’s sandbox and returns through a named path. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function
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
  /v1/stable/function:
    post:
      tags:
        - Function
      summary: Create function
      description: >-
        Adds a function to the environment, custom JavaScript that runs in
        RelVoca’s sandbox and returns through a named path. The response
        carries the ID that later calls address it by.
      operationId: StableFunctionController_create
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
              $ref: '#/components/schemas/StableFunctionCreateRequest'
      responses:
        '201':
          description: >-
            Creates the function and returns it in full, including its new ID
            and the JavaScript source stored for it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionResponse'
          x-vf-doc:
            description: >-
              Creates the function and returns it in full, including its new ID
              and the JavaScript source stored for it.
      security:
        - token: []
components:
  schemas:
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
    StableFunctionResponse:
      type: object
      properties:
        function:
          $ref: '#/components/schemas/StableFunction'
      required:
        - function
    FunctionSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````