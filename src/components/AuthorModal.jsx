import React, { useState, useEffect } from 'react';
import { X, Award, BookOpen, Heart, GraduationCap, ExternalLink, Stethoscope, CheckCircle } from 'lucide-react';
import { YouTubeIcon, FacebookIcon, TikTokIcon } from './SocialIcons';
import authorData from '../data/author.json';

export default function AuthorModal({ isOpen, onClose }) {
  const [selectedImg, setSelectedImg] = useState('/images/doctorv1.jpg');

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

  if (!isOpen) return null;

  const doctorImages = [
    { src: '/images/doctorv1.jpg', title: 'นพ.วีระพันธ์ สุวรรณนามัย' },
    { src: '/images/doctorv2.jpg', title: 'การบรรยายและให้ความรู้' },
    { src: '/images/doctorv3.jpg', title: 'มีเพื่อนเป็นหมอ (Your friend is a doctor)' },
    { src: '/images/doctorv4.jpg', title: 'เวชศาสตร์วิถีชีวิตเพื่อสุขภาพ' }
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ประวัติและผลงาน นพ.วีระพันธ์ สุวรรณนามัย"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '720px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
              <Stethoscope size={14} />
              <span>ประวัติและผลงานผู้เขียน</span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: '700' }}>
              {authorData.name} ({authorData.nickname})
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {authorData.title} | เลขที่ใบอนุญาต {authorData.license_id}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="ปิดหน้าต่างประวัติผู้เขียน"
          >
            <X size={20} />
          </button>
        </div>

        {/* Photo Banner and Gallery */}
        <div style={{ marginBottom: '1.75rem' }}>
          {/* Main Large Image Viewer */}
          <div
            style={{
              width: '100%',
              height: '340px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem'
            }}
          >
            <img
              src={selectedImg}
              alt="นพ.วีระพันธ์ สุวรรณนามัย"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
          </div>

          {/* Thumbnail Selection Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {doctorImages.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedImg(item.src)}
                style={{
                  height: '90px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: selectedImg === item.src ? 'var(--accent-primary)' : 'var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  boxShadow: selectedImg === item.src ? '0 0 0 2px var(--accent-light)' : 'none',
                  transition: 'all 0.2s',
                  padding: 0,
                  display: 'block'
                }}
                aria-label={`เลือกดูรูป ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bio Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quote / Slogan */}
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--quote-bg)',
              borderLeft: '4px solid var(--quote-border)',
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              fontSize: '1.05rem'
            }}
          >
            “{authorData.slogan}”
            <div style={{ fontStyle: 'normal', fontSize: '0.875rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
              {authorData.bio_short}
            </div>
          </div>

          {/* Education & Credentials */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={18} color="var(--accent-primary)" />
              <span>คุณวุฒิทางการแพทย์และการศึกษา</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {authorData.education_and_credentials.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Roles */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--takeaway-border)" />
              <span>บทบาทหน้าที่ในปัจจุบัน</span>
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {authorData.current_roles.map((role, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle size={16} color="var(--takeaway-border)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Books */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} color="var(--action-border)" />
              <span>ผลงานหนังสือชุดสุขภาพ</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {authorData.books.map((b, i) => (
                <a
                  key={i}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.85rem',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {b.subtitle}
                    </div>
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge" style={{ fontSize: '0.75rem' }}>{b.status}</span>
                    <ExternalLink size={14} color="var(--accent-primary)" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} color="var(--danger-border)" />
              <span>ติดตามและติดต่อ</span>
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {authorData.channels.map((ch, i) => (
                <a
                  key={i}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  {ch.platform === 'YouTube' && <YouTubeIcon size={16} />}
                  {ch.platform === 'Facebook' && <FacebookIcon size={16} />}
                  {ch.platform === 'TikTok' && <TikTokIcon size={16} />}
                  <span>{ch.platform}: {ch.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
