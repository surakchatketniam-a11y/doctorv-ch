import React from 'react';
import { BookOpen, Search, Moon, Sun, Coffee, User, Activity, Bookmark, HeartPulse, Calendar, List, Layers } from 'lucide-react';

export default function Navbar({
  theme,
  setTheme,
  onOpenSearch,
  onOpenAuthor,
  onOpenTools,
  onOpenPlan,
  onOpenTOC,
  onOpenDiagrams,
  activeView,
  setActiveView,
  bookmarksCount,
  onOpenBookmarks,
  planCount = 0
}) {
  const toggleTheme = () => {
    if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={19} />;
    if (theme === 'sepia') return <Coffee size={19} />;
    return <Moon size={19} />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'สว่าง';
    if (theme === 'sepia') return 'ซีเปีย';
    return 'มืด';
  };

  return (
    <header className="glass-nav">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '60px',
          paddingTop: '0.4rem',
          paddingBottom: '0.4rem'
        }}
      >
        {/* Brand Logo & Title */}
        <button
          type="button"
          onClick={() => setActiveView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            textAlign: 'left',
            flexShrink: 1,
            minWidth: 0,
            padding: '4px 0',
            background: 'none',
            border: 'none'
          }}
          aria-label="กลับสู่หน้าแรก คลังความรู้สุขภาพหมอวี"
        >
          <div
            className="nav-logo-box"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
              flexShrink: 0
            }}
          >
            <HeartPulse size={22} />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div
              className="nav-title"
              style={{
                fontWeight: '700',
                fontSize: '1.05rem',
                lineHeight: '1.2',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              หมอวี Health Library
            </div>
            <div
              className="nav-subtitle"
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              ก่อนจะป่วย • ก่อนสมองพัง (นพ.วีระพันธ์ สุวรรณนามัย)
            </div>
          </div>
        </button>

        {/* Action Buttons with 44px touch targets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
          <button
            className="btn btn-ghost btn-icon"
            onClick={onOpenTOC}
            title="สารบัญด่วน (เปิดดู 61 บทความทั้งหมด)"
            aria-label="สารบัญด่วน 61 บทความ"
            style={{ color: 'var(--text-primary)' }}
          >
            <List size={19} />
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={onOpenSearch}
            title="ค้นหาบทความข้ามทั้ง 2 เล่ม (Search)"
            aria-label="ค้นหาบทความในคลังความรู้สุขภาพ"
          >
            <Search size={19} />
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={() => onOpenDiagrams && onOpenDiagrams('fast')}
            title="คลังแผนผังทางการแพทย์ & อินโฟกราฟิก (Medical Diagrams Hub)"
            aria-label="คลังแผนผังทางการแพทย์"
            style={{ color: 'var(--book2-color)' }}
          >
            <Layers size={19} />
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={() => onOpenTools('lifestyle')}
            title="เครื่องมือประเมินสุขภาพ (FAST Test / เช็กความเสี่ยง NCDs / สมอง / การนอน)"
            aria-label="เครื่องมือประเมินสุขภาพ 4 หมวด"
            style={{ color: 'var(--accent-primary)' }}
          >
            <Activity size={19} />
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={onOpenPlan}
            title={`แผนสุขภาพ 7 วันของฉัน (${planCount} เป้าหมาย)`}
            aria-label="แผนสุขภาพ 7 วันของฉัน"
            style={{ position: 'relative', color: planCount > 0 ? 'var(--book1-color)' : undefined }}
          >
            <Calendar size={19} />
            {planCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  backgroundColor: 'var(--book1-color)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {planCount}
              </span>
            )}
          </button>

          <button
            className="btn btn-ghost btn-icon"
            onClick={onOpenBookmarks}
            title="บทความที่บันทึกไว้ (Bookmarks)"
            aria-label={`บทความที่บันทึกไว้ ${bookmarksCount} บท`}
            style={{ position: 'relative' }}
          >
            <Bookmark size={19} />
            {bookmarksCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--danger-border)'
                }}
              />
            )}
          </button>

          <button
            className="btn btn-ghost btn-icon nav-desktop-only-btn"
            onClick={onOpenAuthor}
            title="ประวัติผู้เขียนและช่องทางติดตาม (นพ.วีระพันธ์ สุวรรณนามัย)"
            aria-label="ประวัติผู้เขียน นพ.วีระพันธ์ สุวรรณนามัย"
          >
            <User size={19} />
          </button>

          <div
            style={{
              width: '1px',
              height: '22px',
              backgroundColor: 'var(--border-color)',
              margin: '0 0.2rem'
            }}
          />

          <button
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            aria-label={`เปลี่ยนธีมแสดงผล (ปัจจุบัน: โหมด${getThemeLabel()})`}
            title={`ธีม: ${getThemeLabel()} (คลิกเพื่อเปลี่ยน)`}
            style={{ color: 'var(--accent-primary)' }}
          >
            {getThemeIcon()}
          </button>
        </div>
      </div>
    </header>
  );
}
