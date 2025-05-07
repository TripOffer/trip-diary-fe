package com.tripOffer.diary

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast

class WebAppInterface(private val activity: Context) {
  @JavascriptInterface
  fun showToast(message: String) {
    Toast.makeText(activity, message, Toast.LENGTH_SHORT).show()
  }

  @JavascriptInterface
  fun setImmersiveStatusBar(enabled: Boolean) {
    if (activity is android.app.Activity) {
      StatusBarUtils.setImmersiveStatusBar(activity, enabled)
    }
  }

  @JavascriptInterface
  fun setStatusBarLightMode(isLight: Boolean) {
    if (activity is android.app.Activity) {
      StatusBarUtils.setStatusBarLightMode(activity, isLight)
    }
  }

  @JavascriptInterface
  fun setFullScreen(fullScreen: Boolean) {
    if (activity is android.app.Activity) {
      StatusBarUtils.setFullScreen(activity, fullScreen)
    }
  }

  @JavascriptInterface
  fun setStatusBarColor(colorString: String) {
    if (activity is android.app.Activity) {
      try {
        val color = android.graphics.Color.parseColor(colorString)
        StatusBarUtils.setStatusBarColor(activity, color)
      } catch (_: Exception) {}
    }
  }

  @JavascriptInterface
  fun getStatusBarHeight(): Int {
    return StatusBarUtils.getStatusBarHeight(activity)
  }
}