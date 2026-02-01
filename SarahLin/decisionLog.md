---
title: Decision Log — SarahLin
project: SarahLin
---

# Decision Log — SarahLin

## Decision 1: Service Layer, Not Full Agent (2026-02-01 02:26)

**Problem:** Should SarahLin be built like T.A.S.K.S. (full autonomous agent with SOUL.md, operating system, behavioral framework)? Or something lighter?

**Alternatives Considered:**
1. Full agent (T.A.S.K.S. model) - comprehensive but heavy
2. Service layer (workflows + email agent) - focused, lighter (chosen)
3. Hybrid (part agent, part service) - splits focus

**Decision:** Service layer combining n8n workflows, email agent, calendar management, Puppet Show hooks.

**Reasoning:**
- T.A.S.K.S. is the thinking agent; SarahLin is the executor/coordinator
- SarahLin doesn't need self-improvement or proactive ideation (T.A.S.K.S. handles that)
- SarahLin needs focus: keep Nathan's calendar sane, coordinate staff, sync deadlines
- Lighter implementation means faster deployment

**Impact:**
- SarahLin uses n8n as engine, not a full agent framework
- Integrates with T.A.S.K.S. (takes directives) vs. replacing her
- Simpler architecture, clearer scope

---

## Decision 2: GitHub/Calendar as Phase 1 Priority (2026-02-01 02:26)

**Problem:** Multiple phases of work to do (calendar integration, email agent, Puppet Show, automation). What's first?

**Alternatives Considered:**
1. Email agent first (lots of incoming mail to manage)
2. GitHub/Calendar first (most critical blocker) (chosen)
3. Puppet Show first (coordinate staff)
4. All at once (too broad)

**Decision:** Start with GitHub Milestones ↔ Apple Calendar integration

**Reasoning:**
- Solves the immediate problem: "how do I see project timelines in my calendar?"
- GitHub/Calendar integration is a building block for everything else
- Email agent and Puppet Show can integrate into this foundation
- Fast win: visible impact within days

**Impact:**
- Phase 1 is GitHub/Calendar/Daily Notes sync
- Phase 2 adds email agent and Puppet Show
- Phase 3 optimizes and adds AI assistance

---

## Decision 3: n8n as Automation Engine (2026-02-01 02:26)

**Problem:** How should SarahLin automate workflows? Use n8n (already deployed) or build custom integration layer?

**Alternatives Considered:**
1. Custom Python/Node integration (heavyweight)
2. n8n workflows (already available) (chosen)
3. Zapier/Make (external service)
4. Cron + scripts (manual, fragile)

**Decision:** Use n8n as primary automation engine

**Reasoning:**
- Already deployed on localhost:5678
- Powerful for workflow automation
- Easy to modify/extend without code
- Visual workflow builder
- Can integrate with GitHub, Calendar APIs, email

**Impact:**
- All SarahLin automations live in n8n
- Scalable: add new workflows without rebuilding
- Maintainable: workflows visible in UI, not hidden code

---

## Decision 4: Email Agent as Module (2026-02-01 02:26)

**Problem:** How should email agent be built? Separate service? n8n module? Existing email client integration?

**Alternatives Considered:**
1. Standalone email service (heavyweight)
2. n8n email workflows (chosen)
3. Gmail API direct integration
4. Outlook/Apple Mail native automation

**Decision:** Email agent as n8n workflows + potential AI routing

**Reasoning:**
- Integrates with n8n foundation
- Can read Gmail/Outlook via API
- Workflow: read → classify → route → summarize
- Scalable to Puppet Show integration (route to specific staff)

**Impact:**
- Email handling automated through n8n
- Easy to add AI-assisted routing later
- Can trigger calendar updates (e.g., "deadline just moved")

---

## Open Questions

1. **Apple Calendar API** — Is there existing integration, or do we need to set it up?
2. **Puppet Show protocol** — How does SarahLin trigger staff assignments with deadlines?
3. **Email routing logic** — How does email agent decide which staff member handles what?
4. **Conflict resolution** — What happens if Nathan changes a date manually vs. n8n auto-setting it?
