> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete tool

> Deletes a single tool by ID. A tool is something a playbook can call during a conversation. The response carries only a confirmation message, so refetch the tools to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/tool/{toolID}
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
  /v1/stable/tool/{toolID}:
    delete:
      tags:
        - Tool
      summary: Delete tool
      description: >-
        Deletes a single tool by ID. A tool is something a playbook can call
        during a conversation. The response carries only a confirmation message,
        so refetch the tools to see what is left.
      operationId: StableToolController_delete
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
        - name: type
          required: true
          in: query
          schema:
            type: string
            enum:
              - api
              - mcp
              - function
            description: The type of the tool to delete.
            x-enumNames:
              - API
              - MCP
              - FUNCTION
      responses:
        '200':
          description: >-
            Confirms the tool attachment was removed, and the required type
            parameter must match the type of the tool being deleted. The body is
            a message only, so refetch the agent's or playbook's tools to see
            what it can still call.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the tool attachment was removed, and the required type
              parameter must match the type of the tool being deleted. The body
              is a message only, so refetch the agent's or playbook's tools to
              see what it can still call.
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