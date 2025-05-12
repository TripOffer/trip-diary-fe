import React from 'react';
import EntryCard from './EntryItem/EntryCard';

interface EntryItemProps {
  item: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onUnpublish?: (id: string) => void;
  canUnpublish?: boolean;
}

const EntryItem: React.FC<EntryItemProps> = ({
  item,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  canUnpublish,
}) => {
  return (
    <EntryCard
      item={item}
      onEdit={onEdit}
      onDelete={onDelete}
      onPublish={onPublish}
      onUnpublish={onUnpublish}
      canUnpublish={canUnpublish}
    />
  );
};

export default EntryItem;
