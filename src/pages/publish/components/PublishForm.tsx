import React from 'react';
import { Button, UploadFile } from 'tdesign-mobile-react';

interface PublishFormProps {
  type: 'image' | 'video';
  title: string;
  content: string;
  uploadImage: File | null;
  loading: boolean;
  imageExts: string[];
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onUpload: (files: UploadFile[]) => void;
  onShowCoverSelector?: () => void;
  showCoverSelectorBtn?: boolean;
  file?: File;
  videoDuration?: number;
  coverTime?: number;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  children?: React.ReactNode;
}

const PublishForm: React.FC<PublishFormProps> = ({
  type,
  title,
  content,
  uploadImage,
  loading,
  imageExts,
  onTitleChange,
  onContentChange,
  onUpload,
  onShowCoverSelector,
  showCoverSelectorBtn = false,
  file,
  videoDuration,
  coverTime,
  onLoadedMetadata,
  children,
}) => {
  return (
    <div className="mb-4">
      <input
        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="请输入标题"
        maxLength={50}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-base min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="请输入正文内容"
        maxLength={2000}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      {type === 'image' ? (
        children
      ) : file ? (
        <>
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full rounded-lg mb-2"
            style={{ maxHeight: 320 }}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400">当前封面：</span>
            {uploadImage && (
              <img
                src={URL.createObjectURL(uploadImage)}
                alt="封面"
                className="w-16 h-16 object-cover rounded border"
              />
            )}
            {showCoverSelectorBtn && (
              <Button
                size="small"
                variant="outline"
                onClick={onShowCoverSelector}
                disabled={loading || !file}
              >
                选择封面
              </Button>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            仅支持mp4/webm格式，后续可进行压缩和首帧提取
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PublishForm;
