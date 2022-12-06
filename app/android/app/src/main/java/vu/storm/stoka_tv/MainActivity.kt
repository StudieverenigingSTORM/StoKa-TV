package vu.storm.stoka_tv

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.fragment.app.FragmentActivity
import android.content.Context
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.view.ContextThemeWrapper
import android.view.KeyEvent
import android.webkit.SslErrorHandler
import android.net.http.SslError

class MainActivity : FragmentActivity() {

    companion object {
        const val SHARED_PREFS_NAME = "prefs"
        const val KEY_URL = "url"
    }

    lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    private fun initUI() {
        webView.settings.javaScriptEnabled = true
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                webView.visibility = View.VISIBLE
                val expectedTitle = "StoKa-TV"
                if (webView.title != expectedTitle) {
                    webView.loadData(
                        "<html><head><title>$expectedTitle</title></head><body><h1 style=\"color: red\">Blocked!</h1></body></html>",
                        "text/html",
                        "UTF-8"
                    )
                }
            }

            override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
                // Ignore SSL certificate errors
                handler?.proceed()
            }
        }
        val prefs = getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE)
        if (prefs.getString(KEY_URL, "")!!.trim().isNotEmpty()) {
            webView.loadUrl(prefs.getString(KEY_URL, "")!!)
        } else {
            // Show dialog to enter URL initially
            updateAndLoadUrl()
        }
    }

    fun updateAndLoadUrl() {
        val urlEditText = EditText(this)
        urlEditText.setHint("example.org")
        val prefs = getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE)
        urlEditText.setText(prefs.getString(KEY_URL, ""))
        AlertDialog.Builder(ContextThemeWrapper(this, R.style.Theme_StoKaTV_Dialog))
            .setTitle("Settings")
            .setMessage("Enter the URL of the web app")
            .setView(urlEditText)
            .setPositiveButton("Update", { dialog, _ ->
                val url = urlEditText.getText().toString().trim()
                webView.loadUrl(url)
                prefs.edit().putString(KEY_URL, url).apply()
                dialog.dismiss()
            })
            .setNegativeButton("Cancel", { dialog, _ ->
                dialog.dismiss()
            })
            .show()
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_MENU) {
            updateAndLoadUrl()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    private fun hideSystemUI() {
        val windowInsetsController =
            ViewCompat.getWindowInsetsController(window.decorView) ?: return
        windowInsetsController.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        windowInsetsController.hide(WindowInsetsCompat.Type.systemBars())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        webView = findViewById<WebView>(R.id.web_view)
        initUI()
    }

    override fun onResume() {
        super.onResume()
        hideSystemUI()
    }
}