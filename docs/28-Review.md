# Review - 审核日记

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /diary/{id}/review:
    post:
      summary: Review - 审核日记
      deprecated: false
      description: ''
      tags:
        - Diary/Ctrl
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
                status:
                  type: string
                  enum:
                    - Approved
                    - Rejected
                  x-apifox-enum:
                    - value: Approved
                      name: ''
                      description: ''
                    - value: Rejected
                      name: ''
                      description: ''
                rejectedReason:
                  type: string
              x-apifox-orders:
                - status
                - rejectedReason
              required:
                - status
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
                      message:
                        type: string
                    required:
                      - message
                required:
                  - code
                  - msg
                  - data
              example:
                code: 0
                msg: success
                data:
                  message: 审核通过，内容已同步
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: Diary/Ctrl
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291472887-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
