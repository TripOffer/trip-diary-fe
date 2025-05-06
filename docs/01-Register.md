# Register - 注册

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth/register:
    post:
      summary: Register - 注册
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
                password:
                  type: string
                code:
                  type: string
              required:
                - email
                - password
                - code
              x-apifox-orders:
                - email
                - password
                - code
              x-apifox-ignore-properties: []
            example:
              email: tatsukimengchen@163.com
              password: '123456'
              code: '308104'
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
                      token:
                        type: string
                      user:
                        $ref: '#/components/schemas/UserInfo'
                    required:
                      - token
                      - user
                    x-apifox-orders:
                      - token
                      - user
                    x-apifox-ignore-properties: []
                required:
                  - code
                  - msg
                  - data
                x-apifox-orders:
                  - code
                  - msg
                  - data
                x-apifox-ignore-properties: []
              example:
                code: 0
                msg: success
                data:
                  token: >-
                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGF0c3VraW1lbmdjaGVuQDE2My5jb20iLCJpYXQiOjE3NDYyMDIxMDMsImV4cCI6MTc0ODc5NDEwM30.UvRku5OiXGElrng3Dsc-MTSYc3p0XXbmdL3XK_2v_sI
                  user:
                    id: 1
                    name: 旅行者185
                    email: tatsukimengchen@163.com
                    bio: null
                    avatar: null
                    gender: unknown
                    birthday: null
                    role: Admin
                    createdAt: '2025-05-02T10:49:32.344Z'
                    updatedAt: '2025-05-02T15:27:34.051Z'
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
                x-apifox-ignore-properties: []
                x-apifox-orders:
                  - code
                  - msg
                  - data
              example:
                code: 400
                msg: 验证码错误或已过期
                data: null
          headers: {}
          x-apifox-name: 验证码错误或已过期
      security: []
      x-apifox-folder: Auth
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472275-run
components:
  schemas:
    UserInfo:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
        gender:
          $ref: '#/components/schemas/Gender'
        avatar:
          type: string
          nullable: true
        bio:
          type: string
          nullable: true
        role:
          $ref: '#/components/schemas/Role'
        birthday:
          type: string
          nullable: true
        createdAt:
          type: string
        updateAt:
          type: string
      title: 用户信息
      x-apifox-orders:
        - id
        - name
        - email
        - gender
        - avatar
        - bio
        - role
        - birthday
        - createdAt
        - updateAt
      required:
        - id
        - name
        - email
        - gender
        - avatar
        - bio
        - role
        - birthday
        - createdAt
      x-apifox-ignore-properties: []
      x-apifox-folder: ''
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
    Gender:
      type: string
      title: 性别
      enum:
        - secret
        - male
        - female
      x-apifox-enum:
        - value: secret
          name: 保密
          description: 默认值
        - value: male
          name: ''
          description: ''
        - value: female
          name: ''
          description: ''
      x-apifox-folder: ''
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
