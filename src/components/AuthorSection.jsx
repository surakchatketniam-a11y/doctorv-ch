import React from 'react';
import { Award, GraduationCap, HeartHandshake, ExternalLink, Stethoscope, CheckCircle } from 'lucide-react';
import { YouTubeIcon, FacebookIcon, TikTokIcon } from './SocialIcons';
import authorData from '../data/author.json';

export default function AuthorSection({ onOpenModal }) {
  return (
    <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Stethoscope size={14} />
            <span>เกี่ยวกับผู้เขียน</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {authorData.name} ({authorData.nickname})
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {authorData.title} (เลขที่ใบอนุญาต {authorData.license_id})
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', fontWeight: '600', marginTop: '0.35rem' }}>
            “{authorData.slogan}”
          </p>
        </div>

        {/* Profile Card & Photo Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}
        >
          {/* Left: Doctor Photo & Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                position: 'relative',
                maxWidth: '380px',
                width: '100%',
                borderRadius: '24px',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow-hover)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-primary)'
                }}
              >
                <img
                  src="/images/doctorv1.jpg"
                  alt="นพ.วีระพันธ์ สุวรรณนามัย (หมอวี)"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}
              >
                <CheckCircle size={22} color="#10b981" />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    นพ.วีระพันธ์ สุวรรณนามัย
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ประสาทศัลยแพทย์ (ว24396)
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails with clean square framing and top object-position */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', width: '100%', maxWidth: '380px', marginTop: '1rem' }}>
              {[
                { img: 'doctorv2.jpg', label: 'การบรรยาย' },
                { img: 'doctorv3.jpg', label: 'มีเพื่อนเป็นหมอ' },
                { img: 'doctorv4.jpg', label: 'เวชศาสตร์วิถีชีวิต' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={onOpenModal}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid var(--border-color)',
                    cursor: 'pointer',
                    boxShadow: 'var(--card-shadow)',
                    backgroundColor: 'var(--bg-card)',
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    transition: 'transform 0.2s, border-color 0.2s'
                  }}
                  title="คลิกเพื่อดูรูปและประวัติฉบับเต็ม"
                >
                  <img
                    src={`/images/${item.img}`}
                    alt={item.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      padding: '4px 6px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Bio Callout */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--quote-bg)',
                borderLeft: '4px solid var(--quote-border)',
                borderRadius: '0 12px 12px 0'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                “ไม่มีการลงทุนใดคุ้มค่ากว่าการลงทุนในสมองตัวเอง”
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {authorData.bio_short}
              </p>
            </div>

            {/* Education & Credentials */}
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                <GraduationCap size={20} color="var(--accent-primary)" />
                <span>การศึกษา & คุณวุฒิเฉพาะทาง</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {authorData.education_and_credentials.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>•</span>
                    <div>
                      <strong>{item.degree}</strong> — {item.institution}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roles & Mission */}
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                <HeartHandshake size={20} color="#10b981" />
                <span>บทบาทและพันธกิจปัจจุบัน</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                {authorData.mission}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {authorData.channels.map((ch, idx) => (
                  <a
                    key={idx}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    {ch.platform === 'YouTube' && <YouTubeIcon size={14} />}
                    {ch.platform === 'Facebook' && <FacebookIcon size={14} />}
                    {ch.platform === 'TikTok' && <TikTokIcon size={14} />}
                    <span>{ch.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary"
                onClick={onOpenModal}
                style={{ padding: '0.65rem 1.5rem' }}
              >
                <span>ดูประวัติและผลงานฉบับเต็ม</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
