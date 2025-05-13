import React, { useState, useEffect } from 'react'; // Removed unused useRef
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import DiaryForm from './components/DiaryForm';
import ImageUpload from './components/ImageUpload';
import VideoSection from './components/VideoSection';
import BottomBar from './components/BottomBar';
import { Progress } from 'tdesign-mobile-react';
import PublishDialog from './components/PublishDialog';
import PublishResult from './components/PublishResult';
import useDiaryUpload from './hooks/useDiaryUpload';
import { Icon } from '@iconify/react';

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

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';
const getOssUrl = (key?: string) => {
  if (!key) return '';
  if (key.startsWith('http')) return key;
  return OSS_PREFIX + key;
};

const PublishEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 新增：支持 URL 查询参数 id
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');
  // 优先 location.state.id，否则取 urlId
  const {
    files: initFiles,
    file: initVideoFile,
    type: contentType,
    id: stateId,
  } = location.state || {};
  const diaryId = stateId || urlId;

  // 新增：编辑模式标志
  const isEditMode = Boolean(diaryId);

  const [isVideo, setIsVideo] = useState(contentType === 'video');
  const [coverImage, setCoverImage] = useState<UploadFile | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'publish' | 'archive'>('publish');
  const [videoKey, setVideoKey] = useState<string | null>(null); // 新增 videoKey

  // 上传/发布相关状态和方法
  const { uploading, progress, resultType, resultMsg, handleSubmit, setResultType, setResultMsg } =
    useDiaryUpload();

  // 新增：编辑模式下获取详情并初始化表单
  useEffect(() => {
    if (isEditMode && diaryId) {
      // 获取详情
      import('@/service/api').then(({ default: Api }) => {
        Api.diaryApi.getDiaryDetail(diaryId).then((res: any) => {
          const data = res.data;
          setTitle(data.title || '');
          setContent(data.content || '');
          // 标签兼容对象/字符串
          setTags(Array.isArray(data.tags) ? data.tags.map((t: any) => t.name || t) : []);
          // 处理图片/视频/封面
          if (data.video) {
            setIsVideo(true);
            setVideoPreviewUrl(data.videoUrl || getOssUrl(data.video) || '');
            setVideoKey(data.video || null); // 赋值 videoKey
            setCoverImage(
              data.thumbnail
                ? {
                    name: '封面',
                    url: getOssUrl(data.thumbnail),
                    status: 'success',
                    raw: undefined,
                  }
                : null,
            );
            setImageFileList([]);
          } else {
            setIsVideo(false);
            setVideoKey(null); // 清空 videoKey
            setImageFileList(
              (data.images || []).map((img: any, idx: number) => ({
                name: `图片${idx + 1}`,
                url: getOssUrl(img),
                status: 'success',
                raw: undefined,
              })),
            );
            setCoverImage(
              data.thumbnail
                ? {
                    name: '封面',
                    url: getOssUrl(data.thumbnail),
                    status: 'success',
                    raw: undefined,
                  }
                : null,
            );
            setVideoPreviewUrl(null);
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, diaryId]);

  // 上传状态变化时，控制Result弹窗显示/隐藏
  useEffect(() => {
    if (uploading) {
      setShowResult(true);
    }
  }, [uploading]);

  useEffect(() => {
    if (!isEditMode) {
      if (contentType === 'video' && initVideoFile) {
        setIsVideo(true);
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
        setCoverImage(null);
        setVideoPreviewUrl(null);
      }
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
  }, [contentType, initFiles, initVideoFile, isEditMode]);

  // 编辑模式标题
  const pageTitle = isEditMode ? '编辑日记' : isVideo ? '发布视频日记' : '发布图文日记';

  // 触发Dialog（提前校验）
  const handleBarClick = (type: 'publish' | 'archive') => {
    // 必填项校验
    if (!title.trim()) {
      setResultType('error');
      setResultMsg('标题为必填项');
      setShowResult(true);
      return;
    }
    if (!content.trim()) {
      setResultType('error');
      setResultMsg('正文为必填项');
      setShowResult(true);
      return;
    }
    if (isVideo) {
      if (!initVideoFile && !videoPreviewUrl) {
        setResultType('error');
        setResultMsg('请上传视频');
        setShowResult(true);
        return;
      }
    } else {
      if (!imageFileList || imageFileList.length === 0) {
        setResultType('error');
        setResultMsg('请上传图片');
        setShowResult(true);
        return;
      }
    }
    setDialogType(type);
    setShowDialog(true);
  };

  // Dialog确认（只负责提交）
  const handleDialogConfirm = () => {
    setShowDialog(false);
    handleSubmit({
      ...(isEditMode ? { id: diaryId } : {}),
      published: dialogType === 'publish',
      isVideo,
      initVideoFile,
      imageFileList,
      coverImage,
      title,
      content,
      tags,
      ...(videoKey ? { videoKey } : {}), // 仅 videoKey 存在时传递
      onSuccess: () => {
        setShowResult(true);
        // 通知上一个页面刷新稿件列表
        navigate(-1);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('refresh-diary-list'));
        }, 300);
      },
      onError: () => setShowResult(true),
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-8 px-4 pb-20 overflow-y-auto"
      style={{ maxHeight: '100vh' }}
    >
      {/* 进度条 */}
      {/* {uploading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Progress percentage={progress} theme="plump" />
        </div>
      )} */}
      {/* 发布结果 */}
      <PublishResult
        show={showResult || uploading}
        type={uploading ? 'success' : resultType}
        msg={uploading ? '正在上传，请稍候…' : resultMsg}
        onClose={!uploading ? () => setShowResult(false) : undefined}
        uploading={uploading}
        progress={progress}
      />
      {/* Dialog 询问 */}
      <PublishDialog
        visible={showDialog}
        dialogType={dialogType}
        onConfirm={handleDialogConfirm}
        onClose={() => setShowDialog(false)}
      />
      <div className="max-w-3xl mx-auto pb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 relative flex items-center justify-center">
          {/* 返回按钮 */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => navigate(-1)}
            aria-label="返回"
            type="button"
          >
            <Icon icon="mingcute:arrow-left-line" className="text-xl" />
            <span className="ml-1 hidden sm:inline">返回</span>
          </button>
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
        onArchive={!uploading ? () => handleBarClick('archive') : undefined}
        onPublish={!uploading ? () => handleBarClick('publish') : undefined}
      />
    </div>
  );
};

export default PublishEditPage;
