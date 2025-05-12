import React from 'react';
import { Dialog } from 'tdesign-mobile-react';

interface PublishDialogProps {
  visible: boolean;
  dialogType: 'publish' | 'archive';
  onConfirm: () => void;
  onClose: () => void;
}

const PublishDialog: React.FC<PublishDialogProps> = ({
  visible,
  dialogType,
  onConfirm,
  onClose,
}) => (
  <Dialog
    visible={visible}
    title={dialogType === 'publish' ? '确认发布？' : '存入草稿箱'}
    content={dialogType === 'publish' ? '发布后将公开展示，是否继续？' : '是否将内容存入草稿箱？'}
    confirmBtn={{ content: '确认', theme: 'primary' }}
    cancelBtn={{ content: '取消' }}
    onConfirm={onConfirm}
    onClose={onClose}
  />
);

export default PublishDialog;
