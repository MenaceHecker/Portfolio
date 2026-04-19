# Tushar Mishra — Portfolio

Built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, deployed on **Cloudflare Pages**.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Personalise

All content lives in one file: **`src/lib/data.ts`**

Update these before deploying:
- `siteConfig.email` — your email address
- `siteConfig.github` — your GitHub profile URL
- `siteConfig.linkedin` — your LinkedIn profile URL
- `siteConfig.resume` — add your `resume.pdf` to `/public` folder
- Each `project.github` and `project.demo` link
- `experiences[1].company` — your IT Support company name

## Project Structure

```
src/
├── app/
│   ├── globals.css        # fonts, base styles, utilities
│   ├── layout.tsx         # metadata + root layout
│   └── page.tsx           # assembles all sections
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── SectionHeader.tsx
│       └── TechTag.tsx
└── lib/
    ├── data.ts            # ← all your content here
    └── utils.ts           # cn() helper
```

## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → Create application → Pages
3. Connect your GitHub repo
4. Set build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Output directory**: `.vercel/output/static`
5. Add environment variable: `NODE_VERSION = 20`
6. Deploy

### Option B — Manual CLI deploy

```bash
npm install
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name tushar-portfolio
```

## Local Cloudflare Preview

```bash
npm run preview
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Syne + DM Mono (Google Fonts) |
| Deployment | Cloudflare Pages |
| Adapter | @cloudflare/next-on-pages |
