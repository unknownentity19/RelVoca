> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List API tools

> Returns every API tool in the environment. An API tool is a saved HTTP request an agent can make. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/api-tool
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
  /v1/stable/api-tool:
    get:
      tags:
        - API Tool
      summary: List API tools
      description: >-
        Returns every API tool in the environment. An API tool is a saved HTTP
        request an agent can make. The call takes no paging parameters, so one
        request yields the whole set.
      operationId: StableAPIToolController_list
      parameters:
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
            Returns every API tool saved in the project's environment, each with
            its HTTP method, URL, headers, query parameters, body, and the
            description the agent uses to decide when to call it.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableAPIToolListResponse'
          x-vf-doc:
            description: >-
              Returns every API tool saved in the project's environment, each
              with its HTTP method, URL, headers, query parameters, body, and
              the description the agent uses to decide when to call it.
      security:
        - token: []
components:
  schemas:
    StableAPIToolListResponse:
      type: object
      properties:
        apiTools:
          type: array
          items:
            $ref: '#/components/schemas/StableAPITool'
      required:
        - apiTools
    StableAPITool:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        url:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        body:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolBody'
        image:
          nullable: true
          description: The URL of the image displayed for the API tool in the UI.
          type: string
        headers:
          type: array
          items:
            $ref: '#/components/schemas/StableAPIHeader'
        settings:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/APIToolSettings'
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        updatedAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        httpMethod:
          $ref: '#/components/schemas/APIToolHTTPMethodType'
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
      required:
        - id
        - name
        - url
        - body
        - image
        - headers
        - createdAt
        - updatedAt
        - httpMethod
        - description
        - queryParameters
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