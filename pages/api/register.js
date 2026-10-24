import { put } from '@vercel/blob'
export async function config(){ return {api:{bodyParser:false}}}
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  try{
    const formData=await req.formData()
    const email=formData.get('email'); const idType=formData.get('idType'); const file=formData.get('file')
    if(!email||!file) return res.status(400).json({message:'Email + ID needed'})
    const blob=await put(`kyc/${email}-${Date.now()}-${file.name}`, file, {access:'public'})
    console.log('KYC:',email,idType,blob.url)
    res.json({ok:true,message:'ID received! Approved. Now buy domain.',url:blob.url})
  }catch(e){ console.log(e); res.status(500).json({message:'Create Blob Store in Vercel → Storage → Create'})}
}