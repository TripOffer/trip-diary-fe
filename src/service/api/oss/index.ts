import BaseApi from '../shared';
import {
  PresignQuery,
  PresignRes,
  ConfirmUploadReq,
  ConfirmUploadRes,
  ImageProcessQuery,
} from './types';

class OssApi extends BaseApi {
  urls = {
    presign: '/oss/presign',
    confirm: '/oss/confirm-upload',
    image: '/image',
  };

  tag = 'OSS';

  async getPresignUrl(params: PresignQuery) {
    return this.http.post<PresignRes>(this.urls.presign, params);
  }

  async confirmUpload(data: ConfirmUploadReq) {
    return this.http.post<ConfirmUploadRes>(this.urls.confirm, data);
  }

  async imageProcess(params: ImageProcessQuery) {
    // 通常图片处理直接拼接 url，返回图片流或新 url
    return this.http.get(this.urls.image, { params, responseType: 'blob' });
  }
}

export const ossApi = new OssApi();
