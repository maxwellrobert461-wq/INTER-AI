import { useState } from 'react'
import { INTER_CONFIG } from '../lib/spikey.js'

export default function InterAI({ install, hasPrompt }){
  const [msg,setMsg]=useState(''); const [html,setHtml]=useState(''); const [loading,setLoading]=useState(false); const [reply,setReply]=useState('Welcome to INTER AI — Build apps, websites, POS, portfolios with AI');

  async function build(){
    if(!msg) return; setLoading(true);
    const r=await fetch('/api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
    const d=await r.json(); setReply(d.reply); setHtml(d.html); setLoading(false);
  }

  return (
    <div style={{maxWidth:'900px',margin:'0 auto',padding:'20px',fontFamily:'Inter,sans-serif'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{fontWeight:900,margin:0}}>INTER AI</h1>
        <div style={{display:'flex',gap:'10px'}}>
          <a href="/domains" style={{textDecoration:'none',background:'#000',color:'#fff',padding:'8px 12px',borderRadius:'20px',fontSize:'12px'}}>INTER AI Domains</a>
          <a href="/about" style={{textDecoration:'none',border:'1px solid #ddd',padding:'8px 12px',borderRadius:'20px',fontSize:'12px',color:'#000'}}>About INTER AI</a>
        </div>
      </header>

      <div style={{marginTop:'20px',padding:'16px',background:'#f6f6f6',borderRadius:'12px'}}>
        <b>INTER AI</b> can build: Calculator, POS, Restaurant App, Portfolio, E-commerce, Landing Page. Then auto-install + host with custom domain. <br/>
        <span style={{fontSize:'12px'}}>Pricing: INTER AI with domain ₦{INTER_CONFIG.pricing.withDomain}/month, INTER AI own domain ₦{INTER_CONFIG.pricing.ownDomain}/month</span>
      </div>

      <div style={{marginTop:'16px',display:'flex',gap:'8px'}}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Ask INTER AI: Build a calculator app" style={{flex:1,padding:'14px',borderRadius:'12px',border:'1px solid #ddd'}} />
        <button onClick={build} disabled={loading} style={{padding:'14px 20px',borderRadius:'12px',background:'#000',color:'#fff',border:'none',fontWeight:700}}>{loading?'INTER AI Building...':'Build in INTER AI'}</button>
      </div>

      <div style={{marginTop:'12px',fontSize:'13px',color:'#555'}}>{reply}</div>

      {html && <div style={{marginTop:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3>INTER AI Preview</h3>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={()=>{const w=window.open();w.document.write(html)}} style={{padding:'8px 12px',borderRadius:'8px',border:'1px solid #ddd'}}>Open INTER AI App</button>
            {hasPrompt && <button onClick={install} style={{padding:'8px 12px',borderRadius:'8px',background:'#000',color:'#fff',border:'none'}}>Install INTER AI</button>}
            <a href="/domains" style={{padding:'8px 12px',borderRadius:'8px',background:'#111',color:'#fff',textDecoration:'none',fontSize:'12px'}}>Host on INTER AI</a>
          </div>
        </div>
        <iframe srcDoc={html} style={{width:'100%',height:'500px',border:'1px solid #eee',borderRadius:'12px',marginTop:'8px'}} />
      </div>}

      <footer style={{marginTop:'30px',textAlign:'center',fontSize:'11px',color:'#999'}}>© INTER AI — Build anything with AI — Auto-install — Domain hosting — Powered by Mastra + Groq</footer>
    </div>
  )
}