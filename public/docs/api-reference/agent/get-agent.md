> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get agent

> Returns the environment’s agent: the global prompt, the instructions that route a turn, and the settings wrapping both.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/agent
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
  /v1/stable/agent:
    get:
      tags:
        - Agent
      summary: Get agent
      description: >-
        Returns the environment’s agent: the global prompt, the instructions
        that route a turn, and the settings wrapping both.
      operationId: StableAgentController_get
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
      responses:
        '200':
          description: >-
            Returns the agent's whole configuration: its model settings, prompt,
            instructions, the playbooks and workflows attached to it, and its
            system tool setup. The voice section is optional and may be absent.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAgentResponse'
          x-vf-doc:
            description: >-
              Returns the agent's whole configuration: its model settings,
              prompt, instructions, the playbooks and workflows attached to it,
              and its system tool setup. The voice section is optional and may
              be absent.
      security:
        - token: []
components:
  schemas:
    StableAgentResponse:
      type: object
      properties:
        agent:
          $ref: '#/components/schemas/StableAgent'
      required:
        - agent
    StableAgent:
      type: object
      properties:
        llm:
          type: object
          properties:
            priorityProcessing:
              type: boolean
            defaults:
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
        prompt:
          $ref: '#/components/schemas/Markup'
        includeGuidelines:
          type: boolean
          description: >-
            Whether to append the default prompting guidelines to the global
            prompt.
        voice:
          allOf:
            - $ref: '#/components/schemas/VersionSettingsVoice'
        playbooks:
          type: array
          items:
            type: object
            properties:
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
              playbookID:
                type: string
            required:
              - description
              - playbookID
          description: Playbooks available for the agent to invoke.
        workflows:
          type: array
          items:
            type: object
            properties:
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
              workflowID:
                type: string
            required:
              - description
              - workflowID
          description: Workflows available for the agent to invoke.
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
        instructions:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        carouselTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentCardTool'
        skipTurnTool:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/AgentSkipTurnTool'
        pathToolOrder:
          type: array
          items:
            type: string
          description: >-
            The ordered list of path tool IDs that controls the order of the
            agent exit paths.
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
        - llm
        - prompt
        - includeGuidelines
        - playbooks
        - workflows
        - endTool
        - cardTool
        - buttonTool
        - instructions
        - carouselTool
        - skipTurnTool
        - pathToolOrder
        - webSearchTool
        - callForwardTool
        - knowledgeBaseTool
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````