> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create many playbooks

> Adds several playbooks to the environment in one request, each taking the fields the single-create call takes. The response carries the created playbooks in the same shape the list call returns.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/playbook/batch
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
  /v1/stable/playbook/batch:
    post:
      tags:
        - Playbook
      summary: Create many playbooks
      description: >-
        Adds several playbooks to the environment in one request, each taking
        the fields the single-create call takes. The response carries the
        created playbooks in the same shape the list call returns.
      operationId: StablePlaybookController_createMany
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
              $ref: '#/components/schemas/StablePlaybookCreateManyRequest'
      responses:
        '201':
          description: >-
            Returns the playbooks the request created, as an array, each
            complete with the ID assigned to it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StablePlaybookListResponse'
          x-vf-doc:
            description: >-
              Returns the playbooks the request created, as an array, each
              complete with the ID assigned to it.
      security:
        - token: []
components:
  schemas:
    StablePlaybookCreateManyRequest:
      type: object
      properties:
        playbooks:
          type: array
          items:
            $ref: '#/components/schemas/StablePlaybookCreateRequest'
      required:
        - playbooks
    StablePlaybookListResponse:
      type: object
      properties:
        playbooks:
          type: array
          items:
            $ref: '#/components/schemas/StablePlaybook'
      required:
        - playbooks
    StablePlaybookCreateRequest:
      type: object
      properties:
        name:
          type: string
        description:
          nullable: true
          description: A human-readable description of what the playbook does.
          type: string
        instructions:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        endTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentEndTool'
        cardTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        buttonTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentButtonTool'
        carouselTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        skipTurnTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentSkipTurnTool'
        webSearchTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentWebSearchTool'
        callForwardTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCallForwardTool'
        knowledgeBaseTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentKnowledgeBaseTool'
        settings:
          default: {}
          allOf:
            - $ref: '#/components/schemas/AgentSettings'
      required:
        - name
      additionalProperties: false
    StablePlaybook:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        settings:
          $ref: '#/components/schemas/AgentSettings'
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
        description:
          nullable: true
          description: A human-readable description of what the playbook does.
          type: string
        instructions:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        pathToolOrder:
          type: array
          items:
            type: string
          description: The IDs of the playbook's path tools, in display order.
        endTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentEndTool'
        cardTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        buttonTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentButtonTool'
        carouselTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        skipTurnTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentSkipTurnTool'
        webSearchTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentWebSearchTool'
        callForwardTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCallForwardTool'
        knowledgeBaseTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentKnowledgeBaseTool'
      required:
        - id
        - name
        - settings
        - createdAt
        - updatedAt
        - description
        - instructions
        - pathToolOrder
        - endTool
        - cardTool
        - buttonTool
        - carouselTool
        - skipTurnTool
        - webSearchTool
        - callForwardTool
        - knowledgeBaseTool
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````