> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create path

> Adds a function path to its function, one of the named exits a function can return through. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function-path
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
  /v1/stable/function-path:
    post:
      tags:
        - Function Path
      summary: Create path
      description: >-
        Adds a function path to its function, one of the named exits a function
        can return through. The response carries the ID that later calls address
        it by.
      operationId: StableFunctionPathController_create
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
              $ref: '#/components/schemas/StableFunctionPathCreateRequest'
      responses:
        '201':
          description: >-
            Creates the exit path and returns it with its generated ID and the
            function it belongs to. The name is the value the function code
            returns to send the workflow down this branch.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionPathResponse'
          x-vf-doc:
            description: >-
              Creates the exit path and returns it with its generated ID and the
              function it belongs to. The name is the value the function code
              returns to send the workflow down this branch.
      security:
        - token: []
components:
  schemas:
    StableFunctionPathCreateRequest:
      type: object
      properties:
        name:
          type: string
          description: >-
            The name of the exit path, referenced by the function code when
            returning which path to take.
        functionID:
          type: string
          description: The ID of the function this path belongs to.
        label:
          default: null
          nullable: true
          description: >-
            The display label shown for this path in the RelVoca UI; falls
            back to `name` when null.
          type: string
      required:
        - name
        - functionID
      additionalProperties: false
    StableFunctionPathResponse:
      type: object
      properties:
        path:
          $ref: '#/components/schemas/StableFunctionPath'
      required:
        - path
    StableFunctionPath:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
          description: >-
            The name of the exit path, referenced by the function code when
            returning which path to take.
        label:
          nullable: true
          description: >-
            The display label shown for this path in the RelVoca UI; falls
            back to `name` when null.
          type: string
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
          description: The ID of the function this path belongs to.
      required:
        - id
        - name
        - label
        - createdAt
        - updatedAt
        - functionID
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````