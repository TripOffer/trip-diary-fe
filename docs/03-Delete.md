# Delete - 注销

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth:
    delete:
      summary: Delete - 注销
      deprecated: false
      description: ''
      tags:
        - Auth
      parameters: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                password:
                  type: string
                code:
                  type: string
              x-apifox-orders:
                - password
                - code
              required:
                - password
                - code
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
                      message:
                        type: string
                    required:
                      - success
                      - message
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  success: true
                  message: 账号已注销
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Auth
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472402-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
