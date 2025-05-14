import React from 'react';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import CoverSelector from './CoverSelector';
import { useTranslation } from 'react-i18next';

interface VideoSectionProps {
  videoPreviewUrl: string | null;
  coverImage: UploadFile | null;
  setCoverImage: (file: UploadFile | null) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoPreviewUrl,
  coverImage,
  setCoverImage,
}) => {
  const { t } = useTranslation('diary');
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{t('video.preview')}</h3>
      {videoPreviewUrl && (
        <video
          controls
          src={videoPreviewUrl}
          className="w-full rounded-lg mb-4"
          style={{ maxHeight: '300px' }}
        />
      )}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{t('video.setCover')}</h3>
      <CoverSelector currentCover={coverImage} onCoverChange={setCoverImage} />
    </div>
  );
};

export default VideoSection;
