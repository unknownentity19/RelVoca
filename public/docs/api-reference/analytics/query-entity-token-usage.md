> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query entity token usage

> Reports how many tokens each entity consumed, for one organization over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/entity-token-usage/organization/{organizationID}
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
  /v1/stable/analytics/query/entity-token-usage/organization/{organizationID}:
    post:
      tags:
        - Analytics
      summary: Query entity token usage
      description: >-
        Reports how many tokens each entity consumed, for one organization over
        a date range. The request body takes `startDate`, `endDate` and an
        `interval`, the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryTokenUsageByEntity
      parameters:
        - name: organizationID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the organization to operate on.
          description: The ID of the organization to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableAnalyticsQueryEntityTokenUsageRequest'
      responses:
        '200':
          description: >-
            Returns two parallel breakdowns of the organization's tokens, one
            array of workspaces and one of projects, each row pairing an ID with
            the tokens it used. Neither is split by model or by time.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryEntityTokenUsageResponse
          x-vf-doc:
            description: >-
              Returns two parallel breakdowns of the organization's tokens, one
              array of workspaces and one of projects, each row pairing an ID
              with the tokens it used. Neither is split by model or by time.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryEntityTokenUsageRequest:
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
      required:
        - endDate
        - startDate
      additionalProperties: false
    StableAnalyticsQueryEntityTokenUsageResponse:
      type: object
      properties:
        workspaces:
          type: array
          items:
            type: object
            properties:
              workspaceID:
                type: string
              count:
                type: number
            required:
              - workspaceID
              - count
        projects:
          type: array
          items:
            type: object
            properties:
              projectID:
                type: string
                description: The ID of the project.
              count:
                type: number
                description: The number of tokens used by the project.
            required:
              - projectID
              - count
          description: The token usage broken down by project.
      required:
        - workspaces
        - projects
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````