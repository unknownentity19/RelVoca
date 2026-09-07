> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update function

> Changes an existing function in place. The response carries only a confirmation message, so refetch the function to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/function/{functionID}
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
    patch:
      tags:
        - Function
      summary: Update function
      description: >-
        Changes an existing function in place. The response carries only a
        confirmation message, so refetch the function to read its new values.
      operationId: StableFunctionController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableFunctionUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the function was updated. Only a message is returned, not
            the revised function, so fetch the function again to read back its
            saved code.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the function was updated. Only a message is returned, not
              the revised function, so fetch the function again to read back its
              saved code.
      security:
        - token: []
components:
  schemas:
    StableFunctionUpdateRequest:
      type: object
      properties:
        name:
          type: string
        code:
          type: string
          maxLength: 1048576
          description: The JavaScript source code executed when the function runs.
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/FunctionSettings'
        pathOrder:
          type: array
          items:
            type: string
          description: >-
            An ordered list of path IDs controlling the display order of the
            function's exit paths.
        description:
          nullable: true
          description: A human-readable description of what the function does.
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
    FunctionSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````