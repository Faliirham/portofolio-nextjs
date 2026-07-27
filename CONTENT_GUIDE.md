# Portfolio Content Guide

Panduan lengkap cara edit dan tambah konten di website portfolio ini.

---

## Overview

Semua konten website tinggal edit file `.mdx` di folder `content/`. Ga perlu sentuh kode TypeScript/React — cukup edit markdown, push, dan website otomatis update.

```
Edit .mdx → git push → auto deploy → website updated
```

---

## File Structure

```
content/
├── _config.mdx              ← Global: nama, role, social links, stats
├── about.mdx                ← About section: bio, quote, traits, skill meters
├── skills.mdx               ← Skills: kategori + items
├── experience.mdx           ← Experience & organizations
├── certifications.mdx       ← Sertifikasi
├── contact.mdx              ← Contact links, spotify embed
├── _templates/              ← Template (jangan di-edit, cuma reference)
│   ├── project.mdx
│   ├── experience.mdx
│   └── certification.mdx
└── projects/                ← 1 file per project
    ├── finwise.mdx
    ├── tollytics.mdx
    ├── jawara.mdx
    └── simpera.mdx
```

---

## 1. Edit Personal Info

**File:** `content/_config.mdx`

```yaml
---
name: "Fali Irham Maulana"          # Nama lengkap
riderNumber: "#07"                   # Rider number
role: "Full-Stack Developer & AI Engineering Student"  # Role singkat
tagline: "Building digital solutions with code"        # Tagline
location: "Malang, Indonesia"       # Lokasi
email: "fali@example.com"           # Email
availableForWork: true               # Status availability
social:
  github: "https://github.com/faliirham"     # URL GitHub
  linkedin: "https://linkedin.com/in/faliirham"  # URL LinkedIn
  whatsapp: "https://wa.me/6281234567890"    # URL WhatsApp
  instagram: "https://instagram.com/faliirham"  # URL Instagram
stats:
  - label: "Projects"
    value: "4+"
    icon: "🏎️"
  - label: "Experience"
    value: "2yr"
    icon: "⏱️"
  - label: "Certifications"
    value: "1"
    icon: "🏆"
  - label: "Skills"
    value: "16"
    icon: "⚡"
---

Bio text di sini (markdown body).
```

**Cara edit:**
- Ganti nilai di frontmatter (antara `---`)
- Bio di bagian bawah (setelah `---` penutup)

---

## 2. Edit About Section

**File:** `content/about.mdx`

```yaml
---
title: "Rider Profile"              # Section label
subtitle: "Get to know the developer behind the code."
quote: "First, solve the problem. Then, write the code."
quoteAuthor: "— John Johnson"
traits:                              # Trait badges (array)
  - "D-IV Informatics"
  - "HMTI"
  - "Data-driven"
  - "Malang"
skillMeters:                         # Skill bars
  - label: "Full-stack Development"
    value: 90                        # Persentase (0-100)
  - label: "ML / AI Engineering"
    value: 85
  - label: "Database Optimization"
    value: 80
---

Deskripsi about (paragraph pertama).
Deskripsi "What makes me different" (paragraph kedua).
```

---
  
## 3. Edit Skills

**File:** `content/skills.mdx`

```yaml
---
title: "Skill Tree"
subtitle: "Technical arsenal across the full stack."
categories:
  - name: "Backend"
    color: "#e11d48"                 # Hex color
    items:
      - "Laravel"
      - "Node.js"
      - "REST API"
      - "MVC"
  - name: "Frontend"
    color: "#fbbf24"
    items:
      - "React"
      - "Flutter"
      - "Next.js"
      - "Tailwind CSS"
  - name: "AI & Data"
    color: "#a855f7"
    items:
      - "Python"
      - "Machine Learning"
      - "Data Analysis"
  - name: "Database & Tools"
    color: "#22d3ee"
    items:
      - "MySQL"
      - "Database Design"
      - "Git"
---
```

**Tips:**
- Tambah item: tambah baris `- "Nama Skill"`
- Tambah kategori: copy block `name: "..."` yang ada
- Warna: pakai hex color

---

## 4. Edit Projects

### Edit project yang ada:

Edit file di `content/projects/[nama].mdx`, contoh `content/projects/finwise.mdx`:

```yaml
---
title: "FinWise"                     # Judul project
slug: "finwise"                      # URL slug (harus unik)
position: 1                          # Posisi podium (1=gold, 2=silver, 3=bronze, 4=none)
year: "2024"                         # Tahun
featured: true                       # Tampil di featured section?
tech:                                # Tech stack
  - "Laravel"
  - "Flutter"
  - "Machine Learning"
  - "MySQL"
github: "#"                          # GitHub URL
live: "#"                            # Live demo URL
image: "finwise.png"                 # Nama file gambar di /public/images/projects/
role: "Project Manager & Full-Stack Developer"
shortDesc: "Smart financial system leveraging ML."
---

Deskripsi lengkap project (markdown body).

## Contributions

- Kontribusi 1
- Kontribusi 2
- Kontribusi 3

## Impact

Dampak dari project.
```

