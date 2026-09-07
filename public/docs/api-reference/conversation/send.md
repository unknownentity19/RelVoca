> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send

> Advances a conversation by one turn: the body carries the action to apply, and the response carries the traces the agent produced in reply.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json put /v1/stable/conversation/{userID}
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
  /v1/stable/conversation/{userID}:
    put:
      tags:
        - Conversation
      summary: Send
      description: >-
        Advances a conversation by one turn: the body carries the action to
        apply, and the response carries the traces the agent produced in reply.
      operationId: StableConversationController_send
      parameters:
        - name: userID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: >-
              The ID identifying this conversation. Any stable string you
              choose; the same value addresses the same conversation on every
              call.
          description: >-
            The ID identifying this conversation. Any stable string you choose;
            the same value addresses the same conversation on every call.
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
              $ref: '#/components/schemas/StableConversationSendRequest'
      responses:
        '200':
          description: >-
            Returns the agent's response to the turn as an array of traces, each
            a typed piece of the reply such as text, speech, a card or carousel,
            a choice, a tool call, or a debug entry.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableConversationSendResponse'
          x-vf-doc:
            description: >-
              Returns the agent's response to the turn as an array of traces,
              each a typed piece of the reply such as text, speech, a card or
              carousel, a choice, a tool call, or a debug entry.
      security:
        - token: []
