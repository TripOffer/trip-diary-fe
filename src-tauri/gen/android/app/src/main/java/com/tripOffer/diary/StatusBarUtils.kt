package com.tripOffer.diary

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.view.WindowManager

object StatusBarUtils {
  /** 设置状态栏颜色 */
  fun setStatusBarColor(activity: Activity, color: Int) {
    activity.window.statusBarColor = color
  }

  /** 设置或取消沉浸式状态栏 */
  fun setImmersiveStatusBar(activity: Activity, enabled: Boolean) {
    val window = activity.window
    if (enabled) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        window.setDecorFitsSystemWindows(false)
        window.statusBarColor = Color.TRANSPARENT
      } else {
        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility =
          View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = Color.TRANSPARENT
      }
    } else {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        window.setDecorFitsSystemWindows(true)
        // 恢复为主题色或白色，避免黑色突兀
        window.statusBarColor = Color.WHITE
      } else {
        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        // 清除 FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
        window.clearFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = Color.WHITE
      }
    }
  }

  /** 设置是否全屏（隐藏/显示状态栏） */
  fun setFullScreen(activity: Activity, fullScreen: Boolean) {
    val window = activity.window
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      val controller = window.insetsController
      if (fullScreen) {
        controller?.hide(WindowInsets.Type.statusBars())
      } else {
        controller?.show(WindowInsets.Type.statusBars())
      }
    } else {
      val decorView = window.decorView
      @Suppress("DEPRECATION")
      if (fullScreen) {
        decorView.systemUiVisibility =
          decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_FULLSCREEN
      } else {
        decorView.systemUiVisibility =
          decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_FULLSCREEN.inv()
      }
    }
  }

  /** 获取状态栏高度（像素） */
  @SuppressLint("InternalInsetResource")
  fun getStatusBarHeight(context: Context): Int {
    val resourceId = context.resources.getIdentifier("status_bar_height", "dimen", "android")
    return if (resourceId > 0) context.resources.getDimensionPixelSize(resourceId) else 0
  }

  /** 设置状态栏图标和文字为亮色（深色图标）或暗色（浅色图标） */
  fun setStatusBarLightMode(activity: Activity, isLight: Boolean) {
    val window = activity.window
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      val controller = window.insetsController
      if (controller != null) {
        if (isLight) {
          controller.setSystemBarsAppearance(
            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
          )
        } else {
          controller.setSystemBarsAppearance(
            0,
            WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
          )
        }
      }
    } else {
      val decorView = window.decorView
      // 仅对废弃API相关语句加 Suppress("DEPRECATION")
      @Suppress("DEPRECATION")
      val flags = if (isLight) {
        decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
      } else {
        decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
      }
      @Suppress("DEPRECATION")
      decorView.systemUiVisibility = flags
    }
  }
}
