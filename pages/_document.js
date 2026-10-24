import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="INTER AI - Build apps, websites, images with AI. Auto-install like Meta AI. Host with domain. ₦20k with domain, ₦10k with own domain. GitHub + Vercel." />
        <meta name="keywords" content="INTER AI, build app with AI, website builder AI, Meta AI clone, Nigeria AI, domain hosting" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "INTER AI",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": [
              { "@type": "Offer", "price": "20000", "priceCurrency": "NGN", "name": "With Domain" },
              { "@type": "Offer", "price": "10000", "priceCurrency": "NGN", "name": "Own Domain" }
            ],
            "creator": {
              "@type": "Person",
              "name": "Odera Chidalu Vitalis Vitalis",
              "nationality": "Nigeria"
            },
            "description": "Build apps and websites with AI, auto-install, host with custom domain"
          })
        }} />
      </Head>
      <body style={{margin:0, fontFamily:'Inter, system-ui'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}