package vu.storm.stoka_tv

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.fragment.app.FragmentActivity

class MainActivity : FragmentActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val webView = findViewById<WebView>(R.id.web_view)
        webView.settings.javaScriptEnabled = true
        val url = getString(R.string.web_app_url)
        webView.loadUrl(url)
    }
}