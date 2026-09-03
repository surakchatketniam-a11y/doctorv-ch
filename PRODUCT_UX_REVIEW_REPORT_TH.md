# รายงาน Product & UX Review — ก่อนจะป่วย / ก่อนสมองพัง

**ขอบเขตการตรวจสอบ:** แอป React/Vite ใน `before-brain-sick`  
**มุมมอง:** Lead Product Manager และ Senior UX Specialist  
**วันที่:** 15 สิงหาคม 2026

## บทสรุปสำหรับผู้ตัดสินใจ

ผลิตภัณฑ์มีฐานที่ดีในฐานะคลังความรู้สุขภาพภาษาไทย: เนื้อหาจัดเป็น 2 หนังสือ มีระบบค้นหา บันทึกบทความ โหมดอ่าน ปรับขนาดตัวอักษร ธีม และเครื่องมือประเมินสุขภาพเบื้องต้น จุดแข็งนี้เหมาะกับผู้ใช้ที่ต้องการความรู้ที่น่าเชื่อถือและอ่านง่าย

อย่างไรก็ดี ประสบการณ์ปัจจุบันยังจบที่การ “อ่าน” หรือ “เห็นคะแนน” มากกว่าช่วยให้ผู้ใช้เลือกการกระทำที่ถูกต้องต่อไป โดยมีความเสี่ยงสูงสุดคือผลประเมินอาจแสดงผลเชิงบวกตั้งแต่ผู้ใช้ยังตอบคำถามไม่ครบ จึงควรแก้ความปลอดภัยและความชัดเจนของ flow ก่อนเพิ่มฟีเจอร์ใหม่

### ข้อเสนอรอบแรก

1. ปิดช่องโหว่ของแบบประเมิน: ต้องตอบครบก่อนแสดงผล พร้อมข้อความว่าไม่ใช่การวินิจฉัย
2. เพิ่มเส้นทางตัดสินใจหลังอ่านหรือประเมิน: “ทำอะไรต่อ”, “พบแพทย์เมื่อไร”, “บันทึกแผน 7 วัน”
3. ปรับ discovery ให้เริ่มจากปัญหาของผู้ใช้ ไม่ใช่ให้เลือกหนังสือหรือจำชื่อบทด้วยตนเอง
4. วางระบบ evidence governance และ analytics เพื่อยืนยันคุณภาพเนื้อหาและ Product Market Fit

---

## 1) Product Framing และกลุ่มผู้ใช้

### คุณค่าที่ผลิตภัณฑ์มอบได้ในปัจจุบัน

- เข้าถึงความรู้สุขภาพและสมองเชิงป้องกันได้ฟรีในภาษาไทย
- ลดความซับซ้อนของเนื้อหาด้วยบทความสรุป ภาพประกอบ และ action items
- ช่วยอ่านต่อเนื่องผ่าน bookmark, history, สารบัญด่วน และบทก่อนหน้า/ถัดไป
- มี FAST emergency CTA สำหรับสัญญาณ Stroke

### กลุ่มผู้ใช้หลักที่ควรออกแบบให้ชัด

| กลุ่ม | เป้าหมาย/โจทย์ | สิ่งที่ควรได้รับใน 1–2 นาทีแรก |
|---|---|---|
| ผู้ใหญ่ที่ต้องการป้องกันโรค | อยากเริ่มดูแลตัวเองแต่ไม่รู้เริ่มจากอะไร | แผนเริ่มต้น 7 วันและบทที่เกี่ยวข้อง |
| ผู้มีอาการหรือความกังวล | เช่น นอนผิดปกติ ลืมบ่อย กังวล Stroke | เส้นทางคัดกรองที่ปลอดภัย พร้อมระดับความเร่งด่วน |
| ผู้ดูแลผู้สูงอายุ | ต้องการสังเกตอาการและคุยกับแพทย์ | checklist อาการ, สรุปนำไปพบแพทย์, บทสำหรับ caregiver |
| ผู้อ่านเนื้อหาสุขภาพทั่วไป | ต้องการบทความที่เชื่อถือได้ | ค้นหา/สำรวจตามหัวข้อ พร้อมแหล่งอ้างอิงและวันที่ตรวจทาน |

### Product-Market Fit Hypothesis

