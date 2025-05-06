# Create - 创建日记

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary:
    post:
      summary: Create - 创建日记
      deprecated: false
      description: ''
      tags:
        - Diary/Ctrl
      parameters: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DiaryInput'
            example:
              title: 日记 2025-05-04
              content: 今天是 2025 年 5 月 4 日。
              tags:
                - 日记
              images:
                - 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
              thumbnail: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
      responses:
        '201':
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
                  message: 日记创建成功
                  id: fb306d4a-03f5-4418-8388-1f9c61a4fb7d
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Ctrl
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291473984-run
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
