# UnFavorite - 取消收藏

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/favorite:
    delete:
      summary: UnFavorite - 取消收藏
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
                  message: 已取消收藏
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Action
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291833683-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
