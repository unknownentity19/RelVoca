> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search runs

> Finds past runs of a test, each carrying how many of its checks passed. The body takes `take` and `skip`, so results arrive a page at a time rather than all at once.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/test-run/search
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
  /v1/stable/test-run/search:
    post:
      tags:
        - Test Run
      summary: Search runs
      description: >-
        Finds past runs of a test, each carrying how many of its checks passed.
        The body takes `take` and `skip`, so results arrive a page at a time
        rather than all at once.
      operationId: StableTestRunController_search
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StableTestRunSearchRequest'
      responses:
        '200':
          description: >-
            Returns the runs matching the search body, each carrying the
            `testID` it belongs to, its `status`, its check tallies, and the
            credits it consumed. Set `testID` in the body to narrow to one
            test's history, or omit it to search every test in the environment.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableTestRunListResponse'
          x-vf-doc:
            description: >-
              Returns the runs matching the search body, each carrying the
              `testID` it belongs to, its `status`, its check tallies, and the
              credits it consumed. Set `testID` in the body to narrow to one
              test's history, or omit it to search every test in the
              environment.
      security:
        - token: []
components:
  schemas:
    StableTestRunSearchRequest:
      type: object
      properties:
        take:
          default: 20
          description: The maximum number of results to return, used for pagination.
          type: number
          minimum: 1
          maximum: 100
        skip:
          default: 0
          description: The number of results to skip, used for pagination.
          type: integer
          minimum: 0
          maximum: 9007199254740991
        testID:
          description: >-
            Restrict results to runs of this test. Omit to search across all
            tests.
          type: string
      additionalProperties: false
    StableTestRunListResponse:
      type: object
      properties:
        runs:
          type: array
          items:
            $ref: '#/components/schemas/StableTestRun'
      required:
        - runs
    StableTestRun:
      type: object
      properties:
        id:
          type: string
        logs:
          type: array
          items:
            $ref: '#/components/schemas/SimulationRunLog'
          description: The trace, tool-call, and end events recorded as the run executed.
        status:
          type: string
          enum:
            - idle
            - pending
            - running
            - failed
            - passed
            - canceled
          description: >-
            Where the run is in its lifecycle, from queued through to a finished
            outcome.
          x-enumNames:
            - IDLE
            - PENDING
            - RUNNING
            - FAILED
            - PASSED
            - CANCELED
        testID:
          type: string
          description: The ID of the test this run belongs to.
        failReason:
          nullable: true
          description: Why the run failed. Null unless the run finished in a failed state.
          type: string
        totalChecks:
          type: number
          description: >-
            The number of checks across the test's turns that this run
            evaluated.
        passedChecks:
          nullable: true
          description: >-
            How many of those checks passed. Null until the run reaches a
            finished state.
          type: number
        totalCredits:
          type: number
          description: The LLM credits consumed by this run.
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        startedAt:
          nullable: true
          description: When execution actually began. Null while still queued.
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
        finishedAt:
          nullable: true
          description: When the run reached a finished state. Null while in progress.
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
      required:
        - id
        - logs
        - status
        - testID
        - failReason
        - totalChecks
        - passedChecks
        - totalCredits
        - createdAt
        - startedAt
        - finishedAt
    SimulationRunLog:
      oneOf:
        - $ref: '#/components/schemas/SimulationRunEndLog'
        - $ref: '#/components/schemas/SimulationRunTraceLog'
        - $ref: '#/components/schemas/SimulationRunActionLog'
    SimulationRunEndLog:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum:
            - end
          x-enumNames:
            - END
        payload:
          type: object
          properties:
            reason:
              type: string
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
      required:
        - id
        - type
        - payload
        - createdAt
    SimulationRunTraceLog:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum:
            - trace
          x-enumNames:
            - TRACE
        payload:
          type: object
          properties:
            type:
              type: string
            paths:
              type: array
              items:
                $ref: '#/components/schemas/TracePath'
            defaultPath:
              type: number
            time:
              type: number
            turnID:
              type: string
            handleID:
              type: string
          required:
            - type
          additionalProperties: {}
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
      required:
        - id
        - type
        - payload
        - createdAt
    SimulationRunActionLog:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum:
            - action
          x-enumNames:
            - ACTION
        payload:
          type: object
          properties:
            type:
              type: string
            payload: {}
            diagramID:
              type: string
            time:
              type: number
            metadata:
              type: object
              additionalProperties: {}
          required:
            - type
          additionalProperties: {}
        createdAt:
          type: string
          format: date-time
          pattern: >-
            ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
      required:
        - id
        - type
        - payload
        - createdAt
    TracePath:
      type: object
      properties:
        label:
          type: string
        event:
          allOf:
            - $ref: '#/components/schemas/BaseRequest'
    BaseRequest:
      type: object
      properties:
        type:
          type: string
        payload: {}
        diagramID:
          type: string
        time:
          type: number
        metadata:
          type: object
          additionalProperties: {}
      required:
        - type
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````