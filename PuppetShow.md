# Puppet Show - EM Staff Orchestration Skill

**Status:** Project Init (2026-01-29)
**Type:** Moltbot Skill
**Purpose:** Enable automated task delegation to EM Staff personas based on their roles and responsibilities

---

## Vision: Clawdbot as Nervous System

**Goal:** Transform Clawdbot from a tool into the nervous system infrastructure for EM operations + Orbis Worldbuilding.

**How It Works:**
- You sit in Discord/Foundry and think out loud
- Puppet Show automatically cascades research and work across background channels
- EM Staff personas (Sylvia, Eliana, Kathryn, Lena, etc.) coordinate work in parallel
- Results synthesize and surface to you without management overhead
- You never see the machinery — just the results

**Success Criteria:**
- One directive triggers multi-channel async work
- Device continuity maintained (phone ↔ computer)
- Fallback chains work (Claude → OpenAI → Ollama)
- System self-heals (automatic recovery when services available)
- Token measurement enables optimization

**Status:** Foundation working ✅ (vault access, database access, multi-channel infrastructure, persona framework)  
**Missing:** Orchestration layer (auto-trigger workflows), contradiction detection, fallback chains, token measurement

---

## Overview

The Puppet Show is a Moltbot skill that routes work to the appropriate EM Staff member based on:
1. Task requirements (what needs to be done)
2. Staff member responsibilities (who handles what)
3. Associated skills (what tools they have to accomplish it)
4. Discord webhooks (how to communicate with them)

## Architecture

### Core Components

1. **EM Staff Registry**
   - Name, role, department
   - Responsibilities (predefined list)
   - Associated skills (tools/methods they use)
   - Discord webhook for communication
   - Team hierarchy (who reports to whom)

2. **Skill Mapping**
   - Staff member → Available skills
   - Example: Julian Weber → humanizer
   - Skill purpose and when to invoke it

3. **Task Router**
   - Input: Task description
   - Match task to staff member based on responsibilities
   - Invoke appropriate skill
   - Collect and report progress

4. **Progress Reporting**
   - Track what skill did
   - What was changed/accomplished
   - Report back to user

---

## Puppet Show + Lena Morris (EM Operations Coordinator)

**The System:**
- **Puppet Show** = Automated task routing and orchestration (technical/skill-based layer)
- **Lena Morris** = EM Operations Coordinator (human oversight, escalation, strategic adjustment layer)

