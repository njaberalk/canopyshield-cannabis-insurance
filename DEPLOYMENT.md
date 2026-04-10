# Cannabis Insurance Microsite — Deployment Guide

## Overview
Static Next.js site that needs to be served at `canopyshield.com/cannabis/`.
Pre-rendered HTML — no server runtime needed. Just static files.

## Quick Start

```bash
# Install dependencies
npm install

# Build static site
npm run build

# Output is in /out/ — deploy this folder
```

## What Gets Built
- **141+ static HTML pages** in the `/out/` directory
- `sitemap.xml` and `robots.txt` auto-generated
- All pages pre-rendered with full SEO (meta tags, JSON-LD, Open Graph)

## Deployment Options

### Option A: Vercel (Recommended)
1. Push this repo to GitHub
2. Connect to Vercel at vercel.com
3. Settings:
   - Framework: Next.js
   - Build command: `next build`
   - Output directory: `out`
4. Add custom domain: configure `canopyshield.com` with path routing
5. In Vercel project settings → Domains → add `canopyshield.com` with basePath `/cannabis`

### Option B: Cloudflare Pages
1. Push to GitHub
2. Connect to Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Build output: `out`
4. Configure Workers route to proxy `canopyshield.com/cannabis/*` to the Pages deployment

### Option C: Static hosting + Reverse Proxy
1. Run `npm run build`
2. Upload the `/out/` folder to any static host (S3, GCS, Netlify, etc.)
3. Configure your DNS/proxy to route `canopyshield.com/cannabis/*` requests to the static host
4. Nginx/Cloudflare Worker example:

```nginx
location /cannabis/ {
    proxy_pass https://your-static-host.com/cannabis/;
    proxy_set_header Host your-static-host.com;
}
```

### Option D: Direct on canopyshield.com's server
1. Run `npm run build`
2. Copy the entire `/out/` directory to the web server
3. Serve it at the `/cannabis/` path

## Important Configuration

### basePath
The site is configured with `basePath: '/cannabis'` in `next.config.mjs`.
All internal links, assets, and routes are relative to `/cannabis/`.

### DNS / Routing
The hosting must serve these files at `canopyshield.com/cannabis/` (NOT a subdomain).
The root domain `canopyshield.com` continues to point to Webflow as normal.

## Post-Deployment Checklist

### Day 1
- [ ] Verify `canopyshield.com/cannabis/` loads correctly
- [ ] Verify `canopyshield.com/cannabis/sitemap.xml` returns the sitemap
- [ ] Submit sitemap in Google Search Console:
  - Go to search.google.com/search-console
  - Select the `canopyshield.com` property
  - Sitemaps → Add: `cannabis/sitemap.xml` → Submit
- [ ] Request indexing on 10-15 key pages via URL Inspection tool
- [ ] Add to canopyshield.com's robots.txt: `Sitemap: https://canopyshield.com/cannabis/sitemap.xml`

### Week 1
- [ ] Link from canopyshield.com's "Cannabis" nav item to `/cannabis/`
- [ ] Verify pages appearing in Google (site:canopyshield.com/cannabis)

### Month 1+
- [ ] Monitor Search Console Performance filtered by `/cannabis/`
- [ ] Identify pages ranking positions 8-20 and optimize

## Tech Stack
- Next.js 16 (static export)
- React 19
- Tailwind CSS v4
- No database, no server runtime
- Node.js 24 required for building

## File Structure
```
app/
  page.jsx                     # Home page
  layout.jsx                   # Root layout with Poppins font + global SEO
  sitemap.js                   # Auto-generates sitemap.xml
  robots.js                    # Auto-generates robots.txt
  not-found.jsx                # 404 page
  coverage/[slug]/page.jsx     # 9 coverage pages
  industries/[slug]/page.jsx   # 10 industry pages
  states/[slug]/page.jsx       # 50 state pages
  cities/[slug]/page.jsx       # 100 city pages
  resources/[slug]/page.jsx    # 9 resource/guide pages
  blog/[slug]/page.jsx         # 8 blog articles
components/                    # Shared React components
data/                          # Content data files (coverages, industries, states, cities, resources, blog)
```
