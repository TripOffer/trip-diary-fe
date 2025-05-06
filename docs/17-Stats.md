# Stats - 获取关注、粉丝数量

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/{id}/follow-stats:
    get:
      summary: Stats - 获取关注、粉丝数量
      deprecated: false
      description: ''
      tags:
        - User/Follow
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
                properties: {}
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Follow
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291741730-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
