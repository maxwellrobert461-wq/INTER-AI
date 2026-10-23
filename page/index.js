import { useState, useRef, useEffect } from 'react';

export default function InterPlatform() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to INTER PLATFORM 👑\n\nI am INTER AI — Real AI like Meta AI. Built by INTER LAB Nigeria.\n\nFREE: 10 chats/day. PRO: ₦2000/month unlimited.\n\nAsk me anything — school, code, business, life.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const endRef = useRef(null);
  const FREE_LIMIT = 10;
  const AD_EVERY = 4;

  useEffect(() => {
    const c = localStorage.getItem('inter_chat_count');
    const p = localStorage.getItem('inter_pro');
    if (c) setChatCount(parseInt(c));
    if (p === 'true') setIsPro(true);
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    if (!isPro && chatCount >= FREE_LIMIT) {
      setMessages(m => [...m, { role: 'assistant', content: `🔒 FREE LIMIT REACHED\n\nPay ₦2000 for INTER PRO to continue.\n\nLink: https://paystack.com/pay/inter-pro\n\nAfter payment, click UNLOCK PRO.` }]);
      return;
    }
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, userMsg] }) });
      const d = await res.json();
      let newMsgs = [...messages, userMsg, { role: 'assistant', content: d.reply || d.error }];
      const newCount = chatCount + 1;
      if (newCount % AD_EVERY === 0 && !isPro) newMsgs.push({ role: 'ad', content: 'AD' });
      setMessages(newMsgs);
      setChatCount(newCount);
      localStorage.setItem('inter_chat_count', newCount.toString());
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + e.message }]);
    }
    setLoading(false);
  }

  function unlockPro() {
    setIsPro(true);
    localStorage.setItem('inter_pro', 'true');
    setMessages(m => [...m, { role: 'assistant', content: '✅ PRO UNLOCKED 👑 — Unlimited chats active!' }]);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="bg-yellow-400 text-black text-center text-[11px] py-1.5 font-bold">INTER PRO ₦2k — <button onClick={unlockPro} className="underline">UNLOCK</button> • Ad: Build your AI app with INTER LAB</div>
      <div className="sticky top-0 bg-black/90 backdrop-blur border-b border-zinc-800 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-black">I</div><div><h1 className="font-black text-[13px]">INTER PLATFORM</h1><p className="text-[9px] text-zinc-500">{isPro ? 'PRO 👑' : `${FREE_LIMIT - chatCount} free left`}</p></div></div>
        <button onClick={unlockPro} className="text-[10px] bg-white text-black px-3 py-1.5 rounded-full font-bold">{isPro ? 'PRO ✓' : 'Go PRO'}</button>
      </div>
      <div className="flex-1 overflow-auto"><div className="max-w-[750px] mx-auto p-4 space-y-4 pb-32">
        {messages.map((m, i) => m.role === 'ad' ? (
          <div key={i} className="bg-[#111] border border-zinc-800 rounded-2xl p-3"><p className="text-[9px] text-zinc-500">Sponsored</p><p className="text-sm font-bold">Want your own AI like Meta? 🚀 ₦50k</p><p className="text-xs text-zinc-400">We build AI for schools/businesses</p><div className="mt-2 h-[60px] bg-zinc-900 rounded flex items-center justify-center text-[10px] text-zinc-600">Your AdSense Ad Here</div></div>
        ) : (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-[18px] text-[14px] whitespace-pre-wrap ${m.role === 'user' ? 'bg-white text-black rounded-br-[4px]' : 'bg-zinc-900 border border-zinc-800 rounded-bl-[4px]'}`}>{m.content}</div></div>
        ))}
        {loading && <div className="text-xs text-zinc-500 animate-pulse">INTER typing...</div>}<div ref={endRef} />
      </div></div>
      <div className="fixed bottom-0 w-full bg-[#0a0a0a] border-t border-zinc-800 p-3"><div className="max-w-[750px] mx-auto flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask INTER PLATFORM..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3.5 text-sm focus:outline-none" /><button onClick={send} className="bg-white text-black rounded-full w-[48px] h-[48px] font-black">↑</button></div></div>
    </div>
  );
}