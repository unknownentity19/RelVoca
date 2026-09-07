> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete property

> Deletes a single transcript property by ID. A transcript property is a label you define once and then set on individual conversations. The response carries only a confirmation message, so refetch the transcript properties to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/transcript-property/{propertyID}
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
    delete:
      tags:
        - Transcript Property
      summary: Delete property
      description: >-
        Deletes a single transcript property by ID. A transcript property is a
        label you define once and then set on individual conversations. The
        response carries only a confirmation message, so refetch the transcript
        properties to see what is left.
      operationId: StableTranscriptPropertyController_delete
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
      responses:
        '200':
          description: >-
            Confirms the transcript property was deleted. The body is a message
            only, so refetch the project's properties to see which ones remain
            available to filter on.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the transcript property was deleted. The body is a
              message only, so refetch the project's properties to see which
              ones remain available to filter on.
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