> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many variables

> Adds several API tool variables to its API tool in one request, each taking the fields the single-create call takes. The response carries the created API tool variables in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/api-tool-variable/batch
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
  /v1/stable/api-tool-variable/batch:
    post:
      tags:
        - API Tool Variable
      summary: Create many variables
      description: >-
        Adds several API tool variables to its API tool in one request, each
        taking the fields the single-create call takes. The response carries the
        created API tool variables in the same shape the list call returns.
      operationId: StableAPIToolVariableController_createMany
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
              $ref: '#/components/schemas/StableAPIToolVariableCreateManyRequest'
      responses:
        '201':
          description: >-
            Returns the newly created API tool variables, each with its own ID
            and the apiToolID of the API tool it was attached to.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAPIToolVariableListResponse'
          x-vf-doc:
            description: >-
              Returns the newly created API tool variables, each with its own ID
              and the apiToolID of the API tool it was attached to.
      security:
        - token: []
components:
  schemas:
    StableAPIToolVariableCreateManyRequest:
      type: object
      properties:
        apiToolID:
          type: string
          description: The ID of the API tool to create the variables under.
        variables:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
                description: >-
                  The name of the variable, referenced within the API tool
                  request.
              description:
                nullable: true
                description: >-
                  A description of the variable, used by the agent to determine
                  what value to provide.
                type: string
            required:
              - name
            additionalProperties: false
      required:
        - apiToolID
        - variables
    StableAPIToolVariableListResponse:
      type: object
      properties:
        variables:
          type: array
          items:
            $ref: '#/components/schemas/StableAPIToolVariable'
      required:
        - variables
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