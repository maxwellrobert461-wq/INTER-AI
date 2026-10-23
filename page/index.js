import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'INTER PLATFORM is live 👑 — Real AI like Meta!' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, userMsg] }) });
      const d = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: d.reply || d.error }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + e.message }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>INTER PLATFORM 👑</h1>
      {messages.map((m, i) => <div key={i} style={{ margin: '10px 0', padding: '10px', background: m.role === 'user' ? '#fff' : '#222', color: m.role === 'user' ? '#000' : '#fff', borderRadius: '10px' }}>{m.content}</div>)}
      {loading && <p>Typing...</p>}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask INTER..." style={{ flex: 1, padding: '12px', borderRadius: '20px' }} />
        <button onClick={send} style={{ background: '#fff', color: '#000', padding: '12px 20px', borderRadius: '20px', fontWeight: 'bold' }}>Send</button>
      </div>
    </div>
  );
}