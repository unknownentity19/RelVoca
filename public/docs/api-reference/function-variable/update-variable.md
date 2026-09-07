> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update variable

> Changes an existing function variable in place. The response carries only a confirmation message, so refetch the function variable to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/function-variable/{variableID}
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
  /v1/stable/function-variable/{variableID}:
    patch:
      tags:
        - Function Variable
      summary: Update variable
      description: >-
        Changes an existing function variable in place. The response carries
        only a confirmation message, so refetch the function variable to read
        its new values.
      operationId: StableFunctionVariableController_update
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
                - $ref: '#/components/schemas/StableFunctionVariableUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the function variable was updated. The body confirms the
            write rather than returning the variable, so fetch the variable
            again to check its name, description, and whether it is an input or
            an output.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the function variable was updated. The body confirms the
              write rather than returning the variable, so fetch the variable
              again to check its name, description, and whether it is an input
              or an output.
      security:
        - token: []
components:
  schemas:
    StableFunctionVariableUpdateRequest:
      type: object
      properties:
        name:
          type: string
          description: The name used to reference the variable in the function code.
        description:
          nullable: true
          description: A human-readable description of what the variable holds.
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