import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Activity,
  AlertTriangle,
  PhoneCall,
  Moon,
  Brain,
  CheckSquare,
  Sparkles,
  AlertCircle,
  HeartPulse,
  CheckCircle2,
  ShieldAlert,
  RotateCcw,
  Info,
  Check,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react';

import FastStrokeDiagram from './FastStrokeDiagram';

export default function HealthToolsModal({
  isOpen,
  onClose,
  onSelectChapter,
  initialTab = 'lifestyle',
  onAddToPlan,
  planItems = [],
  onOpenPlan
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'lifestyle', 'fast', 'dementia', 'sleep'
  const [addedHabits, setAddedHabits] = useState([]);
  const [showFastDiagram, setShowFastDiagram] = useState(false);
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Keep track of triggering element for return focus
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement;
      setActiveTab(initialTab || 'lifestyle');
    }
  }, [isOpen, initialTab]);

  // Escape key and Focus Trap handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Focus Trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        const firstBtn = modalRef.current?.querySelector('button');
        firstBtn?.focus();
      }, 50);
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus?.();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // FAST Test State
  const [fastAnswers, setFastAnswers] = useState({
    face: undefined,
    arm: undefined,
    speech: undefined
  });

  // Lifestyle Medicine 6 Pillars Test State (10 items: { id: true | false })
  const [lifestyleAnswers, setLifestyleAnswers] = useState({});

  // Dementia Test State (6 items: { id: true | false })
  const [dementiaAnswers, setDementiaAnswers] = useState({});

  // Sleep Test State (6 items: { id: true | false })
  const [sleepScore, setSleepScore] = useState({});

  if (!isOpen) return null;

  const lifestyleQuestions = [
    { id: 'l1', pillar: 'โภชนาการ', q: 'รับประทานผัก ผลไม้หลากสี และอาหารที่มีกากใยสูงเป็นประจำทุกวัน (หลีกเลี่ยงอาหารแปรรูปและน้ำตาลสูง)' },
    { id: 'l2', pillar: 'โภชนาการ', q: 'ดื่มน้ำสะอาดเพียงพออย่างน้อยวันละ 1.5 - 2 ลิตร' },
    { id: 'l3', pillar: 'การออกกำลังกาย', q: 'ออกกำลังกายแบบแอโรบิก (เดินเร็ว วิ่ง ปั่นจักรยาน) สะสมอย่างน้อย 150 นาทีต่อสัปดาห์' },
    { id: 'l4', pillar: 'การออกกำลังกาย', q: 'มีการออกกำลังกายเสริมสร้างกล้ามเนื้อ (Resistance Training) อย่างน้อย 2 วันต่อสัปดาห์' },
    { id: 'l5', pillar: 'การนอนหลับ', q: 'นอนหลับอย่างมีคุณภาพต่อเนื่อง 7 - 8 ชั่วโมงต่อคืน และตื่นมาสดชื่น' },
    { id: 'l6', pillar: 'การนอนหลับ', q: 'เข้านอนและตื่นนอนตรงเวลาสม่ำเสมอ ทั้งวันธรรมดาและวันหยุด' },
    { id: 'l7', pillar: 'จัดการความเครียด', q: 'มีวิธีผ่อนคลายความเครียด เช่น ฝึกสมาธิ ฝึกหายใจ หรือทำงานอดิเรกเป็นประจำ' },
    { id: 'l8', pillar: 'ปลอดสารพิษ', q: 'ไม่สูบบุหรี่ บุหรี่ไฟฟ้า และหลีกเลี่ยงการรับควันบุหรี่มือสอง' },
    { id: 'l9', pillar: 'ปลอดสารพิษ', q: 'งดหรือจำกัดการดื่มเครื่องดื่มแอลกอฮอล์ในระดับที่ไม่กระทบสุขภาพ' },
    { id: 'l10', pillar: 'ความสัมพันธ์', q: 'มีความสัมพันธ์ที่อบอุ่นกับครอบครัว เพื่อน หรือชุมชน และมีเป้าหมายในชีวิต' }
  ];

  const dementiaQuestions = [
    { id: 'd1', q: 'ลืมเหตุการณ์หรือเรื่องที่เพิ่งเกิดขึ้นเมื่อไม่กี่ชั่วโมงก่อนเป็นประจำ (ลืมเรื่องใหม่ แต่จำเรื่องเก่าได้ดี)' },
    { id: 'd2', q: 'มีปัญหาในการจัดการเรื่องเงิน การทอนเงิน หรือการจ่ายบิลที่เคยทำได้คล่อง' },
    { id: 'd3', q: 'หลงทางในสถานที่ที่เคยคุ้นเคย หรือจำทิศทางกลับบ้านไม่ได้' },
    { id: 'd4', q: 'บุคลิกภาพหรืออารมณ์เปลี่ยนไปอย่างชัดเจน เช่น ก้าวร้าว หวาดระแวง หรือเฉยเมยผิดปกติ' },
    { id: 'd5', q: 'นึกคำศัพท์ง่ายๆ ไม่ออกบ่อยครั้ง หรือเรียกชื่อสิ่งของผิดไปเลย' },
    { id: 'd6', q: 'วางสิ่งของไว้ในที่แปลกๆ เช่น เอารีโมทไปแช่ในตู้เย็น แล้วหาไม่เจอ' }
  ];

  const sleepQuestions = [
    { id: 's1', q: 'นอนหลับต่อเนื่อง 7-8 ชั่วโมงต่อคืนโดยไม่ตื่นกลางดึกบ่อย' },
    { id: 's2', q: 'เข้านอนและตื่นนอนตรงเวลาสม่ำเสมอทุกวัน' },
    { id: 's3', q: 'ไม่เล่นโทรศัพท์มือถือหรือดูหน้าจอก่อนนอนอย่างน้อย 30-60 นาที' },
    { id: 's4', q: 'ห้องนอนมืดสนิท เงียบ และมีอุณหภูมิเย็นสบาย' },
    { id: 's5', q: 'งดเครื่องดื่มคาเฟอีน (กาแฟ/ชา) หลังบ่าย 2 โมง' },
    { id: 's6', q: 'ไม่มีอาการกรนเสียงดังผิดปกติ หรือสะดุ้งตื่นสำลักอากาศกลางดึก' }
  ];

  // Counts & Completion checks
  const isFastAnyYes = fastAnswers.face === true || fastAnswers.arm === true || fastAnswers.speech === true;
  const isFastFullyAnswered = fastAnswers.face !== undefined && fastAnswers.arm !== undefined && fastAnswers.speech !== undefined;

  const lifestyleAnsweredCount = Object.keys(lifestyleAnswers).length;
  const isLifestyleComplete = lifestyleAnsweredCount === lifestyleQuestions.length;
  const lifestyleYesCount = Object.values(lifestyleAnswers).filter(Boolean).length;

  const dementiaAnsweredCount = Object.keys(dementiaAnswers).length;
  const isDementiaComplete = dementiaAnsweredCount === dementiaQuestions.length;
  const dementiaYesCount = Object.values(dementiaAnswers).filter(Boolean).length;

  const sleepAnsweredCount = Object.keys(sleepScore).length;
  const isSleepComplete = sleepAnsweredCount === sleepQuestions.length;
  const sleepYesCount = Object.values(sleepScore).filter(Boolean).length;

  const handleResetCurrentTab = () => {
    if (activeTab === 'fast') {
      setFastAnswers({ face: undefined, arm: undefined, speech: undefined });
    } else if (activeTab === 'lifestyle') {
      setLifestyleAnswers({});
    } else if (activeTab === 'dementia') {
      setDementiaAnswers({});
    } else if (activeTab === 'sleep') {
      setSleepScore({});
    }
  };

  const handleAddHabit = (habitText) => {
    if (onAddToPlan) {
      onAddToPlan(habitText);
      setAddedHabits((prev) => [...prev, habitText]);
    }
  };

  const isHabitAdded = (habitText) => {
    return addedHabits.includes(habitText) || planItems.some((p) => p.text === habitText);
  };

  const handleReadChapter = (chapterId) => {
    onClose();
    if (onSelectChapter) {
      onSelectChapter(chapterId);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="health-tools-title"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '1.75rem',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
              <Activity size={14} />
              <span>Self-Screening Assessment</span>
            </div>
            <h2 id="health-tools-title" style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              เครื่องมือประเมินสุขภาพตนเองเบื้องต้น
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              ประเมินความเสี่ยง เชื่อมโยงสู่บทความแนะนำ และเพิ่มแนวทางปฏิบัติเข้าสู่แผน 7 วัน
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดหน้าต่างประเมินสุขภาพ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          role="tablist"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.35rem',
            marginBottom: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            padding: '0.3rem',
            borderRadius: '12px'
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'lifestyle'}
            className={`btn ${activeTab === 'lifestyle' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('lifestyle')}
            style={{ padding: '0.5rem 0.4rem', fontSize: '0.8rem', gap: '0.3rem', whiteSpace: 'nowrap' }}
          >
            <HeartPulse size={15} />
            <span>6 เสาหลัก</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fast'}
            className={`btn ${activeTab === 'fast' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('fast')}
            style={{
              padding: '0.5rem 0.4rem',
              fontSize: '0.8rem',
              gap: '0.3rem',
              backgroundColor: activeTab === 'fast' ? 'var(--danger-border)' : undefined,
              color: activeTab === 'fast' ? '#fff' : undefined,
              whiteSpace: 'nowrap'
            }}
          >
            <ShieldAlert size={15} />
            <span>FAST Stroke</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dementia'}
            className={`btn ${activeTab === 'dementia' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('dementia')}
            style={{ padding: '0.5rem 0.4rem', fontSize: '0.8rem', gap: '0.3rem', whiteSpace: 'nowrap' }}
          >
            <Brain size={15} />
            <span>สมองเสื่อม</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sleep'}
            className={`btn ${activeTab === 'sleep' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('sleep')}
            style={{ padding: '0.5rem 0.4rem', fontSize: '0.8rem', gap: '0.3rem', whiteSpace: 'nowrap' }}
          >
            <Moon size={15} />
            <span>การนอนหลับ</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
          {/* Tab 1: Lifestyle Medicine 6 Pillars */}
          {activeTab === 'lifestyle' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  ความคืบหน้า: ตอบแล้ว {lifestyleAnsweredCount}/{lifestyleQuestions.length} ข้อ
                </span>
                {lifestyleAnsweredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetCurrentTab}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--text-muted)' }}
                  >
                    <RotateCcw size={12} />
                    <span>ล้างคำตอบ</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {lifestyleQuestions.map((item) => {
                  const val = lifestyleAnswers[item.id];
                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: val !== undefined ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                        border: `1px solid ${val !== undefined ? (val ? 'var(--book1-color)' : 'var(--border-color)') : 'var(--border-color)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                        <span className="badge badge-book1" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', marginRight: '0.4rem' }}>
                          {item.pillar}
                        </span>
                        <span>{item.q}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setLifestyleAnswers(prev => ({ ...prev, [item.id]: true }))}
                          className={`btn ${val === true ? 'btn-primary' : 'btn-secondary'}`}
                          style={{
                            padding: '0.3rem 0.85rem',
                            fontSize: '0.8rem',
                            backgroundColor: val === true ? 'var(--book1-color)' : undefined,
                            color: val === true ? '#fff' : undefined
                          }}
                        >
                          <Check size={13} />
                          <span>ปฏิบัติประจำ (ใช่)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLifestyleAnswers(prev => ({ ...prev, [item.id]: false }))}
                          className={`btn ${val === false ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{
                            padding: '0.3rem 0.85rem',
                            fontSize: '0.8rem',
                            border: val === false ? '1px solid var(--text-muted)' : undefined
                          }}
                        >
                          <span>ยังทำไม่ได้ (ไม่ใช่)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Completion Gate: Targeted Recommendations & 1-Click Habits */}
              {isLifestyleComplete ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                  {/* Score Banner */}
                  <div
                    style={{
                      backgroundColor: lifestyleYesCount >= 8 ? 'var(--takeaway-bg)' : lifestyleYesCount >= 5 ? 'var(--action-bg)' : 'var(--danger-bg)',
                      border: `1px solid ${lifestyleYesCount >= 8 ? 'var(--takeaway-border)' : lifestyleYesCount >= 5 ? 'var(--action-border)' : 'var(--danger-border)'}`,
                      borderRadius: '14px',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                        คะแนนวิถีชีวิตสุขภาพของคุณ: {lifestyleYesCount} / 10 ข้อ
                      </span>
                      <span className="badge" style={{ fontWeight: '700' }}>
                        {lifestyleYesCount >= 8 ? '🌟 วิถีชีวิตยอดเยี่ยม' : lifestyleYesCount >= 5 ? '⚠️ ปานกลาง — ควรปรับปรุงบางด้าน' : '🚨 เสี่ยงสูง — ควรปรับเปลี่ยนพฤติกรรม'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {lifestyleYesCount >= 8
                        ? 'คุณมีพื้นฐานวิถีชีวิตที่ดีเยี่ยม ช่วยลดความเสี่ยงโรคหัวใจ เบาหวาน ความดัน และชะลอวัยได้ดี รักษาวินัยนี้ต่อไป!'
                        : lifestyleYesCount >= 5
                        ? 'คุณดูแลตัวเองได้ดีในบางส่วน แต่ยังมีช่องว่างที่อาจนำไปสู่การอักเสบเรื้อรัง แนะนำอ่านบทความด้านล่างเพื่ออัปเกรดเสาหลักที่ขาดไป'
                        : 'ร่างกายกำลังเผชิญความเสี่ยงต่อโรคเรื้อรัง (NCDs) แนะนำให้อ่านบทเรียนตรงจุดและเริ่มเพิ่มข้อปฏิบัติลงในแผน 7 วันทันที'}
                    </p>
                  </div>

                  {/* Targeted Recommended Articles */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BookOpen size={16} style={{ color: 'var(--accent-primary)' }} />
                      <span>บทความแนะนำที่ตรงกับจุดที่คุณควรเสริม:</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(!lifestyleAnswers.l1 || !lifestyleAnswers.l2) && (
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b1_ch_4')}
                          className="btn-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--book1-color)', fontWeight: '700' }}>เสาหลักที่ 1: โภชนาการ</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>บทที่ 4 อาหารเป็นยา: หลักฐานทางคลินิกที่คุณต้องรู้</div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                        </button>
                      )}

                      {(!lifestyleAnswers.l3 || !lifestyleAnswers.l4) && (
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b1_ch_8')}
                          className="btn-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--book1-color)', fontWeight: '700' }}>เสาหลักที่ 2: การออกกำลังกาย</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>บทที่ 8 ยาที่ดีที่สุดในโลกคือการออกกำลังกาย</div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                        </button>
                      )}

                      {(!lifestyleAnswers.l5 || !lifestyleAnswers.l6) && (
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b1_ch_13')}
                          className="btn-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--book1-color)', fontWeight: '700' }}>เสาหลักที่ 3: การนอนหลับ</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>บทที่ 13 Sleep Hygiene: คู่มือนอนหลับให้ดีโดยไม่ต้องพึ่งยา</div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                        </button>
                      )}

                      {!lifestyleAnswers.l7 && (
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b1_ch_16')}
                          className="btn-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--book1-color)', fontWeight: '700' }}>เสาหลักที่ 4: จัดการความเครียด</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>บทที่ 16 Mindfulness และ Meditation</div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                        </button>
                      )}

                      {lifestyleYesCount >= 8 && (
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b1_ch_1')}
                          className="btn-card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--book1-color)', fontWeight: '700' }}>เวชศาสตร์ชะลอวัย Longevity</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>บทที่ 1 ร่างกายคุณฉลาดกว่าที่คิด: กลไกการซ่อมแซมตัวเอง</div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Habit Add Cards to 7-Day Plan */}
                  <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={16} style={{ color: '#eab308' }} />
                        <span>เลือกนิสัยสุขภาพเพิ่มเข้า "แผน 7 วัน" ของคุณทันที:</span>
                      </div>
                      {onOpenPlan && planItems.length > 0 && (
                        <button
                          type="button"
                          onClick={onOpenPlan}
                          className="badge badge-primary"
                          style={{ cursor: 'pointer', padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          ดูแผนสุขภาพ ({planItems.length} ข้อ) ›
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        { text: '🥗 รับประทานผักหลากสี 2 ทัพพีทุกมื้ออาหาร', condition: !lifestyleAnswers.l1 },
                        { text: '💧 ดื่มน้ำสะอาด 1.5 - 2 ลิตรต่อวัน', condition: !lifestyleAnswers.l2 },
                        { text: '🚶‍♂️ เดินเร็วหรือออกกำลังกายสะสมวันละ 30 นาที', condition: !lifestyleAnswers.l3 },
                        { text: '😴 เข้านอนและตื่นนอนตรงเวลาสม่ำเสมอทุกวัน', condition: !lifestyleAnswers.l6 },
                        { text: '🧘 นั่งสมาธิหรือฝึกหายใจลึก 5-10 นาทีต่อวัน', condition: !lifestyleAnswers.l7 }
                      ].map((habit) => {
                        const added = isHabitAdded(habit.text);
                        return (
                          <div
                            key={habit.text}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '8px',
                              backgroundColor: 'var(--bg-secondary)',
                              border: '1px solid var(--border-light)',
                              gap: '0.5rem'
                            }}
                          >
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                              {habit.text}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddHabit(habit.text)}
                              disabled={added}
                              className={`btn ${added ? 'btn-ghost' : 'btn-secondary'}`}
                              style={{
                                padding: '0.3rem 0.65rem',
                                fontSize: '0.775rem',
                                flexShrink: 0,
                                color: added ? 'var(--book1-color)' : undefined,
                                fontWeight: added ? '700' : '500'
                              }}
                            >
                              {added ? (
                                <>
                                  <Check size={13} />
                                  <span>เพิ่มในแผนแล้ว</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={13} />
                                  <span>+ ใส่ในแผน 7 วัน</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px dashed var(--border-color)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                  }}
                >
                  <Clock size={20} style={{ margin: '0 auto 0.4rem auto', opacity: 0.7 }} />
                  <div>กรุณาตอบคำถามให้ครบทั้ง 10 ข้อเพื่อประมวลผลวิเคราะห์สุขภาพ</div>
                  <div style={{ fontSize: '0.775rem', marginTop: '4px' }}>
                    (เหลืออีก {lifestyleQuestions.length - lifestyleAnsweredCount} ข้อ)
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: FAST Stroke Test */}
          {activeTab === 'fast' && (
            <div className="animate-fade-in">
              <div
                style={{
                  backgroundColor: 'var(--danger-bg)',
                  border: '1px solid var(--danger-border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                  color: 'var(--danger-text)'
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldAlert size={18} />
                  <span>FAST — สัญญาณเตือนโรคหลอดเลือดสมองเฉียบพลัน (Stroke)</span>
                </div>
                <div style={{ fontSize: '0.825rem' }}>
                  หากมีอาการข้อใดข้อหนึ่งเกิดขึ้นอย่างเฉียบพลัน ให้รีบนำส่งโรงพยาบาลทันทีภายใน 4.5 ชั่วโมง
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {/* F - Face */}
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: fastAnswers.face === true ? 'var(--danger-bg)' : 'var(--bg-primary)',
                    border: `1px solid ${fastAnswers.face === true ? 'var(--danger-border)' : 'var(--border-color)'}`
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    F — Face (ใบหน้า): มุมปากตก หน้าเบี้ยว ยิ้มแล้วมุมปากข้างหนึ่งไม่ยกขึ้น
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 8px 0' }}>
                    วิธีทดสอบ: ให้ผู้ป่วยลองยิ้ม ยิงฟัน หรือผิวปาก
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, face: true }))}
                      className={`btn ${fastAnswers.face === true ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.3rem 0.85rem',
                        fontSize: '0.8rem',
                        backgroundColor: fastAnswers.face === true ? 'var(--danger-border)' : undefined,
                        color: fastAnswers.face === true ? '#fff' : undefined
                      }}
                    >
                      <AlertTriangle size={13} />
                      <span>พบอาการหน้าเบี้ยว/มุมปากตก</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, face: false }))}
                      className={`btn ${fastAnswers.face === false ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Check size={13} />
                      <span>ปกติ</span>
                    </button>
                  </div>
                </div>

                {/* A - Arm */}
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: fastAnswers.arm === true ? 'var(--danger-bg)' : 'var(--bg-primary)',
                    border: `1px solid ${fastAnswers.arm === true ? 'var(--danger-border)' : 'var(--border-color)'}`
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    A — Arm (แขนขา): แขนหรือขาข้างใดข้างหนึ่งอ่อนแรง ยกไม่ขึ้น หรือตกลงมา
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 8px 0' }}>
                    วิธีทดสอบ: ให้ผู้ป่วยยกแขนทั้ง 2 ข้างขึ้นพร้อมกันในท่าคว่ำมือค้างไว้ 10 วินาที
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, arm: true }))}
                      className={`btn ${fastAnswers.arm === true ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.3rem 0.85rem',
                        fontSize: '0.8rem',
                        backgroundColor: fastAnswers.arm === true ? 'var(--danger-border)' : undefined,
                        color: fastAnswers.arm === true ? '#fff' : undefined
                      }}
                    >
                      <AlertTriangle size={13} />
                      <span>พบอาการแขนขาอ่อนแรง</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, arm: false }))}
                      className={`btn ${fastAnswers.arm === false ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Check size={13} />
                      <span>ปกติ</span>
                    </button>
                  </div>
                </div>

                {/* S - Speech */}
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: fastAnswers.speech === true ? 'var(--danger-bg)' : 'var(--bg-primary)',
                    border: `1px solid ${fastAnswers.speech === true ? 'var(--danger-border)' : 'var(--border-color)'}`
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    S — Speech (การพูด): พูดไม่ชัด พูดไม่ออก ลิ้นคับปาก นึกคำพูดไม่ออก หรือฟังคนอื่นไม่เข้าใจ
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 8px 0' }}>
                    วิธีทดสอบ: ให้ผู้ป่วยพูดประโยคง่ายๆ ตามเรา เช่น "ท้องฟ้าวันนี้แจ่มใสดี"
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, speech: true }))}
                      className={`btn ${fastAnswers.speech === true ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.3rem 0.85rem',
                        fontSize: '0.8rem',
                        backgroundColor: fastAnswers.speech === true ? 'var(--danger-border)' : undefined,
                        color: fastAnswers.speech === true ? '#fff' : undefined
                      }}
                    >
                      <AlertTriangle size={13} />
                      <span>พบอาการพูดไม่ชัด/ลิ้นแข็ง</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFastAnswers(prev => ({ ...prev, speech: false }))}
                      className={`btn ${fastAnswers.speech === false ? 'btn-secondary' : 'btn-ghost'}`}
                      style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Check size={13} />
                      <span>ปกติ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* T - Time / Result */}
              {isFastFullyAnswered && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {isFastAnyYes ? (
                    <div
                      style={{
                        backgroundColor: 'var(--danger-bg)',
                        border: '2px solid var(--danger-border)',
                        borderRadius: '14px',
                        padding: '1.25rem'
                      }}
                    >
                      <div style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--danger-text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={22} />
                        <span>⚠️ สงสัยภาวะหลอดเลือดสมองเฉียบพลัน (Stroke)!</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        ผู้ป่วยมีสัญญาณเตือนของโรคหลอดเลือดสมอง <strong>ห้ามรอดูอาการที่บ้านเด็ดขาด</strong> และ <strong>ห้ามให้ผู้ป่วยรับประทานอาหารหรือยาเอง</strong> ให้รีบโทรเรียกรถพยาบาลฉุกเฉินทันทีเพื่อรับการรักษาภายใน 4.5 ชั่วโมง (Golden Hour)
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <a
                          href="tel:1669"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: 'var(--danger-border)',
                            fontSize: '0.95rem',
                            padding: '0.65rem 1.25rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            color: '#fff',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <PhoneCall size={18} />
                          <span>โทรสายด่วนฉุกเฉิน 1669 ทันที</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleReadChapter('b2_05_บทที่_5_โรคหลอดเลือดสมอง_(Stroke)_ฆาตกรเงียบในร่างกาย')}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.85rem' }}
                        >
                          <span>อ่านคู่มือ Stroke (เล่ม 2 บทที่ 5)</span>
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'var(--takeaway-bg)',
                        border: '1px solid var(--takeaway-border)',
                        borderRadius: '14px',
                        padding: '1.25rem'
                      }}
                    >
                      <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--book1-color)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={18} />
                        <span>ไม่พบอาการผิดปกติเฉียบพลันตามเกณฑ์ FAST</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                        ในขณะนี้ยังไม่พบสัญญาณของโรคหลอดเลือดสมองเฉียบพลัน อย่างไรก็ตาม ควรควบคุมความดันโลหิตและไขมันในเลือดให้อยู่ในเกณฑ์ปกติเพื่อป้องกันในระยะยาว
                      </p>
                      <button
                        type="button"
                        onClick={() => handleReadChapter('b2_05_บทที่_5_โรคหลอดเลือดสมอง_(Stroke)_ฆาตกรเงียบในร่างกาย')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.85rem' }}
                      >
                        <span>ศึกษาคู่มือป้องกัน Stroke ก่อนสายเกินแก้</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Toggleable Fast Stroke Medical Diagram */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowFastDiagram(!showFastDiagram)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.825rem', padding: '0.45rem 1rem', gap: '0.4rem', borderRadius: '10px' }}
                >
                  <Brain size={15} style={{ color: 'var(--book2-color)' }} />
                  <span>{showFastDiagram ? 'ซ่อนแผนผังการแพทย์ FAST' : '📊 ดูแผนผังการแพทย์ FAST & Golden Hour 4.5 ชม.'}</span>
                </button>
              </div>

              {showFastDiagram && (
                <div style={{ marginTop: '1rem' }}>
                  <FastStrokeDiagram />
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Dementia Screening */}
          {activeTab === 'dementia' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  ความคืบหน้า: ตอบแล้ว {dementiaAnsweredCount}/{dementiaQuestions.length} ข้อ
                </span>
                {dementiaAnsweredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetCurrentTab}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--text-muted)' }}
                  >
                    <RotateCcw size={12} />
                    <span>ล้างคำตอบ</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {dementiaQuestions.map((item) => {
                  const val = dementiaAnswers[item.id];
                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: val !== undefined ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                        border: `1px solid ${val !== undefined ? (val ? 'var(--action-border)' : 'var(--border-color)') : 'var(--border-color)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                        {item.q}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setDementiaAnswers(prev => ({ ...prev, [item.id]: true }))}
                          className={`btn ${val === true ? 'btn-primary' : 'btn-secondary'}`}
                          style={{
                            padding: '0.3rem 0.85rem',
                            fontSize: '0.8rem',
                            backgroundColor: val === true ? 'var(--action-border)' : undefined,
                            color: val === true ? '#fff' : undefined
                          }}
                        >
                          <AlertTriangle size={13} />
                          <span>มีอาการนี้บ่อย (ใช่)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDementiaAnswers(prev => ({ ...prev, [item.id]: false }))}
                          className={`btn ${val === false ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <Check size={13} />
                          <span>ไม่มีอาการ (ไม่ใช่)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Completion Gate */}
              {isDementiaComplete ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      backgroundColor: dementiaYesCount === 0 ? 'var(--takeaway-bg)' : dementiaYesCount <= 2 ? 'var(--action-bg)' : 'var(--danger-bg)',
                      border: `1px solid ${dementiaYesCount === 0 ? 'var(--takeaway-border)' : dementiaYesCount <= 2 ? 'var(--action-border)' : 'var(--danger-border)'}`,
                      borderRadius: '14px',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      ผลประเมินความเสี่ยง: พบ {dementiaYesCount} ใน 6 สัญญาณเตือน
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                      {dementiaYesCount === 0
                        ? 'ยอดเยี่ยม! ยังไม่พบสัญญาณเตือนของภาวะสมองเสื่อม แนะนำออกกำลังกายสม่ำเสมอ ฝึกสมองด้วยสิ่งใหม่ๆ และนอนหลับให้เพียงพอ'
                        : dementiaYesCount <= 2
                        ? 'พบสัญญาณเตือนเล็กน้อย อาจเกิดจากความเครียด พักผ่อนไม่พอ หรือภาวะหลงลืมตามวัย แนะนำให้สังเกตอาการต่อเนื่องและปรับปรุงการนอน'
                        : 'พบสัญญาณเตือนหลายข้อ แนะนำให้ปรึกษาแพทย์เฉพาะทางระบบประสาท เพื่อตรวจประเมินความจำและสมรรถภาพสมองอย่างละเอียด'}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleReadChapter('b2_06_บทที่_6_โรคอัลไซเมอร์_เมื่อความทรงจำจางหาย')}
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                      >
                        <span>อ่านบทที่ 6: โรคอัลไซเมอร์และสมองเสื่อม</span>
                        <ChevronRight size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleReadChapter('b2_15_บทที่_15_อาหารสำหรับสมอง')}
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                      >
                        <span>บทที่ 15: อาหารสำหรับสมอง</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* 1-Click Habit for Brain Health */}
                  <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Brain size={16} style={{ color: 'var(--book2-color)' }} />
                      <span>นิสัยบำรุงสมองแนะนำสำหรับแผน 7 วันของคุณ:</span>
                    </div>

                    {[
                      '🧠 เล่นเกมฝึกความจำหรือเรียนรู้สิ่งใหม่ 15 นาทีต่อวัน',
                      '🐟 รับประทานปลาทะเลหรือไขมันดี (Omega-3) 2 มื้อ/สัปดาห์'
                    ].map((habitText) => {
                      const added = isHabitAdded(habitText);
                      return (
                        <div
                          key={habitText}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            marginBottom: '0.45rem',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{habitText}</span>
                          <button
                            type="button"
                            onClick={() => handleAddHabit(habitText)}
                            disabled={added}
                            className={`btn ${added ? 'btn-ghost' : 'btn-secondary'}`}
                            style={{
                              padding: '0.3rem 0.65rem',
                              fontSize: '0.775rem',
                              flexShrink: 0,
                              color: added ? 'var(--book1-color)' : undefined,
                              fontWeight: added ? '700' : '500'
                            }}
                          >
                            {added ? (
                              <>
                                <Check size={13} />
                                <span>เพิ่มแล้ว</span>
                              </>
                            ) : (
                              <>
                                <Plus size={13} />
                                <span>+ ใส่ในแผน 7 วัน</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px dashed var(--border-color)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                  }}
                >
                  <Clock size={20} style={{ margin: '0 auto 0.4rem auto', opacity: 0.7 }} />
                  <div>กรุณาตอบคำถามให้ครบทั้ง 6 ข้อเพื่อดูผลสรุปความเสี่ยงสมองเสื่อม</div>
                  <div style={{ fontSize: '0.775rem', marginTop: '4px' }}>
                    (เหลืออีก {dementiaQuestions.length - dementiaAnsweredCount} ข้อ)
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Sleep Hygiene Assessment */}
          {activeTab === 'sleep' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  ความคืบหน้า: ตอบแล้ว {sleepAnsweredCount}/{sleepQuestions.length} ข้อ
                </span>
                {sleepAnsweredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetCurrentTab}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--text-muted)' }}
                  >
                    <RotateCcw size={12} />
                    <span>ล้างคำตอบ</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {sleepQuestions.map((item) => {
                  const val = sleepScore[item.id];
                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: val !== undefined ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                        border: `1px solid ${val !== undefined ? (val ? 'var(--accent-primary)' : 'var(--border-color)') : 'var(--border-color)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                        {item.q}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setSleepScore(prev => ({ ...prev, [item.id]: true }))}
                          className={`btn ${val === true ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <Check size={13} />
                          <span>ทำได้สม่ำเสมอ (ใช่)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSleepScore(prev => ({ ...prev, [item.id]: false }))}
                          className={`btn ${val === false ? 'btn-secondary' : 'btn-ghost'}`}
                          style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <span>ยังทำไม่ได้ (ไม่ใช่)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Completion Gate */}
              {isSleepComplete ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      backgroundColor: sleepYesCount >= 5 ? 'var(--takeaway-bg)' : sleepYesCount >= 3 ? 'var(--action-bg)' : 'var(--danger-bg)',
                      border: `1px solid ${sleepYesCount >= 5 ? 'var(--takeaway-border)' : sleepYesCount >= 3 ? 'var(--action-border)' : 'var(--danger-border)'}`,
                      borderRadius: '14px',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      คะแนนสุขอนามัยการนอน: {sleepYesCount} / 6 ข้อ
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                      {sleepYesCount >= 5
                        ? 'คุณมีวินัยในการนอนหลับที่ดีเยี่ยม การนอนหลับลึกคือช่วงเวลาที่ระบบ Glymphatic ล้างของเสียในสมองและฟื้นฟูร่างกาย'
                        : sleepYesCount >= 3
                        ? 'สุขอนามัยการนอนอยู่ในระดับปานกลาง ลองงดหน้าจอก่อนนอนและคุมเวลาตื่นให้สม่ำเสมอเพื่อการฟื้นฟูสมองที่ดียิ่งขึ้น'
                        : 'สุขอนามัยการนอนอยู่ในเกณฑ์ที่ควรปรับปรุง การนอนน้อยหรือนอนไม่มีคุณภาพเรื้อรังส่งผลต่อความดัน หัวใจ และเสี่ยงสมองเสื่อม'}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleReadChapter('b1_ch_13')}
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                      >
                        <span>อ่านคู่มือการนอนหลับให้ดีโดยไม่ต้องพึ่งยา (บทที่ 13)</span>
                        <ChevronRight size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleReadChapter('b2_17_บทที่_17_การนอนหลับและสมอง')}
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                      >
                        <span>การนอนหลับและสมอง (เล่ม 2 บทที่ 17)</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* 1-Click Habit for Sleep */}
                  <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Moon size={16} style={{ color: 'var(--accent-primary)' }} />
                      <span>นิสัยเพื่อการนอนหลับลึก (เพิ่มเข้าแผน 7 วัน):</span>
                    </div>

                    {[
                      '☕ งดดื่มชา กาแฟ และเครื่องดื่มคาเฟอีนหลัง 14:00 น.',
                      '📱 วางโทรศัพท์มือถือห่างเตียงนอน และงดดูหน้าจอ 30 นาทีก่อนนอน',
                      '🌙 ปรับห้องนอนให้มืดสนิท เงียบ และอุณหภูมิเย็นสบาย 24-25°C'
                    ].map((habitText) => {
                      const added = isHabitAdded(habitText);
                      return (
                        <div
                          key={habitText}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            marginBottom: '0.45rem',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{habitText}</span>
                          <button
                            type="button"
                            onClick={() => handleAddHabit(habitText)}
                            disabled={added}
                            className={`btn ${added ? 'btn-ghost' : 'btn-secondary'}`}
                            style={{
                              padding: '0.3rem 0.65rem',
                              fontSize: '0.775rem',
                              flexShrink: 0,
                              color: added ? 'var(--book1-color)' : undefined,
                              fontWeight: added ? '700' : '500'
                            }}
                          >
                            {added ? (
                              <>
                                <Check size={13} />
                                <span>เพิ่มแล้ว</span>
                              </>
                            ) : (
                              <>
                                <Plus size={13} />
                                <span>+ ใส่ในแผน 7 วัน</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px dashed var(--border-color)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                  }}
                >
                  <Clock size={20} style={{ margin: '0 auto 0.4rem auto', opacity: 0.7 }} />
                  <div>กรุณาตอบคำถามให้ครบทั้ง 6 ข้อเพื่อดูผลสรุปคุณภาพการนอนหลับ</div>
                  <div style={{ fontSize: '0.775rem', marginTop: '4px' }}>
                    (เหลืออีก {sleepQuestions.length - sleepAnsweredCount} ข้อ)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
