import React, { useState, useEffect } from 'react';
import { X, Activity, AlertTriangle, PhoneCall, Moon, Brain, CheckSquare, Sparkles, AlertCircle } from 'lucide-react';

export default function BrainToolsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('fast'); // fast, dementia, sleep

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // FAST Test State
  const [fastF, setFastF] = useState(false);
  const [fastA, setFastA] = useState(false);
  const [fastS, setFastS] = useState(false);

  // Dementia Test State
  const [dementiaAnswers, setDementiaAnswers] = useState({});

  // Sleep Test State
  const [sleepScore, setSleepScore] = useState({});

  if (!isOpen) return null;

  const isFastPositive = fastF || fastA || fastS;

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
    { id: 's5', q: 'งดเครื่องดื่มคาเฟอีน (กาแฟ/ชา) หลังบ่าย 2 โมง' }
  ];

  const countDementiaYes = Object.values(dementiaAnswers).filter(Boolean).length;
  const countSleepYes = Object.values(sleepScore).filter(Boolean).length;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="แบบประเมินสุขภาพสมองเบื้องต้น"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '1.75rem', maxWidth: '680px' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
              <Brain size={14} />
              <span>เครื่องมือประเมินสุขภาพสมองเบื้องต้น</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '700' }}>
              แบบประเมินและเช็กลิสต์สุขภาพสมอง
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดหน้าต่างแบบประเมิน"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            padding: '0.35rem',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '12px'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('fast')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'fast' ? '600' : '400',
              backgroundColor: activeTab === 'fast' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'fast' ? 'var(--danger-border)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'fast' ? 'var(--card-shadow)' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <AlertTriangle size={15} />
            <span>สัญญาณ Stroke</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dementia')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'dementia' ? '600' : '400',
              backgroundColor: activeTab === 'dementia' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'dementia' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'dementia' ? 'var(--card-shadow)' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Brain size={15} />
            <span>เช็กสมองเสื่อม</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sleep')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'sleep' ? '600' : '400',
              backgroundColor: activeTab === 'sleep' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'sleep' ? 'var(--takeaway-border)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'sleep' ? 'var(--card-shadow)' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Moon size={15} />
            <span>สุขอนามัยการนอน</span>
          </button>
        </div>

        {/* Tab 1: FAST Stroke */}
        {activeTab === 'fast' && (
          <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              โรคหลอดเลือดสมอง (Stroke) เป็นภาวะฉุกเฉินทางการแพทย์ หากพบสัญญาณแม้เพียงข้อเดียว ต้องรีบนำส่งโรงพยาบาลทันทีภายใน 4.5 ชั่วโมง (Golden Period)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: fastF ? 'var(--danger-bg)' : 'var(--bg-primary)',
                  border: '1px solid',
                  borderColor: fastF ? 'var(--danger-border)' : 'var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={fastF}
                  onChange={(e) => setFastF(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--danger-border)' }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>F - Face (หน้าเบี้ยว)</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    ยิ้มแล้วมุมปากตก ใบหน้าเบี้ยวครึ่งซีก หรือหนังตาตก
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: fastA ? 'var(--danger-bg)' : 'var(--bg-primary)',
                  border: '1px solid',
                  borderColor: fastA ? 'var(--danger-border)' : 'var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={fastA}
                  onChange={(e) => setFastA(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--danger-border)' }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>A - Arm (แขนขาอ่อนแรง)</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    ยกแขนสองข้างขึ้นข้างหน้า แล้วแขนข้างใดข้างหนึ่งตกหรือไม่มีแรง
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: fastS ? 'var(--danger-bg)' : 'var(--bg-primary)',
                  border: '1px solid',
                  borderColor: fastS ? 'var(--danger-border)' : 'var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={fastS}
                  onChange={(e) => setFastS(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--danger-border)' }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>S - Speech (พูดลำบาก)</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    พูดไม่ชัด พูดอ้อแอ้ พูดไม่ออก หรือฟังคนอื่นไม่เข้าใจ
                  </div>
                </div>
              </label>
            </div>

            {/* FAST Result Alert */}
            {isFastPositive ? (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--danger-bg)',
                  border: '2px solid var(--danger-border)',
                  borderRadius: '12px',
                  color: 'var(--danger-text)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  <AlertTriangle size={22} color="var(--danger-border)" />
                  <span>T - Time: สงสัยโรคหลอดเลือดสมองเฉียบพลัน!</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                  รีบจำเวลาที่เกิดอาการครั้งแรก และนำส่งโรงพยาบาลที่มี Stroke Center ทันที หรือโทรเรียกรถพยาบาลฉุกเฉิน
                </p>
                <a
                  href="tel:1669"
                  className="btn"
                  style={{ backgroundColor: 'var(--danger-border)', color: '#ffffff', fontWeight: '700', padding: '0.6rem 1.25rem' }}
                >
                  <PhoneCall size={18} />
                  <span>โทรเรียกรถฉุกเฉิน 1669</span>
                </a>
              </div>
            ) : (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>หากไม่มีอาการข้างต้น ถือเป็นเกณฑ์ปกติ อย่างไรก็ตามหากมีอาการชาครึ่งซีก ปวดศีรษะรุนแรงเฉียบพลัน หรือตามัวฉับพลัน ควรรีบพบแพทย์</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Dementia Checklist */}
        {activeTab === 'dementia' && (
          <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              สำรวจสัญญาณเตือน 6 ข้อ สำหรับสังเกตตนเองหรือคนในครอบครัว (บทที่ 6 & 7)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {dementiaQuestions.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: dementiaAnswers[item.id] ? 'var(--accent-light)' : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: dementiaAnswers[item.id] ? 'var(--accent-primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!dementiaAnswers[item.id]}
                    onChange={(e) =>
                      setDementiaAnswers({ ...dementiaAnswers, [item.id]: e.target.checked })
                    }
                    style={{ marginTop: '3px', width: '17px', height: '17px', accentColor: 'var(--accent-primary)' }}
                  />
                  <span>{item.q}</span>
                </label>
              ))}
            </div>

            {/* Score Result */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: countDementiaYes >= 2 ? 'var(--action-bg)' : 'var(--takeaway-bg)',
                border: '1px solid',
                borderColor: countDementiaYes >= 2 ? 'var(--action-border)' : 'var(--takeaway-border)'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                พบสัญญาณเตือน: {countDementiaYes} / 6 ข้อ
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {countDementiaYes >= 2
                  ? '⚠️ มีสัญญาณที่กระทบชีวิตประจำวัน แนะนำให้พาไปพบแพทย์เฉพาะทางระบบประสาทเพื่อตรวจคัดกรองสาเหตุอย่างละเอียด (หลายสาเหตุ เช่น ไทรอยด์ต่ำ หรือขาดวิตามิน B12 สามารถรักษาให้หายได้)'
                  : '✅ ยังไม่พบสัญญาณอันตรายของภาวะสมองเสื่อม แนะนำให้ดูแลสมองด้วยการเรียนรู้สิ่งใหม่ ออกกำลังกาย และนอนหลับให้เพียงพอ'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Sleep Hygiene */}
        {activeTab === 'sleep' && (
          <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              การนอนหลับลึกช่วยให้ระบบ <strong>Glymphatic System</strong> ชะล้างโปรตีนพิษ (เช่น Amyloid) ออกจากสมอง เช็กสุขอนามัยการนอนของคุณ (บทที่ 17)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {sleepQuestions.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: sleepScore[item.id] ? 'var(--takeaway-bg)' : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: sleepScore[item.id] ? 'var(--takeaway-border)' : 'var(--border-color)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!sleepScore[item.id]}
                    onChange={(e) =>
                      setSleepScore({ ...sleepScore, [item.id]: e.target.checked })
                    }
                    style={{ marginTop: '3px', width: '17px', height: '17px', accentColor: 'var(--takeaway-border)' }}
                  />
                  <span>{item.q}</span>
                </label>
              ))}
            </div>

            {/* Sleep Result */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: countSleepYes >= 4 ? 'var(--takeaway-bg)' : 'var(--action-bg)',
                border: '1px solid',
                borderColor: countSleepYes >= 4 ? 'var(--takeaway-border)' : 'var(--action-border)'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                คะแนนสุขอนามัยการนอน: {countSleepYes} / 5 ข้อ
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {countSleepYes >= 4
                  ? '🌟 ยอดเยี่ยมมาก! คุณมีพฤติกรรมการนอนที่ช่วยปกป้องเซลล์สมองและลดความเสี่ยงสมองเสื่อมได้เป็นอย่างดี'
                  : '💡 มีบางข้อที่สามารถปรับปรุงได้ ลองปรับเวลาเข้านอน งดหน้าจอก่อนนอน และลดคาเฟอีนเพื่อช่วยให้สมองได้รับการชะล้างสารพิษเต็มที่'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
