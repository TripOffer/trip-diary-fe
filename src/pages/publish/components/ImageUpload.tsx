import React from 'react';
import { Upload, Toast } from 'tdesign-mobile-react';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import { useTranslation } from 'react-i18next';

interface ImageUploadProps {
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ fileList, setFileList }) => {
  const { t } = useTranslation('diary');

  // 选择图片回调
  const handleChange = (newFiles: UploadFile[]) => {
    if (newFiles.length > 100) {
      Toast({ message: t('image.max'), duration: 2000 });
      setFileList(newFiles.slice(0, 100));
      return;
    }
    setFileList(newFiles);
  };

  return (
    <div>
      <Upload
        files={fileList}
        onChange={handleChange}
        max={100}
        multiple
        accept="image/*"
        autoUpload={false}
        gridConfig={{ column: 4 }}
        requestMethod={() => Promise.resolve({ status: 'success', response: {} })}
        onRemove={({ index }) => {
          if (typeof index === 'number') {
            const newList = [...fileList];
            newList.splice(index, 1);
            setFileList(newList);
          }
        }}
      />
      <div className="mt-4 text-sm text-gray-500 text-center">
        {t('image.selected', { count: fileList.length })}
      </div>
    </div>
  );
};

export default ImageUpload;
