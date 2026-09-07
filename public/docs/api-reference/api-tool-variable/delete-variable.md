> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete variable

> Deletes a single API tool variable by ID. An API tool variable is an input an API tool substitutes into its request. The response carries only a confirmation message, so refetch the API tool variables to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/api-tool-variable/{variableID}
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
  /v1/stable/api-tool-variable/{variableID}:
    delete:
      tags:
        - API Tool Variable
      summary: Delete variable
      description: >-
        Deletes a single API tool variable by ID. An API tool variable is an
        input an API tool substitutes into its request. The response carries
        only a confirmation message, so refetch the API tool variables to see
        what is left.
      operationId: StableAPIToolVariableController_delete
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
            Confirms the API tool variable was deleted. Nothing but a message is
            returned, so refetch the tool's variables to see which names its
            request can still reference.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the API tool variable was deleted. Nothing but a message
              is returned, so refetch the tool's variables to see which names
              its request can still reference.
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