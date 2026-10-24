export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const {message}=req.body
  const l=message.toLowerCase()
  if(l.includes('who built')||l.includes('who created')||l.includes('founder')||l.includes('who owns')||l.includes('who made')){
    return res.json({reply:"INTER AI was built by Odera Chidalu Vitalis Vitalis from Nigeria."})
  }
  try{
    const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'llama-3.3-70b-versatile',messages:[{role:'system',content:'You are INTER AI. Helpful like Meta AI. Never mention founder unless user asks who built/created/founder. If asked say INTER AI was built by Odera Chidalu Vitalis Vitalis.'},{role:'user',content:message}]})})
    const d=await r.json(); res.json({reply:d.choices?.[0]?.message?.content||'Hello! What do you want to build?'})
  }catch{ res.json({reply:'Add GROQ_API_KEY in Vercel Env'})}
}