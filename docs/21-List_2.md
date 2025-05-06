# List - 获取我的日记列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /user/me/diary:
    get:
      summary: List - 获取我的日记列表
      deprecated: false
      description: ''
      tags:
        - Diary/User
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
                              nullable: true
                            viewCount:
                              type: integer
                            likeCount:
                              type: integer
                            favoriteCount:
                              type: integer
                            commentCount:
                              type: integer
                            published:
                              type: boolean
                            publishedAt:
                              type: string
                              nullable: true
                            status:
                              type: string
                            rejectedReason:
                              type: 'null'
                            reviewedAt:
                              type: string
                              nullable: true
                            createdAt:
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
                          required:
                            - id
                            - authorId
                            - title
                            - slug
                            - thumbnail
                            - viewCount
                            - likeCount
                            - favoriteCount
                            - commentCount
                            - published
                            - publishedAt
                            - status
                            - rejectedReason
                            - reviewedAt
                            - createdAt
                            - updatedAt
                            - tags
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
                    - id: 25891b32-c09d-4ff6-947a-3cab4207c93a
                      authorId: 1
                      title: >-
                        旅行日記、여행일기、Путевой дневникمذكرة السفر、Diario de
                        viaje、Journal de voyage
                      slug: >-
                        lu-xing-ri-ji-putevoj-dnevnikmthkrh-alsfrdiario-de-viajejournal-de-voyage-1746349161045
                      thumbnail: null
                      viewCount: 0
                      likeCount: 0
                      favoriteCount: 0
                      commentCount: 0
                      published: false
                      publishedAt: null
                      status: Pending
                      rejectedReason: null
                      reviewedAt: null
                      createdAt: '2025-05-04T08:59:21.047Z'
                      updatedAt: '2025-05-04T08:59:21.047Z'
                      tags: []
                    - id: 3dcb9de1-0325-4b02-919e-c627591d1034
                      authorId: 1
                      title: 日记 2025-05-04
                      slug: ri-ji-2025-05-04-1746369800566
                      thumbnail: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
                      viewCount: 0
                      likeCount: 0
                      favoriteCount: 0
                      commentCount: 0
                      published: true
                      publishedAt: '2025-05-04T10:35:58.719Z'
                      status: Approved
                      rejectedReason: null
                      reviewedAt: '2025-05-04T10:31:10.937Z'
                      createdAt: '2025-05-04T08:42:23.411Z'
                      updatedAt: '2025-05-04T14:43:20.568Z'
                      tags:
                        - id: 56e0125c-a188-4b74-88bc-a49844056614
                          name: 日记
                  total: 2
                  page: 1
                  size: 10
                  totalPage: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/User
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291749563-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
