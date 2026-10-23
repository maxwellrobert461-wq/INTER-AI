export default async function handler(req, res) {
  const { message } = req.body || {}
  if (!message) return res.json({ reply: "Ask me anything..." })
  
  try {
    const key = process.env.GROQ_API_KEY || req.body.groqKey
    if (!key) return res.json({ reply: "⚠️ Add GROQ_API_KEY in Vercel Settings → Environment Variables. Go to console.groq.com/keys to get free key." })
    
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are Meta AI, built by INTER AI PLATFORM. You are helpful, friendly, concise, like Meta AI. You can create apps when asked. If asked to create app, return full HTML code.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    })
    const data = await r.json()
    if (data.error) return res.json({ reply: "Error: " + data.error.message + " — Check GROQ key" })
    return res.json({ reply: data.choices[0].message.content })
  } catch (e) {
    return res.json({ reply: "Server error: " + e.message })
  }
}