import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Welcome to INTER AI — Ask me anything! Built like Meta AI.' }
  ])
  const [loading, setLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [messages, loading])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    setMessages(p => [...p, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      })
      const data = await res.json()
      setMessages(p => [...p, { role: 'assistant', content: data.reply || 'No reply' }])
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '⚠️ Connection error. Check GROQ_API_KEY in Vercel.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f2f5', fontFamily: 'SF Pro, -apple-system, sans-serif' }}>
      {/* META HEADER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #dddfe2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0064e0, #5f0ee0, #ff3d5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>M</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>INTER AI <span style={{ background: 'linear-gradient(90deg,#0064e0,#8a5cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>PLATFORM</span> <span style={{ fontSize: '10px', background: '#e7f3ff', color: '#0064e0', padding: '2px 6px', borderRadius: '10px' }}>Meta-style</span></div>
          <div style={{ fontSize: '12px', color: '#65676b' }}>● Online • Meta AI • Fast</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '20px' }}>⋯</div>
      </div>

      {/* CHAT AREA - Like Messenger */}
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', maxWidth: '85%' , alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role !== 'user' && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#0064e0,#a033ff)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>✦</div>}
            <div style={{
              background: m.role === 'user' ? '#0084ff' : '#fff',
              color: m.role === 'user' ? '#fff' : '#050505',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
              fontSize: '15px',
              lineHeight: '1.35',
              boxShadow: m.role === 'user' ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap'
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#0064e0,#a033ff)' }}></div>
            <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '18px', display: 'flex', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', background: '#bcc0c4', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite' }}></span>
              <span style={{ width: '6px', height: '6px', background: '#bcc0c4', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite 0.2s' }}></span>
              <span style={{ width: '6px', height: '6px', background: '#bcc0c4', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite 0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* INPUT - Like Messenger */}
      <div style={{ background: '#fff', padding: '10px 12px', borderTop: '1px solid #dddfe2', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, background: '#f0f2f5', borderRadius: '20px', display: 'flex', alignItems: 'center', padding: '6px 14px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask INTER AI..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', padding: '6px 0' }} />
          <span style={{ color: '#0084ff', fontSize: '20px' }}>😊</span>
        </div>
        <button onClick={send} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0084ff', border: 'none', color: '#fff', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>➤</button>
      </div>

      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </div>
  )
}