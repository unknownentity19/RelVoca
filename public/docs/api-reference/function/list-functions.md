> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List functions

> Returns every function in the environment. A function is custom JavaScript that runs in RelVoca’s sandbox and returns through a named path. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/function
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
    get:
      tags:
        - Function
      summary: List functions
      description: >-
        Returns every function in the environment. A function is custom
        JavaScript that runs in RelVoca’s sandbox and returns through a named
        path. The call takes no paging parameters, so one request yields the
        whole set.
      operationId: StableFunctionController_list
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
            Returns every function saved in the project's environment, each with
            its name, description, settings, and full JavaScript source code.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionListResponse'
          x-vf-doc:
            description: >-
              Returns every function saved in the project's environment, each
              with its name, description, settings, and full JavaScript source
              code.
      security:
        - token: []
components:
  schemas:
    StableFunctionListResponse:
      type: object
      properties:
        functions:
          type: array
          items:
            $ref: '#/components/schemas/StableFunction'
      required:
        - functions
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