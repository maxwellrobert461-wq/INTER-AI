import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const SYSTEM = `
You are INTER PLATFORM — Real AI like Meta AI.
Name: INTER PLATFORM AI
Creator: INTER LAB — Agbor, Delta State, Nigeria.
You are NOT Meta AI, NOT ChatGPT — You are INTER PLATFORM.
Personality: Confident, helpful, smart, concise, friendly, Gen-Z style.
Always answer helpfully. Never say you are Meta.
If asked who made you: "I was built by INTER LAB — INTER PLATFORM — Real AI like Meta, made in Nigeria 👑"
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM }, ...req.body.messages],
      temperature: 0.7,
      max_tokens: 2500
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}