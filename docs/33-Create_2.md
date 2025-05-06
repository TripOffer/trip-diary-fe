# Create - 创建评论

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/comment:
    post:
      summary: Create - 创建评论
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
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                content:
                  type: string
                parentId:
                  type: string
              x-apifox-orders:
                - content
                - parentId
              required:
                - content
      responses:
        '201':
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
                    required:
                      - id
                      - diaryId
                      - authorId
                      - content
                      - createdAt
                      - updatedAt
                      - parentId
                      - likeCount
                      - replyCount
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  id: 944cc9a3-d5c8-4b08-a627-2987e36f313f
                  diaryId: 3dcb9de1-0325-4b02-919e-c627591d1034
                  authorId: 1
                  content: 评论1
                  createdAt: '2025-05-05T11:02:36.111Z'
                  updatedAt: '2025-05-05T11:02:36.111Z'
                  parentId: null
                  likeCount: 0
                  replyCount: 0
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Comment
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291835556-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
