> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get MCP tool

> Returns a single MCP tool by ID, with the fields that define it. A MCP tool is a tool an MCP server advertises, populated by syncing the server rather than by hand.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/mcp-tool/{toolID}
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
  /v1/stable/mcp-tool/{toolID}:
    get:
      tags:
        - MCP Tool
      summary: Get MCP tool
      description: >-
        Returns a single MCP tool by ID, with the fields that define it. A MCP
        tool is a tool an MCP server advertises, populated by syncing the server
        rather than by hand.
      operationId: StableMCPToolController_get
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
      responses:
        '200':
          description: >-
            Returns one MCP tool with the name and description its server
            declared and the JSON Schema for its input arguments. MCP tools are
            defined on the server itself, so these records are read-only in
            RelVoca.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableMCPToolResponse'
          x-vf-doc:
            description: >-
              Returns one MCP tool with the name and description its server
              declared and the JSON Schema for its input arguments. MCP tools
              are defined on the server itself, so these records are read-only
              in RelVoca.
      security:
        - token: []
components:
  schemas:
    StableMCPToolResponse:
      type: object
      properties:
        mcpTool:
          $ref: '#/components/schemas/StableMCPTool'
      required:
        - mcpTool
    StableMCPTool:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
          description: The name of the tool as exposed by the MCP server.
        serverID:
          type: string
          description: The ID of the MCP server this tool belongs to.
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
          description: >-
            A human-readable description of what the tool does, as provided by
            the MCP server.
          type: string
        inputSchema:
          type: object
          additionalProperties: {}
          description: The JSON Schema describing the tool's input arguments.
      required:
        - id
        - name
        - serverID
        - createdAt
        - updatedAt
        - description
        - inputSchema
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````