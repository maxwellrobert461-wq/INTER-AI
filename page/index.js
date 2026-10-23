import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'INTER PLATFORM live 👑 — Real AI like Meta!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const d = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: d.reply || d.error }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + e.message }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h2>INTER PLATFORM 👑</h2>
      {messages.map((m, i) => (
        <div key={i} style={{ margin: '10px 0', padding: 12, background: m.role === 'user' ? '#fff' : '#222', color: m.role === 'user' ? '#000' : '#fff', borderRadius: 12 }}>{m.content}</div>
      ))}
      {loading && <p>Typing...</p>}
      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask INTER..." style={{ flex: 1, padding: 12, borderRadius: 20 }} />
        <button onClick={send} style={{ background: '#fff', color: '#000', padding: '12px 20px', borderRadius: 20, fontWeight: 'bold' }}>Send</button>
      </div>
    </div>
  );
}