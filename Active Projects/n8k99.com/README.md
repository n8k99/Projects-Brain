# n8k99.com Website

**Status:** 🟢 LIVE (2026-01-31)  
**GitHub Repo:** https://github.com/n8k99/Dragonpunknoittheme  
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

## Local Development

**Local folder:** `/Users/nathaneckenrode/n8k99-site/`

---

## Related

- **Captivate FM:** Podcast hosting and RSS feeds
- **Ghost CMS:** Blog platform for Thought Police content
- **Master Chronicle:** Orbis lore backing The Myths of Orbis podcast
- **Puppet Show:** Future EM Staff coordination (could automate content publishing)

---

*Created: 2026-02-01*  
*GitHub Repo: n8k99/Dragonpunknoittheme*