ผู้ใช้จะกลับมาใช้งาน หากระบบเปลี่ยน “ข้อมูลสุขภาพที่ยาว” เป็น “การตัดสินใจเล็ก ๆ ที่ทำได้ทันทีและปลอดภัย” เช่น เข้าใจว่าต้องโทรฉุกเฉิน พบแพทย์ หรือเริ่มพฤติกรรมใดในสัปดาห์นี้

---

## 2) User Flow & Usability

### Flow ที่มีอยู่

```text
หน้าแรก
  ├─ เลือกหนังสือ → เลือกบท → Reader → bookmark/share/บทถัดไป
  ├─ ค้นหา → filter ตามเล่ม → เปิดบทความ
  └─ เครื่องมือสุขภาพ → เลือกแบบประเมิน → ดูผล → (บางกรณีโทร 1669)
```

### จุดที่ทำได้ดี

- Reader มีสารบัญด่วน, progress bar, ปรับขนาดตัวอักษร และธีม จึงรองรับการอ่านเนื้อหายาวได้ดี
- มี deep link ของบทความผ่าน hash และมี bookmark/history ภายในอุปกรณ์
- Search มีการ filter ระหว่างสองหนังสือ
- ปุ่มโทร 1669 ถูกจัดเป็น CTA ที่เห็นชัดเมื่อผู้ใช้เลือกสัญญาณ FAST

### จุดฝืดและคำแนะนำที่ทำได้จริง

| ลำดับ | ปัญหาในประสบการณ์ | ผลกระทบต่อผู้ใช้ | แนวทางแก้ที่แนะนำ |
|---|---|---|---|
| P0 | ผลแบบประเมินถูกแสดงขณะยังไม่มีคำตอบ | ผู้ใช้อาจเข้าใจผิดว่า “ปกติ” และชะลอการขอความช่วยเหลือ | ใช้สถานะ `not_started`, `in_progress`, `complete`; คำนวณและแสดงผลเฉพาะเมื่อครบทุกข้อ |
| P1 | หน้าแรกให้เริ่มจากชื่อหนังสือ | ผู้ที่เข้ามาพร้อมอาการหรือเป้าหมายต้องเดาเส้นทางเอง | เพิ่ม 3 CTA: “ฉันกังวลเรื่องอาการ”, “เริ่มป้องกันวันนี้”, “ดูแลคนในครอบครัว” |
| P1 | เมื่ออ่านจบบท ไม่มี next best action เฉพาะบุคคล | ความรู้ไม่เปลี่ยนเป็นพฤติกรรม | เปลี่ยน Action Items เป็น checklist เลือกได้ 1 ข้อ และปุ่ม “ใส่ในแผน 7 วัน” |
| P1 | Search พึ่ง keyword และ filter ตามหนังสือ | ค้นหายากเมื่อผู้ใช้ไม่รู้ศัพท์หรือชื่อบท | เพิ่ม synonym, tags, suggested queries, และผลลัพธ์ใกล้เคียงเมื่อไม่พบข้อมูล |
| P2 | bookmark เป็นรายการเดียว | ผู้ใช้นำบทความไปใช้ในบริบทต่างกันไม่ได้ | เพิ่ม collection เช่น “อ่านภายหลัง”, “ทำตาม”, “ส่งให้ครอบครัว” |
| P2 | การแชร์เน้นลิงก์อย่างเดียว | ผู้รับยังต้องอ่านยาวเพื่อเข้าใจสาระ | สร้าง share card: ประเด็นสำคัญ, action item, วันที่ตรวจทาน และลิงก์บทความ |

### ประเด็น Reader Flow

