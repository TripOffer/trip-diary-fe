# Delete - 删除评论

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{diaryId}/comment/{id}:
    delete:
      summary: Delete - 删除评论
      deprecated: false
      description: ''
      tags:
        - Diary/Comment
      parameters:
        - name: diaryId
          in: path
          description: ''
          required: true
          schema:
            type: string
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
                      success:
                        type: boolean
                    required:
                      - success
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  success: true
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Comment
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291837495-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
