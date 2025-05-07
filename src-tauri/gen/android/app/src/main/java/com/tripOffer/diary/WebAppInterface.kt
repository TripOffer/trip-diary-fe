package com.tripOffer.diary

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast

class WebAppInterface(private val activity: Context) {
  @JavascriptInterface
  fun showToast(message: String) {
    Toast.makeText(activity, message, Toast.LENGTH_SHORT).show()
  }
}