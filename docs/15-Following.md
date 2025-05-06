# Following - 获取关注列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/{id}/following:
    get:
      summary: Following - 获取关注列表
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
                          type: object
                          properties:
                            id:
                              type: integer
                            name:
                              type: string
                            avatar:
                              type: 'null'
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
                    - id: 2
                      name: 梦辰
                      avatar: null
                      bio: 这个家伙很懒，什么都没留下。
                      gender: male
                      birthday: '2025-01-01T00:00:00.000Z'
                      createdAt: '2025-05-02T16:45:05.208Z'
                  total: 1
                  page: 1
                  size: 10
                  totalPages: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: User/Follow
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291738377-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
