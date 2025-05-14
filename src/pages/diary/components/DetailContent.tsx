import React, { useState } from 'react';
import { Tag, Swiper } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { DiaryDetail } from '@/types/diary';
import styles from './DetailContent.module.scss';

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

  // 图片预览相关状态
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatContent = (text: string) => {
    if (!text) return [];
    // 按照段落分割文本
    return text.split('\n').filter((paragraph) => paragraph.trim() !== '');
  };

  const paragraphs = formatContent(content);

  // 处理资源URL，添加OSS前缀
  const getResourceUrl = (path: string) => {
    return path.startsWith('http') ? path : `${OSS_PREFIX}${path}`;
  };

  // 获取图库格式的图片数据
  const getGalleryImages = () => {
    if (!diaryData?.images || diaryData.images.length === 0) return [];
    return diaryData.images.map((image) => ({
      original: getResourceUrl(image),
      thumbnail: getResourceUrl(image),
      originalAlt: `${diaryTitle} - 图片`,
    }));
  };

  // 处理图片点击事件
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };

  // 关闭图片预览
  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  // 渲染图片轮播
  const renderImageSwiper = () => {
    if (!diaryData?.images || diaryData.images.length === 0) return null;

    // 轮播组件
    if (diaryData.images.length > 1) {
      return (
        <div className={styles.swiperContainer}>
          <Swiper
            height="320px"
            autoplay={true}
            interval={3000}
            duration={500}
            defaultCurrent={0}
            navigation={{ type: 'dots' }}
          >
            {diaryData.images.map((image, index) => (
              <Swiper.SwiperItem key={index}>
                <div className={styles.swiperImageWrapper} onClick={() => handleImageClick(index)}>
                  <img
                    src={getResourceUrl(image)}
                    alt={`${diaryTitle} - 图片${index + 1}`}
                    className={styles.swiperImage}
                  />
                </div>
              </Swiper.SwiperItem>
            ))}
          </Swiper>
        </div>
      );
    }

    // 单张图片
    return (
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper} onClick={() => handleImageClick(0)}>
          <img
            src={getResourceUrl(diaryData.images[0])}
            alt={`${diaryTitle} - 图片1`}
            className={styles.diaryImage}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      {isLoading ? (
        <div className={styles.placeholder}>加载中...</div>
      ) : (
        <>
          <div className={styles.diaryContent}>
            {/* 视频展示区域 */}
            {diaryData?.video && (
              <div className={styles.videoContainer}>
                <div className={styles.videoWrapper}>
                  <video
                    controls
                    poster={diaryData.thumbnail ? getResourceUrl(diaryData.thumbnail) : undefined}
                  >
                    <source src={getResourceUrl(diaryData.video)} type="video/mp4" />
                    您的浏览器不支持视频播放
                  </video>
                  <div className={styles.videoControls}></div>
                </div>
              </div>
            )}

            {/* 图片展示区域 - 使用轮播或单张显示 */}
            {diaryData?.images && diaryData.images.length > 0 && renderImageSwiper()}

            {/* 图片预览器 */}
            {showImageViewer && diaryData?.images && diaryData.images.length > 0 && (
              <div className={styles.galleryOverlay}>
                <div className={styles.galleryCloseButton} onClick={closeImageViewer}>
                  <Icon icon="mdi:close" width="24" height="24" />
                </div>
                <ImageGallery
                  items={getGalleryImages()}
                  startIndex={currentImageIndex}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showThumbnails={true}
                  lazyLoad={true}
                />
              </div>
            )}

            {/* 标题区域 */}
            <h2 className={styles.diaryTitle}>{diaryTitle}</h2>

            {/* 内容区域 */}
            <div className={styles.diaryText}>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : (
                <p>{content}</p>
              )}
            </div>

            {/* 底部信息区域 */}
            <div className={styles.diaryFooter}>
              <div className={styles.bottomMeta}>
                <div className={styles.locationTime}>
                  {diaryData?.tags && diaryData.tags.length > 0 && (
                    <div className={styles.location}>{diaryData.tags[0].name}</div>
                  )}
                  {diaryData?.publishedAt && (
                    <div className={styles.time}>
                      {formatDate(diaryData.publishedAt).split(' ')[0]}
                    </div>
                  )}
                  <div className={styles.place}>中国大陆</div>
                </div>
                <div className={styles.hashTags}>
                  {diaryData?.tags &&
                    diaryData.tags.map((tag, index) => (
                      <Tag
                        key={tag.id || index}
                        shape="mark"
                        theme={
                          index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'success' : 'warning'
                        }
                        variant="light"
                      >
                        #{tag.name}
                      </Tag>
                    ))}
                  <Tag shape="mark" theme="danger" variant="light">
                    #创作者新星计划
                  </Tag>
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
