import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('App instalada por el usuario');
      }
      setDeferredPrompt(null);
    });
  };

  if (!deferredPrompt) return null;
  return (
    <button onClick={installApp} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
      Instalar aplicación
    </button>
  );
}
