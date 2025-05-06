# Avatar - 修改头像

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/me/avatar:
    put:
      summary: Avatar - 修改头像
      deprecated: false
      description: ''
      tags:
        - User/Profile
      parameters: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                avatar:
                  type: string
              x-apifox-orders:
                - avatar
              required:
                - avatar
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
                        type: integer
                      avatar:
                        type: string
                    required:
                      - id
                      - avatar
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 1
                  avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Profile
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291697906-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
