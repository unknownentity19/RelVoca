> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get transcript

> Returns one recorded conversation in full, including the turns exchanged and the traces behind them, which is the payload a review tool renders.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/transcript/{transcriptID}
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
  /v1/stable/transcript/{transcriptID}:
    get:
      tags:
        - Transcript
      summary: Get transcript
      description: >-
        Returns one recorded conversation in full, including the turns exchanged
        and the traces behind them, which is the payload a review tool renders.
      operationId: StableTranscriptController_get
      parameters:
        - name: transcriptID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the transcript to operate on.
          description: The ID of the transcript to operate on.
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Returns a single transcript along with its logs, which the search
            operation leaves out, plus its properties, evaluation results, and
            recording URL.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTranscriptWithLogsResponse'
          x-vf-doc:
            description: >-
              Returns a single transcript along with its logs, which the search
              operation leaves out, plus its properties, evaluation results, and
              recording URL.
      security:
        - token: []
components:
  schemas:
    StableTranscriptWithLogsResponse:
      type: object
      properties:
        transcript:
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
            logs:
              type: array
              items:
                type: object
                properties:
                  type:
                    type: string
                    enum:
                      - trace
                      - action
                      - end
                    x-enumNames:
                      - TRACE
                      - ACTION
                      - END
                  data:
                    anyOf:
                      - anyOf:
                          - type: string
                          - type: number
                          - type: boolean
                      - type: array
                        items: {}
                      - type: object
                        additionalProperties: {}
                  createdAt:
                    type: string
                    format: date
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$
                  updatedAt:
                    type: string
                    format: date
                    pattern: >-
                      ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$
                required:
                  - type
                  - data
                  - createdAt
                  - updatedAt
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
            - logs
      required:
        - transcript
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