components:
  schemas:
    StableConversationSendRequest:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/AnyRequest'
        version:
          type: string
          enum:
            - draft
            - published
          description: >-
            Whether to run the conversation against the draft or published
            version of the environment.
          x-enumNames:
            - DRAFT
            - PUBLISHED
        sessionID:
          description: The unique ID of the conversation session to continue.
          type: string
      required:
        - action
        - version
    StableConversationSendResponse:
      type: object
      properties:
        traces:
          type: array
          items:
            $ref: '#/components/schemas/AnyTrace'
      required:
        - traces
    AnyRequest:
      anyOf:
        - $ref: '#/components/schemas/LaunchRequest'
        - $ref: '#/components/schemas/TextRequest'
        - type: object
          properties:
            type:
              type: string
              enum:
                - file
              x-enumNames:
                - FILE
            payload:
              type: object
              properties:
                text:
                  type: string
                files:
                  minItems: 1
                  type: array
                  items:
                    type: object
                    properties:
                      url:
                        type: string
                        format: uri
                      mimeType:
                        type: string
                      filename:
                        type: string
                      size:
                        type: number
                      s3Key:
                        type: string
                    required:
                      - mimeType
                    additionalProperties: {}
              required:
                - files
              additionalProperties: {}
            diagramID:
              type: string
            time:
              type: number
            metadata:
              type: object
              additionalProperties: {}
          required:
            - type
            - payload
          additionalProperties: {}
          description: Send one or more file attachments, with an optional text message.
        - $ref: '#/components/schemas/ActionRequest'
        - $ref: '#/components/schemas/IntentRequest'
        - $ref: '#/components/schemas/EventRequest'
        - $ref: '#/components/schemas/PathRequest'
        - $ref: '#/components/schemas/NoReplyRequest'
        - $ref: '#/components/schemas/MessageRequest'
        - $ref: '#/components/schemas/EndRequest'
        - $ref: '#/components/schemas/DTMFRequest'
        - $ref: '#/components/schemas/LiveAgentHandoffRequest'
        - $ref: '#/components/schemas/GeneralRequest'
        - $ref: '#/components/schemas/AlexaIntentRequest'
        - $ref: '#/components/schemas/LegacyIntentRequest'
    AnyTrace:
      oneOf:
        - $ref: '#/components/schemas/AudioTrace'
        - $ref: '#/components/schemas/SpeakTrace'
        - $ref: '#/components/schemas/StreamTrace'
        - $ref: '#/components/schemas/BlockTrace'
        - $ref: '#/components/schemas/CardTrace'
        - $ref: '#/components/schemas/CarouselTrace'
        - $ref: '#/components/schemas/ChannelActionTrace'
        - $ref: '#/components/schemas/ChoiceTrace'
        - $ref: '#/components/schemas/CompletionTrace'
        - $ref: '#/components/schemas/DebugTrace'
        - $ref: '#/components/schemas/DTMFTrace'
        - $ref: '#/components/schemas/EntityFillingTrace'
        - $ref: '#/components/schemas/ExitTrace'
        - $ref: '#/components/schemas/FlowTrace'
        - $ref: '#/components/schemas/GoToTrace'
        - $ref: '#/components/schemas/LogTrace'
        - $ref: '#/components/schemas/NoReplyTrace'
        - $ref: '#/components/schemas/PathTrace'
        - $ref: '#/components/schemas/TextTrace'
        - $ref: '#/components/schemas/ReasoningTrace'
        - $ref: '#/components/schemas/VisualTrace'
        - $ref: '#/components/schemas/KnowledgeBaseTrace'
        - $ref: '#/components/schemas/CallForwardTrace'
        - $ref: '#/components/schemas/RealtimeAgentTrace'
        - $ref: '#/components/schemas/LiveAgentHandoffTrace'
        - $ref: '#/components/schemas/ToolCallTrace'
    LaunchRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - launch
          x-enumNames:
            - LAUNCH
        payload:
          type: object
          properties:
            persona:
              type: string
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
      additionalProperties: {}
      description: Send a launch request to start a new conversation.
    TextRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - text
          x-enumNames:
            - TEXT
        payload:
          type: string
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          properties:
            source:
              type: string
      required:
        - type
        - payload
      additionalProperties: {}
      description: Send the user response as a raw text payload.
    ActionRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - action
          x-enumNames:
            - ACTION
        payload:
          type: object
          properties:
            actions:
              type: array
              items:
                $ref: '#/components/schemas/BaseAction'
            label:
              type: string
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
      additionalProperties: {}
      description: Actions are self-describing operations with an associated payload.
    IntentRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - intent
          x-enumNames:
            - INTENT
        payload:
          $ref: '#/components/schemas/IntentRequestPayload'
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      description: Trigger a specific intent from your conversation model.
    EventRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - event
          x-enumNames:
            - EVENT
        payload:
          $ref: '#/components/schemas/EventRequestPayload'
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      description: Events are triggers with an associated payload.
    PathRequest:
      type: object
      properties:
        type:
          type: string
        payload:
          type: object
          properties:
            actions:
              type: array
              items:
                $ref: '#/components/schemas/BaseAction'
            label:
              type: string
          required:
            - label
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: Continue the conversation by traveling down the specified path.
    NoReplyRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - no-reply
          x-enumNames:
            - NO_REPLY
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
      additionalProperties: {}
      description: >-
        Represents the user failing to reply, typically sent after a reasonable
        timeout.
    MessageRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - message
          x-enumNames:
            - MESSAGE
        payload:
          type: object
          properties:
            message:
              type: string
          required:
            - message
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: Similar to the `text` action.
    EndRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - end
          x-enumNames:
            - END
        payload:
          type: object
          properties:
            reason:
              type: string
            message:
              type: string
          required:
            - reason
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
      additionalProperties: {}
      description: Sent to indicate the conversation has been ended.
    DTMFRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - dtmf
          x-enumNames:
            - DTMF
        payload:
          type: string
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: Represents the result of a dial-tone input, used for phone calls.
    LiveAgentHandoffRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - live-agent-handoff
          x-enumNames:
            - LIVE_AGENT_HANDOFF
        payload:
          oneOf:
            - $ref: '#/components/schemas/LiveAgentHandoffMessagePayload'
            - $ref: '#/components/schemas/LiveAgentHandoffFileUploadPayload'
            - $ref: '#/components/schemas/LiveAgentHandoffContinueConversationPayload'
            - $ref: '#/components/schemas/LiveAgentHandoffReturnToVoiceflowPayload'
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: Sent to interact with a connected live agent.
    GeneralRequest:
      type: object
      properties:
        type:
          type: string
        payload:
          type: object
          properties:
            actions:
              type: array
              items:
                $ref: '#/components/schemas/BaseAction'
            label:
              type: string
          additionalProperties: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
      additionalProperties: {}
      description: Represents an non-system-defined action.
    AlexaIntentRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - intent
          x-enumNames:
            - INTENT
        payload:
          type: object
          properties:
            actions:
              type: array
              items:
                $ref: '#/components/schemas/BaseAction'
            label:
              type: string
            data:
              type: object
              additionalProperties: {}
            query:
              default: ''
              type: string
            intent:
              type: object
              properties:
                name:
                  type: string
              required:
                - name
              additionalProperties: {}
            entities:
              default: []
              type: array
              items:
                $ref: '#/components/schemas/IntentRequestEntity'
            confidence:
              type: number
          required:
            - data
            - intent
            - entities
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: Legacy intent request type that `general-runtime` expects Alexa to send
    LegacyIntentRequest:
      type: object
      properties:
        type:
          type: string
          enum:
            - intent
          x-enumNames:
            - INTENT
        payload:
          type: object
          properties:
            actions:
              type: array
              items:
                $ref: '#/components/schemas/BaseAction'
            label:
              type: string
            query:
              default: ''
              type: string
            intent:
              type: object
              properties:
                name:
                  type: string
              required:
                - name
              additionalProperties: {}
            entities:
              default: []
              type: array
              items:
                $ref: '#/components/schemas/IntentRequestEntity'
            confidence:
              type: number
          required:
            - intent
            - entities
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      additionalProperties: {}
      description: >-
        The legacy intent request type that `general-runtime` expects from its
        clients.
    AudioTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - audio
          x-enumNames:
            - AUDIO
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          anyOf:
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - start
                  x-enumNames:
                    - START
                messageID:
                  type: string
                delay:
                  type: number
              required:
                - state
                - messageID
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - content
                  x-enumNames:
                    - CONTENT
                content:
                  type: string
                encoding:
                  $ref: '#/components/schemas/AudioEncoding'
                duration:
                  type: number
              required:
                - state
                - content
                - encoding
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - end
                  x-enumNames:
                    - END
              required:
                - state
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          An audio response event. The payload's `state` field selects the
          shape: `start` announces a `messageID`, `content` carries the audio in
          `content` with its `encoding`, and `end` carries the state alone.
      description: >-
        An audio response event. The payload's `state` field selects the shape:
        `start` announces a `messageID`, `content` carries the audio in
        `content` with its `encoding`, and `end` carries the state alone.
    SpeakTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - speak
          x-enumNames:
            - SPEAK
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            ai:
              type: boolean
            message:
              type: string
            type:
              $ref: '#/components/schemas/TraceSpeakType'
            src:
              nullable: true
              type: string
            voice:
              type: string
            isPrompt:
              type: boolean
          required:
            - message
            - type
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          A spoken response for voice channels, carrying the message text and
          optionally a synthesized audio source and voice name.
      description: >-
        A spoken response for voice channels, carrying the message text and
        optionally a synthesized audio source and voice name.
    StreamTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - stream
          x-enumNames:
            - STREAM
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            src:
              type: string
            token:
              type: string
            action:
              $ref: '#/components/schemas/TraceStreamAction'
            loop:
              type: boolean
            title:
              type: string
            iconImage:
              type: string
            description:
              type: string
            backgroundImage:
              type: string
          required:
            - src
            - token
            - action
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          An audio stream event. The payload carries the source in `src`, a
          `token`, and an `action` of `LOOP`, `PLAY`, `PAUSE`, or `END`;
          `title`, `description`, `iconImage`, `backgroundImage`, and `loop` are
          optional.
      description: >-
        An audio stream event. The payload carries the source in `src`, a
        `token`, and an `action` of `LOOP`, `PLAY`, `PAUSE`, or `END`; `title`,
        `description`, `iconImage`, `backgroundImage`, and `loop` are optional.
    BlockTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - block
          x-enumNames:
            - BLOCK
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            blockID:
              type: string
          required:
            - blockID
      required:
        - type
        - payload
      x-vf-doc:
        description: Marks the conversation entering a block, identified by its block ID.
      description: Marks the conversation entering a block, identified by its block ID.
    CardTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - cardV2
          x-enumNames:
            - CARD_V_2
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          $ref: '#/components/schemas/CardTraceCard'
      required:
        - type
        - payload
    CarouselTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - carousel
          x-enumNames:
            - CAROUSEL
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            ref:
              allOf:
                - $ref: '#/components/schemas/DebugTraceRef'
            cards:
              type: array
              items:
                $ref: '#/components/schemas/TraceCarouselCard'
            layout:
              $ref: '#/components/schemas/CarouselLayout'
            messageID:
              type: string
          required:
            - cards
            - layout
      required:
        - type
        - payload
    ChannelActionTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - channel-action
          x-enumNames:
            - CHANNEL_ACTION
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            name:
              type: string
            payload:
              type: object
              additionalProperties: {}
          required:
            - name
            - payload
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          A channel-specific action, named by the channel integration, with an
          action-defined payload.
      description: >-
        A channel-specific action, named by the channel integration, with an
        action-defined payload.
    ChoiceTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - choice
          x-enumNames:
            - CHOICE
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            ref:
              allOf:
                - $ref: '#/components/schemas/DebugTraceRef'
            buttons:
              type: array
              items:
                $ref: '#/components/schemas/Button'
            messageID:
              type: string
          required:
            - buttons
      required:
        - type
        - payload
    CompletionTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - completion
          x-enumNames:
            - COMPLETION
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          anyOf:
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - start
                  x-enumNames:
                    - START
                ai:
                  type: boolean
                sourceUrls:
                  type: array
                  items:
                    type: object
                    properties:
                      url:
                        type: string
                      name:
                        type: string
                    required:
                      - url
                delay:
                  type: number
                messageID:
                  type: string
                ref:
                  allOf:
                    - $ref: '#/components/schemas/DebugTraceRef'
              required:
                - state
                - messageID
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - content
                  x-enumNames:
                    - CONTENT
                content:
                  type: string
              required:
                - state
                - content
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - end
                  x-enumNames:
                    - END
                ref:
                  allOf:
                    - $ref: '#/components/schemas/DebugTraceRef'
              required:
                - state
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Marks a model completion event during the turn. Streaming clients
          receive the completion lifecycle described under completion event
          traces.
      description: >-
        Marks a model completion event during the turn. Streaming clients
        receive the completion lifecycle described under completion event
        traces.
    DebugTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - debug
          x-enumNames:
            - DEBUG
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            ref:
              allOf:
                - $ref: '#/components/schemas/DebugTraceRef'
            type:
              type: string
            level:
              allOf:
                - $ref: '#/components/schemas/DebugTraceLevel'
            message:
              type: string
            context:
              type: string
            metadata:
              type: object
              additionalProperties: {}
          required:
            - message
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Debug output for the turn, with a message and optional level, context,
          and metadata. Surfaced in agent logs rather than to end users.
      description: >-
        Debug output for the turn, with a message and optional level, context,
        and metadata. Surfaced in agent logs rather than to end users.
    DTMFTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - dtmf
          x-enumNames:
            - DTMF
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          $ref: '#/components/schemas/DTMFTracePayload'
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Configures keypad (DTMF) input collection on a call: whether it is
          enabled, the timeout, the ending delimiter, and the digit cap.
      description: >-
        Configures keypad (DTMF) input collection on a call: whether it is
        enabled, the timeout, the ending delimiter, and the digit cap.
    EntityFillingTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - entity-filling
          x-enumNames:
            - ENTITY_FILLING
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            entityToFill:
              type: string
            intent:
              $ref: '#/components/schemas/IntentRequest'
          required:
            - entityToFill
            - intent
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Requests a value for a named entity, wrapping the intent request being
          filled.
      description: >-
        Requests a value for a named entity, wrapping the intent request being
        filled.
    ExitTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - end
          x-enumNames:
            - END
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload: {}
      required:
        - type
    FlowTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - flow
          x-enumNames:
            - FLOW
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            name:
              type: string
            diagramID:
              type: string
          required:
            - diagramID
      required:
        - type
        - payload
      x-vf-doc:
        description: Marks the conversation entering a flow, identified by its diagram ID.
      description: Marks the conversation entering a flow, identified by its diagram ID.
    GoToTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - goto
          x-enumNames:
            - GOTO
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            request:
              $ref: '#/components/schemas/BaseRequest'
          required:
            - request
      required:
        - type
        - payload
      x-vf-doc:
        description: Instructs the client to re-send the wrapped request on the next turn.
      description: Instructs the client to re-send the wrapped request on the next turn.
    LogTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - log
          x-enumNames:
            - LOG
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          additionalProperties: {}
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Diagnostic log output attached to the turn. The `payload` is always
          present and is a free-form object: the spec declares no named fields
          on it and permits any.
      description: >-
        Diagnostic log output attached to the turn. The `payload` is always
        present and is a free-form object: the spec declares no named fields on
        it and permits any.
    NoReplyTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - no-reply
          x-enumNames:
            - NO_REPLY
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            timeout:
              type: number
          required:
            - timeout
      required:
        - type
        - payload
    PathTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - path
          x-enumNames:
            - PATH
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            path:
              type: string
          required:
            - path
      required:
        - type
        - payload
      x-vf-doc:
        description: Reports which path the conversation took out of a step.
      description: Reports which path the conversation took out of a step.
    TextTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - text
          x-enumNames:
            - TEXT
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            ai:
              type: boolean
            message:
              type: string
            ref:
              allOf:
                - $ref: '#/components/schemas/DebugTraceRef'
            slate:
              type: object
              properties:
                id:
                  type: string
                content:
                  type: array
                  items: {}
              required:
                - id
                - content
            delay:
              type: number
            voice:
              type: string
            audio:
              type: object
              properties:
                src:
                  type: string
              required:
                - src
            messageID:
              type: string
            sourceUrls:
              type: array
              items:
                type: object
                properties:
                  url:
                    type: string
                  name:
                    type: string
                required:
                  - url
          required:
            - message
            - slate
            - messageID
      required:
        - type
        - payload
    ReasoningTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - reasoning
          x-enumNames:
            - REASONING
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          oneOf:
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - start
                  x-enumNames:
                    - START
              required:
                - state
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - content
                  x-enumNames:
                    - CONTENT
                content:
                  type: string
              required:
                - state
                - content
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - end
                  x-enumNames:
                    - END
              required:
                - state
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - final
                  x-enumNames:
                    - FINAL
                message:
                  type: string
              required:
                - state
                - message
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Marks model reasoning activity during the turn. The payload's `state`
          field selects the shape: `content` carries a `content` string, `final`
          carries a `message`, and `start` and `end` carry the state alone.
      description: >-
        Marks model reasoning activity during the turn. The payload's `state`
        field selects the shape: `content` carries a `content` string, `final`
        carries a `message`, and `start` and `end` carry the state alone.
    VisualTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - visual
          x-enumNames:
            - VISUAL
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          $ref: '#/components/schemas/VisualTraceImage'
      required:
        - type
        - payload
      x-vf-doc:
        description: Displays an image, with optional device sizing and layout options.
      description: Displays an image, with optional device sizing and layout options.
    KnowledgeBaseTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - knowledgeBase
          x-enumNames:
            - KNOWLEDGE_BASE
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          type: object
          properties:
            chunks:
              type: array
              items:
                type: object
                properties:
                  score:
                    type: number
                  documentID:
                    type: string
                  documentData: {}
                required:
                  - score
                  - documentID
                  - documentData
            query:
              type: object
              properties:
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                      content:
                        type: string
                    required:
                      - role
                      - content
                output:
                  nullable: true
                  type: string
              required:
                - messages
                - output
          required:
            - chunks
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Reports a knowledge base retrieval: the chunks returned and the query
          that produced them.
      description: >-
        Reports a knowledge base retrieval: the chunks returned and the query
        that produced them.
    CallForwardTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - call-forward
          x-enumNames:
            - CALL_FORWARD
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          anyOf:
            - $ref: '#/components/schemas/CallForwardPhone'
            - $ref: '#/components/schemas/CallForwardSIP'
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Signals that the call is being forwarded. The payload always carries
          the destination in `address` and its kind in `addressType`; a `phone`
          forward may also carry an `extension` and a `callerIDPassthrough`
          flag. See the call forward step for configuration.
      description: >-
        Signals that the call is being forwarded. The payload always carries the
        destination in `address` and its kind in `addressType`; a `phone`
        forward may also carry an `extension` and a `callerIDPassthrough` flag.
        See the call forward step for configuration.
    RealtimeAgentTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - realtime-agent
          x-enumNames:
            - REALTIME_AGENT
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          oneOf:
            - type: object
              properties:
                action:
                  type: string
                  enum:
                    - START
                  x-enumNames:
                    - START
                input:
                  type: object
                  properties:
                    encoding:
                      $ref: '#/components/schemas/AudioEncoding'
                    sampleRate:
                      type: number
                  required:
                    - encoding
                output:
                  type: object
                  properties:
                    encoding:
                      $ref: '#/components/schemas/AudioEncoding'
                    sampleRate:
                      type: number
                  required:
                    - encoding
              required:
                - action
                - input
                - output
            - type: object
              properties:
                action:
                  type: string
                  enum:
                    - END
                  x-enumNames:
                    - END
              required:
                - action
            - type: object
              properties:
                action:
                  type: string
                  enum:
                    - INTERRUPTED
                  x-enumNames:
                    - INTERRUPTED
              required:
                - action
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Marks realtime agent activity on the turn. The payload's `action`
          field selects the shape: `START` carries `input` and `output`, while
          `END` and `INTERRUPTED` carry the action alone.
      description: >-
        Marks realtime agent activity on the turn. The payload's `action` field
        selects the shape: `START` carries `input` and `output`, while `END` and
        `INTERRUPTED` carry the action alone.
    LiveAgentHandoffTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - live-agent-handoff
          x-enumNames:
            - LIVE_AGENT_HANDOFF
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          anyOf:
            - type: object
              properties:
                conversationID:
                  type: string
                  minLength: 1
                message:
                  type: string
                translationKey:
                  type: string
                translationParams:
                  type: object
                  additionalProperties:
                    type: string
                agent:
                  type: object
                  properties:
                    name:
                      type: string
                      minLength: 1
                    imageUrl:
                      type: string
                      format: uri
                  required:
                    - name
                event:
                  type: string
                  enum:
                    - chat_started
                  x-enumNames:
                    - CHAT_STARTED
                provider:
                  allOf:
                    - $ref: '#/components/schemas/LiveAgentHandoffProvider'
                config:
                  allOf:
                    - $ref: '#/components/schemas/LiveAgentHandoffWidgetConfig'
              required:
                - conversationID
                - message
                - event
            - type: object
              properties:
                conversationID:
                  type: string
                  minLength: 1
                message:
                  type: string
                translationKey:
                  type: string
                translationParams:
                  type: object
                  additionalProperties:
                    type: string
                agent:
                  type: object
                  properties:
                    name:
                      type: string
                      minLength: 1
                    imageUrl:
                      type: string
                      format: uri
                  required:
                    - name
                event:
                  anyOf:
                    - type: string
                      enum:
                        - chat_ended
                      x-enumNames:
                        - CHAT_ENDED
                    - type: string
                      enum:
                        - chat_dismissed
                      x-enumNames:
                        - CHAT_DISMISSED
                downloadMessage:
                  type: string
                continueMessage:
                  type: string
                newConversationMessage:
                  type: string
              required:
                - conversationID
                - message
                - event
            - type: object
              properties:
                conversationID:
                  type: string
                  minLength: 1
                message:
                  type: string
                translationKey:
                  type: string
                translationParams:
                  type: object
                  additionalProperties:
                    type: string
                agent:
                  type: object
                  properties:
                    name:
                      type: string
                      minLength: 1
                    imageUrl:
                      type: string
                      format: uri
                  required:
                    - name
                event:
                  type: string
                  enum:
                    - file_received
                  x-enumNames:
                    - FILE_RECEIVED
                file:
                  type: object
                  properties:
                    url:
                      type: string
                    name:
                      type: string
                    type:
                      type: string
                  required:
                    - url
                    - name
              required:
                - conversationID
                - message
                - event
                - file
            - type: object
              properties:
                conversationID:
                  type: string
                  minLength: 1
                message:
                  type: string
                translationKey:
                  type: string
                translationParams:
                  type: object
                  additionalProperties:
                    type: string
                agent:
                  type: object
                  properties:
                    name:
                      type: string
                      minLength: 1
                    imageUrl:
                      type: string
                      format: uri
                  required:
                    - name
                event:
                  anyOf:
                    - type: string
                      enum:
                        - participant_joined
                      x-enumNames:
                        - PARTICIPANT_JOINED
                    - type: string
                      enum:
                        - message_received
                      x-enumNames:
                        - MESSAGE_RECEIVED
                    - type: string
                      enum:
                        - event
                      x-enumNames:
                        - EVENT
                    - type: string
                      enum:
                        - wait_time
                      x-enumNames:
                        - WAIT_TIME
                    - type: string
                      enum:
                        - chat_dismissal_warning
                      x-enumNames:
                        - CHAT_DISMISSAL_WARNING
              required:
                - conversationID
                - message
                - event
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Signals a handoff of the conversation to a live agent platform. Every
          shape of the payload carries `conversationID`, `message`, and `event`;
          the remaining fields vary by shape, and some carry a `provider` naming
          the platform.
      description: >-
        Signals a handoff of the conversation to a live agent platform. Every
        shape of the payload carries `conversationID`, `message`, and `event`;
        the remaining fields vary by shape, and some carry a `provider` naming
        the platform.
    ToolCallTrace:
      type: object
      properties:
        type:
          type: string
          enum:
            - tool-call
          x-enumNames:
            - TOOL_CALL
        paths:
          type: array
          items:
            $ref: '#/components/schemas/TracePath'
        defaultPath:
          type: number
        time:
          type: number
        turnID:
          type: string
        handleID:
          type: string
        payload:
          anyOf:
            - type: object
              properties:
                callID:
                  type: string
                sound:
                  type: object
                  properties:
                    ref:
                      type: string
                    volume:
                      type: number
                      minimum: 0
                      maximum: 1
                  required:
                    - ref
                state:
                  type: string
                  enum:
                    - start
                  x-enumNames:
                    - START
              required:
                - callID
                - state
            - type: object
              properties:
                state:
                  type: string
                  enum:
                    - end
                  x-enumNames:
                    - END
                callID:
                  type: string
              required:
                - state
                - callID
      required:
        - type
        - payload
      x-vf-doc:
        description: >-
          Marks a tool call made by the agent during the turn. The payload
          always carries the `callID` and a `state` of `start` or `end`; a
          `start` may also carry a `sound`.
      description: >-
        Marks a tool call made by the agent during the turn. The payload always
        carries the `callID` and a `state` of `start` or `end`; a `start` may
        also carry a `sound`.
    BaseAction:
      type: object
      properties:
        type:
          type: string
        payload: {}
      required:
        - type
        - payload
    IntentRequestPayload:
      type: object
      properties:
        actions:
          type: array
          items:
            $ref: '#/components/schemas/BaseAction'
        label:
          type: string
        data:
          type: object
          additionalProperties: {}
        query:
          default: ''
          type: string
        intent:
          type: object
          properties:
            name:
              type: string
          required:
            - name
          additionalProperties: {}
        entities:
          default: []
          type: array
          items:
            $ref: '#/components/schemas/IntentRequestEntity'
        confidence:
          type: number
      required:
        - intent
    EventRequestPayload:
      type: object
      properties:
        actions:
          type: array
          items:
            $ref: '#/components/schemas/BaseAction'
        label:
          type: string
        event:
          type: object
          properties:
            name:
              type: string
          required:
            - name
          additionalProperties: {}
      required:
        - event
    LiveAgentHandoffMessagePayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - message
          x-enumNames:
            - MESSAGE
        message:
          type: string
      required:
        - type
        - message
    LiveAgentHandoffFileUploadPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - file_upload
          x-enumNames:
            - FILE_UPLOAD
        files:
          minItems: 1
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                minLength: 1
              name:
                type: string
              size:
                type: number
              type:
                type: string
              status:
                type: string
                enum:
                  - uploaded
                  - failed
                x-enumNames:
                  - UPLOADED
                  - FAILED
              metadata:
                type: object
                additionalProperties: {}
            required:
              - id
              - name
              - size
              - type
      required:
        - type
        - files
    LiveAgentHandoffContinueConversationPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - continue_conversation
          x-enumNames:
            - CONTINUE_CONVERSATION
      required:
        - type
    LiveAgentHandoffReturnToVoiceflowPayload:
      type: object
      properties:
        type:
          type: string
          enum:
            - return_to_voiceflow
          x-enumNames:
            - RETURN_TO_VOICEFLOW
      required:
        - type
    IntentRequestEntity:
      type: object
      properties:
        name:
          type: string
        value:
          type: string
        query:
          type: string
        verboseValue:
          type: array
          items:
            $ref: '#/components/schemas/VerboseValue'
      required:
        - name
        - value
    TracePath:
      type: object
      properties:
        label:
          type: string
        event:
          allOf:
            - $ref: '#/components/schemas/BaseRequest'
    AudioEncoding:
      type: string
      enum:
        - audio/mp3
        - audio/x-mulaw
        - audio/pcm
      x-enumNames:
        - MP_3
        - MULAW
        - PCM
    TraceSpeakType:
      type: string
      enum:
        - audio
        - message
      x-enumNames:
        - AUDIO
        - MESSAGE
    TraceStreamAction:
      type: string
      enum:
        - LOOP
        - PLAY
        - PAUSE
        - END
      x-enumNames:
        - LOOP
        - PLAY
        - PAUSE
        - END
    CardTraceCard:
      type: object
      properties:
        ref:
          allOf:
            - $ref: '#/components/schemas/DebugTraceRef'
        title:
          type: string
        buttons:
          type: array
          items:
            $ref: '#/components/schemas/Button'
        imageUrl:
          nullable: true
          type: string
        messageID:
          type: string
        description:
          type: object
          properties:
            text:
              type: string
            slate:
              type: array
              items: {}
          required:
            - text
      required:
        - title
        - buttons
        - imageUrl
        - description
    DebugTraceRef:
      oneOf:
        - $ref: '#/components/schemas/DebugTraceNodeRef'
        - $ref: '#/components/schemas/DebugTraceAgentRef'
        - $ref: '#/components/schemas/DebugTracePromptRef'
        - $ref: '#/components/schemas/DebugTraceAPIToolRef'
        - $ref: '#/components/schemas/DebugTraceFunctionRef'
        - $ref: '#/components/schemas/DebugTraceIntegrationToolRef'
        - $ref: '#/components/schemas/DebugTraceMcpIntegrationToolRef'
    TraceCarouselCard:
      type: object
      properties:
        ref:
          allOf:
            - $ref: '#/components/schemas/DebugTraceRef'
        title:
          type: string
        buttons:
          type: array
          items:
            $ref: '#/components/schemas/Button'
        imageUrl:
          nullable: true
          type: string
        messageID:
          type: string
        description:
          type: object
          properties:
            text:
              type: string
            slate:
              type: array
              items: {}
          required:
            - text
        id:
          type: string
      required:
        - title
        - buttons
        - imageUrl
        - description
    CarouselLayout:
      type: string
      enum:
        - List
        - Carousel
      x-enumNames:
        - LIST
        - CAROUSEL
    Button:
      type: object
      properties:
        name:
          type: string
        request:
          allOf:
            - $ref: '#/components/schemas/BaseRequest'
      required:
        - name
    DebugTraceLevel:
      type: string
      enum:
        - fatal
        - error
        - warn
        - info
        - debug
      x-enumNames:
        - FATAL
        - ERROR
        - WARN
        - INFO
        - DEBUG
    DTMFTracePayload:
      type: object
      properties:
        enabled:
          type: boolean
          description: Enables the new DTMF collection and configuration
        timeoutInSeconds:
          type: number
          minimum: 0
          maximum: 10
          description: >-
            How long to wait before processing the DTMF input. Set to 0 to
            process only after a delimiter is provided.
        delimiter:
          type: array
          items:
            $ref: '#/components/schemas/DTMFDelimiter'
          description: Which key to use to end DTMF input. Defaults to '#'
        maxDigits:
          type: number
          minimum: 1
          maximum: 20
          description: The maximum number of digits before we finish their input
      required:
        - enabled
        - timeoutInSeconds
        - delimiter
        - maxDigits
    BaseRequest:
      type: object
      properties:
        type:
          type: string
        payload: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
    VisualTraceImage:
      type: object
      properties:
        visualType:
          type: string
          enum:
            - image
          x-enumNames:
            - IMAGE
        image:
          nullable: true
          type: string
        device:
          nullable: true
          type: string
        options:
          type: object
          properties:
            loop:
              type: boolean
        frameType:
          type: string
        dimensions:
          nullable: true
          type: object
          properties:
            width:
              type: number
            height:
              type: number
          required:
            - width
            - height
        canvasVisibility:
          allOf:
            - $ref: '#/components/schemas/CanvasVisibility'
      required:
        - image
    CallForwardPhone:
      type: object
      properties:
        addressType:
          type: string
          enum:
            - phone
          x-enumNames:
            - PHONE
        address:
          type: string
        extension:
          type: string
        callerIDPassthrough:
          type: boolean
      required:
        - addressType
        - address
    CallForwardSIP:
      type: object
      properties:
        addressType:
          type: string
          enum:
            - sip
          x-enumNames:
            - SIP
        address:
          type: string
      required:
        - addressType
        - address
    LiveAgentHandoffProvider:
      type: string
      enum:
        - ujet
        - genesys
        - kustomer
        - dixa
      x-enumNames:
        - UJET
        - GENESYS
        - KUSTOMER
        - DIXA
    LiveAgentHandoffWidgetConfig:
      type: object
      properties:
        returnToAI:
          type: boolean
        disableFileUpload:
          type: boolean
    VerboseValue:
      type: object
      properties:
        rawText:
          type: string
        canonicalText:
          type: string
        startIndex:
          type: number
      required:
        - rawText
        - canonicalText
        - startIndex
    DebugTraceNodeRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - node
          x-enumNames:
            - NODE
        nodeID:
          type: string
        nodeType:
          type: string
        diagramID:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - nodeType
        - diagramID
    DebugTraceAgentRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - agent
          x-enumNames:
            - AGENT
        nodeID:
          type: string
        agentID:
          type: string
        diagramID:
          type: string
        agentName:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - agentID
        - diagramID
    DebugTracePromptRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - prompt
          x-enumNames:
            - PROMPT
        nodeID:
          type: string
        promptID:
          type: string
        diagramID:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - promptID
        - diagramID
    DebugTraceAPIToolRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - api-tool
          x-enumNames:
            - API_TOOL
        nodeID:
          type: string
        diagramID:
          type: string
        apiToolID:
          type: string
        apiToolName:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - diagramID
        - apiToolID
    DebugTraceFunctionRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - function
          x-enumNames:
            - FUNCTION
        nodeID:
          type: string
        diagramID:
          type: string
        functionID:
          type: string
        functionName:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - diagramID
        - functionID
    DebugTraceIntegrationToolRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - integration-tool
          x-enumNames:
            - INTEGRATION_TOOL
        nodeID:
          type: string
        diagramID:
          type: string
        diagramName:
          type: string
        integrationToolName:
          type: string
      required:
        - type
        - nodeID
        - diagramID
        - integrationToolName
    DebugTraceMcpIntegrationToolRef:
      type: object
      properties:
        type:
          type: string
          enum:
            - mcp-integration-tool
          x-enumNames:
            - MCP_INTEGRATION_TOOL
        nodeID:
          type: string
        diagramID:
          type: string
        mcpToolName:
          type: string
        diagramName:
          type: string
      required:
        - type
        - nodeID
        - diagramID
        - mcpToolName
    DTMFDelimiter:
      type: string
      enum:
        - '#'
        - '*'
      x-enumNames:
        - '#'
        - '*'
    CanvasVisibility:
      type: string
      enum:
        - full
        - hidden
        - cropped
      x-enumNames:
        - FULL
        - HIDDEN
        - CROPPED
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````