การนับ “อ่านแล้ว” เมื่อเลื่อนถึงเกิน 80% ของหน้าปัจจุบันอยู่ที่ [ReaderView.jsx](src/components/ReaderView.jsx#L94) ซึ่งวัดเพียงการเลื่อน ไม่ได้สะท้อนความเข้าใจหรือการทำตามคำแนะนำ

**ข้อเสนอ:** เปลี่ยนคำว่า “อ่านแล้ว” เป็น “อ่านถึงท้ายบท” หรือให้ผู้ใช้ยืนยัน “จบบทนี้” แล้วเลือก action item หนึ่งข้อ จากนั้นวัด conversion จาก action ที่เลือกแทน scroll depth เพียงอย่างเดียว

---

## 3) Feature Gap Analysis

### ฟีเจอร์ที่ขาดเพื่อให้ journey สมบูรณ์

| ฟีเจอร์ | ปัญหาที่แก้ | รูปแบบ MVP |
|---|---|---|
| Personalized 7-day plan | บทความไม่ต่อยอดเป็นพฤติกรรม | ให้เลือก 1–3 action items, daily check-in, สรุปสัปดาห์ |
| Safe triage journey | แบบประเมินคะแนนเดียวไม่เพียงพอ | หน้าผลลัพธ์แบ่ง “ฉุกเฉิน / ควรพบแพทย์ / ติดตามตนเอง” พร้อม disclaimer |
| Caregiver mode | ผู้ดูแลมี workflow ต่างจากผู้ป่วย | บันทึกอาการตามเวลา, checklist เตรียมพบแพทย์, แชร์สรุป |
| Evidence governance | ความเชื่อมั่นของผู้ใช้และองค์กร | วันที่ตรวจทาน, ผู้ทบทวน, ระดับหลักฐาน, ลิงก์อ้างอิงที่กดได้, ช่องแจ้งข้อมูลล้าสมัย |
| Cross-device continuity | ข้อมูลหายเมื่อเปลี่ยน/ล้างอุปกรณ์ | optional account หรือ export/import ข้อมูลที่เข้ารหัส/ขอความยินยอม |
| Content recommendation | ลดการค้นหาแบบลองผิดลองถูก | แนะนำบทต่อไปตามบทที่อ่าน, bookmark และเป้าหมายที่เลือก |
| Product analytics | ยังพิสูจน์ PMF ไม่ได้ | เก็บ event แบบ privacy-first: search outcome, assessment completion, action conversion, return rate |

### การจัดลำดับ MVP

**Release 1 — Safety and clarity**

- Completion gate ของทุก assessment
- Disclaimer และ CTA ขอความช่วยเหลือตามระดับความเสี่ยง
- Empty/error state สำหรับ search และ deep link
- Modal accessibility: focus trap, Escape, restore focus

**Release 2 — Behavior change**

- Action checklist และแผน 7 วัน
- ผู้ใช้เลือกเป้าหมายได้จากหน้าแรก
- reminder แบบ opt-in และ weekly reflection

**Release 3 — Retention and trust**

- Caregiver mode, shareable report และ cross-device account
- Evidence governance dashboard สำหรับทีมเนื้อหา
- Recommendation และ analytics dashboard

---

## 4) Edge Cases และความเสี่ยงในการใช้งานจริง

### P0 — False reassurance จากแบบประเมิน

`isFastPositive` เริ่มต้นเป็น `false` และผล FAST จะแสดงว่าไม่พบสัญญาณ เมื่อผู้ใช้ยังไม่เลือก checkbox เลย ([HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L36), [HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L346))

เช่นเดียวกัน Dementia และ Sleep score นับคำตอบเป็นศูนย์โดยค่าเริ่มต้นและแสดงผลในทันที ([HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L70), [HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L438), [HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L502))

**สิ่งที่ต้องทำ:**

- เก็บสถานะการตอบรายข้อเป็น `undefined | true | false` แทนค่าเริ่มต้น `false`
- แสดง `ตอบแล้ว 0/6` และปิดผลลัพธ์จนกว่าจะครบ
- หากผู้ใช้มีข้อกังวลหรืออาการหนัก ให้มีข้อความ “อย่ารอผลแบบประเมิน” อยู่เสมอ
- ระบุชัดว่าเครื่องมือนี้ไม่ใช่การวินิจฉัย และคัดกรองได้เฉพาะขอบเขตที่ระบุ

### P1 — ออกจากแบบประเมินกลางคัน

เมื่อปิด modal ข้อมูลอาจค้างใน state ชั่วคราวหรือหายไปโดยไม่มีคำอธิบาย ผู้ใช้ไม่ทราบว่าจะเริ่มต่อหรือเริ่มใหม่อย่างไร

**สิ่งที่ต้องทำ:** แจ้งยืนยันก่อนปิดเฉพาะกรณีตอบไปแล้ว, เพิ่ม “เริ่มใหม่”, และหากเก็บ draft ให้ขอความยินยอมและบอกระยะเวลาเก็บข้อมูล

### P1 — URL หรือการแชร์ใช้ไม่ได้

- deep link ที่ไม่พบ `chapterId` ไม่มี error state ช่วยนำกลับ ([App.jsx](src/App.jsx#L74))
- Copy link ตรวจเฉพาะ `navigator.clipboard` แต่ไม่รองรับ fallback หรือ feedback เมื่อผิดพลาด ([ReaderView.jsx](src/components/ReaderView.jsx#L155))

**สิ่งที่ต้องทำ:** ทำหน้า “ไม่พบบทความ” พร้อม search/สารบัญ; ใช้ Web Share API เมื่อมี, fallback copy input และ toast สำเร็จ/ล้มเหลว

### P1 — ข้อมูลผู้ใช้สูญหายหรือไม่ต่อเนื่อง

theme, bookmarks และ read history ถูกเก็บผ่าน `localStorage` ([App.jsx](src/App.jsx#L18), [App.jsx](src/App.jsx#L34), [App.jsx](src/App.jsx#L43)) จึงสูญหายเมื่อล้าง browser เปลี่ยนเครื่อง หรือใช้อุปกรณ์ร่วมกัน

**สิ่งที่ต้องทำ:** อธิบายให้ผู้ใช้ทราบว่าเก็บข้อมูลในเครื่อง; เพิ่ม export/import ก่อน แล้วจึงพิจารณา account แบบ optional

### P2 — Accessibility และผู้ใช้ตัวอักษรใหญ่

Modal มี semantic dialog ในบางส่วน แต่ควรตรวจให้ครบทุก modal ว่ามี focus trap, โฟกัสเริ่มต้น, คืนโฟกัส และ label ของปุ่ม/tab ที่ประกาศสถานะ selected ได้ถูกต้อง

**สิ่งที่ต้องทดสอบก่อน release:** keyboard-only, screen reader, font scaling 200%, มือถือขนาด 375px, dark/sepia mode, reduced motion และเครือข่ายช้า

---

## 5) Value Add Solutions

### 1. แผนสุขภาพ 7 วันของฉัน

หลังอ่านหรือประเมิน ให้ผู้ใช้เลือก action ที่เล็กและวัดผลได้ เช่น เดิน 10 นาทีหลังอาหาร, เข้านอนเวลาเดิม หรือเพิ่มผักหนึ่งมื้อ ระบบแสดงความคืบหน้าโดยไม่กดดันและชวนทบทวนทุก 7 วัน

**คุณค่า:** เปลี่ยนจาก content consumption เป็น behavior change และสร้างเหตุผลให้กลับมาใช้งาน

### 2. สรุปสำหรับครอบครัว/แพทย์

สร้างข้อความหรือ PDF ที่ผู้ใช้เลือกเอง เช่น อาการที่สังเกต วันที่เริ่มเป็น รายการคำถาม และบทความที่อ่าน โดยต้องไม่ใส่ผลสรุปเชิงวินิจฉัย

**คุณค่า:** ลดภาระผู้ดูแลและเพิ่มคุณภาพการสื่อสารก่อนพบแพทย์

### 3. Guided Journey ตามสถานการณ์

แทนหน้ารวมบทความ ให้มี journey ที่ชัด เช่น:

```text
กังวลเรื่องความจำ
  → รู้จักสัญญาณที่ควรสังเกต
  → คัดกรองแบบไม่วินิจฉัย
  → เลือก “พบแพทย์ / ติดตามอาการ / อ่านเพื่อป้องกัน”
  → checklist ที่เหมาะกับเส้นทางนั้น
```

**คุณค่า:** ใช้งานง่ายขึ้นสำหรับผู้ที่ไม่รู้ศัพท์สุขภาพ และลด cognitive load

### 4. Trust Layer ของเนื้อหาสุขภาพ

ทุกบทควรแสดงข้อมูลมาตรฐานเดียวกัน: วันที่ตรวจทานล่าสุด, ผู้ทบทวนทางการแพทย์, scope, แหล่งข้อมูลที่กดได้ และวิธีแจ้งเนื้อหาที่อาจล้าสมัย

**คุณค่า:** ยกระดับความน่าเชื่อถือ ขยายโอกาสการร่วมงานกับโรงพยาบาล/องค์กร และลดความเสี่ยงด้านข้อมูลสุขภาพ

---

## 6) Metrics ที่ควรใช้พิสูจน์ PMF

| เป้าหมาย | Metric | ความหมาย |
|---|---|---|
| ค้นหาคำตอบได้เร็ว | Time-to-first-relevant-article | เวลาจนผู้ใช้เปิดบทที่เกี่ยวข้อง |
| ค้นหาสำเร็จ | Search success rate / zero-result rate | คุณภาพ discovery และ taxonomy |
| ประเมินได้อย่างปลอดภัย | Assessment completion rate / abandon point | จุดที่แบบประเมินยาวหรือสับสน |
| เปลี่ยนเป็นการกระทำ | Action-item selection rate | สัดส่วนผู้ใช้ที่เลือกสิ่งที่จะทำต่อ |
| กลับมาอย่างมีเหตุผล | 7-day plan check-in / D7 retention | พลังของ habit loop |
| ความปลอดภัย | Emergency CTA interaction และ follow-up feedback | ตรวจว่าผู้ใช้พบทางออกในสถานการณ์เสี่ยง |
| ความเชื่อมั่น | Helpful vote / source-view rate / outdated-content reports | คุณภาพและความน่าเชื่อถือของ content |

**หลัก privacy:** เก็บเท่าที่จำเป็น, แยกข้อมูลระบุตัวตนออกจาก event analytics, และขอ consent ก่อนเก็บข้อมูลสุขภาพหรือส่ง reminder

---

## 7) Technical Follow-up ที่มีผลต่อประสบการณ์

Production build ผ่าน แต่ bundle หลักมีขนาดประมาณ **3.47 MB** (gzip ประมาณ **547 KB**) และระบบเตือนให้ code-split

**แนวทาง:**

- lazy-load `HealthToolsModal`, `ReaderView` และข้อมูล/ภาพของหนังสือที่ยังไม่ถูกเปิด
- แยก icon bundle และ dynamic import ของ library ที่ใช้เฉพาะ reader
- วัด LCP และ interaction latency บนเครือข่ายมือถือจริงก่อน/หลังแก้

---

## 8) ผลการเทียบกับรายงานวิเคราะห์เบื้องต้น

ได้ตรวจเทียบกับ [UI_UX_ANALYSIS_REPORT.md](UI_UX_ANALYSIS_REPORT.md) ซึ่งให้ข้อมูลเชิง UI/accessibility ที่มีประโยชน์มาก โดยเฉพาะการทดสอบมือถือและข้อเสนอด้าน performance รายงานนั้นควรใช้เป็นฐานของงานแก้เชิง UI ส่วนรายงานฉบับนี้เพิ่มมุมมอง Product, safety และ journey หลังผู้ใช้อ่าน/ประเมิน

### สิ่งที่พบใน source ปัจจุบัน — ต้องยืนยันด้วยการทดสอบจริง

รายงานเบื้องต้นเป็น **baseline การวิเคราะห์** ไม่ใช่หลักฐานว่ามีการแก้ไขใดแล้ว ตารางนี้เพียงบันทึกว่า source ปัจจุบันมีโค้ดที่ดูเหมือนเป็นแนวทางบรรเทาปัญหาบางข้อเท่านั้น และ **ห้ามตีความว่าสถานะเป็น Done** จนกว่าจะทดสอบบน browser/มือถือจริงและทำ acceptance test ครบ:

| ประเด็นในรายงานเบื้องต้น | ข้อสังเกตจาก source ปัจจุบัน | สถานะงานที่ถูกต้อง | หลักฐาน |
|---|---|---|
| Navbar ล้นบนมือถือ | มี media query ซ่อน subtitle, ลด logo และซ่อนปุ่ม author ในจอแคบ | **Open — ต้องทดสอบ 375px/320px จริง** | [index.css](src/index.css#L519) |
| มี header ซ้อน 2 ชั้นใน Reader | Navbar หลักถูก render ภายใต้เงื่อนไข `activeView === 'home'` | **Open — ต้องยืนยัน reader flow จริง** | [App.jsx](src/App.jsx#L141) |
| touch target ไอคอน 40×40px | `.btn-icon` นิยามขั้นต่ำ 44×44px | **Open — ต้องตรวจทุก control และทุก breakpoint** | [index.css](src/index.css#L407) |
| การ์ด chapter ใช้ `div onClick` | Chapter card ปัจจุบันมี button ในจุดหลัก | **Open — ต้อง audit interactive elements ทั้งหมด** | [ChapterList.jsx](src/components/ChapterList.jsx#L375) |
| Search ไม่มี accessible name | input มี `aria-label` | **Open — ต้องทดสอบด้วย screen reader** | [SearchModal.jsx](src/components/SearchModal.jsx#L91) |
| Modal ไม่มี Escape | พบ Escape handler ใน modal หลัก | **Open — Escape อย่างเดียวไม่ครอบคลุม focus trap/return focus** | [HealthToolsModal.jsx](src/components/HealthToolsModal.jsx#L10), [SearchModal.jsx](src/components/SearchModal.jsx#L13) |

### งานคงค้างจากรายงานเบื้องต้น

| ประเด็น | สถานะ/เหตุผล | การดำเนินการ |
|---|---|---|
| Focus trap และ return focus ใน modal | Escape handler มีแล้ว แต่ยังไม่พบการกัก focus หรือคืน focus ไปยังปุ่มที่เปิด modal | เพิ่ม reusable modal hook/component และทดสอบ keyboard-only |
| สถานะ theme/font-size | ยังเป็น cycle control; แม้มี aria label แต่ผู้ใช้มือถือยังเดาสถานะ/ลำดับได้ยาก | แสดง label ปัจจุบันหรือใช้ menu/segmented control |
| Heading จาก heuristic ความยาวข้อความ | ยังคงมี logic เดาจาก paragraph text | ย้าย semantic heading ไป data pipeline และ render ตาม type |
| hardcoded color | ยังคงมีบางจุด โดยเฉพาะ emergency state และ gradient | คงสีฉุกเฉินได้หากเป็น token; ย้ายเป็น semantic tokens เพื่อรองรับ theme/contrast |
| font payload และ chapter payload | ยังควรตรวจ network จริง; build ปัจจุบันยืนยันว่า main bundle ใหญ่ | ตัด font weights ที่ไม่ได้ใช้ และ lazy-load content/reader tools |

### ประเด็นใหม่ที่รายงานเบื้องต้นยังไม่ได้ครอบคลุม

1. **Assessment completion gate:** ผล “ไม่พบสัญญาณ” หรือคะแนน 0 ก่อนตอบครบเป็นความเสี่ยงด้านความปลอดภัยระดับ P0
2. **Next best action:** ผู้ใช้ได้รับเนื้อหา แต่ยังไม่มีแผนหรือ action loop ที่ผลักดันการปรับพฤติกรรม
3. **Caregiver and triage journeys:** กลุ่มผู้ดูแลและผู้กังวลเรื่องอาการต้องการ flow ที่ต่างจากผู้อ่านทั่วไป
4. **Evidence governance และ privacy-first analytics:** จำเป็นต่อความน่าเชื่อถือและการวัด Product Market Fit ของผลิตภัณฑ์สุขภาพ

### ข้อสรุปหลังรวมสองรายงาน

งานที่ควรเริ่มก่อนคือ **P0 assessment safety** แล้วจึงจัดการ accessibility ที่เหลือ (focus management), discovery ตาม intent, และ behavior-change loop ตามลำดับ งานจากรายงานเดิมทั้งหมดให้ถือเป็น **Open** จนกว่าจะมีการแก้โค้ดและ re-test บนมือถือจริงตาม acceptance criteria

---

## Definition of Done สำหรับรอบแรก

- [ ] ไม่มีผล assessment ก่อนผู้ใช้ตอบครบ
- [ ] ทุกผลลัพธ์มี disclaimer และ CTA ตามระดับความเร่งด่วน
- [ ] ผู้ใช้ปิด/กลับมาเริ่ม assessment ได้โดยเข้าใจสถานะของตน
- [ ] Search และ deep link มี empty/error state ที่นำทางต่อได้
- [ ] ทดสอบ accessibility และ mobile ตามรายการในรายงาน
- [ ] มี event metrics ที่ไม่ละเมิด privacy สำหรับ search, assessment และ action item
- [ ] สร้าง 7-day action plan ขั้นต่ำหนึ่ง flow และวัดการกลับมาใช้งานได้
