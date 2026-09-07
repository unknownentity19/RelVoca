> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get project

> Returns a single project by ID, with the fields that define it. A project is the container that owns exactly one agent.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/project/{projectID}
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
  /v1/stable/project/{projectID}:
    get:
      tags:
        - Project
      summary: Get project
      description: >-
        Returns a single project by ID, with the fields that define it. A
        project is the container that owns exactly one agent.
      operationId: StableProjectController_get
      parameters:
        - name: projectID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the project to operate on.
          description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Returns the one project, with its name, description, image URL, and
            the workspace that holds it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableProjectResponse'
          x-vf-doc:
            description: >-
              Returns the one project, with its name, description, image URL,
              and the workspace that holds it.
      security:
        - token: []
components:
  schemas:
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