> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create text document

> Adds a document to the knowledge base, a source the knowledge base retrieves from. The response carries the ID that later calls address it by.



## OpenAPI

````yaml /specs-prettified/realtime/openapi.stable.json post /v1/stable/document/text
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
  /v1/stable/document/text:
    post:
      tags:
        - Document
      summary: Create text document
      description: >-
        Adds a document to the knowledge base, a source the knowledge base
        retrieves from. The response carries the ID that later calls address it
        by.
      operationId: StableDocumentController_createText
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
        - name: maxChunkSize
          required: false
          in: query
          schema:
            description: >-
              Determines how granularly each document is broken up. Range
              available is 500-1500 tokens, default is 1000. Smaller chunk size
              means narrower context, faster response, less tokens consumed, and
              greater risk of less accurate answers. Max chunk size affects the
              total amount of chunks parsed from a document - i.e., larger
              chunks means less chunks retrieved.
            anyOf:
              - type: string
              - type: number
        - name: overwrite
          required: false
          in: query
          schema:
            description: >-
              If set to true, the existing table with the same name will be
              overwritten.
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
        - name: markdownConversion
          required: false
          in: query
          schema:
            description: >-
              When enabled, HTML is automatically converted to markdown to
              generate better chunks.
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
        - name: llmBasedChunks
          required: false
          in: query
          schema:
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
          x-vf-doc:
            description: >-
              Whether to split the document into chunks with a model rather than
              by fixed size.
          description: >-
            Whether to split the document into chunks with a model rather than
            by fixed size.
        - name: llmGeneratedQ
          required: false
          in: query
          schema:
            description: >-
              When enabled, an LLM will be used to generate a question based on
              the document context and specific chunk, then prepend it to the
              chunk. This enhances retrieval by aligning chunks with potential
              user queries.
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
        - name: llmContentSummarization
          required: false
          in: query
          schema:
            description: >-
              When enabled, an LLM summarizes and rewrites the content, removing
              unnecessary information and focusing on important parts to
              optimize for retrieval. Limited to 15 rows per table upload.
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
        - name: llmPrependContext
          required: false
          in: query
          schema:
            description: >-
              When enabled, an LLM generates a context summary based on the
              document and chunk context, and prepends it to each chunk. This
              improves retrieval by providing additional context to each chunk.
              Note: If both llmGeneratedQ and llmPrependContext are set to true,
              llmGeneratedQ takes precedence, and the context summarization will
              not be applied.
            anyOf:
              - type: boolean
              - type: string
                enum:
                  - 'true'
                  - 'false'
                x-enumNames:
                  - 'TRUE'
                  - 'FALSE'
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                url:
                  description: >-
                    An optional source URL to associate with the uploaded
                    document.
                  type: string
                canEdit:
                  default: false
                  description: >-
                    If true, the document content can be edited in the Creator
                    after upload.
                  type: boolean
                metadata:
                  description: >-
                    A JSON-encoded array of `{ key, values }` metadata tags
                    attached to the document, used to filter knowledge base
                    retrieval at runtime.
                  type: string
                file:
                  type: string
                  format: binary
              required:
                - file
              additionalProperties: false
      responses:
        '201':
          description: >-
            Returns the document created from the supplied text, with its
            assigned ID, its status, and the smart chunking settings the query
            parameters selected.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StableDocumentResponse'
          x-vf-doc:
            description: >-
              Returns the document created from the supplied text, with its
              assigned ID, its status, and the smart chunking settings the query
              parameters selected.
      security:
        - token: []
