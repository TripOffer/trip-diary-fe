import React, { useRef, useEffect, useState } from 'react';
import { Button, Message, Slider, Popup } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';

interface VideoCoverSelectorProps {
  file: File;
  videoDuration: number;
  coverTime: number;
  loading: boolean;
  onSetCover: (file: File) => void;
  onClose: () => void;
  onChangeCoverTime?: (t: number) => void;
}

const VideoCoverSelector: React.FC<VideoCoverSelectorProps> = ({
  file,
  videoDuration,
  coverTime,
  loading,
  onSetCover,
  onClose,
  onChangeCoverTime,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [localCoverTime, setLocalCoverTime] = useState(coverTime);

  useEffect(() => {
    setLocalCoverTime(coverTime);
  }, [coverTime]);

  // 拖动滑块时，只本地更新，不同步父组件
  const handleSliderChange = (v: number | number[]) => {
    const val = Array.isArray(v) ? v[0] : v;
    setLocalCoverTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  // 松手时才同步到父组件
  const handleSliderChangeEnd = () => {
    onChangeCoverTime?.(localCoverTime);
  };

  // tdesign Slider label 需接收 { value } 参数，value 可能为 number | number[] | undefined
  const sliderLabel = ({ value }: { value: number | number[] | undefined }) => {
    let v = 0;
    if (typeof value === 'number') v = value;
    else if (Array.isArray(value) && typeof value[0] === 'number') v = value[0];
    return `${v.toFixed(1)}s`;
  };

  // 视频 seeked 后，绘制当前帧到 canvas
  const handleSeeked = () => {
    if (videoRef.current && canvasRef.current) {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.drawImage(v, 0, 0, c.width, c.height);
      }
    }
  };

  // 设为封面：canvas 转 file，回调 onSetCover
  const handleSetCover = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const fileName = file.name.replace(/\.[^.]+$/, '_cover.jpg');
        const imageFile = new File([blob], fileName, { type: 'image/jpeg' });
        onSetCover(imageFile);
        Message.success('封面已更新');
      }
    }, 'image/jpeg');
  };

  useEffect(() => {
    // 打开时自动 seek 到当前封面时间
    if (videoRef.current) {
      videoRef.current.currentTime = coverTime;
    }
  }, [file, coverTime]);

  return (
    <Popup
      visible={true}
      placement="center"
      onVisibleChange={(v) => {
        if (!v) onClose();
      }}
      style={{ width: 340, maxWidth: '95vw', padding: 0, background: 'transparent' }}
      showOverlay
    >
      <div className="bg-white rounded-lg p-4 w-80 max-w-full relative">
        <Icon
          icon="mdi:close-circle"
          className="absolute right-2 top-2 cursor-pointer z-10"
          width={28}
          height={28}
          color="#999"
          onClick={onClose}
        />
        <h3 className="text-base font-bold mb-2">选择视频封面</h3>
        <video
          ref={videoRef}
          src={URL.createObjectURL(file)}
          style={{ display: 'none' }}
          onSeeked={handleSeeked}
        />
        <canvas
          ref={canvasRef}
          className="w-full rounded border mb-2"
          style={{ aspectRatio: '16/9', background: '#eee' }}
        />
        <div onMouseUp={handleSliderChangeEnd} onTouchEnd={handleSliderChangeEnd}>
          <Slider
            value={localCoverTime}
            min={0}
            max={videoDuration}
            step={0.1}
            showExtremeValue
            label={sliderLabel}
            theme="capsule"
            onChange={handleSliderChange}
            className="mb-2"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0s</span>
          <span>{videoDuration.toFixed(1)}s</span>
        </div>
        <div className="flex gap-2">
          <Button size="small" onClick={handleSetCover} disabled={loading}>
            设为封面
          </Button>
          <Button size="small" variant="outline" onClick={onClose}>
            取消
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default VideoCoverSelector;
