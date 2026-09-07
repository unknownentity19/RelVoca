> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete state

> Discards the stored state for one conversation, so the next turn on that `userID` begins from the start. The response carries only a confirmation message.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/conversation-state/{userID}
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
    delete:
      tags:
        - Conversation State
      summary: Delete state
      description: >-
        Discards the stored state for one conversation, so the next turn on that
        `userID` begins from the start. The response carries only a confirmation
        message.
      operationId: StableConversationStateController_delete
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
            Confirms the user's stored state was deleted. The body is a message
            only, so nothing of the discarded stack, storage, or variables comes
            back with it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the user's stored state was deleted. The body is a
              message only, so nothing of the discarded stack, storage, or
              variables comes back with it.
      security:
        - token: []
components:
  schemas:
    StableDeleteResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the deletion.
      required:
        - message
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````