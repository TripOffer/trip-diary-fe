# Confirm - 确认上传

> 先获取预签名URL，对象上传成功后再请求 Confirm，此时会将对象信息存储到数据库

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /oss/confirm-upload:
    post:
      summary: Confirm - 确认上传
      deprecated: false
      description: 先获取预签名URL，对象上传成功后再请求 Confirm，此时会将对象信息存储到数据库
      tags:
        - OSS
      parameters: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                key:
                  type: string
              required:
                - key
              x-apifox-orders:
                - key
            example:
              key: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
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
                      success:
                        type: boolean
                      ossObject:
                        type: object
                        properties:
                          id:
                            type: string
                          key:
                            type: string
                          userId:
                            type: integer
                          ext:
                            type: string
                          width:
                            type: integer
                          height:
                            type: integer
                          duration:
                            type: 'null'
                          type:
                            type: string
                          createdAt:
                            type: string
                        required:
                          - id
                          - key
                          - userId
                          - ext
                          - width
                          - height
                          - duration
                          - type
                          - createdAt
                    required:
                      - success
                      - ossObject
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  success: true
                  ossObject:
                    id: f3230115-e609-454d-86b8-2c940ab7b342
                    key: 2025/05/03/2bbf5996-db03-4ad6-adc2-45f2a49406da.jpg
                    userId: 1
                    ext: jpg
                    width: 2048
                    height: 1346
                    duration: null
                    type: origin
                    createdAt: '2025-05-03T14:41:36.391Z'
          headers: {}
          x-apifox-name: 成功
        '400':
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
                code: 400
                msg: 元数据不存在或已过期
                data: null
          headers: {}
          x-apifox-name: 请求有误
      security: []
      x-apifox-folder: OSS
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291692283-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
