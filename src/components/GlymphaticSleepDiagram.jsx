import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  CheckCircle2,
  X,
  Brain,
  Sparkles,
  Bed,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function GlymphaticSleepDiagram() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('glymphatic'); // 'glymphatic', 'cycles', 'tips'
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = '🧠 กลไก Glymphatic System: สมองชะล้างสารพิษอัลไซเมอร์ได้อย่างไรขณะหลับลึก\n' +
      '• ในช่วง Deep Sleep เซลล์เกลียจะหดตัวลง 60% เพื่อให้น้ำไขสันหลัง (CSF) ไหลเวียนชะล้าง Beta-Amyloid\n' +
      '• การนอนน้อยหรืออดนอนเรื้อรังทำให้ของเสียตกค้างและเพิ่มความเสี่ยงสมองเสื่อม\n' +
      'อ่านเพิ่มเติมในคลังความรู้หมอวี: ' + window.location.origin;

    if (navigator.share) {
      navigator.share({ title: 'Glymphatic System & Sleep — หมอวี', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '850px',
        margin: '0 auto',
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'top center',
        transition: 'transform 0.15s ease'
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '2px solid rgba(37, 99, 235, 0.2)',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                color: '#2563eb',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              NEUROLOGY & SLEEP MEDICINE
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Glymphatic System: ระบบล้างสมองขณะหลับลึก & วงจรการนอน
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
            ทำไมการหลับลึก (Slow-Wave Sleep) ถึงเป็นกลไกสำคัญที่สุดในการป้องกันโรคอัลไซเมอร์และชะลอความเสื่อมของสมอง
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {!isLightboxOpen ? (
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}
              title="ขยายแผนผังแบบเต็มหน้าจอ"
            >
              <Maximize2 size={14} />
              <span>ขยายเต็มจอ</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                className="btn btn-ghost btn-icon"
                title="ย่อขนาด"
                style={{ width: '32px', height: '32px' }}
              >
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', minWidth: '40px', textAlign: 'center' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="btn btn-ghost btn-icon"
                title="ขยายขนาด"
                style={{ width: '32px', height: '32px' }}
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="btn btn-ghost btn-icon"
                title="รีเซ็ตขนาด"
                style={{ width: '32px', height: '32px' }}
              >
                <RotateCcw size={15} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="btn btn-ghost"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
            title="แชร์แผนผังนี้"
          >
            {copied ? <CheckCircle2 size={14} style={{ color: '#10b981' }} /> : <Share2 size={14} />}
            <span>{copied ? 'คัดลอกแล้ว' : 'แชร์'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual: Awake vs Deep Sleep Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {/* State A: Awake State (ช่วงตื่น) */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #f59e0b',
            borderRadius: '16px',
            padding: '1.35rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#b45309', fontWeight: '800' }}>
                1. ช่วงเวลาตื่น (AWAKE STATE)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ของเสียสะสม</span>
            </div>

            {/* SVG Diagram Awake */}
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                {/* Interstitial space tight */}
                <rect x="15" y="10" width="190" height="90" rx="10" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Glial Cells swollen/tight */}
                <circle cx="55" cy="55" r="28" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" strokeWidth="2" />
                <text x="55" y="58" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#78350f">เซลล์เกลีย</text>
                
                <circle cx="165" cy="55" r="28" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" strokeWidth="2" />
                <text x="165" y="58" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#78350f">เซลล์เกลีย</text>

                {/* Narrow space & toxic waste particles */}
                <circle cx="110" cy="35" r="4.5" fill="#ef4444" />
                <circle cx="110" cy="55" r="4.5" fill="#ef4444" />
                <circle cx="110" cy="75" r="4.5" fill="#ef4444" />
                <text x="110" y="96" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="600">ช่องว่างแคบ (ของเสียสะสม)</text>
              </svg>
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              เซลล์สมองทำงานต่อเนื่อง • ช่องว่างระหว่างเซลล์แคบ
            </h4>
            <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
              <li>เซลล์เกลีย (Glial Cells) มีขนาดปกติ ช่องว่างระหว่างเซลล์มีเพียง <strong>14%</strong></li>
              <li>การเผาผลาญพลังงานทำให้เกิดของเสียโปรตีน เช่น <strong>Beta-Amyloid</strong> และ <strong>Tau</strong> ตกค้างในเนื้อเยื่อสมอง</li>
              <li>ระบบชะล้างแทบไม่ทำงานในช่วงเวลากลางวัน</li>
            </ul>
          </div>
        </div>

        {/* State B: Deep Sleep (ช่วงหลับลึก Glymphatic Active) */}
        <div
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
            border: '2px solid rgba(37, 99, 235, 0.3)',
            borderTop: '4px solid #2563eb',
            borderRadius: '16px',
            padding: '1.35rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-primary" style={{ fontWeight: '800' }}>
                2. ช่วงหลับลึก (DEEP SLOW-WAVE SLEEP)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>ชะล้างสมองเต็มกำลัง</span>
            </div>

            {/* SVG Diagram Deep Sleep Flush */}
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                <rect x="15" y="10" width="190" height="90" rx="10" fill="rgba(37, 99, 235, 0.06)" stroke="#2563eb" strokeWidth="1.5" />
                
                {/* Glial Cells Shrink by 60% */}
                <circle cx="45" cy="55" r="17" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
                <text x="45" y="58" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#1e40af">หดตัว 60%</text>

                <circle cx="175" cy="55" r="17" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
                <text x="175" y="58" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#1e40af">หดตัว 60%</text>

                {/* Wide Channel with Rapid CSF Flushing Waves */}
                <path d="M 75 35 Q 110 30 145 35" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M 75 55 Q 110 50 145 55" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" />
                <path d="M 75 75 Q 110 70 145 75" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                
                {/* Toxins being flushed away */}
                <circle cx="135" cy="53" r="3.5" fill="#ef4444" opacity="0.6" />
                <text x="110" y="96" fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="700">CSF ไหลชะล้าง Beta-Amyloid ออก</text>
              </svg>
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1d4ed8', marginBottom: '0.4rem' }}>
              เซลล์เกลียหดตัวลง 60% • น้ำหล่อเลี้ยงสมองชะล้างพิษ
            </h4>
            <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
              <li>ช่องว่างระหว่างเซลล์เพิ่มขึ้นเป็น <strong>24% (ขยายตัว 60%)</strong></li>
              <li>น้ำหล่อเลี้ยงสมองและไขสันหลัง (CSF) ไหลผ่านเนื้อเยื่อสมองอย่างรวดเร็ว</li>
              <li>ชะล้างโปรตีนพิษ <strong>Beta-Amyloid</strong> ลงสู่ระบบน้ำเหลือง ป้องกันสมองเสื่อม</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 90-Minute Sleep Architecture Timeline */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Moon size={18} style={{ color: '#2563eb' }} />
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>
              วงจรการนอนหลับ 90 นาที (The 90-Minute Sleep Architecture)
            </span>
          </div>
          <span className="badge" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ควรหลับให้ครบ 4 – 5 รอบ (7 – 8 ชั่วโมง)
          </span>
        </div>

        {/* 4 Stages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}
        >
          {/* N1 */}
          <div style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>STAGE 1 (N1)</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.2rem 0' }}>หลับตื้น (Light Sleep)</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              กล้ามเนื้อเริ่มผ่อนคลาย อัตราการเต้นหัวใจช้าลง ปลุกตื่นได้ง่าย (5-10 นาที)
            </p>
          </div>

          {/* N2 */}
          <div style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>STAGE 2 (N2)</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.2rem 0' }}>หลับจริง (True Sleep)</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              อุณหภูมิร่างกายลดลง เกิด Sleep Spindles ในคลื่นสมอง จัดระเบียบความจำ (50% ของคืน)
            </p>
          </div>

          {/* N3 Deep Sleep */}
          <div style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#2563eb' }}>STAGE 3 (N3) • สำคัญที่สุด</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e40af', margin: '0.2rem 0' }}>หลับลึก (Deep Sleep)</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              <strong>Glymphatic ล้างสมองทำงานสูงสุด</strong> หลั่ง Growth Hormone ซ่อมแซมกล้ามเนื้อและกระดูก
            </p>
          </div>

          {/* REM */}
          <div style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9333ea' }}>REM SLEEP</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#7e22ce', margin: '0.2rem 0' }}>ช่วงฝัน (Dreaming)</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              ลูกตากรอกไปมาอย่างรวดเร็ว สมองประมวลผลอารมณ์ ความคิดสร้างสรรค์ และความจำระยะยาว
            </p>
          </div>
        </div>
      </div>

      {/* Doctor V's Clinical Advice Box */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '14px',
          backgroundColor: 'var(--takeaway-bg)',
          border: '1px solid var(--takeaway-border)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <Sparkles size={24} style={{ color: '#059669', flexShrink: 0 }} />
        <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>ข้อแนะนำจากหมอวี:</strong> ช่วงหลับลึก (Deep Sleep) จะเกิดขึ้นมากที่สุดใน <strong>ช่วงครึ่งแรกของคืน (ก่อนตี 2)</strong> การนอนดึกแม้จะตื่นสายจนครบ 8 ชั่วโมง ก็จะสูญเสียสัดส่วน Deep Sleep ไปอย่างน่าเสียดาย แนะนำให้เข้านอนก่อน 22:30 - 23:00 น. สม่ำเสมอ
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Embedded View */}
      <div
        style={{
          margin: '2rem 0',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-primary)',
          border: '2px solid rgba(37, 99, 235, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.08)',
          position: 'relative'
        }}
      >
        {content}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            zIndex: 120
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '24px',
              maxWidth: '960px',
              width: '100%',
              maxHeight: '94vh',
              overflowY: 'auto',
              padding: '2rem 1.75rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-color)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="btn btn-ghost btn-icon"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary)'
              }}
              aria-label="ปิดโหมดเต็มจอ"
            >
              <X size={20} />
            </button>

            {content}
          </div>
        </div>
      )}
    </>
  );
}
