import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function DementiaComparisonDiagram() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  const comparisons = [
    {
      feature: '1. การลืมเรื่องราว',
      normal: 'ลืมชื่อคนหรือนัดหมายชั่วคราว แต่นึกออกในเวลาต่อมา',
      dementia: 'ลืมเหตุการณ์ที่เพิ่งเกิดขึ้นไม่กี่ชั่วโมงก่อน และจำไม่ได้อีกเลย'
    },
    {
      feature: '2. การวางของ',
      normal: 'วางกุญแจผิดที่ แต่สามารถย้อนคิดตามขั้นตอนเพื่อหาจนเจอ',
      dementia: 'วางของในที่ที่ไม่สมควรอยู่ (เช่น เอารีโมทไปแช่ตู้เย็น) แล้วหาไม่เจอ'
    },
    {
      feature: '3. การจัดการเงินและตัวเลข',
      normal: 'คิดเลขช้าลงบ้าง หรือคำนวณบิลผิดพลาดเป็นบางครั้ง',
      dementia: 'สับสนเรื่องเงิน ทอนเงินไม่ถูก ไม่เข้าใจวิธีจ่ายบิลที่เคยทำได้คล่อง'
    },
    {
      feature: '4. ทิศทางและสถานที่',
      normal: 'สับสนทิศทางชั่วคราวในสถานที่ใหม่ๆ ที่ไม่คุ้นเคย',
      dementia: 'หลงทางในซอยบ้านหรือสถานที่ที่คุ้นเคยมานานหลายสิบปี'
    },
    {
      feature: '5. ภาษาและการสื่อสาร',
      normal: 'นึกคำศัพท์ไม่ออกชั่วขณะ ("ติดอยู่ที่ปาก")',
      dementia: 'เรียกชื่อสิ่งของผิดไปเลย (เช่น เรียกปากกาว่าช้อน) หรือพูดหยุดกลางคัน'
    },
    {
      feature: '6. อารมณ์และบุคลิกภาพ',
      normal: 'มีหงุดหงิดบ้างตามเหตุการณ์และมีเหตุผลรองรับ',
      dementia: 'บุคลิกเปลี่ยนชัดเจน หวาดระแวง คิดว่าคนอื่นขโมยของ หรือเฉยเมยผิดปกติ'
    },
    {
      feature: '7. ความตระหนักรู้ (Insight)',
      normal: 'รู้ตัวว่าตัวเองเริ่มขี้ลืม และพยายามจดบันทึกช่วยจำ',
      dementia: 'ไม่รู้ตัวว่าตัวเองลืม ปฏิเสธว่าไม่มีปัญหา และโทษคนอื่น'
    }
  ];

  const handleShare = () => {
    const text = '🧠 เปรียบเทียบ: หลงลืมตามวัย VS โรคสมองเสื่อม โดย นพ.วีระพันธ์ สุวรรณนามัย\n' +
      '• หลงลืมตามวัย: ลืมชั่วคราวแต่นึกออก รู้ตัวว่าขี้ลืม และยังใช้ชีวิตประจำวันได้เอง\n' +
      '• สมองเสื่อม: ลืมแล้วจำไม่ได้อีกเลย หลงทางในที่คุ้นเคย และไม่รู้ตัวว่าตนเองผิดปกติ\n' +
      'อ่านคู่มือโรคสมองเพิ่มเติมได้ที่: ' + window.location.origin;

    if (navigator.share) {
      navigator.share({ title: 'หลงลืมตามวัย VS สมองเสื่อม — หมอวี', text }).catch(() => {});
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
          borderBottom: '2px solid rgba(124, 58, 237, 0.2)',
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
                backgroundColor: 'rgba(124, 58, 237, 0.12)',
                color: '#7c3aed',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              COGNITIVE NEUROLOGY
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              หนังสือ "ก่อนสมองพัง" • หมอวี
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            แผนผังเปรียบเทียบ: หลงลืมตามวัย VS โรคสมองเสื่อม (Dementia)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
            7 จุดสังเกตชัดเจนที่ช่วยให้คุณและคนในครอบครัวแยกแยะระหว่างการเสื่อมตามอายุกับการเกิดโรคสมอง
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
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
            title="แชร์แผนผังนี้"
          >
            {copied ? <CheckCircle2 size={14} style={{ color: '#10b981' }} /> : <Share2 size={14} />}
            <span>{copied ? 'คัดลอกแล้ว' : 'แชร์'}</span>
          </button>
        </div>
      </div>

      {/* Comparison Table Grid */}
      <div
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr 2fr',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '2px solid var(--border-color)',
            padding: '0.85rem 1rem',
            fontWeight: '800',
            fontSize: '0.875rem'
          }}
        >
          <div style={{ color: 'var(--text-muted)' }}>ลักษณะอาการ</div>
          <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={16} />
            <span>หลงลืมตามวัย (Normal Aging)</span>
          </div>
          <div style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <AlertTriangle size={16} />
            <span>โรคสมองเสื่อม (Dementia)</span>
          </div>
        </div>

        {/* Table Rows */}
        {comparisons.map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 2fr 2fr',
              padding: '0.9rem 1rem',
              fontSize: '0.825rem',
              lineHeight: 1.5,
              borderBottom: idx < comparisons.length - 1 ? '1px solid var(--border-light)' : 'none',
              backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--bg-secondary)'
            }}
          >
            <div style={{ fontWeight: '700', color: 'var(--text-primary)', paddingRight: '0.5rem' }}>
              {row.feature}
            </div>
            <div style={{ color: 'var(--text-secondary)', paddingRight: '0.75rem' }}>
              {row.normal}
            </div>
            <div style={{ color: '#b91c1c', fontWeight: '600' }}>
              {row.dementia}
            </div>
          </div>
        ))}
      </div>

      {/* Doctor V Advice */}
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
          <strong style={{ color: 'var(--text-primary)' }}>คำแนะนำจากหมอวี:</strong> เส้นแบ่งที่สำคัญที่สุดระหว่าง "หลงลืมตามวัย" กับ "สมองเสื่อม" คือ <strong>ความสามารถในการใช้ชีวิตประจำวันและการดูแลตนเอง</strong> หากคนในครอบครัวเริ่มลืมสิ่งพื้นฐาน เช่น วิธีอาบน้ำ แต่งตัว หรือหลงทิศทางในที่คุ้นเคย แนะนำให้พาไปพบแพทย์ระบบประสาทเพื่อตรวจคัดกรองตั้งแต่ระยะแรก (Early Stage)
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
          border: '2px solid rgba(124, 58, 237, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(124, 58, 237, 0.08)',
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
