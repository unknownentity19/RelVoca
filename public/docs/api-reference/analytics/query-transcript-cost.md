> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query transcript cost

> Reports what those conversations cost in model spend, for one project over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/transcript-cost/project/{projectID}
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
  /v1/stable/analytics/query/transcript-cost/project/{projectID}:
    post:
      tags:
        - Analytics
      summary: Query transcript cost
      description: >-
        Reports what those conversations cost in model spend, for one project
        over a date range. The request body takes `startDate`, `endDate` and an
        `interval`, the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryTranscriptCost
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
                #/components/schemas/StableAnalyticsQueryProjectTranscriptCostRequest
      responses:
        '200':
          description: >-
            Returns per-interval cost paired with the transcript count behind
            it, so a row shows both the total cost incurred by transcripts and
            how many transcripts produced it.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryProjectTranscriptCostResponse
          x-vf-doc:
            description: >-
              Returns per-interval cost paired with the transcript count behind
              it, so a row shows both the total cost incurred by transcripts and
              how many transcripts produced it.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryProjectTranscriptCostRequest:
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
    StableAnalyticsQueryProjectTranscriptCostResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              intervalStartDate:
                type: string
                allOf:
                  - type: string
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
                  - type: string
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
              transcriptCount:
                type: number
              cost:
                type: number
                description: The total cost incurred by transcripts for this row.
            required:
              - intervalStartDate
              - transcriptCount
              - cost
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````