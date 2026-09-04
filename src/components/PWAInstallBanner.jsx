import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. If user already recorded as installed, do not show
    if (localStorage.getItem('dr_v_pwa_installed') === 'true') {
      return;
    }

    // 2. If user previously dismissed, do not show
    if (localStorage.getItem('dr_v_pwa_dismissed')) {
      return;
    }

    // 3. Check if currently running in standalone mode (already installed & opened as PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      try {
        localStorage.setItem('dr_v_pwa_installed', 'true');
      } catch {}
      return;
    }

    // 4. Listen for browser native 'appinstalled' event
    const handleAppInstalled = () => {
      try {
        localStorage.setItem('dr_v_pwa_installed', 'true');
      } catch {}
      setShowBanner(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    // 5. Android / Chrome beforeinstallprompt event ONLY
    // NOTE: On iOS, we NEVER auto-popup unprompted banners as iOS does not support one-click prompt API
    // and auto-popups cause severe user annoyance.
    const handleBeforeInstallPrompt = (e) => {
      // Double check in case user dismissed or installed while page was loading
      if (
        localStorage.getItem('dr_v_pwa_installed') === 'true' ||
        localStorage.getItem('dr_v_pwa_dismissed')
      ) {
        return;
      }
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        try {
          localStorage.setItem('dr_v_pwa_installed', 'true');
        } catch {}
        setShowBanner(false);
      }
    } catch (err) {
      console.error('PWA install error:', err);
    }
    setDeferredPrompt(null);
  };

  const handleAlreadyInstalled = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('dr_v_pwa_installed', 'true');
    } catch {}
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('dr_v_pwa_dismissed', 'true');
    } catch {}
  };

  if (!showBanner) return null;

  return (
    <aside
      className="pwa-install-banner"
      aria-label="ติดตั้งแอปพลิเคชันหมอวี"
      style={{
        position: 'fixed',
        bottom: '72px',
        left: '12px',
        right: '12px',
        maxWidth: '480px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        border: '1.5px solid var(--accent-primary)',
        borderRadius: '16px',
        padding: '0.75rem 1rem',
        boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
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
            เปิดอ่านเต็มตา & บันทึกอ่านออฟไลน์ได้
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
        {deferredPrompt && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleInstallClick}
            style={{
              padding: '0.4rem 0.75rem',
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
          onClick={handleAlreadyInstalled}
          className="btn btn-ghost"
          title="ฉันติดตั้งแอปนี้แล้ว ไม่ต้องแสดงอีก"
          style={{
            fontSize: '0.75rem',
            padding: '0.35rem 0.5rem',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap'
          }}
        >
          ติดตั้งแล้ว
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="btn btn-ghost btn-icon"
          aria-label="ปิดการแจ้งเตือนติดตั้งแอปถาวร"
          title="ปิดและไม่ต้องเตือนอีก"
          style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
