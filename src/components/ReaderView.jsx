import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  PartyPopper,
  BookOpen,
  List,
  Sun,
  Moon,
  Coffee,
  Type,
  X,
  Check,
  HeartPulse,
  Brain,
  MessageCircle,
  Share,
  Compass,
  Calendar,
  ShieldCheck,
  Info,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FacebookIcon, YouTubeIcon, TikTokIcon } from './SocialIcons';
import allChaptersData from '../data/all_chapters.json';
import booksData from '../data/books.json';
import FastStrokeDiagram from './FastStrokeDiagram';
import GlymphaticSleepDiagram from './GlymphaticSleepDiagram';
import LifestylePillarsDiagram from './LifestylePillarsDiagram';
import FastAutophagyDiagram from './FastAutophagyDiagram';
import DementiaComparisonDiagram from './DementiaComparisonDiagram';

export default function ReaderView({
  chapterId,
  onBack,
  onSelectChapter,
  bookmarks,
  onToggleBookmark,
  onMarkRead,
  readHistory = [],
  onOpenAuthorModal,
  theme,
  setTheme,
  onAddToPlan,
  planItems = []
}) {
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large, xl
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTocDrawer, setShowTocDrawer] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [tocBookTab, setTocBookTab] = useState('book1');
  const [addedPlanItem, setAddedPlanItem] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Find active chapter from all chapters
  const currentIdx = allChaptersData.findIndex((c) => c.id === chapterId);
  const chapter = allChaptersData[currentIdx] || allChaptersData[0];
  
  // Book specific chapters for prev / next
  const bookChapters = allChaptersData.filter(c => c.bookId === chapter.bookId);
  const bookIdx = bookChapters.findIndex(c => c.id === chapter.id);
  const prevChapter = bookIdx > 0 ? bookChapters[bookIdx - 1] : null;
  const nextChapter = bookIdx < bookChapters.length - 1 ? bookChapters[bookIdx + 1] : null;

  const isBookmarked = bookmarks.includes(chapter.id);
  const isRead = readHistory.includes(chapter.id);
  const isBook1 = chapter.bookId === 'book1';
  const isStrokeChapter =
    chapter.id === 'b2_05_บทที่_5_โรคหลอดเลือดสมอง_(Stroke)_ฆาตกรเงียบในร่างกาย' ||
    chapter.id === 'b1_ch_26' ||
    (chapter.title && (chapter.title.toLowerCase().includes('stroke') || chapter.title.includes('หลอดเลือดสมอง')));

  const isSleepChapter =
    chapter.id === 'b1_ch_12' ||
    chapter.id === 'b1_ch_13' ||
    chapter.id === 'b1_ch_14' ||
    chapter.id === 'b2_17_บทที่_17_การนอนหลับและสมอง' ||
    (chapter.title && (chapter.title.includes('นอนหลับ') || chapter.title.toLowerCase().includes('sleep')));

  const isLifestyleChapter =
    chapter.id === 'b1_intro_0' ||
    chapter.id === 'b1_intro_1' ||
    chapter.id === 'b1_ch_1' ||
    (chapter.title && (chapter.title.includes('เวชศาสตร์วิถีชีวิต') || chapter.title.includes('เสาหลัก')));

  const isFastAutophagyChapter =
    chapter.id === 'b1_ch_5' ||
    chapter.id === 'b1_ch_6' ||
    (chapter.title && (chapter.title.includes('Intermittent Fasting') || chapter.title.includes('Autophagy')));

  const isDementiaChapter =
    chapter.id === 'b2_06_บทที่_6_โรคอัลไซเมอร์_เมื่อความทรงจำจางหาย' ||
    chapter.id === 'b2_07_บทที่_7_สมองเสื่อม_(Dementia)_มากกว่าแค่ลืม' ||
    chapter.id === 'b1_ch_29' ||
    (chapter.title && (chapter.title.includes('สมองเสื่อม') || chapter.title.includes('อัลไซเมอร์')));

  // Keep TOC drawer tab in sync with current chapter book
  useEffect(() => {
    setTocBookTab(chapter.bookId);
  }, [chapter.bookId]);

  // Handle scroll position (scroll to top or restore position if resuming)
  useEffect(() => {
    let hasRestored = false;
    try {
      const saved = localStorage.getItem('dr_v_last_read');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.chapterId === chapter.id && parsed.scrollY > 150 && (window.location.hash.includes('resume') || parsed.progress < 95)) {
          setTimeout(() => {
            window.scrollTo({ top: parsed.scrollY, behavior: 'smooth' });
          }, 150);
          hasRestored = true;
        }
      }
    } catch {}

    if (!hasRestored) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [chapter.id]);

  // Handle Escape key to close TOC drawer or share menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowTocDrawer(false);
        setShowShareMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll progress & persist to dr_v_last_read (with mobile headroom auto-hide)
  useEffect(() => {
    let timer = null;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Auto-hide header when scrolling down in reading mode, restore when scrolling up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 12) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8 || currentScrollY < 80) {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        const clamped = Math.min(100, Math.max(0, currentProgress));
        setScrollProgress(clamped);

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            localStorage.setItem(
              'dr_v_last_read',
              JSON.stringify({
                chapterId: chapter.id,
                title: chapter.title,
                bookId: chapter.bookId,
                partTitle: chapter.partTitle || '',
                progress: Math.round(clamped),
                scrollY: window.scrollY,
                timestamp: Date.now()
              })
            );
          } catch {}
        }, 250);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [chapter.id, chapter.title, chapter.bookId, chapter.partTitle]);

  // Font size mapper
  const getFontSizeStyle = () => {
    switch (fontSize) {
      case 'small': return { fontSize: '1.025rem', lineHeight: '1.8' };
      case 'large': return { fontSize: '1.275rem', lineHeight: '1.9' };
      case 'xl': return { fontSize: '1.45rem', lineHeight: '2.0' };
      case 'medium':
      default: return { fontSize: '1.15rem', lineHeight: '1.85' };
    }
  };

  const cycleFontSize = () => {
    if (fontSize === 'small') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xl');
    else setFontSize('small');
  };

  const getFontSizeLabel = () => {
    switch (fontSize) {
      case 'small': return 'A-';
      case 'medium': return 'A';
      case 'large': return 'A+';
      case 'xl': return 'XL';
      default: return 'A';
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} />;
    if (theme === 'sepia') return <Coffee size={18} />;
    return <Moon size={18} />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'สว่าง';
    if (theme === 'sepia') return 'ซีเปีย';
    return 'มืด';
  };

  // Share handlers
  const shareTitle = `${chapter.title} — ${chapter.bookTitle} (นพ.วีระพันธ์ สุวรรณนามัย)`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.warn('Copy link failed:', e);
    }
  };

  const handleShareUniversal = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `อ่านบทความ "${chapter.title}" จาก ${chapter.bookTitle} โดย นพ.วีระพันธ์ สุวรรณนามัย\n`,
          url: window.location.href
        });
        return;
      } catch (e) {}
    }
    handleCopyLink();
  };

  const handleShareLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareTitle)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleExplicitFinish = () => {
    onMarkRead(chapter.id);
    triggerConfetti();
  };

  const handleAddActionToPlan = (actionText) => {
    if (onAddToPlan) {
      onAddToPlan(actionText);
      setAddedPlanItem(actionText);
      setTimeout(() => setAddedPlanItem(null), 2500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{
          width: `${scrollProgress}%`,
          background: isBook1 
            ? 'linear-gradient(90deg, #059669, #10b981, #34d399)'
            : 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)'
        }}
      />

      {/* Reader Sticky Header (Single Clean Header with Auto-hide on mobile scroll) */}
      <header
        className="glass-nav reader-sticky-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: '1px solid var(--border-color)',
          minHeight: '56px',
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease',
          opacity: isHeaderVisible ? 1 : 0
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.35rem',
            paddingBottom: '0.35rem',
            gap: '0.5rem'
          }}
        >
          {/* Left: Back to Home button */}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onBack}
            style={{
              padding: '0.45rem 0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              flexShrink: 0
            }}
            aria-label="กลับสู่หน้าสารบัญ"
          >
            <ArrowLeft size={18} />
            <span>สารบัญ</span>
          </button>

          {/* Center: Book & Chapter Breadcrumb (Desktop / Tablet only) */}
          <div
            className="reader-nav-center"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0 0.5rem',
              minWidth: 0,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {chapter.bookTitle} • ตอนที่ {bookIdx + 1}/{bookChapters.length}
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {chapter.title}
            </div>
          </div>

          {/* Right: Controls (Font Size, Theme, TOC Drawer, Share, Bookmark) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
            {/* Font Size Button */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={cycleFontSize}
              title={`ปรับขนาดตัวอักษร: ${getFontSizeLabel()}`}
              aria-label={`ปรับขนาดตัวอักษร: ${getFontSizeLabel()}`}
              style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', fontWeight: '700', gap: '0.2rem' }}
            >
              <Type size={16} />
              <span>{getFontSizeLabel()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={toggleTheme}
              title={`สลับธีม: ${getThemeLabel()}`}
              aria-label={`สลับธีม: ${getThemeLabel()}`}
              style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', gap: '0.3rem' }}
            >
              {getThemeIcon()}
              <span className="nav-desktop-only-btn">{getThemeLabel()}</span>
            </button>

            {/* TOC Drawer Toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={() => setShowTocDrawer(true)}
              title="เปิดสารบัญบทเรียน"
              aria-label="เปิดสารบัญบทเรียน"
            >
              <List size={18} />
            </button>

            {/* Share Menu Toggle */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => setShowShareMenu(!showShareMenu)}
                title="แชร์บทความนี้"
                aria-label="แชร์บทความนี้"
              >
                <Share2 size={18} />
              </button>

              {showShareMenu && (
                <div
                  className="card"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: '210px',
                    padding: '0.5rem',
                    boxShadow: 'var(--card-shadow)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      handleShareLine();
                      setShowShareMenu(false);
                    }}
                    style={{ justifyContent: 'flex-start', padding: '0.45rem 0.65rem', fontSize: '0.85rem', gap: '0.6rem' }}
                  >
                    <MessageCircle size={16} style={{ color: '#06c755' }} />
                    <span>แชร์ไปยัง LINE</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      handleShareFacebook();
                      setShowShareMenu(false);
                    }}
                    style={{ justifyContent: 'flex-start', padding: '0.45rem 0.65rem', fontSize: '0.85rem', gap: '0.6rem' }}
                  >
                    <FacebookIcon size={16} color="#1877f2" />
                    <span>แชร์ไปยัง Facebook</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      handleShareUniversal();
                      setShowShareMenu(false);
                    }}
                    style={{ justifyContent: 'flex-start', padding: '0.45rem 0.65rem', fontSize: '0.85rem', gap: '0.6rem' }}
                  >
                    <Share size={16} />
                    <span>{copiedLink ? '✓ คัดลอกสำเร็จ!' : 'แชร์ / คัดลอกลิงก์'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bookmark Toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={() => onToggleBookmark(chapter.id)}
              title={isBookmarked ? 'ยกเลิกการบันทึก' : 'บันทึกบทความ'}
              aria-label={isBookmarked ? 'ยกเลิกการบันทึก' : 'บันทึกบทความ'}
              style={{ color: isBookmarked ? 'var(--accent-primary)' : 'inherit' }}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Article Content */}
      <main style={{ flex: 1, padding: '2.5rem 0 5rem 0' }}>
        <article className="reader-container">
          {/* Article Header & Meta */}
          <header style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
              <span className={isBook1 ? 'badge-book1 badge' : 'badge-book2 badge'}>
                {isBook1 ? <HeartPulse size={14} /> : <Brain size={14} />}
                <span>{chapter.bookTitle}</span>
              </span>

              <span className="badge">
                <span>{chapter.partTitle}</span>
              </span>

              <span className="badge" style={{ color: 'var(--text-muted)' }}>
                <span>อ่าน ~{chapter.readingTime}</span>
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.85rem, 3.8vw, 2.65rem)',
                fontWeight: '800',
                color: 'var(--text-primary)',
                lineHeight: '1.3',
                marginBottom: '1rem'
              }}
            >
              {chapter.title}
            </h1>

            {/* Author Credit and Official Source Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '2rem'
              }}
            >
              <div
                onClick={onOpenAuthorModal}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenAuthorModal()}
                aria-label="ดูประวัติ นพ.วีระพันธ์ สุวรรณนามัย"
              >
                <img
                  src="/images/doctorv1.jpg"
                  alt="นพ.วีระพันธ์ สุวรรณนามัย"
                  loading="lazy"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                    นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    ประสาทศัลยแพทย์ & แพทย์เวชศาสตร์วิถีชีวิต
                  </div>
                </div>
              </div>

              {/* Official Source Link */}
              {chapter.sourceUrl && (
                <a
                  href={chapter.sourceUrl.split(' ')[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.8125rem',
                    padding: '0.45rem 0.85rem',
                    gap: '0.4rem',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <ExternalLink size={14} />
                  <span>ดูโพสต์/คลิปต้นฉบับหมอวี</span>
                </a>
              )}
            </div>
          </header>

          {/* Infographic Image if Available */}
          {chapter.imageUrl && (
            <div
              style={{
                marginBottom: '2.5rem',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <img
                src={chapter.imageUrl}
                alt={`ภาพประกอบ ${chapter.title}`}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* Quotes Box */}
          {chapter.quotes && chapter.quotes.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              {chapter.quotes.map((quote, qIdx) => (
                <blockquote key={qIdx} className="callout-quote">
                  <p style={{ margin: 0 }}>"{quote}"</p>
                </blockquote>
              ))}
            </div>
          )}

          {/* Article Main Body Content */}
          <div
            style={{
              ...getFontSizeStyle(),
              color: 'var(--text-primary)',
              wordBreak: 'break-word'
            }}
          >
            {chapter.paragraphs && chapter.paragraphs.length > 0 ? (
              chapter.paragraphs.map((para, pIdx) => {
                // Section heading check
                const isHeading = (para.startsWith('##') || para.startsWith('###') || (para.length < 55 && !para.includes('\n') && !para.endsWith('.') && !para.endsWith('ครับ') && !para.endsWith('ค่ะ') && pIdx > 0));
                
                if (isHeading) {
                  return (
                    <h3
                      key={pIdx}
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: '700',
                        color: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)',
                        marginTop: '2.25rem',
                        marginBottom: '0.85rem',
                        lineHeight: '1.4'
                      }}
                    >
                      {para.replace(/^#+\s*/, '')}
                    </h3>
                  );
                }

                return (
                  <p
                    key={pIdx}
                    style={{
                      marginBottom: '1.35rem',
                      whiteSpace: 'pre-line',
                      textAlign: 'left'
                    }}
                  >
                    {para}
                  </p>
                );
              })
            ) : (
              <div style={{ whiteSpace: 'pre-line' }}>
                {chapter.rawText}
              </div>
            )}
          </div>

          {/* Phase 7 Medical Diagrams (Contextually Embedded) */}
          {isStrokeChapter && <FastStrokeDiagram />}
          {isSleepChapter && <GlymphaticSleepDiagram />}
          {isLifestyleChapter && <LifestylePillarsDiagram />}
          {isFastAutophagyChapter && <FastAutophagyDiagram />}
          {isDementiaChapter && <DementiaComparisonDiagram />}

          {/* Key Takeaways Callout */}
          {chapter.takeaways && chapter.takeaways.length > 0 && (
            <div className="callout-takeaway">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '700', fontSize: '1.05rem', color: 'var(--takeaway-text)' }}>
                <Sparkles size={20} />
                <span>สิ่งที่อยากให้คุณจำจากบทนี้</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {chapter.takeaways.map((t, idx) => (
                  <li key={idx} style={{ lineHeight: '1.6' }}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Items Callout with 7-Day Plan Integration */}
          {chapter.actionItems && chapter.actionItems.length > 0 && (
            <div className="callout-action">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.05rem', color: 'var(--action-text)' }}>
                  <CheckCircle2 size={20} />
                  <span>ทำได้เลยพรุ่งนี้ (Action Items)</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--action-text)', opacity: 0.85 }}>
                  เลือกข้อที่สนใจเพื่อใส่ในแผน 7 วัน
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {chapter.actionItems.map((a, idx) => {
                  const isInPlan = planItems.some(p => p.text === a);
                  const isJustAdded = addedPlanItem === a;

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        padding: '0.6rem 0.85rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '10px'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>{a}</span>
                      <button
                        type="button"
                        onClick={() => handleAddActionToPlan(a)}
                        className={`btn ${isInPlan ? 'btn-ghost' : 'btn-primary'}`}
                        style={{
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.775rem',
                          flexShrink: 0,
                          backgroundColor: isInPlan ? undefined : 'var(--book1-color)'
                        }}
                      >
                        {isInPlan ? (
                          <span style={{ color: 'var(--book1-color)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Check size={13} />
                            <span>อยู่ในแผน 7 วันแล้ว</span>
                          </span>
                        ) : isJustAdded ? (
                          <span>✓ เพิ่มแล้ว!</span>
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={13} />
                            <span>+ ใส่ในแผน 7 วัน</span>
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mark Finished Active Confirmation Button */}
          <div
            style={{
              margin: '3rem 0 2rem 0',
              padding: '1.5rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              {isRead ? '🎉 คุณได้บันทึกการอ่านจบบทนี้แล้ว' : 'อ่านบทความนี้จบแล้วหรือยัง?'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              กดปุ่มด้านล่างเพื่อบันทึกสถิติการอ่าน และร่วมเฉลิมฉลองการดูแลสุขภาพของตนเอง
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleExplicitFinish}
              style={{
                backgroundColor: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)',
                fontSize: '0.95rem',
                padding: '0.65rem 1.5rem',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <PartyPopper size={18} />
              <span>{isRead ? 'กดเฉลิมฉลองอีกครั้ง 🎊' : 'ฉันอ่านบทความนี้จบแล้ว ✓'}</span>
            </button>
          </div>

          {/* Evidence & Governance Transparency Box */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginTop: '2rem'
            }}
          >
            <div style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--book1-color)' }} />
              <span>มาตรฐานความถูกต้องและการตรวจทานทางการแพทย์ (Evidence Governance)</span>
            </div>
            <div>
              <strong>ผู้ทบทวนเนื้อหา:</strong> นพ.วีระพันธ์ สุวรรณนามัย (ประสาทศัลยแพทย์ & แพทย์เวชศาสตร์วิถีชีวิต)
            </div>
            <div>
              <strong>ระดับหลักฐาน (Level of Evidence):</strong> อิงจากงานวิจัยทางคลินิก (Randomized Controlled Trials & Meta-analyses)
            </div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              * ข้อมูลมีวัตถุประสงค์เพื่อให้ความรู้สุขภาพแก่มวลชน มิได้ใช้ทดแทนการตรวจวินิจฉัยและการรักษาของแพทย์เฉพาะทาง
            </div>
          </div>

          {/* Scientific References */}
          {chapter.references && chapter.references.length > 0 && (
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)'
              }}
            >
              <div style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                เอกสารอ้างอิงและหลักฐานทางคลินิก (References):
              </div>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {chapter.references.map((ref, rIdx) => (
                  <li key={rIdx}>{ref}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Next / Prev Chapter Navigation */}
          <div
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            {prevChapter ? (
              <button
                type="button"
                onClick={() => onSelectChapter(prevChapter.id)}
                className="btn-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  textAlign: 'left'
                }}
              >
                <ChevronLeft size={24} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>บทก่อนหน้า</div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {prevChapter.title}
                  </div>
                </div>
              </button>
            ) : <div />}

            {nextChapter ? (
              <button
                type="button"
                onClick={() => onSelectChapter(nextChapter.id)}
                className="btn-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem',
                  textAlign: 'right'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)', fontWeight: '600' }}>
                    บทถัดไป
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {nextChapter.title}
                  </div>
                </div>
                <ChevronRight size={24} style={{ color: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)', flexShrink: 0 }} />
              </button>
            ) : <div />}
          </div>
        </article>
      </main>

      {/* Floating Reading Controls Capsule Bar */}
      {scrollProgress > 5 && (
        <aside
          className="floating-reader-bar animate-fade-in"
          aria-label="แถบเครื่องมือการอ่านลอยตัว"
          style={{
            position: 'fixed',
            bottom: 'max(env(safe-area-inset-bottom, 0px), 1.25rem)',
            left: '50%',
            transform: `translateX(-50%) ${!isHeaderVisible ? 'translateY(80px)' : 'translateY(0)'}`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
            opacity: isHeaderVisible ? 1 : 0,
            pointerEvents: isHeaderVisible ? 'auto' : 'none',
            zIndex: 45,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.4rem 0.65rem',
            borderRadius: '999px',
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 30px -4px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Progress % / Time left */}
          <div
            style={{
              padding: '0.25rem 0.65rem',
              fontSize: '0.775rem',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderRight: '1px solid var(--border-color)'
            }}
          >
            <Clock size={13} style={{ color: isBook1 ? 'var(--book1-color)' : 'var(--book2-color)' }} />
            <span>{Math.round(scrollProgress)}%</span>
            <span className="nav-desktop-only-btn" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              (เหลือ ~{Math.max(1, Math.ceil(parseInt(chapter.readingTime || '3') * (1 - scrollProgress / 100)))} น.)
            </span>
          </div>

          {/* Font Size Cycle */}
          <button
            type="button"
            onClick={cycleFontSize}
            className="btn btn-ghost"
            title={`ขนาดอักษร: ${getFontSizeLabel()}`}
            aria-label={`ปรับขนาดอักษร: ${getFontSizeLabel()}`}
            style={{
              padding: '0.35rem 0.6rem',
              fontSize: '0.8rem',
              fontWeight: '700',
              borderRadius: '999px',
              minHeight: '36px',
              gap: '0.2rem'
            }}
          >
            <Type size={14} />
            <span>{getFontSizeLabel()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost"
            title={`สลับธีม: ${getThemeLabel()}`}
            aria-label={`สลับธีม: ${getThemeLabel()}`}
            style={{
              padding: '0.35rem 0.6rem',
              fontSize: '0.8rem',
              borderRadius: '999px',
              minHeight: '36px',
              gap: '0.25rem'
            }}
          >
            {getThemeIcon()}
          </button>

          {/* TOC Drawer */}
          <button
            type="button"
            onClick={() => setShowTocDrawer(true)}
            className="btn btn-ghost"
            title="เปิดสารบัญ"
            aria-label="เปิดสารบัญ"
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              borderRadius: '999px',
              minHeight: '36px',
              gap: '0.3rem'
            }}
          >
            <List size={15} />
            <span className="nav-desktop-only-btn">สารบัญ</span>
          </button>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-ghost"
            title="เลื่อนขึ้นบนสุด"
            aria-label="เลื่อนขึ้นบนสุด"
            style={{
              padding: '0.35rem 0.55rem',
              borderRadius: '999px',
              minHeight: '36px',
              color: 'var(--text-muted)'
            }}
          >
            <ChevronLeft size={16} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </aside>
      )}

      {/* Slide-out TOC Drawer */}
      {showTocDrawer && (
        <div
          className="modal-backdrop"
          onClick={() => setShowTocDrawer(false)}
          role="dialog"
          aria-modal="true"
          style={{ justifyContent: 'flex-end', padding: 0 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '100vh',
              maxHeight: '100vh',
              borderRadius: '0',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.25s ease-out'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: '700', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} />
                <span>สารบัญบทเรียน</span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => setShowTocDrawer(false)}
                aria-label="ปิดสารบัญ"
              >
                <X size={20} />
              </button>
            </div>

            {/* Book Tabs in TOC Drawer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.4rem',
                marginBottom: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                padding: '0.3rem',
                borderRadius: '10px'
              }}
            >
              <button
                type="button"
                className={`btn ${tocBookTab === 'book1' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setTocBookTab('book1')}
                style={{ padding: '0.4rem', fontSize: '0.8rem', gap: '0.3rem' }}
              >
                <HeartPulse size={14} />
                <span>ก่อนจะป่วย (39)</span>
              </button>
              <button
                type="button"
                className={`btn ${tocBookTab === 'book2' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setTocBookTab('book2')}
                style={{ padding: '0.4rem', fontSize: '0.8rem', gap: '0.3rem' }}
              >
                <Brain size={14} />
                <span>ก่อนสมองพัง (22)</span>
              </button>
            </div>

            {/* Chapter Items List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.25rem' }}>
              {allChaptersData
                .filter(c => c.bookId === tocBookTab)
                .map((chap, idx) => {
                  const isActive = chap.id === chapter.id;
                  const isItemRead = readHistory.includes(chap.id);

                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => {
                        onSelectChapter(chap.id);
                        setShowTocDrawer(false);
                      }}
                      style={{
                        padding: '0.75rem 0.85rem',
                        borderRadius: '10px',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                        border: `1px solid ${isActive ? 'var(--accent-primary)' : 'transparent'}`,
                        fontWeight: isActive ? '700' : '500',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '0.75rem', opacity: 0.6, width: '20px' }}>{idx + 1}.</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {chap.title}
                        </span>
                      </div>

                      {isItemRead && (
                        <CheckCircle2 size={15} style={{ color: 'var(--book1-color)', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
