# ResetPassword - 重置密码

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth/reset-password:
    post:
      summary: ResetPassword - 重置密码
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
                email:
                  type: string
                newPassword:
                  type: string
                code:
                  type: string
              x-apifox-orders:
                - email
                - newPassword
                - code
              required:
                - email
                - newPassword
                - code
            example:
              email: tatsukimengchen@163.com
              newPassword: '123456'
              code: '870246'
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
                  message: 密码重置成功
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Auth
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291617688-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
