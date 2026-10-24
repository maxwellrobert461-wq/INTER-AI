export default function handler(req,res){
  const { domain, plan } = req.body || {};
  const price = plan === 'own' ? 10000 : 20000;
  res.json({ ok: true, price, domain, message: `Pay ₦${price} for ${domain}`, paystackUrl: `https://paystack.com/pay/inter-ai-${price}` });
}