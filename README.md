# The Art of Forever — Adesewa & Kamsiyochukwu
## Setup
1. `npm install`; copy `.env.example` to `.env.local`.
2. Create a Supabase project, run `database/schema.sql`, add guests (token is auto-generated; link = `/?t=<token>`).
3. Add licensed music at `public/music.mp3` (no autoplay; user-triggered).
4. `npm run dev`.
## Status (honest)
Working: scroll-driven 3D stage (envelope flap, ribbon, seal, rings), all 16 scenes' content from `config/wedding.ts`, countdown (Lagos UTC+1), maps directions, WhatsApp share, token-based RSVP with server-enforced allocation + duplicate protection, CSV export (admin allowlist), RLS (no public access to guest tables), reduced-motion.
Not yet built: realistic hand, silk cloth sim, procedural roses/arch, calligraphy SVG paths, Aso Oke / chandelier scenes, admin UI (only CSV export API), tests, mobile-device QA.
