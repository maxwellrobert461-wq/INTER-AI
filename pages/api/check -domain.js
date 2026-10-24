export default function handler(req,res){
  const { domain } = req.query;
  if(!domain) return res.json({ available: false });
  const taken = ['google.com','facebook.com','inter.com'];
  const available = !taken.includes(domain.toLowerCase());
  res.json({ domain, available, price: domain.endsWith('.com') ? 12000 : 8500 });
}