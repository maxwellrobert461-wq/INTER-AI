import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  const suggestions = [
    "Create an image", "Write a story", "Create an app",
    "Create a calculator app", "Build a todo list", "Explain AI"
  ]

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight) }, [msgs])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  }, []);

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
      setMsgs(p => [...p, { role: 'assistant', content: '⚠️ Add GROQ key in /settings' }])
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>INTER AI - Created by Odera Chidalu Vitalis</title>
        <meta name="description" content="INTER AI is a powerful AI assistant created by Odera Chidalu Vitalis. Build apps, create images, write stories." />
        <meta name="author" content="Odera Chidalu Vitalis" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "INTER AI",
          "url": "https://inter-ai-p1k9.vercel.app",
          "founder": { "@type": "Person", "name": "Odera Chidalu Vitalis" },
          "description": "INTER AI created by Odera Chidalu Vitalis"
        })}} />
      </Head>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '18px' }}>∞ INTER AI</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/about" style={{ fontSize: '12px', padding: '7px 14px', borderRadius: '20px', border: '1px solid #ddd', textDecoration: 'none', color: '#000' }}>About</a>
            <a href="/settings" style={{ fontSize: '12px', background: '#000', color: '#fff', padding: '7px 14px', borderRadius: '20px', textDecoration: 'none' }}>Keys</a>
          </div>
        </div>

        <div ref={ref} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {msgs.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '34px', fontWeight: 800, marginBottom: '8px' }}>What's on your mind?</div>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '24px' }}>INTER AI by Odera Chidalu Vitalis</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '420px' }}>
                {suggestions.map((s,i) => (
                  <button key={i} onClick={() => send(s)} style={{ padding: '10px 16px', borderRadius: '20px', border: '1px solid #e5e5e5', background: '#fafafa', cursor: 'pointer', fontSize: '13px' }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((x,i) => (
            <div key={i} style={{ alignSelf: x.role==='user'?'flex-end':'flex-start', background: x.role==='user'?'#111':'#f4f4f5', color: x.role==='user'?'#fff':'#111', padding: '12px 16px', borderRadius: '18px', maxWidth: '85%', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '14px' }}>{x.content}</div>
          ))}
          {loading && <div style={{ color: '#999', fontSize: '13px' }}>INTER AI is thinking...</div>}
        </div>

        <div style={{ padding: '8px 20px', textAlign: 'center', fontSize: '11px', color: '#aaa' }}>
          INTER AI — Created by <b style={{ color: '#111' }}>Odera Chidalu Vitalis</b> © 2026
        </div>

        <div style={{ padding: '12px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything..." style={{ flex: 1, padding: '14px 18px', borderRadius: '24px', border: '1px solid #ddd', outline: 'none', fontSize: '15px' }} />
          <button onClick={() => send()} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer' }}>↑</button>
        </div>
      </div>
    </>
  )
}