/**
 * Toast提示工具
 * 优先使用原生Android的showToast方法，如果不可用则回退到tdesign的Message组件
 */

import { Message } from 'tdesign-mobile-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastOptions = {
  duration?: number;
};

/**
 * 显示toast提示
 * @param content 提示内容
 * @param type 提示类型
 * @param options 选项，包括显示时长
 */
export const showToast = (
  content: string,
  type: ToastType = 'info',
  options: ToastOptions = { duration: 2000 },
) => {
  // 如果存在Android原生接口，则使用原生接口
  if (window.Android?.showToast) {
    window.Android.showToast(content);
    return;
  }

  // 否则使用tdesign的Message组件，并设置明确的主题
  switch (type) {
    case 'success':
      Message.success({
        content,
        duration: options.duration,
        theme: 'light' as any,
        closeBtn: false,
        icon: true,
      });
      break;
    case 'error':
      Message.error({
        content,
        duration: options.duration,
        theme: 'light' as any,
        closeBtn: false,
        icon: true,
      });
      break;
    case 'warning':
      Message.warning({
        content,
        duration: options.duration,
        theme: 'light' as any,
        closeBtn: false,
        icon: true,
      });
      break;
    case 'info':
    default:
      Message.info({
        content,
        duration: options.duration,
        theme: 'light' as any,
        closeBtn: false,
        icon: true,
      });
      break;
  }
};

export default {
  success: (content: string, options?: ToastOptions) => showToast(content, 'success', options),
  error: (content: string, options?: ToastOptions) => showToast(content, 'error', options),
  warning: (content: string, options?: ToastOptions) => showToast(content, 'warning', options),
  info: (content: string, options?: ToastOptions) => showToast(content, 'info', options),
};
