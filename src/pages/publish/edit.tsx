import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Message, UploadFile } from 'tdesign-mobile-react';
import ImageUpload from './components/ImageUpload';
import VideoCoverSelector from './components/VideoCoverSelector';
import { useVideoCover } from './hooks/useVideoCover';
import PublishForm from './components/PublishForm';

const PublishEditPage = () => {
  const location = useLocation();
  // 通过 state 获取文件和类型
  const { file, type } = location.state || {};

  // 支持的扩展名
  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const videoExts = ['mp4', 'webm'];

  // 用于Upload组件的图片文件（图片原图或视频首帧）
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 新增：用自定义hook提取视频首帧
  const { coverImage, loading: coverLoading } = useVideoCover(type === 'video' ? file : undefined);

  // 封面选择弹窗和当前帧
  const [showCoverSelector, setShowCoverSelector] = useState(false);
  const [coverTime, setCoverTime] = useState(0); // 秒
  const [videoDuration, setVideoDuration] = useState(0); // 秒

  // 标题和正文输入
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 用于隐藏 video 元素
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type === 'video' && coverImage) {
      setUploadImage(coverImage);
      setLoading(false);
    } else if (type === 'image' && file instanceof File) {
      setUploadImage(file);
      setLoading(false);
    }
  }, [type, file, coverImage]);

  // 视频加载后获取时长
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setVideoDuration(e.currentTarget.duration);
  };

  // 上传文件回调
  const handleUpload = (files: UploadFile[]) => {
    if (files && files[0]) {
      Message.success('文件选择成功');
      // 这里可以做后续上传或表单处理
    }
  };

  // 设为封面
  const handleSetCover = (imageFile: File) => {
    setUploadImage(imageFile);
    setShowCoverSelector(false);
  };

  return (
    <div className="min-h-screen bg-white pt-8 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">
        {type === 'video' ? '视频编辑' : '图文编辑'}
      </h2>
      <PublishForm
        type={type}
        title={title}
        content={content}
        uploadImage={uploadImage}
        loading={loading || coverLoading}
        imageExts={imageExts}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onUpload={handleUpload}
        onShowCoverSelector={() => setShowCoverSelector(true)}
        showCoverSelectorBtn={type === 'video'}
        file={file}
        videoDuration={videoDuration}
        coverTime={coverTime}
        onLoadedMetadata={handleLoadedMetadata}
      >
        {type === 'image' && (
          <ImageUpload
            uploadImage={uploadImage}
            loading={loading}
            imageExts={imageExts}
            onChange={handleUpload}
          />
        )}
      </PublishForm>
      {type === 'video' && showCoverSelector && file && (
        <VideoCoverSelector
          file={file}
          videoDuration={videoDuration}
          coverTime={coverTime}
          loading={loading || coverLoading}
          onSetCover={handleSetCover}
          onClose={() => setShowCoverSelector(false)}
          onChangeCoverTime={setCoverTime}
        />
      )}
      <Button
        block
        theme="primary"
        disabled={loading || coverLoading}
        onClick={() => Message.info('发布功能待实现')}
      >
        发布
      </Button>
    </div>
  );
};

export default PublishEditPage;
