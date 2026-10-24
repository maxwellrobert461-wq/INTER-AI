import { useEffect, useState } from 'react'
export default function App({ Component, pageProps }){
  const [prompt,setPrompt]=useState(null)
  useEffect(()=>{
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();setPrompt(e)})
    if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{})
  },[])
  const install=()=>{if(prompt) prompt.prompt()}
  return <><Component {...pageProps} install={install} hasPrompt={!!prompt} /></>
}