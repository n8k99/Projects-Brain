---
title: Morning pages Analysis
Department Head: "[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/ElianaRiviera]]"
---
# Morning Pages Analysis Workflow

**Daily-use automation for transforming raw morning pages into analysis, reflections, and published content.**

## Overview
4-phase CLI workflow that:
1. Analyzes raw morning pages
2. Generates reflective questions
3. Creates psychological assessment (after you answer questions)
4. Publishes polished blog post to Ghost CMS with AI-generated image

**Script:** `scripts/analyze_morning_pages.py` → `scripts/skills/analyze_morning_pages.py`
**Base Module:** `scripts/base_modules/morning_pages.py`
**Daily Notes Location:** `02 Areas/01 TimeNotes/01 Daily Notes/YYYY-MM-DD.md`

## Daily Workflow

### Phase 1: Initial Analysis
**Command:** `tasks analyze [YYYY-MM-DD]`

**What it does:**
1. Extracts content from `## 💡 Morning Pages` section
2. Generates AI analysis (themes, emotional state, key concerns, insights)
3. Appends to `### Analysis` section
4. Generates 5 reflective questions based on analysis
5. Appends to `### Standout Questions` section

**Output:** Daily note updated with Analysis + Questions

**Next step:** Answer the 5 questions in your daily note

---

### Phase 2: Psychological Assessment
**Command:** `tasks analyze resume [YYYY-MM-DD]`

**What it does:**
1. Reads your answered questions from `### Standout Questions`
2. Generates formal T.A.S.K.S. Psychological Assessment
3. Appends to `### Psychological Assessment` section

**Output:** Daily note updated with Assessment

**Requirements:** Must answer Standout Questions first (script checks for >100 chars)

---

### Phase 3: Ghost Publishing
**Command:** `tasks analyze publish [YYYY-MM-DD]`

**What it does:**
1. Rewrites morning pages + Q&A in Executive voice (rotates by day of week)
2. Generates 2-3 word thematic title
3. Generates AI featured image based on themes/cognitive state
4. Uploads image to Ghost
5. Publishes as blog post (400-600 words)

**Executive Rotation:**
- Monday: Nathan (CEO) - first person
- Tuesday: Vincent (CCO, Amsterdam) - third person at café
- Wednesday: Maxwell (CSO, Toronto)
- Thursday: Eliana (CTO, Barcelona)
- Friday: LR (CAO, Prague)
- Saturday: Kathryn (COO, NYC)
- Sunday: Sylvia (Chief of Content, LA)

**Output:** Published Ghost blog post + featured image

**Flags:**
- `--no-image`: Skip image generation

---

### Phase 4: Music Generation (Optional)
**Command:** `tasks analyze music [YYYY-MM-DD]`

**What it does:** Generates music based on morning pages themes (experimental)

---

```ad-info
title: Technical Details

## Daily Note Structure
### 💡 Morning Pages
{Your raw morning pages writing}
### Analysis
{AI-generated analysis - Phase 1}
### Standout Questions
{5 AI-generated questions - Phase 1 Your answers go here}
### Psychological Assessment
Formal T.A.S.K.S. assessment - Phase 2

```
### Modular Components
All powered by `base_modules/morning_pages.py`:

**MorningPagesExtractor**
- Finds daily note in `01 Daily Notes/`
- Regex extracts: morning_pages, analysis, standout_questions, psychological_assessment
- Returns `MorningPagesContent` dataclass

**MorningPagesWriter**
- Updates or appends sections in daily notes
- Preserves existing content

**MorningPagesAnalyzer**
- `analyze()` - AI analysis of themes/emotional state
- `generate_questions()` - 5 tagged reflective questions
- `psychological_assessment()` - Formal assessment from Q&A

### AI Service Integration
Uses `base_modules/ai_service.py` (OpenAI/Anthropic/local models)
- Analysis prompt: reflective, analytical
- Questions prompt: thought-provoking, tagged
- Assessment prompt: clinical + creative language
- Blog rewrite: Executive voice + café setting details

### Ghost Publishing Details
- API client: `base_modules/ghost_client.py`
- Image generation: `get_morning_pages_image_generator()`
- Voice instructions vary by Executive (first vs third person)
- Fallback title if AI fails: "Reflections YYYY-MM-DD"
- Placeholder image if generation fails

---

## Error Handling
- **Daily note not found:** Checks multiple possible paths
- **No morning pages:** Exits with error
- **Questions not answered:** Phase 2 requires >100 chars
- **Image generation fails:** Creates placeholder + uploads
- **Image upload fails:** Continues without image
- **AI service fails:** Returns error with context

## Configuration
Lives in `config.json` at vault root:
- `vault_path`: Path to Nebulab vault
- Ghost API credentials
- AI service credentials
- Image generation settings
