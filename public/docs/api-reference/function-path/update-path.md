> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update path

> Changes an existing function path in place. The response carries only a confirmation message, so refetch the function path to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/function-path/{pathID}
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
    patch:
      tags:
        - Function Path
      summary: Update path
      description: >-
        Changes an existing function path in place. The response carries only a
        confirmation message, so refetch the function path to read its new
        values.
      operationId: StableFunctionPathController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableFunctionPathUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the path's name or label was changed. The body is a message
            only, and because the name is what function code returns to select
            this path, renaming it affects that code.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the path's name or label was changed. The body is a
              message only, and because the name is what function code returns
              to select this path, renaming it affects that code.
      security:
        - token: []
components:
  schemas:
    StableFunctionPathUpdateRequest:
      type: object
      properties:
        name:
          type: string
          description: >-
            The name of the exit path, referenced by the function code when
            returning which path to take.
        label:
          nullable: true
          description: >-
            The display label shown for this path in the RelVoca UI; falls
            back to `name` when null.
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