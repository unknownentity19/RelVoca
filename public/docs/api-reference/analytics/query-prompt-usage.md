> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query prompt usage

> Reports how often each prompt was used, for one project over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/prompt-usage/project/{projectID}
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
  /v1/stable/analytics/query/prompt-usage/project/{projectID}:
    post:
      tags:
        - Analytics
      summary: Query prompt usage
      description: >-
        Reports how often each prompt was used, for one project over a date
        range. The request body takes `startDate`, `endDate` and an `interval`,
        the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryPromptUsage
      parameters:
        - name: projectID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the project to operate on.
          description: The ID of the project to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableAnalyticsQueryPromptUsageRequest'
      responses:
        '200':
          description: >-
            Returns per-prompt usage keyed by prompt ID, giving the number of
            uses, the successful subset of those, and the average latency in
            milliseconds.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAnalyticsQueryPromptUsageResponse'
          x-vf-doc:
            description: >-
              Returns per-prompt usage keyed by prompt ID, giving the number of
              uses, the successful subset of those, and the average latency in
              milliseconds.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryPromptUsageRequest:
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
        excludeID:
          type: array
          items:
            type: string
        limit:
          default: 10
          type: number
          maximum: 20
        orderDirection:
          type: string
          enum:
            - ASC
            - DESC
          x-enumNames:
            - ASC
            - DESC
        orderBy:
          type: string
          enum:
            - count
            - averageLatencyMS
          x-enumNames:
            - COUNT
            - AVERAGE_LATENCY_MS
        version:
          description: >-
            Filters results to the draft or published version of the
            environment. Defaults to both.
          type: string
          enum:
            - draft
            - published
          x-enumNames:
            - DRAFT
            - PUBLISHED
        environmentAlias:
          description: >-
            The ID or alias of the environment to filter results by. Defaults to
            all environments.
          type: string
      required:
        - endDate
        - startDate
      additionalProperties: false
    StableAnalyticsQueryPromptUsageResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              count:
                type: number
              promptID:
                type: string
              successCount:
                type: number
              averageLatencyMS:
                type: number
            required:
              - count
              - promptID
              - successCount
              - averageLatencyMS
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````