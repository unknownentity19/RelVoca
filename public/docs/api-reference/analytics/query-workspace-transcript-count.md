> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query workspace transcript count

> Reports how many conversations were recorded, for one workspace over a date range. The request body takes `startDate`, `endDate` and an `interval`, the same shape the other analytics measures take.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/analytics/query/transcript-count/workspace/{workspaceID}
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
  /v1/stable/analytics/query/transcript-count/workspace/{workspaceID}:
    post:
      tags:
        - Analytics
      summary: Query workspace transcript count
      description: >-
        Reports how many conversations were recorded, for one workspace over a
        date range. The request body takes `startDate`, `endDate` and an
        `interval`, the same shape the other analytics measures take.
      operationId: StableAnalyticsController_queryTranscriptCountByWorkspace
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
                #/components/schemas/StableAnalyticsQueryWorkspaceTranscriptCountRequest
      responses:
        '200':
          description: >-
            Returns transcript totals across the workspace, split by project, by
            environment alias, and by whether the transcripts came from the
            environment's draft or published version. The rows carry no time
            dimension.
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/StableAnalyticsQueryWorkspaceTranscriptCountResponse
          x-vf-doc:
            description: >-
              Returns transcript totals across the workspace, split by project,
              by environment alias, and by whether the transcripts came from the
              environment's draft or published version. The rows carry no time
              dimension.
      security:
        - token: []
components:
  schemas:
    StableAnalyticsQueryWorkspaceTranscriptCountRequest:
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
    StableAnalyticsQueryWorkspaceTranscriptCountResponse:
      type: object
      properties:
        rows:
          type: array
          items:
            type: object
            properties:
              count:
                type: number
              version:
                description: >-
                  Whether the transcripts in this row came from the draft or
                  published version of the environment.
                type: string
                enum:
                  - draft
                  - published
                x-enumNames:
                  - DRAFT
                  - PUBLISHED
              projectID:
                description: The ID of the project this row belongs to.
                type: string
              environmentAlias:
                description: The alias of the environment this row belongs to.
                type: string
            required:
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