import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="INTER PLATFORM - Real AI like Meta AI - Built by INTER LAB Nigeria" />
        <title>INTER PLATFORM - Real AI like Meta</title>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}` }} />
      </body>
    </Html>
  );
}