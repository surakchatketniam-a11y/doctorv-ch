import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  PhoneCall,
  Maximize2,
  Minimize2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  CheckCircle2,
  X,
  Info,
  HeartPulse,
  Brain,
  Sparkles
} from 'lucide-react';

export default function FastStrokeDiagram({ isCompact = false }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'f', 'a', 's', 't'
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = '🚨 สัญญาณเตือน FAST โรคหลอดเลือดสมองเฉียบพลัน (Stroke)\n' +
      'F - Face: หน้าเบี้ยว มุมปากตก\n' +
      'A - Arm: แขนขาอ่อนแรงข้างใดข้างหนึ่ง\n' +
      'S - Speech: พูดไม่ชัด ลิ้นคับปาก\n' +
      'T - Time: รีบไปรพ. ภายใน 4.5 ชม. โทร 1669 ทันที!\n' +
      'เรียนรู้เพิ่มเติมได้ที่: ' + window.location.origin;

    if (navigator.share) {
      navigator.share({ title: 'FAST Stroke Golden Hour — หมอวี', text }).catch(() => {});
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
      {/* Diagram Header */}
      <div
        style={{
          borderBottom: '2px solid rgba(239, 68, 68, 0.2)',
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
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#dc2626',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              EMERGENCY MEDICAL PROTOCOL
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            สัญญาณเตือน FAST & หน้าต่างทองคำ 4.5 ชั่วโมง (Golden Hour)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
            โรคหลอดเลือดสมองเฉียบพลัน (Stroke) ทุกนาทีคือชีวิตสมอง — เซลล์สมองตายเฉลี่ย 1.9 ล้านเซลล์ต่อนาทีที่ขาดเลือด
          </p>
        </div>

        {/* Action Controls in Diagram */}
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

      {/* 4 FAST Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        {/* F - Face */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #ef4444',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1.25rem'
                }}
              >
                F
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase' }}>
                Face • ใบหน้า
              </span>
            </div>

            {/* SVG Anatomy Icon */}
            <div style={{ textAlign: 'center', margin: '0.75rem 0' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                <circle cx="40" cy="40" r="36" stroke="#dc2626" strokeWidth="2.5" fill="rgba(239, 68, 68, 0.04)" />
                {/* Eyes */}
                <circle cx="28" cy="32" r="4" fill="#475569" />
                <circle cx="52" cy="32" r="4" fill="#475569" />
                {/* Drooping Smile (Asymmetric mouth) */}
                <path d="M 26 50 Q 38 52 46 48 Q 54 44 56 42" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                {/* Arrow indicator of droop */}
                <path d="M 56 42 L 58 48" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem', textAlign: 'center' }}>
              มุมปากตก หน้าเบี้ยว
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'left', margin: 0 }}>
              เส้นประสาทสมองคู่ที่ 7 อ่อนแรง ยิ้มแล้วมุมปากข้างหนึ่งไม่ยกขึ้น แก้มชา หรือหลับตาไม่สนิทข้างใดข้างหนึ่ง
            </p>
          </div>

          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.65rem',
              borderTop: '1px dashed var(--border-light)',
              fontSize: '0.775rem',
              color: 'var(--text-muted)'
            }}
          >
            <strong>วิธีทดสอบ:</strong> ให้ผู้ป่วยลองยิ้ม ยิงฟัน หรือผิวปาก
          </div>
        </div>

        {/* A - Arm */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #f97316',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(249, 115, 22, 0.12)',
                  color: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1.25rem'
                }}
              >
                A
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ea580c', textTransform: 'uppercase' }}>
                Arm • แขนขาอ่อนแรง
              </span>
            </div>

            {/* SVG Anatomy Icon */}
            <div style={{ textAlign: 'center', margin: '0.75rem 0' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                {/* Body trunk */}
                <path d="M 40 18 L 40 55" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="12" r="6" stroke="#64748b" strokeWidth="2.5" />
                {/* Left Arm Normal */}
                <path d="M 40 25 L 18 25" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                {/* Right Arm Drooping (Weakness) */}
                <path d="M 40 25 L 56 36 L 62 48" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
                {/* Arrow down */}
                <path d="M 64 52 L 64 60 M 61 57 L 64 60 L 67 57" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem', textAlign: 'center' }}>
              แขนขาอ่อนแรงครึ่งซีก
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'left', margin: 0 }}>
              แขนหรือขาข้างใดข้างหนึ่งยกไม่ขึ้น ชาครึ่งซีก กำมือไม่ได้ ของหลุดมือ หรือเดินเซทรงตัวไม่ได้กะทันหัน
            </p>
          </div>

          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.65rem',
              borderTop: '1px dashed var(--border-light)',
              fontSize: '0.775rem',
              color: 'var(--text-muted)'
            }}
          >
            <strong>วิธีทดสอบ:</strong> ยกแขน 2 ข้างคว่ำมือ 10 วิ. ข้างที่มีปัญหาจะค่อยๆ ตกลง
          </div>
        </div>

        {/* S - Speech */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #eab308',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                  color: '#ca8a04',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1.25rem'
                }}
              >
                S
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ca8a04', textTransform: 'uppercase' }}>
                Speech • การพูด
              </span>
            </div>

            {/* SVG Anatomy Icon */}
            <div style={{ textAlign: 'center', margin: '0.75rem 0' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                {/* Head profile */}
                <path d="M 28 60 L 28 48 C 24 45 20 38 20 30 C 20 18 30 10 42 10 C 54 10 64 18 64 30 C 64 38 58 46 52 48 L 52 60" stroke="#64748b" strokeWidth="2.5" fill="none" />
                {/* Disconnected Speech Sound Waves (Dysarthria / Aphasia) */}
                <path d="M 22 42 L 12 40" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 20 46 L 8 48" stroke="#ca8a04" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                <path d="M 24 50 L 14 56" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem', textAlign: 'center' }}>
              พูดไม่ชัด ลิ้นคับปาก
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'left', margin: 0 }}>
              พูดอ้อแอ้เหมือนลิ้นแข็ง นึกคำไม่ออก พูดคำที่ไม่มีความหมาย หรือฟังคำพูดของผู้อื่นไม่เข้าใจ
            </p>
          </div>

          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.65rem',
              borderTop: '1px dashed var(--border-light)',
              fontSize: '0.775rem',
              color: 'var(--text-muted)'
            }}
          >
            <strong>วิธีทดสอบ:</strong> ให้พูดประโยคง่ายๆ ตาม เช่น "ท้องฟ้าแจ่มใส"
          </div>
        </div>

        {/* T - Time / 1669 */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderTop: '4px solid #dc2626',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1.25rem'
                }}
              >
                T
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase' }}>
                Time • รีบไป รพ.
              </span>
            </div>

            {/* Clock SVG */}
            <div style={{ textAlign: 'center', margin: '0.75rem 0' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                <circle cx="40" cy="40" r="34" stroke="#dc2626" strokeWidth="3" fill="rgba(239, 68, 68, 0.08)" />
                {/* 4.5 hour golden pie wedge */}
                <path d="M 40 40 L 40 10 A 30 30 0 0 1 65 52 Z" fill="rgba(239, 68, 68, 0.25)" />
                <line x1="40" y1="40" x2="40" y2="18" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="40" y1="40" x2="60" y2="48" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="40" r="4" fill="#dc2626" />
              </svg>
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#dc2626', marginBottom: '0.35rem', textAlign: 'center' }}>
              ทุกนาทีคือชีวิตสมอง!
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'left', margin: 0 }}>
              เซลล์สมองตาย <strong>1.9 ล้านเซลล์ทุกๆ 1 นาที</strong> ต้องถึง รพ. ภายใน <strong>4.5 ชม.</strong> เพื่อฉีดยาสลายลิ่มเลือด
            </p>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <a
              href="tel:1669"
              className="btn btn-primary"
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                borderColor: '#dc2626',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: '800',
                padding: '0.55rem',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)'
              }}
            >
              <PhoneCall size={16} />
              <span>โทร 1669 ทันที</span>
            </a>
          </div>
        </div>
      </div>

      {/* Golden Hour Interactive Timeline Bar */}
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
            <Clock size={18} style={{ color: '#dc2626' }} />
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>
              หน้าต่างทองคำแห่งการรักษา (Stroke Treatment Windows)
            </span>
          </div>
          <span className="badge" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            อัปเดตตามแนวทางเวชปฏิบัติสากล
          </span>
        </div>

        {/* Timeline Visualization */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.85rem'
          }}
        >
          {/* Phase 1: 0 - 4.5 Hours */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#059669' }}>
                0 – 4.5 ชั่วโมง
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Golden Window
              </span>
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              ฉีดยาสลายลิ่มเลือด (rt-PA)
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              ให้ยาทางหลอดเลือดดำเพื่อละลายก้อนเลือดที่อุดตันทันที ยิ่งได้ยาเร็ว สมองยิ่งฟื้นตัวได้สูง
            </p>
          </div>

          {/* Phase 2: 4.5 - 24 Hours */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#2563eb' }}>
                4.5 – 24 ชั่วโมง
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>
                Endovascular
              </span>
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              ใส่สายสวนลากลิ่มเลือด (Thrombectomy)
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              สำหรับหลอดเลือดแดงใหญ่ในสมองอุดตัน แพทย์จะสอดสายสวนเข้าไปดึงลิ่มเลือดออกมาโดยตรง
            </p>
          </div>

          {/* Phase 3: > 24 Hours */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                หลัง 24 ชั่วโมง
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Rehab & Prevent
              </span>
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              หออภิบาล & กายภาพบำบัด
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              ดูแลในหอผู้ป่วยโรคหลอดเลือดสมอง (Stroke Unit) ป้องกันภาวะแทรกซ้อน และฟื้นฟูกายภาพทันที
            </p>
          </div>
        </div>
      </div>

      {/* Critical Do's and Don'ts Checklist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}
      >
        {/* DO: สิ่งที่ต้องทำ */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '14px',
            backgroundColor: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}
        >
          <div style={{ fontWeight: '800', fontSize: '0.925rem', color: '#059669', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={16} />
            <span>สิ่งที่ต้องทำทันที (Do's)</span>
          </div>
          <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
            <li>โทร <strong>1669</strong> ทันทีที่สังเกตเห็นอาการ แม้เพียงข้อเดียว</li>
            <li>จด <strong>"เวลาที่เริ่มมีอาการครั้งสุดท้าย"</strong> ให้ชัดเจนเพื่อแจ้งแพทย์</li>
            <li>ให้ผู้ป่วยนอนราบในท่าที่สบาย ปลดเสื้อผ้าให้หลวม หายใจสะดวก</li>
          </ul>
        </div>

        {/* DON'T: สิ่งที่ห้ามทำเด็ดขาด */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '14px',
            backgroundColor: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)'
          }}
        >
          <div style={{ fontWeight: '800', fontSize: '0.925rem', color: '#dc2626', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <AlertTriangle size={16} />
            <span>สิ่งที่ห้ามทำเด็ดขาด (Don'ts)</span>
          </div>
          <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
            <li><strong>ห้ามรอดูอาการที่บ้าน</strong> คิดว่าเดี๋ยวคงดีขึ้นเอง</li>
            <li><strong>ห้ามป้อนน้ำ ยา หรืออาหารใดๆ</strong> เพราะอาจสำลักลงปอดเสียชีวิตได้</li>
            <li><strong>ห้ามบีบนวด หรือเจาะเลือดปลายนิ้ว</strong> เสียเวลาทองคำอันมีค่า</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Embedded Component View */}
      <div
        style={{
          margin: '2rem 0',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-primary)',
          border: '2px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(239, 68, 68, 0.08)',
          position: 'relative'
        }}
      >
        {content}
      </div>

      {/* Fullscreen Lightbox Modal (Phase 7 Feature) */}
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
            {/* Lightbox Close Button */}
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
