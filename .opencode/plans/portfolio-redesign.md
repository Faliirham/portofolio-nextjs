# Portfolio Redesign: MotoGP Theme + Responsive + 3D Interactive

## Context

The user wants to redesign their portfolio (Fali Irham Maulana) with a **MotoGP racing theme**. The theme CSS and most component styling is done, but there are three remaining tasks:

1. **Remove all gamification code** (XP, missions, levels) — user explicitly wants this gone
2. **Make the site fully responsive** across all device sizes — currently desktop-heavy
3. **Add interactive 3D/animated elements** using Three.js / React Three Fiber — user wants more interactivity

The codebase is Next.js 16 (App Router) + React 19.2 + Tailwind CSS v4 + Framer Motion.

---

## Phase 0: Remove Gamification Code

All gamification is implemented but must be deleted. This is a prerequisite for everything else.

### Files to DELETE
- `components/gamification/useGamification.ts`
- `components/gamification/GamificationProvider.tsx`
- `components/ui/XPBar.tsx`
- `components/ui/MissionPanel.tsx`

### Files to EDIT

**`app/page.tsx`** — Remove `GamificationProvider`, `SectionTracker`, and all gamification imports. Keep only the section component renders inside a clean `<main>`.

**`components/sections/Navbar.tsx`** — Remove imports of `useGame`, `XPBar`, `XPPopup`, `MissionPanel`. Remove the `Flag` icon import. Remove all gamification state destructuring from `useGame()`. Remove `<XPPopup>`, `<MissionPanel>`, `<XPBar>` renders. Remove the Mission Flag button (mobile and desktop). Keep: logo, nav links, "Hire Me" CTA, mobile burger menu.

**`components/sections/MusicPlaylist.tsx`** — Remove `useGame` import and `completeMission` call. Remove the `IntersectionObserver` useEffect. Remove `viewed` ref. The component should just render the Spotify embed without gamification tracking.

**`lib/data.ts`** — Remove `missions` array, `levelTitles` array, `Mission` type export. Keep `raceStats`, `skills`, `projects`, `experiences`, `certifications`, `personalInfo`.

### Verify
- Run `npm run lint` and `npm run build` to confirm no broken imports
- Grep for any remaining references to `useGame`, `GamificationProvider`, `XPBar`, `MissionPanel`, `completeMission`, `missions`, `levelTitles`

---

## Phase 1: Make Fully Responsive (Mobile-First)

### Current Responsive State Analysis

**What works:**
- `clamp()` fluid typography on headings (12 instances across 10 files)
- Navbar has mobile burger menu at `md:`
- Projects grid -> 2-col at `md:`
- Certifications grid -> 2-col at `sm:`
- Most sections -> 2-col at `lg:`

**What's broken on mobile:**
1. **Hero** — Rider profile card + race stats completely `hidden lg:flex` (no mobile version)
2. **Hero** — Race stats grid has hardcoded `width: "340px"`
3. **Section padding** — All sections use `padding: "7rem 0"` which is excessive on small screens
4. **Container** — `.container-custom` has `1.5rem` padding on mobile (tight)
5. **Skills** — Connecting vertical line is `hidden lg:block` (no visual connection on mobile)
6. **SpotifyEmbed** — Fixed `height="352"` iframe, no aspect-ratio handling
7. **Contact** — Left column text has `maxWidth: "340px"` which may not fill width on mobile
8. **MusicPlaylist** — `lg:grid-cols-[380px_1fr]` may squeeze on tablets

### Responsive Fixes by Component

#### `globals.css`
- Add responsive section padding utility class
- Add `@media (max-width: 768px)` for speed line opacity reduction

#### `components/sections/Hero.tsx`
- Show race stats on mobile: Replace `hidden lg:flex` with responsive layout
- Race stats grid: Change from fixed `width: "340px"` to `width: "100%"` with `maxWidth: "340px"` on desktop
- Rider card: Change from fixed `width: "340px"` / `height: "340px"` to responsive sizing
- Speed lines: Reduce count or opacity on mobile
- Reduce section padding on mobile

#### `components/sections/About.tsx`
- Reduce section padding on mobile: `padding: "5rem 0"` on small screens

#### `components/sections/Skills.tsx`
- The connecting line is `hidden lg:block` — consider showing a horizontal line on mobile
- Reduce section padding on mobile

#### `components/sections/Projects.tsx`
- Reduce section padding on mobile

#### `components/sections/Experience.tsx`
- Reduce section padding on mobile

