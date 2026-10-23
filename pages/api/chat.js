export default async function handler(req, res) {
  const { message, groqKey } = req.body || {}
  const key = process.env.GROQ_API_KEY || groqKey
  if (!key) return res.json({ reply: "⚠️ Add GROQ key in /settings" })

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { 
            role: 'system', 
            content: `You are INTER AI created by Oderah Chidalu Vitalis Vitalis. You are a BUILDER, not a questioner.

RULES:
1. When user says "Create an app", "Create calculator", "Build todo" — NEVER ask questions. IMMEDIATELY BUILD IT.
2. Always return COMPLETE single HTML file with <html><style><body> all inline. No external links.
3. Design must be MODERN, beautiful like Meta AI, Apple style, dark/light, animations.
4. App must WORK — full JavaScript functionality.
5. If user says "Create an app" with no details — CREATE a cool demo app yourself: e.g., Finance tracker, or Social app, or Game.
6. Keep explanation SHORT — Then give code. Say "Here's your app built by INTER AI!"

You BUILD, you don't interview.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.8
      })
    })
    const d = await r.json()
    if (d.error) return res.json({ reply: "Error: " + d.error.message + " — Check GROQ key in /settings" })
    return res.json({ reply: d.choices[0].message.content })
  } catch (e) {
    return res.json({ reply: "Error: " + e.message })
  }
}