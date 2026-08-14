"use client";

import { useMemo, useState } from "react";

type Chapter = {
  number?: number;
  title: string;
  subtitle: string;
  section: 1 | 2 | 3 | 0;
  source?: string;
  summary: string;
  status?: "ready" | "pending";
};

const chapters: Chapter[] = [
  { title: "บทนำ", subtitle: "ทำไมสมองถึงสำคัญที่สุด", section: 0, source: "https://www.facebook.com/share/p/14eK2sJvZCJ/", summary: "ชวนทำความเข้าใจว่าสมองเป็นศูนย์กลางของความคิด ความจำ อารมณ์ และการใช้ชีวิตอย่างไร" },
  { number: 1, title: "สมอง", subtitle: "อัจฉริยะขนาด 1.4 กิโลกรัม", section: 1, source: "https://www.facebook.com/share/p/18dghc2qWu/?mibextid=wwXIfr", summary: "พื้นฐานโครงสร้างและหน้าที่ของอวัยวะที่ซับซ้อนที่สุดในร่างกาย" },
  { number: 2, title: "ระบบประสาท", subtitle: "เครือข่ายที่ซับซ้อนที่สุดในจักรวาล", section: 1, source: "https://m.facebook.com/story.php?story_fbid=28175677685382484&id=100001008889885", summary: "เห็นภาพการสื่อสารระหว่างสมอง ไขสันหลัง และเส้นประสาททั่วร่างกาย" },
  { number: 3, title: "สารสื่อประสาท", subtitle: "ผู้ส่งสารของสมอง", section: 1, source: "https://www.facebook.com/share/p/1DHmkDmoks/?mibextid=wwXIfr", summary: "รู้จักสารเคมีที่เกี่ยวข้องกับอารมณ์ การเคลื่อนไหว การนอน และการเรียนรู้" },
  { number: 4, title: "Neuroplasticity", subtitle: "สมองที่เปลี่ยนแปลงได้ตลอดชีวิต", section: 1, source: "https://www.facebook.com/share/p/18eTXt9HoF/?mibextid=wwXIfr", summary: "ความสามารถของสมองในการเรียนรู้ ปรับตัว และสร้างเส้นทางการเชื่อมต่อใหม่" },
  { number: 5, title: "โรคหลอดเลือดสมอง (Stroke)", subtitle: "ฆาตกรเงียบในร่างกาย", section: 2, source: "https://www.facebook.com/share/p/18yDp5ddnr/?mibextid=wwXIfr", summary: "สัญญาณเตือนที่ควรจำให้ขึ้นใจ และเหตุผลที่การรักษาอย่างรวดเร็วสำคัญมาก" },
  { number: 6, title: "โรคอัลไซเมอร์", subtitle: "เมื่อความทรงจำจางหาย", section: 2, source: "https://www.facebook.com/share/p/1Ad1wNDnb4/?mibextid=wwXIfr", summary: "ทำความเข้าใจการเปลี่ยนแปลงของความจำและการดูแลผู้ที่กำลังเผชิญโรค" },
  { number: 7, title: "สมองเสื่อม (Dementia)", subtitle: "มากกว่าแค่ลืม", section: 2, source: "https://www.facebook.com/share/18ZQwyeYDW/?mibextid=wwXIfr", summary: "แยกให้ออกระหว่างความหลงลืมทั่วไปกับสัญญาณที่ควรปรึกษาผู้เชี่ยวชาญ" },
  { number: 8, title: "โรคพาร์กินสัน", subtitle: "มากกว่าแค่มือสั่น", section: 2, source: "https://www.facebook.com/share/p/17iVzRBGo7/?mibextid=wwXIfr", summary: "มองอาการของโรคให้ครบทั้งด้านการเคลื่อนไหวและอาการที่มองไม่เห็น" },
  { number: 9, title: "โรคปลอกประสาทเสื่อมแข็ง (MS)", subtitle: "เมื่อภูมิคุ้มกันโจมตีสมอง", section: 2, summary: "ทำความรู้จักโรคที่ระบบภูมิคุ้มกันเข้าใจผิดและทำลายปลอกประสาท", status: "pending" },
  { number: 10, title: "โรคลมชัก (Epilepsy)", subtitle: "ฟ้าผ่าในสมอง", section: 2, source: "https://www.facebook.com/share/p/1DjGTZzuxV/?mibextid=wwXIfr", summary: "ความเข้าใจที่ถูกต้องต่ออาการชัก การช่วยเหลือเบื้องต้น และการรักษา" },
  { number: 11, title: "ไมเกรน", subtitle: "ปวดหัวที่ซับซ้อนกว่าที่คิด", section: 2, source: "https://www.facebook.com/share/p/1GPhjXTpzb/?mibextid=wwXIfr", summary: "เข้าใจตัวกระตุ้น อาการร่วม และแนวทางดูแลอาการปวดศีรษะอย่างเหมาะสม" },
  { number: 12, title: "โรคซึมเศร้า", subtitle: "โรคของสมอง ไม่ใช่ความอ่อนแอ", section: 2, source: "https://www.facebook.com/share/p/1BdMU8emsS/?mibextid=wwXIfr", summary: "แยกความเศร้าชั่วคราวออกจากภาวะที่ควรได้รับการดูแลทางการแพทย์" },
  { number: 13, title: "โรควิตกกังวล", subtitle: "เมื่อสมองตื่นตัวเกินไป", section: 2, source: "https://www.facebook.com/share/p/17DuVksMAL/?mibextid=wwXIfr", summary: "เรียนรู้วงจรความกังวลและวิธีสังเกตเมื่อความกลัวเริ่มรบกวนชีวิตประจำวัน" },
  { number: 14, title: "เนื้องอกสมอง", subtitle: "สัญญาณที่ไม่ควรมองข้าม", section: 2, source: "https://www.facebook.com/share/p/15xK8FhZMN4/?mibextid=wwXIfr", summary: "สัญญาณผิดปกติที่ควรใส่ใจ พร้อมหลักคิดในการเข้ารับการตรวจอย่างไม่ตื่นตระหนก" },
  { number: 15, title: "อาหารสำหรับสมอง", subtitle: "กินอย่างไรให้สมองทำงานดี", section: 3, source: "https://www.facebook.com/share/p/1dCHBZNnsQ/?mibextid=wwXIfr", summary: "หลักการเลือกอาหารที่ช่วยดูแลสุขภาพสมองและหลอดเลือดในระยะยาว" },
  { number: 16, title: "การออกกำลังกายและสมอง", subtitle: "ขยับร่างกาย เพิ่มพลังให้สมอง", section: 3, source: "https://www.facebook.com/share/p/1E4wrVQf88/?mibextid=wwXIfr", summary: "ทำไมการเคลื่อนไหวสม่ำเสมอจึงดีต่อความจำ อารมณ์ และสุขภาพหลอดเลือด" },
  { number: 17, title: "การนอนหลับและสมอง", subtitle: "พักให้พอ เพื่อคิดให้ดี", section: 3, source: "https://www.facebook.com/share/p/1PSToN9FiK/?mibextid=wwXIfr", summary: "บทบาทของการนอนต่อการฟื้นฟูสมอง ความจำ และสมดุลของร่างกาย" },
  { number: 18, title: "ความเครียดและสมอง", subtitle: "รู้จักเบรกก่อนสมองล้า", section: 3, source: "https://www.facebook.com/share/18HrAcASk8/?mibextid=wwXIfr", summary: "เข้าใจผลของความเครียดเรื้อรังและวิธีสร้างพื้นที่พักให้สมองในชีวิตจริง" },
  { number: 19, title: "สังคมและสมอง", subtitle: "การเชื่อมต่อที่ช่วยชีวิต", section: 3, source: "https://www.facebook.com/share/1Mi4SmvEJf/?mibextid=wwXIfr", summary: "ความสัมพันธ์ที่ดีไม่ใช่แค่เรื่องใจ แต่เป็นส่วนหนึ่งของสุขภาพสมอง" },
  { number: 20, title: "สมองในยุค AI", subtitle: "ภัยและโอกาสที่ต้องรู้", section: 3, source: "https://www.facebook.com/share/1HBLdJij8i/?mibextid=wwXIfr", summary: "ใช้เทคโนโลยีอย่างรู้เท่าทัน เพื่อเสริมศักยภาพโดยไม่ปล่อยให้สมองหยุดเรียนรู้" },
];

