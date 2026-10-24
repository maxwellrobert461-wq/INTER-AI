import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Load theme from settings.js
    const savedTheme = localStorage.getItem('inter_theme') || 'light'
    setTheme(savedTheme)
    document.body.style.background = savedTheme === 'dark' ? '#111' : '#fff'
    document.body.style.color = savedTheme === 'dark' ? '#fff' : '#111'

    // PWA Auto-Install Listener
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      console.log('INTER AI ready to auto-install')
      // Auto show install after 3 secs (like Meta AI)
      setTimeout(() => {
        if (!window.matchMedia('(display-mode: standalone)').matches) {
          console.log('Auto-install prompt available')
        }
      }, 3000)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
      localStorage.setItem('inter_installed', 'true')
      console.log('INTER AI installed!')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)

    // Register SW for auto-install offline
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('SW registered - auto-install ready')
      })
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  // Global auto-install function
  const triggerInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const choice = await installPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setIsInstalled(true)
      }
      setInstallPrompt(null)
    } else {
      // Manual guide for iPhone
      alert('To install INTER AI:\n\niPhone: Tap Share → Add to Home Screen\nAndroid: Tap ⋮ → Install app\n\nThen it works like Meta AI app!')
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Auto-Install Banner - Shows if not installed */}
      {!isInstalled && installPrompt && (
        <div style={{
          position: 'fixed', bottom: '70px', left: '12px', right: '12px',
          background: theme === 'dark' ? '#fff' : '#111',
          color: theme === 'dark' ? '#111' : '#fff',
          padding: '12px 16px', borderRadius: '14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 9999, boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{fontSize:'13px'}}><b>📲 Install INTER AI</b><br/><span style={{fontSize:'11px',opacity:0.8}}>Build apps offline - like Meta AI</span></div>
          <button onClick={triggerInstall} style={{background: theme==='dark'?'#111':'#fff', color: theme==='dark'?'#fff':'#111', border:'none', padding:'8px 14px', borderRadius:'20px', fontWeight:700, fontSize:'12px'}}>Install</button>
        </div>
      )}

      <Component {...pageProps} triggerInstall={triggerInstall} isInstalled={isInstalled} theme={theme} />
    </>
  )
}