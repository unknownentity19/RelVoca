> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get property

> Returns a single transcript property by ID, with the fields that define it. A transcript property is a label you define once and then set on individual conversations.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/transcript-property/{propertyID}
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
  /v1/stable/transcript-property/{propertyID}:
    get:
      tags:
        - Transcript Property
      summary: Get property
      description: >-
        Returns a single transcript property by ID, with the fields that define
        it. A transcript property is a label you define once and then set on
        individual conversations.
      operationId: StableTranscriptPropertyController_get
      parameters:
        - name: propertyID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the transcript property to operate on.
          description: The ID of the transcript property to operate on.
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Returns a single transcript property with its name, value type,
            owning project, and creation and update timestamps.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTranscriptPropertyResponse'
          x-vf-doc:
            description: >-
              Returns a single transcript property with its name, value type,
              owning project, and creation and update timestamps.
      security:
        - token: []
components:
  schemas:
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