const sections = [
  { id: 1, label: "ส่วนที่ 1", title: "รู้จักสมองและระบบประสาท", color: "mint" },
  { id: 2, label: "ส่วนที่ 2", title: "โรคสมองและระบบประสาทที่พบบ่อย", color: "coral" },
  { id: 3, label: "ส่วนที่ 3", title: "ดูแลสมองตลอดชีวิต", color: "sun" },
] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const filtered = useMemo(() => chapters.filter((chapter) => {
    const matchesQuery = `${chapter.title} ${chapter.subtitle}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (activeSection === null || chapter.section === activeSection);
  }), [query, activeSection]);

  return (
    <main>
      <nav className="nav shell"><a className="brand" href="#top"><span className="brand-mark">✦</span>ก่อนสมองพัง</a><div className="nav-links"><a href="#chapters">สารบัญ</a><a href="#about">เกี่ยวกับชุดบทความ</a><a className="nav-cta" href="#chapters">เริ่มอ่าน</a></div></nav>

      <section className="hero shell" id="top">
        <div className="hero-copy"><p className="eyebrow">คู่มือดูแลสมองฉบับอ่านง่าย</p><h1>สมองของคุณ<br /><em>อนาคตของคุณ</em></h1><p className="hero-lead">เข้าใจ ป้องกัน และดูแลโรคสมองกับระบบประสาทที่พบบ่อย — วันละบท เพื่อสุขภาพที่ดีตลอดชีวิต</p><div className="hero-actions"><a className="button primary" href="#chapters">เปิดสารบัญ <span>↘</span></a><a className="text-link" href="#about">รู้จักชุดบทความนี้</a></div><div className="hero-note"><span className="avatar">นพ.</span><span>เรียบเรียงโดย <strong>นพ.วีระพันธ์ สุวรรณนามัย</strong><br />แพทย์ผู้เชี่ยวชาญเวชศาสตร์ป้องกันและประสาทศัลยแพทย์</span></div></div>
        <div className="brain-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="brain-shape">🧠</div><span className="orbit-label label-one">20 บท</span><span className="orbit-label label-two">อ่านฟรี</span><span className="orbit-label label-three">สุขภาพสมอง</span></div>
      </section>

      <section className="intro shell" id="about"><div><p className="eyebrow">เริ่มต้นจากความเข้าใจ</p><h2>สมองไม่ใช่เรื่องไกลตัว</h2></div><p>ทุกความคิด ทุกความทรงจำ และทุกการตัดสินใจ ล้วนเกิดขึ้นจากอวัยวะเล็ก ๆ ที่ทำงานตลอดเวลา ชุดบทความนี้ชวนคุณมาทำความรู้จักสมองอย่างเป็นระบบ ตั้งแต่พื้นฐาน โรคที่พบบ่อย ไปจนถึงการดูแลในทุกวัน</p></section>

      <section className="chapters shell" id="chapters"><div className="section-heading"><div><p className="eyebrow">สารบัญทั้งหมด</p><h2>เลือกบทที่อยากเริ่ม</h2></div><div className="search-wrap"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อบท..." aria-label="ค้นหาชื่อบท" /></div></div><div className="filter-row"><button className={activeSection === null ? "filter active" : "filter"} onClick={() => setActiveSection(null)}>ทั้งหมด <span>20</span></button>{sections.map((section) => <button key={section.id} className={activeSection === section.id ? "filter active" : "filter"} onClick={() => setActiveSection(section.id)}>{section.label} <span>{section.id === 1 ? 4 : section.id === 2 ? 10 : 6}</span></button>)}</div>
        <div className="chapter-grid">{filtered.map((chapter, index) => <article className={`chapter-card ${chapter.status === "pending" ? "pending" : ""}`} key={chapter.title}><div className="card-top"><span className="chapter-no">{chapter.number ? String(chapter.number).padStart(2, "0") : "บทนำ"}</span><span className={`status ${chapter.status === "pending" ? "waiting" : "available"}`}>{chapter.status === "pending" ? "กำลังเขียน" : "พร้อมอ่าน"}</span></div><h3>{chapter.title}</h3><p className="subtitle">{chapter.subtitle}</p><p className="summary">{chapter.summary}</p><div className="card-footer">{chapter.source ? <a href={chapter.source} target="_blank" rel="noreferrer">อ่านต้นฉบับบน Facebook <span>↗</span></a> : <span className="muted">รอลิงก์ต้นฉบับ</span>}<span className="read-time">{index % 3 + 4} นาที</span></div></article>)}</div>{filtered.length === 0 && <div className="empty">ไม่พบบทที่ตรงกับคำค้น ลองใช้คำอื่นดูนะ</div>}</section>

      <section className="closing shell"><div className="closing-inner"><p className="eyebrow">สุขภาพสมอง เริ่มได้วันนี้</p><h2>อ่านวันละบท<br />เปลี่ยนอนาคตของคุณ</h2><a className="button light" href="#chapters">กลับไปเลือกบท <span>↗</span></a></div><div className="closing-stats"><div><strong>3</strong><span>ส่วนสำคัญ</span></div><div><strong>20</strong><span>บทความ</span></div><div><strong>∞</strong><span>โอกาสดูแลตัวเอง</span></div></div></section>
      <footer className="footer shell"><div className="brand"><span className="brand-mark">✦</span>ก่อนสมองพัง</div><p>เนื้อหานี้จัดทำเพื่อการศึกษา ไม่ใช้แทนคำวินิจฉัยหรือคำแนะนำจากแพทย์</p><p>© 2026 ก่อนสมองพัง</p></footer>
    </main>
  );
}
