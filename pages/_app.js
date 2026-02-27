import '@/styles/globals.css'
import Layout from '@/pages/layout'
import localFont from 'next/font/local'

const farsiFont = localFont({
  src: [
    {
      path: '../public/fonts/PlaypenSansArabic-Regular.woff',
      weight: '400'
    },
    {
      path: '../public/fonts/PlaypenSansArabic-Medium.woff',
      weight: '500'
    },
    {
      path: '../public/fonts/PlaypenSansArabic-SemiBold.woff',
      weight: '600'
    },
    {
      path: '../public/fonts/PlaypenSansArabic-Bold.woff',
      weight: '700'
    },
    {
      path: '../public/fonts/PlaypenSansArabic-ExtraBold.woff',
      weight: '800'
    }
  ]
})

export default function App({ Component, pageProps }) {
  return (
    <main className={farsiFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
