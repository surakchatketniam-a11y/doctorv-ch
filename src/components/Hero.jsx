import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  User,
  HeartPulse,
  Brain,
  CheckCircle2,
  ChevronRight,
  Activity,
  ArrowRight,
  ShieldAlert,
  HeartHandshake,
  Calendar,
  AlertTriangle,
  Search,
  X,
  Clock,
  Layers
} from 'lucide-react';
import booksData from '../data/books.json';
import allChaptersData from '../data/all_chapters.json';

export default function Hero({
  onStartReadingBook,
  onOpenAuthor,
  onOpenTools,
  onOpenPlan,
  onOpenSearch,
  onSelectChapter,
  onScrollToChapters,
  onOpenDiagrams
}) {
  const book1 = booksData.find((b) => b.id === 'book1') || booksData[0];
  const book2 = booksData.find((b) => b.id === 'book2') || booksData[1];

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastRead, setLastRead] = useState(null);
  const [dismissedLastRead, setDismissedLastRead] = useState(false);
  const searchContainerRef = useRef(null);

  // Load last read chapter from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dr_v_last_read');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.chapterId && parsed.title) {
          setLastRead(parsed);
        }
      }
    } catch {}
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter live search preview
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allChaptersData
      .filter((chap) => {
        const inTitle = chap.title.toLowerCase().includes(q);
        const inSummary = chap.summary && chap.summary.toLowerCase().includes(q);
        const inPart = chap.partTitle && chap.partTitle.toLowerCase().includes(q);
        return inTitle || inSummary || inPart;
      })
      .slice(0, 5);
  }, [searchQuery]);

  const totalMatchesCount = React.useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const q = searchQuery.toLowerCase().trim();
    return allChaptersData.filter((chap) => {
      const inTitle = chap.title.toLowerCase().includes(q);
      const inSummary = chap.summary && chap.summary.toLowerCase().includes(q);
      const inPart = chap.partTitle && chap.partTitle.toLowerCase().includes(q);
      return inTitle || inSummary || inPart;
    }).length;
  }, [searchQuery]);

  const handleSelectResult = (chapterId) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    if (onSelectChapter) {
      onSelectChapter(chapterId);
    }
  };

  const handleFullSearch = () => {
    setIsDropdownOpen(false);
    onOpenSearch(searchQuery);
  };

  return (
    <section style={{ padding: '2.5rem 0 2rem 0', position: 'relative' }}>
      <div className="container">
        {/* Main Portal Headline */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <div
            className="badge badge-primary"
            style={{ marginBottom: '1rem', padding: '0.4rem 1rem', gap: '0.5rem', fontSize: '0.875rem' }}
          >
            <Sparkles size={16} />
            <span>คลังความรู้สุขภาพองค์รวมและโรคสมอง — เปิดให้อ่านฟรีเป็นวิทยาทาน</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}
          >
            Your Friend is a Doctor
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: '600',
                color: 'var(--accent-primary)',
                marginTop: '0.4rem'
              }}
            >
              มีเพื่อนเป็นหมอ • นพ.วีระพันธ์ สุวรรณนามัย
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            รวม 2 ผลงานเขียนทรงคุณค่าฉบับสมบูรณ์ เพื่อการดูแลสุขภาพเชิงป้องกัน (Lifestyle Medicine) และสุขภาพสมองและระบบประสาท พร้อมเครื่องมือประเมินสุขภาพตนเองเบื้องต้น
          </p>

          {/* Quick Doctor Quote Box */}
          <div
            style={{
              backgroundColor: 'var(--quote-bg)',
              border: '1px solid var(--quote-border)',
              borderRadius: '16px',
              padding: '1rem 1.5rem',
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              textAlign: 'left',
              maxWidth: '640px'
            }}
          >
            <img
              src="/images/doctorv1.jpg"
              alt="นพ.วีระพันธ์ สุวรรณนามัย"
              loading="lazy"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--quote-border)',
                flexShrink: 0
              }}
            />
            <div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-primary)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                "สุขภาพที่ดีไม่ใช่เรื่องบังเอิญ แต่คือผลลัพธ์ของสิ่งที่เราทำซ้ำๆ ทุกวันก่อนที่จะป่วย"
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                — นพ.วีระพันธ์ สุวรรณนามัย (ประสาทศัลยแพทย์)
              </span>
            </div>
          </div>
        </div>

        {/* Continue Reading Card (Visible when user has an active reading session) */}
        {lastRead && !dismissedLastRead && lastRead.progress > 0 && lastRead.progress < 98 && (
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto 2rem auto',
              backgroundColor: 'var(--bg-secondary)',
              border: '1.5px solid var(--accent-primary)',
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              boxShadow: '0 8px 24px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0, flex: 1 }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: lastRead.bookId === 'book2' ? 'rgba(37,99,235,0.12)' : 'rgba(5,150,105,0.12)',
                  color: lastRead.bookId === 'book2' ? 'var(--book2-color)' : 'var(--book1-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BookOpen size={22} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: lastRead.bookId === 'book2' ? 'var(--book2-color)' : 'var(--book1-color)',
                      backgroundColor: lastRead.bookId === 'book2' ? 'rgba(37,99,235,0.1)' : 'rgba(5,150,105,0.1)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '6px'
                    }}
                  >
                    อ่านต่อจากที่ค้างไว้ ({lastRead.progress}%)
                  </span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {lastRead.bookId === 'book2' ? 'เล่มที่ 2: ก่อนสมองพัง' : 'เล่มที่ 1: ก่อนจะป่วย'}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.925rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={lastRead.title}
                >
                  {lastRead.title}
                </div>
                {/* Progress bar track */}
                <div style={{ height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '99px', marginTop: '0.45rem', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${lastRead.progress}%`, backgroundColor: 'var(--accent-primary)', borderRadius: '99px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSelectChapter(lastRead.chapterId)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', minHeight: '38px', gap: '0.35rem' }}
              >
                <span>อ่านต่อทันที</span>
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setDismissedLastRead(true)}
                title="ซ่อนการแจ้งเตือนนี้"
                aria-label="ซ่อนการแจ้งเตือนอ่านต่อ"
                className="btn btn-ghost btn-icon"
                style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Smart Onboarding Pathways (3 Quick-Action choices to eliminate cognitive overload) */}
        <div style={{ maxWidth: '820px', margin: '0 auto 2.25rem auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              จุดเริ่มต้นด่วนสำหรับคุณ (Quick Start Pathways)
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '0.85rem'
            }}
          >
            {/* Pathway 1: FAST Emergency Stroke */}
            <button
              type="button"
              onClick={() => onOpenDiagrams && onOpenDiagrams('fast')}
              className="card"
              style={{
                textAlign: 'left',
                padding: '1.15rem 1.25rem',
                borderLeft: '4px solid #ef4444',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldAlert size={14} />
                  <span>สงสัยอาการฉุกเฉิน?</span>
                </span>
                <ChevronRight size={16} style={{ color: '#ef4444' }} />
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                แผนผัง FAST เช็กสัญญาณ Stroke
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                หน้าเบี้ยว แขนขาอ่อนแรง พูดไม่ชัด รู้ทันในนาทีวิกฤต
              </div>
            </button>

            {/* Pathway 2: 2-Minute Risk Assessment */}
            <button
              type="button"
              onClick={() => onOpenTools('lifestyle')}
              className="card"
              style={{
                textAlign: 'left',
                padding: '1.15rem 1.25rem',
                borderLeft: '4px solid var(--accent-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Activity size={14} />
                  <span>ยังไม่รู้จะเริ่มตรงไหน?</span>
                </span>
                <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                เช็กความเสี่ยงสุขภาพใน 2 นาที
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                ประเมิน 6 เสาหลักสุขภาพ การนอนหลับ และสมองเสื่อม
              </div>
            </button>

            {/* Pathway 3: Browse Books */}
            <button
              type="button"
              onClick={onScrollToChapters}
              className="card"
              style={{
                textAlign: 'left',
                padding: '1.15rem 1.25rem',
                borderLeft: '4px solid var(--book1-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--book1-color)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <BookOpen size={14} />
                  <span>อ่านตามลำดับเนื้อหา</span>
                </span>
                <ChevronRight size={16} style={{ color: 'var(--book1-color)' }} />
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                เลือกอ่านจาก 2 หนังสือ 61 ตอน
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                ก่อนจะป่วย (39 ตอน) • ก่อนสมองพัง (22 ตอน)
              </div>
            </button>
          </div>
        </div>

        {/* Live Search Preview Bar */}
        <div ref={searchContainerRef} style={{ maxWidth: '680px', margin: '0 auto 2.5rem auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🎯 คุณกำลังมองหาอะไรในวันนี้?</span>
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              border: isDropdownOpen ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: isDropdownOpen ? '0 8px 30px rgba(2, 132, 199, 0.15)' : 'var(--card-shadow)',
              transition: 'all 0.2s ease'
            }}
          >
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1.25rem',
                color: isDropdownOpen ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'color 0.2s ease'
              }}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setIsDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFullSearch();
                if (e.key === 'Escape') setIsDropdownOpen(false);
              }}
              placeholder="พิมพ์ค้นหาโรค, อาการ, หรือหัวข้อสุขภาพ (เช่น การนอน, Stroke, ไมเกรน)..."
              style={{
                width: '100%',
                padding: '0.9rem 6.5rem 0.9rem 3.25rem',
                fontSize: '0.95rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsDropdownOpen(false);
                }}
                style={{
                  position: 'absolute',
                  right: '4.85rem',
                  padding: '0.35rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                aria-label="ล้างคำค้นหา"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={handleFullSearch}
              className="badge badge-primary"
              style={{
                position: 'absolute',
                right: '0.75rem',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                borderRadius: '8px'
              }}
            >
              ค้นหา
            </button>
          </div>

          {/* Live Search Preview Dropdown */}
          {isDropdownOpen && searchQuery.trim() && (
            <div
              className="card"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                zIndex: 40,
                padding: '0.75rem',
                borderRadius: '16px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                animation: 'fadeIn 0.18s ease'
              }}
            >
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.25rem 0.65rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    พบบทความที่เกี่ยวข้อง ({totalMatchesCount} ตอน)
                  </div>

                  {searchResults.map((chap) => {
                    const isB1 = chap.bookId === 'book1';
                    return (
                      <button
                        key={chap.id}
                        type="button"
                        onClick={() => handleSelectResult(chap.id)}
                        className="btn-card"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                            <span className={isB1 ? 'badge-book1 badge' : 'badge-book2 badge'} style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>
                              {isB1 ? 'เล่ม 1' : 'เล่ม 2'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {chap.partTitle}
                            </span>
                          </div>
                          <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {chap.title}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', flexShrink: 0 }}>
                          <Clock size={13} />
                          <span>{chap.readingTime}</span>
                          <ChevronRight size={15} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                      </button>
                    );
                  })}

                  {totalMatchesCount > 5 && (
                    <button
                      type="button"
                      onClick={handleFullSearch}
                      className="btn btn-ghost"
                      style={{
                        padding: '0.65rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: 'var(--accent-primary)',
                        justifyContent: 'center',
                        marginTop: '0.25rem'
                      }}
                    >
                      <span>ดูผลลัพธ์ทั้งหมด {totalMatchesCount} ตอน ในหน้าต่างค้นหา ›</span>
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  ไม่พบบทความที่ตรงกับ "{searchQuery}" — ลองค้นหาด้วยคำอื่น หรือกดค้นหาแบบเต็ม
                </div>
              )}
            </div>
          )}

          {/* Quick topic tags below search bar */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '0.75rem'
            }}
          >
            {[
              { label: 'FAST Stroke', query: 'Stroke' },
              { label: '6 เสาหลักสุขภาพ', query: 'เสาหลัก' },
              { label: 'การนอนหลับ', query: 'การนอนหลับ' },
              { label: 'อาหารเป็นยา & IF', query: 'อาหารเป็นยา' },
              { label: 'ไมเกรน', query: 'ไมเกรน' },
              { label: 'สมองเสื่อม', query: 'สมองเสื่อม' }
            ].map((t) => (
              <button
                key={t.label}
                type="button"
                className="badge"
                onClick={() => {
                  setSearchQuery(t.query);
                  setIsDropdownOpen(true);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.75rem',
                  transition: 'all 0.15s ease'
                }}
              >
                #{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two Books Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '2rem'
          }}
        >
          {/* Book 1 Card: ก่อนจะป่วย */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '5px solid var(--book1-color)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '100px',
                  minWidth: '100px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  backgroundColor: '#f1f5f9'
                }}
              >
                <img
                  src={book1.coverImage}
                  alt={book1.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div className="badge badge-book1" style={{ marginBottom: '0.5rem' }}>
                  <HeartPulse size={14} />
                  <span>เล่มที่ 1 • {book1.badge}</span>
                </div>
                <h2
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {book1.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--book1-color)',
                    marginBottom: '0.65rem'
                  }}
                >
                  {book1.subtitle}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {book1.description}
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                6 เสาหลักสุขภาพ • 39 ตอน
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onStartReadingBook('book1')}
                style={{
                  backgroundColor: 'var(--book1-color)',
                  boxShadow: '0 4px 12px rgba(5,150,105,0.25)',
                  padding: '0.55rem 1.15rem'
                }}
              >
                <span>เริ่มอ่านเล่มนี้</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Book 2 Card: ก่อนสมองพัง */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '5px solid var(--book2-color)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '100px',
                  minWidth: '100px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  backgroundColor: '#f1f5f9'
                }}
              >
                <img
                  src={book2.coverImage}
                  alt={book2.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div className="badge badge-book2" style={{ marginBottom: '0.5rem' }}>
                  <Brain size={14} />
                  <span>เล่มที่ 2 • {book2.badge}</span>
                </div>
                <h2
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {book2.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--book2-color)',
                    marginBottom: '0.65rem'
                  }}
                >
                  {book2.subtitle}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {book2.description}
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                10 โรคสมอง & การฟื้นฟู • 22 ตอน
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onStartReadingBook('book2')}
                style={{
                  backgroundColor: 'var(--book2-color)',
                  boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                  padding: '0.55rem 1.15rem'
                }}
              >
                <span>เริ่มอ่านเล่มนี้</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Health Screening Quick Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                เครื่องมือประเมินสุขภาพตนเอง 4 หมวด
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                FAST Stroke Test • เช็กความเสี่ยง NCDs 6 เสาหลัก • ประเมินสมองเสื่อม • คุณภาพการนอนหลับ
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onOpenDiagrams && onOpenDiagrams('fast')}
              style={{ padding: '0.55rem 1rem' }}
            >
              <Layers size={16} />
              <span>แผนผังการแพทย์</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onOpenTools('lifestyle')}
              style={{ padding: '0.55rem 1rem' }}
            >
              <Activity size={16} />
              <span>ทำแบบประเมินสุขภาพ</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenPlan}
              style={{ padding: '0.55rem 1rem' }}
            >
              <Calendar size={16} />
              <span>แผนสุขภาพ 7 วัน</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary nav-desktop-only-btn"
              onClick={onOpenAuthor}
              style={{ padding: '0.55rem 1rem' }}
            >
              <User size={16} />
              <span>เกี่ยวกับหมอวี</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
