import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Sparkles } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed as PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) return;

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('dr_v_pwa_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
      return; // Dismissed within 7 days
    }

    // Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !/crios|fxios|opios/.test(ua);
    if (isIosDevice) {
      setIsIOS(true);
      // Wait 3 seconds before showing gentle tip
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('dr_v_pwa_dismissed', Date.now().toString());
    } catch {}
  };

  if (!showBanner) return null;

  return (
    <aside
      className="pwa-install-banner"
      aria-label="ติดตั้งแอปพลิเคชันหมอวี"
      style={{
        position: 'fixed',
        bottom: '72px', // positioned comfortably above mobile bottom nav
        left: '12px',
        right: '12px',
        maxWidth: '480px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        border: '1.5px solid var(--accent-primary)',
        borderRadius: '16px',
        padding: '0.85rem 1rem',
        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
        zIndex: 89,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
        <img
          src="/icons/icon-192.png"
          alt="หมอวี Health"
          style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3 }}>
            ติดตั้งแอปหมอวี Health
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.3, marginTop: '2px' }}>
            {isIOS ? 'แตะปุ่มแชร์ ⎋ แล้วเลือก "เพิ่มไปยังหน้าจอโฮม"' : 'เปิดอ่านเต็มตา & บันทึกอ่านออฟไลน์ได้'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
        {!isIOS && deferredPrompt && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleInstallClick}
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.8rem',
              borderRadius: '10px',
              minHeight: '34px',
              gap: '0.3rem'
            }}
          >
            <Download size={14} />
            <span>ติดตั้ง</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="btn btn-ghost btn-icon"
          aria-label="ปิดการแจ้งเตือนติดตั้งแอป"
          style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
