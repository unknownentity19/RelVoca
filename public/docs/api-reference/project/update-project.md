> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update project

> Changes an existing project in place. The response carries only a confirmation message, so refetch the project to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/project/{projectID}
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
    patch:
      tags:
        - Project
      summary: Update project
      description: >-
        Changes an existing project in place. The response carries only a
        confirmation message, so refetch the project to read its new values.
      operationId: StableProjectController_update
      parameters:
        - name: projectID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the project to operate on.
          description: The ID of the project to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableProjectUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the change to the project was saved. The response carries a
            message rather than the project, so read the project back to see its
            current name and description.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the change to the project was saved. The response carries
              a message rather than the project, so read the project back to see
              its current name and description.
      security:
        - token: []
components:
  schemas:
    StableProjectUpdateRequest:
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