#### `components/sections/Certifications.tsx`
- Reduce section padding on mobile

#### `components/sections/Contact.tsx`
- Reduce section padding on mobile

#### `components/sections/MusicPlaylist.tsx`
- Make the left column `width: "100%"` on mobile

#### `components/ui/SpotifyEmbed.tsx`
- Add `aspectRatio: "1 / 1"` or responsive height handling

### Section Padding Strategy
All sections currently use `padding: "7rem 0"`. For mobile:
- `< 640px`: `padding: "4rem 0"`
- `640px - 1024px`: `padding: "5rem 0"`
- `> 1024px`: `padding: "7rem 0"` (current)

---

## Phase 2: Three.js / React Three Fiber Interactive Elements

### Dependencies to Install
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### Next.js 16 Pattern for R3F
- All Three.js components must be Client Components (`'use client'`)
- Use `next/dynamic` with `{ ssr: false }` to lazy-load the canvas
- Keep the client boundary narrow — only the 3D wrapper gets `'use client'`

### 3D Elements to Implement

#### 1. Hero Background — Particle Speed Field
A subtle, animated particle system behind the Hero section that responds to scroll position.

**Location**: `components/three/ParticleField.tsx`
- Low-particle-count field (100-200 particles)
- Particles drift horizontally (left to right) like speed streaks
- Color: red (#e11d48) with low opacity
- React to mouse position for subtle parallax
- Reduce particle count on mobile for performance

#### 2. Hero Rider Card — 3D Tilt Effect
Replace the static rider profile card with a card that has a subtle 3D tilt on mouse hover.

**Location**: `components/ui/TiltCard.tsx`
- On mouse move, calculate tilt angle based on cursor position relative to card center
- Max tilt: +/-8 degrees
- On mobile: subtle scale animation on tap

#### 3. Skills Section — Interactive Node Graph
A small Three.js canvas showing skill categories as connected nodes in 3D space.

**Location**: `components/three/SkillGraph.tsx`
- 4 nodes positioned in 3D, connected by thin lines
- Slow auto-rotation
- On hover: node glows and expands
- On mobile: simplify to 2D CSS animation

#### 4. Scroll-Driven Checkered Flag Transition
Between major sections, a subtle checkered pattern that reveals as you scroll past it.

**Location**: `components/ui/CheckeredTransition.tsx`
- CSS-only animation triggered by IntersectionObserver
- Alternating black/white squares that fade in from left to right

#### 5. Cursor Trail — Racing Afterburn
A subtle trailing effect following the mouse cursor.

**Location**: `components/ui/CursorTrail.tsx`
- Small dots following the cursor with decreasing opacity
- Red/yellow gradient
- Disabled on mobile (no hover cursor)

### File Structure for Three.js
```
components/
  three/
    ParticleField.tsx
    SkillGraph.tsx
  ui/
    CursorTrail.tsx
    CheckeredTransition.tsx
    TiltCard.tsx
```

### Performance Considerations
- All Three.js components lazy-loaded with `next/dynamic({ ssr: false })`
- Mobile detection: reduce/disable 3D effects on mobile
  - Use `window.matchMedia('(hover: hover)')` to detect hover capability
  - ParticleField: reduce count from 200 to 50 on mobile
  - SkillGraph: replace with CSS-only version on mobile
  - CursorTrail: completely disabled on mobile
- Use `dpr={[1, 1.5]}` on R3F Canvas to limit pixel ratio
- Set `frameloop="demand"` on Canvas for idle scenes

---

## Phase 3: Testing & Polish

### Responsive Testing Checklist
- [ ] 375px — iPhone SE (small mobile)
- [ ] 390px — iPhone 14 (standard mobile)
- [ ] 768px — iPad (tablet)
- [ ] 1024px — Laptop (small desktop)
- [ ] 1440px — Desktop
- [ ] Verify no horizontal scroll at any size
- [ ] Verify all touch targets >= 44px
- [ ] Verify Spotify embed renders correctly
- [ ] Verify 3D elements don't cause jank on low-end mobile

### Build & Lint
- `npm run lint` — 0 errors
- `npm run build` — successful build
- Verify no hydration mismatches from Three.js

---

## Execution Order

1. Phase 0: Remove gamification -> verify build
2. Phase 1: Responsive fixes -> test at multiple sizes
3. Phase 2: Install Three.js deps -> implement 3D elements one by one
4. Phase 3: Polish and test

Each phase should be committed separately for clean git history.
