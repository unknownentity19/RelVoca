> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query knowledge base

> Searches the knowledge base and returns the passages a retrieval would surface, which is how to see what an agent will be grounded on before it answers.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/knowledge-base/query
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
  /v1/stable/knowledge-base/query:
    post:
      tags:
        - Knowledge Base
      summary: Query knowledge base
      description: >-
        Searches the knowledge base and returns the passages a retrieval would
        surface, which is how to see what an agent will be grounded on before it
        answers.
      operationId: StableKnowledgeBaseController_query
      parameters:
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
        - name: environmentAlias
          required: true
          in: query
          schema:
            type: string
            description: The alias of the environment to operate on (e.g. `main`).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableKnowledgeBaseQueryRequest'
      responses:
        '200':
          description: >-
            Returns the answer generated from the knowledge base and the chunks
            it was drawn from, alongside the model used, the duration, and the
            token accounting for the call.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableKnowledgeBaseQueryResponse'
          x-vf-doc:
            description: >-
              Returns the answer generated from the knowledge base and the
              chunks it was drawn from, alongside the model used, the duration,
              and the token accounting for the call.
      security:
        - token: []
components:
  schemas:
    StableKnowledgeBaseQueryRequest:
      type: object
      properties:
        version:
          type: string
          enum:
            - draft
            - published
          description: >-
            Whether to query the draft or the published version of the knowledge
            base.
          x-enumNames:
            - DRAFT
            - PUBLISHED
        filters:
          description: >-
            Metadata filters used to narrow down which document chunks are
            searched.
          type: object
          additionalProperties: {}
        question:
          type: string
          description: The natural-language question to ask the knowledge base.
        settings:
          allOf:
            - $ref: '#/components/schemas/StableKnowledgeBaseQuerySettings'
        synthesis:
          description: >-
            Whether to synthesize an answer from the retrieved chunks; when
            false, only raw chunks are returned.
          type: boolean
        chunkLimit:
          description: The maximum number of document chunks to retrieve.
          type: integer
          minimum: 1
          maximum: 30
        instruction:
          description: >-
            An additional instruction applied when synthesizing the answer from
            the retrieved chunks.
          type: string
      required:
        - version
        - question
      additionalProperties: false
    StableKnowledgeBaseQueryResponse:
      type: object
      properties:
        answer:
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
              description: The AI model used to answer the query.
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
            output:
              nullable: true
              description: >-
                The synthesized answer text, or `null` when no answer was
                generated.
              type: string
            tokens:
              type: number
              description: The total number of tokens consumed by the query.
            duration:
              type: number
              description: The time it took to execute the query.
            queryTokens:
              type: number
              description: >-
                The number of input tokens consumed by the query, after
                multipliers.
            answerTokens:
              type: number
              description: >-
                The number of output tokens consumed by the answer, after
                multipliers.
            inputMultiplier:
              type: number
              description: The billing multiplier applied to input tokens.
            cacheMultiplier:
              type: number
              description: The billing multiplier applied to cached input tokens.
            outputMultiplier:
              type: number
              description: The billing multiplier applied to output tokens.
            cacheWriteTokens:
              type: number
              description: The number of input tokens written to the prompt cache.
            queryCachedTokens:
              type: number
              description: The number of input tokens read from the prompt cache.
            cacheWriteMultiplier:
              type: number
              description: The billing multiplier applied to cache-write tokens.
            queryRemainderTokens:
              type: number
              description: >-
                The number of input tokens that were not served from the prompt
                cache.
            base:
              type: object
              properties:
                queryTokens:
                  type: number
                  description: The raw number of input tokens consumed by the query.
                answerTokens:
                  type: number
                  description: The raw number of output tokens consumed by the answer.
                cacheWriteTokens:
                  type: number
                  description: The raw number of input tokens written to the prompt cache.
                queryCachedTokens:
                  type: number
                  description: The raw number of input tokens read from the prompt cache.
              required:
                - queryTokens
                - answerTokens
                - cacheWriteTokens
                - queryCachedTokens
              description: The raw token counts before billing multipliers are applied.
            priorityMultipliers:
              description: >-
                The billing multipliers applied when the query runs with
                priority processing.
              type: object
              properties:
                inputMultiplier:
                  type: number
                  description: The priority billing multiplier applied to input tokens.
                cacheMultiplier:
                  type: number
                  description: >-
                    The priority billing multiplier applied to cached input
                    tokens.
                outputMultiplier:
                  type: number
                  description: The priority billing multiplier applied to output tokens.
                cacheWriteMultiplier:
                  type: number
                  description: >-
                    The priority billing multiplier applied to cache-write
                    tokens.
              required:
                - inputMultiplier
                - cacheMultiplier
                - outputMultiplier
                - cacheWriteMultiplier
            chunks:
              type: array
              items:
                type: object
                properties:
                  score:
                    type: number
                  chunkID:
                    type: string
                  documentID:
                    type: string
                  content:
                    type: string
                  source:
                    $ref: '#/components/schemas/KBDocumentData'
                  metadata:
                    type: object
                    additionalProperties: {}
                required:
                  - score
                  - chunkID
                  - documentID
                  - content
                  - source
                  - metadata
          required:
            - model
            - output
            - tokens
            - duration
            - queryTokens
            - answerTokens
            - inputMultiplier
            - cacheMultiplier
            - outputMultiplier
            - cacheWriteTokens
            - queryCachedTokens
            - cacheWriteMultiplier
            - queryRemainderTokens
            - base
            - chunks
          description: >-
            The result of the knowledge base query, including the synthesized
            answer and token usage.
      required:
        - answer
    StableKnowledgeBaseQuerySettings:
      type: object
      properties:
        model:
          description: The AI model used to synthesize the answer.
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
        system:
          description: The system prompt applied to the model when synthesizing the answer.
          type: string
        maxTokens:
          description: >-
            The maximum number of tokens the model may generate when
            synthesizing the answer.
          type: integer
          minimum: -9007199254740991
          maximum: 9007199254740991
        temperature:
          description: >-
            The sampling temperature applied to the model when synthesizing the
            answer.
          type: number
        reasoningEffort:
          description: >-
            The reasoning effort applied to the model when synthesizing the
            answer.
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````