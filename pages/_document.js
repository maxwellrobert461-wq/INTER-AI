import { Html, Head, Main, NextScript } from 'next/document'
export default function Document(){
  return (
    <Html lang="en"><Head>
      <meta name="description" content="INTER AI - Build apps, websites, POS, portfolios with AI. Auto-install like native app. Host instantly. Buy domain. ₦20k with domain, ₦10k own domain. AI app builder Nigeria." />
      <meta name="keywords" content="build app with AI, AI website builder, INTER AI, create app without code, POS builder" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icon.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"INTER AI","description":"Build apps and websites with AI, auto-install PWA, host with domain. Pricing 20k with domain 10k own domain","applicationCategory":"DeveloperApplication","offers":[{"@type":"Offer","price":"20000","priceCurrency":"NGN","name":"With Domain"},{"@type":"Offer","price":"10000","priceCurrency":"NGN","name":"Own Domain"}]})}} />
    </Head><body><Main/><NextScript/></body></Html>
  )
}