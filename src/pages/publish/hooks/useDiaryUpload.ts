import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Api from '@/service/api';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import type { PresignExt, PresignType } from '@/service/api/oss/types';
import axios from 'axios';

const getFileExt = (file: File): PresignExt => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm'].includes(ext!)) return ext as PresignExt;
  return 'jpg';
};

const compressImage = async (file: File, maxWidth: number, maxHeight: number) => {
  const img = document.createElement('img');
  const url = URL.createObjectURL(file);
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = url;
  });
  const { width, height } = img;
  URL.revokeObjectURL(url);
  if (width <= maxWidth && height <= maxHeight) return file;
  return imageCompression(file, {
    maxWidthOrHeight: Math.max(maxWidth, maxHeight),
    useWebWorker: true,
    initialQuality: 0.85,
  });
};

const useDiaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');
  const [resultMsg, setResultMsg] = useState('');

  // 上传资源并返回oss key
  const uploadResource = async (
    file: File,
    type: PresignType,
    extra: { duration?: number } = {},
  ) => {
    const ext = getFileExt(file);
    let width: number | undefined, height: number | undefined;
    if (type === 'thumb' || type === 'origin') {
      const img = document.createElement('img');
      const url = URL.createObjectURL(file);
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
    if (extra.duration) params.duration = extra.duration;
    const presignRes = await Api.ossApi.getPresignUrl(params);
    console.log('获取预签名URL成功', presignRes);
    const { url: uploadUrl, key } = presignRes.data;

    // 新增：fetch 上传时检查 response.ok，并加上 Content-Type
    const uploadResp = await axios.put(uploadUrl, file, {
      validateStatus: () => true, // 允许自定义错误处理
    });
    if (!(uploadResp.status >= 200 && uploadResp.status < 300)) {
      throw new Error('文件上传失败: ' + uploadResp.status + ' ' + (uploadResp.data || ''));
    }

    const confirmRes = await Api.ossApi.confirmUpload({ key });
    return (confirmRes.data as unknown as { ossObject: any }).ossObject;
  };

  // 主发布/存草稿流程
  const handleSubmit = async (options: {
    published: boolean;
    isVideo: boolean;
    initVideoFile?: File;
    imageFileList: UploadFile[];
    coverImage: UploadFile | null;
    title: string;
    content: string;
    tags: string[];
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    const {
      published,
      isVideo,
      initVideoFile,
      imageFileList,
      coverImage,
      title,
      content,
      tags,
      onSuccess,
      onError,
    } = options;
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    try {
      let coverOss,
        imageOssList: any[] = [],
        videoOss;
      let total = isVideo ? 2 : imageFileList.length + 1; // 图文日记总数+1（封面）
      let done = 0;
      if (isVideo && initVideoFile) {
        const videoDuration = (initVideoFile as any).duration || undefined;
        videoOss = await uploadResource(initVideoFile, 'video', { duration: videoDuration });
        setProgress((++done / total) * 100);
        if (coverImage?.raw instanceof File) {
          const compressed = await compressImage(coverImage.raw, 854, 480);
          coverOss = await uploadResource(compressed, 'thumb');
          setProgress((++done / total) * 100);
        }
      } else {
        // 图文日记，先上传所有图片（origin）
        for (let i = 0; i < imageFileList.length; i++) {
          const f = imageFileList[i];
          if (f.raw instanceof File) {
            const compressed = await compressImage(f.raw, 1920, 1080);
            const oss = await uploadResource(compressed, 'origin');
            imageOssList.push(oss);
            setProgress((++done / total) * 100);
          }
        }
        // 封面始终用第一张图片压缩 854x480 上传
        if (imageFileList[0]?.raw instanceof File) {
          const compressedCover = await compressImage(imageFileList[0].raw, 854, 480);
          coverOss = await uploadResource(compressedCover, 'thumb');
          setProgress((++done / total) * 100);
        } else {
          coverOss = undefined;
        }
      }
      // 2. 调用发布/存草稿接口
      const req: any = {
        title,
        content,
        images: imageOssList.map((o) => o.key),
        thumbnail: coverOss?.key,
        summary: content.slice(0, 100),
        tags,
        published,
      };
      if (isVideo && videoOss) req.video = videoOss.key;
      await Api.diaryApi.createDiary(req);
      setResultType('success');
      setResultMsg(published ? '发布成功！' : '已存入草稿箱');
      if (onSuccess) onSuccess();
    } catch (e: any) {
      setResultType('error');
      setResultMsg('发布失败，请重试');
      if (onError) onError();
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return {
    uploading,
    progress,
    resultType,
    resultMsg,
    setResultMsg,
    setResultType,
    handleSubmit,
  };
};

export default useDiaryUpload;
