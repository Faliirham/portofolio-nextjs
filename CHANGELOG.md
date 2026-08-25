# Changelog

Semua perubahan signifikan pada portfolio ini akan dicatat di file ini.

## [Unreleased] — 2026-08-25

### Refactor: Ganti Lanyard 3D dengan ReactBits ProfileCard

- **`refactor(hero): replace physics lanyard with interactive ProfileCard`**
  - Lanyard 3D (rapier physics) dihapus total beserta infrastrukturnya — alasan: rapuh di dev (StrictMode double-mount merusak joint physics) dan berat untuk GPU mobile.
  - Dihapus: `components/ui/Lanyard.tsx`, `components/ui/ErrorBoundary.tsx`, `scripts/copy-rapier-wasm.mjs`, `public/wasm/`, override `@dimforge/rapier3d-compat`, deps `@react-three/rapier` + `meshline`, hook `predev`.
  - Ditambahkan via `npx shadcn@latest add @react-bits/ProfileCard-JS-CSS`: `components/ProfileCard.jsx` + `ProfileCard.css` (murni React+CSS, tanpa dependensi baru, efek tilt 3D mengikuti kursor + glare/shine).
  - `components.json` (baru) untuk shadcn CLI.
  - Integrasi di `Hero.tsx`: nama/role/handle/status dari `content/_config.mdx`, avatar `/images/config/Fali Irham.png`, tombol GET IN TOUCH scroll ke `#contact`, gradient di-override ke tema merah/hitam, sudut card disamakan dengan tema brutal (`--card-radius: 0`).
  - CSS: `.hero-lanyard-*` diganti `.hero-profile-card` / `.hero-profile-col` — **wrapper diberi width definitif** (`min(100%, 373px)`) karena pola fit-content + anak % menyebabkan card kolaps (bug yang sama dengan lanyard sebelumnya).
  - Terverifikasi: tsc/lint/build ✓, console bersih, card render di desktop & mobile, sudah di-deploy ke produksi.

### Fix: Duplicate React Key di CursorTrail

- **`fix(cursor-trail): generate dot ids from module-level counter inside updater`**
  - Error "Encountered two children with the same key" — `idCounter` berbasis `useRef` bisa ter-reset (Fast Refresh) / terbaca dobel saat React dev double-invoke state updater → dua dot dengan `key` sama.
  - ID kini dibuat dari counter module-level (`++trailId`) di dalam updater — unik lintas remount/instance, dan aman terhadap double-invocation. Terverifikasi: sweep mouse 80+ gerakan tanpa error key.

### Chore: Upgrade @react-three/fiber 9.6.1 → 9.7.0

- Versi 9.x terbaru (peer range sama, react 19.2 kompatibel, drei tidak terpakai di source sehingga nol risiko).
- Catatan: warning `THREE.Clock: This module has been deprecated` masih muncul karena fiber (termasuk 9.7.0) masih memakai `THREE.Clock` internally, sementara three r185 mendeprecate-nya. **Harmless** — murni noise console dari library, tanpa dampak fungsi. Akan hilang sendiri saat fiber migrasi ke `THREE.Timer`.
- Warning `using deprecated parameters for the initialization function` dari shim compat rapier juga harmless — `init({module_or_path})` tetap berhasil memuat WASM dari `/wasm/` (terverifikasi physics berjalan).

### Fix: Lanyard 3D Tidak Render (Root Cause WASM + WebGL Context Loss)

- **`fix(lanyard): serve rapier wasm from /public and pre-init before Physics mount`**
  - **Akar masalah #1:** `@react-three/rapier@2.2.0` membawa `@dimforge/rapier3d-compat@0.19.2` yang memuat WASM via `new URL(..., import.meta.url)`. Turbopack (default Next 16) tidak mengubah pola ini — di bundle produksi base URL tertinggal sebagai `"<deleted>"` dan file `.wasm` tidak pernah di-emit ke `out/`. Akibatnya `init()` gagal saat fetch → `<Physics>` tidak pernah render children → frame lanyard kosong.
  - `package.json`: tambah `overrides."@dimforge/rapier3d-compat": "0.19.2"` agar hanya ada satu salinan modul (sebelumnya 0.12.0 hoisted dari rantai type-only drei→maath + 0.19.2 nested) sehingga pre-init memakai instance yang sama dengan `<Physics>`.
  - `scripts/copy-rapier-wasm.mjs` (baru): salin `rapier_wasm3d_bg.wasm` dari node_modules → `public/wasm/`. Hook ke `predev`, dan di-inline-kan ke `build`/`preview`/`deploy` (script deploy memanggil `next build` langsung, bukan via `npm run build`).
  - `components/ui/Lanyard.tsx`: helper `ensureRapier()` — import dinamis `@dimforge/rapier3d-compat` lalu `init({ module_or_path: "/wasm/rapier_wasm3d_bg.wasm" })` (path relatif aman untuk Cloudflare Pages), promise di-cache module-level. `<Physics>` baru dirender setelah init sukses; bila init gagal → fallback `StaticLanyard` (tanpa fisika) sebagai graceful degradation.
- **`fix(lanyard): remount canvas on webglcontextlost`**
  - **Akar masalah #2:** `THREE.WebGLRenderer: Context Lost` setelah frame pertama membuat canvas blank permanen tanpa error JS (terverifikasi via probe runtime).
  - Listener `webglcontextlost` pada `gl.domElement` (dipasang di `onCreated`) dengan `e.preventDefault()` + remount `<Canvas>` via `key={ctxEpoch}`; dibatasi maksimal 3 kali remount. `powerPreference: "high-performance"` ditambahkan.