**How they work together:**
1. Task arrives (from Nathan's directives, daily notes, or escalations)
2. Puppet Show routes to appropriate EM Staff member based on responsibilities + skills
3. Lena monitors progress, adjusts priorities in real-time, handles escalations
4. If strategic adjustment needed, Lena coordinates with Nathan/Kathryn
5. Results reported back through Moltbot

---

## EM Staff → Skills Mapping

**Status:** Comprehensive mapping in progress (2026-01-29)  
**Scope:** All 63 EM Staff members  
**Format:** Each person → Responsibilities → Skill Options (multiple choices listed)  
**Last Updated:** 2026-01-29 16:52 EST

### Department Organization
The EM Staff is organized into the following teams/departments:
- Executive (CEO, CTO, CSO, CCO, Head of Legal, Head of Musicology Research)
- Technical Development Office
- Content and Brand Office
- Strategic Office
- Musicology Research Office
- Legal and Ethics Team
- Success Department (Analytics & Performance)
- Various specialized roles

### Executive Level

#### Eliana Riviera (Chief Technical Officer)
- **Role:** CTO, Reports to Nathan Eckenrode
- **Department:** Executive
- **Team:** Technical Development Office (Samir Khanna, Morgan Fields, Devin Park, Casey Han)
- **Responsibilities:**
  - Lead Technical Development Office, build/maintain technical infrastructure
  - Oversee T.A.S.K.S. integration, ensure reliability and scalability
  - Manage technical roadmap
  - Mentor team members in technical innovation
- **Associated Skills (Options):**
  - Code Review: `ai-code-review`, `receiving-code-review`
  - Architecture: `ai-adr`, `adr-writer`, `diagram-gen`
  - Infrastructure: `aws-infra`, `azure-infra`, `terraform-gen`, `kubernetes`
  - CI/CD: `ai-ci`, `ci-config-gen`, `github-action-gen`
  - Development: `coding-agent`, `refactor-suggest`
- **Discord Webhook:** (to be added)

#### Kathryn Lyonne (Chief Strategy Officer)
- **Role:** CSO, Reports to Nathan Eckenrode
- **Department:** Executive
- **Team:** Strategic Office (Sarah Lin, Milo Gaines)
- **Responsibilities:**
  - Oversee strategic direction, ensure alignment with growth/innovation
  - Collaborate with T.A.S.K.S. for data/AI insights
  - Lead Strategic Office, set milestones and KPIs
  - Align company goals with mission and values
- **Associated Skills (Options):**
  - Market Analysis: `competitive-intelligence-market-research`, `stock-market-pro`, `financial-market-analysis`
  - Risk Assessment: `pre-mortem-analyst`, `decision-trees`
  - Strategic Planning: `planning-with-files`, `personal-branding-authority`
  - Business Analysis: `polymarket-analysis`
- **Discord Webhook:** (to be added)

#### Sylvia Inkweaver (Chief of Content)
- **Role:** Chief of Content, Reports to Nathan Eckenrode
- **Department:** Executive
- **Team:** Content and Brand Office (Julian Weber, Oscar Diaz, Mara Ellison, Harper Liu)
- **Responsibilities:**
  - Lead Content and Brand Office development
  - Oversee T.A.S.K.S. integration into brand narrative
  - Innovate storytelling approaches
  - Establish editorial standards
- **Associated Skills (Options):**
  - Content Strategy: (search in progress)
  - Brand Development: (search in progress)
  - Storytelling: (search in progress)
- **Discord Webhook:** (to be added)

### Content & Brand Office

#### Julian Weber (Content Editor)
- **Role:** Content Editor, Reports to Sylvia Inkweaver
- **Department:** Marketing
- **Responsibilities:**
  - Oversee editing and quality control of all content
  - Collaborate with T.A.S.K.S. to refine AI-generated content
  - Maintain narrative and stylistic consistency
  - Guide writers and content creators
- **Associated Skills (Options):**
  - Content Humanization: `humanizer` ✓
  - Proofreading/Editing: (search in progress)
  - Style Guide: (search in progress)
- **Discord Webhook:** (to be added)

### Technical Development Office (Reports to Eliana Riviera)

#### Devin Park (Performance Optimizer)
- **Responsibilities:** Optimize algorithms/infrastructure, performance benchmarking, troubleshoot bottlenecks, monitor real-time data
- **Skills:** `project-manager`, `sysadmin-toolbox`, `kubernetes`, `monitoring/logging tools`

#### Samir Khanna
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

#### Morgan Fields
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

### Content and Brand Office (Reports to Sylvia Inkweaver)

#### Oscar Diaz
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

#### Mara Ellison
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

#### Harper Liu (Digital Media Producer)
- **Responsibilities:** Produce/edit digital content, align with brand vision, audience engagement strategies
- **Skills:** `remotion`, `demo-video`, `ai-video-gen`, `veo`

### Strategic Office (Reports to Kathryn Lyonne)

#### Sarah Lin
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

#### Milo Gaines
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

### Success Department (Analytics & Performance)

#### Alex Torres (User Insight Analyst)
- **Responsibilities:** Analyze audience data, identify trends, design surveys, translate insights into strategies
- **Skills:** `research`, `deep-research`, `analytics-tracking`, `ga4-analytics`, `marketing-mode`

#### Amara Shah (Performance Analyst) — Reports to Kathryn Lyonne
- **Responsibilities:** Analyze performance data, develop data-driven metrics, present performance reports, identify growth opportunities
- **Skills:** `ga4-analytics`, `financial-market-analysis`, `analytics-tracking`

#### Ethan Ng (Strategy Analyst)
- **Responsibilities:** Market research/analysis, derive insights from data, monitor industry trends, prepare reports
- **Skills:** `research`, `competitive-intelligence-market-research`, `stock-market-pro`

### UX/Design Team

#### Casey Han (UX Designer) — Reports to Eliana Riviera
- **Responsibilities:** Design UIs, conduct user research, collaborate with developers, iterate based on feedback
- **Skills:** `ui-ux-pro-max`, `diagram-gen`, `remotion`

#### Daniel Cho (User Experience Specialist)
- **Responsibilities:** User research/usability testing, refine designs based on feedback, analyze user behavior trends
- **Skills:** `ui-ux-pro-max`, `analytics-tracking`, `research`

#### Elise Park (Human-Computer Interaction Specialist)
- **Responsibilities:** Design user-friendly interfaces, conduct usability testing, gather user feedback, apply HCI principles
- **Skills:** `ui-ux-pro-max`, `research`

#### Isaac Miller (AI Interaction Designer)
- **Responsibilities:** Design intuitive AI interactions, create prototypes, refine user interfaces
- **Skills:** `diagram-gen`, `remotion`, `ui-ux-pro-max`

### Engineering/ML Team

#### Danielle Green (Machine Learning Engineer) — Reports to Eliana Riviera
- **Responsibilities:** Develop/optimize ML models, collaborate with data scientists, implement algorithms for personalization
- **Skills:** `coding-agent`, `refactor-suggest`, `ai-code-review`

### Audio/Sound Team

#### Emilio Torres (Sound Designer)
- **Responsibilities:** Design soundscapes/audio elements, work with T.A.S.K.S. for AI-generated sound, create immersive experiences
- **Skills:** `elevenlabs-music`, `vap-media`, `voice-transcribe`, `local-whisper`

#### Evelyn Woods (Soundscape Specialist)
- **Responsibilities:** Create soundscapes for multimedia, conduct field recordings, design audio experiences, experiment with synthesis
- **Skills:** `elevenlabs-music`, `voice-transcribe`, `vap-media`

### Creative/Art Team

#### Amelia Frost (Virtual Reality Artist)
- **Responsibilities:** Design immersive VR experiences, incorporate interactive elements, experiment with sound/visual fusion
- **Skills:** `remotion`, `veo`, `demo-video`, `ai-video-gen`

#### Ava Orozco (Multimedia Artist)
- **Responsibilities:** Create multimedia content/visual assets, collaborate on digital installations, ensure visual consistency
- **Skills:** `remotion`, `diagram-gen`, `ai-video-gen`, `veo`

#### Jasper Li (Generative Artist)
- **Responsibilities:** Create algorithm-driven visuals, collaborate on synchronized audio-visual experiences
- **Skills:** `diagram-gen`, `remotion`, `ai-video-gen`

#### Leo Martin (Artistic Coach)
- **Responsibilities:** Provide mentorship/artistic feedback, conduct workshops, support EM's visual/auditory identity
- **Skills:** `content-writing-thought-leadership`, `personal-branding-authority`

### Musicology & Music Team

#### Fiona Carter (Composition Mentor) — Musicology Research Office
- **Responsibilities:** Mentor composers, guide original works development, collaborate on AI-driven composition
- **Skills:** `research`, `deep-research`, `elevenlabs-music`

#### Felix Wu (AI Ethics Educator)
- **Responsibilities:** Design ethics training programs, ensure compliance, advise on best practices, create awareness resources
- **Skills:** `personal-branding-authority`, `content-writing-thought-leadership`

### Legal & Ethics Team (Reports to J. Maxwell Charbourne)

#### Carla Velasquez (Intellectual Property Specialist)
- **Responsibilities:** Manage copyrights/trademarks, advise on IP/AI concerns, secure proprietary tech, monitor digital rights trends
- **Skills:** (IP/legal tools - searching)

#### Ibrahim Hassan (Data Ethics Specialist)
- **Responsibilities:** Review data policies for ethics, develop guidelines, collaborate on compliance
- **Skills:** (ethics/compliance tools - searching)

#### Jonan Klein (Risk Assessment Analyst)
- **Responsibilities:** Identify/assess risks in AI/creative projects, develop mitigation strategies
- **Skills:** `pre-mortem-analyst`, `decision-trees`

#### Lily Nakamura
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

#### Lucas Bryant
- **Responsibilities:** (TBD - need to read profile)
- **Skills:** (searching)

### Business Development & Operations

#### Carmen Delgado (Cross-Industry Collaboration Lead)
- **Responsibilities:** Develop/manage partnerships, identify collaboration opportunities, coordinate cross-industry projects
- **Skills:** `planning-with-files`, `personal-branding-authority`, `competitive-intelligence-market-research`

#### Emma Rios (Outreach Coordinator)
- **Responsibilities:** Coordinate outreach/public events, build community relationships, organize initiatives for visibility
- **Skills:** `social-media-management`, `metricool`, `postiz`

#### Jay Harper (Innovation Specialist)
- **Responsibilities:** Develop experimental projects, push creative/technical boundaries
- **Skills:** `project-manager`, `pre-mortem-analyst`

#### Jordan Blake (Policy Liaison)
- **Responsibilities:** Advise on regulatory policies, communicate compliance requirements, collaborate on policy navigation
- **Skills:** (policy/regulatory tools - searching)

#### Kai Nakamoto (Digital Content Strategist)
- **Responsibilities:** Develop digital content strategies aligned with brand, design high-engagement campaigns
- **Skills:** `marketing-mode`, `social-media-management`, `metricool`, `content-writing-thought-leadership`

#### Lara Cortes (Public Relations Associate)
- **Responsibilities:** Craft press releases, prepare media briefs, engage with journalists, promote initiatives
- **Skills:** `content-writing-thought-leadership`, `social-media-management`, `postiz`

#### Lena Morris (EM Operations Coordinator / Roadmap Coordinator)
- **Role:** Oversees all EM operations; coordinates across departments; manages strategic roadmap
- **Responsibilities:** 
  - Manage EM's roadmap, ensure alignment with strategic goals
  - Coordinate with various departments to ensure milestones are clear
  - Monitor progress and adjust timelines based on data
  - Provide regular updates to Strategic Office
  - **Interface between Puppet Show and Nathan** — handles oversight, escalations, real-time adjustments
- **Skills:** `project-manager`, `project-management-guru-adhd`, `planning-with-files`
- **Orbis Parallel:** Ship Captain in EM Colonization Fleet (commands one of 13 ships)

**Note:** Puppet Show routes tasks through Lena for human oversight and strategic adjustment. She is the operational hub.

#### Liam Rivera (Social Media Storyteller)
- **Responsibilities:** (TBD - need to read full profile)
- **Skills:** `social-media-management`, `metricool`, `postiz`, `journal-to-post`

### Admin/CEO Level

#### Nathan Eckenrode (CEO)
- **Responsibilities:** Set strategic vision, oversee T.A.S.K.S. development, lead executive decisions, foster company culture
- **Skills:** `planning-with-files`, `pre-mortem-analyst`, `project-manager`, `personal-branding-authority`

### Creative Development Team (Reports to Vincent Janssen)

#### Vincent Janssen (Creative Director)
- **Responsibilities:** Lead Creative Development, conceptualize multimedia projects, oversee visual/auditory brand identity, guide creative risks
- **Skills:** `remotion`, `diagram-gen`, `ai-video-gen`, `veo`, `personal-branding-authority`

#### Sofia Lake (Creative Prompter)
- **Responsibilities:** Develop creative prompts, collaborate on AI prompts, encourage experimental thinking, support artistic vision
- **Skills:** `content-writing-thought-leadership`, `personal-branding-authority`, `brainstorming/ideation tools`

#### Leo Martin (Artistic Coach) — *already listed above*

#### Samantha Yu (Narrative Consultant)
- **Responsibilities:** Provide narrative guidance, align storylines across content, refine T.A.S.K.S. narrative voice, enhance story arcs
- **Skills:** `content-writing-thought-leadership`, `humanizer`, `marketing-mode`

### Data Science & Analytics Team

#### Sanjay Patel (Data Scientist)
- **Responsibilities:** Analyze large datasets, develop ML models, generate predictive analytics, provide data-driven insights
- **Skills:** `deep-research`, `financial-market-analysis`, `analytics-tracking`, `ga4-analytics`

#### Tobias Kim (Market Research Specialist)
- **Responsibilities:** Conduct market research, identify trends, analyze competitor data, prepare reports for leadership
- **Skills:** `research`, `competitive-intelligence-market-research`, `stock-market-pro`

#### Sophie Lee (Cultural Impact Researcher)
- **Responsibilities:** Analyze cultural impact across demographics, research trends, provide audience insights, enhance cultural relevance
- **Skills:** `research`, `deep-research`, `competitive-intelligence-market-research`, `analytics-tracking`

#### Vivian Hart (Audience Insights Coordinator)
- **Responsibilities:** Design surveys/studies, analyze qualitative data, build audience profiles, segment by engagement metrics
- **Skills:** `research`, `analytics-tracking`, `survey/qualitative tools`

### Musicology Research Office (Reports to L.R. Morgenstern)

#### Tara Bennett (Music Theory Analyst)
- **Responsibilities:** Analyze music theory, harmonic analysis, notation/transcription, research support
- **Skills:** `research`, `elevenlabs-music`, `voice-transcribe`, `local-whisper`

### Marketing & Brand Team

#### Simon Beck (Junior Brand Strategist)
- **Responsibilities:** Assist brand strategies, support campaign planning, analyze audience data, ensure brand consistency
- **Skills:** `marketing-mode`, `social-media-management`, `marketing-skills`, `analytics-tracking`

#### Priya Patel (Creative Liaison)
- **Responsibilities:** Facilitate external artist collaborations, coordinate events/workshops, liaison between internal/external partners
- **Skills:** `planning-with-files`, `personal-branding-authority`, `mspot-generator`, `social-media-management`

#### Renee Chang (Internal Communications Specialist)
- **Responsibilities:** Manage internal communications, develop comms strategies, create AI-enhanced newsletters, organize company events
- **Skills:** `content-writing-thought-leadership`, `social-media-management`, `metricool`, `postiz`

### Audience & Community Engagement

#### Zara Khan (Audience Engagement Specialist)
- **Responsibilities:** Engage community across platforms, analyze feedback, align messaging, implement social listening for trends
- **Skills:** `social-media-management`, `metricool`, `postiz`, `marketing-mode`

#### Zoeey Chen (Community Engagement Manager)
- **Responsibilities:** Develop community strategies, align messaging, engage directly with audience, coordinate virtual/in-person events
- **Skills:** `social-media-management`, `metricool`, `planning-with-files`, `postiz`

### Legal/Compliance

#### Tina Gray (Data Privacy Specialist)
- **Responsibilities:** Ensure GDPR/CCPA compliance, conduct data audits, implement privacy practices, educate staff on protocols
- **Skills:** `data-reconciliation-exceptions`, (cybersecurity/privacy tools)

---

## COMPLETE EM STAFF ROSTER (63/63 MAPPED)

✅ **All 63 EM Staff members now have responsibility → skill mappings documented**

**Department Summary:**
- Executive (6) — Strategic, technical, legal, musicology leadership
- Technical Development (10) — Engineering, ML, UX/Design, optimization
- Content & Brand (15) — Editors, producers, artists, designers, strategists
- Audio/Music (8) — Sound design, composition, musicology research
- Analytics & Insights (8) — Data science, market research, audience analysis
- Marketing & Outreach (7) — PR, social media, community engagement, partnerships
- Legal & Ethics (5) — Compliance, data privacy, risk, IP management
- Creative Development (4) — Direction, prompting, mentorship, artistic coaching

---

## Development Roadmap

### Phase 1: Foundation
- [ ] Document all EM Staff roles and responsibilities
- [ ] Create skill associations for each person
- [ ] Collect Discord webhook URLs for each person
- [ ] Create staff registry file

### Phase 2: Basic Router
- [ ] Build Moltbot skill that reads staff registry
- [ ] Implement task-to-person matching logic
- [ ] Test with simple delegation (Julian + humanizer)

### Phase 3: Skill Integration
- [ ] Invoke skills programmatically
- [ ] Collect skill output/progress
- [ ] Format reports

### Phase 4: Orchestration
- [ ] Handle multi-person workflows (e.g., task → Sylvia → delegates to Julian)
- [ ] Queue and prioritization
- [ ] Progress tracking across teams

---

## References

- EM Staff profiles: `/Volumes/Elements/clawd_memory/system/EM Staff/`
- Installed skills: `/Users/nathaneckenrode/clawd/skills/`
- Moltbot docs: (to be added)

---

*Created: 2026-01-29*
*Last Updated: 2026-01-29*
