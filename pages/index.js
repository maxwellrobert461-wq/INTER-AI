<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />
<link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" />
import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  const suggestions = [
    "Create an image", "Write a story", "Create an app",
    "Create a calculator app", "Build a todo list app", "Explain quantum physics"
  ]

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight) }, [msgs])

  async function send(text = input) {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text }
    setMsgs(p => [...p, userMsg])
    setInput('')
    setLoading(true)
    try {
      const saved = JSON.parse(localStorage.getItem('inter_keys') || '{}')
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, groqKey: saved.groq || '' })
      })
      const d = await r.json()
      setMsgs(p => [...p, { role: 'assistant', content: d.reply }])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: '⚠️ Error — Go to /settings and add GROQ key from console.groq.com/keys' }])
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>INTER AI - Created by Oderah Chidalu Vitalis Vitalis | Like Meta AI</title>
        <meta name="description" content="INTER AI is a next-gen AI platform like Meta AI, created by Oderah Chidalu Vitalis Vitalis from Nigeria. Build apps, create images, chat with AI." />
        <meta name="keywords" content="INTER AI, Oderah Chidalu Vitalis Vitalis, Meta AI, Nigeria AI, AI creator" />
        <meta name="author" content="Oderah Chidalu Vitalis Vitalis" />
        <meta property="og:title" content="INTER AI by Oderah Chidalu Vitalis Vitalis" />
        <meta property="og:description" content="INTER AI - AI platform created by Oderah Chidalu Vitalis Vitalis from Port Harcourt Nigeria" />
        <meta property="og:url" content="https://inter-ai-p1k9.vercel.app" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "INTER AI",
          "url": "https://inter-ai-p1k9.vercel.app",
          "founder": { "@type": "Person", "name": "Oderah Chidalu Vitalis Vitalis", "nationality": "Nigerian", "address": "Port Harcourt, Rivers State, Nigeria" },
          "description": "INTER AI is an AI platform like Meta AI created by Oderah Chidalu Vitalis Vitalis in 2026"
        })}} />
      </Head>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '18px' }}>∞ INTER AI • <span style={{ fontWeight: 400, fontSize: '12px', color: '#666' }}>by Oderah Chidalu Vitalis Vitalis</span></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/about" style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '20px', border: '1px solid #ddd', textDecoration: 'none', color: '#000' }}>About</a>
            <a href="/settings" style={{ fontSize: '12px', background: '#000', color: '#fff', padding: '6px 12px', borderRadius: '20px', textDecoration: 'none' }}>🔑 Keys</a>
          </div>
        </div>

        <div ref={ref} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {msgs.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>What's on your mind?</div>
              <div style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>Created by Oderah Chidalu Vitalis Vitalis</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '400px' }}>
                {suggestions.map((s,i) => (
                  <button key={i} onClick={() => send(s)} style={{ padding: '10px 14px', borderRadius: '20px', border: '1px solid #ddd', background: '#f9f9f9', cursor: 'pointer', fontSize: '13px' }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((x,i) => (
            <div key={i} style={{ alignSelf: x.role==='user'?'flex-end':'flex-start', background: x.role==='user'?'#0084ff':'#f5f5f5', color: x.role==='user'?'#fff':'#000', padding: '12px 16px', borderRadius: '18px', maxWidth: '85%', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{x.content}</div>
          ))}
          {loading && <div style={{ color: '#888', fontSize: '13px' }}>INTER AI is thinking...</div>}
        </div>

        <div style={{ padding: '8px 20px', textAlign: 'center', fontSize: '11px', color: '#aaa', borderTop: '1px solid #f0f0f0' }}>
          INTER AI — Created by <b style={{ color: '#000' }}>Oderah Chidalu Vitalis Vitalis</b> © 2026 • Port Harcourt, Nigeria • <a href="/about" style={{ color: '#666' }}>About Founder</a>
        </div>

        <div style={{ padding: '12px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="What's on your mind?" style={{ flex: 1, padding: '14px 18px', borderRadius: '24px', border: '1px solid #ddd', outline: 'none', fontSize: '15px' }} />
          <button onClick={() => send()} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: '50%', width: '46px', height: '46px', fontSize: '18px', cursor: 'pointer' }}>↑</button>
        </div>
      </div>
    </>
  )
}