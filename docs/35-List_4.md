# List - 获取评论列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/comments:
    get:
      summary: List - 获取评论列表
      deprecated: false
      description: ''
      tags:
        - Diary/Comment
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
                              type: string
                            diaryId:
                              type: string
                            authorId:
                              type: integer
                            content:
                              type: string
                            createdAt:
                              type: string
                            updatedAt:
                              type: string
                            parentId:
                              type: 'null'
                            likeCount:
                              type: integer
                            replyCount:
                              type: integer
                            author:
                              type: object
                              properties:
                                id:
                                  type: integer
                                name:
                                  type: string
                                avatar:
                                  type: string
                              required:
                                - id
                                - name
                                - avatar
                            isLiked:
                              type: boolean
                      total:
                        type: integer
                      page:
                        type: integer
                      size:
                        type: integer
                      totalPage:
                        type: integer
                    required:
                      - list
                      - total
                      - page
                      - size
                      - totalPage
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  list:
                    - id: 944cc9a3-d5c8-4b08-a627-2987e36f313f
                      diaryId: 3dcb9de1-0325-4b02-919e-c627591d1034
                      authorId: 1
                      content: 评论1
                      createdAt: '2025-05-05T11:02:36.111Z'
                      updatedAt: '2025-05-05T11:35:18.176Z'
                      parentId: null
                      likeCount: 0
                      replyCount: 1
                      author:
                        id: 1
                        name: 梦梦
                        avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
                      isLiked: false
                  total: 1
                  page: 1
                  size: 10
                  totalPage: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Comment
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291835630-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
