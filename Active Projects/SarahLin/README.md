---
title: SarahLin — EM Executive Personal Assistant
project: SarahLin
status: 🟡 In Development
created: 2026-02-01
scope: Calendar management, scheduling, email coordination, Puppet Show orchestration
---

# SarahLin — EM Executive Personal Assistant

Sarah Lin is the Executive Personal Assistant for CEO Nathan Eckenrode at Eckenrode Muziekopname.

Her role: **Keep Nathan's schedule coordinated, ensure projects have clear timelines, orchestrate EM Staff through Puppet Show, manage email/calendar integration.**

Not a full autonomous agent like T.A.S.K.S., but a **service layer** combining:
- n8n workflow automation
- Email agent
- Calendar management
- Puppet Show staff coordination

---

## Core Responsibilities

### 1. Calendar & Schedule Management
- Populate daily notes with start/due dates for projects
- Maintain GitHub milestone dates (sync with Apple Calendar)
- Flag scheduling conflicts
- Ensure project timelines are clear and documented

### 2. Email & Communication Coordination
- Email agent for managing correspondence
- Route messages to appropriate EM Staff
- Summarize inbound communications
- Flag urgent items

### 3. n8n Workflow Automation
- Create automations for repetitive tasks
- Sync GitHub → Calendar → Daily Notes
- Trigger notifications for upcoming deadlines
- Coordinate data flow between systems

### 4. Puppet Show Integration
- Orchestrate EM Staff assignments via Puppet Show
- Ensure delegated tasks have clear deadlines
- Track staff availability
- Coordinate across departments

### 5. Timeline & Documentation
- Ensure all projects have clear start/due dates
- Update daily notes with scheduling information
- Maintain master timeline view
- Report on upcoming deadlines and blockers

---

## Infrastructure

### Service Components

**n8n Workflows**
- Location: `/Volumes/Elements/Development/n8n/`
- Purpose: Automation connecting GitHub → Calendar → Daily Notes
- Trigger: Daily (morning), on-demand, event-based

**Email Agent**
- Type: Can be integrated with existing email system or built as n8n module
- Purpose: Sort, route, flag, summarize incoming mail
- Output: Notifications, summaries to daily notes

**Calendar Integration**
- Source: GitHub Milestones (Atom feed)
- Destination: Apple Calendar
- Sync: Daily/bidirectional
- Purpose: Single source of truth for all deadlines

**Puppet Show Hook**
- Purpose: Coordinate EM Staff assignments with calendar
- Integration: When task assigned, ensure deadline is set; notify assignee

---

## Implementation Phases

### Phase 1: Foundation (Starting 2026-02-01)

**What SarahLin needs:**
1. GitHub integration (read milestones, create/update issues)
2. Calendar subscription (n8n → GitHub → Apple Calendar)
3. Daily notes population (add start/due dates automatically)
4. Workflow templates for common tasks

**Deliverables:**
- README (this file)
- activeContext.md (current work)
- Workflow templates (GitHub, calendar, email)
- Integration mapping (which systems talk to which)

### Phase 2: Automation (2026-02-15+)

**What to build:**
- n8n workflows operational
- Email agent functional
- Puppet Show integration live
- Calendar syncing automated

### Phase 3: Optimization (TBD)

**What to refine:**
- AI-assisted scheduling (suggest optimal dates)
- Predictive flagging (warn before conflicts)
- Staff availability tracking
- Advanced automation

---

## Success Criteria

**Phase 1 Complete When:**
- [ ] Project structure documented
- [ ] GitHub/Calendar integration mapped
- [ ] n8n workflow templates created
- [ ] Email agent architecture designed
- [ ] Puppet Show integration points identified
- [ ] Daily notes population method defined

---

**Status:** Project created 2026-02-01. Ready for implementation planning.
