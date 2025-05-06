# ChangePassword - 修改密码

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth/password:
    put:
      summary: ChangePassword - 修改密码
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
                oldPassword:
                  type: string
                newPassword:
                  type: string
              x-apifox-orders:
                - oldPassword
                - newPassword
              required:
                - oldPassword
                - newPassword
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
                  message: 密码修改成功
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
                msg: 旧密码错误
                data: null
          headers: {}
          x-apifox-name: 请求有误
      security: []
      x-apifox-folder: Auth
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472721-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
