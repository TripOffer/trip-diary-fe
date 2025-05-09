import React from 'react';
import styles from './SimpleSkeleton.module.scss';

interface SimpleSkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'rounded' | 'circle' | 'card'; // 不同形状的骨架屏
  animation?: 'pulse' | 'wave'; // 不同的动画效果
  brightness?: 'light' | 'normal' | 'dark'; // 亮度变化
}

const SimpleSkeleton: React.FC<SimpleSkeletonProps> = ({
  className = '',
  style,
  variant = 'default',
  animation = 'pulse',
  brightness = 'normal',
}) => {
  const variantClass = variant !== 'default' ? styles[variant] : '';
  const animationClass = animation === 'wave' ? styles.wave : '';
  const brightnessClass = brightness !== 'normal' ? styles[brightness] : '';

  return (
    <div
      className={`${styles.skeleton} ${styles.withTransition} ${variantClass} ${animationClass} ${brightnessClass} ${className}`}
      style={style}
    />
  );
};

export default SimpleSkeleton;
