> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List MCP servers

> Returns every MCP server in the environment. A MCP server is a registered Model Context Protocol server whose tools an agent can call. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/mcp-server
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
  /v1/stable/mcp-server:
    get:
      tags:
        - MCP Server
      summary: List MCP servers
      description: >-
        Returns every MCP server in the environment. A MCP server is a
        registered Model Context Protocol server whose tools an agent can call.
        The call takes no paging parameters, so one request yields the whole
        set.
      operationId: StableMCPServerController_list
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
            Returns every MCP server connected to the project's environment,
            each with its URL, description, icon, and the MCP specification
            version it was registered against.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableMCPServerListResponse'
          x-vf-doc:
            description: >-
              Returns every MCP server connected to the project's environment,
              each with its URL, description, icon, and the MCP specification
              version it was registered against.
      security:
        - token: []
components:
  schemas:
    StableMCPServerListResponse:
      type: object
      properties:
        mcpServers:
          type: array
          items:
            $ref: '#/components/schemas/StableMCPServer'
      required:
        - mcpServers
    StableMCPServer:
      type: object
      properties:
        id:
          type: string
        url:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/Markup'
        name:
          type: string
        image:
          nullable: true
          description: The URL of the MCP server icon image.
          type: string
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
        description:
          nullable: true
          description: A human-readable description of what the MCP server provides.
          type: string
        specification:
          $ref: '#/components/schemas/McpServerSpecification'
      required:
        - id
        - url
        - name
        - image
        - createdAt
        - updatedAt
        - description
        - specification
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
    McpServerSpecification:
      type: string
      enum:
        - '2025-03-26'
        - '2025-06-18'
      x-enumNames:
        - V_2025_03_26
        - V_2025_06_18
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