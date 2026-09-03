import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Clock, ArrowRight, HeartPulse, Brain, Sparkles, AlertCircle } from 'lucide-react';
import allChaptersData from '../data/all_chapters.json';

// Common synonyms dictionary for medical and wellness topics
const SYNONYMS = {
  'stroke': ['หลอดเลือดสมอง', 'อัมพฤกษ์', 'อัมพาต', 'fast'],
  'อัมพฤกษ์': ['stroke', 'หลอดเลือดสมอง', 'fast'],
  'อัมพาต': ['stroke', 'หลอดเลือดสมอง'],
  'ความจำ': ['สมองเสื่อม', 'อัลไซเมอร์', 'ลืม', 'dementia'],
  'สมองเสื่อม': ['ความจำ', 'อัลไซเมอร์', 'dementia'],
  'อัลไซเมอร์': ['สมองเสื่อม', 'alzheimer', 'ความจำ'],
  'นอนไม่หลับ': ['การนอนหลับ', 'sleep', 'hygiene'],
  'นอน': ['การนอนหลับ', 'sleep', 'melatonin', 'glymphatic'],
  'อาหาร': ['โภชนาการ', 'nutrition', 'อาหารเป็นยา', 'fasting'],
  'กิน': ['โภชนาการ', 'อาหารเป็นยา', 'fasting'],
  'ออกกำลัง': ['ออกกำลังกาย', 'exercise', 'resistance', 'aerobic', 'hiit'],
  'เครียด': ['ความเครียด', 'cortisol', 'stress'],
  'เบาหวาน': ['น้ำตาล', 'อินซูลิน', 'glucose', 'insulin'],
  'ความดัน': ['ความดันโลหิต', 'hypertension'],
  'ปวดหัว': ['ไมเกรน', 'headache', 'migraine'],
  'ไมเกรน': ['ปวดหัว', 'migraine']
};

export default function SearchModal({ isOpen, onClose, onSelectChapter, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [bookFilter, setBookFilter] = useState('all'); // 'all' | 'book1' | 'book2'
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || '');
    }
  }, [isOpen, initialQuery]);

  // Escape key & Focus Trap handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setBookFilter('all');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic with synonyms support
  const results = React.useMemo(() => {
    if (!isOpen || !query.trim()) return [];
    const qLower = query.toLowerCase().trim();
    const querySynonyms = SYNONYMS[qLower] || [];
    const searchTerms = [qLower, ...querySynonyms];

    return allChaptersData.filter((c) => {
      if (bookFilter !== 'all' && c.bookId !== bookFilter) return false;
      const titleLower = c.title.toLowerCase();
      const partLower = (c.partTitle || '').toLowerCase();
      const bookLower = (c.bookTitle || '').toLowerCase();
      const tagsLower = (c.tags || []).map(t => t.toLowerCase());
      const rawTextLower = (c.rawText || '').toLowerCase();

      return searchTerms.some(term => 
        titleLower.includes(term) ||
        partLower.includes(term) ||
        bookLower.includes(term) ||
        tagsLower.some(t => t.includes(term)) ||
        rawTextLower.includes(term)
      );
    });
  }, [isOpen, query, bookFilter]);

  if (!isOpen) return null;

  const getSnippet = (text, q) => {
    if (!text || !q) return '';
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 130) + '...';
    const start = Math.max(0, idx - 35);
    const end = Math.min(text.length, idx + 95);
    return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '1.5rem', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.1rem' }}>
            <Search size={20} style={{ color: 'var(--accent-primary)' }} />
            <span id="search-modal-title">ค้นหาจุดเดียวจบ (Unified Search)</span>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดหน้าต่างค้นหา"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Bar with accessible label */}
        <div style={{ position: 'relative', marginBottom: '0.75rem', flexShrink: 0 }}>
          <label htmlFor="search-modal-input" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
            ค้นหาบทความข้ามทั้ง 2 เล่ม
          </label>
          <Search
            size={20}
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            aria-hidden="true"
          />
          <input
            id="search-modal-input"
            ref={inputRef}
            type="text"
            placeholder="ค้นหาชื่อโรค, อาการ, คำสำคัญ (เช่น การนอน, Stroke, เบาหวาน, อาหาร)..."
            aria-label="ค้นหาชื่อโรค, อาการ หรือคำสำคัญ"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 2.75rem 0.85rem 2.85rem',
              borderRadius: '12px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', padding: '4px' }}
              aria-label="ล้างข้อความค้นหา"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Book Filter Segmented Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexShrink: 0 }}>
          <button
            type="button"
            className={`book-tab-btn ${bookFilter === 'all' ? 'active' : ''}`}
            onClick={() => setBookFilter('all')}
            style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
          >
            <span>ทั้งหมด (61 บท)</span>
          </button>
          <button
            type="button"
            className={`book-tab-btn ${bookFilter === 'book1' ? 'active-book1' : ''}`}
            onClick={() => setBookFilter('book1')}
            style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
          >
            <HeartPulse size={13} />
            <span>ก่อนจะป่วย</span>
          </button>
          <button
            type="button"
            className={`book-tab-btn ${bookFilter === 'book2' ? 'active-book2' : ''}`}
            onClick={() => setBookFilter('book2')}
            style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
          >
            <Brain size={13} />
            <span>ก่อนสมองพัง</span>
          </button>
        </div>

        {/* Quick Recommended Tags */}
        {!query && (
          <div style={{ marginBottom: '1rem', flexShrink: 0 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              คำค้นหายอดนิยม:
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['การนอนหลับ', 'Stroke', 'อาหารเป็นยา', 'เบาหวาน', 'ความดัน', 'สมองเสื่อม', 'ความเครียด', 'Intermittent Fasting', 'ไมเกรน', 'Longevity'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className="badge"
                  onClick={() => setQuery(tag)}
                  style={{ cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflowY: 'auto', flex: 1 }}>
          {query.trim() && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
              <AlertCircle size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.6 }} />
              <div style={{ fontWeight: '700', marginBottom: '0.25rem' }}>ไม่พบบทความที่ตรงกับ "{query}"</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                ลองค้นหาด้วยคำที่กว้างขึ้น เช่น "อาหาร", "นอน", "สมอง", หรือเลือกจากคำค้นหายอดนิยมด้านล่าง
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['การนอนหลับ', 'หลอดเลือดสมอง', 'อาหารเป็นยา', 'สมองเสื่อม'].map(s => (
                  <button key={s} type="button" className="badge" onClick={() => setQuery(s)} style={{ cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((c) => {
            const isBook1 = c.bookId === 'book1';
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => {
                  onSelectChapter(c.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${isBook1 ? 'var(--book1-color)' : 'var(--book2-color)'}`
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span className={isBook1 ? 'badge-book1 badge' : 'badge-book2 badge'} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                      {c.bookTitle}
                    </span>
                    <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                      {c.partTitle}
                    </span>
                  </div>

                  <div style={{ fontWeight: '700', fontSize: '0.975rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {c.title}
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {getSnippet(c.rawText, query)}
                  </div>
                </div>

                <ArrowRight size={18} style={{ color: 'var(--text-light)', marginTop: '4px', flexShrink: 0 }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
