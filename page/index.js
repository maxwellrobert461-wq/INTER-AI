import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'INTER PLATFORM live 👑 — Real AI like Meta! Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data.reply || data.error || 'No reply' }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + err.message }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: 'bold' }}>INTER PLATFORM 👑</h1>
      <p style={{ opacity: 0.6, fontSize: 14 }}>Real AI like Meta — Made in Nigeria</p>
      
      <div style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '10px 0', padding: 12, borderRadius: 12, background: m.role === 'user' ? '#fff' : '#222', color: m.role === 'user' ? '#000' : '#fff' }}>
            {m.content}
          </div>
        ))}
        {loading && <p style={{ opacity: 0.7 }}>INTER is typing...</p>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20, position: 'fixed', bottom: 20, left: 20, right: 20 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask INTER..." style={{ flex: 1, padding: 14, borderRadius: 24, border: 'none' }} />
        <button onClick={send} style={{ background: '#fff', color: '#000', padding: '14px 22px', borderRadius: 24, fontWeight: 'bold', border: 'none' }}>Send</button>
      </div>
    </div>
  );
}