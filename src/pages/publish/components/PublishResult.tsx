import React from 'react';
import { Dialog, Result, Progress } from 'tdesign-mobile-react';

interface PublishResultProps {
  show: boolean;
  type: 'success' | 'error';
  msg: string;
  onClose?: () => void;
  uploading?: boolean;
  progress?: number;
}

const PublishResult: React.FC<PublishResultProps> = ({
  show,
  type,
  msg,
  onClose,
  uploading,
  progress,
}) => {
  return (
    <Dialog
      visible={show}
      closeOnOverlayClick={true}
      onClose={onClose}
      content={
        <>
          {uploading ? (
            <div className="mb-4">
              <Progress percentage={progress} theme="plump" />
              <div className="mt-8 text-center text-base text-gray-700">{msg}</div>
            </div>
          ) : (
            <Result theme={type} title={msg} className="mt-20" />
          )}
        </>
      }
      confirmBtn={null}
      cancelBtn={null}
    />
  );
};

export default PublishResult;
