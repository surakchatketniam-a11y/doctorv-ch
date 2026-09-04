import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  List,
  BookOpen,
  HeartPulse,
  Brain,
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Search,
  Sparkles
} from 'lucide-react';
import allChaptersData from '../data/all_chapters.json';
import booksData from '../data/books.json';

export default function QuickTOCModal({
  isOpen,
  onClose,
  onSelectChapter,
  bookmarks = [],
  readHistory = []
}) {
  const [activeBook, setActiveBook] = useState('book1'); // 'book1' | 'book2'
  const [tocSearch, setTocSearch] = useState('');
  const [lastRead, setLastRead] = useState(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Load last read chapter when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('dr_v_last_read');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.chapterId && parsed.title) {
            setLastRead(parsed);
          }
        }
      } catch {}
    }
  }, [isOpen]);

  // Escape key & Focus Trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
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
    } else {
      setTocSearch('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Group chapters for current active book
  const book = booksData.find((b) => b.id === activeBook) || booksData[0];
  const bookChapters = allChaptersData.filter((c) => c.bookId === activeBook);

  const filteredChapters = bookChapters.filter((c) => {
    if (!tocSearch.trim()) return true;
    const q = tocSearch.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      (c.partTitle || '').toLowerCase().includes(q) ||
      (c.summary || '').toLowerCase().includes(q) ||
      (c.chapterNumber && c.chapterNumber.toString().includes(q))
    );
  });

  // Group by part
  const groupedParts = React.useMemo(() => {
    const groups = [];
    const map = {};

    filteredChapters.forEach((chap) => {
      const partKey = chap.partId;
      if (!map[partKey]) {
        const partInfo = book.parts?.[partKey.toString()] || {
          title: chap.partTitle || `ภาค ${partKey}`,
          desc: ''
        };

        map[partKey] = {
          partId: partKey,
          title: partInfo.title || chap.partTitle,
          desc: partInfo.desc || '',
          chapters: []
        };
        groups.push(map[partKey]);
      }
      map[partKey].chapters.push(chap);
    });

    return groups;
  }, [filteredChapters, book]);

  if (!isOpen) return null;

  const isBook1 = activeBook === 'book1';
  const bookColor = isBook1 ? 'var(--book1-color)' : 'var(--book2-color)';

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-toc-title"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          padding: '1.5rem',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: isBook1 ? 'var(--takeaway-bg)' : 'var(--accent-light)',
                color: bookColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <List size={20} />
            </div>
            <div>
              <h2
                id="quick-toc-title"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                สารบัญด่วน (Quick TOC)
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  margin: 0
                }}
              >
                คลิกเพื่อข้ามไปยังบทที่ต้องการอ่านได้ทันที
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดหน้าต่างสารบัญด่วน"
          >
            <X size={20} />
          </button>
        </div>

        {/* Continue Reading Quick Bar inside Quick TOC */}
        {lastRead && lastRead.chapterId && (
          <div
            style={{
              marginBottom: '0.85rem',
              padding: '0.65rem 0.85rem',
              backgroundColor: lastRead.bookId === 'book2' ? 'rgba(37,99,235,0.08)' : 'rgba(5,150,105,0.08)',
              border: `1.5px solid ${lastRead.bookId === 'book2' ? 'var(--book2-border)' : 'var(--book1-border)'}`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.6rem',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flex: 1 }}>
              <BookOpen size={18} style={{ color: lastRead.bookId === 'book2' ? 'var(--book2-color)' : 'var(--book1-color)', flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '700', color: lastRead.bookId === 'book2' ? 'var(--book2-color)' : 'var(--book1-color)' }}>
                  อ่านต่อจากที่ค้างไว้ ({lastRead.progress || 0}%) • {lastRead.bookId === 'book2' ? 'เล่ม 2: ก่อนสมองพัง' : 'เล่ม 1: ก่อนจะป่วย'}
                </div>
                <div style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {lastRead.title}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onSelectChapter(lastRead.chapterId);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.775rem',
                minHeight: '32px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              อ่านต่อทันที ›
            </button>
          </div>
        )}

        {/* Book Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexShrink: 0 }}>
          <button
            type="button"
            className={`book-tab-btn ${activeBook === 'book1' ? 'active-book1' : ''}`}
            onClick={() => setActiveBook('book1')}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem', borderRadius: '10px', flex: 1 }}
          >
            <HeartPulse size={15} />
            <span>เล่ม 1: ก่อนจะป่วย (39 ตอน • 9 ภาค)</span>
          </button>
          <button
            type="button"
            className={`book-tab-btn ${activeBook === 'book2' ? 'active-book2' : ''}`}
            onClick={() => setActiveBook('book2')}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem', borderRadius: '10px', flex: 1 }}
          >
            <Brain size={15} />
            <span>เล่ม 2: ก่อนสมองพัง (22 ตอน • 3 ส่วน)</span>
          </button>
        </div>

        {/* Search within TOC */}
        <div style={{ position: 'relative', marginBottom: '0.85rem', flexShrink: 0 }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="ค้นหาชื่อบทหรือภาคในสารบัญ..."
            value={tocSearch}
            onChange={(e) => setTocSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 2.2rem 0.65rem 2.35rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          {tocSearch && (
            <button
              type="button"
              onClick={() => setTocSearch('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                padding: '2px'
              }}
              aria-label="ล้างคำค้นหา"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Quick Part Jump Anchor Chips (Book 1: 9 ภาค, Book 2: 3 ส่วน) */}
        {!tocSearch && (
          <div
            style={{
              display: 'flex',
              gap: '0.35rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingBottom: '0.5rem',
              marginBottom: '0.75rem',
              flexShrink: 0,
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {groupedParts.map((group) => (
              <a
                key={group.partId}
                href={`#toc-part-${activeBook}-${group.partId}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(`toc-part-${activeBook}-${group.partId}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="badge"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {group.title.split(' ')[0]} {group.title.split(' ')[1] || ''}
              </a>
            ))}
          </div>
        )}

        {/* Scrollable Chapter List Grouped by Part */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            paddingRight: '0.25rem'
          }}
        >
          {groupedParts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              ไม่พบบทความที่ตรงกับ "{tocSearch}"
            </div>
          ) : (
            groupedParts.map((group) => (
              <div key={group.partId} id={`toc-part-${activeBook}-${group.partId}`}>
                {/* Part Header */}
                <div
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    borderLeft: `4px solid ${bookColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ fontWeight: '800', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                    {group.title}
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {group.chapters.length} ตอน
                  </span>
                </div>

                {/* Chapter rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {group.chapters.map((chap) => {
                    const isRead = readHistory.includes(chap.id);
                    const isBookmarked = bookmarks.includes(chap.id);

                    return (
                      <button
                        key={chap.id}
                        type="button"
                        onClick={() => {
                          onSelectChapter(chap.id);
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                          e.currentTarget.style.borderColor = bookColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
                          <span
                            className={isBook1 ? 'badge-book1 badge' : 'badge-book2 badge'}
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.15rem 0.45rem',
                              minWidth: '54px',
                              textAlign: 'center',
                              flexShrink: 0
                            }}
                          >
                            {chap.chapterNumber ? `บทที่ ${chap.chapterNumber}` : 'บทนำ'}
                          </span>

                          <span
                            style={{
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {chap.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                          {isBookmarked && (
                            <Bookmark size={13} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />
                          )}
                          {isRead && (
                            <CheckCircle2 size={13} style={{ color: 'var(--book1-color)' }} />
                          )}
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {chap.readingTime}
                          </span>
                          <ChevronRight size={15} style={{ color: 'var(--text-light)' }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
