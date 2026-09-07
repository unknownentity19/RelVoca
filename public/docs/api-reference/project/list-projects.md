> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List projects

> Returns every project in the workspace. A project is the container that owns exactly one agent. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/project
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
    get:
      tags:
        - Project
      summary: List projects
      description: >-
        Returns every project in the workspace. A project is the container that
        owns exactly one agent. The call takes no paging parameters, so one
        request yields the whole set.
      operationId: StableProjectController_list
      parameters:
        - name: workspaceID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the workspace to list projects from.
      responses:
        '200':
          description: >-
            Returns every project in the workspace named by workspaceID, each
            with its name, description, image URL, and creation and update
            timestamps.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableProjectListResponse'
          x-vf-doc:
            description: >-
              Returns every project in the workspace named by workspaceID, each
              with its name, description, image URL, and creation and update
              timestamps.
      security:
        - token: []
components:
  schemas:
    StableProjectListResponse:
      type: object
      properties:
        projects:
          type: array
          items:
            $ref: '#/components/schemas/StableProject'
      required:
        - projects
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