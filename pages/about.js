import Head from 'next/head'
export default function About() {
  return (
    <>
      <Head><title>About INTER AI - Odera Chidalu Vitalis</title></Head>
      <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
        <a href="/" style={{ textDecoration: 'none' }}>← Back to INTER AI</a>
        <h1 style={{ marginTop: '20px' }}>INTER AI</h1>
        <p>INTER AI is a next generation AI assistant.</p>
        <p><b>Creator:</b> Odera Chidalu Vitalis</p>
        <p><b>From:</b> Port Harcourt, Nigeria</p>
        <p><b>Website:</b> https://inter-ai-p1k9.vercel.app</p>
        <p>Built in 2026 with passion to make AI accessible to everyone.</p>
      </div>
    </>
  )
}