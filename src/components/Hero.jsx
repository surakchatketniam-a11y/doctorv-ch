import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  HeartPulse,
  Brain,
  ChevronRight,
  Activity,
  ShieldAlert,
  Search,
  X,
  Clock
} from 'lucide-react';
import booksData from '../data/books.json';
import allChaptersData from '../data/all_chapters.json';

const TOPIC_CHIPS = [
  { label: 'การนอนหลับ', query: 'การนอนหลับ' },
  { label: 'ไมเกรน', query: 'ไมเกรน' },
  { label: 'สมองเสื่อม', query: 'สมองเสื่อม' },
  { label: 'อาหารเป็นยา', query: 'อาหารเป็นยา' }
];

const BOOK_ACCENT = { book1: 'var(--ds-accent-green)', book2: 'var(--ds-accent-blue)' };

export default function Hero({
  onStartReadingBook,
  onOpenTools,
  onOpenSearch,
  onSelectChapter,
  onOpenDiagrams
}) {
  const book1 = booksData.find((b) => b.id === 'book1') || booksData[0];
  const book2 = booksData.find((b) => b.id === 'book2') || booksData[1];

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastRead, setLastRead] = useState(null);
  const [dismissedLastRead, setDismissedLastRead] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dr_v_last_read');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.chapterId && parsed.title) setLastRead(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const matches = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allChaptersData.filter((chap) => {
      const inTitle = chap.title.toLowerCase().includes(q);
      const inSummary = chap.summary && chap.summary.toLowerCase().includes(q);
      const inPart = chap.partTitle && chap.partTitle.toLowerCase().includes(q);
      return inTitle || inSummary || inPart;
    });
  }, [searchQuery]);

  const searchResults = matches.slice(0, 5);
  const totalMatchesCount = matches.length;

  const handleSelectResult = (chapterId) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    if (onSelectChapter) onSelectChapter(chapterId);
  };

  const handleFullSearch = () => {
    setIsDropdownOpen(false);
    onOpenSearch(searchQuery);
  };

  const books = [
    { id: 'book1', data: book1, Icon: HeartPulse, meta: '6 เสาหลักสุขภาพ • 39 ตอน' },
    { id: 'book2', data: book2, Icon: Brain, meta: '10 โรคสมอง & การฟื้นฟู • 22 ตอน' }
  ];

  return (
    <section className="ds-hero">
      <div className="container">
        {lastRead && !dismissedLastRead && lastRead.chapterId && (
          <div className="ds-continue">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
              <BookOpen size={20} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-ink-secondary)' }}>
                  {lastRead.progress >= 98
                    ? 'อ่านจบล่าสุด (100%)'
                    : `อ่านต่อจากที่ค้างไว้ (${lastRead.progress || 0}%)`}
                  {' • '}
                  {lastRead.bookId === 'book2' ? 'เล่ม 2' : 'เล่ม 1'}
                </div>
                <div
                  title={lastRead.title}
                  style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {lastRead.title}
                </div>
                <div className="ds-progress">
                  <div style={{ width: `${Math.max(4, lastRead.progress || 0)}%` }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSelectChapter(lastRead.chapterId)}
                style={{ minHeight: 40, padding: '8px 18px', whiteSpace: 'nowrap' }}
              >
                <span>{lastRead.progress >= 98 ? 'อ่านอีกครั้ง' : 'อ่านต่อ'}</span>
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setDismissedLastRead(true)}
                title="ซ่อนการแจ้งเตือนนี้"
                aria-label="ซ่อนการแจ้งเตือนอ่านต่อ"
                className="btn btn-ghost btn-icon"
                style={{ width: 36, height: 36, minWidth: 36, minHeight: 36, color: 'var(--ds-ink-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="ds-hero-head">
          <h1>มีเพื่อนเป็นหมอ</h1>
          <p>
            คลังความรู้สุขภาพจาก นพ.วีระพันธ์ สุวรรณนามัย (หมอวี) 2 เล่ม 61 ตอน
            เรื่องการดูแลสุขภาพเชิงป้องกันและสุขภาพสมอง อ่านฟรีเป็นวิทยาทาน
          </p>
        </div>

        <div ref={searchContainerRef} className="ds-search">
          <div className="ds-search-field">
            <Search size={20} className="ds-search-icon" />
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
              placeholder="ค้นหาโรค อาการ หรือหัวข้อสุขภาพ"
              aria-label="ค้นหาบทความ"
            />
            {searchQuery && (
              <button
                type="button"
                className="ds-search-clear"
                onClick={() => {
                  setSearchQuery('');
                  setIsDropdownOpen(false);
                }}
                aria-label="ล้างคำค้นหา"
              >
                <X size={16} />
              </button>
            )}
            <button type="button" className="ds-search-submit" onClick={handleFullSearch}>
              ค้นหา
            </button>
          </div>

          {isDropdownOpen && searchQuery.trim() && (
            <div className="ds-dropdown">
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--ds-ink-secondary)', padding: '4px 14px', fontWeight: 600 }}>
                    พบ {totalMatchesCount} ตอนที่เกี่ยวข้อง
                  </div>
                  {searchResults.map((chap) => (
                    <button
                      key={chap.id}
                      type="button"
                      className="ds-dropdown-item"
                      onClick={() => handleSelectResult(chap.id)}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-ink-secondary)' }}>
                          {chap.bookId === 'book1' ? 'เล่ม 1' : 'เล่ม 2'} • {chap.partTitle}
                        </div>
                        <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {chap.title}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ds-ink-secondary)', fontSize: '0.8125rem' }}>
                        <Clock size={14} />
                        <span>{chap.readingTime}</span>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  ))}
                  {totalMatchesCount > 5 && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handleFullSearch}
                      style={{ justifyContent: 'center', marginTop: 4 }}
                    >
                      <span>ดูผลลัพธ์ทั้งหมด {totalMatchesCount} ตอน</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ padding: 20, textAlign: 'center', color: 'var(--ds-ink-secondary)', fontSize: '0.9375rem' }}>
                  ไม่พบบทความที่ตรงกับ "{searchQuery}" ลองใช้คำอื่น
                </div>
              )}
            </div>
          )}

          <div className="ds-quick-links">
            <button
              type="button"
              className="ds-quick-link is-alert"
              onClick={() => onOpenDiagrams && onOpenDiagrams('fast')}
            >
              <ShieldAlert size={16} />
              <span>สงสัยอาการ Stroke? เช็ก FAST</span>
            </button>
            <button type="button" className="ds-quick-link" onClick={() => onOpenTools('lifestyle')}>
              <Activity size={16} />
              <span>ประเมินสุขภาพ 2 นาที</span>
            </button>
          </div>
          <div className="ds-quick-links" style={{ marginTop: 8 }}>
            {TOPIC_CHIPS.map((t) => (
              <button
                key={t.label}
                type="button"
                className="ds-quick-link"
                style={{ color: 'var(--ds-ink-secondary)', padding: '4px 12px' }}
                onClick={() => {
                  setSearchQuery(t.query);
                  setIsDropdownOpen(true);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ds-books">
          {books.map(({ id, data, Icon, meta }) => (
            <article key={id} className="ds-book">
              <div className="ds-book-top">
                <div className="ds-book-cover">
                  <img src={data.coverImage} alt={data.title} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ds-book-tag">
                    <span className="ds-dot" style={{ background: BOOK_ACCENT[id] }} />
                    <Icon size={14} />
                    <span>เล่มที่ {id === 'book1' ? 1 : 2} • {data.badge}</span>
                  </div>
                  <h2>{data.title}</h2>
                  <p className="ds-book-sub">{data.subtitle}</p>
                  <p className="ds-book-desc">{data.description}</p>
                </div>
              </div>
              <div className="ds-book-foot">
                <span>{meta}</span>
                <button type="button" className="btn btn-primary" onClick={() => onStartReadingBook(id)}>
                  <span>เริ่มอ่าน</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
