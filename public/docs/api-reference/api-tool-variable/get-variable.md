> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get variable

> Returns a single API tool variable by ID, with the fields that define it. An API tool variable is an input an API tool substitutes into its request.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/api-tool-variable/{variableID}
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
  /v1/stable/api-tool-variable/{variableID}:
    get:
      tags:
        - API Tool Variable
      summary: Get variable
      description: >-
        Returns a single API tool variable by ID, with the fields that define
        it. An API tool variable is an input an API tool substitutes into its
        request.
      operationId: StableAPIToolVariableController_get
      parameters:
        - name: variableID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the variable to operate on.
          description: The ID of the variable to operate on.
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
            Returns a single API tool variable, with the name its tool's request
            references, the description that tells the agent what value to
            supply, and the ID of the API tool that owns it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAPIToolVariableResponse'
          x-vf-doc:
            description: >-
              Returns a single API tool variable, with the name its tool's
              request references, the description that tells the agent what
              value to supply, and the ID of the API tool that owns it.
      security:
        - token: []
components:
  schemas:
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