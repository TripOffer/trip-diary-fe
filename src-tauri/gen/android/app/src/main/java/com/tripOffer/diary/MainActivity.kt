package com.tripOffer.diary

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView

class MainActivity : TauriActivity() {
  @SuppressLint("SetJavaScriptEnabled")
  override fun onWebViewCreate(webView: WebView) {
    super.onWebViewCreate(webView)
    mWebView = webView as RustWebView
    WebViewHelper.setupWebView(this, webView)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // 测试读取 BuildConfig 环境变量
  }
}