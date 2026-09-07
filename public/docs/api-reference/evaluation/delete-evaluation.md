> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete evaluation

> Deletes a single evaluation by ID. An evaluation is a criterion a model scores past conversations against. The response carries only a confirmation message, so refetch the evaluations to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/evaluation/{evaluationID}
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
  /v1/stable/evaluation/{evaluationID}:
    delete:
      tags:
        - Evaluation
      summary: Delete evaluation
      description: >-
        Deletes a single evaluation by ID. An evaluation is a criterion a model
        scores past conversations against. The response carries only a
        confirmation message, so refetch the evaluations to see what is left.
      operationId: StableEvaluationController_delete
      parameters:
        - name: evaluationID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the evaluation to operate on.
          description: The ID of the evaluation to operate on.
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Confirms the evaluation was removed from the project. The body
            carries a message only, so drop any cached copy of the project's
            evaluations.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the evaluation was removed from the project. The body
              carries a message only, so drop any cached copy of the project's
              evaluations.
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