import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Tag,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  HeartPulse,
  Brain,
  Sparkles,
  X,
  Layers,
  FolderOpen,
  List,
  Utensils,
  Bed,
  Activity,
  ShieldCheck,
  Hourglass,
  Smile,
  Check,
  Dna,
  Bone,
  Stethoscope,
  ArrowUpDown,
  Zap,
  Flame
} from 'lucide-react';
import booksData from '../data/books.json';
import allChaptersData from '../data/all_chapters.json';

// Helper to format concise, beautiful part labels
const formatShortPartTitle = (title) => {
  if (!title) return '';
  if (title.includes('บทนำและพื้นฐาน')) return 'บทนำ & พื้นฐาน';
  if (title.includes('รากฐาน') || title.includes('เข้าใจร่างกาย')) return 'เข้าใจร่างกาย';
  if (title.includes('โภชนาการ')) return 'โภชนาการ';
  if (title.includes('ออกกำลังกาย')) return 'ออกกำลังกาย';
  if (title.includes('นอนหลับ')) return 'การนอนหลับ';
  if (title.includes('ความเครียด')) return 'จัดการความเครียด';
  if (title.includes('สารเสพติด') || title.includes('ปลอดสาร')) return 'ปลอดสารพิษ';
  if (title.includes('ความสัมพันธ์')) return 'ความสัมพันธ์';
  if (title.includes('โรคเฉพาะ')) return 'โรคเฉพาะ (NCDs)';
  if (title.includes('Longevity') || title.includes('อายุยืน')) return 'Longevity ชะลอวัย';
  if (title.includes('ภาคพิเศษ')) return 'ภาคพิเศษ';
  if (title.includes('บทความทั่วไป')) return 'บทนำสมอง';
  if (title.includes('รู้จักสมอง')) return 'รู้จักสมอง';
  if (title.includes('โรคสมอง')) return '10 โรคสมอง';
  if (title.includes('ดูแลสมอง') || title.includes('ฟื้นฟู')) return 'ฟื้นฟูดูแลสมอง';
  return title.replace(/^(ภาค\s*\d+|ส่วนที่\s*\d+:?|เสาหลักที่\s*\d+)\s*/g, '').trim();
};

