# Info - 获取我的用户信息

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/me:
    get:
      summary: Info - 获取我的用户信息
      deprecated: false
      description: ''
      tags:
        - User/Profile
      parameters: []
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
                      avatar:
                        type: string
                      bio:
                        type: string
                      gender:
                        type: string
                      birthday:
                        type: string
                      createdAt:
                        type: string
                      email:
                        type: string
                      role:
                        type: string
                      followingCount:
                        type: integer
                      followersCount:
                        type: integer
                    required:
                      - id
                      - name
                      - avatar
                      - bio
                      - gender
                      - birthday
                      - createdAt
                      - email
                      - role
                      - followingCount
                      - followersCount
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 1
                  name: 梦梦
                  avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
                  bio: 这个家伙很懒，什么都没留下。
                  gender: female
                  birthday: '2025-01-01T00:00:00.000Z'
                  createdAt: '2025-05-02T10:49:32.344Z'
                  email: tatsukimengchen@163.com
                  role: Super
                  followingCount: 1
                  followersCount: 0
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Profile
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472524-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
