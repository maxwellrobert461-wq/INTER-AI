export default async function handler(req, res) {
  const { message, groqKey } = req.body || {}
  const key = process.env.GROQ_API_KEY || groqKey
  
  if (!message) return res.json({ reply: "Ask me..." })
  if (!key) return res.json({ reply: "⚠️ Add GROQ key in /settings page. Get free at console.groq.com/keys" })

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: 'You are Meta AI by INTER AI. Helpful, friendly. If user asks to create app, return complete single HTML file with inline CSS/JS, modern Meta-style design.' },
          { role: 'user', content: message }
        ]
      })
    })
    const data = await r.json()
    console.log(data)
    if (data.error) return res.json({ reply: "Error: " + data.error.message })
    return res.json({ reply: data.choices[0].message.content })
  } catch (e) {
    return res.json({ reply: "Error: " + e.message })
  }
}