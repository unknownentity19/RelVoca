> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete playbook

> Deletes a single playbook by ID. A playbook is a set of instructions that drives an agent toward a goal, calling tools as it needs them. The response carries only a confirmation message, so refetch the playbooks to see what is left.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json delete /v1/stable/playbook/{playbookID}
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
  /v1/stable/playbook/{playbookID}:
    delete:
      tags:
        - Playbook
      summary: Delete playbook
      description: >-
        Deletes a single playbook by ID. A playbook is a set of instructions
        that drives an agent toward a goal, calling tools as it needs them. The
        response carries only a confirmation message, so refetch the playbooks
        to see what is left.
      operationId: StablePlaybookController_delete
      parameters:
        - name: playbookID
          required: true
          in: path
          schema:
            type: string
          x-vf-doc:
            description: The ID of the playbook to operate on.
          description: The ID of the playbook to operate on.
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
            Confirms the playbook was deleted from the project environment. The
            body is a message only, so list the playbooks again to see which
            remain.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDeleteResponse'
          x-vf-doc:
            description: >-
              Confirms the playbook was deleted from the project environment.
              The body is a message only, so list the playbooks again to see
              which remain.
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