> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete document

> Deletes a single document by ID. A document is a source the knowledge base retrieves from. The response carries only a confirmation message, so refetch the documents to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/document/{documentID}
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
    delete:
      tags:
        - Document
      summary: Delete document
      description: >-
        Deletes a single document by ID. A document is a source the knowledge
        base retrieves from. The response carries only a confirmation message,
        so refetch the documents to see what is left.
      operationId: StableDocumentController_delete
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
      responses:
        '200':
          description: >-
            Confirms the document was removed from the knowledge base. The body
            is a message only, not a copy of the deleted document.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the document was removed from the knowledge base. The
              body is a message only, not a copy of the deleted document.
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