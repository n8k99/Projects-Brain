---
title: Journal Scanning and Corpus Project
area: Engineering
Owner: "[[Historical Lore/Master Chronicle/01 Age of Arrival (-10,000 to -9,900 AY)/EM Staff/NathanEckenrode|NathanEckenrode]]"
Project: 🆔 journal-scanning-001
project_status: Phase 0 - Groundwork
---
# Journal Scanning and Corpus Project
## ProjectRegistry
scope: >
    Scan approximately 30 years of handwritten morning pages
    (physical notebooks). Organize scanned pages into a
    structured digital folder hierarchy, run OCR on each page,
    build a searchable text corpus/database, and prepare the
    resulting content for querying and LLM training/integration.

inputs:
  - Physical notebooks (see: [[Morning Pages Catalog]] for listing)
outputs:
  - High-resolution scanned page images
  - OCRed text (per page, per notebook)
  - Structured corpus/database for search and model use
constraints:
  - Preserve all original notebooks (non-destructive scanning)
  - Apply privacy/redaction controls before LLM use
phase: 0 (Groundwork)

## Current State
A basic catalog of notebooks is complete (see [[Morning Pages Catalog]]).  
No scanning or OCR pipeline is yet in place.  
All actionable tasks for this project are maintained in [[TODO]],
referenced by 🆔 journal-scanning-001.

## Related TODO Tasks
- tsk2025-12-01-001 — Stand up this project page and projectRegistry
- tsk2025-12-01-011 — Decide on scanning hardware, resolution, format
- tsk2025-12-01-012 — Define folder naming and org convention
- tsk2025-12-01-013 — Prototype workflow with one notebook
- tsk2025-12-01-014 — Select/configure OCR toolchain
- tsk2025-12-01-015 — Design corpus/database schema
- tsk2025-12-01-016 — Plan for LLM integration

## Links
- [[Morning Pages Catalog]]
- [[TODO]] (`/Volumes/Elements/Nebulab/05 memory-bank/TODO.md`)
