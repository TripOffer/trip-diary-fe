// src/utils/clientEnv.ts

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Trip Diary';
const APP_NAME_EN_US = import.meta.env.VITE_APP_NAME_EN_US || 'Trip Diary';
const APP_NAME_ZH_CN = import.meta.env.VITE_APP_NAME_ZH_CN || '旅行日记';

const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

class ClientEnvUtils {
  private ua: string;

  constructor() {
    this.ua = navigator.userAgent;
  }

  /** 获取当前语言，优先读取 localStorage 的 lang，否则用浏览器语言 */
  private getCurrentLang(): string {
    const lang = localStorage.getItem('lang');
    if (lang) return lang;
    return navigator.language || navigator.languages?.[0] || 'en';
  }

  /** 获取应用名称，根据用户语言自动选择（支持 localStorage 的 lang，支持 en-US/zh-CN 等） */
  getAppName(): string {
    const lang = this.getCurrentLang().toLowerCase();
    if (lang.startsWith('zh')) {
      return APP_NAME_ZH_CN;
    }
    return APP_NAME_EN_US;
  }

  /** 获取英文应用名称 */
  getAppNameEnUS(): string {
    return APP_NAME_EN_US;
  }

  /** 获取中文应用名称 */
  getAppNameZhCN(): string {
    return APP_NAME_ZH_CN;
  }

  /** 获取应用版本 */
  getAppVersion(): string {
    return APP_VERSION;
  }

  /** 判断是否为安卓 WebView 客户端 */
  isAndroidClient(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.Android !== 'undefined' &&
      /Android/i.test(this.ua) &&
      new RegExp(`${APP_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/\\d+\\.\\d+\\.\\d+`).test(
        this.ua,
      )
    );
  }

  /** 判断是否为 PC 浏览器 */
  isPCBrowser(): boolean {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(this.ua);
    return !isMobile && typeof window.Android === 'undefined' && !this.ua.includes(APP_NAME);
  }

  /** 判断是否为移动端（安卓或 iOS） */
  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(this.ua);
  }

  /** 判断是否为安卓系统 */
  isAndroid(): boolean {
    return /Android/i.test(this.ua);
  }

  /** 判断是否为 iOS 系统 */
  isIOS(): boolean {
    return /iPhone|iPad|iPod/i.test(this.ua);
  }
}

export const ClientEnv = new ClientEnvUtils();
