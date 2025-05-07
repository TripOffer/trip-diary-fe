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
        val envUserAgent = try { BuildConfig.VITE_APP_NAME } catch (e: Exception) { null }
        val envAppVersion = try { BuildConfig.VERSION_NAME } catch (e: Exception) { null }
        if (!envUserAgent.isNullOrBlank()) {
            val ua = if (!envAppVersion.isNullOrBlank()) "$envUserAgent/$envAppVersion" else envUserAgent
            settings.userAgentString = ua
            Log.d("WebViewHelper", "User Agent set from env: $ua")
            return
        }
        try {
            val packageInfo: PackageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.packageManager.getPackageInfo(context.packageName, PackageManager.PackageInfoFlags.of(0))
            } else {
              context.packageManager.getPackageInfo(context.packageName, 0)
            }
            val appVersion = packageInfo.versionName
            val customUserAgent = "${settings.userAgentString} TripDiary/$appVersion"
            settings.userAgentString = customUserAgent
            Log.d("WebViewHelper", "User Agent set to: $customUserAgent")
        } catch (e: PackageManager.NameNotFoundException) {
            val defaultUserAgent = settings.userAgentString
            val customUserAgent = "$defaultUserAgent TripDiary/unknown"
            settings.userAgentString = customUserAgent
            Log.e("WebViewHelper", "Failed to get package info for User Agent", e)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    fun setupWebView(context: Context, webView: WebView) {
        val nightModeFlags = context.resources.configuration.uiMode and android.content.res.Configuration.UI_MODE_NIGHT_MASK
        val color = when (nightModeFlags) {
            android.content.res.Configuration.UI_MODE_NIGHT_YES -> 0xFF1a1c1e.toInt()
            android.content.res.Configuration.UI_MODE_NIGHT_NO -> 0xFFFCFCFF.toInt()
            else -> 0xFFFCFCFF.toInt()
        }
        webView.setBackgroundColor(color)
        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        setCustomUserAgent(context, settings)
        webView.addJavascriptInterface(WebAppInterface(context), "Android")
    }
}
