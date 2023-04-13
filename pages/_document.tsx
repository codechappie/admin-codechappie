import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta property="custom" content="yolo" />
          <meta name="google-site-verification" content="A_aLx8CcFwL0oejP6gO5ehs4lNScTdDlO9a_GjI75c0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />


          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@300;500;800&display=swap&family=Fira+Code:wght@300&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/assets/images/codechappie/logo-small-blue.svg" type="image/x-icon" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#ffce00" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="theme__dark">
          <Main />
          <NextScript />
          {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/languages/go.min.js" /> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument