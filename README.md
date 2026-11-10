# ADZINOX PRIVATE LIMITED — WEBSITE

**A complete, production-quality futuristic website** built with HTML5, CSS3, Vanilla JS, GSAP, and Three.js.

---

## 📁 File Structure

```
adzinox/
├── index.html            ← Main website (all 21 sections)
├── 404.html              ← Custom 404 error page
├── privacy.html          ← Privacy Policy (create as needed)
├── terms.html            ← Terms of Service (create as needed)
├── sitemap.xml           ← SEO sitemap (create as needed)
│
├── css/
│   └── style.css         ← All styles (dark/light theme, glassmorphism, responsive)
│
└── js/
    └── main.js           ← GSAP animations, Three.js bg, cursor, chatbot, forms
```

---

## 🚀 How to Run Locally

### Option A — Simplest (No Server Required)
Just open `index.html` in a modern browser (Chrome/Firefox/Edge).

> ⚠️ Some CDN resources (GSAP, Three.js, Google Fonts) require an internet connection.

### Option B — Local Server (Recommended for full features)

If you have Python installed:
```bash
cd /path/to/adzinox
python3 -m http.server 3000
# Open: http://localhost:3000
```

If you have Node.js:
```bash
npx serve .
# or
npx live-server --port=3000
```

---

## 🌐 Deployment Options

### 1. Netlify (Free, Recommended)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag & drop the `adzinox/` folder into the Netlify dashboard
3. Done! Get a live URL instantly.

### 2. Vercel
```bash
npx vercel --prod
```

### 3. GitHub Pages
1. Push the `adzinox/` folder to a GitHub repo
2. Go to Settings → Pages → Deploy from main branch

### 4. Traditional cPanel / FTP Hosting
Upload all files to your `public_html` folder via FTP (FileZilla).

---

## ✏️ Customisation Checklist

Replace all `<!-- PLACEHOLDER -->` comments in `index.html`:

### 🏢 Company Info
- [ ] Phone number: `+91 98765 43210`
- [ ] Email: `info@adzinox.com`
- [ ] Address: `1204, Inspire Hub, Andheri East, Mumbai`
- [ ] WhatsApp number in floating button href

### 🔗 Social Media Links
- [ ] Instagram URL
- [ ] LinkedIn URL
- [ ] Facebook URL
- [ ] YouTube URL
- [ ] X/Twitter URL

### 🖼️ Images
- [ ] Hero background (Three.js — customise colours in `main.js` → `initThreeBackground`)
- [ ] About section office photo (Unsplash placeholder used)
- [ ] Team member photos (4 Unsplash placeholders)
- [ ] Portfolio project screenshots (6 Unsplash placeholders)
- [ ] Blog article thumbnails (3 Unsplash placeholders)
- [ ] Client logos (text placeholders in marquee — replace with actual SVG/PNG logos)
- [ ] Testimonial author photos (5 Unsplash placeholders)
- [ ] OG image at `/assets/og-image.jpg`

### 🗺️ Google Maps
- [ ] Replace the iframe src with your actual Google Maps embed URL
  - Go to Google Maps → Your address → Share → Embed a map → Copy HTML

### 📊 Schema Markup
In `index.html` `<head>`, update the JSON-LD block with real company data.

### 🎨 Brand Colours
In `css/style.css` `:root` block:
```css
--cyan:    #00f5ff;   /* Primary accent */
--violet:  #7c3aed;   /* Secondary accent */
--magenta: #e040fb;   /* Tertiary accent */
```

### 📝 Content
- [ ] Tagline in Hero section
- [ ] About Us story text
- [ ] Team member names, roles, photos
- [ ] Client names in marquee
- [ ] Pricing amounts (confirm actual pricing)
- [ ] Blog posts (replace with real articles)
- [ ] FAQ answers
- [ ] Awards (replace with real awards)

---

## 🛠️ CDN Dependencies

All loaded via CDN (no npm install required):

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.12.5 | Scroll animations, counters, transitions |
| ScrollTrigger | 3.12.5 | Scroll-driven animations |
| Three.js | r128 | Hero 3D particle background |
| Google Fonts | Latest | Orbitron, Space Grotesk, Inter, Sora |

---

## ♿ Accessibility Features

- ✅ ARIA labels on all interactive elements
- ✅ `role` attributes (navigation, main, banner, contentinfo)
- ✅ Keyboard navigable (focus-visible styles)
- ✅ `prefers-reduced-motion` support
- ✅ Semantic HTML5 elements
- ✅ Alt text on all images
- ✅ Good colour contrast ratios
- ✅ Skip-to-content friendly structure

---

## 🔍 SEO Features

- ✅ Title tag and meta description
- ✅ Open Graph (Facebook/LinkedIn sharing)
- ✅ Twitter Card
- ✅ JSON-LD Schema markup (Organization)
- ✅ Canonical URL
- ✅ Robots meta
- ✅ Semantic headings (h1 → h3 hierarchy)
- ✅ Descriptive alt tags on images
- ✅ Lazy loading on all below-fold images
- ✅ Sitemap-ready structure

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `>1024px` | Full desktop layout |
| `≤1024px` | Tablet — stacked columns, 3-col stats |
| `≤768px` | Mobile — hamburger nav, single-column |
| `≤480px` | Small mobile — 2-col grids |

---

## ⚡ Performance Tips

1. **Images**: Replace Unsplash URLs with locally optimised WebP images for production
2. **Fonts**: Self-host Google Fonts to eliminate a DNS lookup
3. **GSAP**: Only import `ScrollTrigger` if using animations (already done)
4. **Three.js**: Canvas is hardware-accelerated; reduce particle count on mobile if needed
5. **Lazy loading**: All `<img>` tags below the fold have `loading="lazy"`

---

## 📞 Support

For customisation help or to hand over to your developer:
- Share this `adzinox/` folder
- They can open `index.html` in any browser or editor

---

*Built with ❤️ by Antigravity AI — powered by Google DeepMind*