// Line Art Icon for Chapters — Clean DexTrial Style
const getChapterLineIcon = (chap) => {
  const t = (chap.title + ' ' + (chap.partTitle || '')).toLowerCase();
  if (t.includes('สมอง') || t.includes('อัลไซเมอร์') || t.includes('stroke') || t.includes('ระบบประสาท') || t.includes('ความจำ') || t.includes('ไมเกรน')) {
    return <Brain size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('อาหาร') || t.includes('โภชนาการ') || t.includes('น้ำตาล') || t.includes('if') || t.includes('กิน') || t.includes('คาร์บ') || t.includes('ลำไส้')) {
    return <Utensils size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('นอน') || t.includes('หลับ') || t.includes('sleep')) {
    return <Bed size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('ออกกำลัง') || t.includes('กล้ามเนื้อ') || t.includes('exercise') || t.includes('วิ่ง') || t.includes('weight')) {
    return <Activity size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('กระดูก') || t.includes('ข้อ') || t.includes('joint')) {
    return <Bone size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('ภูมิคุ้มกัน') || t.includes('อักเสบ') || t.includes('มะเร็ง') || t.includes('สารพิษ') || t.includes('บุหรี่')) {
    return <ShieldCheck size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('อายุยืน') || t.includes('ชะลอวัย') || t.includes('longevity') || t.includes('เซลล์') || t.includes('epigenetics') || t.includes('autophagy')) {
    return <Hourglass size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('ความเครียด') || t.includes('จิตใจ') || t.includes('ความสัมพันธ์') || t.includes('สมาธิ')) {
    return <Smile size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  if (t.includes('หัวใจ') || t.includes('ความดัน') || t.includes('หลอดเลือด')) {
    return <HeartPulse size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />;
  }
  return chap.bookId === 'book1' ? (
    <HeartPulse size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
  ) : (
    <Brain size={28} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
  );
};

export default function ChapterList({
  onSelectChapter,
  bookmarks,
  onToggleBookmark,
  readHistory,
  filterBookmarkOnly,
  onResetBookmarkFilter,
  selectedBookFilter,
  setSelectedBookFilter,
  onOpenTOC
}) {
  const [selectedBook, setSelectedBook] = useState(selectedBookFilter || 'all'); // 'all' | 'book1' | 'book2'
  const [selectedPart, setSelectedPart] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'shortest' | 'action'
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  // Sync with prop if provided
  const currentBook = selectedBookFilter !== undefined ? selectedBookFilter : selectedBook;
  const setBook = (b) => {
    setSelectedBook(b);
    setSelectedPart('all');
    setIsExpandedAll(false);
    if (setSelectedBookFilter) setSelectedBookFilter(b);
  };

  // Dynamic count of chapters per part key
  const partCounts = React.useMemo(() => {
    const counts = {};
    allChaptersData.forEach((c) => {
      const key = `${c.bookId}_${c.partId}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, []);

  // Total count for active book selection
  const activeBookTotalCount = React.useMemo(() => {
    if (currentBook === 'all') return allChaptersData.length;
    return allChaptersData.filter((c) => c.bookId === currentBook).length;
  }, [currentBook]);

  // Available parts for filtering based on current selected book
  const availableParts = React.useMemo(() => {
    const parts = [];
    booksData.forEach((b) => {
      if (currentBook === 'all' || currentBook === b.id) {
        const partsList = Array.isArray(b.parts)
          ? b.parts
          : Object.entries(b.parts || {}).map(([id, p]) => ({ id, ...p }));

        partsList.forEach((p) => {
          parts.push({
            bookId: b.id,
            bookTitle: b.title,
            partId: p.id,
            title: p.title,
            desc: p.desc || p.description || '',
            shortTitle: formatShortPartTitle(p.title),
            key: `${b.id}_${p.id}`,
            count: partCounts[`${b.id}_${p.id}`] || 0
          });
        });
      }
    });
    return parts;
  }, [currentBook, partCounts]);

  // Filter chapters based on active filters
  const filteredChapters = React.useMemo(() => {
    return allChaptersData.filter((chap) => {
      // 1. Filter by Book
      if (currentBook !== 'all' && chap.bookId !== currentBook) return false;

      // 2. Filter by Part
      if (selectedPart !== 'all') {
        const [pBookId, pPartId] = selectedPart.split('_');
        if (chap.bookId !== pBookId || String(chap.partId) !== String(pPartId)) return false;
      }

      // 3. Filter Bookmarks Only
      if (filterBookmarkOnly && !bookmarks.includes(chap.id)) return false;

      // 4. Search Query (Title, Summary, Content, PartTitle)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = chap.title.toLowerCase().includes(q);
        const inSummary = chap.summary && chap.summary.toLowerCase().includes(q);
        const inPart = chap.partTitle && chap.partTitle.toLowerCase().includes(q);
        const inRaw = chap.rawText && chap.rawText.toLowerCase().includes(q);
        if (!inTitle && !inSummary && !inPart && !inRaw) return false;
      }

      return true;
    });
  }, [currentBook, selectedPart, filterBookmarkOnly, bookmarks, searchQuery]);

  // Group filtered chapters by Part / Section with Sorting Applied
  const groupedParts = React.useMemo(() => {
    const groups = [];
    const groupMap = new Map();

    filteredChapters.forEach((chap) => {
      const groupKey = `${chap.bookId}_${chap.partId}`;
      if (!groupMap.has(groupKey)) {
        // Find part info from booksData
        const b = booksData.find((item) => item.id === chap.bookId);
        const p = b
          ? Array.isArray(b.parts)
            ? b.parts.find((item) => item.id === chap.partId)
            : b.parts?.[chap.partId?.toString()]
          : null;

        const groupObj = {
          key: groupKey,
          bookId: chap.bookId,
          bookTitle: chap.bookTitle,
          partId: chap.partId,
          title: chap.partTitle || (p ? p.title : 'บทความทั่วไป'),
          desc: p ? (p.desc || p.description || '') : '',
          chapters: []
        };
        groupMap.set(groupKey, groupObj);
        groups.push(groupObj);
      }
      groupMap.get(groupKey).chapters.push(chap);
    });

    // Apply Sorting inside each group
    groups.forEach((g) => {
      if (sortBy === 'shortest') {
        g.chapters.sort((a, b) => (parseInt(a.readingTime) || 3) - (parseInt(b.readingTime) || 3));
      } else if (sortBy === 'action') {
        g.chapters.sort((a, b) => ((b.actionItems?.length || 0) - (a.actionItems?.length || 0)));
      }
    });

    return groups;
  }, [filteredChapters, sortBy]);

  // Progressive Disclosure: show initial groups when unfiltered, allowing user to expand cleanly
  const isProgressiveDisclosureActive =
    !isExpandedAll &&
    !searchQuery.trim() &&
    selectedPart === 'all' &&
    !filterBookmarkOnly &&
    groupedParts.length > 2;

  const visibleGroups = isProgressiveDisclosureActive
    ? groupedParts.slice(0, 2)
    : groupedParts;

  const totalVisibleChapters = visibleGroups.reduce((acc, g) => acc + g.chapters.length, 0);
  const totalFilteredChapters = filteredChapters.length;
  const remainingChaptersCount = totalFilteredChapters - totalVisibleChapters;
  const remainingGroupsCount = groupedParts.length - visibleGroups.length;

  return (
    <section id="chapters-section" style={{ padding: '2.5rem 0 5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header and Controls Bar */}
        <div style={{ marginBottom: '2.25rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />
                <span>Available Chapters • สารบัญบทความ</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
                {filterBookmarkOnly
                  ? 'บทความที่บันทึกไว้'
                  : currentBook === 'book1'
                  ? 'ก่อนจะป่วย (39 ตอน • 9 ภาค)'
                  : currentBook === 'book2'
                  ? 'ก่อนสมองพัง (22 ตอน • 3 ส่วน)'
                  : 'สารบัญรวมทั้ง 2 เล่ม (61 ตอน)'}
              </h2>
            </div>

            {/* Quick TOC Button & Search Input */}
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {onOpenTOC && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onOpenTOC}
                  style={{
                    padding: '0.55rem 0.95rem',
                    fontSize: '0.875rem',
                    gap: '0.4rem',
                    borderRadius: '12px'
                  }}
                >
                  <List size={16} />
                  <span>สารบัญด่วน</span>
                </button>
              )}

              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  type="text"
                  placeholder="กรองชื่อบทความ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 2rem 0.55rem 2.35rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '0.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Book Switcher Tabs & Quick Sort Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}
          >
            {/* Book Tabs */}
            <div className="book-tabs-container">
              <button
                type="button"
                className={`book-tab-btn ${currentBook === 'all' ? 'active' : ''}`}
                onClick={() => setBook('all')}
              >
                <span>ทั้ง 2 เล่ม (61)</span>
              </button>

              <button
                type="button"
                className={`book-tab-btn ${currentBook === 'book1' ? 'active' : ''}`}
                onClick={() => setBook('book1')}
              >
                <span>เล่ม 1: ก่อนจะป่วย (39)</span>
              </button>

              <button
                type="button"
                className={`book-tab-btn ${currentBook === 'book2' ? 'active' : ''}`}
                onClick={() => setBook('book2')}
              >
                <span>เล่ม 2: ก่อนสมองพัง (22)</span>
              </button>
            </div>

            {/* Quick Sort Options Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginRight: '0.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <ArrowUpDown size={13} />
                <span>เรียงตาม:</span>
              </span>

              <button
                type="button"
                className={`badge ${sortBy === 'default' ? 'badge-primary' : ''}`}
                onClick={() => setSortBy('default')}
                style={{ cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.775rem', borderRadius: '8px' }}
              >
                📖 ตามเล่ม
              </button>

              <button
                type="button"
                className={`badge ${sortBy === 'shortest' ? 'badge-primary' : ''}`}
                onClick={() => setSortBy('shortest')}
                style={{ cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.775rem', borderRadius: '8px' }}
                title="เรียงจากบทความที่ใช้เวลาอ่านสั้นที่สุด"
              >
                ⚡ อ่านสั้น
              </button>

              <button
                type="button"
                className={`badge ${sortBy === 'action' ? 'badge-primary' : ''}`}
                onClick={() => setSortBy('action')}
                style={{ cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.775rem', borderRadius: '8px' }}
                title="เรียงจากบทความที่มีข้อปฏิบัติมากที่สุด"
              >
                💡 มีข้อปฏิบัติ
              </button>
            </div>
          </div>

          {/* Part Filter Chips Horizontal Scroll Container with Scroll Fade & Counts */}
          {availableParts.length > 0 && (
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <button
                  type="button"
                  className={`badge ${selectedPart === 'all' ? 'badge-primary' : ''}`}
                  onClick={() => setSelectedPart('all')}
                  style={{
                    cursor: 'pointer',
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.8125rem',
                    fontWeight: selectedPart === 'all' ? '700' : '500',
                    flexShrink: 0,
                    borderRadius: '10px'
                  }}
                >
                  ทั้งหมด ({activeBookTotalCount})
                </button>

                {availableParts.map((p) => {
                  const isSelected = selectedPart === p.key;

                  return (
                    <button
                      key={p.key}
                      type="button"
                      className={`badge ${isSelected ? 'badge-primary' : ''}`}
                      onClick={() => setSelectedPart(isSelected ? 'all' : p.key)}
                      title={p.title}
                      style={{
                        cursor: 'pointer',
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.8125rem',
                        fontWeight: isSelected ? '700' : '500',
                        flexShrink: 0,
                        borderRadius: '10px'
                      }}
                    >
                      <span>{p.shortTitle}</span>
                      <span style={{ opacity: 0.65, fontSize: '0.75rem', marginLeft: '0.2rem' }}>
                        ({p.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredChapters.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '3.5rem 1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px'
            }}
          >
            <BookOpen size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              ไม่พบบทความที่ตรงกับเงื่อนไข
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
              ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อค้นหาบทความที่ต้องการ
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setBook('all');
                setSelectedPart('all');
                setSearchQuery('');
                setSortBy('default');
                if (filterBookmarkOnly && onResetBookmarkFilter) onResetBookmarkFilter();
              }}
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          /* Chapters Grouped by Part / Section (สไตล์ DexTrial Clean Minimal Cards) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {visibleGroups.map((group) => {
              const totalMinutes = group.chapters.reduce((sum, c) => sum + (parseInt(c.readingTime) || 3), 0);

              return (
                <div key={group.key} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Clean Part Header Banner with Total Reading Time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: 'var(--text-primary)',
                          margin: 0,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {group.title}
                      </h3>
                      {group.desc && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {group.desc}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge" style={{ fontSize: '0.775rem', padding: '0.2rem 0.55rem', color: 'var(--text-muted)' }}>
                        {group.chapters.length} ตอน • รวม ~{totalMinutes} นาที
                      </span>
                    </div>
                  </div>

                  {/* Clean Minimalist Cards Grid (DexTrial Reference Style) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: '1.25rem'
                    }}
                  >
                    {group.chapters.map((chap) => {
                      const isRead = readHistory.includes(chap.id);
                      const isBookmarked = bookmarks.includes(chap.id);
                      const isB1 = chap.bookId === 'book1';

                      return (
                        <div
                          key={chap.id}
                          style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
                        >
                          <button
                            type="button"
                            className="btn-card"
                            onClick={() => onSelectChapter(chap.id)}
                            aria-label={`เปิดอ่าน ${chap.title} (${chap.bookTitle})`}
                            style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              backgroundColor: 'var(--bg-tertiary)',
                              borderRadius: '20px',
                              border: '1px solid var(--border-color)',
                              padding: '1.65rem 1.5rem',
                              height: '100%',
                              boxShadow: 'none',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div>
                              {/* Top Row: Category tag, read indicator, reading time */}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  marginBottom: '0.75rem',
                                  paddingRight: '2rem'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                  <span
                                    className={isB1 ? 'badge badge-book1' : 'badge badge-book2'}
                                    style={{ fontSize: '0.725rem', padding: '0.15rem 0.5rem' }}
                                  >
                                    {isB1 ? 'เล่ม 1: ก่อนจะป่วย' : 'เล่ม 2: ก่อนสมองพัง'}
                                  </span>

                                  {isRead && (
                                    <span
                                      className="badge badge-success"
                                      style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}
                                      title="อ่านบทความนี้แล้ว"
                                    >
                                      <Check size={11} strokeWidth={2.5} />
                                      <span>อ่านแล้ว</span>
                                    </span>
                                  )}
                                </div>

                                <div
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)'
                                  }}
                                >
                                  <Clock size={12} />
                                  <span>{chap.readingTime || '5 นาที'}</span>
                                </div>
                              </div>

                              {/* Chapter Title & Subtle Line Art Icon */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.65rem' }}>
                                <div
                                  style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    backgroundColor: 'var(--bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                    border: '1px solid var(--border-color)'
                                  }}
                                >
                                  {getChapterLineIcon(chap)}
                                </div>
                                <h4
                                  style={{
                                    fontSize: '1.05rem',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    lineHeight: '1.4',
                                    margin: 0
                                  }}
                                >
                                  {chap.title}
                                </h4>
                              </div>

                              {/* Chapter Summary Snippet */}
                              <p
                                style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--text-secondary)',
                                  lineHeight: '1.6',
                                  margin: '0 0 0.85rem 0',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {chap.summary || (chap.sections?.[0]?.content?.slice(0, 110) + '...')}
                              </p>
                            </div>

                            {/* Card Footer: Action takeaways count + Read more indicator */}
                            <div
                              style={{
                                paddingTop: '0.75rem',
                                borderTop: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.8rem'
                              }}
                            >
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  color: 'var(--accent-primary)',
                                  fontWeight: '600'
                                }}
                              >
                                <span>เปิดอ่านบทนี้</span>
                                <ChevronRight size={14} />
                              </span>

                              {chap.actionItems && chap.actionItems.length > 0 && (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                  💡 {chap.actionItems.length} ข้อปฏิบัติ
                                </span>
                              )}
                            </div>
                          </button>

                          {/* Subtle Top-Right Bookmark Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(chap.id);
                            }}
                            aria-label={isBookmarked ? `ยกเลิกบุ๊กมาร์ก ${chap.title}` : `บุ๊กมาร์ก ${chap.title}`}
                            title={isBookmarked ? 'ยกเลิกการบันทึก' : 'บันทึกไว้อ่านภายหลัง'}
                            style={{
                              position: 'absolute',
                              top: '1.25rem',
                              right: '1.25rem',
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: isBookmarked ? 'var(--accent-light)' : 'transparent',
                              color: isBookmarked ? 'var(--accent-primary)' : 'var(--text-light)',
                              transition: 'all 0.15s ease',
                              zIndex: 2
                            }}
                          >
                            <Bookmark size={17} fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Progressive Disclosure: Expand Banner when collapsed */}
            {isProgressiveDisclosureActive && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1.5px dashed var(--border-color)',
                  boxShadow: 'var(--card-shadow)',
                  position: 'relative',
                  marginTop: '0.5rem'
                }}
              >
                <div style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  แสดง {totalVisibleChapters} ตอนแนะนำแรก
                  <span style={{ fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.95rem', display: 'block', marginTop: '0.2rem' }}>
                    (ยังมีอีก {remainingChaptersCount} ตอนใน {remainingGroupsCount} หมวด)
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                  เปิดดูสารบัญทั้งหมดเพื่อเลือกอ่านตามหัวข้อที่คุณสนใจ หรือใช้สารบัญด่วนเพื่อกระโดดไปยังตอนใดก็ได้ทันที
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsExpandedAll(true)}
                    style={{
                      padding: '0.7rem 1.75rem',
                      gap: '0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.925rem'
                    }}
                  >
                    <span>คลี่ดูสารบัญทั้งหมด ({totalFilteredChapters} ตอน)</span>
                    <ChevronDown size={18} />
                  </button>
                  {onOpenTOC && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onOpenTOC}
                      style={{
                        padding: '0.7rem 1.35rem',
                        gap: '0.45rem',
                        borderRadius: '12px',
                        fontSize: '0.925rem'
                      }}
                    >
                      <List size={18} />
                      <span>เปิดสารบัญด่วน</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Progressive Disclosure: Collapse Control when expanded */}
            {isExpandedAll && !searchQuery.trim() && selectedPart === 'all' && !filterBookmarkOnly && groupedParts.length > 2 && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsExpandedAll(false);
                    const el = document.getElementById('chapters-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '0.55rem 1.35rem',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    borderRadius: '10px'
                  }}
                >
                  <ChevronUp size={16} />
                  <span>ย่อสารบัญลง (แสดงเฉพาะตอนแนะนำ)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
