# Followers - 获取粉丝列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/{id}/followers:
    get:
      summary: Followers - 获取粉丝列表
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
                      list:
                        type: array
                        items:
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
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  list:
                    - id: 1
                      name: 梦梦
                      avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
                      bio: 这个家伙很懒，什么都没留下。
                      gender: female
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T10:49:32.344Z'
                  total: 1
                  page: 1
                  size: 10
                  totalPages: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Follow
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291738615-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
