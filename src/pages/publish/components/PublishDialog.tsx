import React from 'react';
import { Dialog } from 'tdesign-mobile-react';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation('diary');
  return (
    <Dialog
      visible={visible}
      title={dialogType === 'publish' ? t('dialog.publishTitle') : t('dialog.draftTitle')}
      content={dialogType === 'publish' ? t('dialog.publishTip') : t('dialog.draftTip')}
      confirmBtn={{ content: t('dialog.confirm'), theme: 'primary' }}
      cancelBtn={{ content: t('dialog.cancel') }}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export default PublishDialog;
