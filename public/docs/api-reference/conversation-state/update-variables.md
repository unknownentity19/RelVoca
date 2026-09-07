> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update variables

> Updates variables in the conversation state by merging with the properties in the request body.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/conversation-state/{userID}/variables
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
  /v1/stable/conversation-state/{userID}/variables:
    patch:
      tags:
        - Conversation State
      summary: Update variables
      description: >-
        Updates variables in the conversation state by merging with the
        properties in the request body.
      operationId: StableConversationStateController_updateVariables
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
              $ref: '#/components/schemas/StableConversationUpdateVariablesRequest'
      responses:
        '200':
          description: >-
            Confirms the supplied variables were merged into the session's
            existing values. The response is a message only, so read the state
            back if you need the merged result.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the supplied variables were merged into the session's
              existing values. The response is a message only, so read the state
              back if you need the merged result.
      security:
        - token: []
components:
  schemas:
    StableConversationUpdateVariablesRequest:
      type: object
      properties:
        variables:
          type: object
          additionalProperties: {}
          description: >-
            Variable values to set on the conversation session, keyed by
            variable name.
      required:
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