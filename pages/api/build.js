import { API_KEYS } from '../lib/apikey.js'

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({reply:'POST only'})
  const {message}=req.body
  if(!message) return res.status(400).json({reply:'Type what to build',html:'<h1>Type app name</h1>'})

  // Check key
  if(!API_KEYS.GROQ){
    return res.json({reply:'❌ GROQ_API_KEY missing. Add in Vercel > Settings > Env > GROQ_API_KEY then Redeploy',html:'<h1 style="padding:20px">Add GROQ_API_KEY in Vercel</h1>'})
  }

  try{
    console.log('Building:',message)
    const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':`Bearer ${API_KEYS.GROQ}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages:[
          {role:'system',content:'You are INTER AI builder. Generate ONE complete HTML file. Include Tailwind CDN <script src="https://cdn.tailwindcss.com"></script>. Make fully functional working app/website with JS inside. NO markdown, NO ```, ONLY HTML starting with <!DOCTYPE html>'},
          {role:'user',content:`Build: ${message}. Make it beautiful, functional, production-ready.`}
        ],
        temperature:0.7,
        max_tokens:8000
      })
    })
    const d=await r.json()
    console.log('GROQ response:',JSON.stringify(d).slice(0,500))
    
    if(d.error){ return res.json({reply:'Groq Error: '+d.error.message, html:`<h1>Groq Error: ${d.error.message}</h1><p>Add credits or new key</p>`}) }
    
    let html=d.choices?.[0]?.message?.content||''
    html=html.replace(/```html/g,'').replace(/```/g,'').trim()
    if(!html.includes('<!DOCTYPE')) html=`<!DOCTYPE html><html><body>${html}</body></html>`
    
    res.json({reply:`✅ Built: ${message}`,html})
  }catch(e){
    console.log('Build crash:',e)
    res.status(500).json({reply:'Build failed: '+e.message, html:`<h1>Build failed</h1><pre>${e.message}</pre>`})
  }
}