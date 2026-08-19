# Changelog

Semua perubahan signifikan pada portfolio ini akan dicatat di file ini.

Catatan: seluruh commit di bawah **belum di-push** ke remote — tunggu review manual terlebih dahulu.

## [Unreleased] — 2026-08-19

### Dependencies & Komponen Animasi

- `685275d` — **chore(deps): add rapier, meshline and @gsap/react with ReactBits animation components**
  - Menambahkan `@react-three/rapier` (physics 3D), `meshline` (strip 3D), dan `@gsap/react` (hook useGSAP untuk SplitText).
  - Menyalin source komponen ReactBits (`SplitText`, `Magnet`, `CountUp`) dari repo resmi `DavidHDev/react-bits` (varian `ts-tailwind`) ke `components/reactbits/`.
  - ReactBits bukan npm package; diinstal via salinan source. `CountUp` diubah import-nya dari `motion/react` ke `framer-motion` (menghindari package redundan).
  - Menghapus file yang tidak terpakai: `components/ui/TiltCard.tsx`.

### Lanyard 3D (Physics Chain)

- `337239d` — **feat(hero): rebuild lanyard as interactive 3D physics chain with rapier and meshline**
  - `components/ui/Lanyard.tsx` di-rewrite total dari 2D canvas verlet menjadi scene 3D physics (`@react-three/rapier` + `meshline`):
    - Rantai 8 segmen (desktop) / 6 segmen (mobile) berbentuk capsule, terhubung dengan spherical joint dari anchor fixed di atas.
    - Kartu ID (box 0.75 × 1.125 × 0.035) dengan tekstur canvas 1100×1650 (design pit-pass MotoGP dipertahankan) terhubung via revolute joint (batas ±1 rad).
    - Strip (strap) digambar dengan `MeshLineGeometry` 3 lapis (hitam, merah, putih) yang mengikuti posisi fisik tiap link.
    - Interaksi: **drag** kartu (impulse menuju pointer, raycast ke bidang z=0), **push** rantai saat pointer di dekat link, dan sway angin ringan.
    - Responsif: `dpr [1,1.5]` + 6 link di <768px; `prefers-reduced-motion` → render statis tanpa physics.
  - `components/sections/Hero.tsx`: lanyard di-load via `dynamic(..., { ssr: false })`, fallback TiltCard (avatar) dihapus — **lanyard kini tampil di semua perangkat dan bisa di-drag di mobile**.
- `c1c0293` — **fix(lanyard): guard rapier body access against destroyed physics world during remount**
  - Memperbaiki error runtime `null pointer passed to rust` (akses body rapier yang sudah di-destroy saat StrictMode dev double-mount / world rebuild):
    - Helper `getBodyTranslation()` dengan try/catch.
    - Semua akses body (`translation`, `rotation`, `linvel`, `mass`, `applyImpulse`) di `Strap` & `DragController` di-guard; frame dilewati bila body stale.
    - Array `gravity` menjadi module-level const (identitas stabil, mencegah rebuild world tak perlu).

### Hero — Animasi ReactBits

- `ec767af` — **feat(hero): animate tagline, stats and CTAs with ReactBits SplitText, CountUp and Magnet**
  - Tagline: animasi per-karakter `SplitText` (GSAP SplitText + ScrollTrigger, menunggu font ready).
  - Stats: nilai dianimasikan `CountUp` (angka diekstrak dari `"6+"`, `"2yr"`, dst; suffix ditampilkan statis).
  - CTA (`VIEW PROJECTS` / `GET IN TOUCH`) dan social icons dibungkus `Magnet` (efek magnet mengikuti kursor).
  - Class baru `.hero-tagline` di `app/globals.css`.

### Circuit Map — Mobile & Status

- `2f0c383` — **fix(projects): make circuit map mobile-friendly with swipe, compact chips and tap-to-pin tooltip**
  - Wrapper `overflow-x: auto` + inner `min-width: 540px` di layar <768px (bisa di-swipe).
  - Chip corner diperkecil 38px → 30px di mobile (font ikut mengecil).
  - **Tap-to-pin tooltip**: di perangkat touch, tap chip men-pin/men-unpin tooltip (deteksi `pointerType === "touch"`); di desktop tetap hover → tooltip, click → scroll ke proyek.
- `55e8ba0` — **fix: suppress hydration warning from browser extensions, hide desktop map scrollbar, show status label in project tooltip**
  - Scrollbar horizontal map hanya aktif di mobile; di desktop `overflow-x: visible`; scrollbar visual disembunyikan di mobile (gesture swipe tetap jalan).
  - Tooltip proyek kini menampilkan **label status teks** (FINISHED / ONGOING / DELAYED) + dot warna — proyek yang ongoing langsung terlihat saat hover/tap.

### Navbar — Overflow & Touch

- `bf4c698` — **fix(navbar): prevent overflow between 768-1024px with larger breakpoint and touch targets**
  - Breakpoint nav desktop diubah `md` → `lg` (burger muncul di <1024px, mengatasi nav kepotong di 768–1024px).
  - Gap nav link 1.5rem → 1.25rem; tombol burger diperbesar (≥44px touch target) + `aria-label`; item menu mobile diberi padding vertikal.

### SEO & Indexing

- `cdd2aaf` — **seo: generate sitemap from content, add canonical URLs, OG image and JSON-LD person schema**
  - `app/sitemap.ts`: di-generate dari `getProjects()` (6 proyek — habito & kosin yang sebelumnya hilang kini masuk), priority berdasarkan `featured`.
  - `app/layout.tsx`: `metadataBase`, `alternates.canonical`, OG/Twitter image (`public/images/og.png` 1200×630 dibuat dengan tema MotoGP), JSON-LD `Person` + `WebSite`.
  - `app/projects/[slug]/page.tsx`: canonical + OG image per proyek (pakai gambar proyek).
  - `public/images/og.png`: gambar OG baru (1200×630, dark theme + aksen merah/checker).

### Perbaikan Hydration

- `55e8ba0` — lihat bagian Circuit Map di atas; bagian layout: `suppressHydrationWarning` ditambahkan pada `<body>` untuk menekan mismatch atribut dari ekstensi browser (mis. Grammarly), yang membuat React dev menganggap halaman rusak (overlay error, render tidak sempurna).

## Catatan Pengujian Manual

- [ ] `npm run dev` → hero: lanyard 3D tampil, kartu bisa di-drag (desktop & touch), strap terlihat, tanpa error console.
- [ ] Mobile 375px: lanyard tetap tampil & draggable, circuit map bisa swipe, navbar pakai burger.
- [ ] Tagline SplitText beranimasi saat masuk viewport.
- [ ] `npm run build` → sitemap.xml berisi 7 URL (home + 6 proyek).
