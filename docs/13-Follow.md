# Follow - 关注用户

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/{id}/follow:
    put:
      summary: Follow - 关注用户
      deprecated: false
      description: ''
      tags:
        - User/Follow
      parameters:
        - name: id
          in: path
          description: ''
          required: true
          schema:
            type: string
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
                      followerId:
                        type: integer
                      followingId:
                        type: integer
                      createdAt:
                        type: string
                    required:
                      - id
                      - followerId
                      - followingId
                      - createdAt
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 1
                  followerId: 1
                  followingId: 2
                  createdAt: '2025-05-04T07:52:58.133Z'
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
              example:
                code: 403
                msg: 不能关注自己
                data: null
          headers: {}
          x-apifox-name: 禁止访问
      security: []
      x-apifox-folder: User/Follow
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291735737-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
