> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List properties

> Returns every transcript property in the project. A transcript property is a label you define once and then set on individual conversations. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/transcript-property
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
  /v1/stable/transcript-property:
    get:
      tags:
        - Transcript Property
      summary: List properties
      description: >-
        Returns every transcript property in the project. A transcript property
        is a label you define once and then set on individual conversations. The
        call takes no paging parameters, so one request yields the whole set.
      operationId: StableTranscriptPropertyController_list
      parameters:
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Returns every transcript property defined on the project, each with
            its name, the type of value it holds, and whether it is built in.
            Built-in properties cannot be updated, deleted, or have a value set.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTranscriptPropertyListResponse'
          x-vf-doc:
            description: >-
              Returns every transcript property defined on the project, each
              with its name, the type of value it holds, and whether it is built
              in. Built-in properties cannot be updated, deleted, or have a
              value set.
      security:
        - token: []
components:
  schemas:
    StableTranscriptPropertyListResponse:
      type: object
      properties:
        properties:
          type: array
          items:
            $ref: '#/components/schemas/StableTranscriptProperty'
      required:
        - properties
    StableTranscriptProperty:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        default:
          type: boolean
          description: >-
            Whether this is a built-in property, which cannot be updated,
            deleted or have its value set.
        type:
          type: string
          enum:
            - boolean
            - number
            - string
          description: The type of value the property holds.
          x-enumNames:
            - BOOLEAN
            - NUMBER
            - STRING
        projectID:
          type: string
          description: The ID of the project the property belongs to.
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        updatedAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
      required:
        - id
        - name
        - default
        - type
        - projectID
        - createdAt
        - updatedAt
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````