import { put } from '@vercel/blob'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const {html}=req.body
  try{
    const blob=await put(`sites/${Date.now()}.html`, html, {access:'public',contentType:'text/html'})
    res.json({ok:true,url:blob.url,message:'Auto-installed live: '+blob.url})
  }catch(e){ res.status(500).json({message:'Enable Vercel Blob Store'})}
}