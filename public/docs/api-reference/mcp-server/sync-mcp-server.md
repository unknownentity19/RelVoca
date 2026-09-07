> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync MCP server

> Refreshes the stored list of tools an MCP server advertises, which is how MCP tools come to exist rather than being created by hand.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json put /v1/stable/mcp-server/{serverID}/sync
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
  /v1/stable/mcp-server/{serverID}/sync:
    put:
      tags:
        - MCP Server
      summary: Sync MCP server
      description: >-
        Refreshes the stored list of tools an MCP server advertises, which is
        how MCP tools come to exist rather than being created by hand.
      operationId: StableMCPServerController_sync
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
            Confirms the sync ran against the server. The body is a message and
            does not itemise what changed, so list the project's MCP tools to
            see the server's current set.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableUpdateResponse'
          x-vf-doc:
            description: >-
              Confirms the sync ran against the server. The body is a message
              and does not itemise what changed, so list the project's MCP tools
              to see the server's current set.
      security:
        - token: []
components:
  schemas:
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