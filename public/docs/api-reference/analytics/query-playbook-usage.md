> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query playbook usage

> Reports how often each playbook ran, for one project over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/playbook-usage/project/{projectID}
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
  /v1/stable/analytics/query/playbook-usage/project/{projectID}:
    post:
      tags:
        - Analytics
      summary: Query playbook usage
      description: >-
        Reports how often each playbook ran, for one project over a date range.
        The request body takes `startDate`, `endDate` and an `interval`, the
        same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryPlaybookUsage
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
              $ref: '#/components/schemas/StableAnalyticsQueryPlaybookUsageRequest'
      responses:
        '200':
          description: >-
            Returns one row per playbook, keyed by playbook ID, with its usage
            count, how many of those runs succeeded, and the average latency in
            milliseconds.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAnalyticsQueryPlaybookUsageResponse'
          x-vf-doc:
            description: >-
              Returns one row per playbook, keyed by playbook ID, with its usage
              count, how many of those runs succeeded, and the average latency
              in milliseconds.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryPlaybookUsageRequest:
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
    StableAnalyticsQueryPlaybookUsageResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              count:
                type: number
              successCount:
                type: number
              averageLatencyMS:
                type: number
              playbookID:
                type: string
                description: The ID of the playbook this usage row refers to.
            required:
              - count
              - successCount
              - averageLatencyMS
              - playbookID
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````