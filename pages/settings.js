import { useState, useEffect } from 'react'
export default function Settings() {
  const [keys, setKeys] = useState({ groq: '', adsense: '' })
  useEffect(() => {
    const s = localStorage.getItem('inter_keys')
    if (s) setKeys(JSON.parse(s))
  }, [])
  function save() {
    localStorage.setItem('inter_keys', JSON.stringify(keys))
    alert('✅ Keys Saved! Go back and chat now works!')
  }
  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <a href="/" style={{ textDecoration: 'none' }}>← Back to INTER AI</a>
      <h2 style={{ marginTop: '20px' }}>🔑 API Keys Vault</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Add your keys here like Meta Developers</p>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontWeight: 600, marginBottom: '6px' }}>GROQ API KEY</div>
        <input value={keys.groq} onChange={e => setKeys({...keys, groq: e.target.value})} placeholder="gsk_..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontWeight: 600, marginBottom: '6px' }}>ADSENSE KEY</div>
        <input value={keys.adsense} onChange={e => setKeys({...keys, adsense: e.target.value})} placeholder="ca-pub-..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
      </div>
      
      <button onClick={save} style={{ marginTop: '20px', width: '100%', background: '#0084ff', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>💾 Save Keys</button>
      
      <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
        Get Groq: console.groq.com/keys<br/>
        Get AdSense: adsense.google.com
      </div>
    </div>
  )
}