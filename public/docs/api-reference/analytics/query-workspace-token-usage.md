> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query workspace token usage

> Reports how many tokens were consumed, for one workspace over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/token-usage/workspace/{workspaceID}
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
  /v1/stable/analytics/query/token-usage/workspace/{workspaceID}:
    post:
      tags:
        - Analytics
      summary: Query workspace token usage
      description: >-
        Reports how many tokens were consumed, for one workspace over a date
        range. The request body takes `startDate`, `endDate` and an `interval`,
        the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryTokenUsageByWorkspace
      parameters:
        - name: workspaceID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the workspace to operate on.
          description: The ID of the workspace to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: >-
                #/components/schemas/StableAnalyticsQueryWorkspaceTokenUsageRequest
      responses:
        '200':
          description: >-
            Returns token consumption scoped to a single workspace, one row per
            model, the same model and count pairing the organization query
            returns at a wider scope.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryWorkspaceTokenUsageResponse
          x-vf-doc:
            description: >-
              Returns token consumption scoped to a single workspace, one row
              per model, the same model and count pairing the organization query
              returns at a wider scope.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryWorkspaceTokenUsageRequest:
      type: object
      properties:
        endDate:
          type: string
          allOf:
            - type: string
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            - type: string
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        startDate:
          type: string
          allOf:
            - type: string
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            - type: string
              pattern: >-
                ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        timezone:
          type: string
        projectIDs:
          description: >-
            The IDs of the projects to filter results by. Defaults to all
            projects in the workspace.
          type: array
          items:
            type: string
      required:
        - endDate
        - startDate
      additionalProperties: false
    StableAnalyticsQueryWorkspaceTokenUsageResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              model:
                type: string
              count:
                type: number
            required:
              - model
              - count
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````