import { ClientEnv } from './clientEnv';

// 获取状态栏高度，自动适配 Android 客户端和 Web
export function getStatusBarHeight(): number {
  if (typeof window === 'undefined') return 0;
  if (ClientEnv.isAndroidClient()) {
    if (window.Android && typeof window.Android.getStatusBarHeight === 'function') {
      return window.Android.getStatusBarHeight() / window.devicePixelRatio;
    }
  }
  return 0;
}
