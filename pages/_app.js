import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      
      <Script
          data-ad-client = "ca-pub-9062696682480550"
          async = {true}
          strategy= "beforeInteractive"
          src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />

      <Component {...pageProps} />

    </div>
  )
}

export default MyApp
