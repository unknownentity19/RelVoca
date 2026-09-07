> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List paths

> Returns every function path in its function. A function path is one of the named exits a function can return through. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/function-path
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
    get:
      tags:
        - Function Path
      summary: List paths
      description: >-
        Returns every function path in its function. A function path is one of
        the named exits a function can return through. The call takes no paging
        parameters, so one request yields the whole set.
      operationId: StableFunctionPathController_list
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
            description: The ID of the function whose paths to list.
      responses:
        '200':
          description: >-
            Returns every exit path declared on the function, each with the name
            the function code returns to select it and the display label shown
            in RelVoca.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionPathListResponse'
          x-vf-doc:
            description: >-
              Returns every exit path declared on the function, each with the
              name the function code returns to select it and the display label
              shown in RelVoca.
      security:
        - token: []
components:
  schemas:
    StableFunctionPathListResponse:
      type: object
      properties:
        paths:
          type: array
          items:
            $ref: '#/components/schemas/StableFunctionPath'
      required:
        - paths
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