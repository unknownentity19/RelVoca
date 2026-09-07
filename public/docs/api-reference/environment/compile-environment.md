> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Compile environment

> Rebuilds the environment’s runtime form from its current definition, which is what a conversation actually executes against.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json put /v1/stable/environment/{environmentAlias}/compile
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
  /v1/stable/environment/{environmentAlias}/compile:
    put:
      tags:
        - Environment
      summary: Compile environment
      description: >-
        Rebuilds the environment’s runtime form from its current definition,
        which is what a conversation actually executes against.
      operationId: StableEnvironmentController_compile
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
            Returns a confirmation message and durationMs, how long the
            compilation took in milliseconds. The environment itself is not part
            of the response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableEnvironmentCompileResponse'
          x-vf-doc:
            description: >-
              Returns a confirmation message and durationMs, how long the
              compilation took in milliseconds. The environment itself is not
              part of the response.
      security:
        - token: []
components:
  schemas:
    StableEnvironmentCompileResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
        durationMs:
          type: number
          description: How long the compilation took, in milliseconds.
      required:
        - message
        - durationMs
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````