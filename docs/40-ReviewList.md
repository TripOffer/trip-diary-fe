# ReviewList - 获取待审核日记列表

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/review-list:
    get:
      summary: ReviewList - 获取待审核日记列表
      deprecated: false
      description: ''
      tags:
        - Diary
      parameters:
        - name: query
          in: query
          description: ''
          required: false
          example: 日记
          schema:
            type: string
        - name: status
          in: query
          description: ''
          required: false
          example: Pending
          schema:
            type: string
            enum:
              - Pending
              - Approved
              - Rejected
            x-apifox-enum:
              - value: Pending
                name: ''
                description: ''
              - value: Approved
                name: ''
                description: ''
              - value: Rejected
                name: ''
                description: ''
        - name: authorId
          in: query
          description: ''
          required: false
          example: 0
          schema:
            type: integer
        - name: sort
          in: query
          description: ''
          required: false
          schema:
            type: string
            enum:
              - createdAt
              - publishedAt
              - viewCount
              - likeCount
              - favoriteCount
              - commentCount
            x-apifox-enum:
              - value: createdAt
                name: ''
                description: ''
              - value: publishedAt
                name: ''
                description: ''
              - value: viewCount
                name: ''
                description: ''
              - value: likeCount
                name: ''
                description: ''
              - value: favoriteCount
                name: ''
                description: ''
              - value: commentCount
                name: ''
                description: ''
        - name: order
          in: query
          description: ''
          required: false
          example: desc
          schema:
            type: string
            enum:
              - desc
              - asc
            x-apifox-enum:
              - value: desc
                name: ''
                description: ''
              - value: asc
                name: ''
                description: ''
        - name: page
          in: query
          description: ''
          required: false
          schema:
            type: integer
        - name: size
          in: query
          description: ''
          required: false
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
                            title:
                              type: string
                            status:
                              type: string
                            author:
                              type: object
                              properties:
                                id:
                                  type: integer
                                name:
                                  type: string
                              required:
                                - id
                                - name
                            published:
                              type: boolean
                            publishedAt:
                              type: 'null'
                            createdAt:
                              type: string
                            viewCount:
                              type: integer
                            likeCount:
                              type: integer
                            favoriteCount:
                              type: integer
                            commentCount:
                              type: integer
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
                      title: >-
                        旅行日記、여행일기、Путевой дневникمذكرة السفر、Diario de
                        viaje、Journal de voyage
                      status: Pending
                      author:
                        id: 1
                        name: 梦梦
                      published: false
                      publishedAt: null
                      createdAt: '2025-05-04T08:59:21.047Z'
                      viewCount: 0
                      likeCount: 0
                      favoriteCount: 0
                      commentCount: 0
                  total: 1
                  page: 1
                  size: 10
                  totalPage: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291774543-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
