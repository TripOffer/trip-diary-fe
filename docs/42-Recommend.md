# Recommend - 获取推荐日记列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/recommend:
    get:
      summary: Recommend - 获取推荐日记列表
      deprecated: false
      description: ''
      tags:
        - Diary
      parameters:
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
                            authorId:
                              type: integer
                            title:
                              type: string
                            slug:
                              type: string
                            thumbnail:
                              type: string
                            viewCount:
                              type: integer
                            likeCount:
                              type: integer
                            favoriteCount:
                              type: integer
                            commentCount:
                              type: integer
                            publishedAt:
                              type: string
                            updatedAt:
                              type: string
                            tags:
                              type: array
                              items:
                                type: object
                                properties:
                                  id:
                                    type: string
                                  name:
                                    type: string
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
                    - id: 3dcb9de1-0325-4b02-919e-c627591d1034
                      authorId: 1
                      title: 日记 2025-05-04
                      slug: ri-ji-2025-05-04-1746369800566
                      thumbnail: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
                      viewCount: 0
                      likeCount: 0
                      favoriteCount: 1
                      commentCount: 2
                      publishedAt: '2025-05-04T10:35:58.719Z'
                      updatedAt: '2025-05-05T11:27:48.984Z'
                      tags:
                        - id: 56e0125c-a188-4b74-88bc-a49844056614
                          name: 日记
                      author:
                        id: 1
                        name: 梦梦
                        avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
                  total: 1
                  page: 1
                  size: 10
                  totalPage: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291838191-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
