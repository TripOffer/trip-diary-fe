import { useEffect, useState } from 'react';

/**
 * 用于提取视频首帧为图片的 Hook
 * @param file 视频文件
 * @returns { coverImage, loading }
 */
export function useVideoCover(file?: File) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setCoverImage(null);
      return;
    }
    setLoading(true);
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.currentTime = 0;
    video.addEventListener(
      'loadeddata',
      () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) {
                const imageFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                  type: 'image/jpeg',
                });
                setCoverImage(imageFile);
              }
              setLoading(false);
              URL.revokeObjectURL(video.src);
            }, 'image/jpeg');
          } else {
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
        }
      },
      { once: true },
    );
    video.addEventListener(
      'error',
      () => {
        setLoading(false);
      },
      { once: true },
    );
  }, [file]);

  return { coverImage, loading };
}
