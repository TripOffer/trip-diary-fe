import React from 'react';
import styles from './DetailContent.module.scss';

interface DiaryDetail {
  id: string;
  title: string;
  content: string;
  images?: string[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  viewCount: number;
  author: {
    id: string | number;
    name: string;
    avatar: string;
  };
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  isLiked?: boolean;
  isFavorite?: boolean;
  tags?: Array<{ id: string; name: string }>;
  isFollowedAuthor?: boolean;
  thumbnailMeta?: {
    width: number;
    height: number;
  };
}

interface DetailContentProps {
  diaryData: DiaryDetail | null;
  isLoading: boolean;
  OSS_PREFIX: string;
  formatDate: (dateString: string) => string;
}

const DetailContent: React.FC<DetailContentProps> = ({
  diaryData,
  isLoading,
  OSS_PREFIX,
  formatDate,
}) => {
  const diaryTitle = diaryData?.title || '';
  const content = diaryData?.content || '';

  return (
    <div className={styles.content}>
      {isLoading ? (
        <div className={styles.placeholder}>加载中...</div>
      ) : (
        <>
          <div className={styles.diaryContent}>
            {/* 图片展示区域 */}
            {diaryData?.images && diaryData.images.length > 0 && (
              <div className={styles.imageContainer}>
                {diaryData.images.map((image, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <img
                      src={image.startsWith('http') ? image : `${OSS_PREFIX}${image}`}
                      alt={`${diaryTitle} - 图片${index + 1}`}
                      className={styles.diaryImage}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 标题区域 */}
            <h2 className={styles.diaryTitle}>{diaryTitle}</h2>

            {/* 内容区域 */}
            <div className={styles.diaryText}>
              <p>{content}</p>
            </div>

            {/* 底部信息区域 */}
            <div className={styles.diaryFooter}>
              <div className={styles.bottomMeta}>
                <div className={styles.locationTime}>
                  <div className={styles.location}>
                    {diaryData?.tags && diaryData.tags.length > 0 ? diaryData.tags[0].name : ''}
                  </div>
                  <div className={styles.time}>
                    {diaryData?.publishedAt ? formatDate(diaryData.publishedAt).split(' ')[0] : ''}
                  </div>
                  <div className={styles.place}>福建</div>
                </div>
                <div className={styles.hashTags}>
                  {diaryData?.tags && diaryData.tags.length > 0 && (
                    <span className={styles.tag}>#{diaryData.tags[0].name} #人生的意义</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailContent;
