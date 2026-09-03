import React from 'react';
import { BookOpen, ExternalLink, AlertTriangle, HeartPulse, Brain, Activity, User } from 'lucide-react';
import { YouTubeIcon, FacebookIcon, TikTokIcon } from './SocialIcons';
import authorData from '../data/author.json';

export default function Footer({ onOpenAuthor, onOpenTools, onSelectBook }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3.5rem 0 2rem 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Col 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <HeartPulse size={18} />
              </div>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>หมอวี Health Library</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              คลังความรู้สุขภาพองค์รวมและโรคระบบประสาทฉบับสมบูรณ์ (ก่อนจะป่วย & ก่อนสมองพัง) โดย นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: '600', marginTop: '0.5rem' }}>
              “{authorData.slogan}”
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              คลังหนังสือ & เครื่องมือ
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li>
                <a href="#chapters-section" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <HeartPulse size={14} style={{ color: 'var(--book1-color)' }} />
                  <span>เล่ม 1: ก่อนจะป่วย (39 ตอน)</span>
                </a>
              </li>
              <li>
                <a href="#chapters-section" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Brain size={14} style={{ color: 'var(--book2-color)' }} />
                  <span>เล่ม 2: ก่อนสมองพัง (22 ตอน)</span>
                </a>
              </li>
              <li>
                <button type="button" onClick={onOpenTools} style={{ color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span>เครื่องมือประเมินสุขภาพ 4 หมวด</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAuthor} style={{ color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} />
                  <span>ประวัติ นพ.วีระพันธ์ สุวรรณนามัย</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Channels */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              ช่องทางติดตาม Dr.V
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {authorData.channels.map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)'
                  }}
                  aria-label={`ติดตามหมอวีบน ${ch.platform}: ${ch.name}`}
                >
                  {ch.platform === 'YouTube' && <YouTubeIcon size={15} />}
                  {ch.platform === 'Facebook' && <FacebookIcon size={15} />}
                  {ch.platform === 'TikTok' && <TikTokIcon size={15} />}
                  <span>{ch.platform}: {ch.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright with AlertTriangle SVG Icon */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <AlertTriangle size={15} color="var(--action-border)" />
            <span>
              <strong>ข้อจำกัดความรับผิดชอบทางการแพทย์ (Medical Disclaimer):</strong> ข้อมูลในเว็บไซต์นี้มีวัตถุประสงค์เพื่อการให้ความรู้และสร้างความตระหนักรู้ด้านสุขภาพเท่านั้น มิได้มีเจตนาเพื่อใช้แทนคำแนะนำ การตรวจวินิจฉัย หรือการรักษาโดยแพทย์ผู้เชี่ยวชาญ หากมีข้อสงสัยหรืออาการผิดปกติ กรุณาปรึกษาแพทย์
            </span>
          </div>
          <div>
            เนื้อหาลิขสิทธิ์ © นพ.วีระพันธ์ สุวรรณนามัย (ว24396) | พัฒนาเป็น Health Knowledge Portal เพื่อการศึกษาและวิทยาทาน
          </div>
        </div>
      </div>
    </footer>
  );
}
