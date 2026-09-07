> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete check

> Deletes a single test check by ID. A test check is one assertion about an agent turn, comparing the reply or the behaviour behind it. The response carries only a confirmation message, so refetch the test checks to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/test-check/{checkID}
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
  /v1/stable/test-check/{checkID}:
    delete:
      tags:
        - Test Check
      summary: Delete check
      description: >-
        Deletes a single test check by ID. A test check is one assertion about
        an agent turn, comparing the reply or the behaviour behind it. The
        response carries only a confirmation message, so refetch the test checks
        to see what is left.
      operationId: StableTestCheckController_delete
      parameters:
        - name: checkID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test check to operate on.
          description: The ID of the test check to operate on.
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
            Confirms one assertion was removed from its turn. The body carries a
            message only, not the turn's remaining checks.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms one assertion was removed from its turn. The body carries
              a message only, not the turn's remaining checks.
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