- **`fix(lanyard): stabilize physics chain against solver explosion`**
  - Pada frame rate rendah (device lambat), burst stepping (hingga 30 step/frame) membuat rantai joint meledak (body terlempar hingga y=-131).
  - Mitigasi: `numSolverIterations` 4 → 8, `linearDamping` link 1.1 → 2.2 dan kartu 1.4 → 2.5, `angularDamping` 2/2.2 → 4, impuls angin 0.003 → 0.0012. Terverifikasi stabil (frame 120: link0=1.11, card=-1.55) bahkan di environment headless ±3fps.
- **`fix(lanyard): allocate refs via useMemo keyed by count`**
  - `linkRefs` kini dibuat via `useMemo` sesuai `count` (sebelumnya selalu 8 ref meski mobile hanya pakai 6).
- **`feat(ui): add ErrorBoundary component`**
  - `components/ui/ErrorBoundary.tsx` (baru); `<Lanyard/>` di `Hero.tsx` dibungkus boundary — kegagalan lanyard tidak lagi bisa merobohkan halaman.

### Fix: Mobile Layout (Grid Blowout & Lanyard Collapsed)

- **`fix(hero): constrain grid column with minmax(0,1fr)`**
  - **Akar masalah:** grid implisit `auto` mengikuti max-content baris role (±480px) di viewport 390px → seluruh konten hero meluber horizontal (role line, stats, social icons terpotong).
  - `Hero.tsx`: `lg:grid-cols-[1fr_380px]` → `grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_380px]`.
- **`fix(hero): give lanyard column explicit width on mobile`**
  - **Akar masalah:** `.hero-lanyard-col { margin: 0 auto }` di <768px mematikan stretch grid item → item jadi fit-content = 0 (anak-anaknya % width) → canvas lanyard stuck di ukuran default 300×150 dan tak terlihat.
  - `globals.css`: tambah `width: 100%` pada `.hero-lanyard-col` di media query mobile. Terverifikasi: canvas 320×360 di 390px viewport.

### Fix: Navbar Mobile Hardening

- **`fix(navbar): touch targets, scroll lock, escape & outside-click close`**
  - Body scroll lock saat menu terbuka; tutup via tombol Escape, tap di luar panel, klik link, dan saat resize ke desktop.
  - `aria-expanded` + `aria-controls` pada burger; touch target ≥44px; panel menu solid (alpha 0.98 + backdrop blur), `maxHeight: calc(100dvh - 64px)` + overflow scroll, safe-area-inset-bottom; link menu diberi separator + tinggi sentuh lebih besar; logo pakai `clamp()` + `white-space: nowrap`.

### Verifikasi

- `npx tsc --noEmit` ✓, `eslint` pada file yang diubah ✓, `npm run build` ✓
- Probe runtime produksi (headless Chrome + wrangler pages dev): console bersih tanpa error/warning di desktop & mobile; lanyard ter-render penuh (rantai + strap + kartu berfoto) dan stabil; tidak ada overflow horizontal (scrollWidth 390 = clientWidth 390).
- `out/wasm/rapier_wasm3d_bg.wasm` ikut ter-copy ke output build.

## [Unreleased] — 2026-08-19

### Responsive Layout Overrides — Circuit, Navbar & Lanyard

- **`fix(responsive): replace inline grid styles with CSS override classes in projects circuit`**
  - Layout racing line, corner rows, node, dan card di `Projects.tsx` dipindah dari inline styles (yang override modifier Tailwind karena spesifisitas inline > class) ke class CSS baru di `app/globals.css`: `.circuit-spine`, `.circuit-row-grid`, `.circuit-node`, `.circuit-card--even/odd`, `.sector-label`.
  - Posisi spine kini responsive (`left: clamp(22px, 6vw, 28px)` di mobile, `50%` di ≥768px); paddings pakai `clamp()` agar proporsional di semua ukuran layar.
  - `html` dan `body` ditambah `overflow-x: hidden` + `width: 100%` untuk mencegah horizontal scroll tak diinginkan dari dekorasi absolut.

- **`fix(navbar): remove inline display:flex that broke responsive breakpoints`**
  - Inline `display: "flex"` di nav desktop dan burger mobile dihapus — sebelumnya mengalahkan class Tailwind `hidden lg:flex` / `lg:hidden` (nav kepotong / burger salah tampil di 768–1024px).

- **`fix(hero): constrain lanyard frame on mobile via CSS classes`**
  - `Hero.tsx` memakai class baru `.hero-lanyard-frame` (height `clamp(340px, 52vw, 520px)`, `max-height: 360px` di <768px) dan `.hero-lanyard-col` (max-width 320px, centered) untuk membatasi tinggi kartu di layar kecil.
  - `Lanyard.tsx`: BOM di awal file dihapus; Canvas kini mengisi `width/height: 100%` mengikuti frame.

- **`fix(about): correct rider decal shadow and normalize rider number prefix`**
  - Variabel `--bg-dark` (tidak ada) diganti `--bg-primary` pada box-shadow decal; posisi decal disesuaikan; nomor rider di-render konsisten (`#05` vs `05` → selalu dengan `#`).

- **`fix(circuit-map): keep hover tooltip open and enlarge on desktop`**
  - Tooltip proyek kini `pointerEvents: auto` dengan handler `onMouseEnter`/`onMouseLeave` sendiri — tidak hilang saat kursor berpindah ke tooltip; lebar ditambah (260px / 80vw) dan z-index dinaikkan agar tak terpotong konten lain.

- **`fix(contact): remove duplicate pulse keyframes`**
  - `@keyframes pulse` inline di `Contact.tsx` dihapus (sudah didefinisikan global di `globals.css`).

### Dependencies & Komponen Animasi

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
