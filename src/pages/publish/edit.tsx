import React, { useState, useEffect } from 'react'; // Removed unused useRef
import { useLocation } from 'react-router-dom';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import DiaryForm from './components/DiaryForm';
import ImageUpload from './components/ImageUpload';
import CoverSelector from './components/CoverSelector'; // Import the new component
import { Icon } from '@iconify/react/dist/iconify.js';

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

const PublishEditPage = () => {
  const location = useLocation();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-8 px-4 pb-20">
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
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">视频预览</h3>
              {videoPreviewUrl && (
                <video
                  controls
                  src={videoPreviewUrl}
                  className="w-full rounded-lg mb-4"
                  style={{ maxHeight: '300px' }}
                />
              )}
              <h3 className="text-lg font-semibold mb-3 text-gray-700">设置封面</h3>
              <CoverSelector currentCover={coverImage} onCoverChange={setCoverImage} />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <ImageUpload fileList={imageFileList} setFileList={setImageFileList} />
          </div>
        )}
      </div>
      {/* 底部固定导航栏 */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow z-50 flex items-center py-3 px-4"
        style={{ boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.04)', height: 64 }}
      >
        <button
          className="flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 transition-all duration-150 mr-4"
          style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
        >
          <Icon icon="mdi:archive-outline" className="text-2xl" />
        </button>
        <button
          className="flex-1 h-12 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition-all duration-150 flex items-center justify-center text-lg"
          style={{ minWidth: 0 }}
        >
          发布
        </button>
      </div>
    </div>
  );
};

export default PublishEditPage;
