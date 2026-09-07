> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run evaluation

> Scores one finished conversation against an evaluation. The response carries the verdict together with the reasoning behind it, so a low score says why.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/evaluation/{evaluationID}/run
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
  /v1/stable/evaluation/{evaluationID}/run:
    post:
      tags:
        - Evaluation
      summary: Run evaluation
      description: >-
        Scores one finished conversation against an evaluation. The response
        carries the verdict together with the reasoning behind it, so a low
        score says why.
      operationId: StableEvaluationController_run
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableEvaluationRunRequest'
      responses:
        '201':
          description: >-
            Scores the transcript named in the body against this evaluation and
            returns the result: the `value` the evaluator produced, typed to
            match the evaluation, the `reason` behind it, and the LLM cost the
            run incurred.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableEvaluationRunResponse'
          x-vf-doc:
            description: >-
              Scores the transcript named in the body against this evaluation
              and returns the result: the `value` the evaluator produced, typed
              to match the evaluation, the `reason` behind it, and the LLM cost
              the run incurred.
      security:
        - token: []
components:
  schemas:
    StableEvaluationRunRequest:
      type: object
      properties:
        transcriptID:
          type: string
          description: The ID of the transcript to run the evaluation against.
      required:
        - transcriptID
      additionalProperties: false
    StableEvaluationRunResponse:
      type: object
      properties:
        result:
          $ref: '#/components/schemas/StableEvaluationResult'
      required:
        - result
    StableEvaluationResult:
      type: object
      properties:
        cost:
          type: number
          description: The LLM cost incurred by this evaluation run.
        value:
          anyOf:
            - type: boolean
            - type: number
            - type: string
          description: >-
            The result produced by the evaluator; its type matches the
            evaluation `type`.
        reason:
          type: string
          description: The evaluator's explanation for the returned `value`.
        transcriptID:
          type: string
          description: The ID of the transcript that was evaluated.
        evaluationID:
          type: string
          description: The ID of the evaluation that was run.
      required:
        - cost
        - value
        - reason
        - transcriptID
        - evaluationID
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````