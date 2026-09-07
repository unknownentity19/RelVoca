> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get workspace

> Returns a single workspace by ID, with the fields that define it. A workspace is the container that groups projects and the people who work on them.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/workspace/{workspaceID}
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
  /v1/stable/workspace/{workspaceID}:
    get:
      tags:
        - Workspace
      summary: Get workspace
      description: >-
        Returns a single workspace by ID, with the fields that define it. A
        workspace is the container that groups projects and the people who work
        on them.
      operationId: StableWorkspaceController_get
      parameters:
        - name: workspaceID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the workspace to operate on.
          description: The ID of the workspace to operate on.
      responses:
        '200':
          description: >-
            Returns the one workspace, with its name, image URL, the
            organization it belongs to, and its creation and update timestamps.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableWorkspaceResponse'
          x-vf-doc:
            description: >-
              Returns the one workspace, with its name, image URL, the
              organization it belongs to, and its creation and update
              timestamps.
      security:
        - token: []
components:
  schemas:
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