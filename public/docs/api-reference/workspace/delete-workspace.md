> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete workspace

> Deletes a single workspace by ID. A workspace is the container that groups projects and the people who work on them. The response carries only a confirmation message, so refetch the workspaces to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/workspace/{workspaceID}
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
    delete:
      tags:
        - Workspace
      summary: Delete workspace
      description: >-
        Deletes a single workspace by ID. A workspace is the container that
        groups projects and the people who work on them. The response carries
        only a confirmation message, so refetch the workspaces to see what is
        left.
      operationId: StableWorkspaceController_delete
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
            Confirms the workspace was deleted. Only a message comes back, so
            list workspaces again to see what remains.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the workspace was deleted. Only a message comes back, so
              list workspaces again to see what remains.
      security:
        - token: []
components:
  schemas:
    StableDeleteResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the deletion.
      required:
        - message
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````