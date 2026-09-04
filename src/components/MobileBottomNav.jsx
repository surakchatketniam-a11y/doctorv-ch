import React from 'react';
import { Home, List, Layers, Calendar, Search } from 'lucide-react';

export default function MobileBottomNav({
  activeView,
  onGoHome,
  onOpenTOC,
  onOpenDiagrams,
  onOpenPlan,
  onOpenSearch,
  planCount = 0
}) {
  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="เมนูหลักบนมือถือ"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-color)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)',
        paddingTop: '6px',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
      }}
    >
      {/* 1. Home */}
      <button
        type="button"
        onClick={onGoHome}
        className="mobile-nav-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          color: activeView === 'home' ? 'var(--accent-primary)' : 'var(--text-muted)',
          flex: 1
        }}
      >
        <Home size={20} strokeWidth={activeView === 'home' ? 2.5 : 1.8} />
        <span style={{ fontSize: '0.6875rem', fontWeight: activeView === 'home' ? '700' : '500' }}>หน้าแรก</span>
      </button>

      {/* 2. TOC */}
      <button
        type="button"
        onClick={onOpenTOC}
        className="mobile-nav-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          flex: 1
        }}
      >
        <List size={20} strokeWidth={1.8} />
        <span style={{ fontSize: '0.6875rem', fontWeight: '500' }}>สารบัญ</span>
      </button>

      {/* 3. Medical Diagrams */}
      <button
        type="button"
        onClick={() => onOpenDiagrams && onOpenDiagrams('fast')}
        className="mobile-nav-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          color: 'var(--book2-color)',
          flex: 1
        }}
      >
        <Layers size={20} strokeWidth={1.8} />
        <span style={{ fontSize: '0.6875rem', fontWeight: '500' }}>แผนผัง</span>
      </button>

      {/* 4. Plan 7 Day */}
      <button
        type="button"
        onClick={onOpenPlan}
        className="mobile-nav-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          color: planCount > 0 ? 'var(--book1-color)' : 'var(--text-muted)',
          position: 'relative',
          flex: 1
        }}
      >
        <div style={{ position: 'relative' }}>
          <Calendar size={20} strokeWidth={1.8} />
          {planCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-6px',
                backgroundColor: 'var(--book1-color)',
                color: '#ffffff',
                fontSize: '0.6rem',
                fontWeight: '800',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {planCount}
            </span>
          )}
        </div>
        <span style={{ fontSize: '0.6875rem', fontWeight: '500' }}>แผน 7 วัน</span>
      </button>

      {/* 5. Search */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="mobile-nav-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          flex: 1
        }}
      >
        <Search size={20} strokeWidth={1.8} />
        <span style={{ fontSize: '0.6875rem', fontWeight: '500' }}>ค้นหา</span>
      </button>
    </nav>
  );
}
