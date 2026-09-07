> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update traffic split

> Changes an existing environment in place. The response carries only a confirmation message, so refetch the environment to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json put /v1/stable/environment/update-traffic-split
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
  /v1/stable/environment/update-traffic-split:
    put:
      tags:
        - Environment
      summary: Update traffic split
      description: >-
        Changes an existing environment in place. The response carries only a
        confirmation message, so refetch the environment to read its new values.
      operationId: StableEnvironmentController_updateTrafficSplit
      parameters:
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
              $ref: '#/components/schemas/StableEnvironmentUpdateTrafficSplitRequest'
      responses:
        '200':
          description: >-
            Confirms the new split was saved. The body is a message only, so
            read the environments back to see the trafficPercentage now recorded
            against each one.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the new split was saved. The body is a message only, so
              read the environments back to see the trafficPercentage now
              recorded against each one.
      security:
        - token: []
components:
  schemas:
    StableEnvironmentUpdateTrafficSplitRequest:
      type: object
      properties:
        traffic:
          type: object
          additionalProperties:
            type: number
            minimum: 0
            maximum: 100
          description: >-
            Map of environmentAlias → traffic percentage (0-100). Values must
            sum to 100.
      required:
        - traffic
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