import java.util.Properties

plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
  id("rust")
}

val tauriProperties = Properties().apply {
  val propFile = file("tauri.properties")
  if (propFile.exists()) {
    propFile.inputStream().use { load(it) }
  }
}

android {
  compileSdk = 34
  namespace = "com.tripOffer.diary"
  defaultConfig {
    manifestPlaceholders["usesCleartextTraffic"] = "false"
    applicationId = "com.tripOffer.diary"
    minSdk = 24
    targetSdk = 34
    versionCode = tauriProperties.getProperty("tauri.android.versionCode", "1").toInt()
    versionName = tauriProperties.getProperty("tauri.android.versionName", "1.0")

    // 环境变量
    println("Loading environment variables from .env file")
    val envFile = rootProject.file("../../../.env")
    println("envFile absolute path: ${envFile.absolutePath}")
    if (envFile.exists()) {
      val props = Properties()
      envFile.forEachLine { line ->
        val trimmed = line.trim()
        if (trimmed.isNotEmpty() && !trimmed.startsWith("#") && trimmed.contains("=")) {
          val (key, value) = trimmed.split("=", limit = 2)
          // 只允许合法的 Java 标识符
          val validKey = key.trim().replace("[^A-Za-z0-9_]".toRegex(), "_")
          buildConfigField("String", validKey, "\"${value.trim()}\"")
          println("Injected env: $validKey = ${value.trim()}")
        }
      }
    }
  }
  buildTypes {
    getByName("debug") {
      manifestPlaceholders["usesCleartextTraffic"] = "true"
      isDebuggable = true
      isJniDebuggable = true
      isMinifyEnabled = false
      packaging {
        jniLibs.keepDebugSymbols.add("*/arm64-v8a/*.so")
        jniLibs.keepDebugSymbols.add("*/armeabi-v7a/*.so")
        jniLibs.keepDebugSymbols.add("*/x86/*.so")
        jniLibs.keepDebugSymbols.add("*/x86_64/*.so")
      }
    }
    getByName("release") {
      isMinifyEnabled = true
      proguardFiles(
        *fileTree(".") { include("**/*.pro") }
          .plus(getDefaultProguardFile("proguard-android-optimize.txt"))
          .toList().toTypedArray()
      )
    }
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
  buildFeatures {
    buildConfig = true
  }
}

rust {
  rootDirRel = "../../../"
}

dependencies {
  implementation("androidx.webkit:webkit:1.6.1")
  implementation("androidx.appcompat:appcompat:1.6.1")
  implementation("com.google.android.material:material:1.8.0")
  testImplementation("junit:junit:4.13.2")
  androidTestImplementation("androidx.test.ext:junit:1.1.4")
  androidTestImplementation("androidx.test.espresso:espresso-core:3.5.0")
}

apply(from = "tauri.build.gradle.kts")