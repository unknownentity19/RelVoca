> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update document

> Changes an existing document in place. The response carries only a confirmation message, so refetch the document to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/document/{documentID}
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
  /v1/stable/document/{documentID}:
    patch:
      tags:
        - Document
      summary: Update document
      description: >-
        Changes an existing document in place. The response carries only a
        confirmation message, so refetch the document to read its new values.
      operationId: StableDocumentController_update
      parameters:
        - name: documentID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the knowledge base document to operate on.
          description: The ID of the knowledge base document to operate on.
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
              allOf:
                - $ref: '#/components/schemas/StableDocumentUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the document was updated. The response is a message rather
            than the revised document, so fetch it again to check its status or
            read the resulting chunks.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the document was updated. The response is a message
              rather than the revised document, so fetch it again to check its
              status or read the resulting chunks.
      security:
        - token: []
components:
  schemas:
    StableDocumentUpdateRequest:
      type: object
      properties:
        metadata:
          type: array
          items:
            type: object
            properties:
              key:
                type: string
                description: The name of the metadata field.
              values:
                type: array
                items:
                  type: string
                description: The values assigned to this metadata field.
            required:
              - key
              - values
          description: >-
            Metadata tags attached to the document, used to filter knowledge
            base retrieval at runtime.
      required:
        - metadata
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