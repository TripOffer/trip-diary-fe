package com.tripOffer.diary

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast
import androidx.core.graphics.toColorInt

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
        val color = colorString.toColorInt()
        StatusBarUtils.setStatusBarColor(activity, color)
      } catch (_: Exception) {
      }
    }
  }

  @JavascriptInterface
  fun getStatusBarHeight(): Int {
    return StatusBarUtils.getStatusBarHeight(activity)
  }

  @JavascriptInterface
  fun shareText(text: String, title: String) {
    if (activity is android.app.Activity) {
      val intent = android.content.Intent().apply {
        action = android.content.Intent.ACTION_SEND
        putExtra(android.content.Intent.EXTRA_TEXT, text)
        type = "text/plain"
      }
      val chooser = android.content.Intent.createChooser(intent, title)
      activity.startActivity(chooser)
    }
  }

  @JavascriptInterface
  fun shareImage(imagePath: String, title: String) {
    if (activity is android.app.Activity) {
      val file = java.io.File(imagePath)
      if (file.exists()) {
        val uri = androidx.core.content.FileProvider.getUriForFile(
          activity,
          activity.packageName + ".fileprovider",
          file
        )
        val intent = android.content.Intent().apply {
          action = android.content.Intent.ACTION_SEND
          putExtra(android.content.Intent.EXTRA_STREAM, uri)
          type = "image/*"
          addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
          clipData = android.content.ClipData.newUri(activity.contentResolver, "Image", uri)
        }
        val chooser = android.content.Intent.createChooser(intent, title)
        activity.startActivity(chooser)
      }
    }
  }

  @JavascriptInterface
  fun shareImageBase64(base64: String, fileName: String, title: String) {
    if (activity is android.app.Activity) {
      try {
        val bytes = android.util.Base64.decode(base64, android.util.Base64.DEFAULT)
        val file = java.io.File(activity.cacheDir, fileName)
        file.writeBytes(bytes)
        val uri = androidx.core.content.FileProvider.getUriForFile(
          activity,
          activity.packageName + ".fileprovider",
          file
        )
        val intent = android.content.Intent().apply {
          action = android.content.Intent.ACTION_SEND
          putExtra(android.content.Intent.EXTRA_STREAM, uri)
          type = "image/*"
          addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
          clipData = android.content.ClipData.newUri(activity.contentResolver, "Image", uri)
        }
        val chooser = android.content.Intent.createChooser(intent, title)
        activity.startActivity(chooser)
      } catch (_: Exception) {
      }
    }
  }

  @JavascriptInterface
  fun saveImageToGallery(base64: String, fileName: String): Boolean {
    return try {
      val appName = try {
        BuildConfig.VITE_APP_NAME.replace(" ", "")
      } catch (_: Exception) { "TripDiary" }
      val bytes = android.util.Base64.decode(base64, android.util.Base64.DEFAULT)
      val resolver = activity.contentResolver
      val contentValues = android.content.ContentValues().apply {
        put(android.provider.MediaStore.Images.Media.DISPLAY_NAME, fileName)
        put(android.provider.MediaStore.Images.Media.MIME_TYPE, "image/jpeg")
        put(android.provider.MediaStore.Images.Media.RELATIVE_PATH, "DCIM/$appName")
      }
      val uri = resolver.insert(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
      uri?.let {
        resolver.openOutputStream(it)?.use { outputStream ->
          outputStream.write(bytes)
          outputStream.flush()
        }
      }
      true
    } catch (e: Exception) {
      false
    }
  }
}