> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many paths

> Adds several function paths to its function in one request, each taking the fields the single-create call takes. The response carries the created function paths in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/function-path/batch
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
  /v1/stable/function-path/batch:
    post:
      tags:
        - Function Path
      summary: Create many paths
      description: >-
        Adds several function paths to its function in one request, each taking
        the fields the single-create call takes. The response carries the
        created function paths in the same shape the list call returns.
      operationId: StableFunctionPathController_createMany
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
              $ref: '#/components/schemas/StableFunctionPathCreateManyRequest'
      responses:
        '201':
          description: >-
            Creates every path in the request against the single function it
            names, and returns the created paths with their generated IDs and
            labels.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableFunctionPathListResponse'
          x-vf-doc:
            description: >-
              Creates every path in the request against the single function it
              names, and returns the created paths with their generated IDs and
              labels.
      security:
        - token: []
components:
  schemas:
    StableFunctionPathCreateManyRequest:
      type: object
      properties:
        functionID:
          type: string
          description: The ID of the function to create the paths for.
        paths:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
                description: >-
                  The name of the exit path, referenced by the function code
                  when returning which path to take.
              label:
                default: null
                nullable: true
                description: >-
                  The display label shown for this path in the RelVoca UI;
                  falls back to `name` when null.
                type: string
            required:
              - name
            additionalProperties: false
      required:
        - functionID
        - paths
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