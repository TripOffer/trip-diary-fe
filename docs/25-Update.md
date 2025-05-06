# Update - 修改日记

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}:
    patch:
      summary: Update - 修改日记
      deprecated: false
      description: ''
      tags:
        - Diary/Ctrl
      parameters:
        - name: id
          in: path
          description: ''
          required: true
          example: 3dcb9de1-0325-4b02-919e-c627591d1034
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              x-apifox-refs:
                01JTDTQGCF3CV2CRQ2Q86T4F89:
                  $ref: '#/components/schemas/DiaryInput'
                  x-apifox-overrides:
                    published: null
              x-apifox-orders:
                - 01JTDTQGCF3CV2CRQ2Q86T4F89
              properties:
                title:
                  type: string
                content:
                  type: string
                tags:
                  type: string
                images:
                  type: array
                  items:
                    type: string
                video:
                  type: string
                thumbnail:
                  type: string
              x-apifox-ignore-properties:
                - title
                - content
                - tags
                - images
                - video
                - thumbnail
            example:
              title: 日记 2025-05-04
              content: 今天是 2025 年 5 月 4 日。
              tags:
                - 日记
              images:
                - 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
              thumbnail: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties:
                  code:
                    type: integer
                  msg:
                    type: string
                  data:
                    type: object
                    properties:
                      message:
                        type: string
                      id:
                        type: string
                    required:
                      - message
                      - id
                    x-apifox-ignore-properties: []
                    x-apifox-orders:
                      - message
                      - id
                required:
                  - code
                  - msg
                  - data
                x-apifox-ignore-properties: []
                x-apifox-orders:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  message: 已提交修改，待审核
                  id: 6979c56b-2e87-4bc5-99d2-47739bdea209
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Ctrl
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291474401-run
components:
  schemas:
    DiaryInput:
      type: object
      properties:
        title:
          type: string
        content:
          type: string
        tags:
          type: string
        images:
          type: array
          items:
            type: string
        video:
          type: string
        thumbnail:
          type: string
        published:
          type: boolean
      title: 日记编辑项
      x-apifox-orders:
        - title
        - content
        - tags
        - images
        - video
        - thumbnail
        - published
      x-apifox-ignore-properties: []
      x-apifox-folder: ''
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
