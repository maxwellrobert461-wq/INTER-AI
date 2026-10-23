import { useState, useRef, useEffect } from 'react'

export default function MetaClone() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const [chats, setChats] = useState([{ id: 1, title: 'New chat', time: 'Now' }])
  const [activeId, setActiveId] = useState(1)
  const chatRef = useRef(null)

  useEffect(() => { chatRef.current?.scrollTo(0, chatRef.current.scrollHeight) }, [messages])

  async function send(t = input) {
    if (!t.trim() || loading) return
    const userMsg = { role: 'user', content: t }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const saved = JSON.parse(localStorage.getItem('inter_keys') || '{}')
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: t, groqKey: saved.groq || '' })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch { setMessages(m => [...m, { role: 'assistant', content: 'Error — Add GROQ_API_KEY in /settings' }]) }
    setLoading(false)
  }

  const suggestions = [
    { icon: '💡', title: 'Create an image', desc: 'of a futuristic city' },
    { icon: '📝', title: 'Write a story', desc: 'about space adventure' },
    { icon: '💻', title: 'Create an app', desc: 'like calculator or todo' },
    { icon: '🎨', title: 'Help me brainstorm', desc: 'business ideas' },
  ]

  return (
    <div style={{ height: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif', background: '#fbfb', color: '#111' }}>
      {/* SIDEBAR - EXACT META.AI */}
      <div style={{ width: sidebar ? '280px' : '0', background: '#f5f5f5', borderRight: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: '0.2s' }}>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '22px' }}><span style={{ background: 'linear-gradient(90deg,#0064e0,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>∞</span> Meta AI</div>
          <button onClick={() => { setMessages([]); setActiveId(Date.now()) }} style={{ width: '100%', marginTop: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '24px', padding: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>✎ New chat</button>
          <button onClick={() => window.location.href='/settings'} style={{ width: '100%', marginTop: '10px', background: '#111', color: '#fff', border: 'none', borderRadius: '24px', padding: '10px', cursor: 'pointer' }}>🔑 API Keys Vault</button>
        </div>
        <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '10px' }}>Recent</div>
          {chats.map(c => (
            <div key={c.id} onClick={() => setActiveId(c.id)} style={{ padding: '10px 12px', borderRadius: '10px', background: activeId===c.id ? '#fff' : 'transparent', cursor: 'pointer', fontSize: '14px', border: activeId===c.id ? '1px solid #e5e5e5' : '1px solid transparent', marginBottom: '4px' }}>{c.title}</div>
          ))}
          <div style={{ marginTop: '24px', fontSize: '12px', color: '#888' }}>
            <div style={{ padding: '8px 0' }}>⚙️ Settings</div>
            <div style={{ padding: '8px 0' }}>💬 Help</div>
            <div style={{ padding: '8px 0', fontWeight: 600 }}>INTER AI PLATFORM v1.0<br/>Built like Meta AI</div>
          </div>
        </div>
      </div>

      {/* MAIN - EXACT META.AI */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f0f0f0' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>☰</button>
          <div style={{ fontWeight: 600 }}>Meta AI • INTER AI</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#0064e0,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px' }}>U</div>
          </div>
        </div>

        <div ref={chatRef} style={{ flex: 1, overflowY: 'auto' }}>
          {messages.length===0 ? (
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>What's on your mind?</h1>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Ask anything — Create apps, images, code, like Meta AI</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
                {suggestions.map((s,i) => (
                  <button key={i} onClick={() => send(s.title + ' ' + s.desc)} style={{ textAlign: 'left', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '20px' }}>{s.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '8px' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{s.desc}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Create a calculator app','Build a todo list','Make a portfolio site','Weather app'].map(t => (
                  <button key={t} onClick={() => send(t)} style={{ background: '#f0f0f0', border: 'none', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
              {messages.map((m,i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.role==='user' ? '#000' : 'linear-gradient(135deg,#0064e0,#a855f7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 700 }}>{m.role==='user' ? 'U' : '∞'}</div>
                  <div style={{ flex: 1, paddingTop: '4px', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '15px' }}>{m.content}</div>
                </div>
              ))}
              {loading && <div style={{ display: 'flex', gap: '12px' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#0064e0,#a855f7)' }}></div><div style={{ color: '#888' }}>Meta AI is thinking...</div></div>}
            </div>
          )}
        </div>

        {/* INPUT - EXACT META.AI */}
        <div style={{ padding: '16px', background: '#fff' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ background: '#f3f3f3', borderRadius: '28px', padding: '8px 8px 8px 20px', display: 'flex', alignItems: 'flex-end', gap: '8px', border: '1px solid #e5e5e5' }}>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send() }}} placeholder="Ask Meta AI anything..." rows={1} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '15px', maxHeight: '120px', padding: '10px 0' }} />
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', paddingBottom: '4px' }}>
                <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#fff', cursor: 'pointer' }}>🎤</button>
                <button onClick={() => send()} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: input ? '#000' : '#ddd', color: '#fff', cursor: 'pointer' }}>↑</button>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '10px' }}>INTER AI can make mistakes. Check important info. Built like Meta AI • API Keys in Settings</div>
          </div>
        </div>
      </div>
    </div>
  )
}