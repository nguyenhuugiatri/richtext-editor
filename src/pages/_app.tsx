import '@/styles/globals.scss'

import type { AppProps } from 'next/app'
import { Work_Sans } from 'next/font/google'
import Head from 'next/head'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${workSans.style.fontFamily};
        }
      `}</style>

      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
