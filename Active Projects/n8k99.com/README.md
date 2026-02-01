# n8k99.com Website

**Status:** 🟢 LIVE (2026-01-31)  
**GitHub Repo:** https://github.com/n8k99/dragonpunk-noir-theme  
**Live Site:** https://n8k99.com  
**Deployed:** DigitalOcean droplet (PM2 + Nginx)

---

## Overview

Personal creative website for Nathan Eckenrode with podcast feeds and content streams.

**Tech Stack:**
- Next.js 16.1.6 with TypeScript
- Tailwind CSS + custom design tokens
- Aesthetic: Beaux Arts + Naboo + Blade Runner (dark theme, gold/cream/cyan)
- Hosting: DigitalOcean droplet, PM2 process manager, Nginx

---

## Content Streams

1. **Living Room Music** → Captivate RSS feed (weekly electronic music podcast)
2. **The Myths of Orbis** → Captivate RSS feed (serialized Orbis narrative)
3. **Thought Police** → Ghost CMS (first post live, expanding blog)

---

## Architecture

- **Episode Pages:** Dynamic routes `/living-room-music/[slug]`, `/myths-of-orbis/[slug]`
- **Full Descriptions:** No truncation on episode pages
- **Audio Players:** Inline, clickable elements only (focus on content, not navigation)
- **Navigation:** Minimal — episodes pages don't link to other content
- **Design:** Minimalist, focused on content consumption

---

## Deployment

**Production (DigitalOcean Droplet):**
- **Host:** 144.126.251.126 (eckenrodemuziekopname.com)
- **App Directory:** `/opt/n8k99-site` (git-cloned, managed by PM2)
- **Process Manager:** PM2 (`pm2 restart n8k99-site`)
- **Web Server:** Nginx (reverse proxy, 80/443 → localhost:3000)
- **Deployment Flow:**
  1. Push to GitHub (`n8k99/dragonpunk-noir-theme`)
  2. `cd /opt/n8k99-site && git pull`
  3. `npm run build`
  4. PM2 auto-restarts on file changes
  5. Nginx proxies traffic to port 3000

**Local Development:**
- **Local folder:** `/Users/nathaneckenrode/n8k99-site/`
- **Dev server:** `npm run dev` (port 3000)
- **Testing:** Push to GitHub, droplet pulls via `git pull` + rebuilds

---

## Related

- **Captivate FM:** Podcast hosting and RSS feeds
- **Ghost CMS:** Blog platform for Thought Police content
- **Master Chronicle:** Orbis lore backing The Myths of Orbis podcast
- **Puppet Show:** Future EM Staff coordination (could automate content publishing)

---

*Created: 2026-02-01*  
*GitHub Repo: n8k99/Dragonpunknoittheme*
