# CLAUDE.md — Industrial Flooring Technologies

## Project Overview

Static HTML/CSS/JS website for Industrial Flooring Technologies (industrialfloortech.com), an epoxy/concrete flooring contractor at 594 Sherman Ave, Hamden CT 06514. Deployed via GitHub Pages.

## File Structure

```
industrial/
├── index.html          Home page
├── services.html       Services page
├── gallery.html        Project gallery with filter & lightbox
├── about.html          About us page
├── contact.html        Contact page
├── css/styles.css      Single stylesheet with all design tokens
├── js/main.js          Single JS file (IIFE pattern, vanilla JS)
├── dzimages/           Image assets (DO NOT rename or restructure)
│   ├── hero/           8 hero images (1920px WebP)
│   ├── web/            65 images (1200px WebP)
│   └── gbp/            73 originals with EXIF (excluded from git)
├── .gitignore
└── CLAUDE.md
```

## Brand Colors (CSS Custom Properties)

| Token         | Value     | Usage                     |
|---------------|-----------|---------------------------|
| `--navy`      | `#0A1B5C` | Primary brand, hero overlays |
| `--yellow`    | `#FFE600` | CTAs, accents, highlights |
| `--gray`      | `#6B7280` | Muted text               |
| `--bg-dark`   | `#141414` | Dark section backgrounds  |
| `--bg-darker` | `#0D0D0D` | Alternating dark sections |
| `--bg-card`   | `#212529` | Card backgrounds          |
| `--bg-light`  | `#F8F9FA` | Light section backgrounds |

## Typography

- **Headings**: Oswald (Google Fonts), 700 weight, uppercase
- **Body**: Roboto (Google Fonts), 400 weight

## Key Conventions

- Mobile-first responsive (breakpoints: 1024px, 768px, 480px)
- IntersectionObserver for `.reveal` scroll animations
- `loading="lazy"` on all below-fold images
- `fetchpriority="high"` on hero/page-header images
- SEO: unique `<title>` + `<meta description>` per page, JSON-LD on home
- All image paths start with `dzimages/hero/` or `dzimages/web/`

## Commands

```bash
# Local dev server
python3 -m http.server 8080

# Deploy (GitHub Pages on main branch)
git add -A && git commit -m "message" && git push origin main
```

## Contact Info

- **Phone**: (203) 627-9062
- **Email**: brian@industrialfloortech.com
- **Address**: 594 Sherman Ave, Hamden, CT 06514
- **Owner**: Brian Steinle