### Tambah project baru:

1. Copy template dari `content/_templates/project.mdx`
2. Rename jadi `content/projects/nama-project.mdx`
3. Isi semua field
4. Selesai!

---

## 5. Edit Experience

**File:** `content/experience.mdx`

```yaml
---
title: "Race History"
subtitle: "Professional journey and organizational involvement."

entries:
  - type: "work"                     # "work" atau "org"
    title: "Software Engineer"       # Jabatan
    org: "Company Name"              # Perusahaan/organisasi
    location: "Malang, Indonesia"    # Lokasi
    period: "2024 – 2025"            # Periode
    desc: "Deskripsi singkat peran."
    bullets:                         # Pencapaian (array)
      - "Pencapaian 1"
      - "Pencapaian 2"
    impact: "Dampak dari pekerjaan."

  - type: "org"
    title: "Steering Committee"
    org: "HMTI"
    location: "Head of Research Division"
    period: "2023 – 2024"
    desc: "Led the Research Division."
    bullets:
      - "Led activities"
      - "Directed programs"
    impact: "Cultivated research culture."
---
```

**Tips:**
- Tambah entry: tambah block `- type: "..."` di bawah `entries:`
- `type: "work"` muncul di kolom kiri (Work Experience)
- `type: "org"` muncul di kolom kanan (Organizations)

---

## 6. Edit Certifications

**File:** `content/certifications.mdx`

```yaml
---
title: "Trophy Room"
subtitle: "Certifications and achievements."

certifications:
  - title: "Building LLM Applications"
    issuer: "Nvidia"
    year: "2025"
    credentialUrl: "#"               # URL credential
    image: "nvidia.png"              # Logo (optional, di /public/images/certifications/)
---
```

**Tambah sertifikasi baru:**
Tambah block `- title: "..."` di bawah `certifications:`

---

## 7. Edit Contact

**File:** `content/contact.mdx`

```yaml
---
title: "Pit Box"
subtitle: "Let's build something together."
availabilityBadge: "Available for New Projects"
spotifyEmbed: "https://open.spotify.com/embed/playlist/..."  # Spotify embed URL

contactLinks:
  - label: "Email"
    value: "fali@example.com"
    href: "mailto:fali@example.com"
    icon: "email"                    # email, github, linkedin, instagram, whatsapp
  - label: "GitHub"
    value: "github.com/faliirham"
    href: "https://github.com/faliirham"
    icon: "github"
  - label: "LinkedIn"
    value: "linkedin.com/in/faliirham"
    href: "https://linkedin.com/in/faliirham"
    icon: "linkedin"
  - label: "Instagram"
    value: "@faliirham"
    href: "https://instagram.com/faliirham"
    icon: "instagram"
  - label: "WhatsApp"
    value: "+62 812-3456-7890"
    href: "https://wa.me/6281234567890"
    icon: "whatsapp"
---
```

---

## Image Handling

### Struktur folder:

```
public/
└── images/
    ├── projects/
    │   ├── finwise.png
    │   ├── tollytics.png
    │   ├── jawara.png
    │   └── simpera.png
    ├── certifications/
    │   └── nvidia.png
    └── avatar.png
```

### Cara reference di markdown:

```yaml
# Di project file:
image: "finwise.png"          # Auto-resolve ke /images/projects/finwise.png

# Di certification:
image: "nvidia.png"           # Auto-resolve ke /images/certifications/nvidia.png
```

Cukup tulis nama file, path otomatis di-resolve berdasarkan section.

---

## Quick Reference

| Butuh... | Edit file... |
|----------|-------------|
| Ganti nama | `content/_config.mdx` |
| Ganti bio | `content/about.mdx` |
| Tambah skill | `content/skills.mdx` |
| Edit project | `content/projects/[slug].mdx` |
| Tambah project | Copy template → `content/projects/` |
| Tambah experience | `content/experience.mdx` |
| Tambah sertifikasi | `content/certifications.mdx` |
| Ganti social links | `content/_config.mdx` |
| Ganti contact info | `content/contact.mdx` |

---

## Workflow

```bash
# 1. Edit file .mdx
vim content/projects/nama-baru.mdx

# 2. Cek hasilnya lokal
npm run dev

# 3. Push ke git
git add .
git commit -m "update: tambah project nama-baru"
git push

# 4. Website otomatis update (via Vercel/GitHub Actions)
```

---

## Troubleshooting

**Build error?**
- Cek apakah semua required field sudah terisi
- Cek apakah YAML syntax benar (indentasi, quote, dll)
- Cek apakah slug project unik

**Gambar ga muncul?**
- Pastikan file ada di `public/images/[section]/`
- Pastikan nama file cocok dengan yang di markdown
- Cek browser console untuk 404 error

**Section ga muncul?**
- Cek apakah file `.mdx` ada di folder yang benar
- Cek apakah frontmatter format benar (antara `---`)
