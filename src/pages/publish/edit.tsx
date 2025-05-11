import React, { useState, useEffect } from 'react'; // Removed unused useRef
import { useLocation } from 'react-router-dom';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import DiaryForm from './components/DiaryForm';
import ImageUpload from './components/ImageUpload';
import VideoSection from './components/VideoSection';
import BottomBar from './components/BottomBar';
import Api from '@/service/api';
import imageCompression from 'browser-image-compression';
import { Dialog, Progress, Toast, Result } from 'tdesign-mobile-react';
import { useNavigate } from 'react-router-dom';
import type { PresignExt, PresignType } from '@/service/api/oss/types';

// Helper function to generate video thumbnail (implementation will be refined)
const generateVideoThumbnail = async (videoFile: File): Promise<UploadFile | null> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    video.onloadeddata = () => {
      video.currentTime = 0; // Seek to the first frame
    };
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const thumbnailUrl = URL.createObjectURL(blob);
            const thumbnailFile = new File([blob], `cover_${videoFile.name.split('.')[0]}.jpg`, {
              type: 'image/jpeg',
            });
            resolve({
              name: thumbnailFile.name,
              raw: thumbnailFile,
              url: thumbnailUrl,
              status: 'success',
            });
          } else {
            resolve(null);
          }
        }, 'image/jpeg');
      } else {
        resolve(null);
      }
      URL.revokeObjectURL(video.src); // Clean up
    };
    video.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(video.src); // Clean up
    };
  });
};

const compressImage = async (file: File, maxWidth: number, maxHeight: number) => {
  // 读取图片分辨率
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

const getFileExt = (file: File): PresignExt => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm'].includes(ext!)) return ext as PresignExt;
  return 'jpg';
};

const PublishEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files: initFiles, file: initVideoFile, type: contentType } = location.state || {};

  const [isVideo, setIsVideo] = useState(contentType === 'video');
  // const [videoFile, setVideoFile] = useState<File | null>(null); // Marked as unused, commented out
  const [coverImage, setCoverImage] = useState<UploadFile | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  // For image uploads (original logic)
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');
  const [resultMsg, setResultMsg] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'publish' | 'archive'>('publish');

  useEffect(() => {
    if (contentType === 'video' && initVideoFile) {
      setIsVideo(true);
      // setVideoFile(initVideoFile); // Corresponding setter for the commented out state
      setVideoPreviewUrl(URL.createObjectURL(initVideoFile));
      generateVideoThumbnail(initVideoFile).then((thumbnail) => {
        if (thumbnail) {
          setCoverImage(thumbnail);
        }
      });
      setImageFileList([]); // Clear image list if it's a video post
    } else if (contentType === 'image' && initFiles) {
      setIsVideo(false);
      const initialUploadFiles: UploadFile[] = Array.isArray(initFiles)
        ? initFiles.map((file: File, idx: number) => ({
            name: file.name,
            raw: file,
            url: URL.createObjectURL(file),
            status: 'success',
            uid: `${Date.now()}-${idx}`,
          }))
        : [];
      setImageFileList(initialUploadFiles);
      // setVideoFile(null); // Corresponding setter for the commented out state
      setCoverImage(null);
      setVideoPreviewUrl(null);
    }

    // Cleanup object URLs on component unmount
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (coverImage?.url && coverImage.url.startsWith('blob:'))
        URL.revokeObjectURL(coverImage.url);
      imageFileList.forEach((file) => {
        if (file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, initFiles, initVideoFile]);

  const pageTitle = isVideo ? '发布视频日记' : '发布图文日记';

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
    const { url: uploadUrl, key } = presignRes.data.data;
    await fetch(uploadUrl, { method: 'PUT', body: file });
    const confirmRes = await Api.ossApi.confirmUpload({ key });
    return (confirmRes.data as unknown as { ossObject: any }).ossObject;
  };

  // 主发布/存草稿流程
  const handleSubmit = async (published: boolean) => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    try {
      let coverOss,
        imageOssList: any[] = [],
        videoOss;
      let total = isVideo ? 2 : imageFileList.length + (coverImage ? 1 : 0);
      let done = 0;
      if (isVideo && initVideoFile) {
        // 视频上传
        const videoDuration = (initVideoFile as any).duration || undefined;
        videoOss = await uploadResource(initVideoFile, 'video', { duration: videoDuration });
        setProgress((++done / total) * 100);
        if (coverImage?.raw instanceof File) {
          const compressed = await compressImage(coverImage.raw, 854, 480);
          coverOss = await uploadResource(compressed, 'thumb');
          setProgress((++done / total) * 100);
        }
      } else {
        for (let i = 0; i < imageFileList.length; i++) {
          const f = imageFileList[i];
          if (f.raw instanceof File) {
            const compressed = await compressImage(f.raw, 1920, 1080);
            const oss = await uploadResource(compressed, 'origin');
            imageOssList.push(oss);
            setProgress((++done / total) * 100);
          }
        }
        if (coverImage?.raw instanceof File) {
          const compressed = await compressImage(coverImage.raw, 854, 480);
          coverOss = await uploadResource(compressed, 'thumb');
          setProgress((++done / total) * 100);
        }
      }
      // 2. 调用发布/存草稿接口
      const req: any = {
        title,
        content,
        images: imageOssList.map((o) => o.key),
        cover: coverOss?.key,
        summary: content.slice(0, 100),
        tags,
        published,
      };
      if (isVideo && videoOss) req.video = videoOss.key;
      await Api.diaryApi.createDiary(req);
      setResultType('success');
      setResultMsg(published ? '发布成功！' : '已存入草稿箱');
      setShowResult(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (e: any) {
      setResultType('error');
      setResultMsg('发布失败，请重试');
      setShowResult(true);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // 触发Dialog
  const handleBarClick = (type: 'publish' | 'archive') => {
    setDialogType(type);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-8 px-4 pb-20">
      {/* 进度条 */}
      {uploading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Progress percentage={progress} theme="plump" />
        </div>
      )}
      {/* 发布结果 */}
      {showResult && <Result theme={resultType} title={resultMsg} className="mt-20" />}
      {/* Dialog 询问 */}
      {showDialog && (
        <Dialog
          visible={showDialog}
          title={dialogType === 'publish' ? '确认发布？' : '存入草稿箱'}
          content={
            dialogType === 'publish' ? '发布后将公开展示，是否继续？' : '是否将内容存入草稿箱？'
          }
          confirmBtn={{ content: '确认', theme: 'primary' }}
          cancelBtn={{ content: '取消' }}
          onConfirm={() => {
            setShowDialog(false);
            handleSubmit(dialogType === 'publish');
          }}
          onClose={() => setShowDialog(false)}
        />
      )}
      <div className="max-w-3xl mx-auto pb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 relative">
          <span className="relative inline-block">
            {pageTitle}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full transform translate-y-1"></span>
          </span>
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <DiaryForm
            title={title}
            content={content}
            tags={tags}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onTagsChange={setTags}
          />
        </div>

        {isVideo ? (
          <VideoSection
            videoPreviewUrl={videoPreviewUrl}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <ImageUpload fileList={imageFileList} setFileList={setImageFileList} />
          </div>
        )}
      </div>
      {/* 底部固定导航栏 */}
      <BottomBar
        onArchive={() => handleBarClick('archive')}
        onPublish={() => handleBarClick('publish')}
      />
    </div>
  );
};

export default PublishEditPage;
