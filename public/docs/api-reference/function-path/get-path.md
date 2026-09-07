> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get path

> Returns a single function path by ID, with the fields that define it. A function path is one of the named exits a function can return through.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/function-path/{pathID}
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
  /v1/stable/function-path/{pathID}:
    get:
      tags:
        - Function Path
      summary: Get path
      description: >-
        Returns a single function path by ID, with the fields that define it. A
        function path is one of the named exits a function can return through.
      operationId: StableFunctionPathController_get
      parameters:
        - name: pathID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the function path to operate on.
          description: The ID of the function path to operate on.
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
            Returns one exit path, including the function it belongs to, the
            name its code returns to select it, and the label displayed for it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionPathResponse'
          x-vf-doc:
            description: >-
              Returns one exit path, including the function it belongs to, the
              name its code returns to select it, and the label displayed for
              it.
      security:
        - token: []
components:
  schemas:
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