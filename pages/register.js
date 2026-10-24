import { useState } from 'react'
export default function Register(){
  const [email,setEmail]=useState(''); const [idType,setIdType]=useState('NIN'); const [file,setFile]=useState(null); const [loading,setLoading]=useState(false)
  async function submit(){
    if(!email||!file){ alert('Email + ID card required'); return }
    setLoading(true)
    const fd=new FormData(); fd.append('email',email); fd.append('idType',idType); fd.append('file',file)
    const r=await fetch('/api/register',{method:'POST',body:fd}); const d=await r.json()
    alert(d.message); if(d.ok) window.location='/domains'; setLoading(false)
  }
  return (<div style={{maxWidth:'400px',margin:'30px auto',padding:'20px',fontFamily:'sans-serif'}}><a href="/">← Home</a><h2>Register with ID</h2><p style={{fontSize:'13px',color:'#666'}}>Email + ID card required to buy domain/host (₦20k with domain, ₦10k if you have domain)</p><div style={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'16px'}}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{padding:'12px',borderRadius:'10px',border:'1px solid #ddd'}}/><select value={idType} onChange={e=>setIdType(e.target.value)} style={{padding:'12px',borderRadius:'10px',border:'1px solid #ddd'}}><option>NIN</option><option>Driver License</option><option>Voter Card</option><option>Passport</option></select><input type="file" accept="image/*,.pdf" onChange={e=>setFile(e.target.files[0])}/><div style={{fontSize:'11px',color:'#888'}}>Stored in Vercel Blob secure. No Supabase.</div><button onClick={submit} style={{padding:'12px',background:'#000',color:'#fff',border:'none',borderRadius:'10px',fontWeight:700}}>{loading?'Uploading...':'Verify & Continue'}</button></div>)
}