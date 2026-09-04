import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthorSection from './components/AuthorSection';
import AuthorModal from './components/AuthorModal';
import ChapterList from './components/ChapterList';
import ReaderView from './components/ReaderView';
import HealthToolsModal from './components/HealthToolsModal';
import SearchModal from './components/SearchModal';
import Plan7DayModal from './components/Plan7DayModal';
import QuickTOCModal from './components/QuickTOCModal';
import MedicalDiagramsModal from './components/MedicalDiagramsModal';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import PWAInstallBanner from './components/PWAInstallBanner';
import allChaptersData from './data/all_chapters.json';
import booksData from './data/books.json';
import { AlertCircle, ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Theme State with System auto-detect
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dr_v_theme');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Navigation View State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'reader' | 'not_found'
  const [selectedChapterId, setSelectedChapterId] = useState(allChaptersData[0]?.id || '');
  const [selectedBookFilter, setSelectedBookFilter] = useState('all'); // 'all' | 'book1' | 'book2'

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dr_v_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Read History State
  const [readHistory, setReadHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dr_v_read_history') || '[]');
    } catch {
      return [];
    }
  });

  // 7-Day Action Plan State
  const [planItems, setPlanItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dr_v_7day_plan') || '[]');
    } catch {
      return [];
    }
  });

  // Modal States
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [toolsInitialTab, setToolsInitialTab] = useState('lifestyle');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isQuickTOCOpen, setIsQuickTOCOpen] = useState(false);
  const [isDiagramsModalOpen, setIsDiagramsModalOpen] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState('fast');
  const [filterBookmarkOnly, setFilterBookmarkOnly] = useState(false);
  const [importToast, setImportToast] = useState(false);

  // Apply Theme Attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dr_v_theme', theme);
  }, [theme]);

  // Persist Bookmarks
  useEffect(() => {
    localStorage.setItem('dr_v_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Persist Read History
  useEffect(() => {
    localStorage.setItem('dr_v_read_history', JSON.stringify(readHistory));
  }, [readHistory]);

  // Persist 7-Day Plan
  useEffect(() => {
    localStorage.setItem('dr_v_7day_plan', JSON.stringify(planItems));
  }, [planItems]);

  // Handle URL Hash for Deep Linking & Magic Links (e.g. #read=b1_intro_0, #plan_data=...)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#read=')) {
        const rawId = hash.replace('#read=', '').replace('&resume=true', '');
        let id = rawId;
        try {
          id = decodeURIComponent(rawId);
        } catch {
          id = rawId;
        }
        const exists = allChaptersData.find(c => c.id === id || c.id === rawId);
        if (exists) {
          setSelectedChapterId(exists.id);
          setActiveView('reader');
        } else {
          setActiveView('not_found');
        }
      } else if (hash.startsWith('#plan_data=')) {
        const rawData = hash.replace('#plan_data=', '');
        try {
          const jsonStr = decodeURIComponent(atob(rawData));
          const importedItems = JSON.parse(jsonStr);
          if (Array.isArray(importedItems) && importedItems.length > 0) {
            setPlanItems((prev) => {
              const existingTexts = new Set(prev.map(i => i.text));
              const newItems = importedItems
                .filter(i => i && i.text && !existingTexts.has(i.text))
                .map((i, idx) => ({
                  id: `magic_${Date.now()}_${idx}`,
                  text: i.text,
                  completed: !!i.completed
                }));
              return [...prev, ...newItems];
            });
            setIsPlanModalOpen(true);
            setImportToast(true);
            setTimeout(() => setImportToast(false), 4000);
          }
        } catch (e) {
          console.warn('Failed to parse plan_data from URL:', e);
        }
      } else if (hash === '#tools' || hash.startsWith('#tools=')) {
        const tab = hash.replace('#tools=', '').replace('#tools', '') || 'lifestyle';
        setToolsInitialTab(tab);
        setIsToolsModalOpen(true);
      } else if (hash === '#plan') {
        setIsPlanModalOpen(true);
      } else if (hash === '#toc') {
        setIsQuickTOCOpen(true);
      } else if (hash === '#author') {
        setIsAuthorModalOpen(true);
      } else if (hash === '#diagrams' || hash.startsWith('#diagrams=')) {
        const dId = hash.replace('#diagrams=', '').replace('#diagrams', '') || 'fast';
        setSelectedDiagram(dId);
        setIsDiagramsModalOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDiagrams = (dId = 'fast') => {
    setSelectedDiagram(typeof dId === 'string' ? dId : 'fast');
    setIsDiagramsModalOpen(true);
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const markAsRead = (id) => {
    setReadHistory((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleSelectChapter = (id) => {
    const exists = allChaptersData.find(c => c.id === id);
    if (exists) {
      setSelectedChapterId(id);
      setActiveView('reader');
      window.location.hash = `read=${id}`;
    } else {
      setActiveView('not_found');
    }
  };

  const handleBackToHome = () => {
    setActiveView('home');
    if (window.location.hash.startsWith('#read=')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleStartReadingBook = (bookId) => {
    const bookChapters = allChaptersData.filter(c => c.bookId === bookId);
    if (bookChapters.length > 0) {
      handleSelectChapter(bookChapters[0].id);
    }
  };

  const handleOpenBookmarks = () => {
    setFilterBookmarkOnly(true);
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById('chapters-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenToolsWithTab = (tab = 'lifestyle') => {
    setToolsInitialTab(tab);
    setIsToolsModalOpen(true);
  };

  // 7-Day Plan Handlers
  const handleAddToPlan = (actionText) => {
    if (planItems.some(p => p.text === actionText)) return;
    const newItem = {
      id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      text: actionText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setPlanItems(prev => [...prev, newItem]);
  };

  const handleTogglePlanItem = (id) => {
    setPlanItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleRemovePlanItem = (id) => {
    setPlanItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddCustomPlanItem = (text) => {
    const newItem = {
      id: 'plan_' + Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setPlanItems(prev => [...prev, newItem]);
  };

  const handleOpenSearch = (q = '') => {
    setSearchInitialQuery(typeof q === 'string' ? q : '');
    setIsSearchModalOpen(true);
  };

  const handleScrollToChapters = () => {
    const chapters = document.getElementById('chapters-section');
    if (chapters) chapters.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar — Rendered on Home view */}
      {activeView === 'home' && (
        <Navbar
          theme={theme}
          setTheme={setTheme}
          onOpenSearch={() => handleOpenSearch('')}
          onOpenAuthor={() => setIsAuthorModalOpen(true)}
          onOpenTools={handleOpenToolsWithTab}
          onOpenPlan={() => setIsPlanModalOpen(true)}
          onOpenTOC={() => setIsQuickTOCOpen(true)}
          onOpenDiagrams={handleOpenDiagrams}
          activeView={activeView}
          setActiveView={setActiveView}
          bookmarksCount={bookmarks.length}
          onOpenBookmarks={handleOpenBookmarks}
          planCount={planItems.filter(i => !i.completed).length}
        />
      )}

      {/* Main View Router */}
      {activeView === 'reader' ? (
        <ReaderView
          chapterId={selectedChapterId}
          onBack={handleBackToHome}
          onSelectChapter={handleSelectChapter}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onMarkRead={markAsRead}
          readHistory={readHistory}
          onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
          theme={theme}
          setTheme={setTheme}
          onAddToPlan={handleAddToPlan}
          planItems={planItems}
        />
      ) : activeView === 'not_found' ? (
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
          <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <AlertCircle size={48} style={{ color: 'var(--danger-border)', margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>ไม่พบบทความที่ต้องการ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              ลิงก์ที่คุณเปิดอาจไม่ถูกต้อง หรือบทความถูกย้ายตำแหน่งแล้ว สามารถค้นหาหรือกลับสู่หน้าสารบัญหลักได้เลยครับ
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-primary" onClick={handleBackToHome}>
                <ArrowLeft size={16} />
                <span>กลับสู่หน้าแรก</span>
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => handleOpenSearch('')}>
                <span>ค้นหาบทความ</span>
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main style={{ flex: 1 }} className="home-main-content">
          {/* Dual-Book Hero Showcase & Intent Discovery */}
          <Hero
            onStartReadingBook={handleStartReadingBook}
            onOpenAuthor={() => setIsAuthorModalOpen(true)}
            onOpenTools={handleOpenToolsWithTab}
            onOpenPlan={() => setIsPlanModalOpen(true)}
            onOpenSearch={handleOpenSearch}
            onSelectChapter={handleSelectChapter}
            onScrollToChapters={handleScrollToChapters}
            onOpenDiagrams={handleOpenDiagrams}
            planCount={planItems.filter((item) => !item.completed).length}
          />

          {/* Unified Chapter List across 2 Books */}
          <ChapterList
            onSelectChapter={handleSelectChapter}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            readHistory={readHistory}
            filterBookmarkOnly={filterBookmarkOnly}
            onResetBookmarkFilter={() => setFilterBookmarkOnly(false)}
            selectedBookFilter={selectedBookFilter}
            setSelectedBookFilter={setSelectedBookFilter}
            onOpenTOC={() => setIsQuickTOCOpen(true)}
          />

          {/* Author Profile & Social Channels */}
          <AuthorSection onOpenModal={() => setIsAuthorModalOpen(true)} />
        </main>
      )}

      {/* Footer — Rendered on Home */}
      {activeView === 'home' && (
        <Footer
          onOpenAuthor={() => setIsAuthorModalOpen(true)}
          onOpenTools={handleOpenToolsWithTab}
          onSelectBook={(b) => setSelectedBookFilter(b)}
        />
      )}

      {/* Modals */}
      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
      />

      <HealthToolsModal
        isOpen={isToolsModalOpen}
        initialTab={toolsInitialTab}
        onClose={() => setIsToolsModalOpen(false)}
        onSelectChapter={handleSelectChapter}
        onAddToPlan={handleAddToPlan}
        planItems={planItems}
        onOpenPlan={() => {
          setIsToolsModalOpen(false);
          setIsPlanModalOpen(true);
        }}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        initialQuery={searchInitialQuery}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectChapter={handleSelectChapter}
      />

      <Plan7DayModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        planItems={planItems}
        onTogglePlanItem={handleTogglePlanItem}
        onRemovePlanItem={handleRemovePlanItem}
        onAddCustomItem={handleAddCustomPlanItem}
      />

      <QuickTOCModal
        isOpen={isQuickTOCOpen}
        onClose={() => setIsQuickTOCOpen(false)}
        onSelectChapter={handleSelectChapter}
        bookmarks={bookmarks}
        readHistory={readHistory}
      />

      {/* Phase 7: Medical Diagrams Hub Modal */}
      <MedicalDiagramsModal
        isOpen={isDiagramsModalOpen}
        initialDiagram={selectedDiagram}
        onClose={() => setIsDiagramsModalOpen(false)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* PWA Install Banner (Visible on Home screen only, not blocking reading) */}
      {activeView === 'home' && <PWAInstallBanner />}

      {/* Mobile Bottom Navigation Bar (Visible on mobile Home screen <= 640px) */}
      {activeView === 'home' && (
        <MobileBottomNav
          activeView={activeView}
          onGoHome={handleBackToHome}
          onOpenTOC={() => setIsQuickTOCOpen(true)}
          onOpenDiagrams={handleOpenDiagrams}
          onOpenPlan={() => setIsPlanModalOpen(true)}
          onOpenSearch={() => handleOpenSearch('')}
          planCount={planItems.filter((item) => !item.completed).length}
        />
      )}

      {/* Floating Magic Link Import Toast Notification */}
      {importToast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#059669',
            color: '#ffffff',
            padding: '0.85rem 1.35rem',
            borderRadius: '14px',
            boxShadow: '0 12px 32px rgba(5, 150, 105, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
        >
          <CheckCircle2 size={20} />
          <span>นำเข้าเป้าหมายจากลิงก์แผน 7 วันสำเร็จแล้ว!</span>
        </div>
      )}
    </div>
  );
}
