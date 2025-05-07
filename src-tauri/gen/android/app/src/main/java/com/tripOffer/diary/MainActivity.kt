package com.tripOffer.diary

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView

class MainActivity : TauriActivity() {
  private var webViewRef: WebView? = null

  @SuppressLint("SetJavaScriptEnabled")
  override fun onWebViewCreate(webView: WebView) {
    super.onWebViewCreate(webView)
    webViewRef = webView
    WebViewHelper.setupWebView(this, webView)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
  }

  override fun onPostCreate(savedInstanceState: Bundle?) {
    super.onPostCreate(savedInstanceState)
    setStatusBarByTheme()
  }

  override fun onConfigurationChanged(newConfig: android.content.res.Configuration) {
    super.onConfigurationChanged(newConfig)
    setStatusBarByTheme()
    webViewRef?.let { WebViewHelper.updateWebViewBackgroundColor(this, it) }
  }

  private fun setStatusBarByTheme() {
    val isDarkTheme = (resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK) == android.content.res.Configuration.UI_MODE_NIGHT_YES
    StatusBarUtils.setImmersiveStatusBar(this, true)
    StatusBarUtils.setStatusBarLightMode(this, !isDarkTheme)
  }
}