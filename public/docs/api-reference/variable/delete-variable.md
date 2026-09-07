> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete variable

> Deletes a single variable by ID. A variable is a named slot of project state an agent can read and write. The response carries only a confirmation message, so refetch the variables to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/variable/{variableID}
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
  /v1/stable/variable/{variableID}:
    delete:
      tags:
        - Variable
      summary: Delete variable
      description: >-
        Deletes a single variable by ID. A variable is a named slot of project
        state an agent can read and write. The response carries only a
        confirmation message, so refetch the variables to see what is left.
      operationId: StableVariableController_delete
      parameters:
        - name: variableID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the variable to operate on.
          description: The ID of the variable to operate on.
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
        - name: environmentAlias
          required: true
          in: query
          schema:
            type: string
            description: The alias of the environment to operate on (e.g. `main`).
      responses:
        '200':
          description: >-
            Confirms the variable was deleted. Only a message comes back, so
            refresh any cached copy of the project's variables.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the variable was deleted. Only a message comes back, so
              refresh any cached copy of the project's variables.
        '404':
          description: >-
            No variable with that ID exists in the project and environment. A
            delete that has already succeeded returns this on a second attempt,
            so the operation is not idempotent - treat a 404 here as "already
            gone" rather than as a failure worth retrying.
          x-vf-doc:
            description: >-
              No variable with that ID exists in the project and environment. A
              delete that has already succeeded returns this on a second
              attempt, so the operation is not idempotent - treat a 404 here as
              "already gone" rather than as a failure worth retrying.
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