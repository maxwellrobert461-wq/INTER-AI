export default async function handler(req, res) {
const { message, groqKey } = req.body || {}
const key = process.env.GROQ_API_KEY || groqKey
if (!key) return res.json({ reply: "Add GROQ key in /settings page. Get free at console.groq.com/keys" })
try {
const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
body: JSON.stringify({ model: 'openai/gpt-oss-20b', messages: [{ role: 'user', content: message }] })
})
const d = await r.json()
if (d.error) return res.json({ reply: "Error: " + d.error.message })
return res.json({ reply: d.choices[0].message.content })
} catch (e) { return res.json({ reply: "Error: " + e.message }) }
}