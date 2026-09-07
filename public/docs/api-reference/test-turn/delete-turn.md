> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete turn

> Deletes a single test turn by ID. A test turn is one side of a scripted conversation, either what the user says or the agent reply the checks assert on. The response carries only a confirmation message, so refetch the test turns to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/test-turn/{turnID}
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
  /v1/stable/test-turn/{turnID}:
    delete:
      tags:
        - Test Turn
      summary: Delete turn
      description: >-
        Deletes a single test turn by ID. A test turn is one side of a scripted
        conversation, either what the user says or the agent reply the checks
        assert on. The response carries only a confirmation message, so refetch
        the test turns to see what is left.
      operationId: StableTestTurnController_delete
      parameters:
        - name: turnID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test turn to operate on.
          description: The ID of the test turn to operate on.
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
            Confirms the turn was deleted. The body is a message only, so
            refetch the parent test if you need its current `turnOrder`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the turn was deleted. The body is a message only, so
              refetch the parent test if you need its current `turnOrder`.
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