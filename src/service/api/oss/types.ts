import { ApiRes } from '../shared';

// 获取预签名 URL
export type PresignExt = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'mp4' | 'webm';
export type PresignType = 'thumb' | 'origin' | 'video';
export interface PresignQuery {
  ext: PresignExt;
  width?: number;
  height?: number;
  duration?: number;
  type?: PresignType;
}
export interface PresignData {
  url: string;
  key: string;
}
export type PresignRes = PresignData;

// 确认上传
export interface ConfirmUploadReq {
  key: string;
}
export interface OssObject {
  id: string;
  key: string;
  userId: number;
  ext: string;
  width: number;
  height: number;
  duration: number | null;
  type: string;
  createdAt: string;
}
export interface ConfirmUploadData {
  success: boolean;
  ossObject: OssObject;
}
export type ConfirmUploadRes = ApiRes<ConfirmUploadData>;

// 图片处理
export interface ImageProcessQuery {
  url: string;
  action?: string;
  format?: 'jpg' | 'png' | 'webp';
  quality?: string;
}
// 返回为图片流或处理后图片 URL，通常不定义严格类型
