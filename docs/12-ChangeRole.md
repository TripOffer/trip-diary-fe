# ChangeRole - 修改角色

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/profile/{id}/role:
    put:
      summary: ChangeRole - 修改角色
      deprecated: false
      description: ''
      tags:
        - User/Profile
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
                role:
                  $ref: '#/components/schemas/Role'
              x-apifox-orders:
                - role
              required:
                - role
              x-apifox-ignore-properties: []
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties: {}
                x-apifox-ignore-properties: []
                x-apifox-orders: []
              example:
                code: 0
                msg: success
                data:
                  id: 2
                  name: 旅行者6854
                  role: Reviewer
          headers: {}
          x-apifox-name: 成功
        '403':
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
                x-apifox-ignore-properties: []
                x-apifox-orders:
                  - code
                  - msg
                  - data
              examples:
                '1':
                  summary: 异常示例
                  value:
                    code: 403
                    msg: 只有超级管理员可以设置 Admin 角色
                    data: null
                '2':
                  summary: 异常示例
                  value:
                    code: 403
                    msg: 禁止修改自己的角色
                    data: null
          headers: {}
          x-apifox-name: 禁止访问
        '404':
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
                x-apifox-ignore-properties: []
                x-apifox-orders:
                  - code
                  - msg
                  - data
              example:
                code: 404
                msg: 用户不存在
                data: null
          headers: {}
          x-apifox-name: 记录不存在
        x-200:成功:
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
                      name:
                        type: string
                      role:
                        type: string
                    required:
                      - id
                      - name
                      - role
                    x-apifox-ignore-properties: []
                    x-apifox-orders:
                      - id
                      - name
                      - role
                required:
                  - code
                  - msg
                  - data
                x-apifox-ignore-properties: []
                x-apifox-orders:
                  - code
                  - msg
                  - data
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Profile
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291636348-run
components:
  schemas:
    Role:
      type: string
      title: 角色
      enum:
        - User
        - Admin
        - Reviewer
      x-apifox-enum:
        - value: User
          name: ''
          description: ''
        - value: Admin
          name: ''
          description: ''
        - value: Reviewer
          name: ''
          description: ''
      x-apifox-folder: ''
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
