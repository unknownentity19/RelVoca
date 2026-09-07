> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search transcripts

> Finds recorded conversations matching a filter. Unlike the list calls elsewhere in this API, the body takes `take` and `skip`, so results arrive a page at a time.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/transcript/search
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
  /v1/stable/transcript/search:
    post:
      tags:
        - Transcript
      summary: Search transcripts
      description: >-
        Finds recorded conversations matching a filter. Unlike the list calls
        elsewhere in this API, the body takes `take` and `skip`, so results
        arrive a page at a time.
      operationId: StableTranscriptController_search
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
              $ref: '#/components/schemas/StableTranscriptSearchRequest'
      responses:
        '200':
          description: >-
            Returns the transcripts matching the search, each with its session
            and user IDs, timestamps, recording URL, and any properties and
            evaluation results attached to it. The conversation logs are not
            included.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTranscriptListResponse'
          x-vf-doc:
            description: >-
              Returns the transcripts matching the search, each with its session
              and user IDs, timestamps, recording URL, and any properties and
              evaluation results attached to it. The conversation logs are not
              included.
      security:
        - token: []
components:
  schemas:
    StableTranscriptSearchRequest:
      type: object
      properties:
        take:
          default: 20
          description: The maximum number of results to return, used for pagination.
          type: number
          minimum: 1
          maximum: 100
        skip:
          default: 0
          description: The number of results to skip, used for pagination.
          type: integer
          minimum: 0
          maximum: 9007199254740991
        endDate:
          description: >-
            When provided, only transcripts created at or before this ISO 8601
            timestamp are returned.
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        version:
          description: >-
            When provided, only transcripts from draft or published
            conversations are returned.
          type: string
          enum:
            - draft
            - published
          x-enumNames:
            - DRAFT
            - PUBLISHED
        filters:
          allOf:
            - $ref: '#/components/schemas/TranscriptFilterArray'
        sessionID:
          description: >-
            When provided, only transcripts from this conversation session are
            returned.
          type: string
        startDate:
          description: >-
            When provided, only transcripts created at or after this ISO 8601
            timestamp are returned.
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        environmentAlias:
          description: >-
            When provided, only transcripts from the environment with this alias
            are returned.
          type: string
      additionalProperties: false
    StableTranscriptListResponse:
      type: object
      properties:
        transcripts:
          type: array
          items:
            $ref: '#/components/schemas/StableTranscript'
      required:
        - transcripts
    TranscriptFilterArray:
      type: array
      items:
        $ref: '#/components/schemas/TranscriptFilter'
    StableTranscript:
      type: object
      properties:
        id:
          type: string
        userID:
          type: string
          description: The ID of the end user who had the conversation.
        endedAt:
          nullable: true
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        projectID:
          type: string
          description: The ID of the project the conversation happened in.
        sessionID:
          type: string
          description: >-
            The ID of the conversation session this transcript was recorded
            from.
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
        expiresAt:
          nullable: true
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        properties:
          type: array
          items:
            $ref: '#/components/schemas/StableTranscriptPropertyWithValue'
        evaluations:
          type: array
          items:
            $ref: '#/components/schemas/StableEvaluationWithResult'
        recordingURL:
          nullable: true
          description: The URL of the call recording for voice conversations.
          type: string
      required:
        - id
        - userID
        - endedAt
        - projectID
        - sessionID
        - createdAt
        - updatedAt
        - expiresAt
        - properties
        - evaluations
        - recordingURL
    TranscriptFilter:
      oneOf:
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - gt
                - gte
                - lt
                - lte
              x-enumNames:
                - GREATER_THAN
                - GREATER_THAN_OR_EQUAL
                - LESS_THAN
                - LESS_THAN_OR_EQUAL
            value:
              type: number
          required:
            - id
            - op
            - value
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - eq
                - neq
              x-enumNames:
                - EQUALS
                - NOT_EQUALS
            value:
              anyOf:
                - anyOf:
                    - type: string
                    - type: number
                - type: boolean
          required:
            - id
            - op
            - value
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - between
              x-enumNames:
                - BETWEEN
            value:
              type: array
              items:
                anyOf:
                  - type: number
                  - type: number
              minItems: 2
              maxItems: 2
          required:
            - id
            - op
            - value
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - in
                - nin
              x-enumNames:
                - IN
                - NOT_IN
            value:
              type: array
              items:
                anyOf:
                  - type: string
                  - type: number
          required:
            - id
            - op
            - value
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - contains
              x-enumNames:
                - CONTAINS
            value:
              type: string
          required:
            - id
            - op
            - value
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - exists
                - not_exists
              x-enumNames:
                - EXISTS
                - NOT_EXISTS
          required:
            - id
            - op
        - type: object
          properties:
            id:
              type: string
            op:
              type: string
              enum:
                - json_contains
              x-enumNames:
                - JSONB_ARRAY_CONTAINS
            value:
              type: array
              items:
                type: object
                additionalProperties: {}
          required:
            - id
            - op
            - value
    StableTranscriptPropertyWithValue:
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
        value:
          type: string
          description: The value of the property recorded for this transcript.
      required:
        - id
        - name
        - default
        - type
        - createdAt
        - updatedAt
        - value
    StableEvaluationWithResult:
      allOf:
        - type: object
          properties:
            id:
              type: string
            name:
              type: string
            default:
              type: boolean
              description: Whether this is a built-in default evaluation.
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
            cost:
              type: number
              description: The cost incurred to run this evaluation against the transcript.
            value:
              anyOf:
                - type: boolean
                - type: number
                - type: string
              description: >-
                The result produced by the evaluation, typed according to the
                evaluation `type`.
            reason:
              type: string
              description: The explanation of why the evaluation produced this result.
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
            - description
            - cost
            - value
            - reason
            - createdAt
            - updatedAt
        - oneOf:
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - boolean
                  description: >-
                    Discriminator indicating the evaluation produces a boolean
                    result.
                  x-enumNames:
                    - BOOLEAN
              required:
                - type
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - number
                  description: >-
                    Discriminator indicating the evaluation produces a numeric
                    result.
                  x-enumNames:
                    - NUMBER
                minimumValue:
                  type: number
                  description: The lowest value the evaluation result can take.
                maximumValue:
                  type: number
                  description: The highest value the evaluation result can take.
              required:
                - type
                - minimumValue
                - maximumValue
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - string
                  description: >-
                    Discriminator indicating the evaluation produces a free-form
                    text result.
                  x-enumNames:
                    - STRING
              required:
                - type
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - option
                  description: >-
                    Discriminator indicating the evaluation picks a result from
                    a predefined set of options.
                  x-enumNames:
                    - OPTION
                options:
                  type: array
                  items:
                    type: object
                    properties:
                      value:
                        type: string
                        description: >-
                          The value assigned to the evaluation result when this
                          option is selected.
                      prompt:
                        type: string
                        description: >-
                          The criteria describing when the evaluator should
                          select this option.
                      included:
                        type: boolean
                        description: >-
                          Whether this option is available for the evaluator to
                          select.
                      color:
                        type: string
                        description: >-
                          The color used to display this option in the RelVoca
                          UI.
                    required:
                      - value
                      - prompt
                      - included
                      - color
              required:
                - type
                - options
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````