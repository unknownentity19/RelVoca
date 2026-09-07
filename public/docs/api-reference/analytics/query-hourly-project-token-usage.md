> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query hourly project token usage

> Reports how many tokens were consumed, bucketed by hour, for one project over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/hourly-token-usage/project/{projectID}
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
  /v1/stable/analytics/query/hourly-token-usage/project/{projectID}:
    post:
      tags:
        - Analytics
      summary: Query hourly project token usage
      description: >-
        Reports how many tokens were consumed, bucketed by hour, for one project
        over a date range. The request body takes `startDate`, `endDate` and an
        `interval`, the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryHourlyTokenUsageByProject
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
              $ref: >-
                #/components/schemas/StableAnalyticsQueryProjectHourlyTokenUsageRequest
      responses:
        '200':
          description: >-
            Returns hourly token counts for the project, each row keyed by the
            hour's start timestamp and split by model and by usage category.
            Both the model and the category are nullable.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryProjectHourlyTokenUsageResponse
          x-vf-doc:
            description: >-
              Returns hourly token counts for the project, each row keyed by the
              hour's start timestamp and split by model and by usage category.
              Both the model and the category are nullable.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryProjectHourlyTokenUsageRequest:
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
        interval:
          type: string
          enum:
            - hour
            - day
            - week
            - month
          x-enumNames:
            - HOUR
            - DAY
            - WEEK
            - MONTH
        usageClass:
          type: string
          enum:
            - Host
            - Build
            - Test
            - Monitor
          x-enumNames:
            - HOST
            - BUILD
            - TEST
            - MONITOR
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
        - interval
      additionalProperties: false
    StableAnalyticsQueryProjectHourlyTokenUsageResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              model:
                nullable: true
                type: string
              usageCategory:
                nullable: true
                type: string
              count:
                type: number
              intervalStartDate:
                type: string
                allOf:
                  - type: string
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
                  - type: string
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
            required:
              - model
              - usageCategory
              - count
              - intervalStartDate
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````