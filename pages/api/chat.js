import { mastra } from '../../src/mastra';
export default async function handler(req,res){
  const { message } = req.body || {};
  try{
    const agent = mastra.getAgent('builderAgent');
    const r = await agent.generate(message);
    res.json({ reply: r.text });
  }catch(e){ res.json({ reply: 'What do you want to build? Ex: Build calculator' }); }
}