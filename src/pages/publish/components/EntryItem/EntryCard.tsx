import React, { useState } from 'react';
import { Collapse, CollapsePanel, Tag } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import EntryDetail from './EntryDetail';
import EntryActions from './EntryActions';
import { Image } from 'tdesign-mobile-react';

const statusMap = {
  pending: { theme: 'warning', text: '待审核' },
  approved: { theme: 'success', text: '已通过' },
  rejected: { theme: 'danger', text: '已拒绝' },
};
type TagTheme = 'warning' | 'success' | 'danger' | 'default' | 'primary';
type StatusKey = keyof typeof statusMap;

const getStatusInfo = (status: any): { theme: TagTheme; text: string } => {
  if (!status) return { theme: 'default', text: '-' };
  const key = String(status).toLowerCase() as StatusKey;
  if (key in statusMap) return statusMap[key] as { theme: TagTheme; text: string };
  return { theme: 'default', text: status };
};

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

const EntryCard = ({ item, onEdit, onDelete, onPublish, onUnpublish, canUnpublish }: any) => {
  const [collapse, setCollapse] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  return (
    <div className="mb-4 shadow-md rounded-lg bg-white overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <Image
          className="w-full h-40 object-cover"
          src={item.thumbnail ? OSS_PREFIX + item.thumbnail : '/assets/default-thumbnail.png'}
          fit="cover"
          loading={
            <div className="flex items-center justify-center h-40 bg-gray-100">
              <span className="text-gray-400">加载中...</span>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-40 bg-gray-100">
              <span className="text-gray-400">加载失败</span>
            </div>
          }
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Tag theme={getStatusInfo(item.status).theme} size="small" className="opacity-90">
            {getStatusInfo(item.status).text}
          </Tag>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-medium text-base truncate mr-2">{item.title}</h3>
            {item.parentId && (
              <Tag theme="primary" size="small" className="opacity-90">
                副本
              </Tag>
            )}
          </div>
          <button
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActionVisible(true);
            }}
          >
            <Icon icon="mdi:dots-vertical" width={20} />
          </button>
        </div>

        <div className="text-xs text-gray-500 mb-3">
          {item.publishedAt ? new Date(item.publishedAt).toLocaleString() : '未发布'}
        </div>

        <Collapse
          value={collapse ? [1] : []}
          onChange={(v) => setCollapse(!!v.length)}
          className="border-t border-gray-100 pt-2"
        >
          <CollapsePanel value={1} header={<span className="text-sm font-medium">详情</span>}>
            <EntryDetail
              viewCount={item.viewCount}
              likeCount={item.likeCount}
              favoriteCount={item.favoriteCount}
              commentCount={item.commentCount}
              shareCount={item.shareCount}
            />
            {String(item.status).toLowerCase() === 'rejected' && item.rejectedReason && (
              <div className="mt-3 p-3 bg-red-50 rounded-md text-xs text-red-500 border border-red-100">
                <div className="font-medium mb-1">拒绝原因：</div>
                <div>{item.rejectedReason}</div>
              </div>
            )}
          </CollapsePanel>
        </Collapse>
      </div>

      <EntryActions
        visible={actionVisible}
        onClose={() => setActionVisible(false)}
        onEdit={() => onEdit(item.id)}
        onDelete={() => onDelete(item.id)}
        onPublish={() => onPublish(item.id)}
        canPublish={!item.published}
        onUnpublish={onUnpublish ? () => onUnpublish(item.id) : undefined}
        canUnpublish={typeof canUnpublish === 'boolean' ? canUnpublish : !!item.published}
      />
    </div>
  );
};

export default EntryCard;
