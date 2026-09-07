> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Export environment

> Serialises the whole environment - its agent, playbooks, tools and knowledge base - into a single document you can archive or move to another project.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/environment/{environmentAlias}/export
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
  /v1/stable/environment/{environmentAlias}/export:
    get:
      tags:
        - Environment
      summary: Export environment
      description: >-
        Serialises the whole environment - its agent, playbooks, tools and
        knowledge base - into a single document you can archive or move to
        another project.
      operationId: StableEnvironmentController_export
      parameters:
        - name: environmentAlias
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The alias of the environment to operate on (e.g. `main`).
          description: The alias of the environment to operate on (e.g. `main`).
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      responses:
        '200':
          description: >-
            Returns the whole environment as one JSON document: its project and
            version records, every workflow, agent, tool, function, variable and
            knowledge base document version, and its secrets. Most sections
            appear only when the environment has something of that kind.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableEnvironmentExportResponse'
          x-vf-doc:
            description: >-
              Returns the whole environment as one JSON document: its project
              and version records, every workflow, agent, tool, function,
              variable and knowledge base document version, and its secrets.
              Most sections appear only when the environment has something of
              that kind.
      security:
        - token: []
components:
  schemas:
    StableEnvironmentExportResponse:
      allOf:
        - $ref: '#/components/schemas/AssistantExportData'
    AssistantExportData:
      type: object
      properties:
        secrets:
          type: array
          items:
            $ref: '#/components/schemas/Secret'
        project:
          $ref: '#/components/schemas/Project'
        _version:
          type: string
        programs:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/Program'
        assistant:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Assistant'
        variableStates:
          type: array
          items:
            $ref: '#/components/schemas/VariableState'
        transcriptEvaluations:
          type: array
          items:
            anyOf:
              - type: object
                properties:
                  name:
                    type: string
                    minLength: 1
                    maxLength: 100
                    description: Name of the evaluation.
                  description:
                    description: Description of the evaluation.
                    nullable: true
                    type: string
                    maxLength: 250
                  enabled:
                    type: boolean
                    description: >-
                      When enabled, evaluations will be run on every new
                      transcript.
                  prompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes how the LLM should apply this
                      evaluation.
                  settings:
                    description: The model settings passed when invoking this evaluation.
                    nullable: true
                    type: object
                    properties:
                      model:
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
                          - GPT_4_1_2025_04_14
                          - GPT_4_1_MINI_2025_04_14
                          - GPT_4_1_NANO_2025_04_14
                          - GPT_O_3_MINI
                          - O_3_2025_04_16
                          - O_4_MINI_2025_04_16
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
                          - TEXT_DAVINCI_003
                          - CLAUDE_V_1
                          - CLAUDE_INSTANT_V_1
                          - DEEP_SEEK_R_1_DISTILL_LLAMA_70_B
                          - CLAUDE_3_5_SONNET
                      realtime:
                        type: object
                        properties:
                          voice:
                            type: string
                          eagerness:
                            type: string
                        additionalProperties: false
                      maxTokens:
                        type: number
                      temperature:
                        type: number
                      reasoningEffort:
                        nullable: true
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
                    additionalProperties: false
                  type:
                    type: string
                    enum:
                      - boolean
                    description: The type of binary evaluations.
                    x-enumNames:
                      - BOOLEAN
                  truePrompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes which transcripts should evaluate as
                      'true'.
                  falsePrompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes which transcripts should evaluate as
                      'false'.
                  systemTag:
                    nullable: true
                    type: string
                    maxLength: 255
                  id:
                    type: string
                  default:
                    type: boolean
                required:
                  - name
                  - enabled
                  - prompt
                  - type
                  - truePrompt
                  - falsePrompt
                  - default
                additionalProperties: false
              - type: object
                properties:
                  name:
                    type: string
                    minLength: 1
                    maxLength: 100
                    description: Name of the evaluation.
                  description:
                    description: Description of the evaluation.
                    nullable: true
                    type: string
                    maxLength: 250
                  enabled:
                    type: boolean
                    description: >-
                      When enabled, evaluations will be run on every new
                      transcript.
                  prompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes how the LLM should apply this
                      evaluation.
                  settings:
                    description: The model settings passed when invoking this evaluation.
                    nullable: true
                    type: object
                    properties:
                      model:
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
                          - GPT_4_1_2025_04_14
                          - GPT_4_1_MINI_2025_04_14
                          - GPT_4_1_NANO_2025_04_14
                          - GPT_O_3_MINI
                          - O_3_2025_04_16
                          - O_4_MINI_2025_04_16
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
                          - TEXT_DAVINCI_003
                          - CLAUDE_V_1
                          - CLAUDE_INSTANT_V_1
                          - DEEP_SEEK_R_1_DISTILL_LLAMA_70_B
                          - CLAUDE_3_5_SONNET
                      realtime:
                        type: object
                        properties:
                          voice:
                            type: string
                          eagerness:
                            type: string
                        additionalProperties: false
                      maxTokens:
                        type: number
                      temperature:
                        type: number
                      reasoningEffort:
                        nullable: true
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
                    additionalProperties: false
                  type:
                    type: string
                    enum:
                      - number
                    description: The type of rating evaluations.
                    x-enumNames:
                      - NUMBER
                  minimumValue:
                    type: number
                    minimum: -9007199254740991
                    maximum: 9007199254740991
                    description: The lowest rating that can be applied.
                  minimumPrompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes which transcripts should receive
                      lower ratings.
                  maximumValue:
                    type: number
                    minimum: -9007199254740991
                    maximum: 9007199254740991
                    description: The highest rating that can be applied.
                  maximumPrompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes which transcripts should receive
                      higher ratings.
                  systemTag:
                    nullable: true
                    type: string
                    maxLength: 255
                  id:
                    type: string
                  default:
                    type: boolean
                required:
                  - name
                  - enabled
                  - prompt
                  - type
                  - minimumValue
                  - minimumPrompt
                  - maximumValue
                  - maximumPrompt
                  - default
                additionalProperties: false
              - type: object
                properties:
                  name:
                    type: string
                    minLength: 1
                    maxLength: 100
                    description: Name of the evaluation.
                  description:
                    description: Description of the evaluation.
                    nullable: true
                    type: string
                    maxLength: 250
                  enabled:
                    type: boolean
                    description: >-
                      When enabled, evaluations will be run on every new
                      transcript.
                  prompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes how the LLM should apply this
                      evaluation.
                  settings:
                    description: The model settings passed when invoking this evaluation.
                    nullable: true
                    type: object
                    properties:
                      model:
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
                          - GPT_4_1_2025_04_14
                          - GPT_4_1_MINI_2025_04_14
                          - GPT_4_1_NANO_2025_04_14
                          - GPT_O_3_MINI
                          - O_3_2025_04_16
                          - O_4_MINI_2025_04_16
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
                          - TEXT_DAVINCI_003
                          - CLAUDE_V_1
                          - CLAUDE_INSTANT_V_1
                          - DEEP_SEEK_R_1_DISTILL_LLAMA_70_B
                          - CLAUDE_3_5_SONNET
                      realtime:
                        type: object
                        properties:
                          voice:
                            type: string
                          eagerness:
                            type: string
                        additionalProperties: false
                      maxTokens:
                        type: number
                      temperature:
                        type: number
                      reasoningEffort:
                        nullable: true
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
                    additionalProperties: false
                  type:
                    type: string
                    enum:
                      - string
                    description: The type of text evaluations.
                    x-enumNames:
                      - STRING
                  systemTag:
                    nullable: true
                    type: string
                    maxLength: 255
                  id:
                    type: string
                  default:
                    type: boolean
                required:
                  - name
                  - enabled
                  - prompt
                  - type
                  - default
                additionalProperties: false
              - type: object
                properties:
                  name:
                    type: string
                    minLength: 1
                    maxLength: 100
                    description: Name of the evaluation.
                  description:
                    description: Description of the evaluation.
                    nullable: true
                    type: string
                    maxLength: 250
                  enabled:
                    type: boolean
                    description: >-
                      When enabled, evaluations will be run on every new
                      transcript.
                  prompt:
                    type: string
                    minLength: 1
                    maxLength: 10000
                    description: >-
                      This prompt describes how the LLM should apply this
                      evaluation.
                  settings:
                    description: The model settings passed when invoking this evaluation.
                    nullable: true
                    type: object
                    properties:
                      model:
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
                          - GPT_4_1_2025_04_14
                          - GPT_4_1_MINI_2025_04_14
                          - GPT_4_1_NANO_2025_04_14
                          - GPT_O_3_MINI
                          - O_3_2025_04_16
                          - O_4_MINI_2025_04_16
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
                          - TEXT_DAVINCI_003
                          - CLAUDE_V_1
                          - CLAUDE_INSTANT_V_1
                          - DEEP_SEEK_R_1_DISTILL_LLAMA_70_B
                          - CLAUDE_3_5_SONNET
                      realtime:
                        type: object
                        properties:
                          voice:
                            type: string
                          eagerness:
                            type: string
                        additionalProperties: false
                      maxTokens:
                        type: number
                      temperature:
                        type: number
                      reasoningEffort:
                        nullable: true
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
                    additionalProperties: false
                  type:
                    type: string
                    enum:
                      - option
                    description: The type of options evaluations.
                    x-enumNames:
                      - OPTION
                  options:
                    minItems: 1
                    maxItems: 20
                    type: array
                    items:
                      type: object
                      properties:
                        value:
                          type: string
                          minLength: 1
                          maxLength: 100
                        prompt:
                          type: string
                          minLength: 1
                          maxLength: 10000
                        included:
                          type: boolean
                        color:
                          type: string
                      required:
                        - value
                        - prompt
                        - included
                        - color
                      additionalProperties: false
                    description: The options that should be evaluated for.
                  systemTag:
                    nullable: true
                    type: string
                    maxLength: 255
                  id:
                    type: string
                  default:
                    type: boolean
                required:
                  - name
                  - enabled
                  - prompt
                  - type
                  - options
                  - default
                additionalProperties: false
        version:
          $ref: '#/components/schemas/Version'
        diagrams:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/Diagram'
        intents:
          type: array
          items:
            $ref: '#/components/schemas/Intent'
        utterances:
          type: array
          items:
            $ref: '#/components/schemas/Utterance'
        requiredEntities:
          type: array
          items:
            $ref: '#/components/schemas/RequiredEntity'
        responses:
          type: array
          items:
            $ref: '#/components/schemas/Response'
        responseMessages:
          type: array
          items:
            $ref: '#/components/schemas/ResponseMessage'
        responseDiscriminators:
          type: array
          items:
            $ref: '#/components/schemas/ResponseDiscriminator'
        functions:
          type: array
          items:
            $ref: '#/components/schemas/Function'
        functionPaths:
          type: array
          items:
            $ref: '#/components/schemas/FunctionPath'
        functionVariables:
          type: array
          items:
            $ref: '#/components/schemas/FunctionVariable'
        flows:
          type: array
          items:
            $ref: '#/components/schemas/Flow'
        agents:
          type: array
          items:
            $ref: '#/components/schemas/Agent'
        agentAPITools:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/AgentAPITool'
        agentFlowTools:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/AgentFlowTool'
        agentPathTools:
          type: array
          items:
            $ref: '#/components/schemas/AgentPathTool'
        agentFunctionTools:
          type: array
          items:
            $ref: '#/components/schemas/AgentFunctionTool'
        agentIntegrationTools:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/AgentIntegrationTool'
        agentFlowToolVariables:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/AgentFlowToolVariable'
        agentPathToolVariables:
          type: array
          items:
            $ref: '#/components/schemas/AgentPathToolVariable'
        agentMcpIntegrationTools:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/AgentMcpIntegrationTool'
        events:
          type: array
          items:
            $ref: '#/components/schemas/Event'
        entities:
          type: array
          items:
            $ref: '#/components/schemas/Entity'
        entityVariants:
          type: array
          items:
            $ref: '#/components/schemas/EntityVariant'
        folders:
          type: array
          items:
            $ref: '#/components/schemas/Folder'
        prompts:
          type: array
          items:
            $ref: '#/components/schemas/Prompt'
        promptMessages:
          type: array
          items:
            $ref: '#/components/schemas/PromptMessage'
        apiTools:
          type: array
          items:
            $ref: '#/components/schemas/APITool'
        apiToolInputVariables:
          type: array
          items:
            $ref: '#/components/schemas/APIToolInputVariable'
        simulations:
          type: array
          items:
            $ref: '#/components/schemas/Simulation'
        simulationTurns:
          type: array
          items:
            $ref: '#/components/schemas/SimulationTurn'
        simulationTurnTests:
          type: array
          items:
            $ref: '#/components/schemas/SimulationTurnTest'
        variables:
          type: array
          items:
            $ref: '#/components/schemas/Variable'
        workflows:
          type: array
          items:
            $ref: '#/components/schemas/Workflow'
        attachments:
          type: array
          items:
            $ref: '#/components/schemas/AnyAttachment'
        cardButtons:
          type: array
          items:
            $ref: '#/components/schemas/CardButton'
        integrationTools:
          type: array
          items:
            $ref: '#/components/schemas/IntegrationTool'
        mcpIntegrationTools:
          type: array
          items:
            $ref: '#/components/schemas/McpIntegrationTool'
        mcpServers:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
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
              updatedByID:
                type: number
              assistantID:
                type: string
              environmentID:
                type: string
              name:
                type: string
                minLength: 1
                maxLength: 64
              folderID:
                nullable: true
                type: string
              createdByID:
                type: number
              image:
                default: null
                nullable: true
                type: string
              description:
                default: null
                nullable: true
                type: string
              specification:
                default: '2025-03-26'
                allOf:
                  - $ref: '#/components/schemas/McpServerSpecification'
              url:
                default: null
                nullable: true
                allOf:
                  - $ref: '#/components/schemas/Markup'
              headers:
                default: null
                nullable: true
                type: array
                items:
                  $ref: '#/components/schemas/McpServerHeaderEntry'
              authType:
                default: custom
                allOf:
                  - $ref: '#/components/schemas/McpServerAuthType'
              oauthMetadata:
                default: null
                nullable: true
                allOf:
                  - $ref: '#/components/schemas/McpServerOAuthMetadata'
            required:
              - id
              - createdAt
              - updatedAt
              - updatedByID
              - assistantID
              - name
              - folderID
              - createdByID
        mcpServerTools:
          type: array
          items:
            $ref: '#/components/schemas/McpServerTool'
        personas:
          type: array
          items:
            $ref: '#/components/schemas/Persona'
        kbDocumentVersions:
          type: array
          items:
            $ref: '#/components/schemas/KBDocumentVersionBackup'
        kbSettings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KBSettingsBackup'
        kbDocumentMetadataM2M:
          type: array
          items:
            $ref: '#/components/schemas/KBDocumentMetadataM2MBackup'
      required:
        - project
        - version
        - diagrams
    Secret:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        visibility:
          $ref: '#/components/schemas/SecretVisibility'
        hasValue:
          type: boolean
        assistantID:
          type: string
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
        updatedByID:
          nullable: true
          type: number
      required:
        - id
        - name
        - visibility
        - assistantID
        - createdAt
        - updatedAt
        - updatedByID
    Project:
      type: object
      properties:
        _id:
          type: string
        nlu:
          type: string
        type:
          type: string
        name:
          type: string
        image:
          type: string
        teamID:
          type: string
        members:
          type: array
          items:
            $ref: '#/components/schemas/ProjectMember'
        privacy:
          allOf:
            - $ref: '#/components/schemas/ProjectPrivacy'
        platform:
          type: string
        _version:
          type: number
        linkType:
          type: string
        stickers:
          type: array
          items:
            $ref: '#/components/schemas/ProjectSticker'
        creatorID:
          type: number
        updatedBy:
          type: number
        createdAt:
          nullable: true
          type: string
        updatedAt:
          type: string
        apiPrivacy:
          allOf:
            - $ref: '#/components/schemas/ProjectPrivacy'
        reportTags:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ProjectReportTag'
        nluSettings:
          allOf:
            - $ref: '#/components/schemas/ProjectNLUSettings'
        environments:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ProjectEnvironment'
        platformData:
          type: object
          additionalProperties: {}
        customThemes:
          type: array
          items:
            $ref: '#/components/schemas/ProjectCustomTheme'
        aiAssistSettings:
          allOf:
            - $ref: '#/components/schemas/ProjectAIAssistSettings'
        transcriptSettings:
          allOf:
            - $ref: '#/components/schemas/ProjectTranscriptSettings'
        devVersion:
          description: '@deprecated use environments instead with environments projects'
          type: string
        liveVersion:
          description: '@deprecated use environments instead with environments projects'
          type: string
        stagingVersion:
          description: '@deprecated use environments instead with environments projects'
          type: string
        previewVersion:
          description: '@deprecated won''t be used anymore with environments projects'
          type: string
        knowledgeBase:
          description: '@deprecated not used anymore'
          allOf:
            - $ref: '#/components/schemas/VersionKnowledgeBase'
      required:
        - _id
        - name
        - teamID
        - members
        - platform
        - creatorID
        - platformData
    Program:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        lines:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ProgramLine'
        startId:
          type: string
        legacyID:
          type: string
        commands:
          type: array
          items:
            $ref: '#/components/schemas/AnyProgramCommand'
        diagramID:
          type: string
        versionID:
          type: string
        variables:
          type: array
          items:
            type: string
        updatedAt: {}
      required:
        - _id
        - lines
        - startId
        - commands
        - diagramID
        - versionID
        - variables
    Assistant:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          minLength: 1
          maxLength: 255
        version:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 9007199254740991
        folderID:
          default: null
          nullable: true
          type: number
        isDeleted:
          nullable: true
          type: boolean
        description:
          default: null
          nullable: true
          type: string
        workspaceID:
          type: string
        activeEnvironmentID:
          type: string
          description: >-
            @deprecated use project.environments instead with environments
            projects
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - version
        - workspaceID
        - activeEnvironmentID
    VariableState:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        projectID:
          type: string
        variables:
          type: object
          additionalProperties: {}
        startFrom:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/VariableStateStartFrom'
      required:
        - _id
        - name
        - projectID
        - variables
    Version:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        model:
          allOf:
            - $ref: '#/components/schemas/VersionModel'
        legacyID:
          type: string
        updatedAt:
          type: string
        updatedBy:
          type: number
        settings:
          allOf:
            - $ref: '#/components/schemas/VersionSettings'
        _version:
          type: number
        creatorID:
          type: number
        projectID:
          type: string
        manualSave:
          type: boolean
        publishedAt:
          nullable: true
          type: string
        platformData:
          $ref: '#/components/schemas/VersionPlatformData'
        customBlocks:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/VersionCustomBlock'
        rootDiagramID:
          type: string
        canvasTemplates:
          type: array
          items:
            $ref: '#/components/schemas/VersionCanvasTemplate'
        programResources:
          allOf:
            - $ref: '#/components/schemas/VersionProgramResources'
        templateDiagramID:
          type: string
        defaultStepColors:
          type: object
          additionalProperties:
            type: string
        autoSaveFromRestore:
          type: boolean
        notes:
          description: '@deprecated not used'
          type: object
          additionalProperties:
            $ref: '#/components/schemas/VersionNote'
        topics:
          description: '@deprecated in favor of domains'
          type: array
          items:
            $ref: '#/components/schemas/VersionFolderItem'
        folders:
          description: '@deprecated not used'
          type: object
          additionalProperties:
            $ref: '#/components/schemas/VersionFolder'
        domains:
          description: '@deprecated not used'
          type: array
          items:
            $ref: '#/components/schemas/VersionDomain'
        components:
          description: '@deprecated not used'
          type: array
          items:
            $ref: '#/components/schemas/VersionFolderItem'
        variables:
          type: array
          items:
            type: string
          description: '@deprecated not used'
        knowledgeBase:
          description: '@deprecated not used'
          allOf:
            - $ref: '#/components/schemas/VersionKnowledgeBase'
        secondaryVersionID:
          description: '@deprecated in favor of legacyID'
          type: number
      required:
        - _id
        - name
        - _version
        - creatorID
        - projectID
        - platformData
        - rootDiagramID
        - variables
    Diagram:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        type:
          allOf:
            - $ref: '#/components/schemas/DiagramType'
        zoom:
          type: number
        nodes:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/DiagramNode'
        offsetX:
          type: number
        offsetY:
          type: number
        modified:
          type: number
        diagramID:
          type: string
        versionID:
          type: string
        creatorID:
          type: number
        variables:
          type: array
          items:
            type: string
        children:
          type: array
          items:
            type: string
        menuItems:
          description: '@deprecated not used anymore'
          type: array
          items:
            $ref: '#/components/schemas/DiagramMenuItem'
        menuNodeIDs:
          description: '@deprecated in favor of menuItems'
          type: array
          items:
            type: string
        intentStepIDs:
          description: '@deprecated in favor of menuNodeIDs'
          type: array
          items:
            type: string
      required:
        - _id
        - name
        - zoom
        - nodes
        - offsetX
        - offsetY
        - modified
        - diagramID
        - versionID
        - creatorID
        - variables
    Intent:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        description:
          nullable: true
          type: string
        entityOrder:
          type: array
          items:
            type: string
        automaticReprompt:
          type: boolean
        automaticRepromptSettings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AutomaticReprompt'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - description
        - entityOrder
        - automaticReprompt
        - automaticRepromptSettings
    Utterance:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        text:
          $ref: '#/components/schemas/UtteranceText'
        language:
          $ref: '#/components/schemas/Language'
        intentID:
          type: string
      required:
        - id
        - createdAt
        - text
        - language
        - intentID
    RequiredEntity:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        intentID:
          type: string
        entityID:
          type: string
        repromptID:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - intentID
        - entityID
        - repromptID
    Response:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        name:
          type: string
          maxLength: 255
        type:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ResponseType'
        draft:
          default: null
          nullable: true
          type: boolean
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - folderID
        - createdByID
        - name
    ResponseMessage:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        text:
          $ref: '#/components/schemas/Markup'
        delay:
          nullable: true
          type: number
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AnyCondition'
        discriminatorID:
          type: string
      required:
        - id
        - createdAt
        - text
        - delay
        - condition
        - discriminatorID
    ResponseDiscriminator:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        channel:
          $ref: '#/components/schemas/Channel'
        language:
          $ref: '#/components/schemas/Language'
        responseID:
          type: string
        variantOrder:
          type: array
          items:
            type: string
      required:
        - id
        - createdAt
        - channel
        - language
        - responseID
        - variantOrder
    Function:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        code:
          type: string
        image:
          nullable: true
          type: string
        pathOrder:
          type: array
          items:
            type: string
        description:
          nullable: true
          type: string
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/FunctionSettings'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - code
        - image
        - pathOrder
        - description
    FunctionPath:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        label:
          nullable: true
          type: string
        functionID:
          type: string
      required:
        - id
        - createdAt
        - name
        - label
        - functionID
    FunctionVariable:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        type:
          $ref: '#/components/schemas/FunctionVariableKind'
        functionID:
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - name
        - type
        - functionID
        - description
    Flow:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        name:
          type: string
          minLength: 1
          maxLength: 255
        diagramID:
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - folderID
        - createdByID
        - name
        - diagramID
        - description
    Agent:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        endTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentEndTool'
        settings:
          $ref: '#/components/schemas/AgentSettings'
        cardTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        isOperator:
          default: false
          type: boolean
        buttonTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentButtonTool'
        description:
          nullable: true
          type: string
        instructions:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        skipTurnTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentSkipTurnTool'
        carouselTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        pathToolOrder:
          type: array
          items:
            type: string
        webSearchTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentWebSearchTool'
        callForwardTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCallForwardTool'
        knowledgeBaseTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentKnowledgeBaseTool'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - settings
        - description
        - instructions
        - pathToolOrder
        - webSearchTool
        - knowledgeBaseTool
    AgentAPITool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        apiToolID:
          type: string
        description:
          nullable: true
          type: string
        inputVariables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataAPIInputVariable'
        captureResponse:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataAPICaptureResponse'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        agentID:
          type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        asyncExecution:
          default: false
          type: boolean
        captureInputVariables:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/AgentToolCaptureInputVariable'
      required:
        - id
        - createdAt
        - apiToolID
        - description
        - inputVariables
        - agentID
    AgentFlowTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        flowID:
          type: string
        agentID:
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - flowID
        - agentID
        - description
    AgentPathTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        agentID:
          type: string
        description:
          nullable: true
          type: string
        variableOrder:
          type: array
          items:
            type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
      required:
        - id
        - createdAt
        - name
        - agentID
        - description
        - variableOrder
    AgentFunctionTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        functionID:
          type: string
        description:
          nullable: true
          type: string
        inputVariables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataFunctionInputVariable'
        captureResponse:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataFunctionCaptureResponse'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        agentID:
          type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        asyncExecution:
          default: false
          type: boolean
        captureInputVariables:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/AgentToolCaptureInputVariable'
      required:
        - id
        - createdAt
        - functionID
        - description
        - inputVariables
        - agentID
    AgentIntegrationTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        description:
          nullable: true
          type: string
        inputVariables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataIntegrationInputVariable'
        captureResponse:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataIntegrationCaptureResponse'
        integrationToolID:
          type: string
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        agentID:
          type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        captureInputVariables:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/AgentToolCaptureInputVariable'
        extendedInputVariables:
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolExtendedInputVariable'
        extendedInputSchema:
          nullable: true
          type: object
          additionalProperties: {}
      required:
        - id
        - createdAt
        - description
        - inputVariables
        - integrationToolID
        - agentID
    AgentFlowToolVariable:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        kind:
          $ref: '#/components/schemas/AgentToolVariableKind'
        entityID:
          nullable: true
          type: string
        variableID:
          nullable: true
          type: string
        description:
          nullable: true
          type: string
        agentFlowToolID:
          type: string
      required:
        - id
        - createdAt
        - kind
        - entityID
        - variableID
        - description
        - agentFlowToolID
    AgentPathToolVariable:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        kind:
          $ref: '#/components/schemas/AgentToolVariableKind'
        entityID:
          nullable: true
          type: string
        variableID:
          nullable: true
          type: string
        description:
          nullable: true
          type: string
        agentPathToolID:
          type: string
      required:
        - id
        - createdAt
        - kind
        - entityID
        - variableID
        - description
        - agentPathToolID
    AgentMcpIntegrationTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        description:
          nullable: true
          type: string
        inputVariables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataMcpIntegrationInputVariable'
        captureResponse:
          default: null
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolNodeDataMcpIntegrationCaptureResponse'
        mcpIntegrationToolID:
          type: string
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        agentID:
          type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        captureInputVariables:
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/AgentToolCaptureInputVariable'
      required:
        - id
        - createdAt
        - description
        - inputVariables
        - mcpIntegrationToolID
        - agentID
        - captureInputVariables
    Event:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        name:
          type: string
          minLength: 1
          maxLength: 255
        flowID:
          default: null
          nullable: true
          type: string
        goesTo:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/EventGoesToType'
        isSystem:
          type: boolean
        requestName:
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - folderID
        - createdByID
        - name
        - isSystem
        - requestName
        - description
    Entity:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        color:
          type: string
        isArray:
          type: boolean
        classifier:
          nullable: true
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - color
        - isArray
        - classifier
        - description
    EntityVariant:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        value:
          type: string
        language:
          $ref: '#/components/schemas/Language'
        synonyms:
          type: array
          items:
            type: string
        entityID:
          type: string
      required:
        - id
        - createdAt
        - value
        - language
        - synonyms
        - entityID
    Folder:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          minLength: 1
          maxLength: 255
        scope:
          $ref: '#/components/schemas/FolderScope'
        parentID:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - name
        - scope
        - parentID
    Prompt:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        draft:
          default: null
          nullable: true
          type: boolean
        settings:
          $ref: '#/components/schemas/PromptSettings'
        description:
          nullable: true
          type: string
        messageOrder:
          type: array
          items:
            type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - settings
        - description
        - messageOrder
    PromptMessage:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        type:
          $ref: '#/components/schemas/PromptMessageType'
        data:
          $ref: '#/components/schemas/PromptMessageData'
        pairID:
          nullable: true
          type: string
        promptID:
          type: string
      required:
        - id
        - createdAt
        - type
        - data
        - pairID
        - promptID
    APITool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        url:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        body:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolBody'
        image:
          nullable: true
          type: string
        headers:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
        httpMethod:
          $ref: '#/components/schemas/APIToolHTTPMethodType'
        description:
          nullable: true
          type: string
        queryParameters:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolSettings'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - url
        - body
        - image
        - headers
        - httpMethod
        - description
        - queryParameters
    APIToolInputVariable:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        apiToolID:
          type: string
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - name
        - apiToolID
        - description
    Simulation:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        settings:
          $ref: '#/components/schemas/SimulationSettings'
        turnOrder:
          type: array
          items:
            type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - settings
        - turnOrder
    SimulationTurn:
      oneOf:
        - $ref: '#/components/schemas/UserSimulationTurn'
        - $ref: '#/components/schemas/AgentSimulationTurn'
        - $ref: '#/components/schemas/SimulationSimulationTurn'
    SimulationTurnTest:
      oneOf:
        - $ref: '#/components/schemas/ToolSimulationTurnTest'
        - $ref: '#/components/schemas/RoutingSimulationTurnTest'
        - $ref: '#/components/schemas/ResponseSimulationTurnTest'
    Variable:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        color:
          type: string
        isArray:
          type: boolean
        isSystem:
          type: boolean
        datatype:
          $ref: '#/components/schemas/VariableDatatype'
        description:
          nullable: true
          type: string
        defaultValue:
          nullable: true
          type: string
        resetAfter:
          default: never
          type: string
          enum:
            - never
            - session
          x-enumNames:
            - NEVER
            - EACH_SESSION
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - color
        - isArray
        - isSystem
        - datatype
        - description
        - defaultValue
    Workflow:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        status:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/WorkflowStatus'
        name:
          type: string
          minLength: 1
          maxLength: 255
        isStart:
          type: boolean
        diagramID:
          type: string
        assigneeID:
          nullable: true
          type: number
        description:
          nullable: true
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - folderID
        - createdByID
        - status
        - name
        - isStart
        - diagramID
        - assigneeID
        - description
    AnyAttachment:
      anyOf:
        - $ref: '#/components/schemas/CardAttachment'
        - $ref: '#/components/schemas/MediaAttachment'
    CardButton:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        label:
          $ref: '#/components/schemas/Markup'
        cardID:
          type: string
      required:
        - id
        - createdAt
        - label
        - cardID
    IntegrationTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        toolName:
          $ref: '#/components/schemas/IntegrationToolName'
        description:
          nullable: true
          type: string
        toolProvider:
          $ref: '#/components/schemas/IntegrationToolProvider'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - toolName
        - description
        - toolProvider
    McpIntegrationTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          maxLength: 255
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        description:
          nullable: true
          type: string
        mcpServerToolID:
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - description
        - mcpServerToolID
    McpServerSpecification:
      type: string
      enum:
        - '2025-03-26'
        - '2025-06-18'
      x-enumNames:
        - V_2025_03_26
        - V_2025_06_18
    Markup:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/MarkupSpan'
          - $ref: '#/components/schemas/MarkupToolReference'
          - $ref: '#/components/schemas/MarkupSecretReference'
          - $ref: '#/components/schemas/MarkupEntityReference'
          - $ref: '#/components/schemas/MarkupVariableReference'
    McpServerHeaderEntry:
      type: object
      properties:
        id:
          type: string
        key:
          nullable: true
          type: string
        value:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
      required:
        - id
        - key
        - value
    McpServerAuthType:
      type: string
      enum:
        - custom
        - oauth
      x-enumNames:
        - CUSTOM
        - OAUTH
    McpServerOAuthMetadata:
      type: object
      properties:
        connected:
          type: boolean
        expiresAt:
          nullable: true
          type: string
        scope:
          nullable: true
          type: string
        authServerUrl:
          nullable: true
          type: string
      required:
        - connected
    McpServerTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        toolName:
          type: string
        description:
          nullable: true
          type: string
        inputSchema:
          $ref: '#/components/schemas/JsonSchema'
        mcpServerID:
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - folderID
        - createdByID
        - toolName
        - inputSchema
        - mcpServerID
    Persona:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        name:
          type: string
          minLength: 1
          maxLength: 255
        items:
          type: array
          items:
            $ref: '#/components/schemas/PersonaItem'
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - name
        - items
    KBDocumentVersionBackup:
      type: object
      properties:
        id:
          type: string
        documentID:
          type: string
        versionID:
          type: string
        folderID:
          nullable: true
          type: string
      required:
        - id
        - documentID
        - versionID
        - folderID
    KBSettingsBackup:
      type: object
      properties:
        id:
          type: string
        versionID:
          type: string
        summarization:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseSummarization'
        chunkStrategy:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseChunkStrategy'
        search:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseSearch'
        embeddingModel:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseEmbeddingModel'
      required:
        - id
        - versionID
        - summarization
        - chunkStrategy
        - search
    KBDocumentMetadataM2MBackup:
      type: object
      properties:
        id:
          type: string
        metadataFieldID:
          type: string
        documentID:
          type: string
        versionID:
          type: string
      required:
        - id
        - metadataFieldID
        - documentID
        - versionID
    SecretVisibility:
      type: string
      enum:
        - restricted
        - masked
      x-enumNames:
        - RESTRICTED
        - MASKED
    ProjectMember:
      type: object
      properties:
        creatorID:
          type: number
        platformData:
          type: object
          additionalProperties: {}
      required:
        - creatorID
        - platformData
    ProjectPrivacy:
      type: string
      enum:
        - public
        - private
      x-enumNames:
        - PUBLIC
        - PRIVATE
    ProjectSticker:
      type: object
      properties:
        id:
          type: string
        url:
          type: string
      required:
        - id
        - url
    ProjectReportTag:
      type: object
      properties:
        label:
          type: string
        tagID:
          type: string
      required:
        - label
        - tagID
    ProjectNLUSettings:
      type: object
      properties:
        classifyStrategy:
          type: string
      additionalProperties: {}
    ProjectEnvironment:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        alias:
          type: string
        isMain:
          type: boolean
        releases:
          type: array
          items:
            $ref: '#/components/schemas/ProjectEnvironmentRelease'
        createdAt:
          type: string
        draftVersionID:
          type: string
        createdByUserID:
          type: number
        clonedFromMainAt:
          nullable: true
          type: string
        trafficPercentage:
          type: number
          minimum: 0
          maximum: 100
        nextReleaseNumber:
          type: number
        publishedVersionID:
          type: string
        draftVersionIDsHistory:
          type: array
          items:
            type: string
        protected:
          type: boolean
      required:
        - id
        - name
        - alias
        - isMain
        - releases
        - createdAt
        - draftVersionID
        - createdByUserID
        - trafficPercentage
        - nextReleaseNumber
        - publishedVersionID
        - draftVersionIDsHistory
    ProjectCustomTheme:
      type: object
      properties:
        name:
          type: string
        palette:
          $ref: '#/components/schemas/ProjectCustomThemePalette'
        standardColor:
          type: string
      required:
        - palette
        - standardColor
    ProjectAIAssistSettings:
      type: object
      properties:
        aiPlayground:
          type: boolean
        generateStep:
          type: boolean
        generativeTasks:
          type: boolean
        generateNoMatch:
          type: boolean
      additionalProperties: {}
    ProjectTranscriptSettings:
      type: object
      properties:
        inactiveTimeout:
          default: 10
          type: number
          minimum: 10
          maximum: 60
        saveTestTranscripts:
          type: boolean
        saveTranscriptsWithNoInteraction:
          default: true
          type: boolean
      required:
        - saveTestTranscripts
    VersionKnowledgeBase:
      type: object
      properties:
        faqSets:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/VersionKnowledgeBaseSetFaq'
        settings:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseSettings'
        documents:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/KnowledgeBaseDocument'
    ProgramLine:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
      required:
        - id
        - type
      additionalProperties: {}
    AnyProgramCommand:
      anyOf:
        - $ref: '#/components/schemas/AnyJumpProgramCommand'
        - $ref: '#/components/schemas/AnyPushProgramCommand'
    VariableStateStartFrom:
      type: object
      properties:
        stepID:
          type: string
        diagramID:
          type: string
      required:
        - stepID
        - diagramID
    VersionModel:
      type: object
      properties:
        modelID:
          type: string
    VersionSettings:
      type: object
      properties:
        ui:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsUI'
        llm:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsLLM'
        time:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsTime'
        voice:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsVoice'
        widget:
          allOf:
            - $ref: '#/components/schemas/WidgetSettings'
        memory:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsMemory'
        session:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsSession'
        security:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsSecurity'
        framework:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsFramework'
        analytics:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsAnalytics'
        costControl:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsCostControl'
        globalCrew:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsGlobalCrew'
        llmFallback:
          allOf:
            - $ref: '#/components/schemas/LLMFallbackSettings'
        globalNoReply:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsGlobalNoReply'
        globalNoMatch:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsGlobalNoMatch'
        shareableLink:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/VersionSettingsShareableLink'
        automaticReprompt:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsAutomaticReprompt'
        intentClassification:
          $ref: '#/components/schemas/IntentClassificationSettings'
      required:
        - intentClassification
    VersionPlatformData:
      type: object
      properties:
        slots:
          type: array
          items:
            $ref: '#/components/schemas/VersionSlot'
        intents:
          type: array
          items:
            $ref: '#/components/schemas/VersionIntent'
        settings:
          $ref: '#/components/schemas/VersionPlatformSettings'
        publishing:
          type: object
          additionalProperties: {}
      required:
        - slots
        - intents
        - settings
        - publishing
    VersionCustomBlock:
      type: object
      properties:
        key:
          type: string
        name:
          type: string
        body:
          type: string
        stop:
          type: boolean
        paths:
          type: array
          items:
            type: string
        parameters:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/VersionCustomBlockParameter'
        defaultPath:
          type: number
      required:
        - key
        - name
    VersionCanvasTemplate:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        color:
          nullable: true
          type: string
        nodeIDs:
          type: array
          items:
            type: string
      required:
        - id
        - name
        - color
        - nodeIDs
    VersionProgramResources:
      type: object
      properties:
        flows:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledFlow'
        agents:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledAgent'
        prompts:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledPrompt'
        apiTools:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledAPITool'
        messages:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledMessage'
        globalCrew:
          allOf:
            - $ref: '#/components/schemas/VersionProgramResourcesGlobalCrew'
        globalPrompts:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/VersionProgramResourcesGlobalPrompts'
        costControl:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/VersionProgramResourcesCostControl'
        secretNameToId:
          type: object
          additionalProperties:
            type: string
        mcpServers:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledMcpServer'
        mcpServerTools:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledMcpServerTool'
        integrationTools:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledIntegrationTool'
        mcpIntegrationTools:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledMcpIntegrationTool'
      required:
        - messages
    VersionNote:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
        text:
          type: string
        meta:
          type: object
          additionalProperties: {}
        mentions:
          type: array
          items:
            type: number
      required:
        - id
        - type
        - text
        - mentions
    VersionFolderItem:
      type: object
      properties:
        type:
          type: string
        sourceID:
          type: string
      required:
        - type
        - sourceID
    VersionFolder:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        items:
          type: array
          items:
            $ref: '#/components/schemas/VersionFolderItem'
      required:
        - id
        - name
        - items
    VersionDomain:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        live:
          type: boolean
        status:
          type: string
        topicIDs:
          type: array
          items:
            type: string
        updatedBy:
          type: number
        updatedAt:
          type: string
        rootDiagramID:
          type: string
        updatedByCreatorID:
          description: '@deprecated in favor of updatedBy'
          type: number
      required:
        - id
        - name
        - live
        - topicIDs
        - rootDiagramID
    DiagramType:
      type: string
      enum:
        - TOPIC
        - GROUP
        - TEMPLATE
        - COMPONENT
      x-enumNames:
        - TOPIC
        - GROUP
        - TEMPLATE
        - COMPONENT
    DiagramNode:
      type: object
      properties:
        type:
          type: string
        data:
          type: object
          additionalProperties: {}
        nodeID:
          type: string
        coords:
          type: array
          items:
            anyOf:
              - type: number
              - type: number
          minItems: 2
          maxItems: 2
      required:
        - type
        - data
        - nodeID
    DiagramMenuItem:
      type: object
      properties:
        type:
          type: string
        sourceID:
          type: string
      required:
        - type
        - sourceID
    AutomaticReprompt:
      type: object
      properties:
        params:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AutomaticRepromptParams'
      required:
        - params
    UtteranceText:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/UtteranceTextEntityReference'
          - $ref: '#/components/schemas/UtteranceTextSpan'
    Language:
      type: string
      enum:
        - en-us
      x-enumNames:
        - ENGLISH_US
    ResponseType:
      type: string
      enum:
        - prompt
        - message
      x-enumNames:
        - PROMPT
        - MESSAGE
    AnyCondition:
      anyOf:
        - $ref: '#/components/schemas/ScriptCondition'
        - $ref: '#/components/schemas/PromptCondition'
        - $ref: '#/components/schemas/ExpressionCondition'
    Channel:
      type: string
      enum:
        - default
      x-enumNames:
        - DEFAULT
    FunctionSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
    FunctionVariableKind:
      type: string
      enum:
        - input
        - output
      x-enumNames:
        - INPUT
        - OUTPUT
    AgentEndTool:
      type: object
      properties:
        enabled:
          type: boolean
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        description:
          type: string
      required:
        - enabled
        - description
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
    AgentCardTool:
      type: object
      properties:
        enabled:
          type: boolean
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        description:
          type: string
      required:
        - enabled
        - description
    AgentButtonTool:
      type: object
      properties:
        enabled:
          type: boolean
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        description:
          type: string
      required:
        - enabled
        - description
    AgentSkipTurnTool:
      type: object
      properties:
        enabled:
          type: boolean
        description:
          type: string
      required:
        - enabled
        - description
    AgentWebSearchTool:
      type: object
      properties:
        enabled:
          type: boolean
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        description:
          type: string
        allowedDomains:
          nullable: true
          type: array
          items:
            type: string
        sourceUrlsCount:
          nullable: true
          type: number
          minimum: 1
          maximum: 5
      required:
        - enabled
    AgentCallForwardTool:
      type: object
      properties:
        enabled:
          type: boolean
        address:
          $ref: '#/components/schemas/Markup'
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        extension:
          allOf:
            - $ref: '#/components/schemas/Markup'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        description:
          type: string
        addressType:
          $ref: '#/components/schemas/CallForwardAddressType'
        callerIDPassthrough:
          type: boolean
      required:
        - enabled
        - address
        - description
        - addressType
    AgentKnowledgeBaseTool:
      type: object
      properties:
        query:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        enabled:
          type: boolean
        filters:
          type: array
          items:
            $ref: '#/components/schemas/AgentKnowledgeBaseMetadataKeyFilter'
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        chunkLimit:
          nullable: true
          type: number
        description:
          type: string
        queryMode:
          allOf:
            - $ref: '#/components/schemas/AgentKnowledgeBaseToolQueryMode'
        sourceUrlsCount:
          nullable: true
          type: number
          minimum: 1
          maximum: 5
      required:
        - enabled
        - description
    ToolNodeDataAPIInputVariable:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        shouldFulfill:
          description: >-
            If true, then LLM will never ask user to fulfill an input variable.
            If false, then LLM will decide for itself whether user needs to
            provide a value for the input variable.
          type: boolean
        apiToolInputVariableID:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - apiToolInputVariableID
    ToolNodeDataAPICaptureResponse:
      type: object
      properties:
        path:
          type: string
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - path
        - variableOrEntityID
    ToolNodeDataToolSound:
      type: object
      properties:
        ref:
          nullable: true
          type: string
        volume:
          default: 0.75
          type: number
          minimum: 0
          maximum: 1
      required:
        - ref
    AgentToolMessages:
      type: object
      properties:
        delayMessageID:
          nullable: true
          type: string
        failureMessageID:
          nullable: true
          type: string
        executionMessageID:
          nullable: true
          type: string
        completionMessageID:
          nullable: true
          type: string
        delayMessageSeconds:
          nullable: true
          type: number
        generative:
          type: object
          properties:
            execution:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            failure:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            delay:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
            completion:
              allOf:
                - $ref: '#/components/schemas/ToolMessageGenerative'
      required:
        - delayMessageID
        - failureMessageID
        - executionMessageID
        - completionMessageID
        - delayMessageSeconds
    AgentToolCaptureInputVariable:
      type: object
      properties:
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - variableOrEntityID
    ToolNodeDataFunctionInputVariable:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        shouldFulfill:
          description: >-
            If true, then LLM will never ask user to fulfill an input variable.
            If false, then LLM will decide for itself whether user needs to
            provide a value for the input variable.
          type: boolean
        functionInputVariableID:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - functionInputVariableID
    ToolNodeDataFunctionCaptureResponse:
      type: object
      properties:
        variableOrEntityID:
          nullable: true
          type: string
        functionOutputVariableID:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - variableOrEntityID
        - functionOutputVariableID
    ToolNodeDataIntegrationInputVariable:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        shouldFulfill:
          description: >-
            If true, then LLM will never ask user to fulfill an input variable.
            If false, then LLM will decide for itself whether user needs to
            provide a value for the input variable.
          type: boolean
        integrationToolVariableName:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - integrationToolVariableName
    ToolNodeDataIntegrationCaptureResponse:
      type: object
      properties:
        path:
          type: string
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - path
        - variableOrEntityID
    ToolExtendedInputVariable:
      type: object
      properties:
        schema: {}
        metadata:
          type: object
          additionalProperties: {}
    AgentToolVariableKind:
      type: string
      enum:
        - entity
        - variable
      x-enumNames:
        - ENTITY
        - VARIABLE
    ToolNodeDataMcpIntegrationInputVariable:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        shouldFulfill:
          description: >-
            If true, then LLM will never ask user to fulfill an input variable.
            If false, then LLM will decide for itself whether user needs to
            provide a value for the input variable.
          type: boolean
        mcpIntegrationVariableName:
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - mcpIntegrationVariableName
    ToolNodeDataMcpIntegrationCaptureResponse:
      type: object
      properties:
        path:
          type: string
        variableOrEntityID:
          nullable: true
          type: string
        captureType:
          allOf:
            - $ref: '#/components/schemas/ToolNodeCaptureType'
      required:
        - path
        - variableOrEntityID
    EventGoesToType:
      type: string
      enum:
        - global_agent
        - flow
        - continue
      x-enumNames:
        - GLOBAL_AGENT
        - FLOW
        - CONTINUE
    FolderScope:
      type: string
      enum:
        - flow
        - event
        - agent
        - prompt
        - entity
        - intent
        - message
        - workflow
        - variable
        - function
        - simulation
        - knowledge-base
      x-enumNames:
        - FLOW
        - EVENT
        - AGENT
        - PROMPT
        - ENTITY
        - INTENT
        - MESSAGE
        - WORKFLOW
        - VARIABLE
        - FUNCTION
        - SIMULATION
        - KNOWLEDGE_BASE
    PromptSettings:
      type: object
      properties:
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        maxTokens:
          type: number
        temperature:
          type: number
        responseFormat:
          type: string
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
        useStructuredOutput:
          type: boolean
    PromptMessageType:
      type: string
      enum:
        - role
        - variable
      x-enumNames:
        - ROLE
        - VARIABLE
    PromptMessageData:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/PromptMessageRole'
        content:
          $ref: '#/components/schemas/Markup'
      required:
        - role
        - content
    APIToolBody:
      oneOf:
        - $ref: '#/components/schemas/APIToolRawBody'
        - $ref: '#/components/schemas/APIToolFormDataBody'
        - $ref: '#/components/schemas/APIToolURLEncodedBody'
    APIToolKeyValue:
      type: object
      properties:
        id:
          type: string
        key:
          nullable: true
          type: string
        value:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
      required:
        - id
        - key
        - value
    APIToolHTTPMethodType:
      type: string
      enum:
        - get
        - put
        - post
        - patch
        - delete
      x-enumNames:
        - GET
        - PUT
        - POST
        - PATCH
        - DELETE
    APIToolSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
    SimulationSettings:
      type: object
      properties:
        launchEvent:
          nullable: true
          type: string
        variableStates:
          default: []
          anyOf:
            - type: string
            - type: array
              items:
                $ref: '#/components/schemas/PersonaItem'
      required:
        - launchEvent
    UserSimulationTurn:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - user
          x-enumNames:
            - USER
        payload:
          $ref: '#/components/schemas/UserSimulationTurnPayload'
        testOrder:
          type: array
          items:
            type: string
        simulationID:
          type: string
      required:
        - id
        - createdAt
        - type
        - payload
        - testOrder
        - simulationID
    AgentSimulationTurn:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - agent
          x-enumNames:
            - AGENT
        payload:
          $ref: '#/components/schemas/AgentSimulationTurnPayload'
        testOrder:
          type: array
          items:
            type: string
        simulationID:
          type: string
      required:
        - id
        - createdAt
        - type
        - payload
        - testOrder
        - simulationID
    SimulationSimulationTurn:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - simulation
          x-enumNames:
            - SIMULATION
        payload:
          $ref: '#/components/schemas/SimulationSimulationTurnPayload'
        testOrder:
          type: array
          items:
            type: string
        simulationID:
          type: string
      required:
        - id
        - createdAt
        - type
        - payload
        - testOrder
        - simulationID
    ToolSimulationTurnTest:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - tool
          x-enumNames:
            - TOOL
        turnID:
          type: string
        payload:
          $ref: '#/components/schemas/ToolSimulationTurnTestPayload'
      required:
        - id
        - createdAt
        - type
        - turnID
        - payload
    RoutingSimulationTurnTest:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - routing
          x-enumNames:
            - ROUTING
        turnID:
          type: string
        payload:
          $ref: '#/components/schemas/RoutingSimulationTurnTestPayload'
      required:
        - id
        - createdAt
        - type
        - turnID
        - payload
    ResponseSimulationTurnTest:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        environmentID:
          type: string
        type:
          type: string
          enum:
            - response
          x-enumNames:
            - RESPONSE
        turnID:
          type: string
        payload:
          $ref: '#/components/schemas/ResponseSimulationTurnTestPayload'
      required:
        - id
        - createdAt
        - type
        - turnID
        - payload
    VariableDatatype:
      type: string
      enum:
        - any
        - text
        - date
        - image
        - number
        - boolean
        - string
      x-enumNames:
        - ANY
        - TEXT
        - DATE
        - IMAGE
        - NUMBER
        - BOOLEAN
        - STRING
    WorkflowStatus:
      type: string
      enum:
        - to_do
        - complete
        - in_progress
      x-enumNames:
        - TO_DO
        - COMPLETE
        - IN_PROGRESS
    CardAttachment:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        type:
          type: string
          enum:
            - card
          x-enumNames:
            - CARD
        title:
          $ref: '#/components/schemas/Markup'
        mediaID:
          nullable: true
          type: string
        description:
          $ref: '#/components/schemas/Markup'
        buttonOrder:
          type: array
          items:
            type: string
      required:
        - id
        - createdAt
        - type
        - title
        - mediaID
        - description
        - buttonOrder
    MediaAttachment:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          nullable: true
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        type:
          type: string
          enum:
            - media
          x-enumNames:
            - MEDIA
        url:
          $ref: '#/components/schemas/Markup'
        name:
          type: string
          maxLength: 255
        isAsset:
          type: boolean
        datatype:
          $ref: '#/components/schemas/MediaDatatype'
      required:
        - id
        - createdAt
        - type
        - url
        - name
        - isAsset
        - datatype
    IntegrationToolName:
      type: string
      enum:
        - example_dynamic_schema
        - zendesk_find_user
        - zendesk_find_group
        - zendesk_find_ticket
        - zendesk_create_ticket
        - zendesk_update_ticket
        - zendesk_add_ticket_comment
        - zendesk_update_organization
        - zendesk_find_latest_comment
        - salesforce_create_lead
        - salesforce_update_lead
        - salesforce_create_contact
        - salesforce_update_contact
        - salesforce_create_case
        - salesforce_update_case
        - salesforce_add_comment_to_case
        - shopify_get_products
        - shopify_get_order
        - shopify_cancel_order
        - shopify_update_order
        - google_sheets_create_spreadsheet
        - google_sheets_update_spreadsheet
        - google_sheets_read_spreadsheet
        - google_sheets_append_spreadsheet
        - google_sheets_read_row
        - google_gmail_send_email
        - airtable_create_records
        - airtable_delete_records
        - airtable_get_record
        - airtable_list_records
        - airtable_update_records
        - make_run_scenario
        - twilio_send_sms
        - hubspot_create_contact
        - hubspot_create_lead
        - hubspot_create_ticket
      x-enumNames:
        - EXAMPLE_DYNAMIC_SCHEMA
        - ZENDESK_FIND_USER
        - ZENDESK_FIND_GROUP
        - ZENDESK_FIND_TICKET
        - ZENDESK_CREATE_TICKET
        - ZENDESK_UPDATE_TICKET
        - ZENDESK_ADD_TICKET_COMMENT
        - ZENDESK_UPDATE_ORGANIZATION
        - ZENDESK_FIND_LATEST_TICKET_COMMENT
        - SALESFORCE_CREATE_LEAD
        - SALESFORCE_UPDATE_LEAD
        - SALESFORCE_CREATE_CONTACT
        - SALESFORCE_UPDATE_CONTACT
        - SALESFORCE_CREATE_CASE
        - SALESFORCE_UPDATE_CASE
        - SALESFORCE_ADD_COMMENT_TO_CASE
        - SHOPIFY_GET_PRODUCTS
        - SHOPIFY_GET_ORDER
        - SHOPIFY_CANCEL_ORDER
        - SHOPIFY_UPDATE_ORDER
        - GOOGLE_SHEETS_CREATE_SPREADSHEET
        - GOOGLE_SHEETS_UPDATE_SPREADSHEET
        - GOOGLE_SHEETS_READ_SPREADSHEET
        - GOOGLE_SHEETS_APPEND_SPREADSHEET
        - GOOGLE_SHEETS_READ_ROW
        - GOOGLE_GMAIL_SEND_EMAIL
        - AIRTABLE_CREATE_RECORDS
        - AIRTABLE_DELETE_RECORDS
        - AIRTABLE_GET_RECORD
        - AIRTABLE_LIST_RECORDS
        - AIRTABLE_UPDATE_RECORDS
        - MAKE_RUN_SCENARIO
        - TWILIO_SEND_SMS
        - HUBSPOT_CREATE_CONTACT
        - HUBSPOT_CREATE_LEAD
        - HUBSPOT_CREATE_TICKET
    IntegrationToolProvider:
      type: string
      enum:
        - make
        - zendesk
        - shopify
        - airtable
        - salesforce
        - hubspot
        - google_gmail
        - google_sheets
        - twilio
        - ujet
        - genesys
        - kustomer
        - dixa
        - example
      x-enumNames:
        - MAKE
        - ZENDESK
        - SHOPIFY
        - AIRTABLE
        - SALESFORCE
        - HUBSPOT
        - GOOGLE_GMAIL
        - GOOGLE_SHEETS
        - TWILIO
        - UJET
        - GENESYS
        - KUSTOMER
        - DIXA
        - EXAMPLE
    MarkupSpan:
      type: object
      properties:
        text:
          $ref: '#/components/schemas/Markup'
        attributes:
          type: object
          additionalProperties: {}
      required:
        - text
    MarkupToolReference:
      type: object
      properties:
        resourceID:
          type: string
        referenceType:
          $ref: '#/components/schemas/MarkupToolReferenceType'
      required:
        - resourceID
        - referenceType
    MarkupSecretReference:
      type: object
      properties:
        secretID:
          type: string
      required:
        - secretID
    MarkupEntityReference:
      type: object
      properties:
        entityID:
          type: string
      required:
        - entityID
    MarkupVariableReference:
      type: object
      properties:
        variableID:
          type: string
        path:
          type: string
      required:
        - variableID
    JsonSchema:
      type: object
      additionalProperties: {}
    PersonaItem:
      type: object
      properties:
        id:
          type: string
        variableID:
          nullable: true
          type: string
        value:
          nullable: true
          type: string
      required:
        - id
        - variableID
        - value
    KnowledgeBaseSummarization:
      type: object
      properties:
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        system:
          type: string
        maxTokens:
          type: number
        temperature:
          type: number
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
        mode:
          $ref: '#/components/schemas/KBSettingsPromptMode'
        prompt:
          type: string
      required:
        - mode
        - prompt
    KnowledgeBaseChunkStrategy:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/KBSettingsChunkStrategy'
        size:
          type: number
        overlap:
          type: number
      required:
        - type
        - size
        - overlap
    KnowledgeBaseSearch:
      type: object
      properties:
        limit:
          type: number
        metric:
          type: string
      required:
        - limit
        - metric
    KnowledgeBaseEmbeddingModel:
      type: object
      properties:
        model:
          type: string
        size:
          type: number
      required:
        - model
        - size
    ProjectEnvironmentRelease:
      type: object
      properties:
        name:
          type: string
        backupID:
          type: number
        createdAt:
          type: string
        versionID:
          type: string
        description:
          nullable: true
          type: string
        autogenerated:
          type: boolean
        createdByUserID:
          nullable: true
          type: number
      required:
        - name
        - backupID
        - createdAt
        - versionID
        - description
        - autogenerated
        - createdByUserID
    ProjectCustomThemePalette:
      type: object
      properties:
        '50':
          type: string
        '100':
          type: string
        '200':
          type: string
        '300':
          type: string
        '400':
          type: string
        '500':
          type: string
        '600':
          type: string
        '700':
          type: string
        '800':
          type: string
        '900':
          type: string
      required:
        - '50'
        - '100'
        - '200'
        - '300'
        - '400'
        - '500'
        - '600'
        - '700'
        - '800'
        - '900'
    VersionKnowledgeBaseSetFaq:
      type: object
      properties:
        name:
          type: string
        status:
          allOf:
            - $ref: '#/components/schemas/VersionKnowledgeBaseSetFaqStatus'
        version:
          type: number
        faqSetID:
          type: string
        updatedAt:
          type: string
        creatorID:
          type: number
    KnowledgeBaseSettings:
      type: object
      properties:
        summarization:
          $ref: '#/components/schemas/KnowledgeBaseSummarization'
        chunkStrategy:
          $ref: '#/components/schemas/KnowledgeBaseChunkStrategy'
        search:
          $ref: '#/components/schemas/KnowledgeBaseSearch'
        embeddingModel:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseEmbeddingModel'
      required:
        - summarization
        - chunkStrategy
        - search
    KnowledgeBaseDocument:
      type: object
      properties:
        updatedAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        creatorID:
          type: number
        documentID:
          type: string
        s3ObjectRef:
          type: string
        version:
          type: number
        status:
          $ref: '#/components/schemas/KBDocumentStatus'
        folderID:
          nullable: true
          type: string
        data:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KBDocumentData'
        chunks:
          type: array
          items:
            $ref: '#/components/schemas/KBDocumentChunk'
        smartChunking:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KBDocumentChunkSmartChunking'
        metadata:
          type: array
          items:
            $ref: '#/components/schemas/DocumentMetadataEntry'
      required:
        - creatorID
        - documentID
        - status
        - data
    AnyJumpProgramCommand:
      anyOf:
        - $ref: '#/components/schemas/EventJumpProgramCommand'
        - $ref: '#/components/schemas/OnJumpProgramCommand'
    AnyPushProgramCommand:
      anyOf:
        - $ref: '#/components/schemas/EventPushProgramCommand'
        - $ref: '#/components/schemas/OnPushProgramCommand'
    VersionSettingsUI:
      type: object
      properties:
        transcripts:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsUITranscripts'
        analytics:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsUIAnalytics'
    VersionSettingsLLM:
      type: object
      properties:
        globalPrompts:
          type: object
          properties:
            persona:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/Markup'
            guidelines:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/Markup'
        defaultModels:
          type: object
          properties:
            global:
              type: object
              properties:
                model:
                  allOf:
                    - $ref: '#/components/schemas/AIModel'
                maxTokens:
                  type: number
                temperature:
                  type: number
                reasoningEffort:
                  nullable: true
                  allOf:
                    - $ref: '#/components/schemas/AIReasoningEffort'
        globalAgentID:
          description: '@deprecated Use globalCrew.agentID instead'
          type: string
        priorityProcessing:
          type: boolean
    VersionSettingsTime:
      type: object
      properties:
        timezone:
          allOf:
            - $ref: '#/components/schemas/Timezone'
    VersionSettingsVoice:
      type: object
      properties:
        stt:
          allOf:
            - $ref: '#/components/schemas/STTSettings'
        tts:
          allOf:
            - $ref: '#/components/schemas/VoiceSettings'
        pronunciationDictionary:
          maxItems: 500
          type: array
          items:
            $ref: '#/components/schemas/PronunciationDictionaryEntry'
        failureMessage:
          nullable: true
          type: string
        hasCallRecording:
          default: true
          type: boolean
        audioCue:
          nullable: true
          type: number
        backgroundAudio:
          nullable: true
          type: string
        backgroundAudioSettings:
          allOf:
            - $ref: '#/components/schemas/BackgroundAudioSettings'
        audioSync:
          type: boolean
        keypadInput:
          allOf:
            - $ref: '#/components/schemas/VoiceKeypadSettings'
        silenceTimeoutMs:
          type: number
        maxDuration:
          allOf:
            - $ref: '#/components/schemas/VoiceMaxDurationSettings'
    WidgetSettings:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WidgetSettingsWidgetType'
        chat:
          $ref: '#/components/schemas/WidgetSettingsChatSettings'
        voice:
          $ref: '#/components/schemas/WidgetSettingsVoiceSettings'
        common:
          $ref: '#/components/schemas/WidgetSettingsCommonSettings'
        security:
          allOf:
            - $ref: '#/components/schemas/WidgetSettingsSecuritySettings'
      required:
        - type
        - chat
        - voice
        - common
    VersionSettingsMemory:
      type: object
      properties:
        turns:
          default: 10
          type: number
    VersionSettingsSession:
      type: object
      properties:
        idleTimeout:
          $ref: '#/components/schemas/VersionSettingsSessionIdleTimeout'
      required:
        - idleTimeout
    VersionSettingsSecurity:
      type: object
      properties:
        transcriptsPII:
          default: false
          type: boolean
    VersionSettingsFramework:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ProjectFramework'
        agenticInitializeComponentID:
          default: null
          nullable: true
          type: string
        conversationInitializeComponentID:
          type: string
      required:
        - type
        - conversationInitializeComponentID
    VersionSettingsAnalytics:
      type: object
      properties:
        estimatedSavings:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsAnalyticsEstimatedSavings'
    VersionSettingsCostControl:
      type: object
      properties:
        enabled:
          type: boolean
        maxDollars:
          type: number
          minimum: 0
          exclusiveMinimum: true
          maximum: 10000
        endMessage:
          $ref: '#/components/schemas/Markup'
      required:
        - enabled
        - maxDollars
        - endMessage
    VersionSettingsGlobalCrew:
      type: object
      properties:
        agentID:
          type: string
        agentDescription:
          deprecated: true
          description: Should not be used, use global agent description instead
          nullable: true
          type: string
        subFlows:
          type: array
          items:
            $ref: '#/components/schemas/CrewNodeDataFlow'
        subAgents:
          type: array
          items:
            $ref: '#/components/schemas/CrewNodeDataAgent'
      required:
        - agentID
        - subFlows
        - subAgents
    LLMFallbackSettings:
      type: object
      properties:
        models:
          $ref: '#/components/schemas/FallbackMapping'
      required:
        - models
    VersionSettingsGlobalNoReply:
      anyOf:
        - $ref: '#/components/schemas/VersionSettingsGlobalNoReplyStatic'
        - $ref: '#/components/schemas/VersionSettingsGlobalNoReplyGenerative'
    VersionSettingsGlobalNoMatch:
      oneOf:
        - $ref: '#/components/schemas/VersionSettingsGlobalNoMatchStatic'
        - $ref: '#/components/schemas/VersionSettingsGlobalNoMatchGenerative'
    VersionSettingsShareableLink:
      type: object
      properties:
        password:
          type: string
        variableStateID:
          nullable: true
          type: string
    VersionSettingsAutomaticReprompt:
      type: object
      properties:
        params:
          allOf:
            - $ref: '#/components/schemas/AutomaticRepromptParams'
      required:
        - params
    IntentClassificationSettings:
      oneOf:
        - $ref: '#/components/schemas/IntentClassificationLLMSettings'
        - $ref: '#/components/schemas/IntentClassificationNLUSettings'
        - $ref: '#/components/schemas/IntentClassificationRAGSettings'
    VersionSlot:
      type: object
      properties:
        key:
          type: string
        name:
          type: string
        type:
          $ref: '#/components/schemas/VersionSlotType'
        color:
          type: string
        inputs:
          type: array
          items:
            type: string
      required:
        - key
        - name
        - type
        - inputs
    VersionIntent:
      type: object
      properties:
        key:
          type: string
        name:
          type: string
        slots:
          type: array
          items:
            $ref: '#/components/schemas/VersionIntentSlot'
        inputs:
          type: array
          items:
            $ref: '#/components/schemas/VersionIntentInput'
        noteID:
          type: string
        description:
          type: string
      required:
        - key
        - name
        - inputs
    VersionPlatformSettings:
      type: object
      properties:
        locales:
          type: array
          items:
            type: string
        deepgramASR:
          allOf:
            - $ref: '#/components/schemas/DeepgramASRSettings'
        globalNoReply:
          anyOf:
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - static
                  x-enumNames:
                    - STATIC
                delay:
                  nullable: true
                  type: number
                prompt:
                  nullable: true
                enabled:
                  type: boolean
                maxRetries:
                  nullable: true
                  type: number
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - generative
                  x-enumNames:
                    - GENERATIVE
                delay:
                  nullable: true
                  type: number
                prompt:
                  $ref: '#/components/schemas/AIParams'
                enabled:
                  type: boolean
                maxRetries:
                  nullable: true
                  type: number
              required:
                - type
                - prompt
        defaultVoice:
          nullable: true
          type: string
        globalNoMatch:
          oneOf:
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - static
                  x-enumNames:
                    - STATIC
                prompt:
                  nullable: true
              required:
                - type
            - type: object
              properties:
                type:
                  type: string
                  enum:
                    - generative
                  x-enumNames:
                    - GENERATIVE
                prompt:
                  $ref: '#/components/schemas/AIParams'
              required:
                - type
                - prompt
        messageDelay:
          type: object
          properties:
            durationMilliseconds:
              type: number
          required:
            - durationMilliseconds
        defaultCanvasNodeVisibility:
          allOf:
            - $ref: '#/components/schemas/LegacyCanvasNodeVisibility'
      additionalProperties: {}
    VersionCustomBlockParameter:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
      required:
        - id
        - name
    CompiledFlow:
      type: object
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 255
        diagramID:
          type: string
        description:
          nullable: true
          type: string
        toolName:
          type: string
        hasToolNameWarning:
          type: boolean
      required:
        - name
        - diagramID
        - description
    CompiledAgent:
      type: object
      properties:
        endTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentEndTool'
        settings:
          $ref: '#/components/schemas/AgentSettings'
        cardTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        isOperator:
          default: false
          type: boolean
        buttonTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentButtonTool'
        description:
          nullable: true
          type: string
        skipTurnTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/CompiledAgentSkipTurnTool'
        carouselTool:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        webSearchTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentWebSearchTool'
        name:
          default: ''
          type: string
          maxLength: 255
        toolName:
          type: string
        apiTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentAPITool'
        flowTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentFlowTool'
        pathTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentPathTool'
        instructions:
          nullable: true
          type: string
        functionTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentFunctionTool'
        callForwardTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/CompiledAgentCallForwardTool'
        integrationTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentIntegrationTool'
        knowledgeBaseTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/CompiledAgentKnowledgeBaseTool'
        hasToolNameWarning:
          type: boolean
        mcpIntegrationTools:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentMcpIntegrationTool'
      required:
        - settings
        - description
        - webSearchTool
        - pathTools
        - instructions
        - functionTools
        - knowledgeBaseTool
    CompiledPrompt:
      type: object
      properties:
        settings:
          $ref: '#/components/schemas/PromptSettings'
        system:
          type: string
        messages:
          type: array
          items:
            $ref: '#/components/schemas/AIMessageSimple'
      required:
        - settings
        - system
        - messages
    CompiledAPITool:
      type: object
      properties:
        name:
          type: string
          maxLength: 255
        description:
          nullable: true
          type: string
        apiCall:
          type: object
          properties:
            url:
              type: string
            body:
              type: array
              items:
                $ref: '#/components/schemas/ApiNodeDataKeyValue'
            method:
              $ref: '#/components/schemas/APINodeMethodType'
            params:
              type: array
              items:
                $ref: '#/components/schemas/ApiNodeDataKeyValue'
            headers:
              type: array
              items:
                $ref: '#/components/schemas/ApiNodeDataKeyValue'
            content:
              type: string
            bodyInputType:
              $ref: '#/components/schemas/APINodeBodyType'
            selected_action:
              $ref: '#/components/schemas/APINodeActionType'
          required:
            - url
            - body
            - method
            - params
            - headers
            - content
            - bodyInputType
            - selected_action
        toolName:
          type: string
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 9007199254740991
        inputVariables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledAPIToolInputVariable'
        hasToolNameWarning:
          type: boolean
      required:
        - name
        - description
        - apiCall
        - inputVariables
    CompiledMessage:
      type: object
      properties:
        variants:
          type: object
          additionalProperties:
            type: array
            items:
              $ref: '#/components/schemas/CompiledResponseMessage'
      required:
        - variants
    VersionProgramResourcesGlobalCrew:
      type: object
      properties:
        nodeID:
          nullable: true
          type: string
        agentID:
          type: string
        subFlows:
          nullable: true
          type: array
          items:
            $ref: '#/components/schemas/CompiledCrewNodeDataFlow'
        diagramID:
          nullable: true
          type: string
        subAgents:
          nullable: true
          type: array
          items:
            $ref: '#/components/schemas/CompiledCrewNodeDataAgent'
        agentDescription:
          deprecated: true
          description: Use global agent description instead
          nullable: true
          type: string
      required:
        - agentID
    VersionProgramResourcesGlobalPrompts:
      type: object
      properties:
        persona:
          nullable: true
          type: string
        guidelines:
          nullable: true
          type: string
    VersionProgramResourcesCostControl:
      type: object
      properties:
        endMessage:
          nullable: true
          type: string
    CompiledMcpServer:
      type: object
      properties:
        specification:
          default: '2025-03-26'
          allOf:
            - $ref: '#/components/schemas/McpServerSpecification'
        id:
          type: string
        name:
          type: string
        url:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
        authType:
          allOf:
            - $ref: '#/components/schemas/McpServerAuthType'
    CompiledMcpServerTool:
      type: object
      properties:
        id:
          type: string
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
        updatedByID:
          type: number
        assistantID:
          type: string
        environmentID:
          type: string
        folderID:
          nullable: true
          type: string
        createdByID:
          type: number
        toolName:
          type: string
        description:
          nullable: true
          type: string
        inputSchema:
          $ref: '#/components/schemas/JsonSchema'
        mcpServerID:
          type: string
      required:
        - id
        - createdAt
        - updatedAt
        - updatedByID
        - folderID
        - createdByID
        - toolName
        - inputSchema
        - mcpServerID
    CompiledIntegrationTool:
      type: object
      properties:
        name:
          type: string
          maxLength: 255
        toolName:
          $ref: '#/components/schemas/IntegrationToolName'
        description:
          nullable: true
          type: string
        toolProvider:
          $ref: '#/components/schemas/IntegrationToolProvider'
      required:
        - name
        - toolName
        - description
        - toolProvider
    CompiledMcpIntegrationTool:
      type: object
      properties:
        description:
          nullable: true
          type: string
        toolName:
          type: string
        inputSchema:
          $ref: '#/components/schemas/JsonSchema'
        mcpServerID:
          type: string
      required:
        - description
        - toolName
        - inputSchema
        - mcpServerID
    AutomaticRepromptParams:
      type: object
      properties:
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        system:
          type: string
        maxTokens:
          type: number
        temperature:
          type: number
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
    UtteranceTextEntityReference:
      type: object
      properties:
        entityID:
          type: string
      required:
        - entityID
    UtteranceTextSpan:
      type: object
      properties:
        text:
          $ref: '#/components/schemas/UtteranceText'
        attributes:
          type: object
          additionalProperties: {}
      required:
        - text
    ScriptCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - script
          x-enumNames:
            - SCRIPT
        code:
          $ref: '#/components/schemas/CodeText'
      required:
        - type
        - code
    PromptCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - prompt
          x-enumNames:
            - PROMPT
        matchAll:
          type: boolean
        promptID:
          type: string
        assertions:
          type: array
          items:
            $ref: '#/components/schemas/ConditionPromptAssertion'
      required:
        - type
        - matchAll
        - assertions
    ExpressionCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - value-variable
          x-enumNames:
            - VALUE_VARIABLE
        matchAll:
          type: boolean
        assertions:
          type: array
          items:
            $ref: '#/components/schemas/ConditionAssertion'
      required:
        - type
        - matchAll
        - assertions
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
    CallForwardAddressType:
      type: string
      enum:
        - phone
        - sip
      x-enumNames:
        - PHONE
        - SIP
    AgentKnowledgeBaseMetadataKeyFilter:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        key:
          type: string
      required:
        - key
    AgentKnowledgeBaseToolQueryMode:
      type: string
      enum:
        - custom
        - rewriting
      x-enumNames:
        - CUSTOM
        - REWRITING
    ToolNodeCaptureType:
      type: string
      enum:
        - variable
        - property
      x-enumNames:
        - VARIABLE
        - PROPERTY
    ToolMessageGenerative:
      type: object
      properties:
        enabled:
          type: boolean
        examples:
          type: array
          items:
            $ref: '#/components/schemas/Markup'
      required:
        - enabled
    PromptMessageRole:
      type: string
      enum:
        - system
        - agent
        - user
      x-enumNames:
        - SYSTEM
        - AGENT
        - USER
    APIToolRawBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - raw-input
          x-enumNames:
            - RAW_INPUT
        contentType:
          allOf:
            - $ref: '#/components/schemas/APIToolContentType'
        content:
          $ref: '#/components/schemas/CodeText'
      required:
        - type
        - content
    APIToolFormDataBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - form-data
          x-enumNames:
            - FORM_DATA
        formData:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
      required:
        - type
        - formData
    APIToolURLEncodedBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - url-encoded
          x-enumNames:
            - URL_ENCODED
        params:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
      required:
        - type
        - params
    UserSimulationTurnPayload:
      type: object
      properties:
        response:
          type: string
        variableStates:
          anyOf:
            - type: string
            - type: array
              items:
                $ref: '#/components/schemas/PersonaItem'
      required:
        - response
        - variableStates
    AgentSimulationTurnPayload:
      type: object
      properties:
        testOrderMatters:
          type: boolean
      required:
        - testOrderMatters
    SimulationSimulationTurnPayload:
      type: object
      properties:
        scenario:
          type: string
        maxTurns:
          type: number
        variableStates:
          anyOf:
            - type: string
            - type: array
              items:
                $ref: '#/components/schemas/PersonaItem'
        successCriteria:
          type: string
      required:
        - scenario
        - maxTurns
        - variableStates
        - successCriteria
    ToolSimulationTurnTestPayload:
      type: object
      properties:
        tool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolSimulationTurnTestPayloadTool'
        shouldCall:
          type: boolean
      required:
        - tool
        - shouldCall
    RoutingSimulationTurnTestPayload:
      type: object
      properties:
        routeTo:
          nullable: true
          type: object
          properties:
            resourceID:
              type: string
            resourceType:
              $ref: '#/components/schemas/SimulationTurnTestResourceType'
          required:
            - resourceID
            - resourceType
        shouldRoute:
          type: boolean
      required:
        - routeTo
        - shouldRoute
    ResponseSimulationTurnTestPayload:
      oneOf:
        - $ref: '#/components/schemas/SimulationTurnTestJudgeEqual'
        - $ref: '#/components/schemas/SimulationTurnTestJudgeLLMEval'
    MediaDatatype:
      type: string
      enum:
        - image
        - video
      x-enumNames:
        - IMAGE
        - VIDEO
    MarkupToolReferenceType:
      type: string
      enum:
        - function
        - api-call
        - integration
        - mcp-integration
        - flow
        - agent
        - path-tool
        - system-tool
      x-enumNames:
        - FUNCTION
        - API_CALL
        - INTEGRATION
        - MCP_INTEGRATION
        - FLOW
        - AGENT
        - PATH_TOOL
        - SYSTEM_TOOL
    KBSettingsPromptMode:
      type: string
      enum:
        - prompt
        - memory
        - memory_prompt
      x-enumNames:
        - PROMPT
        - MEMORY
        - MEMORY_PROMPT
    KBSettingsChunkStrategy:
      type: string
      enum:
        - recursive_text_splitter
      x-enumNames:
        - RECURSIVE_TEXT_SPLITTER
    VersionKnowledgeBaseSetFaqStatus:
      type: object
      properties:
        type:
          type: string
      additionalProperties: {}
    KBDocumentStatus:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/KnowledgeBaseDocumentStatus'
        data: {}
      required:
        - type
    KBDocumentData:
      oneOf:
        - $ref: '#/components/schemas/KBDocumentUrlData'
        - $ref: '#/components/schemas/KBDocumentDocxData'
        - $ref: '#/components/schemas/KBDocumentPDFData'
        - $ref: '#/components/schemas/KBDocumentTextData'
        - $ref: '#/components/schemas/KBDocumentMarkdownData'
        - $ref: '#/components/schemas/KBDocumentCSVData'
        - $ref: '#/components/schemas/KBDocumentXLSXData'
        - $ref: '#/components/schemas/KBDocumentTableData'
    KBDocumentChunk:
      type: object
      properties:
        chunkID:
          type: string
        content:
          type: string
        metadata:
          type: object
          additionalProperties: {}
      required:
        - chunkID
        - content
    KBDocumentChunkSmartChunking:
      type: object
      properties:
        markdownConversion:
          type: boolean
        llmBasedChunks:
          type: boolean
        llmGeneratedQ:
          type: boolean
        llmContentSummarization:
          type: boolean
        llmPrependContext:
          type: boolean
    DocumentMetadataEntry:
      type: object
      properties:
        key:
          type: string
        values:
          type: array
          items:
            $ref: '#/components/schemas/DocumentMetadataValue'
      required:
        - key
        - values
    EventJumpProgramCommand:
      type: object
      properties:
        type:
          type: string
          enum:
            - jump
          x-enumNames:
            - JUMP
        nextID:
          nullable: true
          type: string
        platform:
          type: string
        diagramID:
          nullable: true
          type: string
        event:
          $ref: '#/components/schemas/AnyProgramEvent'
      required:
        - type
        - nextID
        - event
    OnJumpProgramCommand:
      type: object
      properties:
        type:
          type: string
          enum:
            - jump
          x-enumNames:
            - JUMP
        nextID:
          nullable: true
          type: string
        platform:
          type: string
        diagramID:
          nullable: true
          type: string
        'on':
          type: object
          additionalProperties: {}
      required:
        - type
        - nextID
        - 'on'
    EventPushProgramCommand:
      type: object
      properties:
        type:
          type: string
          enum:
            - push
          x-enumNames:
            - PUSH
        platform:
          type: string
        diagramID:
          nullable: true
          type: string
        event:
          $ref: '#/components/schemas/AnyProgramEvent'
      required:
        - type
        - event
    OnPushProgramCommand:
      type: object
      properties:
        type:
          type: string
          enum:
            - push
          x-enumNames:
            - PUSH
        platform:
          type: string
        diagramID:
          nullable: true
          type: string
        'on':
          type: object
          additionalProperties: {}
      required:
        - type
        - 'on'
    VersionSettingsUITranscripts:
      type: object
      properties:
        sectionsOrderIDs:
          type: array
          items:
            type: string
    VersionSettingsUIAnalytics:
      type: object
      properties:
        sectionsOrderIDs:
          type: array
          items:
            type: string
    Timezone:
      type: string
      enum:
        - Africa/Abidjan
        - Africa/Accra
        - Africa/Addis_Ababa
        - Africa/Algiers
        - Africa/Asmera
        - Africa/Bamako
        - Africa/Bangui
        - Africa/Banjul
        - Africa/Bissau
        - Africa/Blantyre
        - Africa/Brazzaville
        - Africa/Bujumbura
        - Africa/Cairo
        - Africa/Casablanca
        - Africa/Ceuta
        - Africa/Conakry
        - Africa/Dakar
        - Africa/Dar_es_Salaam
        - Africa/Djibouti
        - Africa/Douala
        - Africa/El_Aaiun
        - Africa/Freetown
        - Africa/Gaborone
        - Africa/Harare
        - Africa/Johannesburg
        - Africa/Juba
        - Africa/Kampala
        - Africa/Khartoum
        - Africa/Kigali
        - Africa/Kinshasa
        - Africa/Lagos
        - Africa/Libreville
        - Africa/Lome
        - Africa/Luanda
        - Africa/Lubumbashi
        - Africa/Lusaka
        - Africa/Malabo
        - Africa/Maputo
        - Africa/Maseru
        - Africa/Mbabane
        - Africa/Mogadishu
        - Africa/Monrovia
        - Africa/Nairobi
        - Africa/Ndjamena
        - Africa/Niamey
        - Africa/Nouakchott
        - Africa/Ouagadougou
        - Africa/Porto-Novo
        - Africa/Sao_Tome
        - Africa/Tripoli
        - Africa/Tunis
        - Africa/Windhoek
        - America/Adak
        - America/Anchorage
        - America/Anguilla
        - America/Antigua
        - America/Araguaina
        - America/Argentina/Buenos_Aires
        - America/Argentina/Catamarca
        - America/Argentina/Cordoba
        - America/Argentina/Jujuy
        - America/Argentina/La_Rioja
        - America/Argentina/Mendoza
        - America/Argentina/Rio_Gallegos
        - America/Argentina/Salta
        - America/Argentina/San_Juan
        - America/Argentina/San_Luis
        - America/Argentina/Tucuman
        - America/Argentina/Ushuaia
        - America/Aruba
        - America/Asuncion
        - America/Atikokan
        - America/Bahia
        - America/Bahia_Banderas
        - America/Barbados
        - America/Belem
        - America/Belize
        - America/Blanc-Sablon
        - America/Boa_Vista
        - America/Bogota
        - America/Boise
        - America/Cambridge_Bay
        - America/Campo_Grande
        - America/Cancun
        - America/Caracas
        - America/Cayenne
        - America/Cayman
        - America/Chicago
        - America/Chihuahua
        - America/Costa_Rica
        - America/Creston
        - America/Cuiaba
        - America/Curacao
        - America/Danmarkshavn
        - America/Dawson
        - America/Dawson_Creek
        - America/Denver
        - America/Detroit
        - America/Dominica
        - America/Edmonton
        - America/Eirunepe
        - America/El_Salvador
        - America/Fort_Nelson
        - America/Fortaleza
        - America/Glace_Bay
        - America/Goose_Bay
        - America/Grand_Turk
        - America/Grenada
        - America/Guadeloupe
        - America/Guatemala
        - America/Guayaquil
        - America/Guyana
        - America/Halifax
        - America/Havana
        - America/Hermosillo
        - America/Indiana/Indianapolis
        - America/Indiana/Knox
        - America/Indiana/Marengo
        - America/Indiana/Petersburg
        - America/Indiana/Tell_City
        - America/Indiana/Vevay
        - America/Indiana/Vincennes
        - America/Indiana/Winamac
        - America/Inuvik
        - America/Iqaluit
        - America/Jamaica
        - America/Juneau
        - America/Kentucky/Louisville
        - America/Kentucky/Monticello
        - America/Kralendijk
        - America/La_Paz
        - America/Lima
        - America/Los_Angeles
        - America/Lower_Princes
        - America/Maceio
        - America/Managua
        - America/Manaus
        - America/Marigot
        - America/Martinique
        - America/Matamoros
        - America/Mazatlan
        - America/Menominee
        - America/Merida
        - America/Metlakatla
        - America/Mexico_City
        - America/Miquelon
        - America/Moncton
        - America/Monterrey
        - America/Montevideo
        - America/Montserrat
        - America/Nassau
        - America/New_York
        - America/Nipigon
        - America/Nome
        - America/Noronha
        - America/North_Dakota/Beulah
        - America/North_Dakota/Center
        - America/North_Dakota/New_Salem
        - America/Nuuk
        - America/Ojinaga
        - America/Panama
        - America/Pangnirtung
        - America/Paramaribo
        - America/Phoenix
        - America/Port-au-Prince
        - America/Port_of_Spain
        - America/Porto_Velho
        - America/Puerto_Rico
        - America/Punta_Arenas
        - America/Rainy_River
        - America/Rankin_Inlet
        - America/Recife
        - America/Regina
        - America/Resolute
        - America/Rio_Branco
        - America/Santarem
        - America/Santiago
        - America/Santo_Domingo
        - America/Sao_Paulo
        - America/Scoresbysund
        - America/Sitka
        - America/St_Barthelemy
        - America/St_Johns
        - America/St_Kitts
        - America/St_Lucia
        - America/St_Thomas
        - America/St_Vincent
        - America/Swift_Current
        - America/Tegucigalpa
        - America/Thule
        - America/Thunder_Bay
        - America/Tijuana
        - America/Toronto
        - America/Tortola
        - America/Vancouver
        - America/Whitehorse
        - America/Winnipeg
        - America/Yakutat
        - America/Yellowknife
        - Antarctica/Casey
        - Antarctica/Davis
        - Antarctica/DumontDUrville
        - Antarctica/Macquarie
        - Antarctica/Mawson
        - Antarctica/McMurdo
        - Antarctica/Palmer
        - Antarctica/Rothera
        - Antarctica/Syowa
        - Antarctica/Troll
        - Antarctica/Vostok
        - Arctic/Longyearbyen
        - Asia/Aden
        - Asia/Almaty
        - Asia/Amman
        - Asia/Anadyr
        - Asia/Aqtau
        - Asia/Aqtobe
        - Asia/Ashgabat
        - Asia/Atyrau
        - Asia/Baghdad
        - Asia/Bahrain
        - Asia/Baku
        - Asia/Bangkok
        - Asia/Barnaul
        - Asia/Beirut
        - Asia/Bishkek
        - Asia/Brunei
        - Asia/Chita
        - Asia/Choibalsan
        - Asia/Colombo
        - Asia/Damascus
        - Asia/Dhaka
        - Asia/Dili
        - Asia/Dubai
        - Asia/Dushanbe
        - Asia/Famagusta
        - Asia/Gaza
        - Asia/Hebron
        - Asia/Ho_Chi_Minh
        - Asia/Hong_Kong
        - Asia/Hovd
        - Asia/Irkutsk
        - Asia/Jakarta
        - Asia/Jayapura
        - Asia/Jerusalem
        - Asia/Kabul
        - Asia/Kamchatka
        - Asia/Karachi
        - Asia/Kathmandu
        - Asia/Khandyga
        - Asia/Kolkata
        - Asia/Krasnoyarsk
        - Asia/Kuala_Lumpur
        - Asia/Kuching
        - Asia/Kuwait
        - Asia/Macau
        - Asia/Magadan
        - Asia/Makassar
        - Asia/Manila
        - Asia/Muscat
        - Asia/Nicosia
        - Asia/Novokuznetsk
        - Asia/Novosibirsk
        - Asia/Omsk
        - Asia/Oral
        - Asia/Phnom_Penh
        - Asia/Pontianak
        - Asia/Pyongyang
        - Asia/Qatar
        - Asia/Qostanay
        - Asia/Qyzylorda
        - Asia/Riyadh
        - Asia/Sakhalin
        - Asia/Samarkand
        - Asia/Seoul
        - Asia/Shanghai
        - Asia/Singapore
        - Asia/Srednekolymsk
        - Asia/Taipei
        - Asia/Tashkent
        - Asia/Tbilisi
        - Asia/Tehran
        - Asia/Thimphu
        - Asia/Tokyo
        - Asia/Tomsk
        - Asia/Ulaanbaatar
        - Asia/Urumqi
        - Asia/Ust-Nera
        - Asia/Vientiane
        - Asia/Vladivostok
        - Asia/Yakutsk
        - Asia/Yangon
        - Asia/Yekaterinburg
        - Asia/Yerevan
        - Atlantic/Azores
        - Atlantic/Bermuda
        - Atlantic/Canary
        - Atlantic/Cape_Verde
        - Atlantic/Faroe
        - Atlantic/Madeira
        - Atlantic/Reykjavik
        - Atlantic/South_Georgia
        - Atlantic/St_Helena
        - Atlantic/Stanley
        - Australia/Adelaide
        - Australia/Brisbane
        - Australia/Broken_Hill
        - Australia/Darwin
        - Australia/Eucla
        - Australia/Hobart
        - Australia/Lindeman
        - Australia/Lord_Howe
        - Australia/Melbourne
        - Australia/Perth
        - Australia/Sydney
        - Europe/Amsterdam
        - Europe/Andorra
        - Europe/Astrakhan
        - Europe/Athens
        - Europe/Belgrade
        - Europe/Berlin
        - Europe/Bratislava
        - Europe/Brussels
        - Europe/Bucharest
        - Europe/Budapest
        - Europe/Busingen
        - Europe/Chisinau
        - Europe/Copenhagen
        - Europe/Dublin
        - Europe/Gibraltar
        - Europe/Guernsey
        - Europe/Helsinki
        - Europe/Isle_of_Man
        - Europe/Istanbul
        - Europe/Jersey
        - Europe/Kaliningrad
        - Europe/Kyiv
        - Europe/Kirov
        - Europe/Lisbon
        - Europe/Ljubljana
        - Europe/London
        - Europe/Luxembourg
        - Europe/Madrid
        - Europe/Malta
        - Europe/Mariehamn
        - Europe/Minsk
        - Europe/Monaco
        - Europe/Moscow
        - Europe/Oslo
        - Europe/Paris
        - Europe/Podgorica
        - Europe/Prague
        - Europe/Riga
        - Europe/Rome
        - Europe/Samara
        - Europe/San_Marino
        - Europe/Sarajevo
        - Europe/Saratov
        - Europe/Simferopol
        - Europe/Skopje
        - Europe/Sofia
        - Europe/Stockholm
        - Europe/Tallinn
        - Europe/Tirane
        - Europe/Ulyanovsk
        - Europe/Uzhgorod
        - Europe/Vaduz
        - Europe/Vatican
        - Europe/Vienna
        - Europe/Vilnius
        - Europe/Volgograd
        - Europe/Warsaw
        - Europe/Zagreb
        - Europe/Zaporozhye
        - Europe/Zurich
        - Indian/Antananarivo
        - Indian/Chagos
        - Indian/Christmas
        - Indian/Cocos
        - Indian/Comoro
        - Indian/Kerguelen
        - Indian/Mahe
        - Indian/Maldives
        - Indian/Mauritius
        - Indian/Mayotte
        - Indian/Reunion
        - Pacific/Apia
        - Pacific/Auckland
        - Pacific/Bougainville
        - Pacific/Chatham
        - Pacific/Chuuk
        - Pacific/Easter
        - Pacific/Efate
        - Pacific/Enderbury
        - Pacific/Fakaofo
        - Pacific/Fiji
        - Pacific/Funafuti
        - Pacific/Galapagos
        - Pacific/Gambier
        - Pacific/Guadalcanal
        - Pacific/Guam
        - Pacific/Honolulu
        - Pacific/Kiritimati
        - Pacific/Kosrae
        - Pacific/Kwajalein
        - Pacific/Majuro
        - Pacific/Marquesas
        - Pacific/Midway
        - Pacific/Nauru
        - Pacific/Niue
        - Pacific/Norfolk
        - Pacific/Noumea
        - Pacific/Pago_Pago
        - Pacific/Palau
        - Pacific/Pitcairn
        - Pacific/Pohnpei
        - Pacific/Port_Moresby
        - Pacific/Rarotonga
        - Pacific/Saipan
        - Pacific/Tahiti
        - Pacific/Tarawa
        - Pacific/Tongatapu
        - Pacific/Wake
        - Pacific/Wallis
        - UTC
      x-enumNames:
        - AFRICA_ABIDJAN
        - AFRICA_ACCRA
        - AFRICA_ADDIS_ABABA
        - AFRICA_ALGIERS
        - AFRICA_ASMERA
        - AFRICA_BAMAKO
        - AFRICA_BANGUI
        - AFRICA_BANJUL
        - AFRICA_BISSAU
        - AFRICA_BLANTYRE
        - AFRICA_BRAZZAVILLE
        - AFRICA_BUJUMBURA
        - AFRICA_CAIRO
        - AFRICA_CASABLANCA
        - AFRICA_CEUTA
        - AFRICA_CONAKRY
        - AFRICA_DAKAR
        - AFRICA_DAR_ES_SALAAM
        - AFRICA_DJIBOUTI
        - AFRICA_DOUALA
        - AFRICA_EL_AAIUN
        - AFRICA_FREETOWN
        - AFRICA_GABORONE
        - AFRICA_HARARE
        - AFRICA_JOHANNESBURG
        - AFRICA_JUBA
        - AFRICA_KAMPALA
        - AFRICA_KHARTOUM
        - AFRICA_KIGALI
        - AFRICA_KINSHASA
        - AFRICA_LAGOS
        - AFRICA_LIBREVILLE
        - AFRICA_LOME
        - AFRICA_LUANDA
        - AFRICA_LUBUMBASHI
        - AFRICA_LUSAKA
        - AFRICA_MALABO
        - AFRICA_MAPUTO
        - AFRICA_MASERU
        - AFRICA_MBABANE
        - AFRICA_MOGADISHU
        - AFRICA_MONROVIA
        - AFRICA_NAIROBI
        - AFRICA_NDJAMENA
        - AFRICA_NIAMEY
        - AFRICA_NOUAKCHOTT
        - AFRICA_OUAGADOUGOU
        - AFRICA_PORTO_NOVO
        - AFRICA_SAO_TOME
        - AFRICA_TRIPOLI
        - AFRICA_TUNIS
        - AFRICA_WINDHOEK
        - AMERICA_ADAK
        - AMERICA_ANCHORAGE
        - AMERICA_ANGUILLA
        - AMERICA_ANTIGUA
        - AMERICA_ARAGUAINA
        - AMERICA_ARGENTINA_BUENOS_AIRES
        - AMERICA_ARGENTINA_CATAMARCA
        - AMERICA_ARGENTINA_CORDOBA
        - AMERICA_ARGENTINA_JUJUY
        - AMERICA_ARGENTINA_LA_RIOJA
        - AMERICA_ARGENTINA_MENDOZA
        - AMERICA_ARGENTINA_RIO_GALLEGOS
        - AMERICA_ARGENTINA_SALTA
        - AMERICA_ARGENTINA_SAN_JUAN
        - AMERICA_ARGENTINA_SAN_LUIS
        - AMERICA_ARGENTINA_TUCUMAN
        - AMERICA_ARGENTINA_USHUAIA
        - AMERICA_ARUBA
        - AMERICA_ASUNCION
        - AMERICA_ATIKOKAN
        - AMERICA_BAHIA
        - AMERICA_BAHIA_BANDERAS
        - AMERICA_BARBADOS
        - AMERICA_BELEM
        - AMERICA_BELIZE
        - AMERICA_BLANC_SABLON
        - AMERICA_BOA_VISTA
        - AMERICA_BOGOTA
        - AMERICA_BOISE
        - AMERICA_CAMBRIDGE_BAY
        - AMERICA_CAMPO_GRANDE
        - AMERICA_CANCUN
        - AMERICA_CARACAS
        - AMERICA_CAYENNE
        - AMERICA_CAYMAN
        - AMERICA_CHICAGO
        - AMERICA_CHIHUAHUA
        - AMERICA_COSTA_RICA
        - AMERICA_CRESTON
        - AMERICA_CUIABA
        - AMERICA_CURACAO
        - AMERICA_DANMARKSHAVN
        - AMERICA_DAWSON
        - AMERICA_DAWSON_CREEK
        - AMERICA_DENVER
        - AMERICA_DETROIT
        - AMERICA_DOMINICA
        - AMERICA_EDMONTON
        - AMERICA_EIRUNEPE
        - AMERICA_EL_SALVADOR
        - AMERICA_FORT_NELSON
        - AMERICA_FORTALEZA
        - AMERICA_GLACE_BAY
        - AMERICA_GOOSE_BAY
        - AMERICA_GRAND_TURK
        - AMERICA_GRENADA
        - AMERICA_GUADELOUPE
        - AMERICA_GUATEMALA
        - AMERICA_GUAYAQUIL
        - AMERICA_GUYANA
        - AMERICA_HALIFAX
        - AMERICA_HAVANA
        - AMERICA_HERMOSILLO
        - AMERICA_INDIANA_INDIANAPOLIS
        - AMERICA_INDIANA_KNOX
        - AMERICA_INDIANA_MARENGO
        - AMERICA_INDIANA_PETERSBURG
        - AMERICA_INDIANA_TELL_CITY
        - AMERICA_INDIANA_VEVAY
        - AMERICA_INDIANA_VINCENNES
        - AMERICA_INDIANA_WINAMAC
        - AMERICA_INUVIK
        - AMERICA_IQALUIT
        - AMERICA_JAMAICA
        - AMERICA_JUNEAU
        - AMERICA_KENTUCKY_LOUISVILLE
        - AMERICA_KENTUCKY_MONTICELLO
        - AMERICA_KRALENDIJK
        - AMERICA_LA_PAZ
        - AMERICA_LIMA
        - AMERICA_LOS_ANGELES
        - AMERICA_LOWER_PRINCES
        - AMERICA_MACEIO
        - AMERICA_MANAGUA
        - AMERICA_MANAUS
        - AMERICA_MARIGOT
        - AMERICA_MARTINIQUE
        - AMERICA_MATAMOROS
        - AMERICA_MAZATLAN
        - AMERICA_MENOMINEE
        - AMERICA_MERIDA
        - AMERICA_METLAKATLA
        - AMERICA_MEXICO_CITY
        - AMERICA_MIQUELON
        - AMERICA_MONCTON
        - AMERICA_MONTERREY
        - AMERICA_MONTEVIDEO
        - AMERICA_MONTSERRAT
        - AMERICA_NASSAU
        - AMERICA_NEW_YORK
        - AMERICA_NIPIGON
        - AMERICA_NOME
        - AMERICA_NORONHA
        - AMERICA_NORTH_DAKOTA_BEULAH
        - AMERICA_NORTH_DAKOTA_CENTER
        - AMERICA_NORTH_DAKOTA_NEW_SALEM
        - AMERICA_NUUK
        - AMERICA_OJINAGA
        - AMERICA_PANAMA
        - AMERICA_PANGNIRTUNG
        - AMERICA_PARAMARIBO
        - AMERICA_PHOENIX
        - AMERICA_PORT_AU_PRINCE
        - AMERICA_PORT_OF_SPAIN
        - AMERICA_PORTO_VELHO
        - AMERICA_PUERTO_RICO
        - AMERICA_PUNTA_ARENAS
        - AMERICA_RAINY_RIVER
        - AMERICA_RANKIN_INLET
        - AMERICA_RECIFE
        - AMERICA_REGINA
        - AMERICA_RESOLUTE
        - AMERICA_RIO_BRANCO
        - AMERICA_SANTAREM
        - AMERICA_SANTIAGO
        - AMERICA_SANTO_DOMINGO
        - AMERICA_SAO_PAULO
        - AMERICA_SCORESBYSUND
        - AMERICA_SITKA
        - AMERICA_ST_BARTHELEMY
        - AMERICA_ST_JOHNS
        - AMERICA_ST_KITTS
        - AMERICA_ST_LUCIA
        - AMERICA_ST_THOMAS
        - AMERICA_ST_VINCENT
        - AMERICA_SWIFT_CURRENT
        - AMERICA_TEGUCIGALPA
        - AMERICA_THULE
        - AMERICA_THUNDER_BAY
        - AMERICA_TIJUANA
        - AMERICA_TORONTO
        - AMERICA_TORTOLA
        - AMERICA_VANCOUVER
        - AMERICA_WHITEHORSE
        - AMERICA_WINNIPEG
        - AMERICA_YAKUTAT
        - AMERICA_YELLOWKNIFE
        - ANTARCTICA_CASEY
        - ANTARCTICA_DAVIS
        - ANTARCTICA_DUMONTDURVILLE
        - ANTARCTICA_MACQUARIE
        - ANTARCTICA_MAWSON
        - ANTARCTICA_MCMURDO
        - ANTARCTICA_PALMER
        - ANTARCTICA_ROTHERA
        - ANTARCTICA_SYOWA
        - ANTARCTICA_TROLL
        - ANTARCTICA_VOSTOK
        - ARCTIC_LONGYEARBYEN
        - ASIA_ADEN
        - ASIA_ALMATY
        - ASIA_AMMAN
        - ASIA_ANADYR
        - ASIA_AQTAU
        - ASIA_AQTOBE
        - ASIA_ASHGABAT
        - ASIA_ATYRAU
        - ASIA_BAGHDAD
        - ASIA_BAHRAIN
        - ASIA_BAKU
        - ASIA_BANGKOK
        - ASIA_BARNAUL
        - ASIA_BEIRUT
        - ASIA_BISHKEK
        - ASIA_BRUNEI
        - ASIA_CHITA
        - ASIA_CHOIBALSAN
        - ASIA_COLOMBO
        - ASIA_DAMASCUS
        - ASIA_DHAKA
        - ASIA_DILI
        - ASIA_DUBAI
        - ASIA_DUSHANBE
        - ASIA_FAMAGUSTA
        - ASIA_GAZA
        - ASIA_HEBRON
        - ASIA_HO_CHI_MINH
        - ASIA_HONG_KONG
        - ASIA_HOVD
        - ASIA_IRKUTSK
        - ASIA_JAKARTA
        - ASIA_JAYAPURA
        - ASIA_JERUSALEM
        - ASIA_KABUL
        - ASIA_KAMCHATKA
        - ASIA_KARACHI
        - ASIA_KATHMANDU
        - ASIA_KHANDYGA
        - ASIA_KOLKATA
        - ASIA_KRASNOYARSK
        - ASIA_KUALA_LUMPUR
        - ASIA_KUCHING
        - ASIA_KUWAIT
        - ASIA_MACAU
        - ASIA_MAGADAN
        - ASIA_MAKASSAR
        - ASIA_MANILA
        - ASIA_MUSCAT
        - ASIA_NICOSIA
        - ASIA_NOVOKUZNETSK
        - ASIA_NOVOSIBIRSK
        - ASIA_OMSK
        - ASIA_ORAL
        - ASIA_PHNOM_PENH
        - ASIA_PONTIANAK
        - ASIA_PYONGYANG
        - ASIA_QATAR
        - ASIA_QOSTANAY
        - ASIA_QYZYLORDA
        - ASIA_RIYADH
        - ASIA_SAKHALIN
        - ASIA_SAMARKAND
        - ASIA_SEOUL
        - ASIA_SHANGHAI
        - ASIA_SINGAPORE
        - ASIA_SREDNEKOLYMSK
        - ASIA_TAIPEI
        - ASIA_TASHKENT
        - ASIA_TBILISI
        - ASIA_TEHRAN
        - ASIA_THIMPHU
        - ASIA_TOKYO
        - ASIA_TOMSK
        - ASIA_ULAANBAATAR
        - ASIA_URUMQI
        - ASIA_UST_NERA
        - ASIA_VIENTIANE
        - ASIA_VLADIVOSTOK
        - ASIA_YAKUTSK
        - ASIA_YANGON
        - ASIA_YEKATERINBURG
        - ASIA_YEREVAN
        - ATLANTIC_AZORES
        - ATLANTIC_BERMUDA
        - ATLANTIC_CANARY
        - ATLANTIC_CAPE_VERDE
        - ATLANTIC_FAROE
        - ATLANTIC_MADEIRA
        - ATLANTIC_REYKJAVIK
        - ATLANTIC_SOUTH_GEORGIA
        - ATLANTIC_ST_HELENA
        - ATLANTIC_STANLEY
        - AUSTRALIA_ADELAIDE
        - AUSTRALIA_BRISBANE
        - AUSTRALIA_BROKEN_HILL
        - AUSTRALIA_DARWIN
        - AUSTRALIA_EUCLA
        - AUSTRALIA_HOBART
        - AUSTRALIA_LINDEMAN
        - AUSTRALIA_LORD_HOWE
        - AUSTRALIA_MELBOURNE
        - AUSTRALIA_PERTH
        - AUSTRALIA_SYDNEY
        - EUROPE_AMSTERDAM
        - EUROPE_ANDORRA
        - EUROPE_ASTRAKHAN
        - EUROPE_ATHENS
        - EUROPE_BELGRADE
        - EUROPE_BERLIN
        - EUROPE_BRATISLAVA
        - EUROPE_BRUSSELS
        - EUROPE_BUCHAREST
        - EUROPE_BUDAPEST
        - EUROPE_BUSINGEN
        - EUROPE_CHISINAU
        - EUROPE_COPENHAGEN
        - EUROPE_DUBLIN
        - EUROPE_GIBRALTAR
        - EUROPE_GUERNSEY
        - EUROPE_HELSINKI
        - EUROPE_ISLE_OF_MAN
        - EUROPE_ISTANBUL
        - EUROPE_JERSEY
        - EUROPE_KALININGRAD
        - EUROPE_KYIV
        - EUROPE_KIROV
        - EUROPE_LISBON
        - EUROPE_LJUBLJANA
        - EUROPE_LONDON
        - EUROPE_LUXEMBOURG
        - EUROPE_MADRID
        - EUROPE_MALTA
        - EUROPE_MARIEHAMN
        - EUROPE_MINSK
        - EUROPE_MONACO
        - EUROPE_MOSCOW
        - EUROPE_OSLO
        - EUROPE_PARIS
        - EUROPE_PODGORICA
        - EUROPE_PRAGUE
        - EUROPE_RIGA
        - EUROPE_ROME
        - EUROPE_SAMARA
        - EUROPE_SAN_MARINO
        - EUROPE_SARAJEVO
        - EUROPE_SARATOV
        - EUROPE_SIMFEROPOL
        - EUROPE_SKOPJE
        - EUROPE_SOFIA
        - EUROPE_STOCKHOLM
        - EUROPE_TALLINN
        - EUROPE_TIRANE
        - EUROPE_ULYANOVSK
        - EUROPE_UZHGOROD
        - EUROPE_VADUZ
        - EUROPE_VATICAN
        - EUROPE_VIENNA
        - EUROPE_VILNIUS
        - EUROPE_VOLGOGRAD
        - EUROPE_WARSAW
        - EUROPE_ZAGREB
        - EUROPE_ZAPOROZHYE
        - EUROPE_ZURICH
        - INDIAN_ANTANANARIVO
        - INDIAN_CHAGOS
        - INDIAN_CHRISTMAS
        - INDIAN_COCOS
        - INDIAN_COMORO
        - INDIAN_KERGUELEN
        - INDIAN_MAHE
        - INDIAN_MALDIVES
        - INDIAN_MAURITIUS
        - INDIAN_MAYOTTE
        - INDIAN_REUNION
        - PACIFIC_APIA
        - PACIFIC_AUCKLAND
        - PACIFIC_BOUGAINVILLE
        - PACIFIC_CHATHAM
        - PACIFIC_CHUUK
        - PACIFIC_EASTER
        - PACIFIC_EFATE
        - PACIFIC_ENDERBURY
        - PACIFIC_FAKAOFO
        - PACIFIC_FIJI
        - PACIFIC_FUNAFUTI
        - PACIFIC_GALAPAGOS
        - PACIFIC_GAMBIER
        - PACIFIC_GUADALCANAL
        - PACIFIC_GUAM
        - PACIFIC_HONOLULU
        - PACIFIC_KIRITIMATI
        - PACIFIC_KOSRAE
        - PACIFIC_KWAJALEIN
        - PACIFIC_MAJURO
        - PACIFIC_MARQUESAS
        - PACIFIC_MIDWAY
        - PACIFIC_NAURU
        - PACIFIC_NIUE
        - PACIFIC_NORFOLK
        - PACIFIC_NOUMEA
        - PACIFIC_PAGO_PAGO
        - PACIFIC_PALAU
        - PACIFIC_PITCAIRN
        - PACIFIC_POHNPEI
        - PACIFIC_PORT_MORESBY
        - PACIFIC_RAROTONGA
        - PACIFIC_SAIPAN
        - PACIFIC_TAHITI
        - PACIFIC_TARAWA
        - PACIFIC_TONGATAPU
        - PACIFIC_WAKE
        - PACIFIC_WALLIS
        - UTC
    STTSettings:
      oneOf:
        - $ref: '#/components/schemas/ElevenLabsSTTSettings'
        - $ref: '#/components/schemas/DeepgramSTTSettings'
        - $ref: '#/components/schemas/AssemblyAISTTSettings'
        - $ref: '#/components/schemas/CartesiaSTTSettings'
        - $ref: '#/components/schemas/GladiaSTTSettings'
        - $ref: '#/components/schemas/GoogleSTTSettings'
        - $ref: '#/components/schemas/SonioxSTTSettings'
    VoiceSettings:
      oneOf:
        - $ref: '#/components/schemas/AmazonVoiceSettings'
        - $ref: '#/components/schemas/GoogleVoiceSettings'
        - $ref: '#/components/schemas/CartesiaVoiceSettings'
        - $ref: '#/components/schemas/RimelabsVoiceSettings'
        - $ref: '#/components/schemas/SonioxVoiceSettings'
        - $ref: '#/components/schemas/MicrosoftVoiceSettings'
        - $ref: '#/components/schemas/ElevenLabsVoiceSettings'
    PronunciationDictionaryEntry:
      type: object
      properties:
        from:
          type: string
          minLength: 1
          maxLength: 128
        to:
          type: string
          maxLength: 128
      required:
        - from
        - to
    BackgroundAudioSettings:
      type: object
      properties:
        volume:
          default: 0.75
          type: number
          minimum: 0
          maximum: 1
    VoiceKeypadSettings:
      type: object
      properties:
        enabled:
          type: boolean
        delimiter:
          maxItems: 2
          type: array
          items:
            $ref: '#/components/schemas/DTMFDelimiter'
        timeoutInSeconds:
          type: number
      required:
        - enabled
        - delimiter
        - timeoutInSeconds
    VoiceMaxDurationSettings:
      type: object
      properties:
        enabled:
          type: boolean
        seconds:
          nullable: true
          type: number
        message:
          nullable: true
          type: string
      required:
        - enabled
        - seconds
        - message
    WidgetSettingsWidgetType:
      type: string
      enum:
        - chat
        - voice
      x-enumNames:
        - CHAT
        - VOICE
    WidgetSettingsChatSettings:
      type: object
      properties:
        renderMode:
          $ref: '#/components/schemas/WidgetSettingsChatRenderMode'
        headerImage:
          $ref: '#/components/schemas/WidgetSettingsChatSettingsHeaderImage'
        agentImage:
          $ref: '#/components/schemas/WidgetSettingsChatSettingsAgentImage'
        banner:
          $ref: '#/components/schemas/WidgetSettingsChatSettingsBanner'
        placeholderText:
          type: string
        disclaimer:
          allOf:
            - $ref: '#/components/schemas/WidgetSettingsChatDisclaimer'
        aiDisclaimer:
          $ref: '#/components/schemas/WidgetSettingsChatSettingsAIDisclaimer'
        handoffToAgentImageURL:
          nullable: true
          type: string
        streamingDisabled:
          type: boolean
        responseLoader:
          allOf:
            - $ref: '#/components/schemas/WidgetSettingsChatSettingsResponseLoader'
        voiceInput:
          type: boolean
        voiceOutput:
          type: boolean
        voiceOutputMuted:
          type: boolean
        voiceMode:
          type: boolean
        fileUpload:
          allOf:
            - $ref: '#/components/schemas/WidgetSettingsChatSettingsFileUpload'
      required:
        - renderMode
        - headerImage
        - agentImage
        - banner
        - placeholderText
        - aiDisclaimer
        - voiceInput
        - voiceOutput
    WidgetSettingsVoiceSettings:
      type: object
      properties:
        renderMode:
          $ref: '#/components/schemas/WidgetSettingsVoiceRenderMode'
        content:
          $ref: '#/components/schemas/WidgetSettingsVoiceSettingsContent'
      required:
        - renderMode
        - content
    WidgetSettingsCommonSettings:
      type: object
      properties:
        sideSpacing:
          type: string
        bottomSpacing:
          type: string
        width:
          type: string
        position:
          $ref: '#/components/schemas/WidgetSettingsWidgetPosition'
        fontFamily:
          type: string
        primaryColor:
          $ref: '#/components/schemas/WidgetSettingsPrimaryColor'
        poweredBy:
          type: boolean
        launcher:
          $ref: '#/components/schemas/WidgetSettingsCommonSettingsLauncher'
        footerLink:
          $ref: '#/components/schemas/WidgetSettingsCommonSettingsFooterLink'
        persistence:
          $ref: '#/components/schemas/WidgetSettingsChatPersistence'
        featureFlags:
          allOf:
            - $ref: '#/components/schemas/WidgetSettingsCommonSettingsFeatureFlags'
      required:
        - sideSpacing
        - bottomSpacing
        - position
        - fontFamily
        - primaryColor
        - poweredBy
        - launcher
        - footerLink
        - persistence
    WidgetSettingsSecuritySettings:
      type: object
      properties:
        approvedDomains:
          $ref: '#/components/schemas/WidgetSettingsSecuritySettingsApprovedDomains'
        disableTranscript:
          type: boolean
        isTranscriptDownloadEnabled:
          type: boolean
      required:
        - approvedDomains
        - disableTranscript
    VersionSettingsSessionIdleTimeout:
      type: object
      properties:
        enabled:
          type: boolean
        timeoutMs:
          type: number
      required:
        - enabled
        - timeoutMs
    ProjectFramework:
      type: string
      enum:
        - agentic
        - conversation
      x-enumNames:
        - AGENTIC
        - CONVERSATION
    VersionSettingsAnalyticsEstimatedSavings:
      type: object
      properties:
        resolutionRate:
          allOf:
            - $ref: >-
                #/components/schemas/VersionSettingsAnalyticsEstimatedSavingsValue
        deflectionRate:
          allOf:
            - $ref: >-
                #/components/schemas/VersionSettingsAnalyticsEstimatedSavingsValue
    CrewNodeDataFlow:
      type: object
      properties:
        flowID:
          type: string
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ExpressionCondition'
        description:
          nullable: true
          type: string
        requiredVariables:
          type: array
          items:
            $ref: '#/components/schemas/CrewNodeDataRequiredVariable'
      required:
        - flowID
        - description
    CrewNodeDataAgent:
      type: object
      properties:
        agentID:
          type: string
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ExpressionCondition'
        description:
          nullable: true
          type: string
        requiredVariables:
          type: array
          items:
            $ref: '#/components/schemas/CrewNodeDataRequiredVariable'
      required:
        - agentID
        - description
    FallbackMapping:
      type: object
      additionalProperties:
        type: object
        additionalProperties:
          type: object
          properties:
            provider:
              $ref: '#/components/schemas/AIProvider'
            model:
              $ref: '#/components/schemas/AIModel'
          required:
            - provider
            - model
    VersionSettingsGlobalNoReplyStatic:
      type: object
      properties:
        delay:
          nullable: true
          type: number
        enabled:
          type: boolean
        maxRetries:
          type: number
        type:
          type: string
          enum:
            - static
          x-enumNames:
            - STATIC
        prompt:
          $ref: '#/components/schemas/Markup'
      required:
        - delay
        - enabled
        - prompt
    VersionSettingsGlobalNoReplyGenerative:
      type: object
      properties:
        delay:
          nullable: true
          type: number
        enabled:
          type: boolean
        maxRetries:
          type: number
        type:
          type: string
          enum:
            - generative
          x-enumNames:
            - GENERATIVE
        settings:
          type: object
          properties:
            model:
              allOf:
                - $ref: '#/components/schemas/AIModel'
            system:
              type: string
            maxTokens:
              type: number
            temperature:
              type: number
            reasoningEffort:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AIReasoningEffort'
      required:
        - delay
        - enabled
        - type
        - settings
    VersionSettingsGlobalNoMatchStatic:
      type: object
      properties:
        type:
          type: string
          enum:
            - static
          x-enumNames:
            - STATIC
        prompt:
          $ref: '#/components/schemas/Markup'
      required:
        - type
        - prompt
    VersionSettingsGlobalNoMatchGenerative:
      type: object
      properties:
        type:
          type: string
          enum:
            - generative
          x-enumNames:
            - GENERATIVE
        settings:
          type: object
          properties:
            model:
              allOf:
                - $ref: '#/components/schemas/AIModel'
            system:
              type: string
            maxTokens:
              type: number
            temperature:
              type: number
            reasoningEffort:
              nullable: true
              allOf:
                - $ref: '#/components/schemas/AIReasoningEffort'
      required:
        - type
        - settings
    IntentClassificationLLMSettings:
      type: object
      properties:
        type:
          type: string
          enum:
            - llm
          x-enumNames:
            - LLM
        params:
          $ref: '#/components/schemas/IntentAIParams'
        promptWrapper:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIPromptWrapper'
      required:
        - type
        - params
        - promptWrapper
    IntentClassificationNLUSettings:
      type: object
      properties:
        type:
          type: string
          enum:
            - nlu
          x-enumNames:
            - NLU
        params:
          type: object
          properties:
            confidence:
              type: number
          required:
            - confidence
      required:
        - type
        - params
    IntentClassificationRAGSettings:
      type: object
      properties:
        type:
          type: string
          enum:
            - rag
          x-enumNames:
            - RAG
        params:
          $ref: '#/components/schemas/IntentAIParams'
        promptWrapper:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIPromptWrapper'
      required:
        - type
        - params
        - promptWrapper
    VersionSlotType:
      type: object
      properties:
        value:
          type: string
    VersionIntentSlot:
      type: object
      properties:
        id:
          type: string
        dialog:
          $ref: '#/components/schemas/VersionIntentSlotDialog'
        required:
          type: boolean
      required:
        - id
        - dialog
        - required
    VersionIntentInput:
      type: object
      properties:
        text:
          type: string
        slots:
          type: array
          items:
            type: string
        voice:
          type: string
      required:
        - text
    DeepgramASRSettings:
      type: object
      properties:
        punctuationWaitMS:
          type: number
        partialWaitMS:
          type: number
        silenceWaitMS:
          type: number
        interruptionWaitWords:
          type: number
        audioCue:
          nullable: true
          type: number
        backgroundAudio:
          nullable: true
          type: string
        locale:
          allOf:
            - $ref: '#/components/schemas/DeepgramSTTLanguage'
        keywords:
          type: string
    AIParams:
      type: object
      properties:
        stop:
          type: array
          items:
            type: string
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        system:
          type: string
        maxTokens:
          type: number
        temperature:
          type: number
        responseFormat:
          type: string
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
        realtime:
          type: object
          properties:
            voice:
              type: string
            eagerness:
              type: string
        webSearch:
          type: object
          properties:
            allowedDomains:
              nullable: true
              type: array
              items:
                type: string
    LegacyCanvasNodeVisibility:
      type: string
      enum:
        - preview
        - all-variants
      x-enumNames:
        - PREVIEW
        - ALL_VARIANTS
    CompiledAgentSkipTurnTool:
      type: object
      properties:
        enabled:
          type: boolean
        description:
          type: string
      required:
        - enabled
        - description
    CompiledAgentAPITool:
      type: object
      properties:
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        apiToolID:
          type: string
        description:
          nullable: true
          type: string
        asyncExecution:
          default: false
          type: boolean
        variables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledToolNodeDataVariable'
        captureResponse:
          type: object
          additionalProperties:
            type: string
        capturePropertyResponse:
          type: object
          additionalProperties:
            type: string
        toolSound:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        captureInputVariables:
          type: object
          additionalProperties:
            type: string
        captureInputProperties:
          type: object
          additionalProperties:
            type: string
      required:
        - apiToolID
        - description
        - variables
    CompiledAgentFlowTool:
      type: object
      properties:
        id:
          type: string
        flowID:
          type: string
        description:
          nullable: true
          type: string
        variables:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentFlowToolVariable'
      required:
        - id
        - flowID
        - description
        - variables
    CompiledAgentPathTool:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
          maxLength: 255
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        description:
          nullable: true
          type: string
        variables:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentPathToolVariable'
        toolName:
          type: string
        hasToolNameWarning:
          type: boolean
      required:
        - id
        - name
        - description
        - variables
    CompiledAgentFunctionTool:
      type: object
      properties:
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        functionID:
          type: string
        description:
          nullable: true
          type: string
        asyncExecution:
          default: false
          type: boolean
        variables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledToolNodeDataVariable'
        captureResponse:
          type: object
          additionalProperties:
            type: string
        capturePropertyResponse:
          type: object
          additionalProperties:
            type: string
        toolSound:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        captureInputVariables:
          type: object
          additionalProperties:
            type: string
        captureInputProperties:
          type: object
          additionalProperties:
            type: string
      required:
        - functionID
        - description
        - variables
    CompiledAgentCallForwardTool:
      type: object
      properties:
        enabled:
          type: boolean
        address:
          type: string
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        extension:
          type: string
        description:
          type: string
        addressType:
          $ref: '#/components/schemas/CallForwardAddressType'
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        callerIDPassthrough:
          type: boolean
      required:
        - enabled
        - address
        - description
        - addressType
    CompiledAgentIntegrationTool:
      type: object
      properties:
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        description:
          nullable: true
          type: string
        integrationToolID:
          type: string
        extendedInputVariables:
          nullable: true
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ToolExtendedInputVariable'
        variables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledToolNodeDataVariable'
        captureResponse:
          type: object
          additionalProperties:
            type: string
        capturePropertyResponse:
          type: object
          additionalProperties:
            type: string
        toolSound:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        captureInputVariables:
          type: object
          additionalProperties:
            type: string
        captureInputProperties:
          type: object
          additionalProperties:
            type: string
      required:
        - description
        - integrationToolID
        - variables
    CompiledAgentKnowledgeBaseTool:
      type: object
      properties:
        query:
          nullable: true
          type: string
        enabled:
          type: boolean
        filters:
          type: array
          items:
            $ref: '#/components/schemas/CompiledAgentKnowledgeBaseMetadataKeyFilter'
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        chunkLimit:
          nullable: true
          type: number
        queryMode:
          allOf:
            - $ref: '#/components/schemas/AgentKnowledgeBaseToolQueryMode'
        sourceUrlsCount:
          nullable: true
          type: number
        description:
          type: string
        toolSound:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
      required:
        - enabled
        - description
    CompiledAgentMcpIntegrationTool:
      type: object
      properties:
        messages:
          default: null
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentToolMessages'
        description:
          nullable: true
          type: string
        variables:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CompiledToolNodeDataVariable'
        captureResponse:
          type: object
          additionalProperties:
            type: string
        capturePropertyResponse:
          type: object
          additionalProperties:
            type: string
        toolSound:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/ToolNodeDataToolSound'
        captureInputVariables:
          type: object
          additionalProperties:
            type: string
        captureInputProperties:
          type: object
          additionalProperties:
            type: string
        mcpIntegrationToolID:
          type: string
      required:
        - description
        - variables
        - mcpIntegrationToolID
    AIMessageSimple:
      type: object
      properties:
        cachePoint:
          type: object
          properties:
            type:
              type: string
              enum:
                - default
              x-enumNames:
                - DEFAULT
          required:
            - type
        role:
          $ref: '#/components/schemas/AIMessageSimpleRole'
        content:
          anyOf:
            - type: string
            - type: array
              items:
                $ref: '#/components/schemas/ContentPart'
        attachments:
          type: array
          items:
            $ref: '#/components/schemas/FileAttachmentMetadata'
      required:
        - role
        - content
    ApiNodeDataKeyValue:
      type: object
      properties:
        key:
          type: string
        val:
          type: string
      required:
        - key
        - val
    APINodeMethodType:
      type: string
      enum:
        - GET
        - PUT
        - POST
        - PATCH
        - DELETE
      x-enumNames:
        - GET
        - PUT
        - POST
        - PATCH
        - DELETE
    APINodeBodyType:
      type: string
      enum:
        - formData
        - rawInput
        - urlEncoded
      x-enumNames:
        - FORM_DATA
        - RAW_INPUT
        - URL_ENCODED
    APINodeActionType:
      type: string
      enum:
        - Make a GET Request
        - Make a PUT Request
        - Make a POST Request
        - Make a PATCH Request
        - Make a DELETE Request
      x-enumNames:
        - GET
        - PUT
        - POST
        - PATCH
        - DELETE
    CompiledAPIToolInputVariable:
      type: object
      properties:
        description:
          nullable: true
          type: string
      required:
        - description
    CompiledResponseMessage:
      type: object
      properties:
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AnyCompiledCondition'
        data:
          $ref: '#/components/schemas/CompiledResponseMessageData'
      required:
        - condition
        - data
    CompiledCrewNodeDataFlow:
      type: object
      properties:
        flowID:
          type: string
        description:
          nullable: true
          type: string
        requiredVariables:
          type: array
          items:
            $ref: '#/components/schemas/CompiledCrewNodeDataRequiredVariable'
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/CompiledValueVariableCondition'
      required:
        - flowID
        - description
    CompiledCrewNodeDataAgent:
      type: object
      properties:
        agentID:
          type: string
        description:
          nullable: true
          type: string
        requiredVariables:
          type: array
          items:
            $ref: '#/components/schemas/CompiledCrewNodeDataRequiredVariable'
        condition:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/CompiledValueVariableCondition'
      required:
        - agentID
        - description
    CodeText:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/MarkupVariableReference'
          - $ref: '#/components/schemas/MarkupEntityReference'
    ConditionPromptAssertion:
      type: object
      properties:
        key:
          type: string
        lhs:
          allOf:
            - $ref: '#/components/schemas/PromptConditionAssertionLhs'
        rhs:
          $ref: '#/components/schemas/Markup'
        operation:
          default: is
          allOf:
            - $ref: '#/components/schemas/ConditionOperation'
      required:
        - key
        - rhs
    ConditionAssertion:
      type: object
      properties:
        key:
          type: string
        lhs:
          $ref: '#/components/schemas/ConditionAssertionLhs'
        rhs:
          $ref: '#/components/schemas/Markup'
        operation:
          default: is
          allOf:
            - $ref: '#/components/schemas/ConditionOperation'
      required:
        - key
        - lhs
        - rhs
    APIToolContentType:
      type: string
      enum:
        - text
        - json
        - xml
      x-enumNames:
        - TEXT
        - JSON
        - XML
    ToolSimulationTurnTestPayloadTool:
      oneOf:
        - $ref: '#/components/schemas/NativeToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/ApiCallToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/FunctionToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/IntegrationToolSimulationTurnTestPayload'
        - $ref: '#/components/schemas/McpIntegrationToolSimulationTurnTestPayload'
    SimulationTurnTestResourceType:
      type: string
      enum:
        - flow
        - agent
      x-enumNames:
        - FLOW
        - AGENT
    SimulationTurnTestJudgeEqual:
      type: object
      properties:
        type:
          type: string
          enum:
            - equal
          x-enumNames:
            - EQUAL
        value:
          type: string
      required:
        - type
        - value
    SimulationTurnTestJudgeLLMEval:
      type: object
      properties:
        type:
          type: string
          enum:
            - llm_eval
          x-enumNames:
            - LLM_EVAL
        prompt:
          type: string
      required:
        - type
        - prompt
    KnowledgeBaseDocumentStatus:
      type: string
      enum:
        - ERROR
        - PENDING
        - SUCCESS
        - INITIALIZED
      x-enumNames:
        - ERROR
        - PENDING
        - SUCCESS
        - INITIALIZED
    KBDocumentUrlData:
      type: object
      properties:
        type:
          type: string
          enum:
            - url
          x-enumNames:
            - URL
        name:
          type: string
        url:
          type: string
        refreshRate:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseDocumentRefreshRate'
        lastSuccessUpdate:
          type: string
        accessTokenID:
          type: number
        integrationExternalID:
          type: string
        source:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseDocumentIntegrationType'
      required:
        - type
        - name
        - url
    KBDocumentDocxData:
      type: object
      properties:
        type:
          type: string
          enum:
            - docx
          x-enumNames:
            - DOCX
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentPDFData:
      type: object
      properties:
        type:
          type: string
          enum:
            - pdf
          x-enumNames:
            - PDF
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentTextData:
      type: object
      properties:
        type:
          type: string
          enum:
            - text
          x-enumNames:
            - TEXT
        name:
          type: string
        canEdit:
          type: boolean
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentMarkdownData:
      type: object
      properties:
        type:
          type: string
          enum:
            - md
          x-enumNames:
            - MD
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentCSVData:
      type: object
      properties:
        type:
          type: string
          enum:
            - csv
          x-enumNames:
            - CSV
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentXLSXData:
      type: object
      properties:
        type:
          type: string
          enum:
            - xlsx
          x-enumNames:
            - XLSX
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentTableData:
      type: object
      properties:
        type:
          type: string
          enum:
            - table
          x-enumNames:
            - TABLE
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
        - rowsCount
    DocumentMetadataValue:
      type: object
      properties:
        value:
          type: string
        id:
          type: string
      required:
        - value
        - id
    AnyProgramEvent:
      anyOf:
        - $ref: '#/components/schemas/IntentProgramEvent'
        - $ref: '#/components/schemas/EventProgramEvent'
        - $ref: '#/components/schemas/GeneralProgramEvent'
    ElevenLabsSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - elevenlabs
          x-enumNames:
            - ELEVENLABS
        model:
          $ref: '#/components/schemas/ElevenLabsSTTModel'
        language:
          $ref: '#/components/schemas/ElevenLabsSTTLanguage'
        commitStrategy:
          type: string
          enum:
            - vad
            - manual
          x-enumNames:
            - VAD
            - MANUAL
        vadSilenceThresholdSecs:
          type: number
          minimum: 0.3
          maximum: 3
        vadThreshold:
          type: number
          minimum: 0.1
          maximum: 0.9
        minSpeechDurationMS:
          type: number
          minimum: 50
          maximum: 2000
        minSilenceDurationMS:
          type: number
          minimum: 50
          maximum: 2000
      required:
        - provider
        - model
        - language
    DeepgramSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - deepgram
          x-enumNames:
            - DEEPGRAM
        model:
          allOf:
            - $ref: '#/components/schemas/DeepgramSTTModel'
        locale:
          allOf:
            - $ref: '#/components/schemas/DeepgramSTTLanguage'
        keywords:
          type: string
        partialWaitMS:
          type: number
        silenceWaitMS:
          type: number
        punctuationWaitMS:
          type: number
        interruptionWaitWords:
          type: number
        EOTTimeout:
          type: number
        EOTThreshold:
          type: number
        languageHints:
          type: array
          items:
            $ref: '#/components/schemas/DeepgramSTTLanguage'
      required:
        - provider
    AssemblyAISTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - assemblyai
          x-enumNames:
            - ASSEMBLYAI
        model:
          allOf:
            - $ref: '#/components/schemas/AssemblyAISTTModel'
        mode:
          allOf:
            - $ref: '#/components/schemas/AssemblyAISTTMode'
        language:
          allOf:
            - $ref: '#/components/schemas/AssemblyAISTTLanguage'
        keyterms:
          type: string
        confidenceThreshold:
          default: 0.7
          type: number
        maxTurnSilence:
          default: 2400
          type: number
        minTurnSilence:
          default: 160
          type: number
      required:
        - provider
    CartesiaSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - cartesia
          x-enumNames:
            - CARTESIA
        model:
          $ref: '#/components/schemas/CartesiaSTTModel'
        language:
          $ref: '#/components/schemas/CartesiaSTTLanguage'
      required:
        - provider
        - model
        - language
    GladiaSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - gladia
          x-enumNames:
            - GLADIA
        model:
          $ref: '#/components/schemas/GladiaSTTModel'
        endpointing:
          type: number
        maxDurationWithoutEndpointing:
          type: number
        languages:
          type: array
          items:
            $ref: '#/components/schemas/GladiaSTTLanguage'
      required:
        - provider
        - model
        - endpointing
        - maxDurationWithoutEndpointing
        - languages
    GoogleSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - google
          x-enumNames:
            - GOOGLE
        model:
          $ref: '#/components/schemas/GoogleSTTModel'
        languages:
          type: array
          items:
            $ref: '#/components/schemas/GoogleSTTLanguage'
      required:
        - provider
        - model
        - languages
    SonioxSTTSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - soniox
          x-enumNames:
            - SONIOX
        model:
          $ref: '#/components/schemas/SonioxSTTModel'
        maxEndpointDelayMS:
          type: integer
          minimum: 500
          maximum: 3000
        endpointSensitivity:
          type: number
          minimum: -1
          maximum: 1
        languages:
          type: array
          items:
            $ref: '#/components/schemas/SonioxSTTLanguage'
      required:
        - provider
        - model
        - languages
    AmazonVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - amazon
          x-enumNames:
            - AMAZON
        voice:
          type: string
      required:
        - provider
        - voice
    GoogleVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - google
          x-enumNames:
            - GOOGLE
        model:
          allOf:
            - $ref: '#/components/schemas/GoogleTTSModelID'
        languageCode:
          type: string
        voice:
          type: string
        settings:
          type: object
          properties:
            prompt:
              type: string
      required:
        - provider
        - voice
    CartesiaVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - cartesia
          x-enumNames:
            - CARTESIA
        model:
          type: string
        voice:
          type: string
        settings:
          type: object
          properties:
            speed:
              type: number
              minimum: 0.6
              maximum: 1.5
      required:
        - provider
        - model
        - voice
    RimelabsVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - rimelabs
          x-enumNames:
            - RIMELABS
        model:
          type: string
        voice:
          type: string
      required:
        - provider
        - voice
    SonioxVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - soniox
          x-enumNames:
            - SONIOX
        model:
          type: string
        voice:
          type: string
        language:
          type: string
      required:
        - provider
        - voice
    MicrosoftVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - microsoft
          x-enumNames:
            - MICROSOFT
        voice:
          type: string
      required:
        - provider
        - voice
    ElevenLabsVoiceSettings:
      type: object
      properties:
        provider:
          type: string
          enum:
            - elevenlabs
          x-enumNames:
            - ELEVENLABS
        model:
          type: string
        voice:
          type: string
        useCustomVoice:
          type: boolean
        settings:
          type: object
          properties:
            speed:
              type: number
              minimum: 0.7
              maximum: 1.3
            style:
              type: number
              minimum: 0
              maximum: 1
            stability:
              type: number
              minimum: 0
              maximum: 1
            speaker_boost:
              type: boolean
            similarity_boost:
              type: number
              minimum: 0
              maximum: 1
        pronunciation_dictionaries:
          type: array
          items:
            type: object
            properties:
              pronunciation_dictionary_id:
                type: string
              version_id:
                type: string
            required:
              - pronunciation_dictionary_id
      required:
        - provider
        - model
        - voice
        - settings
    DTMFDelimiter:
      type: string
      enum:
        - '#'
        - '*'
      x-enumNames:
        - '#'
        - '*'
    WidgetSettingsChatRenderMode:
      type: string
      enum:
        - embed
        - widget
        - popover
      x-enumNames:
        - EMBED
        - WIDGET
        - POPOVER
    WidgetSettingsChatSettingsHeaderImage:
      type: object
      properties:
        enabled:
          type: boolean
        url:
          nullable: true
          type: string
      required:
        - enabled
    WidgetSettingsChatSettingsAgentImage:
      type: object
      properties:
        enabled:
          type: boolean
        url:
          nullable: true
          type: string
      required:
        - enabled
    WidgetSettingsChatSettingsBanner:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
        enabled:
          type: boolean
        imageURL:
          nullable: true
          type: string
      required:
        - title
        - description
        - enabled
    WidgetSettingsChatDisclaimer:
      type: object
      properties:
        enabled:
          type: boolean
        title:
          type: string
        description:
          type: string
        primaryButtonText:
          type: string
        secondaryButtonText:
          type: string
        secondaryButtonURL:
          type: string
      required:
        - enabled
        - title
        - description
        - primaryButtonText
        - secondaryButtonText
        - secondaryButtonURL
    WidgetSettingsChatSettingsAIDisclaimer:
      type: object
      properties:
        text:
          type: string
        enabled:
          type: boolean
      required:
        - text
        - enabled
    WidgetSettingsChatSettingsResponseLoader:
      oneOf:
        - $ref: '#/components/schemas/WidgetSettingsChatSettingsResponseLoaderDots'
        - $ref: >-
            #/components/schemas/WidgetSettingsChatSettingsResponseLoaderSpinnerWithText
    WidgetSettingsChatSettingsFileUpload:
      type: object
      properties:
        enabled:
          type: boolean
        maxFilesPerConversation:
          nullable: true
          type: number
      required:
        - enabled
    WidgetSettingsVoiceRenderMode:
      type: string
      enum:
        - full
        - compact
        - expand
      x-enumNames:
        - FULL
        - COMPACT
        - EXPAND
    WidgetSettingsVoiceSettingsContent:
      type: object
      properties:
        imageURL:
          nullable: true
          type: string
        talkingText:
          type: string
        endButtonText:
          type: string
        listeningText:
          type: string
        startButtonText:
          type: string
        callToActionText:
          type: string
      required:
        - talkingText
        - endButtonText
        - listeningText
        - startButtonText
        - callToActionText
    WidgetSettingsWidgetPosition:
      type: string
      enum:
        - right
        - left
      x-enumNames:
        - RIGHT
        - LEFT
    WidgetSettingsPrimaryColor:
      type: object
      properties:
        color:
          type: string
        palette:
          $ref: '#/components/schemas/WidgetSettingsColorPalette'
      required:
        - color
        - palette
    WidgetSettingsCommonSettingsLauncher:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WidgetSettingsLauncherType'
        text:
          type: string
        imageURL:
          nullable: true
          type: string
      required:
        - type
    WidgetSettingsCommonSettingsFooterLink:
      type: object
      properties:
        enabled:
          type: boolean
        text:
          type: string
        url:
          type: string
      required:
        - enabled
    WidgetSettingsChatPersistence:
      type: string
      enum:
        - memory
        - localStorage
        - sessionStorage
      x-enumNames:
        - MEMORY
        - LOCAL_STORAGE
        - SESSION_STORAGE
    WidgetSettingsCommonSettingsFeatureFlags:
      type: object
      additionalProperties:
        type: boolean
    WidgetSettingsSecuritySettingsApprovedDomains:
      type: object
      properties:
        enabled:
          type: boolean
        domains:
          type: string
      required:
        - enabled
        - domains
    VersionSettingsAnalyticsEstimatedSavingsValue:
      type: object
      properties:
        minutes:
          type: number
        dollars:
          type: number
    CrewNodeDataRequiredVariable:
      type: object
      properties:
        id:
          type: string
        description:
          nullable: true
          type: string
        variableOrEntityID:
          nullable: true
          type: string
      required:
        - id
        - description
        - variableOrEntityID
    AIProvider:
      type: string
      enum:
        - groq
        - azure
        - google
        - open-ai
        - anthropic
        - bedrock
        - relvoca
        - openrouter
      x-enumNames:
        - GROQ
        - AZURE
        - GOOGLE
        - OPEN_AI
        - ANTHROPIC
        - BEDROCK
        - RELVOCA
        - OPENROUTER
    IntentAIParams:
      type: object
      properties:
        model:
          allOf:
            - $ref: '#/components/schemas/AIModel'
        temperature:
          type: number
        reasoningEffort:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AIReasoningEffort'
      required:
        - model
        - temperature
    AIPromptWrapper:
      type: object
      properties:
        content:
          type: string
      required:
        - content
    VersionIntentSlotDialog:
      type: object
      properties:
        prompt:
          type: array
          items: {}
        confirm:
          type: array
          items: {}
        utterances:
          type: array
          items:
            $ref: '#/components/schemas/VersionIntentInput'
        confirmEnabled:
          type: boolean
      required:
        - prompt
        - confirm
        - utterances
        - confirmEnabled
    DeepgramSTTLanguage:
      type: string
      enum:
        - multi
        - ar
        - ar-AE
        - ar-DZ
        - ar-EG
        - ar-IQ
        - ar-IR
        - ar-JO
        - ar-KW
        - ar-LB
        - ar-MA
        - ar-PS
        - ar-QA
        - ar-SA
        - ar-SD
        - ar-SY
        - ar-TD
        - ar-TN
        - be
        - bg
        - bn
        - bs
        - ca
        - cs
        - da
        - da-DK
        - de
        - de-CH
        - el
        - en
        - en-AU
        - en-GB
        - en-IN
        - en-NZ
        - en-US
        - es
        - es-419
        - et
        - fa
        - fi
        - fr
        - fr-CA
        - he
        - hi
        - hr
        - hu
        - id
        - it
        - ja
        - kn
        - ko
        - ko-KR
        - lt
        - lv
        - mk
        - mr
        - ms
        - nl
        - nl-BE
        - 'no'
        - pl
        - pt
        - pt-BR
        - pt-PT
        - ro
        - ru
        - sk
        - sl
        - sr
        - sv
        - sv-SE
        - ta
        - te
        - th
        - tl
        - tr
        - uk
        - ur
        - vi
        - zh
        - zh-HK
        - zh-TW
      x-enumNames:
        - MULTI
        - AR
        - AR_AE
        - AR_DZ
        - AR_EG
        - AR_IQ
        - AR_IR
        - AR_JO
        - AR_KW
        - AR_LB
        - AR_MA
        - AR_PS
        - AR_QA
        - AR_SA
        - AR_SD
        - AR_SY
        - AR_TD
        - AR_TN
        - BE
        - BG
        - BN
        - BS
        - CA
        - CS
        - DA
        - DA_DK
        - DE
        - DE_CH
        - EL
        - EN
        - EN_AU
        - EN_GB
        - EN_IN
        - EN_NZ
        - EN_US
        - ES
        - ES_419
        - ET
        - FA
        - FI
        - FR
        - FR_CA
        - HE
        - HI
        - HR
        - HU
        - ID
        - IT
        - JA
        - KN
        - KO
        - KO_KR
        - LT
        - LV
        - MK
        - MR
        - MS
        - NL
        - NL_BE
        - 'NO'
        - PL
        - PT
        - PT_BR
        - PT_PT
        - RO
        - RU
        - SK
        - SL
        - SR
        - SV
        - SV_SE
        - TA
        - TE
        - TH
        - TL
        - TR
        - UK
        - UR
        - VI
        - ZH
        - ZH_HK
        - ZH_TW
    CompiledToolNodeDataVariable:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        shouldFulfill:
          description: >-
            If true, then LLM will never ask user to fulfill an input variable.
            If false, then LLM will decide for itself whether user needs to
            provide a value for the input variable.
          type: boolean
        defaultValue:
          nullable: true
          type: string
      required:
        - defaultValue
    CompiledAgentFlowToolVariable:
      type: object
      properties:
        name:
          type: string
        required:
          type: boolean
        description:
          nullable: true
          type: string
      required:
        - name
        - required
        - description
    CompiledAgentPathToolVariable:
      type: object
      properties:
        name:
          type: string
        required:
          type: boolean
        description:
          nullable: true
          type: string
      required:
        - name
        - required
        - description
    CompiledAgentKnowledgeBaseMetadataKeyFilter:
      type: object
      properties:
        description:
          default: null
          nullable: true
          type: string
        defaultValue:
          nullable: true
          type: string
        key:
          type: string
      required:
        - defaultValue
        - key
    AIMessageSimpleRole:
      type: string
      enum:
        - user
        - assistant
        - system
      x-enumNames:
        - USER
        - ASSISTANT
        - SYSTEM
    ContentPart:
      anyOf:
        - $ref: '#/components/schemas/TextContentPart'
        - $ref: '#/components/schemas/ImageContentPart'
        - $ref: '#/components/schemas/DocumentContentPart'
    FileAttachmentMetadata:
      type: object
      properties:
        filename:
          type: string
        mimeType:
          type: string
        description:
          type: string
      required:
        - filename
        - mimeType
        - description
    AnyCompiledCondition:
      oneOf:
        - $ref: '#/components/schemas/CompiledScriptCondition'
        - $ref: '#/components/schemas/CompiledPromptCondition'
        - $ref: '#/components/schemas/CompiledValueVariableCondition'
    CompiledResponseMessageData:
      type: object
      properties:
        text:
          type: array
          items: {}
        delay:
          nullable: true
          type: number
      required:
        - text
        - delay
    CompiledCrewNodeDataRequiredVariable:
      type: object
      properties:
        name:
          type: string
        description:
          nullable: true
          type: string
      required:
        - name
        - description
    CompiledValueVariableCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - value-variable
          x-enumNames:
            - VALUE_VARIABLE
        data:
          $ref: '#/components/schemas/CompiledValueVariableConditionData'
      required:
        - type
        - data
    PromptConditionAssertionLhs:
      type: object
      properties:
        path:
          type: string
    ConditionOperation:
      type: string
      enum:
        - is
        - is_not
        - greater_than
        - greater_or_equal
        - less_than
        - less_or_equal
        - contains
        - not_contains
        - starts_with
        - ends_with
        - is_empty
        - is_not_empty
      x-enumNames:
        - IS
        - IS_NOT
        - GREATER_THAN
        - GREATER_OR_EQUAL
        - LESS_THAN
        - LESS_OR_EQUAL
        - CONTAINS
        - NOT_CONTAINS
        - STARTS_WITH
        - ENDS_WITH
        - IS_EMPTY
        - IS_NOT_EMPTY
    ConditionAssertionLhs:
      type: object
      properties:
        variableID:
          nullable: true
          type: string
        path:
          type: string
      required:
        - variableID
    NativeToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - native
          x-enumNames:
            - NATIVE
        kind:
          $ref: '#/components/schemas/SimulationTurnTestToolNativeKind'
      required:
        - type
        - kind
    ApiCallToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - api-call
          x-enumNames:
            - API_CALL
        toolID:
          type: string
      required:
        - type
        - toolID
    FunctionToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - function
          x-enumNames:
            - FUNCTION
        toolID:
          type: string
      required:
        - type
        - toolID
    IntegrationToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - integration
          x-enumNames:
            - INTEGRATION
        toolID:
          type: string
      required:
        - type
        - toolID
    McpIntegrationToolSimulationTurnTestPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - mcp-integration
          x-enumNames:
            - MCP_INTEGRATION
        toolID:
          type: string
      required:
        - type
        - toolID
    KnowledgeBaseDocumentRefreshRate:
      type: string
      enum:
        - daily
        - weekly
        - monthly
        - never
      x-enumNames:
        - DAILY
        - WEEKLY
        - MONTHLY
        - NEVER
    KnowledgeBaseDocumentIntegrationType:
      type: string
      enum:
        - zendesk
        - shopify
      x-enumNames:
        - ZENDESK
        - SHOPIFY
    IntentProgramEvent:
      type: object
      properties:
        type:
          type: string
          enum:
            - intent
          x-enumNames:
            - INTENT
        intent:
          type: string
        mappings:
          type: array
          items:
            $ref: '#/components/schemas/IntentProgramEventMapping'
      required:
        - type
        - intent
    EventProgramEvent:
      type: object
      properties:
        type:
          type: string
          enum:
            - event
          x-enumNames:
            - EVENT
        event:
          type: string
      required:
        - type
        - event
    GeneralProgramEvent:
      type: object
      properties:
        type:
          type: string
        name:
          type: string
      required:
        - type
    ElevenLabsSTTModel:
      type: string
      enum:
        - scribe_v2_realtime
      x-enumNames:
        - SCRIBE_V_2_REALTIME
    ElevenLabsSTTLanguage:
      type: string
      enum:
        - afr
        - amh
        - ara
        - hye
        - asm
        - ast
        - aze
        - bel
        - ben
        - bos
        - bul
        - mya
        - yue
        - cat
        - ceb
        - nya
        - hrv
        - ces
        - dan
        - nld
        - eng
        - est
        - fil
        - fin
        - fra
        - ful
        - glg
        - lug
        - kat
        - deu
        - ell
        - guj
        - hau
        - heb
        - hin
        - hun
        - isl
        - ibo
        - ind
        - gle
        - ita
        - jpn
        - jav
        - kea
        - kan
        - kaz
        - khm
        - kor
        - kur
        - kir
        - lao
        - lav
        - lin
        - lit
        - luo
        - ltz
        - mkd
        - msa
        - mal
        - mlt
        - zho
        - mri
        - mar
        - mon
        - nep
        - nso
        - nor
        - oci
        - ori
        - pus
        - fas
        - pol
        - por
        - pan
        - ron
        - rus
        - srp
        - sna
        - snd
        - slk
        - slv
        - som
        - spa
        - swa
        - swe
        - tam
        - tgk
        - tel
        - tha
        - tur
        - ukr
        - umb
        - urd
        - uzb
        - vie
        - cym
        - wol
        - xho
        - zul
      x-enumNames:
        - AFRIKAANS
        - AMHARIC
        - ARABIC
        - ARMENIAN
        - ASSAMESE
        - ASTURIAN
        - AZERBAIJANI
        - BELARUSIAN
        - BENGALI
        - BOSNIAN
        - BULGARIAN
        - BURMESE
        - CANTONESE
        - CATALAN
        - CEBUANO
        - CHICHEWA
        - CROATIAN
        - CZECH
        - DANISH
        - DUTCH
        - ENGLISH
        - ESTONIAN
        - FILIPINO
        - FINNISH
        - FRENCH
        - FULAH
        - GALICIAN
        - GANDA
        - GEORGIAN
        - GERMAN
        - GREEK
        - GUJARATI
        - HAUSA
        - HEBREW
        - HINDI
        - HUNGARIAN
        - ICELANDIC
        - IGBO
        - INDONESIAN
        - IRISH
        - ITALIAN
        - JAPANESE
        - JAVANESE
        - KABUVERDIANU
        - KANNADA
        - KAZAKH
        - KHMER
        - KOREAN
        - KURDISH
        - KYRGYZ
        - LAO
        - LATVIAN
        - LINGALA
        - LITHUANIAN
        - LUO
        - LUXEMBOURGISH
        - MACEDONIAN
        - MALAY
        - MALAYALAM
        - MALTESE
        - MANDARIN_CHINESE
        - MAORI
        - MARATHI
        - MONGOLIAN
        - NEPALI
        - NORTHERN_SOTHO
        - NORWEGIAN
        - OCCITAN
        - ODIA
        - PASHTO
        - PERSIAN
        - POLISH
        - PORTUGUESE
        - PUNJABI
        - ROMANIAN
        - RUSSIAN
        - SERBIAN
        - SHONA
        - SINDHI
        - SLOVAK
        - SLOVENIAN
        - SOMALI
        - SPANISH
        - SWAHILI
        - SWEDISH
        - TAMIL
        - TAJIK
        - TELUGU
        - THAI
        - TURKISH
        - UKRAINIAN
        - UMBUNDU
        - URDU
        - UZBEK
        - VIETNAMESE
        - WELSH
        - WOLOF
        - XHOSA
        - ZULU
    DeepgramSTTModel:
      type: string
      enum:
        - nova-2
        - nova-3
        - nova-3-medical
        - flux
      x-enumNames:
        - NOVA_2
        - NOVA_3
        - NOVA_3_MEDICAL
        - FLUX
    AssemblyAISTTModel:
      type: string
      enum:
        - universal-streaming-english
        - universal-3-5-pro
      x-enumNames:
        - UNIVERSAL_STREAMING_ENGLISH
        - UNIVERSAL_3_5_PRO
    AssemblyAISTTMode:
      type: string
      enum:
        - min_latency
        - balanced
        - max_accuracy
      x-enumNames:
        - MIN_LATENCY
        - BALANCED
        - MAX_ACCURACY
    AssemblyAISTTLanguage:
      type: string
      enum:
        - multi
        - en
        - ar
        - da
        - nl
        - fi
        - fr
        - de
        - he
        - hi
        - it
        - ja
        - zh
        - 'no'
        - pt
        - es
        - sv
        - tr
        - vi
      x-enumNames:
        - MULTI
        - ENGLISH
        - ARABIC
        - DANISH
        - DUTCH
        - FINNISH
        - FRENCH
        - GERMAN
        - HEBREW
        - HINDI
        - ITALIAN
        - JAPANESE
        - MANDARIN
        - NORWEGIAN
        - PORTUGUESE
        - SPANISH
        - SWEDISH
        - TURKISH
        - VIETNAMESE
    CartesiaSTTModel:
      type: string
      enum:
        - ink-whisper
        - ink-2
      x-enumNames:
        - INK_WHISPER
        - INK_2
    CartesiaSTTLanguage:
      type: string
      enum:
        - en
        - af
        - ar
        - hy
        - az
        - be
        - bs
        - bg
        - ca
        - zh
        - hr
        - cs
        - da
        - nl
        - et
        - fi
        - fr
        - gl
        - de
        - el
        - he
        - hi
        - hu
        - is
        - id
        - it
        - ja
        - kn
        - kk
        - ko
        - lv
        - lt
        - mk
        - ms
        - mr
        - mi
        - ne
        - 'no'
        - fa
        - pl
        - pt
        - ro
        - ru
        - sr
        - sk
        - sl
        - es
        - sw
        - sv
        - tl
        - ta
        - th
        - tr
        - uk
        - ur
        - vi
        - cy
      x-enumNames:
        - ENGLISH
        - AFRIKAANS
        - ARABIC
        - ARMENIAN
        - AZERBAIJANI
        - BELARUSIAN
        - BOSNIAN
        - BULGARIAN
        - CATALAN
        - CHINESE
        - CROATIAN
        - CZECH
        - DANISH
        - DUTCH
        - ESTONIAN
        - FINNISH
        - FRENCH
        - GALICIAN
        - GERMAN
        - GREEK
        - HEBREW
        - HINDI
        - HUNGARIAN
        - ICELANDIC
        - INDONESIAN
        - ITALIAN
        - JAPANESE
        - KANNADA
        - KAZAKH
        - KOREAN
        - LATVIAN
        - LITHUANIAN
        - MACEDONIAN
        - MALAY
        - MARATHI
        - MAORI
        - NEPALI
        - NORWEGIAN
        - PERSIAN
        - POLISH
        - PORTUGUESE
        - ROMANIAN
        - RUSSIAN
        - SERBIAN
        - SLOVAK
        - SLOVENIAN
        - SPANISH
        - SWAHILI
        - SWEDISH
        - TAGALOG
        - TAMIL
        - THAI
        - TURKISH
        - UKRAINIAN
        - URDU
        - VIETNAMESE
        - WELSH
    GladiaSTTModel:
      type: string
      enum:
        - solaria-1
      x-enumNames:
        - SOLARIA_1
    GladiaSTTLanguage:
      type: string
      enum:
        - af
        - am
        - ar
        - as
        - az
        - ba
        - be
        - bg
        - bn
        - bo
        - br
        - bs
        - ca
        - cs
        - cy
        - da
        - de
        - el
        - en
        - es
        - et
        - eu
        - fa
        - fi
        - fo
        - fr
        - gl
        - gu
        - ha
        - haw
        - he
        - hi
        - hr
        - ht
        - hu
        - hy
        - id
        - is
        - it
        - ja
        - jw
        - ka
        - kk
        - km
        - kn
        - ko
        - la
        - lb
        - ln
        - lo
        - lt
        - lv
        - mg
        - mi
        - mk
        - ml
        - mn
        - mr
        - ms
        - mt
        - my
        - ne
        - nl
        - nn
        - 'no'
        - oc
        - pa
        - pl
        - ps
        - pt
        - ro
        - ru
        - sa
        - sd
        - si
        - sk
        - sl
        - sn
        - so
        - sq
        - sr
        - su
        - sv
        - sw
        - ta
        - te
        - tg
        - th
        - tk
        - tl
        - tr
        - tt
        - uk
        - ur
        - uz
        - vi
        - yi
        - yo
        - zh
      x-enumNames:
        - AFRIKAANS
        - AMHARIC
        - ARABIC
        - ASSAMESE
        - AZERBAIJANI
        - BASHKIR
        - BELARUSIAN
        - BULGARIAN
        - BENGALI
        - TIBETAN
        - BRETON
        - BOSNIAN
        - CATALAN
        - CZECH
        - WELSH
        - DANISH
        - GERMAN
        - GREEK
        - ENGLISH
        - SPANISH
        - ESTONIAN
        - BASQUE
        - PERSIAN
        - FINNISH
        - FAROESE
        - FRENCH
        - GALICIAN
        - GUJARATI
        - HAUSA
        - HAWAIIAN
        - HEBREW
        - HINDI
        - CROATIAN
        - HAITIAN_CREOLE
        - HUNGARIAN
        - ARMENIAN
        - INDONESIAN
        - ICELANDIC
        - ITALIAN
        - JAPANESE
        - JAVANESE
        - GEORGIAN
        - KAZAKH
        - KHMER
        - KANNADA
        - KOREAN
        - LATIN
        - LUXEMBOURGISH
        - LINGALA
        - LAO
        - LITHUANIAN
        - LATVIAN
        - MALAGASY
        - MAORI
        - MACEDONIAN
        - MALAYALAM
        - MONGOLIAN
        - MARATHI
        - MALAY
        - MALTESE
        - MYANMAR
        - NEPALI
        - DUTCH
        - NORWEGIAN_NYNORSK
        - NORWEGIAN
        - OCCITAN
        - PUNJABI
        - POLISH
        - PASHTO
        - PORTUGUESE
        - ROMANIAN
        - RUSSIAN
        - SANSKRIT
        - SINDHI
        - SINHALA
        - SLOVAK
        - SLOVENIAN
        - SHONA
        - SOMALI
        - ALBANIAN
        - SERBIAN
        - SUNDANESE
        - SWEDISH
        - SWAHILI
        - TAMIL
        - TELUGU
        - TAJIK
        - THAI
        - TURKMEN
        - TAGALOG
        - TURKISH
        - TATAR
        - UKRAINIAN
        - URDU
        - UZBEK
        - VIETNAMESE
        - YIDDISH
        - YORUBA
        - CHINESE
    GoogleSTTModel:
      type: string
      enum:
        - chirp_3
      x-enumNames:
        - CHIRP_3
    GoogleSTTLanguage:
      type: string
      enum:
        - auto
        - ca-ES
        - cmn-Hans-CN
        - hr-HR
        - da-DK
        - nl-NL
        - en-AU
        - en-GB
        - en-IN
        - en-US
        - fi-FI
        - fr-CA
        - fr-FR
        - de-DE
        - el-GR
        - hi-IN
        - it-IT
        - ja-JP
        - ko-KR
        - pl-PL
        - pt-BR
        - pt-PT
        - ro-RO
        - ru-RU
        - es-ES
        - es-US
        - sv-SE
        - tr-TR
        - uk-UA
        - vi-VN
        - ar-XA
        - ar-DZ
        - ar-BH
        - ar-EG
        - ar-IL
        - ar-JO
        - ar-KW
        - ar-LB
        - ar-MR
        - ar-MA
        - ar-OM
        - ar-QA
        - ar-SA
        - ar-PS
        - ar-SY
        - ar-TN
        - ar-AE
        - ar-YE
        - hy-AM
        - bn-BD
        - bn-IN
        - bg-BG
        - my-MM
        - ar-IQ
        - yue-Hant-HK
        - cmn-Hant-TW
        - cs-CZ
        - en-PH
        - et-EE
        - fil-PH
        - gu-IN
        - iw-IL
        - hu-HU
        - id-ID
        - kn-IN
        - km-KH
        - lo-LA
        - lv-LV
        - lt-LT
        - ms-MY
        - ml-IN
        - mr-IN
        - ne-NP
        - no-NO
        - fa-IR
        - pa-Guru-IN
        - sr-RS
        - sk-SK
        - sl-SI
        - es-MX
        - sw
        - ta-IN
        - te-IN
        - th-TH
        - uz-UZ
      x-enumNames:
        - AUTO
        - CA_ES
        - CMN_HANS_CN
        - HR_HR
        - DA_DK
        - NL_NL
        - EN_AU
        - EN_GB
        - EN_IN
        - EN_US
        - FI_FI
        - FR_CA
        - FR_FR
        - DE_DE
        - EL_GR
        - HI_IN
        - IT_IT
        - JA_JP
        - KO_KR
        - PL_PL
        - PT_BR
        - PT_PT
        - RO_RO
        - RU_RU
        - ES_ES
        - ES_US
        - SV_SE
        - TR_TR
        - UK_UA
        - VI_VN
        - AR_XA
        - AR_DZ
        - AR_BH
        - AR_EG
        - AR_IL
        - AR_JO
        - AR_KW
        - AR_LB
        - AR_MR
        - AR_MA
        - AR_OM
        - AR_QA
        - AR_SA
        - AR_PS
        - AR_SY
        - AR_TN
        - AR_AE
        - AR_YE
        - HY_AM
        - BN_BD
        - BN_IN
        - BG_BG
        - MY_MM
        - AR_IQ
        - YUE_HANT_HK
        - CMN_HANT_TW
        - CS_CZ
        - EN_PH
        - ET_EE
        - FIL_PH
        - GU_IN
        - IW_IL
        - HU_HU
        - ID_ID
        - KN_IN
        - KM_KH
        - LO_LA
        - LV_LV
        - LT_LT
        - MS_MY
        - ML_IN
        - MR_IN
        - NE_NP
        - NO_NO
        - FA_IR
        - PA_GURU_IN
        - SR_RS
        - SK_SK
        - SL_SI
        - ES_MX
        - SW
        - TA_IN
        - TE_IN
        - TH_TH
        - UZ_UZ
    SonioxSTTModel:
      type: string
      enum:
        - stt-rt-v5
      x-enumNames:
        - STT_RT_V_5
    SonioxSTTLanguage:
      type: string
      enum:
        - auto
        - af
        - sq
        - ar
        - az
        - eu
        - be
        - bn
        - bs
        - bg
        - ca
        - zh
        - hr
        - cs
        - da
        - nl
        - en
        - et
        - fi
        - fr
        - gl
        - de
        - el
        - gu
        - he
        - hi
        - hu
        - id
        - it
        - ja
        - kn
        - kk
        - ko
        - lv
        - lt
        - mk
        - ms
        - ml
        - mr
        - 'no'
        - fa
        - pl
        - pt
        - pa
        - ro
        - ru
        - sr
        - sk
        - sl
        - es
        - sw
        - sv
        - tl
        - ta
        - te
        - th
        - tr
        - uk
        - ur
        - vi
        - cy
      x-enumNames:
        - AUTO
        - AFRIKAANS
        - ALBANIAN
        - ARABIC
        - AZERBAIJANI
        - BASQUE
        - BELARUSIAN
        - BENGALI
        - BOSNIAN
        - BULGARIAN
        - CATALAN
        - CHINESE
        - CROATIAN
        - CZECH
        - DANISH
        - DUTCH
        - ENGLISH
        - ESTONIAN
        - FINNISH
        - FRENCH
        - GALICIAN
        - GERMAN
        - GREEK
        - GUJARATI
        - HEBREW
        - HINDI
        - HUNGARIAN
        - INDONESIAN
        - ITALIAN
        - JAPANESE
        - KANNADA
        - KAZAKH
        - KOREAN
        - LATVIAN
        - LITHUANIAN
        - MACEDONIAN
        - MALAY
        - MALAYALAM
        - MARATHI
        - NORWEGIAN
        - PERSIAN
        - POLISH
        - PORTUGUESE
        - PUNJABI
        - ROMANIAN
        - RUSSIAN
        - SERBIAN
        - SLOVAK
        - SLOVENIAN
        - SPANISH
        - SWAHILI
        - SWEDISH
        - TAGALOG
        - TAMIL
        - TELUGU
        - THAI
        - TURKISH
        - UKRAINIAN
        - URDU
        - VIETNAMESE
        - WELSH
    GoogleTTSModelID:
      type: string
      enum:
        - standard
        - wavenet
        - neural2
        - polyglot
        - studio
        - Chirp3-HD
        - gemini-2.5-flash
      x-enumNames:
        - STANDARD
        - WAVENET
        - NEURAL_2
        - POLYGLOT
        - STUDIO
        - CHIRP_3_HD
        - GEMINI_2_5_FLASH
    WidgetSettingsChatSettingsResponseLoaderDots:
      type: object
      properties:
        type:
          type: string
          enum:
            - dots
          x-enumNames:
            - DOTS
      required:
        - type
    WidgetSettingsChatSettingsResponseLoaderSpinnerWithText:
      type: object
      properties:
        type:
          type: string
          enum:
            - spinner-with-text
          x-enumNames:
            - SPINNER_WITH_TEXT
        text:
          type: string
      required:
        - type
        - text
    WidgetSettingsColorPalette:
      type: object
      properties:
        '50':
          type: string
        '100':
          type: string
        '200':
          type: string
        '300':
          type: string
        '400':
          type: string
        '500':
          type: string
        '600':
          type: string
        '700':
          type: string
        '800':
          type: string
        '900':
          type: string
      required:
        - '50'
        - '100'
        - '200'
        - '300'
        - '400'
        - '500'
        - '600'
        - '700'
        - '800'
        - '900'
    WidgetSettingsLauncherType:
      type: string
      enum:
        - icon
        - label
        - both
      x-enumNames:
        - ICON
        - LABEL
        - BOTH
    TextContentPart:
      type: object
      properties:
        type:
          type: string
          enum:
            - text
          x-enumNames:
            - TEXT
        text:
          type: string
      required:
        - type
        - text
    ImageContentPart:
      type: object
      properties:
        type:
          type: string
          enum:
            - image
          x-enumNames:
            - IMAGE
        url:
          type: string
          format: uri
        data:
          type: string
        mimeType:
          allOf:
            - $ref: '#/components/schemas/ImageMimeType'
      required:
        - type
    DocumentContentPart:
      type: object
      properties:
        type:
          type: string
          enum:
            - document
          x-enumNames:
            - DOCUMENT
        url:
          type: string
          format: uri
        data:
          type: string
        mimeType:
          type: string
          enum:
            - application/pdf
          x-enumNames:
            - APPLICATION_PDF
      required:
        - type
    CompiledScriptCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - script
          x-enumNames:
            - SCRIPT
        data:
          $ref: '#/components/schemas/CompiledScriptConditionData'
      required:
        - type
        - data
    CompiledPromptCondition:
      type: object
      properties:
        type:
          type: string
          enum:
            - prompt
          x-enumNames:
            - PROMPT
        data:
          $ref: '#/components/schemas/CompiledPromptConditionData'
      required:
        - type
        - data
    CompiledValueVariableConditionData:
      type: object
      properties:
        matchAll:
          type: boolean
        assertions:
          type: array
          items:
            $ref: '#/components/schemas/CompiledConditionAssertion'
      required:
        - matchAll
        - assertions
    SimulationTurnTestToolNativeKind:
      type: string
      enum:
        - end
        - card
        - button
        - carousel
        - skip-turn
        - web-search
        - call-forward
        - knowledge-base
      x-enumNames:
        - END
        - CARD
        - BUTTON
        - CAROUSEL
        - SKIP_TURN
        - WEB_SEARCH
        - CALL_FORWARD
        - KNOWLEDGE_BASE
    IntentProgramEventMapping:
      type: object
      properties:
        slot:
          type: string
        variable:
          type: string
      required:
        - slot
        - variable
    ImageMimeType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      x-enumNames:
        - IMAGE_JPEG
        - IMAGE_PNG
        - IMAGE_GIF
        - IMAGE_WEBP
    CompiledScriptConditionData:
      type: object
      properties:
        code:
          type: string
      required:
        - code
    CompiledPromptConditionData:
      type: object
      properties:
        matchAll:
          type: boolean
        assertions:
          type: array
          items:
            $ref: '#/components/schemas/CompiledConditionAssertion'
      required:
        - matchAll
        - assertions
    CompiledConditionAssertion:
      type: object
      properties:
        lhs:
          type: string
        rhs:
          type: string
        operation:
          $ref: '#/components/schemas/ConditionOperation'
      required:
        - lhs
        - rhs
        - operation
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````