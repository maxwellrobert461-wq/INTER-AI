import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👑 INTER AI APP STUDIO\n\nI can BUILD APPS for you like Meta!\n\nTry:\n• "Create a calculator app"\n• "Build a todo app"\n• "Make a shop website"\n• "Create a chat app"\n\nWhat app should I build?' }
  ])
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [appCode, setAppCode] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => { chatRef.current?.scrollTo(0, chatRef.current.scrollHeight) }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    const isAppRequest = input.toLowerCase().includes('create') || input.toLowerCase().includes('build') || input.toLowerCase().includes('make') || input.toLowerCase().includes('app')
    setMessages(p => [...p, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: isAppRequest 
            ? `You are INTER AI App Builder. User wants: "${userMsg.content}". Create a complete single-file HTML app with inline CSS and JS. Must be fully functional, modern, mobile-responsive, Meta-style beautiful. Return ONLY HTML code starting with <!DOCTYPE html>. No explanation, just code.` 
            : userMsg.content,
          mode: isAppRequest ? 'app' : 'chat'
        })
      })
      const data = await res.json()
      const reply = data.reply || 'Error'
      
      if (reply.includes('<!DOCTYPE') || reply.includes('<html')) {
        setAppCode(reply)
        setMessages(p => [...p, { role: 'assistant', content: `✅ APP BUILT! Your app is ready!\n\n${userMsg.content}\n\nClick PREVIEW to see it or DOWNLOAD to get file.`, hasApp: true, code: reply }])
      } else {
        setMessages(p => [...p, { role: 'assistant', content: reply }])
      }
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '⚠️ Add GROQ_API_KEY in Vercel Settings to build apps!' }])
    }
    setLoading(false)
  }

  function downloadApp(code, name='inter-app.html') {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = name; a.click()
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f2f5', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #dddfe2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0064e0, #a033ff, #ff3d5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>M</div>
        <div><div style={{ fontWeight: 700 }}>INTER AI <span style={{ color: '#0064e0' }}>APP STUDIO</span></div><div style={{ fontSize: '11px', color: '#65676b' }}>● Build Apps Like Meta</div></div>
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <button onClick={() => setShowMenu(!showMenu)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#f0f2f5', cursor: 'pointer' }}>⋯</button>
          {showMenu && (
            <div style={{ position: 'absolute', right: 0, top: '45px', background: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: '200px', zIndex: 100 }}>
              <div onClick={() => { setMessages([{ role: 'assistant', content: '✨ New session — What app to build?' }]); setAppCode(''); setShowMenu(false) }} style={{ padding: '12px', cursor: 'pointer' }}>🗑️ New Build</div>
              <div onClick={() => { if(appCode) downloadApp(appCode); setShowMenu(false) }} style={{ padding: '12px', cursor: 'pointer' }}>💾 Download Last App</div>
              <div onClick={() => setShowMenu(false)} style={{ padding: '12px', cursor: 'pointer' }}>ℹ️ How to use: Type "Create..."</div>
            </div>
          )}
        </div>
      </div>

      {/* CHAT */}
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }} onClick={() => setShowMenu(false)}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{ background: m.role === 'user' ? '#0084ff' : '#fff', color: m.role === 'user' ? '#fff' : '#000', padding: '12px 14px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', whiteSpace: 'pre-wrap', fontSize: '14px' }}>{m.content}</div>
            {m.hasApp && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowPreview(true)} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }}>👁️ PREVIEW APP</button>
                <button onClick={() => downloadApp(m.code, 'inter-app.html')} style={{ background: '#0084ff', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }}>💾 DOWNLOAD</button>
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{ background: '#fff', padding: '10px', borderRadius: '12px', width: 'fit-content' }}>⚡ Building your app...</div>}
      </div>

      {/* QUICK APP BUTTONS */}
      <div style={{ background: '#fff', padding: '8px 12px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid #eee' }}>
        {['Calculator App','Todo App','Shop Website','Weather App'].map(t => (
          <button key={t} onClick={() => setInput(`Create a ${t}`)} style={{ whiteSpace: 'nowrap', background: '#f0f2f5', border: '1px solid #ddd', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>{t}</button>
        ))}
      </div>

      {/* INPUT */}
      <div style={{ background: '#fff', padding: '10px 12px', display: 'flex', gap: '8px', borderTop: '1px solid #dddfe2' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder='Type "Create a..." to build app' style={{ flex: 1, background: '#f0f2f5', border: 'none', borderRadius: '20px', padding: '12px 16px', outline: 'none' }} />
        <button onClick={send} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0084ff', border: 'none', color: '#fff', cursor: 'pointer' }}>➤</button>
      </div>

      {/* APP PREVIEW MODAL */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>📱 Your App Preview</b>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => downloadApp(appCode)} style={{ background: '#0084ff', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px' }}>Download</button>
              <button onClick={() => setShowPreview(false)} style={{ background: '#000', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px' }}>✕ Close</button>
            </div>
          </div>
          <iframe srcDoc={appCode} style={{ flex: 1, border: 'none', background: '#fff' }} title="App Preview" />
        </div>
      )}
    </div>
  )
}