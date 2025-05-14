import React, { useState, useEffect } from 'react';
import { Tag, Swiper, Loading } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { DiaryDetail } from '@/types/diary';
import styles from './DetailContent.module.scss';
import Api from '@/service/api';
import type { ImageMetaRes } from '@/service/api/oss/types';
import { useTranslation } from 'react-i18next';

interface DetailContentProps {
  diaryData: DiaryDetail | null;
  isLoading: boolean;
  OSS_PREFIX: string;
  formatDate: (dateString: string) => string;
}

// 目标缩放尺寸
const TARGET_WIDTH = 1280;

const DetailContent: React.FC<DetailContentProps> = ({
  diaryData,
  isLoading,
  OSS_PREFIX,
  formatDate,
}) => {
  const { t } = useTranslation('diary');
  const diaryTitle = diaryData?.title || '';
  const content = diaryData?.content || '';

  // 图片预览相关状态
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 图片元数据状态
  const [imagesMeta, setImagesMeta] = useState<Record<string, ImageMetaRes>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesLoadError, setImagesLoadError] = useState<string | null>(null);

  useEffect(() => {
    // 获取图片元数据
    const fetchImagesMeta = async () => {
      if (!diaryData?.images || diaryData.images.length === 0) {
        setImagesLoaded(true);
        return;
      }

      setImagesLoaded(false);
      setImagesLoadError(null);

      try {
        const metaPromises = diaryData.images.map(async (imagePath) => {
          // 使用图片路径作为key
          try {
            const response = await Api.ossApi.getImageMeta({ key: imagePath });
            console.log(`获取图片元数据成功: ${imagePath}`, response.data);
            return { key: imagePath, meta: response.data };
          } catch (err) {
            console.error(`获取图片 ${imagePath} 元数据失败:`, err);
            return null;
          }
        });

        const metaResults = await Promise.all(metaPromises);
        const metaMap: Record<string, ImageMetaRes> = {};

        metaResults.forEach((result) => {
          if (result && result.key && result.meta) {
            metaMap[result.key] = result.meta;
          }
        });

        // 验证是否成功获取元数据
        const successCount = Object.keys(metaMap).length;
        const totalCount = diaryData.images.length;
        console.log(`成功获取 ${successCount}/${totalCount} 张图片的元数据`);

        setImagesMeta(metaMap);
        setImagesLoaded(true);
      } catch (error) {
        console.error('批量获取图片元数据失败:', error);
        setImagesLoadError('获取图片信息失败，将显示原始图片');
        setImagesLoaded(true);
      }
    };

    if (diaryData?.images && diaryData.images.length > 0) {
      fetchImagesMeta();
    } else {
      setImagesLoaded(true);
    }
  }, [diaryData?.images]);

  const formatContent = (text: string) => {
    if (!text) return [];
    // 按照段落分割文本
    return text.split('\n').filter((paragraph) => paragraph.trim() !== '');
  };

  const paragraphs = formatContent(content);

  // 处理资源URL，添加OSS前缀并应用动态切图
  const getResourceUrl = (path: string, isPreview = false) => {
    if (path.startsWith('http')) return path;

    const baseUrl = `${OSS_PREFIX}${path}`;
    const meta = imagesMeta[path];

    // 如果是预览，或者没有元数据，返回原图
    if (isPreview || !meta) {
      return baseUrl;
    }

    // 根据元数据计算合适的缩放尺寸
    if (meta.width > TARGET_WIDTH) {
      const ratio = meta.width / TARGET_WIDTH;
      const targetHeight = Math.round(meta.height / ratio);

      try {
        const ossUrl = OSS_PREFIX.endsWith('/') ? OSS_PREFIX.slice(0, -1) : OSS_PREFIX;
        const processedUrl = `${ossUrl}/${path}?action=resize!${TARGET_WIDTH},${targetHeight},2&format=webp`;
        console.log(
          `原图: ${meta.width}x${meta.height} -> 缩放为: ${TARGET_WIDTH}x${targetHeight}`,
          processedUrl,
        );
        return processedUrl;
      } catch (err) {
        console.error('生成缩略图URL失败，使用原图', err);
        return baseUrl;
      }
    }

    return baseUrl;
  };

  // 图片加载错误时的处理函数
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    originalPath: string,
  ) => {
    console.warn('图片加载失败，尝试回退到原图', e);
    // 直接将src设置为原始图片URL
    const originalUrl = `${OSS_PREFIX}${originalPath}`;
    if (e.currentTarget.src !== originalUrl) {
      console.log('回退到原图:', originalUrl);
      e.currentTarget.src = originalUrl;
    }
  };

  // 处理ImageGallery组件的图片加载错误
  const handleGalleryImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('画廊图片加载失败，尝试回退到原图', event);
    const img = event.currentTarget;
    // 检查是否包含图片处理参数
    if (img.src.includes('?action=resize')) {
      // 从URL中提取原始路径(去掉查询参数)
      const originalUrl = img.src.split('?')[0];
      console.log('回退到原图:', originalUrl);
      img.src = originalUrl;
    }
    return true; // 返回true表示已处理错误
  };

  // 获取图库格式的图片数据
  const getGalleryImages = () => {
    if (!diaryData?.images || diaryData.images.length === 0) return [];
    return diaryData.images.map((image) => ({
      original: getResourceUrl(image, true), // 预览使用原图
      thumbnail: getResourceUrl(image), // 使用缩放后的图片作为缩略图
      originalAlt: `${diaryTitle} - 图片`,
      originalTitle: diaryTitle,
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

  // 渲染图片加载占位符
  const renderImagePlaceholder = () => {
    return (
      <div className={styles.imagePlaceholder}>
        <Loading />
        <div className={styles.loadingText}>加载图片中...</div>
      </div>
    );
  };

  // 渲染图片轮播
  const renderImageSwiper = () => {
    if (!diaryData?.images || diaryData.images.length === 0) return null;

    // 如果元数据还在加载中，显示占位符
    if (!imagesLoaded && !imagesLoadError) {
      return renderImagePlaceholder();
    }

    if (imagesLoadError) {
      console.warn(imagesLoadError);
    }

    // 启用动态切图
    const useOriginalImages = false; // 设置为false，启用动态切图功能

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
                    src={useOriginalImages ? `${OSS_PREFIX}${image}` : getResourceUrl(image)}
                    alt={`${diaryTitle} - ${t('image', { ns: 'diary', defaultValue: '图片' })}${index + 1}`}
                    className={styles.swiperImage}
                    loading="lazy"
                    onError={(e) => handleImageError(e, image)}
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
            src={
              useOriginalImages
                ? `${OSS_PREFIX}${diaryData.images[0]}`
                : getResourceUrl(diaryData.images[0])
            }
            alt={`${diaryTitle} - ${t('image', { ns: 'diary', defaultValue: '图片' })}1`}
            className={styles.diaryImage}
            loading="lazy"
            onError={(e) => diaryData?.images?.[0] && handleImageError(e, diaryData.images[0])}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      {isLoading ? (
        <div className={styles.placeholder}>
          {t('loading', { ns: 'diary', defaultValue: '加载中...' })}
        </div>
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
                    {t('videoNotSupported', {
                      ns: 'diary',
                      defaultValue: '您的浏览器不支持视频播放',
                    })}
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
                  onImageError={handleGalleryImageError}
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
                  <div className={styles.place}>
                    {t('mainlandChina', { ns: 'diary', defaultValue: '中国大陆' })}
                  </div>
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
                    #{t('creatorStarPlan', { ns: 'diary', defaultValue: '创作者新星计划' })}
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
