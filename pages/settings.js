import { useState, useEffect } from 'react'

export default function Settings(){
  const [email,setEmail]=useState(''); const [hasDomain,setHasDomain]=useState(false); const [theme,setTheme]=useState('light'); const [kyc,setKyc]=useState('Not Verified')
  
  useEffect(()=>{
    const savedEmail=localStorage.getItem('inter_email')||''; setEmail(savedEmail)
    const savedKyc=localStorage.getItem('inter_kyc')||'Not Verified'; setKyc(savedKyc)
    const savedTheme=localStorage.getItem('inter_theme')||'light'; setTheme(savedTheme)
  },[])

  function save(){
    localStorage.setItem('inter_email',email); localStorage.setItem('inter_theme',theme)
    alert('Settings saved!')
  }

  function clearData(){
    if(confirm('Delete all your data? ID + builds?')){ localStorage.clear(); alert('Deleted — Re-register to continue'); window.location='/register' }
  }

  return (
    <div style={{maxWidth:'480px',margin:'0 auto',padding:'20px',fontFamily:'Inter,system-ui',background:theme==='dark'?'#111':'#fff',color:theme==='dark'?'#fff':'#111',minHeight:'100vh'}}>
      <a href="/" style={{textDecoration:'none',color:theme==='dark'?'#fff':'#111'}}>← Home</a>
      <h1 style={{marginTop:'12px'}}>⚙ Settings</h1>

      <div style={{marginTop:'20px',padding:'16px',border:'1px solid #eee',borderRadius:'12px',background:theme==='dark'?'#1a1a1a':'#fafafa'}}>
        <h3 style={{margin:'0 0 8px 0',fontSize:'14px'}}>👤 Account — ID + Email</h3>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid #ddd',marginTop:'6px'}}/>
        <div style={{marginTop:'10px',fontSize:'12px'}}>KYC Status: <b style={{color:kyc==='Verified'?'green':'orange'}}>{kyc}</b></div>
        <div style={{marginTop:'8px',fontSize:'11px',color:'#888'}}>ID stored in Vercel Blob secure. Delete anytime.</div>
        <a href="/register" style={{display:'inline-block',marginTop:'10px',fontSize:'12px',padding:'8px 12px',background:'#000',color:'#fff',borderRadius:'8px',textDecoration:'none'}}>Re-upload ID Card</a>
      </div>

      <div style={{marginTop:'16px',padding:'16px',border:'1px solid #eee',borderRadius:'12px',background:theme==='dark'?'#1a1a1a':'#fafafa'}}>
        <h3 style={{margin:'0 0 8px 0',fontSize:'14px'}}>💳 Subscription — Pricing</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'8px'}}>
          <label style={{display:'flex',gap:'8px',fontSize:'13px'}}><input type="radio" checked={!hasDomain} onChange={()=>setHasDomain(false)}/> No domain — Pay ₦20,000/month (domain + hosting + unlimited builds)</label>
          <label style={{display:'flex',gap:'8px',fontSize:'13px'}}><input type="radio" checked={hasDomain} onChange={()=>setHasDomain(true)}/> I have domain — Pay ₦10,000/month (hosting only)</label>
        </div>
        <div style={{marginTop:'10px',fontSize:'12px',fontWeight:700}}>Current: {hasDomain?'₦10k/month':'₦20k/month'}</div>
        <a href="/domains" style={{display:'inline-block',marginTop:'10px',fontSize:'12px',padding:'8px 12px',border:'1px solid #ddd',borderRadius:'8px',textDecoration:'none',color:theme==='dark'?'#fff':'#111'}}>Manage Domains</a>
      </div>

      <div style={{marginTop:'16px',padding:'16px',border:'1px solid #eee',borderRadius:'12px',background:theme==='dark'?'#1a1a1a':'#fafafa'}}>
        <h3 style={{margin:'0 0 8px 0',fontSize:'14px'}}>📲 Auto-Install</h3>
        <div style={{fontSize:'12px',color:'#666'}}>INTER AI installs like Meta AI / ChatGPT app</div>
        <button onClick={()=>{ if('serviceWorker' in navigator){ alert('Auto-install enabled! Use Share → Add to Home Screen'); } }} style={{marginTop:'10px',padding:'8px 12px',borderRadius:'8px',border:'1px solid #ddd',background:'#fff',fontSize:'12px'}}>Enable Auto-Install</button>
      </div>

      <div style={{marginTop:'16px',padding:'16px',border:'1px solid #eee',borderRadius:'12px',background:theme==='dark'?'#1a1a1a':'#fafafa'}}>
        <h3 style={{margin:'0 0 8px 0',fontSize:'14px'}}>🎨 Appearance</h3>
        <select value={theme} onChange={e=>setTheme(e.target.value)} style={{padding:'10px',borderRadius:'8px',border:'1px solid #ddd',width:'100%'}}><option value="light">Light</option><option value="dark">Dark</option></select>
      </div>

      <div style={{marginTop:'16px',padding:'16px',border:'1px solid #fee',borderRadius:'12px',background:'#fff5f5'}}>
        <h3 style={{margin:'0 0 8px 0',fontSize:'14px',color:'#a00'}}>⚠ Danger Zone</h3>
        <button onClick={clearData} style={{padding:'8px 12px',background:'#c00',color:'#fff',border:'none',borderRadius:'8px',fontSize:'12px'}}>Delete ID & Account Data</button>
        <div style={{fontSize:'10px',color:'#888',marginTop:'8px'}}>Deletes email + local builds. Blob files deleted manually in Vercel Dashboard → Storage → Blob</div>
      </div>

      <button onClick={save} style={{marginTop:'20px',width:'100%',padding:'12px',background:'#000',color:'#fff',border:'none',borderRadius:'10px',fontWeight:700}}>Save Settings</button>

      <div style={{textAlign:'center',fontSize:'10px',color:'#aaa',marginTop:'16px'}}>© 2026 INTER AI — Built by Odera Chidalu Vitalis Vitalis (hidden until asked)<br/>GitHub + Vercel only</div>
    </div>
  )
}