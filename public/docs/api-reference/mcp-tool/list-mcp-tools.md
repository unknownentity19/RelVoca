> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List MCP tools

> Returns every MCP tool in its server. A MCP tool is a tool an MCP server advertises, populated by syncing the server rather than by hand. The call takes no paging parameters, so one request yields the whole set.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json get /v1/stable/mcp-tool
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
  /v1/stable/mcp-tool:
    get:
      tags:
        - MCP Tool
      summary: List MCP tools
      description: >-
        Returns every MCP tool in its server. A MCP tool is a tool an MCP server
        advertises, populated by syncing the server rather than by hand. The
        call takes no paging parameters, so one request yields the whole set.
      operationId: StableMCPToolController_list
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
        - name: serverID
          required: false
          in: query
          schema:
            description: >-
              When provided, only tools belonging to the MCP server with this ID
              are returned.
            type: string
      responses:
        '200':
          description: >-
            Returns every MCP tool available in the project's environment, each
            with the name, description, and input JSON Schema its server
            declared, plus the ID of the server it came from. Pass serverID to
            narrow the list to one server.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableMCPToolListResponse'
          x-vf-doc:
            description: >-
              Returns every MCP tool available in the project's environment,
              each with the name, description, and input JSON Schema its server
              declared, plus the ID of the server it came from. Pass serverID to
              narrow the list to one server.
      security:
        - token: []
components:
  schemas:
    StableMCPToolListResponse:
      type: object
      properties:
        mcpTools:
          type: array
          items:
            $ref: '#/components/schemas/StableMCPTool'
      required:
        - mcpTools
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