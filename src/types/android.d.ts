interface Android {
  showToast(message: string): void;
  setImmersiveStatusBar(enabled: boolean): void;
  setStatusBarLightMode(isLight: boolean): void;
  setFullScreen(fullScreen: boolean): void;
  setStatusBarColor(colorString: string): void;
  getStatusBarHeight(): number;
}

declare global {
  interface Window {
    Android: Android;
  }
}

export {};
