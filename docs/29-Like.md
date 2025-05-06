# Like - 点赞

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/like:
    post:
      summary: Like - 点赞
      deprecated: false
      description: ''
      tags:
        - Diary/Action
      parameters:
        - name: id
          in: path
          description: ''
          required: true
          schema:
            type: string
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
                    required:
                      - message
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  message: 点赞成功
          headers: {}
          x-apifox-name: 成功
        '400':
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
                    type: 'null'
                required:
                  - code
                  - msg
                  - data
              example:
                code: 400
                msg: 已点赞
                data: null
          headers: {}
          x-apifox-name: 请求有误
      security: []
      x-apifox-folder: Diary/Action
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291833441-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
