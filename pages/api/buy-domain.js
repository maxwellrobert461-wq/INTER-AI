export default async function handler(req,res){
  const {domain,hasOwnDomain}=req.body
  const price=hasOwnDomain?10000:20000
  res.json({message:`${domain} — Pay ₦${price} — Add Paystack key to enable payment`,price})
}