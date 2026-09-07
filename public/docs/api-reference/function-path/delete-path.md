> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete path

> Deletes a single function path by ID. A function path is one of the named exits a function can return through. The response carries only a confirmation message, so refetch the function paths to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/function-path/{pathID}
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
  /v1/stable/function-path/{pathID}:
    delete:
      tags:
        - Function Path
      summary: Delete path
      description: >-
        Deletes a single function path by ID. A function path is one of the
        named exits a function can return through. The response carries only a
        confirmation message, so refetch the function paths to see what is left.
      operationId: StableFunctionPathController_delete
      parameters:
        - name: pathID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the function path to operate on.
          description: The ID of the function path to operate on.
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
            Confirms the exit path was removed from its function. The body is a
            message only, so refetch the function's paths to see the branches it
            can still take.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the exit path was removed from its function. The body is
              a message only, so refetch the function's paths to see the
              branches it can still take.
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