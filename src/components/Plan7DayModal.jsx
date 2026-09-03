import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, CheckCircle2, Circle, Plus, Trash2, Share2, Sparkles, Trophy, ChevronRight, Check } from 'lucide-react';

export default function Plan7DayModal({ isOpen, onClose, planItems = [], onTogglePlanItem, onRemovePlanItem, onAddCustomItem }) {
  const [customInput, setCustomInput] = useState('');
  const [copyToast, setCopyToast] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const completedCount = planItems.filter(i => i.completed).length;
  const progressPercent = planItems.length > 0 ? Math.round((completedCount / planItems.length) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomItem(customInput.trim());
    setCustomInput('');
  };

  const handleSharePlan = () => {
    const text = `📋 แผนสุขภาพ 7 วันของฉัน (หมอวี Health Portal)\nความคืบหน้า: ${completedCount}/${planItems.length} ข้อ (${progressPercent}%)\n\n` +
      planItems.map((item, idx) => `${item.completed ? '✅' : '⬜'} ${idx + 1}. ${item.text}`).join('\n') +
      `\n\nสร้างแผนสุขภาพของคุณได้ที่: ${window.location.origin}`;

    if (navigator.share) {
      navigator.share({
        title: 'แผนสุขภาพ 7 วันของฉัน — หมอวี Health Library',
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '1.75rem', maxWidth: '600px', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
              <Calendar size={14} />
              <span>Behavior Change & Habit Loop</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              แผนสุขภาพ 7 วันของฉัน (7-Day Action Plan)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              เปลี่ยนความรู้จากบทความ ให้เป็นพฤติกรรมเล็กๆ ที่ทำได้จริงทุกวัน
            </p>
          </div>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="ปิด">
            <X size={20} />
          </button>
        </div>

        {/* Progress Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {progressPercent === 100 ? <Trophy size={16} style={{ color: '#eab308' }} /> : <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />}
              <span>ความคืบหน้ารายสัปดาห์</span>
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
              {completedCount} / {planItems.length} ข้อ ({progressPercent}%)
            </span>
          </div>

          <div style={{ height: '8px', backgroundColor: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: progressPercent === 100 ? '#22c55e' : 'var(--accent-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Action Items List */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.25rem' }}>
          {planItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <Calendar size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
              <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>ยังไม่มีเป้าหมายในแผน 7 วัน</div>
              <div>เลือกกด "+ เพิ่มในแผน 7 วัน" จากท้ายบทความ หรือพิมพ์เพิ่มเองด้านล่างได้เลยครับ</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {planItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: item.completed ? 'var(--takeaway-bg)' : 'var(--bg-primary)',
                    border: `1px solid ${item.completed ? 'var(--takeaway-border)' : 'var(--border-color)'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => onTogglePlanItem(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textAlign: 'left',
                      flex: 1,
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'inherit'
                    }}
                  >
                    {item.completed ? (
                      <CheckCircle2 size={20} style={{ color: 'var(--book1-color)', flexShrink: 0 }} />
                    ) : (
                      <Circle size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: '1.4',
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                        fontWeight: item.completed ? '400' : '500'
                      }}
                    >
                      {item.text}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemovePlanItem(item.id)}
                    aria-label="ลบข้อนี้"
                    className="btn btn-ghost btn-icon"
                    style={{ color: 'var(--text-light)', padding: '4px' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Custom Item Form */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexShrink: 0 }}>
          <input
            type="text"
            placeholder="เพิ่มเป้าหมายสุขภาพของตัวเอง (เช่น เดิน 15 นาทีหลังอาหาร)..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 0.85rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-secondary" style={{ padding: '0.6rem 0.9rem', fontSize: '0.85rem', flexShrink: 0 }}>
            <Plus size={16} />
            <span>เพิ่ม</span>
          </button>
        </form>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', flexShrink: 0 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSharePlan}
            disabled={planItems.length === 0}
            style={{ fontSize: '0.8125rem', gap: '0.35rem' }}
          >
            <Share2 size={14} />
            <span>{copyToast ? 'คัดลอกสรุปสำเร็จ!' : 'แชร์สรุปแผน 7 วัน'}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            style={{ fontSize: '0.85rem', padding: '0.45rem 1.25rem' }}
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
}
