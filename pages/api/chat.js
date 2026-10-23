export default async function handler(req, res) {
  const { message } = req.body || {}
  if (!message) return res.status(200).json({ reply: 'Please type something' })

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: message }]
      })
    })
    const data = await r.json()
    console.log(data)
    if (!data.choices) return res.status(200).json({ reply: 'AI Error: ' + JSON.stringify(data) })
    return res.status(200).json({ reply: data.choices[0].message.content })
  } catch (e) {
    return res.status(200).json({ reply: 'Server error: ' + e.message })
  }
}