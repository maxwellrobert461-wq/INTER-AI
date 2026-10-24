import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
export default function Home(){
  const [input,setInput]=useState(''); const [msgs,setMsgs]=useState([]); const [loading,setLoading]=useState(false)
  const [deferredPrompt,setDeferredPrompt]=useState(null)
  const ref=useRef(null)
  const pills=["Build a calculator app","Build a restaurant website","Create POS app","Build portfolio website"]
  useEffect(()=>ref.current?.scrollTo(0,ref.current.scrollHeight),[msgs])
  useEffect(()=>{ if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault(); setDeferredPrompt(e)})
  },[])
  async function autoInstall(){ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null)} else alert('iPhone: Share → Add to Home Screen | Android: ⋮ → Install app') }
  async function send(txt=input){
    if(!txt.trim()) return
    setMsgs(p=>[...p,{role:'user',content:txt}]); setInput(''); setLoading(true)
    try{
      const isBuild=txt.toLowerCase().includes('build')||txt.toLowerCase().includes('website')||txt.toLowerCase().includes('app')||txt.toLowerCase().includes('pos')
      const url=isBuild?'/api/build':'/api/chat'
      const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:txt})})
      const d=await r.json()
      setMsgs(p=>[...p,{role:'assistant',content:d.reply,html:d.html}])
    }catch{ setMsgs(p=>[...p,{role:'assistant',content:'Add GROQ_API_KEY in Vercel > Settings > Env'}])}
    setLoading(false)
  }
  async function hostNow(html){
    const r=await fetch('/api/auto-install',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({html,email:'guest'})})
    const d=await r.json(); alert(d.message||d.url); if(d.url) window.open(d.url)
  }
  return (<>
    <Head><title>INTER AI - Build Apps & Websites</title><link rel="manifest" href="/manifest.json"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"INTER AI","creator":{"@type":"Person","name":"Odera Chidalu Vitalis Vitalis"}})}}/></Head>
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#fff',fontFamily:'Inter,system-ui'}}>
      <div style={{padding:'12px 16px',borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontWeight:900}}>∞ INTER AI</div><div style={{display:'flex',gap:'8px'}}><a href="/register" style={{fontSize:'11px',background:'#111',color:'#fff',padding:'6px 12px',borderRadius:'20px',textDecoration:'none'}}>Register</a><a href="/domains" style={{fontSize:'11px',border:'1px solid #ddd',padding:'6px 12px',borderRadius:'20px',textDecoration:'none',color:'#111'}}>🌐 Buy Domain</a></div></div>
      <div ref={ref} style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'12px'}}>
        {msgs.length===0 && <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}><div style={{fontSize:'42px'}}>∞</div><div style={{fontSize:'26px',fontWeight:900}}>What do you want to build?</div><div style={{fontSize:'12px',color:'#777',marginTop:'6px'}}>Apps, websites — then auto-install & host</div><div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',maxWidth:'400px',marginTop:'18px'}}>{pills.map((p,i)=><button key={i} onClick={()=>send(p)} style={{padding:'10px 14px',borderRadius:'20px',border:'1px solid #e5e5e5',background:'#fafafa',fontSize:'12px'}}>{p}</button>)}</div><button onClick={autoInstall} style={{marginTop:'18px',padding:'10px 16px',borderRadius:'20px',border:'1px dashed #111',background:'#fff',fontSize:'12px'}}>📲 Auto Install INTER AI</button></div>}
        {msgs.map((x,i)=><div key={i} style={{alignSelf:x.role==='user'?'flex-end':'flex-start',maxWidth:'85%'}}><div style={{background:x.role==='user'?'#111':'#f4f4f5',color:x.role==='user'?'#fff':'#111',padding:'12px 16px',borderRadius:'18px',whiteSpace:'pre-wrap',fontSize:'14px'}}>{x.content}</div>{x.html && <><iframe srcDoc={x.html} style={{width:'100%',height:'460px',border:'1px solid #eee',borderRadius:'12px',marginTop:'8px',background:'#fff'}}/><div style={{display:'flex',gap:'6px',marginTop:'6px',flexWrap:'wrap'}}><button onClick={()=>hostNow(x.html)} style={{fontSize:'11px',padding:'6px 10px',background:'#000',color:'#fff',borderRadius:'12px',border:'none'}}>⚡ Auto Host</button><button onClick={autoInstall} style={{fontSize:'11px',padding:'6px 10px',border:'1px solid #ddd',borderRadius:'12px',background:'#fff'}}>📲 Auto Install</button><a href="/domains" style={{fontSize:'11px',padding:'6px 10px',border:'1px solid #ddd',borderRadius:'12px',textDecoration:'none',color:'#111'}}>🌐 ₦20k/₦10k Host</a></div></>}</div>)}
        {loading && <div style={{fontSize:'12px',color:'#999'}}>Building...</div>}
      </div>
      <div style={{padding:'10px',borderTop:'1px solid #eee',display:'flex',gap:'8px'}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Build app, website..." style={{flex:1,padding:'13px 16px',borderRadius:'24px',border:'1px solid #ddd',outline:'none'}}/><button onClick={()=>send()} style={{background:'#000',color:'#fff',border:'none',borderRadius:'50%',width:'44px',height:'44px'}}>↑</button></div>
      <div style={{textAlign:'center',fontSize:'10px',color:'#aaa',padding:'4px'}}>© 2026 INTER AI — ₦20k with domain / ₦10k with own domain</div>
    </div></>
  )
}