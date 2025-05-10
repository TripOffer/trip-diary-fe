import React from 'react';
import { Upload, UploadFile } from 'tdesign-mobile-react';

interface ImageUploadProps {
  uploadImage: File | null;
  loading: boolean;
  imageExts: string[];
  onChange: (files: UploadFile[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ uploadImage, loading, imageExts, onChange }) => {
  return (
    <>
      <Upload
        files={
          uploadImage
            ? [
                {
                  raw: uploadImage,
                  url: URL.createObjectURL(uploadImage),
                  name: uploadImage.name,
                },
              ]
            : []
        }
        max={100}
        accept={imageExts.map((e) => '.' + e).join(',')}
        onChange={onChange}
        disabled={loading}
      />
      <div className="text-xs text-gray-400 mt-2">支持{imageExts.join('/')}格式</div>
    </>
  );
};

export default ImageUpload;
