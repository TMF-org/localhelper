import { Html, Head, Main, NextScript } from 'next/document';

const themeColor = '#0072C9';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta name="language" content="de" />

        <link rel="manifest" href="/manifest.json" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/favicon256x256.png" />

        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={themeColor}
        />

        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta name="mobile-web-app-capable" content="yes" />

        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/image/favicon512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x265"
          href="/image/favicon256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/image/favicon192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/image/favicon64x64.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
