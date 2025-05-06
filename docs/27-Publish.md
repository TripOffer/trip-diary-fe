# Publish - 修改发布状态

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/publish:
    patch:
      summary: Publish - 修改发布状态
      deprecated: false
      description: ''
      tags:
        - Diary/Ctrl
      parameters:
        - name: id
          in: path
          description: ''
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                published:
                  type: boolean
              x-apifox-orders:
                - published
              required:
                - published
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
                      id:
                        type: string
                      published:
                        type: boolean
                      publishedAt:
                        type: string
                    required:
                      - id
                      - published
                      - publishedAt
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 3dcb9de1-0325-4b02-919e-c627591d1034
                  published: true
                  publishedAt: '2025-05-04T10:35:58.719Z'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Ctrl
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291751978-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
