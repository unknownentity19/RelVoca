> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List variables

> Returns every API tool variable in its API tool. An API tool variable is an input an API tool substitutes into its request. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/api-tool-variable
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
    get:
      tags:
        - API Tool Variable
      summary: List variables
      description: >-
        Returns every API tool variable in its API tool. An API tool variable is
        an input an API tool substitutes into its request. The call takes no
        paging parameters, so one request yields the whole set.
      operationId: StableAPIToolVariableController_list
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
        - name: apiToolID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the API tool whose variables to list.
      responses:
        '200':
          description: >-
            Returns every variable defined on a single API tool, selected by the
            apiToolID query parameter rather than across the whole project. Each
            carries the name the tool's request references and a description
            telling the agent what value to provide.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAPIToolVariableListResponse'
          x-vf-doc:
            description: >-
              Returns every variable defined on a single API tool, selected by
              the apiToolID query parameter rather than across the whole
              project. Each carries the name the tool's request references and a
              description telling the agent what value to provide.
      security:
        - token: []
components:
  schemas:
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