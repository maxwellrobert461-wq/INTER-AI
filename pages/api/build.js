import { mastra } from '../../src/mastra';
export default async function handler(req,res){
  const { message } = req.body || {};
  if(!message) return res.json({ reply: 'Type what to build', html: '<h1>Type what to build</h1>' });
  if(!process.env.GROQ_API_KEY) return res.json({ reply: 'Add GROQ_API_KEY in Vercel > Settings > Env > Redeploy', html: '<div style="padding:40px;font-family:sans-serif"><h1>Add GROQ_API_KEY</h1><p>Get from console.groq.com/keys</p></div>' });
  try{
    const agent = mastra.getAgent('builderAgent');
    const r = await agent.generate(message + ' - Build full HTML app, return only HTML');
    let html = r.text.replace(/```html|```/g,'').trim();
    if(!html.includes('<!DOCTYPE')) html = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><script src="https://cdn.tailwindcss.com"></script></head><body>${html}</body></html>`;
    res.json({ reply: `✅ Built: ${message}`, html });
  }catch(e){ res.json({ reply: 'Error: '+e.message, html: `<h1>${e.message}</h1>` }); }
}