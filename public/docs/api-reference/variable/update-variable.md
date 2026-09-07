> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update variable

> Changes an existing variable in place. The response carries only a confirmation message, so refetch the variable to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/variable/{variableID}
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
    patch:
      tags:
        - Variable
      summary: Update variable
      description: >-
        Changes an existing variable in place. The response carries only a
        confirmation message, so refetch the variable to read its new values.
      operationId: StableVariableController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableVariableUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the variable was updated. The body is a message rather than
            the revised variable, so read the variable back to see its new
            default value or description.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the variable was updated. The body is a message rather
              than the revised variable, so read the variable back to see its
              new default value or description.
      security:
        - token: []
components:
  schemas:
    StableVariableUpdateRequest:
      type: object
      properties:
        name:
          type: string
        color:
          type: string
          description: The display color of the variable in the RelVoca editor.
        description:
          nullable: true
          description: A short description of what the variable stores.
          type: string
        defaultValue:
          nullable: true
          description: The initial value of the variable at the start of a conversation.
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