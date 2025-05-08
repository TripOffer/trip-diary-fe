package com.tripOffer.diary

import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import android.webkit.WebSettings
import android.webkit.WebView

object WebViewHelper {
  private fun setCustomUserAgent(context: Context, settings: WebSettings) {
    val envUserAgent = try {
      BuildConfig.VITE_APP_NAME
    } catch (e: Exception) {
      null
    }
    val envAppVersion = try {
      BuildConfig.VERSION_NAME
    } catch (e: Exception) {
      null
    }
    val originalUA = settings.userAgentString
    if (!envUserAgent.isNullOrBlank()) {
      val ua =
        if (!envAppVersion.isNullOrBlank()) "$originalUA $envUserAgent/$envAppVersion" else "$originalUA $envUserAgent"
      settings.userAgentString = ua
      Log.d("WebViewHelper", "User Agent set from env: $ua")
      return
    }
    try {
      val packageInfo: PackageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        context.packageManager.getPackageInfo(
          context.packageName,
          PackageManager.PackageInfoFlags.of(0)
        )
      } else {
        context.packageManager.getPackageInfo(context.packageName, 0)
      }
      val appVersion = packageInfo.versionName
      val customUserAgent = "$originalUA TripDiary/$appVersion"
      settings.userAgentString = customUserAgent
      Log.d("WebViewHelper", "User Agent set to: $customUserAgent")
    } catch (e: PackageManager.NameNotFoundException) {
      val customUserAgent = "$originalUA TripDiary/unknown"
      settings.userAgentString = customUserAgent
      Log.e("WebViewHelper", "Failed to get package info for User Agent", e)
    }
  }

  @SuppressLint("SetJavaScriptEnabled")
  fun setupWebView(context: Context, webView: WebView) {
    val nightModeFlags =
      context.resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK
    val color = when (nightModeFlags) {
      android.content.res.Configuration.UI_MODE_NIGHT_YES -> 0xFF1a1c1e.toInt()
      android.content.res.Configuration.UI_MODE_NIGHT_NO -> 0xFFFCFCFF.toInt()
      else -> 0xFFFCFCFF.toInt()
    }
    webView.setBackgroundColor(color)
    val settings: WebSettings = webView.settings
    settings.javaScriptEnabled = true
    settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
    setCustomUserAgent(context, settings)
    webView.addJavascriptInterface(WebAppInterface(context), "Android")
  }

  fun updateWebViewBackgroundColor(context: Context, webView: WebView) {
    val nightModeFlags =
      context.resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK
    val color = when (nightModeFlags) {
      android.content.res.Configuration.UI_MODE_NIGHT_YES -> 0xFF1a1c1e.toInt()
      android.content.res.Configuration.UI_MODE_NIGHT_NO -> 0xFFFCFCFF.toInt()
      else -> 0xFFFCFCFF.toInt()
    }
    webView.setBackgroundColor(color)
  }
}
