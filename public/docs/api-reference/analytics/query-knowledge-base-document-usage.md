> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query knowledge base document usage

> Reports how often each knowledge base document was retrieved, for one project over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/knowledge-base-document-usage/project/{projectID}
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
  /v1/stable/analytics/query/knowledge-base-document-usage/project/{projectID}:
    post:
      tags:
        - Analytics
      summary: Query knowledge base document usage
      description: >-
        Reports how often each knowledge base document was retrieved, for one
        project over a date range. The request body takes `startDate`, `endDate`
        and an `interval`, the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryKnowledgeBaseDocumentUsage
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
                #/components/schemas/StableAnalyticsQueryKnowledgeBaseDocumentUsageRequest
      responses:
        '200':
          description: >-
            Returns a usage count for each knowledge base document, keyed by
            document ID. The row is a document ID and a count, nothing more.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryKnowledgeBaseDocumentUsageResponse
          x-vf-doc:
            description: >-
              Returns a usage count for each knowledge base document, keyed by
              document ID. The row is a document ID and a count, nothing more.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryKnowledgeBaseDocumentUsageRequest:
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
    StableAnalyticsQueryKnowledgeBaseDocumentUsageResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              count:
                type: number
              documentID:
                type: string
            required:
              - count
              - documentID
      required:
        - rows
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````