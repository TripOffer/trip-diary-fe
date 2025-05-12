package com.tripOffer.diary

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.webkit.WebView
import android.widget.Toast

class MainActivity : TauriActivity() {
  private var webViewRef: WebView? = null
  private var lastBackPressedTime: Long = 0
  private val doubleBackPressInterval = 2000L // 2秒内双击返回

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

  override fun onBackPressed() {
    webViewRef?.let { webView ->
      if (webView.canGoBack()) {
        webView.goBack()
        return
      }
    }
    val currentTime = System.currentTimeMillis()
    if (currentTime - lastBackPressedTime < doubleBackPressInterval) {
      super.onBackPressed()
    } else {
      lastBackPressedTime = currentTime
      Toast.makeText(this, "再按一次返回键退出应用", Toast.LENGTH_SHORT).show()
    }
  }

  private fun setStatusBarByTheme() {
    val isDarkTheme = (resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK) == android.content.res.Configuration.UI_MODE_NIGHT_YES
    StatusBarUtils.setImmersiveStatusBar(this, true)
    StatusBarUtils.setStatusBarLightMode(this, !isDarkTheme)
  }
}