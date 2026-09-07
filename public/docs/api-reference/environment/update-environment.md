> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update environment

> Changes an existing environment in place. The response carries only a confirmation message, so refetch the environment to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/environment/{environmentAlias}
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
  /v1/stable/environment/{environmentAlias}:
    patch:
      tags:
        - Environment
      summary: Update environment
      description: >-
        Changes an existing environment in place. The response carries only a
        confirmation message, so refetch the environment to read its new values.
      operationId: StableEnvironmentController_update
      parameters:
        - name: environmentAlias
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The alias of the environment to operate on (e.g. `main`).
          description: The alias of the environment to operate on (e.g. `main`).
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableEnvironmentUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the environment was updated. The body carries a message,
            not the environment, so fetch it again to see the change alongside
            its releases and traffic percentage.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the environment was updated. The body carries a message,
              not the environment, so fetch it again to see the change alongside
              its releases and traffic percentage.
      security:
        - token: []
components:
  schemas:
    StableEnvironmentUpdateRequest:
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