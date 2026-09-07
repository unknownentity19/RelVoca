> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create workspace

> Adds a workspace to the account, the container that groups projects and the people who work on them. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/workspace
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
  /v1/stable/workspace:
    post:
      tags:
        - Workspace
      summary: Create workspace
      description: >-
        Adds a workspace to the account, the container that groups projects and
        the people who work on them. The response carries the ID that later
        calls address it by.
      operationId: StableWorkspaceController_create
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableWorkspaceCreateRequest'
      responses:
        '201':
          description: >-
            Creates the workspace and returns it, including the generated ID
            that later calls pass as workspaceID.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableWorkspaceResponse'
          x-vf-doc:
            description: >-
              Creates the workspace and returns it, including the generated ID
              that later calls pass as workspaceID.
      security:
        - token: []
components:
  schemas:
    StableWorkspaceCreateRequest:
      type: object
      properties:
        name:
          type: string
        organizationID:
          type: string
          description: The ID of the organization the workspace belongs to.
      required:
        - name
        - organizationID
      additionalProperties: false
    StableWorkspaceResponse:
      type: object
      properties:
        workspace:
          $ref: '#/components/schemas/StableWorkspace'
      required:
        - workspace
    StableWorkspace:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        image:
          nullable: true
          description: The URL of the workspace image.
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
        organizationID:
          type: string
          description: The ID of the organization the workspace belongs to.
      required:
        - id
        - name
        - image
        - createdAt
        - updatedAt
        - organizationID
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````