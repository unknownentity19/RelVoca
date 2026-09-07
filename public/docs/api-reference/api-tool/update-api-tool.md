> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update API tool

> Changes an existing API tool in place. The response carries only a confirmation message, so refetch the API tool to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/api-tool/{toolID}
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
  /v1/stable/api-tool/{toolID}:
    patch:
      tags:
        - API Tool
      summary: Update API tool
      description: >-
        Changes an existing API tool in place. The response carries only a
        confirmation message, so refetch the API tool to read its new values.
      operationId: StableAPIToolController_update
      parameters:
        - name: toolID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the tool to operate on.
          description: The ID of the tool to operate on.
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
                - $ref: '#/components/schemas/StableAPIToolUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the API tool was updated. The response carries a message
            only, not the revised tool, so fetch the API tool again to read back
            the request it now sends.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the API tool was updated. The response carries a message
              only, not the revised tool, so fetch the API tool again to read
              back the request it now sends.
      security:
        - token: []
components:
  schemas:
    StableAPIToolUpdateRequest:
      type: object
      properties:
        url:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        name:
          type: string
        body:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolBody'
        headers:
          type: array
          items:
            $ref: '#/components/schemas/StableAPIHeader'
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolSettings'
        httpMethod:
          allOf:
            - $ref: '#/components/schemas/APIToolHTTPMethodType'
        description:
          nullable: true
          description: >-
            A description of what the API tool does, used by the agent to decide
            when to call it.
          type: string
        queryParameters:
          type: array
          items:
            $ref: '#/components/schemas/StableAPIQueryParameter'
      additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
    Markup:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/MarkupSpan'
          - $ref: '#/components/schemas/MarkupToolReference'
          - $ref: '#/components/schemas/MarkupSecretReference'
          - $ref: '#/components/schemas/MarkupEntityReference'
          - $ref: '#/components/schemas/MarkupVariableReference'
    APIToolBody:
      oneOf:
        - $ref: '#/components/schemas/APIToolRawBody'
        - $ref: '#/components/schemas/APIToolFormDataBody'
        - $ref: '#/components/schemas/APIToolURLEncodedBody'
    StableAPIHeader:
      type: object
      properties:
        key:
          nullable: true
          description: The name of the HTTP header to send with the request.
          type: string
        value:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
      required:
        - key
        - value
      additionalProperties: false
    APIToolSettings:
      type: object
      properties:
        timeoutMs:
          type: integer
          minimum: 0
          exclusiveMinimum: true
          maximum: 600000
    APIToolHTTPMethodType:
      type: string
      enum:
        - get
        - put
        - post
        - patch
        - delete
      x-enumNames:
        - GET
        - PUT
        - POST
        - PATCH
        - DELETE
    StableAPIQueryParameter:
      type: object
      properties:
        key:
          nullable: true
          description: The name of the query parameter to append to the request URL.
          type: string
        value:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
      required:
        - key
        - value
      additionalProperties: false
    MarkupSpan:
      type: object
      properties:
        text:
          $ref: '#/components/schemas/Markup'
        attributes:
          type: object
          additionalProperties: {}
      required:
        - text
    MarkupToolReference:
      type: object
      properties:
        resourceID:
          type: string
        referenceType:
          $ref: '#/components/schemas/MarkupToolReferenceType'
      required:
        - resourceID
        - referenceType
    MarkupSecretReference:
      type: object
      properties:
        secretID:
          type: string
      required:
        - secretID
    MarkupEntityReference:
      type: object
      properties:
        entityID:
          type: string
      required:
        - entityID
    MarkupVariableReference:
      type: object
      properties:
        variableID:
          type: string
        path:
          type: string
      required:
        - variableID
    APIToolRawBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - raw-input
          x-enumNames:
            - RAW_INPUT
        contentType:
          allOf:
            - $ref: '#/components/schemas/APIToolContentType'
        content:
          $ref: '#/components/schemas/CodeText'
      required:
        - type
        - content
    APIToolFormDataBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - form-data
          x-enumNames:
            - FORM_DATA
        formData:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
      required:
        - type
        - formData
    APIToolURLEncodedBody:
      type: object
      properties:
        type:
          type: string
          enum:
            - url-encoded
          x-enumNames:
            - URL_ENCODED
        params:
          type: array
          items:
            $ref: '#/components/schemas/APIToolKeyValue'
      required:
        - type
        - params
    MarkupToolReferenceType:
      type: string
      enum:
        - function
        - api-call
        - integration
        - mcp-integration
        - flow
        - agent
        - path-tool
        - system-tool
      x-enumNames:
        - FUNCTION
        - API_CALL
        - INTEGRATION
        - MCP_INTEGRATION
        - FLOW
        - AGENT
        - PATH_TOOL
        - SYSTEM_TOOL
    APIToolContentType:
      type: string
      enum:
        - text
        - json
        - xml
      x-enumNames:
        - TEXT
        - JSON
        - XML
    CodeText:
      type: array
      items:
        anyOf:
          - type: string
          - $ref: '#/components/schemas/MarkupVariableReference'
          - $ref: '#/components/schemas/MarkupEntityReference'
    APIToolKeyValue:
      type: object
      properties:
        id:
          type: string
        key:
          nullable: true
          type: string
        value:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
      required:
        - id
        - key
        - value
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````