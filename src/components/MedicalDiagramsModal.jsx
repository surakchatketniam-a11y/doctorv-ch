import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  ShieldAlert,
  Moon,
  HeartPulse,
  Flame,
  Brain,
  Layers,
  ChevronRight
} from 'lucide-react';
import FastStrokeDiagram from './FastStrokeDiagram';
import GlymphaticSleepDiagram from './GlymphaticSleepDiagram';
import LifestylePillarsDiagram from './LifestylePillarsDiagram';
import FastAutophagyDiagram from './FastAutophagyDiagram';
import DementiaComparisonDiagram from './DementiaComparisonDiagram';

export default function MedicalDiagramsModal({ isOpen, onClose, initialDiagram = 'fast' }) {
  const [activeDiagram, setActiveDiagram] = useState(initialDiagram);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveDiagram(initialDiagram || 'fast');
    }
  }, [isOpen, initialDiagram]);

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

  const diagramList = [
    {
      id: 'fast',
      title: 'FAST Stroke & Golden Hour',
      badge: 'หลอดเลือดสมอง',
      color: '#dc2626',
      icon: ShieldAlert,
      component: FastStrokeDiagram
    },
    {
      id: 'glymphatic',
      title: 'Glymphatic & หลับลึก',
      badge: 'การนอนหลับ & สมอง',
      color: '#2563eb',
      icon: Moon,
      component: GlymphaticSleepDiagram
    },
    {
      id: 'lifestyle',
      title: '6 เสาหลักเวชศาสตร์วิถีชีวิต',
      badge: 'Lifestyle Medicine',
      color: '#059669',
      icon: HeartPulse,
      component: LifestylePillarsDiagram
    },
    {
      id: 'autophagy',
      title: 'ไทม์ไลน์ IF & Autophagy',
      badge: 'โภชนาการ & ชะลอวัย',
      color: '#d97706',
      icon: Flame,
      component: FastAutophagyDiagram
    },
    {
      id: 'dementia',
      title: 'หลงลืมตามวัย VS สมองเสื่อม',
      badge: 'โรคสมอง & ความจำ',
      color: '#7c3aed',
      icon: Brain,
      component: DementiaComparisonDiagram
    }
  ];

  const currentDiagramObj = diagramList.find(d => d.id === activeDiagram) || diagramList[0];
  const ActiveComponent = currentDiagramObj.component;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagrams-modal-title"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '1.75rem',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
              <Layers size={14} />
              <span>Interactive Clinical Diagrams • แผนผังการแพทย์อินเตอร์แอคทีฟ</span>
            </div>
            <h2 id="diagrams-modal-title" style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              คลังแผนผังทางการแพทย์ & อินโฟกราฟิก (Medical Diagrams Hub)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              รวบรวมแผนผังกลไกทางสรีรวิทยาและโรคสมองที่เข้าใจง่าย ตามหลักฐานการแพทย์โดย นพ.วีระพันธ์ สุวรรณนามัย
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดคลังแผนผังการแพทย์"
          >
            <X size={20} />
          </button>
        </div>

        {/* Diagram Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.65rem',
            marginBottom: '1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {diagramList.map((d) => {
            const IconC = d.icon;
            const isActive = activeDiagram === d.id;

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDiagram(d.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  flexShrink: 0,
                  gap: '0.35rem',
                  backgroundColor: isActive ? d.color : undefined,
                  borderColor: isActive ? d.color : undefined,
                  color: isActive ? '#fff' : undefined,
                  borderRadius: '10px'
                }}
              >
                <IconC size={15} />
                <span>{d.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Diagram Rendering Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
