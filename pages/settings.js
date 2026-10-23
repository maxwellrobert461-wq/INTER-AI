import { useState, useEffect } from 'react'

export default function Settings() {
  const [keys, setKeys] = useState({ groq: '', adsense: '' })
  
  useEffect(() => {
    const s = localStorage.getItem('inter_keys')
    if (s) setKeys(JSON.parse(s))
  }, [])

  function save() {
    localStorage.setItem('inter_keys', JSON.stringify(keys))
    alert('✅ Saved! Now go back to home — Chat will work!')
    window.location.href = '/'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <a href="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#000', fontWeight: 600 }}>← Back to INTER AI</a>
      <h2>🔑 API Keys Vault</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Add your keys — Like Meta Developers Dashboard</p>
      
      <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '16px', borderRadius: '12px' }}>
        <div style={{ fontWeight: 600, marginBottom: '6px' }}>GROQ API KEY (For AI)</div>
        <input value={keys.groq} onChange={e => setKeys({...keys, groq: e.target.value})} placeholder="gsk_..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Get from console.groq.com/keys — FREE</div>
      </div>
      
      <div style={{ marginTop: '16px', background: '#f9f9f9', padding: '16px', borderRadius: '12px' }}>
        <div style={{ fontWeight: 600, marginBottom: '6px' }}>ADSENSE KEY</div>
        <input value={keys.adsense} onChange={e => setKeys({...keys, adsense: e.target.value})} placeholder="ca-pub-..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
      </div>
      
      <button onClick={save} style={{ marginTop: '20px', width: '100%', background: '#000', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>💾 Save & Go Back</button>
    </div>
  )
}