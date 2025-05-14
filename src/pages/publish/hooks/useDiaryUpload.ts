import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Api from '@/service/api';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import type { PresignExt, PresignType } from '@/service/api/oss/types';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const getFileExt = (file: File): PresignExt => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm'].includes(ext!)) return ext as PresignExt;
  return 'jpg';
};

const compressImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
  isCover: boolean = false,
) => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  // 如果不是封面且是 GIF，直接返回原文件
  if (!isCover && ext === 'gif') return file;
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
  const { t } = useTranslation('diary');
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
    const { url: uploadUrl, key, contentType } = presignRes.data;

    // 新增：设置 Content-Type
    const uploadResp = await axios.put(uploadUrl, file, {
      headers: contentType ? { 'Content-Type': contentType } : undefined,
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
    id?: string; // 新增：支持编辑模式
    published: boolean;
    isVideo: boolean;
    initVideoFile?: File;
    imageFileList: UploadFile[];
    coverImage: UploadFile | null;
    title: string;
    content: string;
    tags: string[];
    videoKey?: string; // 新增 videoKey
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    const {
      id,
      published,
      isVideo,
      initVideoFile,
      imageFileList,
      coverImage,
      title,
      content,
      tags,
      videoKey, // 新增 videoKey
      onSuccess,
      onError,
    } = options;
    // 新增：前端校验输入长度
    const MAX_TITLE_LENGTH = 50;
    const MAX_CONTENT_LENGTH = 2000;
    if (title.length > MAX_TITLE_LENGTH) {
      setResultType('error');
      setResultMsg(t('form.titleTooLong', { max: MAX_TITLE_LENGTH }));
      setUploading(false);
      if (options.onError) options.onError();
      return;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      setResultType('error');
      setResultMsg(t('form.contentTooLong', { max: MAX_CONTENT_LENGTH }));
      setUploading(false);
      if (options.onError) options.onError();
      return;
    }
    // 新增：标签数量校验
    const MAX_TAGS = 10;
    if (tags.length > MAX_TAGS) {
      setResultType('error');
      setResultMsg(t('form.tagsTooMany', { max: MAX_TAGS }));
      setUploading(false);
      if (options.onError) options.onError();
      return;
    }
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    const OSS_PREFIX =
      typeof import.meta.env.VITE_OSS_URL === 'string' ? import.meta.env.VITE_OSS_URL : '';
    try {
      let coverOss,
        imageOssList: any[] = [],
        videoOss;
      let total = isVideo ? 2 : imageFileList.length + 1; // 图文日记总数+1（封面）
      let done = 0;
      if (isVideo && initVideoFile) {
        const videoDuration = (initVideoFile as any).duration || undefined;
        videoOss = await uploadResource(initVideoFile, 'video', { duration: videoDuration });
        setProgress(Math.round((++done / total) * 100));
        if (coverImage?.raw instanceof File) {
          const compressed = await compressImage(coverImage.raw, 854, 480, true);
          coverOss = await uploadResource(compressed, 'thumb');
          setProgress(Math.round((++done / total) * 100));
        }
      } else if (isVideo && videoKey) {
        // 编辑模式下未重新上传视频但有 videoKey
        videoOss = { key: videoKey };
        done++;
        // 修复：编辑模式下如果更换了封面图片，也要上传新封面
        if (coverImage?.raw instanceof File) {
          const compressed = await compressImage(coverImage.raw, 854, 480, true);
          coverOss = await uploadResource(compressed, 'thumb');
          setProgress(Math.round((++done / total) * 100));
        }
      } else {
        console.log('图文日记，开始上传图片', imageFileList);
        // 图文日记，先上传所有图片（origin）
        for (let i = 0; i < imageFileList.length; i++) {
          const f = imageFileList[i];
          // 新增：只处理本地图片（raw 为 File），已上传的网络图片跳过
          if (f.raw instanceof File) {
            const compressed = await compressImage(f.raw, 1920, 1080, false);
            const oss = await uploadResource(compressed, 'origin');
            imageOssList.push(oss);
            setProgress(Math.round((++done / total) * 100));
          } else if (f.url && f.url.startsWith(OSS_PREFIX)) {
            // 用 OSS_PREFIX 去除前缀，只保留 key
            let key = f.url;
            if (OSS_PREFIX && key.startsWith(OSS_PREFIX)) {
              key = key.slice(OSS_PREFIX.length);
            }
            imageOssList.push({ key });
            setProgress(Math.round((++done / total) * 100));
          }
        }
        // 封面始终用第一张图片压缩 854x480 上传（本地图片或网络图片）
        if (imageFileList[0]?.raw instanceof File) {
          const compressedCover = await compressImage(imageFileList[0].raw, 854, 480, true);
          coverOss = await uploadResource(compressedCover, 'thumb');
          setProgress(Math.round((++done / total) * 100));
        } else if (imageFileList[0]?.url && imageFileList[0].url.startsWith(OSS_PREFIX)) {
          // 新增：网络图片也要压缩
          try {
            const response = await axios.get(imageFileList[0].url, {
              responseType: 'blob',
            });
            const blob = response.data;
            // 尝试获取扩展名
            const ext = imageFileList[0].url.split('.').pop()?.split('?')[0] || 'jpg';
            const file = new File([blob], `cover.${ext}`, { type: blob.type });
            const compressedCover = await compressImage(file, 854, 480, true);
            coverOss = await uploadResource(compressedCover, 'thumb');
            setProgress(Math.round((++done / total) * 100));
          } catch (err) {
            // 若下载或压缩失败，降级为直接取 key
            let key = imageFileList[0].url;
            if (OSS_PREFIX && key.startsWith(OSS_PREFIX)) {
              key = key.slice(OSS_PREFIX.length);
            }
            coverOss = { key };
            setProgress(Math.round((++done / total) * 100));
          }
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
        tags,
        published,
      };
      if (isVideo && videoOss) req.video = videoOss.key;
      if (id) {
        // 编辑模式，调用 updateDiary
        await Api.diaryApi.updateDiary(id, req);
      } else {
        // 新建，调用 createDiary
        await Api.diaryApi.createDiary(req);
      }
      setResultType('success');
      setResultMsg(published ? t('form.publishSuccess') : t('form.saveDraftSuccess'));
      if (onSuccess) onSuccess();
    } catch (e: any) {
      setResultType('error');
      setResultMsg(t('form.publishFailed'));
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
