> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update MCP server

> Changes an existing MCP server in place. The response carries only a confirmation message, so refetch the MCP server to read its new values.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json patch /v1/stable/mcp-server/{serverID}
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
  /v1/stable/mcp-server/{serverID}:
    patch:
      tags:
        - MCP Server
      summary: Update MCP server
      description: >-
        Changes an existing MCP server in place. The response carries only a
        confirmation message, so refetch the MCP server to read its new values.
      operationId: StableMCPServerController_update
      parameters:
        - name: serverID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the MCP server to operate on.
          description: The ID of the MCP server to operate on.
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
                - $ref: '#/components/schemas/StableMCPServerUpdateRequest'
      responses:
        '200':
          description: >-
            Confirms the server's connection details were updated. The body is a
            message only, so refetch the server to read its current URL,
            description, and specification version.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the server's connection details were updated. The body is
              a message only, so refetch the server to read its current URL,
              description, and specification version.
      security:
        - token: []
components:
  schemas:
    StableMCPServerUpdateRequest:
      type: object
      properties:
        name:
          type: string
        description:
          nullable: true
          description: A human-readable description of what the MCP server provides.
          type: string
        specification:
          allOf:
            - $ref: '#/components/schemas/McpServerSpecification'
        url:
          allOf:
            - $ref: '#/components/schemas/Markup'
        headers:
          type: array
          items:
            type: object
            properties:
              key:
                type: string
                description: The name of the HTTP header sent to the MCP server.
              value:
                $ref: '#/components/schemas/Markup'
            required:
              - key
              - value
      additionalProperties: false
    StableUpdateResponse:
      type: object
      properties:
        message:
          type: string
          description: A human-readable message confirming the update.
      required:
        - message
    McpServerSpecification:
      type: string
      enum:
        - '2025-03-26'
        - '2025-06-18'
      x-enumNames:
        - V_2025_03_26
        - V_2025_06_18
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
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````