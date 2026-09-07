> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete environment

> Deletes a single environment by ID. An environment is one draft-and-published copy of the agent. The response carries only a confirmation message, so refetch the environments to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/environment/{environmentAlias}
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
    delete:
      tags:
        - Environment
      summary: Delete environment
      description: >-
        Deletes a single environment by ID. An environment is one
        draft-and-published copy of the agent. The response carries only a
        confirmation message, so refetch the environments to see what is left.
      operationId: StableEnvironmentController_delete
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
      responses:
        '200':
          description: >-
            Confirms the environment was deleted. Only a message comes back, so
            list the project's environments again to see which aliases remain.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the environment was deleted. Only a message comes back,
              so list the project's environments again to see which aliases
              remain.
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