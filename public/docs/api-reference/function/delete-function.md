> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete function

> Deletes a single function by ID. A function is custom JavaScript that runs in RelVoca’s sandbox and returns through a named path. The response carries only a confirmation message, so refetch the functions to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/function/{functionID}
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
  /v1/stable/function/{functionID}:
    delete:
      tags:
        - Function
      summary: Delete function
      description: >-
        Deletes a single function by ID. A function is custom JavaScript that
        runs in RelVoca’s sandbox and returns through a named path. The
        response carries only a confirmation message, so refetch the functions
        to see what is left.
      operationId: StableFunctionController_delete
      parameters:
        - name: functionID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the function to operate on.
          description: The ID of the function to operate on.
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
            Confirms the function was deleted. The response is a message, not
            the removed function, so its JavaScript source is not recoverable
            from this call.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the function was deleted. The response is a message, not
              the removed function, so its JavaScript source is not recoverable
              from this call.
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