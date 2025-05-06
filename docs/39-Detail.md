# Detail - 获取日记详细内容

> Auth 为可选，带有 Auth 的请求会返回与用户相关的特殊字段

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/detail:
    get:
      summary: Detail - 获取日记详细内容
      deprecated: false
      description: Auth 为可选，带有 Auth 的请求会返回与用户相关的特殊字段
      tags:
        - Diary
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
                        type: string
                      authorId:
                        type: integer
                      title:
                        type: string
                      slug:
                        type: string
                      content:
                        type: string
                      thumbnail:
                        type: string
                      images:
                        type: array
                        items:
                          type: string
                      video:
                        type: 'null'
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
                      status:
                        type: string
                      reviewedAt:
                        type: string
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
                          x-apifox-orders:
                            - id
                            - name
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
                        x-apifox-orders:
                          - id
                          - name
                          - avatar
                      isLiked:
                        type: boolean
                        description: Auth
                      isFavorited:
                        type: boolean
                        description: Auth
                      isFollowedAuthor:
                        type: boolean
                        description: Auth
                    required:
                      - id
                      - authorId
                      - title
                      - slug
                      - content
                      - thumbnail
                      - images
                      - video
                      - viewCount
                      - likeCount
                      - favoriteCount
                      - commentCount
                      - publishedAt
                      - status
                      - reviewedAt
                      - createdAt
                      - updatedAt
                      - tags
                      - author
                    x-apifox-orders:
                      - id
                      - authorId
                      - title
                      - slug
                      - content
                      - thumbnail
                      - images
                      - video
                      - viewCount
                      - likeCount
                      - favoriteCount
                      - commentCount
                      - publishedAt
                      - status
                      - reviewedAt
                      - createdAt
                      - updatedAt
                      - tags
                      - author
                      - isLiked
                      - isFavorited
                      - isFollowedAuthor
                required:
                  - code
                  - msg
                  - data
                x-apifox-orders:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 3dcb9de1-0325-4b02-919e-c627591d1034
                  authorId: 1
                  title: 日记 2025-05-04
                  slug: ri-ji-2025-05-04-1746369800566
                  content: 今天是 2025 年 5 月 4 日。
                  thumbnail: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
                  images:
                    - 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
                  video: null
                  viewCount: 0
                  likeCount: 0
                  favoriteCount: 1
                  commentCount: 0
                  publishedAt: '2025-05-04T10:35:58.719Z'
                  status: Approved
                  reviewedAt: '2025-05-04T15:16:04.444Z'
                  createdAt: '2025-05-04T08:42:23.411Z'
                  updatedAt: '2025-05-05T10:26:41.549Z'
                  tags:
                    - id: 56e0125c-a188-4b74-88bc-a49844056614
                      name: 日记
                  author:
                    id: 1
                    name: 梦梦
                    avatar: 2025/05/03/14849228-a974-40ce-8878-17073f0111bf.jpg
                  isLiked: false
                  isFavorited: true
                  isFollowedAuthor: false
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291473553-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
