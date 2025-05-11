interface Android {
  showToast(message: string): void;
  setImmersiveStatusBar(enabled: boolean): void;
  setStatusBarLightMode(isLight: boolean): void;
  setFullScreen(fullScreen: boolean): void;
  setStatusBarColor(colorString: string): void;
  getStatusBarHeight(): number;
  shareText(text: string, title: string): void;
  shareImage(imagePath: string, title: string): void;
  shareImageBase64(base64: string, fileName: string, title: string): void;
  saveImageToGallery(base64: string, fileName: string): boolean;
}

declare global {
  interface Window {
    Android: Android;
  }
}

export {};
