# Info - 更新用户信息

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/me:
    put:
      summary: Info - 更新用户信息
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
                name:
                  type: string
                  description: 名称
                bio:
                  type: string
                gender:
                  $ref: '#/components/schemas/Gender'
                birthday:
                  anyOf:
                    - type: string
                    - type: integer
                  description: |-
                    Date（timestamp）或 YYYY-MM-DD
                    如果是 2025-1-1会被视为本地时间（东八区），导致结果是 2024-12-31T16:00:00.000Z
              x-apifox-orders:
                - name
                - bio
                - gender
                - birthday
              x-apifox-ignore-properties: []
            example:
              name: 梦梦
              bio: 这个家伙很懒，什么都没留下。
              gender: female
              birthday: '2025-01-01'
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
                      name:
                        type: string
                      bio:
                        type: string
                      gender:
                        type: string
                      birthday:
                        type: string
                    required:
                      - id
                      - name
                      - bio
                      - gender
                      - birthday
                    x-apifox-ignore-properties: []
                    x-apifox-orders:
                      - id
                      - name
                      - bio
                      - gender
                      - birthday
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
                code: 0
                msg: success
                data:
                  id: 1
                  name: 梦梦
                  bio: 这个家伙很懒，什么都没留下。
                  gender: female
                  birthday: '2025-01-01T00:00:00.000Z'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Profile
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472639-run
components:
  schemas:
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
