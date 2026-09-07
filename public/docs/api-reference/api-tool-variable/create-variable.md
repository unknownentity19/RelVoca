> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create variable

> Adds a API tool variable to its API tool, an input an API tool substitutes into its request. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/api-tool-variable
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
  /v1/stable/api-tool-variable:
    post:
      tags:
        - API Tool Variable
      summary: Create variable
      description: >-
        Adds a API tool variable to its API tool, an input an API tool
        substitutes into its request. The response carries the ID that later
        calls address it by.
      operationId: StableAPIToolVariableController_create
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
              $ref: '#/components/schemas/StableAPIToolVariableCreateRequest'
      responses:
        '201':
          description: >-
            Creates the API tool variable and returns it, including its new ID
            and the apiToolID of the API tool it now belongs to.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAPIToolVariableResponse'
          x-vf-doc:
            description: >-
              Creates the API tool variable and returns it, including its new ID
              and the apiToolID of the API tool it now belongs to.
      security:
        - token: []
components:
  schemas:
    StableAPIToolVariableCreateRequest:
      type: object
      properties:
        name:
          type: string
          description: The name of the variable, referenced within the API tool request.
        apiToolID:
          type: string
          description: The ID of the API tool this variable belongs to.
        description:
          nullable: true
          description: >-
            A description of the variable, used by the agent to determine what
            value to provide.
          type: string
      required:
        - name
        - apiToolID
      additionalProperties: false
    StableAPIToolVariableResponse:
      type: object
      properties:
        variable:
          $ref: '#/components/schemas/StableAPIToolVariable'
      required:
        - variable
    StableAPIToolVariable:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
          description: The name of the variable, referenced within the API tool request.
        apiToolID:
          type: string
          description: The ID of the API tool this variable belongs to.
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
        description:
          nullable: true
          description: >-
            A description of the variable, used by the agent to determine what
            value to provide.
          type: string
      required:
        - id
        - name
        - apiToolID
        - createdAt
        - updatedAt
        - description
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````