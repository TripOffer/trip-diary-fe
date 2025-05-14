import React from 'react';
import { ActionSheet } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

interface EntryActionsProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  canPublish: boolean;
  onUnpublish?: () => void; // 新增取消发布回调
  canUnpublish?: boolean; // 新增取消发布显示条件
}

const EntryActions: React.FC<EntryActionsProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  onPublish,
  canPublish,
  onUnpublish,
  canUnpublish,
}) => {
  const { t } = useTranslation('diary');
  const items = [
    {
      label: t('edit', { defaultValue: '编辑' }),
      icon: <Icon icon="mdi:pencil-outline" width={22} />,
      description: t('editDesc', { defaultValue: '修改日记内容' }),
      action: onEdit,
    },
    {
      label: t('delete', { defaultValue: '删除' }),
      icon: <Icon icon="mdi:delete-outline" width={22} />,
      description: t('deleteDesc', { defaultValue: '彻底删除该日记' }),
      action: onDelete,
      theme: 'danger',
    },
  ];
  if (canPublish) {
    items.push({
      label: t('publish', { defaultValue: '发布' }),
      icon: <Icon icon="mdi:send-outline" width={22} />,
      description: t('publishDesc', { defaultValue: '公开发布到广场' }),
      action: onPublish,
    });
  }
  if (canUnpublish && onUnpublish) {
    items.push({
      label: t('unpublish', { defaultValue: '取消发布' }),
      icon: <Icon icon="mdi:undo-variant" width={22} />,
      description: t('unpublishDesc', { defaultValue: '将日记从广场撤回' }),
      action: onUnpublish,
    });
  }
  return (
    <ActionSheet
      visible={visible}
      theme="list"
      items={items.map((a) => ({
        label: a.label,
        icon: a.icon,
        description: a.description,
        theme: a.theme,
      }))}
      onSelected={(_, idx) => {
        items[idx]?.action();
        onClose();
      }}
      onClose={onClose}
      showCancel
    />
  );
};

export default EntryActions;
