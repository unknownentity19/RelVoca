> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create property

> Adds a transcript property to the project, a label you define once and then set on individual conversations. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/transcript-property
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
    post:
      tags:
        - Transcript Property
      summary: Create property
      description: >-
        Adds a transcript property to the project, a label you define once and
        then set on individual conversations. The response carries the ID that
        later calls address it by.
      operationId: StableTranscriptPropertyController_create
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
              $ref: '#/components/schemas/StableTranscriptPropertyCreateRequest'
      responses:
        '201':
          description: >-
            Creates the property and returns it with its generated ID, the value
            type it holds, and the project it belongs to. The property is now
            defined on the project but is not yet set on any transcript.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTranscriptPropertyResponse'
          x-vf-doc:
            description: >-
              Creates the property and returns it with its generated ID, the
              value type it holds, and the project it belongs to. The property
              is now defined on the project but is not yet set on any
              transcript.
      security:
        - token: []
components:
  schemas:
    StableTranscriptPropertyCreateRequest:
      type: object
      properties:
        name:
          type: string
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
      required:
        - name
        - type
      additionalProperties: false
    StableTranscriptPropertyResponse:
      type: object
      properties:
        property:
          $ref: '#/components/schemas/StableTranscriptProperty'
      required:
        - property
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