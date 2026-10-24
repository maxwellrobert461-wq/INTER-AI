export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const {message}=req.body
  const l=message.toLowerCase()
  if(l.includes('who built')||l.includes('founder')) return res.json({reply:"INTER AI was built by Odera Chidalu Vitalis Vitalis.",html:"<h1>Built by Odera Chidalu Vitalis Vitalis</h1>"})
  try{
    const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'llama-3.3-70b-versatile',messages:[{role:'system',content:'Generate complete single-file HTML app with Tailwind CDN. Output ONLY HTML starting <!DOCTYPE html>. Fully working.'},{role:'user',content:message}],temperature:0.7})})
    const d=await r.json(); let html=d.choices?.[0]?.message?.content||'<h1>Error</h1>'; html=html.replace(/```html|```/g,'')
    res.json({reply:`Built: ${message}`,html})
  }catch{ res.json({reply:'Build error',html:'<h1>Build failed - check GROQ key</h1>'})}
}