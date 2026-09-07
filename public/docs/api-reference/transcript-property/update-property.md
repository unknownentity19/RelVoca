> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update property

> Changes an existing transcript property in place. The response carries only a confirmation message, so refetch the transcript property to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/transcript-property/{propertyID}
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
  /v1/stable/transcript-property/{propertyID}:
    patch:
      tags:
        - Transcript Property
      summary: Update property
      description: >-
        Changes an existing transcript property in place. The response carries
        only a confirmation message, so refetch the transcript property to read
        its new values.
      operationId: StableTranscriptPropertyController_update
      parameters:
        - name: propertyID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the transcript property to operate on.
          description: The ID of the transcript property to operate on.
        - name: projectID
          required: true
          in: query
          schema:
            type: string
            description: The ID of the project to operate on.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/StableTranscriptPropertyUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the property was renamed. The body is a message rather than
            the updated property, so refetch the property to read its new name.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the property was renamed. The body is a message rather
              than the updated property, so refetch the property to read its new
              name.
      security:
        - token: []
components:
  schemas:
    StableTranscriptPropertyUpdateRequest:
      type: object
      properties:
        name:
          type: string
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