import Api from '@/service/api';
import type { PresignType } from '@/service/api/oss/types';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const getFileExt = (file: File) => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext!)) return ext;
  return 'jpg';
};

export const uploadResource = async (
  file: File,
  type: PresignType,
  options?: { maxWidth?: number; maxHeight?: number },
) => {
  // 压缩图片
  let processedFile = file;
  if (type === 'thumb') {
    processedFile = await imageCompression(file, {
      maxWidthOrHeight: 200,
      useWebWorker: true,
      initialQuality: 0.9,
    });
  } else if (options?.maxWidth || options?.maxHeight) {
    processedFile = await imageCompression(file, {
      maxWidthOrHeight: Math.max(options.maxWidth || 0, options.maxHeight || 0),
      useWebWorker: true,
      initialQuality: 0.85,
    });
  }

  const ext = getFileExt(processedFile);
  let width: number | undefined, height: number | undefined;

  if (type === 'thumb' || type === 'origin') {
    const img = document.createElement('img');
    const url = URL.createObjectURL(processedFile);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = url;
    });
    width = img.width;
    height = img.height;
    URL.revokeObjectURL(url);
  }

  const params: any = { ext, type };
  if (width) params.width = width;
  if (height) params.height = height;

  const presignRes = await Api.ossApi.getPresignUrl(params);
  const { url: uploadUrl, key } = presignRes.data;

  const uploadResp = await axios.put(uploadUrl, processedFile, {
    validateStatus: () => true,
  });

  if (!(uploadResp.status >= 200 && uploadResp.status < 300)) {
    throw new Error('文件上传失败: ' + uploadResp.status + ' ' + (uploadResp.data || ''));
  }

  const confirmRes = await Api.ossApi.confirmUpload({ key });
  return (confirmRes.data as unknown as { ossObject: any }).ossObject;
};