components:
  schemas:
    StableDocumentResponse:
      type: object
      properties:
        document:
          $ref: '#/components/schemas/StableDocument'
      required:
        - document
    StableDocument:
      type: object
      properties:
        id:
          type: string
        data:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/KBDocumentData'
        status:
          $ref: '#/components/schemas/KBDocumentStatus'
        smartChunking:
          nullable: true
          allOf:
            - $ref: '#/components/schemas/SmartChunking'
      required:
        - id
        - data
        - status
        - smartChunking
    KBDocumentData:
      oneOf:
        - $ref: '#/components/schemas/KBDocumentUrlData'
        - $ref: '#/components/schemas/KBDocumentDocxData'
        - $ref: '#/components/schemas/KBDocumentPDFData'
        - $ref: '#/components/schemas/KBDocumentTextData'
        - $ref: '#/components/schemas/KBDocumentMarkdownData'
        - $ref: '#/components/schemas/KBDocumentCSVData'
        - $ref: '#/components/schemas/KBDocumentXLSXData'
        - $ref: '#/components/schemas/KBDocumentTableData'
    KBDocumentStatus:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/KnowledgeBaseDocumentStatus'
        data: {}
      required:
        - type
    SmartChunking:
      type: object
      properties:
        markdownConversion:
          description: >-
            When enabled, HTML is automatically converted to markdown to
            generate better chunks.
          anyOf:
            - type: boolean
            - type: string
              enum:
                - 'true'
                - 'false'
              x-enumNames:
                - 'TRUE'
                - 'FALSE'
        llmBasedChunks:
          anyOf:
            - type: boolean
            - type: string
              enum:
                - 'true'
                - 'false'
              x-enumNames:
                - 'TRUE'
                - 'FALSE'
        llmGeneratedQ:
          description: >-
            When enabled, an LLM will be used to generate a question based on
            the document context and specific chunk, then prepend it to the
            chunk. This enhances retrieval by aligning chunks with potential
            user queries.
          anyOf:
            - type: boolean
            - type: string
              enum:
                - 'true'
                - 'false'
              x-enumNames:
                - 'TRUE'
                - 'FALSE'
        llmContentSummarization:
          description: >-
            When enabled, an LLM summarizes and rewrites the content, removing
            unnecessary information and focusing on important parts to optimize
            for retrieval. Limited to 15 rows per table upload.
          anyOf:
            - type: boolean
            - type: string
              enum:
                - 'true'
                - 'false'
              x-enumNames:
                - 'TRUE'
                - 'FALSE'
        llmPrependContext:
          description: >-
            When enabled, an LLM generates a context summary based on the
            document and chunk context, and prepends it to each chunk. This
            improves retrieval by providing additional context to each chunk.
            Note: If both llmGeneratedQ and llmPrependContext are set to true,
            llmGeneratedQ takes precedence, and the context summarization will
            not be applied.
          anyOf:
            - type: boolean
            - type: string
              enum:
                - 'true'
                - 'false'
              x-enumNames:
                - 'TRUE'
                - 'FALSE'
    KBDocumentUrlData:
      type: object
      properties:
        type:
          type: string
          enum:
            - url
          x-enumNames:
            - URL
        name:
          type: string
        url:
          type: string
        refreshRate:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseDocumentRefreshRate'
        lastSuccessUpdate:
          type: string
        accessTokenID:
          type: number
        integrationExternalID:
          type: string
        source:
          allOf:
            - $ref: '#/components/schemas/KnowledgeBaseDocumentIntegrationType'
      required:
        - type
        - name
        - url
    KBDocumentDocxData:
      type: object
      properties:
        type:
          type: string
          enum:
            - docx
          x-enumNames:
            - DOCX
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentPDFData:
      type: object
      properties:
        type:
          type: string
          enum:
            - pdf
          x-enumNames:
            - PDF
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentTextData:
      type: object
      properties:
        type:
          type: string
          enum:
            - text
          x-enumNames:
            - TEXT
        name:
          type: string
        canEdit:
          type: boolean
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentMarkdownData:
      type: object
      properties:
        type:
          type: string
          enum:
            - md
          x-enumNames:
            - MD
        name:
          type: string
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentCSVData:
      type: object
      properties:
        type:
          type: string
          enum:
            - csv
          x-enumNames:
            - CSV
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentXLSXData:
      type: object
      properties:
        type:
          type: string
          enum:
            - xlsx
          x-enumNames:
            - XLSX
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
    KBDocumentTableData:
      type: object
      properties:
        type:
          type: string
          enum:
            - table
          x-enumNames:
            - TABLE
        name:
          type: string
        rowsCount:
          type: number
        url:
          nullable: true
          type: string
      required:
        - type
        - name
        - rowsCount
    KnowledgeBaseDocumentStatus:
      type: string
      enum:
        - ERROR
        - PENDING
        - SUCCESS
        - INITIALIZED
      x-enumNames:
        - ERROR
        - PENDING
        - SUCCESS
        - INITIALIZED
    KnowledgeBaseDocumentRefreshRate:
      type: string
      enum:
        - daily
        - weekly
        - monthly
        - never
      x-enumNames:
        - DAILY
        - WEEKLY
        - MONTHLY
        - NEVER
    KnowledgeBaseDocumentIntegrationType:
      type: string
      enum:
        - zendesk
        - shopify
      x-enumNames:
        - ZENDESK
        - SHOPIFY
  securitySchemes:
    token:
      scheme: bearer
      bearerFormat: JWT
      type: http
      description: RelVoca bearer token

````