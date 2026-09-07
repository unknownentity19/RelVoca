> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create project

> Adds a project to the workspace, the container that owns exactly one agent. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/project
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
  /v1/stable/project:
    post:
      tags:
        - Project
      summary: Create project
      description: >-
        Adds a project to the workspace, the container that owns exactly one
        agent. The response carries the ID that later calls address it by.
      operationId: StableProjectController_create
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableProjectCreateRequest'
      responses:
        '201':
          description: >-
            Creates the project and returns it, including the ID that most other
            endpoints take as their projectID query parameter.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableProjectResponse'
          x-vf-doc:
            description: >-
              Creates the project and returns it, including the ID that most
              other endpoints take as their projectID query parameter.
      security:
        - token: []
components:
  schemas:
    StableProjectCreateRequest:
      type: object
      properties:
        name:
          type: string
        workspaceID:
          type: string
          description: The ID of the workspace the project belongs to.
        type:
          type: string
          enum:
            - webchat
            - phone-call
          description: The channel type of the project to create.
          x-enumNames:
            - WEBCHAT
            - PHONE_CALL
      required:
        - name
        - workspaceID
        - type
      additionalProperties: false
    StableProjectResponse:
      type: object
      properties:
        project:
          $ref: '#/components/schemas/StableProject'
      required:
        - project
    StableProject:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        image:
          nullable: true
          description: The URL of the project image.
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
        workspaceID:
          type: string
          description: The ID of the workspace the project belongs to.
        description:
          nullable: true
          description: A short description of the project.
          type: string
      required:
        - id
        - name
        - image
        - createdAt
        - updatedAt
        - workspaceID
        - description
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````