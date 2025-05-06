# Login - 登录

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth/login:
    post:
      summary: Login - 登录
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
              required:
                - email
                - password
              x-apifox-orders:
                - email
                - password
              x-apifox-ignore-properties: []
            example:
              email: tatsukimengchen@163.com
              password: '123456'
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
                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NjE4MzAwNSwiZXhwIjoxNzQ4Nzc1MDA1fQ.h346mcCcXcLfFD_8He38xrB7Z3bj2tTtrzUz8WxbdiI
                  user:
                    id: 1
                    email: tatsukimengchen@163.com
                    name: 旅行者185
                    avatar: null
                    bio: null
                    role: User
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Auth
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472377-run
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
