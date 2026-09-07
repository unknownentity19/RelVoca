> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get state

> Returns the stored state for one conversation - where it stands and what its variables hold - addressed by the same `userID` used to run it.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/conversation-state/{userID}
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
  /v1/stable/conversation-state/{userID}:
    get:
      tags:
        - Conversation State
      summary: Get state
      description: >-
        Returns the stored state for one conversation - where it stands and what
        its variables hold - addressed by the same `userID` used to run it.
      operationId: StableConversationStateController_get
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
        - name: version
          required: true
          in: query
          schema:
            type: string
            enum:
              - draft
              - published
            x-enumNames:
              - DRAFT
              - PUBLISHED
          x-vf-doc:
            description: >-
              Which version of the environment to read: the editable draft or
              the published one.
          description: >-
            Which version of the environment to read: the editable draft or the
            published one.
      responses:
        '200':
          description: >-
            Returns the user's session state for the requested version of the
            environment: every variable and its current value, the runtime
            storage carried between turns, and the execution stack showing which
            diagram and node the conversation is sitting on.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableConversationStateResponse'
          x-vf-doc:
            description: >-
              Returns the user's session state for the requested version of the
              environment: every variable and its current value, the runtime
              storage carried between turns, and the execution stack showing
              which diagram and node the conversation is sitting on.
      security:
        - token: []
components:
  schemas:
    StableConversationStateResponse:
      type: object
      properties:
        state:
          $ref: '#/components/schemas/StableConversationState'
      required:
        - state
    StableConversationState:
      type: object
      properties:
        stack:
          type: array
          items:
            type: object
            properties:
              nodeID:
                description: >-
                  The ID of the node currently being executed in this stack
                  frame.
                nullable: true
                type: string
              diagramID:
                type: string
                description: The ID of the diagram this stack frame is executing.
              name:
                nullable: true
                description: The name of the diagram this stack frame is executing.
                type: string
              storage:
                type: object
                additionalProperties: {}
                description: Internal runtime storage scoped to this stack frame.
              variables:
                type: object
                additionalProperties: {}
                description: Variable values scoped to this stack frame.
              commands:
                type: array
                items:
                  type: object
                  properties:
                    type:
                      type: string
                  required:
                    - type
                  additionalProperties: {}
              dynamicCommands:
                description: >-
                  Commands registered dynamically at runtime, keyed by command
                  name.
                type: object
                additionalProperties:
                  type: object
                  properties:
                    type:
                      type: string
                  required:
                    - type
                  additionalProperties: {}
            required:
              - diagramID
              - name
              - storage
              - variables
          description: >-
            The execution stack for the conversation, from root to innermost
            frame.
        storage:
          type: object
          additionalProperties: {}
          description: Internal runtime storage persisted across turns of the session.
        variables:
          type: object
          additionalProperties: {}
          description: The current values of the agent variables for this session.
      required:
        - stack
        - storage
        - variables
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````