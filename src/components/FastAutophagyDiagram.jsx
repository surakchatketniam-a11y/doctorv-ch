import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Dna
} from 'lucide-react';

export default function FastAutophagyDiagram() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  const stages = [
    {
      hours: '0 – 4 ชม.',
      title: 'ช่วงย่อยอาหาร (Fed State)',
      status: 'สะสมพลังงาน',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      desc: 'น้ำตาลกลูโคสในเลือดและอินซูลินอยู่ในระดับสูง ร่างกายใช้พลังงานจากอาหารมื้อล่าสุด และเก็บพลังงานส่วนเกินเป็นไกลโคเจนในตับและไขมัน'
    },
    {
      hours: '4 – 12 ชม.',
      title: 'เริ่มใช้พลังงานสำรอง (Early Fasting)',
      status: 'อินซูลินลดระดับ',
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.1)',
      desc: 'ระดับน้ำตาลและอินซูลินในเลือดลดลงสู่ระดับปกติ ตับเริ่มสลายไกลโคเจนที่สะสมไว้ออกมาเป็นพลังงาน เซลล์เริ่มปรับตัวเข้าสู่โหมดพัก'
    },
    {
      hours: '12 – 16 ชม.',
      title: 'จุดเปลี่ยนสลับโหมด (Metabolic Switch)',
      status: 'เผาผลาญไขมัน (Fat Burning)',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      desc: 'ไกลโคเจนในตับเริ่มหมด ร่างกายสลับโหมดจากการเผาน้ำตาลไปเป็นการ "ดึงไขมันสะสม" ออกมาเปลี่ยนเป็นกรดไขมันและคีโตน (Ketones) หล่อเลี้ยงสมอง'
    },
    {
      hours: '16 – 24 ชม.',
      title: 'กลืนกินเซลล์เก่า (Autophagy Active)',
      status: 'ซ่อมแซมเซลล์ลึก & ชะลอวัย',
      color: '#dc2626',
      bgColor: 'rgba(220, 38, 38, 0.1)',
      desc: 'รางวัลโนเบลปี 2016: เซลล์เริ่มกระบวนการ Autophagy รีไซเคิลไมโทคอนเดรียและโปรตีนพิษที่เสื่อมสภาพ ลดการอักเสบ และกระตุ้นยีนอายุยืน (Sirtuins)'
    }
  ];

  const handleShare = async () => {
    const text = '🔥 กลไก Intermittent Fasting (IF) & Autophagy โดย นพ.วีระพันธ์ สุวรรณนามัย\n' +
      stages.map(s => `• ${s.hours} ${s.title}: ${s.status}`).join('\n') +
      '\n\nศึกษาแนวทาง IF อย่างปลอดภัยได้ที่: ' + window.location.origin;

    const copyToClipboard = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    };

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title: 'IF & Autophagy Timeline — หมอวี', text });
      } catch (err) {
        if (err.name !== 'AbortError') {
          await copyToClipboard();
        }
      }
    } else {
      await copyToClipboard();
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
          borderBottom: '2px solid rgba(245, 158, 11, 0.2)',
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
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#d97706',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              CELLULAR METABOLISM & LONGEVITY
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            ไทม์ไลน์กลไก Intermittent Fasting (IF) & Autophagy
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
            เข้าใจกระบวนการสลับโหมดพลังงานจากน้ำตาลสู่ไขมัน และการชำระล้างขยะระดับเซลล์เพื่อชะลอวัย
          </p>
        </div>

        {/* Controls */}
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
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.8rem',
              gap: '0.3rem',
              color: copied ? '#10b981' : undefined,
              fontWeight: copied ? '700' : 'normal',
              borderColor: copied ? '#10b981' : undefined
            }}
            title="แชร์แผนผังนี้"
          >
            {copied ? <CheckCircle2 size={14} style={{ color: '#10b981' }} /> : <Share2 size={14} />}
            <span>{copied ? 'คัดลอกสรุปแล้ว!' : 'แชร์'}</span>
          </button>
        </div>
      </div>

      {/* 4 Stages Timeline Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}
      >
        {stages.map((st, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderTop: `4px solid ${st.color}`,
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '900', color: st.color }}>
                  {st.hours}
                </span>
                <span
                  style={{
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    color: st.color,
                    backgroundColor: st.bgColor,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px'
                  }}
                >
                  {st.status}
                </span>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {st.title}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor V Advice on Safe IF */}
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
          <strong style={{ color: 'var(--text-primary)' }}>เคล็ดลับ IF ที่ปลอดภัยจากหมอวี:</strong> สำหรับผู้เริ่มต้น แนะนำเริ่มจากสูตร <strong>14/10 หรือ 16/8</strong> (เช่น ทานมื้อแรก 10:00 น. และมื้อสุดท้าย 18:00 น.) ในช่วงอดสามารถดื่มน้ำเปล่า ชาไม่หวาน หรือกาแฟดำได้ และสิ่งสำคัญคือ "ช่วงที่กิน" ต้องเป็นอาหารที่มีคุณค่าจริง ไม่ใช่การกินฟาสต์ฟู้ดเพื่อชดเชย
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          margin: '2rem 0',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-primary)',
          border: '2px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(245, 158, 11, 0.08)',
          position: 'relative'
        }}
      >
        {content}
      </div>

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
