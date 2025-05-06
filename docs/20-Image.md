# Image - 图片处理

> 由 Cloudflare Worker 实现，仓库链接：https://github.com/TripOffer/cloudflare-worker-image
所有支持的 action 参考 https://docs.rs/photon-rs/latest/photon_rs/

## OpenAPI

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /image:
    get:
      summary: Image - 图片处理
      deprecated: false
      description: >-
        由 Cloudflare Worker
        实现，仓库链接：https://github.com/TripOffer/cloudflare-worker-image

        所有支持的 action 参考 https://docs.rs/photon-rs/latest/photon_rs/
      tags:
        - OSS
      parameters:
        - name: url
          in: query
          description: ''
          required: true
          example: >-
            https://oss.trip.mengchen.xyz/2025/05/03/08f982ac-fe7a-4d18-b77e-60cf768d9400.jpg
          schema:
            type: string
        - name: action
          in: query
          description: |-
            操作指令, 支持 Photon 各种操作指令，指令与参数直接使用 ! 分割
            支持管道操作，多个操作指令使用 | 分割
            如果参数中有 URL 或其他特殊字符，需要使用 encodeURIComponent 编码 URL 和 特殊字符
          required: false
          example: resize!128,128,2
          schema:
            type: string
        - name: format
          in: query
          description: 输出图片格式，默认 webp
          required: false
          schema:
            type: string
            enum:
              - jpg
              - png
              - webp
            x-apifox-enum:
              - value: jpg
                name: ''
                description: ''
              - value: png
                name: ''
                description: ''
              - value: webp
                name: ''
                description: ''
        - name: quality
          in: query
          description: 图片质量，1-100 只有 webp 和 jpg 格式支持，可选，默认 99
          required: false
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties: {}
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: OSS
      x-apifox-status: testing
      x-run-in-apifox: https://app.apifox.com/web/project/6323540/apis/api-291697487-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: localhost:3000
    description: 开发环境
security: []

```
