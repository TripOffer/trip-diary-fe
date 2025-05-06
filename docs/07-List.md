# List - 获取用户列表

> 该接口会区分管理员和其他用户
email、role 字段只有管理员会返回

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/list:
    get:
      summary: List - 获取用户列表
      deprecated: false
      description: |-
        该接口会区分管理员和其他用户
        email、role 字段只有管理员会返回
      tags:
        - User/Profile
      parameters:
        - name: id
          in: query
          description: ID 编号
          required: false
          schema:
            type: integer
        - name: name
          in: query
          description: ''
          required: false
          schema:
            type: string
        - name: email
          in: query
          description: ''
          required: false
          schema:
            type: string
        - name: role
          in: query
          description: ''
          required: false
          schema:
            type: string
            enum:
              - User
              - Reviewer
              - Admin
              - Super
            x-apifox-enum:
              - value: User
                name: ''
                description: ''
              - value: Reviewer
                name: ''
                description: ''
              - value: Admin
                name: ''
                description: ''
              - value: Super
                name: ''
                description: ''
        - name: page
          in: query
          description: ''
          required: false
          example: 1
          schema:
            type: integer
        - name: size
          in: query
          description: ''
          required: false
          example: 10
          schema:
            type: integer
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
                      list:
                        type: array
                        items:
                          $ref: '#/components/schemas/UserBasicInfo'
                      total:
                        type: integer
                      page:
                        type: integer
                      size:
                        type: integer
                      totalPages:
                        type: integer
                    required:
                      - list
                      - total
                      - page
                      - size
                      - totalPages
                    x-apifox-orders:
                      - list
                      - total
                      - page
                      - size
                      - totalPages
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
                  list:
                    - id: 2
                      name: 梦辰
                      avatar: null
                      bio: 这个家伙很懒，什么都没留下。
                      gender: male
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T16:45:05.208Z'
                    - id: 1
                      name: 梦梦
                      avatar: null
                      bio: 这个家伙很懒，什么都没留下。
                      gender: female
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T10:49:32.344Z'
                  total: 2
                  page: 1
                  size: 10
                  totalPages: 1
          headers: {}
          x-apifox-name: 成功
        x-200:成功（管理员）:
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
                      list:
                        type: array
                        items:
                          $ref: '#/components/schemas/UserInfo'
                      total:
                        type: integer
                      page:
                        type: integer
                      size:
                        type: integer
                      totalPages:
                        type: integer
                    required:
                      - list
                      - total
                      - page
                      - size
                      - totalPages
                    x-apifox-orders:
                      - list
                      - total
                      - page
                      - size
                      - totalPages
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
                  list:
                    - id: 2
                      name: 梦辰
                      avatar: null
                      bio: 这个家伙很懒，什么都没留下。
                      gender: male
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T16:45:05.208Z'
                      email: tatsukimengchen@gmail.com
                      role: User
                    - id: 1
                      name: 梦梦
                      avatar: null
                      bio: 这个家伙很懒，什么都没留下。
                      gender: female
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T10:49:32.344Z'
                      email: tatsukimengchen@163.com
                      role: Super
                  total: 2
                  page: 1
                  size: 10
                  totalPages: 1
          headers: {}
          x-apifox-name: 成功（管理员）
      security: []
      x-apifox-folder: User/Profile
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291671635-run
components:
  schemas:
    UserBasicInfo:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        gender: &ref_0
          $ref: '#/components/schemas/Gender'
        avatar:
          type: string
          nullable: true
        bio:
          type: string
          nullable: true
        createdAt:
          type: string
      title: 用户基础信息
      x-apifox-orders:
        - id
        - name
        - gender
        - avatar
        - bio
        - createdAt
      required:
        - id
        - name
        - gender
        - avatar
        - bio
        - createdAt
      x-apifox-ignore-properties: []
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
    UserInfo:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
        gender: *ref_0
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
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
