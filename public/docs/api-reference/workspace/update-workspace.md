> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update workspace

> Changes an existing workspace in place. The response carries only a confirmation message, so refetch the workspace to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/workspace/{workspaceID}
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
    patch:
      tags:
        - Workspace
      summary: Update workspace
      description: >-
        Changes an existing workspace in place. The response carries only a
        confirmation message, so refetch the workspace to read its new values.
      operationId: StableWorkspaceController_update
      parameters:
        - name: workspaceID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the workspace to operate on.
          description: The ID of the workspace to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableWorkspaceUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the workspace was updated. The body is a message, not the
            updated workspace, so refetch it to read the new values.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the workspace was updated. The body is a message, not the
              updated workspace, so refetch it to read the new values.
      security:
        - token: []
components:
  schemas:
    StableWorkspaceUpdateRequest:
      type: object
      properties:
        name:
          type: string
      additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````