import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div>
    
      <Component {...pageProps} />

    </div>
  )
}

export default MyApp
