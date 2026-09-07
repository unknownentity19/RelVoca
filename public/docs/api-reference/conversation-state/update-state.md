> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update state

> Changes the stored state of a live conversation, which is how a caller seeds or corrects variables between turns without replaying the conversation.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/conversation-state/{userID}
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
    patch:
      tags:
        - Conversation State
      summary: Update state
      description: >-
        Changes the stored state of a live conversation, which is how a caller
        seeds or corrects variables between turns without replaying the
        conversation.
      operationId: StableConversationStateController_update
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableConversationUpdateStateRequest'
      responses:
        '200':
          description: >-
            Confirms the conversation state was written for that user. The body
            carries a message only, so fetch the state again to see the stack,
            storage, and variables as they now stand.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the conversation state was written for that user. The
              body carries a message only, so fetch the state again to see the
              stack, storage, and variables as they now stand.
      security:
        - token: []
components:
  schemas:
    StableConversationUpdateStateRequest:
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
      additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````