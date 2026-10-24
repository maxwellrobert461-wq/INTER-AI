export default async function handler(req,res){
  const {domain}=req.body
  const available=domain.length>5
  res.json({domain,available})
}