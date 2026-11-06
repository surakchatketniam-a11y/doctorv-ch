# Design system: หมอวี Health Library (home page)

Base: DESIGN.md Hub "mixed" tokens (Cal.com colors, Airbnb type and flat feel, Apple shapes). Implemented in `src/design-tokens.css` (scoped to `.ds-home`) and `src/home.css`. Reader view and modals are not migrated yet.

## Colors
- Canvas `#ffffff`, ink `#111111`, secondary text `#5b6270` (darkened from `#6b7280` for contrast on `#f5f5f5`), surface `#f5f5f5`, hairline `#e5e7eb`.
- Primary `#111111` is used for filled buttons only, never for body text.
- Accents are limited to identity marks, never text: green `#34d399` = เล่ม 1 ก่อนจะป่วย, blue `#3b82f6` = เล่ม 2 ก่อนสมองพัง. Alert text uses `status-error` `#c93939`.
- Dark and sepia variants exist for every token (see `design-tokens.css`).

## Typography
- Font stack: Inter, Anuphan, Noto Sans Thai. `<html lang="th">`.
- Display (h1) `clamp(2rem, 5vw, 3rem)` / 700 / 1.3. h2 28px, h3 20px, body 16px / 1.7, caption 14px.
- No letter-spacing on Thai, no uppercase or italics on Thai.

## Shape and depth
- Buttons, inputs, chips: `9999px`. Cards: `18px`, padding 24px. Section spacing 64px.
- Flat: no drop shadows on cards, buttons or text. Separate with hairlines and surface color.

## Layout
- One filled primary action per section. Everything else is outlined or a text/chip link.
- Do not repeat the same entry point in several places on one screen.

## Icons (rule)
- Never use emoji as icons or decoration in UI text (no 🎯 📖 ⚡ 💡 ⚠️ ✅ and similar). Do not use unicode arrows or check marks such as `›` or `✓` as icons.
- Use a single icon set for the whole page: `lucide-react`, outline style, `strokeWidth` 1.75, size 16 to 20px, color inherited from text (`currentColor`).
- Do not mix in a second icon library or filled icons. Brand logos (YouTube, Facebook, TikTok in `SocialIcons.jsx`) are the only exception.
- Icons that carry meaning must sit next to a text label or have an `aria-label`.
- Text that users copy or share (for example text shared to LINE) may contain emoji, since it leaves the UI.

## Don'ts
- Don't add colors outside this palette. Don't change the pill radius per page. Don't use primary as body text color.
