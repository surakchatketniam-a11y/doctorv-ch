import React, { useState } from 'react';
import {
  HeartPulse,
  Utensils,
  Activity,
  Bed,
  Smile,
  ShieldCheck,
  Users,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  CheckCircle2,
  X,
  Sparkles,
  Award
} from 'lucide-react';

export default function LifestylePillarsDiagram() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      id: 1,
      title: '1. โภชนาการ (Nutrition)',
      icon: Utensils,
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.1)',
      target: 'พืชผักหลากสี 2 ทัพพี/มื้อ • ลดน้ำตาลแฝง',
      desc: 'เน้นอาหารจากธรรมชาติไม่แปรรูป (Whole Food Plant-Predominant) ทานไขมันดีจากปลา ถั่ว น้ำมันมะกอก และลดคาร์โบไฮเดรตขัดสี เพื่อหยุดการอักเสบเรื้อรังระดับเซลล์'
    },
    {
      id: 2,
      title: '2. การออกกำลังกาย (Physical Activity)',
      icon: Activity,
      color: '#2563eb',
      bgColor: 'rgba(37, 99, 235, 0.1)',
      target: 'Aerobic 150 น./สัปดาห์ + เวท 2 วัน',
      desc: 'กล้ามเนื้อคือ "ยาอายุวัฒนะ" ช่วยดูดซับน้ำตาลแทนตับ การออกกำลังกายสม่ำเสมอกระตุ้น BDNF ซ่อมแซมเซลล์สมองและลดความดันโลหิต'
    },
    {
      id: 3,
      title: '3. การนอนหลับ (Restorative Sleep)',
      icon: Bed,
      color: '#7c3aed',
      bgColor: 'rgba(124, 58, 237, 0.1)',
      target: '7 – 8 ชั่วโมงต่อเนื่อง • เข้านอนก่อน 23:00 น.',
      desc: 'ช่วงเวลากลางคืนคือช่วงที่ระบบ Glymphatic ชะล้างของเสียพิษในสมอง ช่วยจัดระเบียบความจำ และฟื้นฟูระบบภูมิคุ้มกันของร่างกาย'
    },
    {
      id: 4,
      title: '4. จัดการความเครียด (Stress Management)',
      icon: Smile,
      color: '#ea580c',
      bgColor: 'rgba(234, 88, 12, 0.1)',
      target: 'ฝึกหายใจลึก / สมาธิ 10 นาทีทุกวัน',
      desc: 'ลดระดับฮอร์โมนคอร์ติซอล (Cortisol) เรื้อรัง กระตุ้นประสาทพาราซิมพาเทติก (Parasympathetic) ผ่านการฝึกหายใจช้า สมาธิ หรือโยคะ'
    },
    {
      id: 5,
      title: '5. ปลอดสารพิษ (Substance Avoidance)',
      icon: ShieldCheck,
      color: '#dc2626',
      bgColor: 'rgba(220, 38, 38, 0.1)',
      target: 'บุหรี่ 0 มวน • จำกัด/งดแอลกอฮอล์',
      desc: 'สารนิโคตินและแอลกอฮอล์ทำลายเยื่อบุหลอดเลือดโดยตรง การงดสารพิษช่วยลดความเสี่ยงโรคหลอดเลือดสมองและหัวใจวายได้มากกว่า 50%'
    },
    {
      id: 6,
      title: '6. ความสัมพันธ์ & เป้าหมายชีวิต (Social & Purpose)',
      icon: Users,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
      target: 'มีปฏิสัมพันธ์ที่อบอุ่น & มีความหมายในชีวิต',
      desc: 'งานวิจัย Harvard 85 ปีพิสูจน์ว่า "ความสัมพันธ์ที่ดี" คือปัจจัยอันดับ 1 ที่ทำให้มนุษย์อายุยืนและมีความสุข ความเหงาเรื้อรังส่งผลเสียเท่ากับการสูบบุหรี่ 15 มวนต่อวัน'
    }
  ];

  const handleShare = async () => {
    const text = '🌿 6 เสาหลักเวชศาสตร์วิถีชีวิต (Lifestyle Medicine) โดย นพ.วีระพันธ์ สุวรรณนามัย\n' +
      pillars.map(p => `• ${p.title}: ${p.target}`).join('\n') +
      '\n\nศึกษาแนวทางสุขภาพเชิงป้องกันได้ที่: ' + window.location.origin;

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
        await navigator.share({ title: '6 เสาหลักเวชศาสตร์วิถีชีวิต — หมอวี', text });
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
          borderBottom: '2px solid rgba(5, 150, 105, 0.2)',
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
                backgroundColor: 'rgba(5, 150, 105, 0.12)',
                color: '#059669',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              LIFESTYLE MEDICINE CORE
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              หนังสือ "ก่อนจะป่วย" • หมอวี
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            แผนผัง 6 เสาหลักเวชศาสตร์วิถีชีวิต (The 6 Pillars)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
            รากฐานการป้องกันและฟื้นฟูโรคไม่ติดต่อเรื้อรัง (NCDs) 80% ป้องกันได้ด้วยการปรับเปลี่ยนพฤติกรรม
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

      {/* 6 Pillars Interactive Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        {pillars.map((p, idx) => {
          const IconComp = p.icon;
          const isSelected = selectedPillar === idx;

          return (
            <div
              key={p.id}
              onClick={() => setSelectedPillar(idx)}
              style={{
                backgroundColor: isSelected ? 'var(--bg-card)' : 'var(--bg-secondary)',
                border: `2px solid ${isSelected ? p.color : 'var(--border-color)'}`,
                borderTop: `4px solid ${p.color}`,
                borderRadius: '16px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? `0 8px 24px ${p.bgColor}` : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: p.bgColor,
                    color: p.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconComp size={18} />
                </div>
                <h4 style={{ fontSize: '0.925rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  {p.title}
                </h4>
              </div>

              <div
                style={{
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  color: p.color,
                  backgroundColor: p.bgColor,
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  marginBottom: '0.65rem',
                  lineHeight: 1.4
                }}
              >
                🎯 {p.target}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Clinical Evidence Banner */}
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
          <strong style={{ color: 'var(--text-primary)' }}>ข้อเท็จจริงทางคลินิก (Dr. V Key Takeaway):</strong> งานวิจัยระดับโลกระบุว่า การปฏิบัติตาม 6 เสาหลักนี้อย่างต่อเนื่อง สามารถลดความเสี่ยงการเกิด <strong>โรคเบาหวานชนิดที่ 2 ได้ถึง 93%, โรคหัวใจขาดเลือด 81%, โรคหลอดเลือดสมอง 50%, และโรคมะเร็งทุกชนิด 36%</strong>
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
          border: '2px solid rgba(5, 150, 105, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(5, 150, 105, 0.08)',
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
