import React from 'react';
import { Upload, Toast } from 'tdesign-mobile-react';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';

interface ImageUploadProps {
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ fileList, setFileList }) => {
  // 选择图片回调
  const handleChange = (newFiles: UploadFile[]) => {
    if (newFiles.length > 100) {
      Toast({ message: '最多只能选择100张图片', duration: 2000 });
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
        已选择 {fileList.length} 张图片，最多100张
      </div>
    </div>
  );
};

export default ImageUpload;
