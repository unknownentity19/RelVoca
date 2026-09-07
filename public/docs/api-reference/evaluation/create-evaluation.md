> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create evaluation

> Adds a evaluation to the project, a criterion a model scores past conversations against. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/evaluation
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
  /v1/stable/evaluation:
    post:
      tags:
        - Evaluation
      summary: Create evaluation
      description: >-
        Adds a evaluation to the project, a criterion a model scores past
        conversations against. The response carries the ID that later calls
        address it by.
      operationId: StableEvaluationController_create
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
              $ref: '#/components/schemas/StableEvaluationCreateRequest'
      responses:
        '201':
          description: >-
            Creates the evaluation and returns it with its assigned `id`. No
            transcript is scored yet: results come from running it against a
            transcript, or automatically on new transcripts when `enabled` is
            true.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableEvaluationResponse'
          x-vf-doc:
            description: >-
              Creates the evaluation and returns it with its assigned `id`. No
              transcript is scored yet: results come from running it against a
              transcript, or automatically on new transcripts when `enabled` is
              true.
      security:
        - token: []
components:
  schemas:
    StableEvaluationCreateRequest:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - boolean
              description: Identifies an evaluation that produces a true/false result.
              x-enumNames:
                - BOOLEAN
            truePrompt:
              type: string
              description: The criteria describing when the evaluator should return `true`.
            falsePrompt:
              type: string
              description: >-
                The criteria describing when the evaluator should return
                `false`.
            name:
              type: string
            prompt:
              type: string
              description: The criteria the evaluator uses to judge a transcript.
            enabled:
              type: boolean
              description: >-
                Whether this evaluation runs automatically against new
                transcripts.
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
          required:
            - type
            - truePrompt
            - falsePrompt
            - name
            - prompt
            - enabled
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - number
              description: Identifies an evaluation that produces a numeric score.
              x-enumNames:
                - NUMBER
            minimumValue:
              type: number
              description: The lowest score the evaluator can assign.
            maximumValue:
              type: number
              description: The highest score the evaluator can assign.
            minimumPrompt:
              type: string
              description: The criteria describing what warrants the `minimumValue` score.
            maximumPrompt:
              type: string
              description: The criteria describing what warrants the `maximumValue` score.
            name:
              type: string
            prompt:
              type: string
              description: The criteria the evaluator uses to judge a transcript.
            enabled:
              type: boolean
              description: >-
                Whether this evaluation runs automatically against new
                transcripts.
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
          required:
            - type
            - minimumValue
            - maximumValue
            - minimumPrompt
            - maximumPrompt
            - name
            - prompt
            - enabled
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - string
              description: Identifies an evaluation that produces a free-form text result.
              x-enumNames:
                - STRING
            name:
              type: string
            prompt:
              type: string
              description: The criteria the evaluator uses to judge a transcript.
            enabled:
              type: boolean
              description: >-
                Whether this evaluation runs automatically against new
                transcripts.
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
          required:
            - type
            - name
            - prompt
            - enabled
          additionalProperties: false
        - type: object
          properties:
            type:
              type: string
              enum:
                - option
              description: >-
                Identifies an evaluation that selects one of a predefined set of
                options.
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
                      The criteria describing when the evaluator should select
                      this option.
                  included:
                    type: boolean
                    description: >-
                      Whether this option is available for the evaluator to
                      select.
                  color:
                    type: string
                    description: The color used to display this option in the RelVoca UI.
                required:
                  - value
                  - prompt
                  - included
                  - color
            name:
              type: string
            prompt:
              type: string
              description: The criteria the evaluator uses to judge a transcript.
            enabled:
              type: boolean
              description: >-
                Whether this evaluation runs automatically against new
                transcripts.
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
          required:
            - type
            - options
            - name
            - prompt
            - enabled
          additionalProperties: false
    StableEvaluationResponse:
      type: object
      properties:
        evaluation:
          $ref: '#/components/schemas/StableEvaluation'
      required:
        - evaluation
    StableEvaluation:
      allOf:
        - type: object
          properties:
            id:
              type: string
            name:
              type: string
            prompt:
              type: string
              description: The criteria the evaluator uses to judge a transcript.
            default:
              type: boolean
              description: Whether this is a built-in default evaluation.
            enabled:
              type: boolean
              description: >-
                Whether this evaluation runs automatically against new
                transcripts.
            projectID:
              type: string
              description: The ID of the project this evaluation belongs to.
            settings:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AgentSettings'
            averageCost:
              nullable: true
              description: The average LLM cost incurred each time this evaluation runs.
              type: number
            description:
              nullable: true
              description: A human-readable description of what this evaluation measures.
              type: string
          required:
            - id
            - name
            - prompt
            - default
            - enabled
            - projectID
            - settings
            - averageCost
            - description
        - oneOf:
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - boolean
                  description: Identifies an evaluation that produces a true/false result.
                  x-enumNames:
                    - BOOLEAN
                truePrompt:
                  type: string
                  description: >-
                    The criteria describing when the evaluator should return
                    `true`.
                falsePrompt:
                  type: string
                  description: >-
                    The criteria describing when the evaluator should return
                    `false`.
              required:
                - type
                - truePrompt
                - falsePrompt
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - number
                  description: Identifies an evaluation that produces a numeric score.
                  x-enumNames:
                    - NUMBER
                minimumValue:
                  type: number
                  description: The lowest score the evaluator can assign.
                maximumValue:
                  type: number
                  description: The highest score the evaluator can assign.
                minimumPrompt:
                  type: string
                  description: >-
                    The criteria describing what warrants the `minimumValue`
                    score.
                maximumPrompt:
                  type: string
                  description: >-
                    The criteria describing what warrants the `maximumValue`
                    score.
              required:
                - type
                - minimumValue
                - maximumValue
                - minimumPrompt
                - maximumPrompt
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - string
                  description: >-
                    Identifies an evaluation that produces a free-form text
                    result.
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
                    Identifies an evaluation that selects one of a predefined
                    set of options.
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
    AgentSettings:
      type: object
      properties:
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        realtime:
          type: object
          properties:
            voice:
              type: string
            eagerness:
              type: string
        maxTokens:
          type: number
        temperature:
          type: number
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
    AIModel:
      type: string
      enum:
        - gpt-3.5-turbo-1106
        - gpt-3.5-turbo
        - gpt-4
        - gpt-4o
        - gpt-4o-mini
        - gpt-4.1-2025-04-14
        - gpt-4.1-mini-2025-04-14
        - gpt-4.1-nano-2025-04-14
        - gpt-o3-mini
        - o3-2025-04-16
        - o4-mini-2025-04-16
        - gpt-5
        - gpt-5-mini
        - gpt-5-nano
        - gpt-5.2
        - gpt-5.4
        - gpt-5.4-mini
        - gpt-5.5
        - gpt-5.6-sol
        - gpt-5.6-terra
        - gpt-5.6-luna
        - gpt-realtime
        - claude-4-opus
        - claude-4-sonnet
        - claude-4.5-sonnet
        - claude-4.6-sonnet
        - claude-4.5-haiku
        - claude-4.5-opus
        - claude-4.7-opus
        - bedrock-claude-4-sonnet
        - bedrock-claude-4.5-sonnet
        - bedrock-claude-4.6-sonnet
        - bedrock-claude-5-sonnet
        - bedrock-claude-4.5-haiku
        - bedrock-claude-4.5-opus
        - bedrock-claude-4.7-opus
        - bedrock-claude-4.8-opus
        - voiceflow-core-4.0
        - voiceflow-core-4.1
        - voiceflow-flash-4.1
        - gemini-2.5-pro
        - gemini-2.5-flash
        - gemini-live-2.5-flash
        - gemini-3-flash
        - gemini-3.5-flash
        - gemini-3.1-pro
        - gpt-oss-20b
        - gpt-oss-120b
        - llama-guard-4
        - llama-3.1-instant
        - llama-3.3-versatile
        - qwen3.6-27b
        - gemini-flash-2
        - gpt-4-turbo
        - claude-3.5-haiku
        - claude-3-opus
        - claude-3.7-sonnet
        - claude-v2
        - llama-3.2-1b-preview
        - gemini-pro-1.5
        - claude-3-haiku
        - claude-3-sonnet
        - text-davinci-003
        - claude-v1
        - claude-instant-v1
        - deep-seek-r1-distill-llama-70B
        - claude-3.5-sonnet
      x-enumNames:
        - GPT_3_5_TURBO_1106
        - GPT_3_5_TURBO
        - GPT_4
        - GPT_4_O
        - GPT_4_O_MINI
        - GPT_4_1
        - GPT_4_1_MINI
        - GPT_4_1_NANO
        - GPT_O_3_MINI
        - GPT_O_3
        - GPT_O_4_MINI
        - GPT_5
        - GPT_5_MINI
        - GPT_5_NANO
        - GPT_5_2
        - GPT_5_4
        - GPT_5_4_MINI
        - GPT_5_5
        - GPT_5_6_SOL
        - GPT_5_6_TERRA
        - GPT_5_6_LUNA
        - GPT_REALTIME
        - CLAUDE_4_OPUS
        - CLAUDE_4_SONNET
        - CLAUDE_4_5_SONNET
        - CLAUDE_4_6_SONNET
        - CLAUDE_4_5_HAIKU
        - CLAUDE_4_5_OPUS
        - CLAUDE_4_7_OPUS
        - BEDROCK_CLAUDE_4_SONNET
        - BEDROCK_CLAUDE_4_5_SONNET
        - BEDROCK_CLAUDE_4_6_SONNET
        - BEDROCK_CLAUDE_5_SONNET
        - BEDROCK_CLAUDE_4_5_HAIKU
        - BEDROCK_CLAUDE_4_5_OPUS
        - BEDROCK_CLAUDE_4_7_OPUS
        - BEDROCK_CLAUDE_4_8_OPUS
        - VOICEFLOW_CORE_4_0
        - VOICEFLOW_CORE_4_1
        - VOICEFLOW_FLASH_4_1
        - GEMINI_2_5_PRO
        - GEMINI_2_5_FLASH
        - GEMINI_LIVE_2_5_FLASH
        - GEMINI_3_FLASH
        - GEMINI_3_5_FLASH
        - GEMINI_3_1_PRO
        - GPT_OSS_20_B
        - GPT_OSS_120_B
        - LLAMA_GUARD_4
        - LLAMA_3_1_INSTANT
        - LLAMA_3_3_VERSATILE
        - QWEN_3_6_27_B
        - GEMINI_FLASH_2
        - GPT_4_TURBO
        - CLAUDE_3_5_HAIKU
        - CLAUDE_3_OPUS
        - CLAUDE_3_7_SONNET
        - CLAUDE_V_2
        - LLAMA_3_2_1_B_PREVIEW
        - GEMINI_PRO_1_5
        - CLAUDE_3_HAIKU
        - CLAUDE_3_SONNET
        - DA_VINCI_003
        - CLAUDE_V_1
        - CLAUDE_INSTANT_V_1
        - DEEP_SEEK_R_1_DISTILL_LLAMA_70_B
        - CLAUDE_3_5_SONNET
    AIReasoningEffort:
      type: string
      enum:
        - minimal
        - low
        - medium
        - high
      x-enumNames:
        - MINIMAL
        - LOW
        - MEDIUM
        - HIGH
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````