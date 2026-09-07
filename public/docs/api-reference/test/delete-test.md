> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete test

> Deletes a single test by ID. A test is a scripted conversation replayed against the agent. The response carries only a confirmation message, so refetch the tests to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/test/{testID}
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
  /v1/stable/test/{testID}:
    delete:
      tags:
        - Test
      summary: Delete test
      description: >-
        Deletes a single test by ID. A test is a scripted conversation replayed
        against the agent. The response carries only a confirmation message, so
        refetch the tests to see what is left.
      operationId: StableTestController_delete
      parameters:
        - name: testID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the test to operate on.
          description: The ID of the test to operate on.
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
            Confirms the test was deleted. The body is a message only and
            reports nothing about the test's turns, checks, or past runs, which
            are separate resources.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the test was deleted. The body is a message only and
              reports nothing about the test's turns, checks, or past runs,
              which are separate resources.
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