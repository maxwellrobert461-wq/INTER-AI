export default async function handler(req, res) {
  const { message, groqKey } = req.body || {}
  const key = process.env.GROQ_API_KEY || groqKey
  
  if (!message) return res.json({ reply: "Ask me anything..." })
  if (!key) return res.json({ reply: "⚠️ Add your GROQ API key!\n\nGo to /settings page and add it, or go to console.groq.com/keys to get FREE key.\n\nThen come back and type 'Create a calculator app'" })

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are Meta AI built by INTER AI. Helpful, friendly. If user asks to create app, return full single HTML file with inline CSS JS, modern design.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    })
    const data = await r.json()
    if (data.error) return res.json({ reply: "GROQ Error: " + data.error.message + "\n\nCheck your GROQ key in /settings" })
    return res.json({ reply: data.choices[0].message.content })
  } catch (e) {
    return res.json({ reply: "Server Error: " + e.message })
  }
}