import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Slider, Button, Message } from 'tdesign-mobile-react';
import styles from './index.module.scss';

// 主题色选项
const themeOptions = [
  { value: '#0052d9', label: '默认蓝' },
  { value: '#0a7b31', label: '自然绿' },
  { value: '#d54941', label: '活力红' },
  { value: '#9c27b0', label: '典雅紫' },
  { value: '#ff9800', label: '阳光橙' },
];

// 字体大小选项
const fontSizeOptions = [
  { value: 'small', label: '小', size: 0.9 },
  { value: 'normal', label: '标准', size: 1 },
  { value: 'large', label: '大', size: 1.1 },
  { value: 'x-large', label: '超大', size: 1.2 },
];

const PreferencePage: React.FC = () => {
  const navigate = useNavigate();

  // 状态
  const [themeColor, setThemeColor] = useState<string>(
    localStorage.getItem('theme-color') || '#0052d9',
  );
  const [fontSize, setFontSize] = useState<string>(localStorage.getItem('font-size') || 'normal');
  const [fontSliderValue, setFontSliderValue] = useState<number>(
    fontSizeOptions.findIndex((option) => option.value === fontSize),
  );

  // 应用主题色
  useEffect(() => {
    // 设置主色
    document.documentElement.style.setProperty('--td-primary-color', themeColor);
    localStorage.setItem('theme-color', themeColor);

    const rgbColor = hexToRgb(themeColor);
    if (rgbColor) {
      // 设置活跃状态颜色
      const darkerColor = adjustBrightness(themeColor, -30);
      document.documentElement.style.setProperty('--td-primary-color-active', darkerColor);

      // 设置悬停颜色
      const lighterColor = adjustBrightness(themeColor, 20);
      document.documentElement.style.setProperty('--td-primary-color-hover', lighterColor);

      // 设置禁用状态颜色
      document.documentElement.style.setProperty(
        '--td-primary-color-disabled',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.4)`,
      );

      // 设置浅色背景
      document.documentElement.style.setProperty(
        '--td-primary-color-light',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`,
      );

      // 设置浅色背景悬停
      document.documentElement.style.setProperty(
        '--td-primary-color-light-hover',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`,
      );

      // 同步设置TDesign品牌相关颜色
      document.documentElement.style.setProperty('--td-brand-color', themeColor);
      document.documentElement.style.setProperty('--td-brand-color-hover', lighterColor);
      document.documentElement.style.setProperty('--td-brand-color-active', darkerColor);
      document.documentElement.style.setProperty('--td-brand-color-focus', darkerColor);
      document.documentElement.style.setProperty(
        '--td-brand-color-disabled',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.4)`,
      );
      document.documentElement.style.setProperty(
        '--td-brand-color-light',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`,
      );
      document.documentElement.style.setProperty(
        '--td-brand-color-light-hover',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`,
      );

      // 按钮颜色
      document.documentElement.style.setProperty('--td-button-primary-bg-color', themeColor);
      document.documentElement.style.setProperty(
        '--td-button-primary-active-bg-color',
        darkerColor,
      );
      document.documentElement.style.setProperty(
        '--td-button-primary-disabled-bg-color',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.4)`,
      );
    }
  }, [themeColor]);

  // 颜色转换辅助函数: HEX颜色转RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  // 调整颜色亮度
  function adjustBrightness(color: string, amount: number): string {
    const hex = color.replace('#', '');

    // 转为RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // 调整亮度
    const newR = Math.max(0, Math.min(255, r + amount));
    const newG = Math.max(0, Math.min(255, g + amount));
    const newB = Math.max(0, Math.min(255, b + amount));

    // 转回HEX
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  // 应用字体大小
  useEffect(() => {
    const fontSizeOption = fontSizeOptions.find((option) => option.value === fontSize);
    if (fontSizeOption) {
      document.documentElement.style.setProperty('--font-size-ratio', String(fontSizeOption.size));
      localStorage.setItem('font-size', fontSize);
    }
  }, [fontSize]);

  // 处理滑块变化
  const handleSliderChange = (value: number | number[]) => {
    const newValue = typeof value === 'number' ? value : value[0];
    setFontSliderValue(newValue);
    setFontSize(fontSizeOptions[newValue].value);
  };

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 渲染主题色选择器
  const renderThemeSelector = () => {
    return (
      <div className={styles.themeSelector}>
        {themeOptions.map((option) => (
          <div
            key={option.value}
            className={`${styles.themeOption} ${
              themeColor === option.value ? styles.selected : ''
            }`}
            onClick={() => setThemeColor(option.value)}
          >
            <div className={styles.colorCircle} style={{ backgroundColor: option.value }}>
              {themeColor === option.value && (
                <Icon icon="mdi:check" className={styles.checkIcon} />
              )}
            </div>
            <div className={styles.themeLabel}>{option.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.preferencePage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>内容偏好设置</h1>
        <div className={styles.dummySpace}></div>
      </div>

      <div className={styles.content}>
        {/* 主题色部分 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Icon icon="mdi:palette-outline" className={styles.sectionIcon} />
            <span>主题色</span>
          </div>
          <div className={styles.sectionContent}>{renderThemeSelector()}</div>
        </div>

        {/* 字体大小部分 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Icon icon="mdi:format-size" className={styles.sectionIcon} />
            <span>字体大小</span>
          </div>
          <div className={styles.sectionContent}>
            <div
              className={styles.fontSizeDemo}
              style={{ fontSize: `${1 + (fontSliderValue - 1) * 0.1}rem` }}
            >
              字体大小预览
            </div>
            <div className={styles.fontSizeSlider}>
              <div className={styles.sliderLabel}>小</div>
              <Slider
                className={styles.slider}
                value={fontSliderValue}
                min={0}
                max={fontSizeOptions.length - 1}
                step={1}
                onChange={handleSliderChange}
              />
              <div className={styles.sliderLabel}>大</div>
            </div>
            <div className={styles.fontSizeLabels}>
              {fontSizeOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`${styles.fontSizeLabel} ${index === fontSliderValue ? styles.activeLabel : ''}`}
                  style={{ left: `${(index / (fontSizeOptions.length - 1)) * 100}%` }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 重置按钮 */}
        <div className={styles.resetSection}>
          <Button
            className={styles.resetButton}
            variant="outline"
            onClick={() => {
              // 重置主题色
              setThemeColor('#0052d9');

              // 重置字体大小
              setFontSize('normal');
              setFontSliderValue(1);

              // 显示重置成功提示
              Message.success('已恢复默认设置');
            }}
          >
            恢复默认设置
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencePage;
