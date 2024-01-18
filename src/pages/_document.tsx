import { Head, Html, Main, NextScript } from 'next/document'

import { siteConfig } from '@/configs/site'

const { metadata } = siteConfig
const { name, url, description } = metadata

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={url} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <body className="min-h-screen bg-background-color-default">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
