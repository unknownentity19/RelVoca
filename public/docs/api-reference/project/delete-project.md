> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete project

> Deletes a single project by ID. A project is the container that owns exactly one agent. The response carries only a confirmation message, so refetch the projects to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/project/{projectID}
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
    delete:
      tags:
        - Project
      summary: Delete project
      description: >-
        Deletes a single project by ID. A project is the container that owns
        exactly one agent. The response carries only a confirmation message, so
        refetch the projects to see what is left.
      operationId: StableProjectController_delete
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
            Confirms the project was deleted. The response is a message only, so
            list the workspace's projects again if you keep your own copy of
            them.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the project was deleted. The response is a message only,
              so list the workspace's projects again if you keep your own copy
              of them.
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