> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set property value

> Sets a property’s value on one conversation. Defining the property and setting it are separate calls, so the definition is reused across every transcript that carries it.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json put /v1/stable/transcript-property/{propertyID}/value
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
  /v1/stable/transcript-property/{propertyID}/value:
    put:
      tags:
        - Transcript Property
      summary: Set property value
      description: >-
        Sets a property’s value on one conversation. Defining the property and
        setting it are separate calls, so the definition is reused across every
        transcript that carries it.
      operationId: StableTranscriptPropertyController_setValue
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
              $ref: '#/components/schemas/StableTranscriptPropertySetValueRequest'
      responses:
        '200':
          description: >-
            Confirms the value was set on the transcript named in the request
            body. The body is a message only, so read the transcript back to see
            the stored value.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the value was set on the transcript named in the request
              body. The body is a message only, so read the transcript back to
              see the stored value.
      security:
        - token: []
components:
  schemas:
    StableTranscriptPropertySetValueRequest:
      type: object
      properties:
        value:
          type: string
          description: The value to set for the property on the transcript.
        transcriptID:
          type: string
          description: The ID of the transcript to set the property value on.
      required:
        - value
        - transcriptID
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