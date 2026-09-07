> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete MCP server

> Deletes a single MCP server by ID. A MCP server is a registered Model Context Protocol server whose tools an agent can call. The response carries only a confirmation message, so refetch the MCP servers to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/mcp-server/{serverID}
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
    delete:
      tags:
        - MCP Server
      summary: Delete MCP server
      description: >-
        Deletes a single MCP server by ID. A MCP server is a registered Model
        Context Protocol server whose tools an agent can call. The response
        carries only a confirmation message, so refetch the MCP servers to see
        what is left.
      operationId: StableMCPServerController_delete
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
      responses:
        '200':
          description: >-
            Confirms the MCP server connection was removed from the project. The
            body is a message only, so refetch the project's MCP servers and
            tools to see what is left.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the MCP server connection was removed from the project.
              The body is a message only, so refetch the project's MCP servers
              and tools to see what is left.
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