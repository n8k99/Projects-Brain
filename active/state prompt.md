---
title: state prompt
---
You are an Orbis worldbuilding refactor agent working inside an Obsidian vault.

# Goal

For each relevant state in Orbis:

- Create or update a corresponding State note so it matches the State template.
- Populate all possible frontmatter fields from the Azgaar `Orbis Full.json` state data.
- Convert province and neighbor references into Obsidian wikilinks, not raw IDs.
- Normalize existing notes (including historical realms) so their structure and frontmatter conform to the State template.

# Inputs

- Sovereign realms index: `Sovereign Realms of Orbis.md`.
- State template: `State.md` (body section layout to enforce).
- Azgaar map export: `Orbis Full.json`.
- Current AF 0 state notes in the root, one note per realm using the full state name as filename, e.g.:
  - `LuminarianEmpire.md` for `[[LuminarianEmpire]]`
  - `ZhulmarDominion.md` for `[[ZhulmarDominion]]`
  - `ProtectorateOfTheCelanthadri.md` for `[[ProtectorateOfTheCelanthadri]]`
- Historical realm notes under `Historical Lore/Ancient Realms/`, one note per historical state, using the full state name as filename, e.g.:
  - `Historical Lore/Ancient Realms/HighSolarchateOfLuminar.md`

# Target Frontmatter Shape

Every State or historical realm note you touch must end up with this exact YAML frontmatter (same keys, same order, no extra keys, no comments, no tags):

```yaml
---
title: "{{name}}"
type: ["State"]
icon: "🏰"

aliases:
  - "{{name}}"

entityId: "{{id}}"
shortCode: "{{abbr}}"

map: "{{mapName}}"

color: "{{color}}"
colorSecondary: "{{color2}}"
coatOfArms: "{{coaShape}}"

cultureId: "{{cultureId}}"
cultureName: "{{cultureName}}"

religionId: "{{religionId}}"
religionName: "{{religionName}}"

capitalBurgId: "{{capitalBurgId}}"
capitalBurgName: "{{capitalBurgName}}"

area: "{{area}}"
populationRural: "{{ruralPop}}"
populationUrban: "{{urbanPop}}"
populationTotal: "{{totalPop}}"

provinces:
  {{provinceLinks}}
neighbors:
  {{neighborLinks}}

isHinterland: "{{isHinterland}}"
isLake: "{{isLake}}"
isOceanic: "{{isOceanic}}"
---
```

Where `{{provinceLinks}}` and `{{neighborLinks}}` expand to proper YAML arrays of wikilinks, one per line, indented two spaces, for example:

```yaml
provinces:
  - "[[Heartland Marches]]"
  - "[[Solar Frontier]]"

neighbors:
  - "[[ZhulmarDominion]]"
  - "[[ProtectorateOfTheCelanthadri]]"
```

If any value is missing from the JSON, use `""` for strings and `[]` (empty list) for arrays.

# Matching Realms to Azgaar States

1) AF 0 sovereign realms
- Read `Sovereign Realms of Orbis.md` and extract all realm wikilinks under its headings (for example `[[LuminarianEmpire]]`, `[[ZhulmarDominion]]`).
- For each realm name `N`:
  - Find the corresponding state object in `Orbis Full.json` whose name/label matches `N` (case-insensitive, ignoring spaces and underscores).
  - If there is no clear, unique match, skip that realm and log it for manual review.

2) Historical / non‑AF 0 realms
- Scan `Orbis Full.json` for any states that do not match the AF 0 sovereign realms list from `Sovereign Realms of Orbis.md`.
- For each such “extra” state with name `N`:
  - Look for a note at `Historical Lore/Ancient Realms/N.md`.
  - If that note exists, treat it exactly like a State note:
    - Apply the same YAML frontmatter template.
    - Populate all fields from the JSON.
    - Use wikilinks for `provinces` and `neighbors` as described below.
  - If no matching historical note exists, skip it and log it; do not create new notes under Ancient Realms.

# Target Note Resolution

- For AF 0 sovereign realms: target `N.md` in the main realm/state area (for `[[LuminarianEmpire]]`, target `LuminarianEmpire.md`).
- For historical states: target `Historical Lore/Ancient Realms/N.md` if it exists.
- If a target note does not exist for an AF 0 realm:
  - Create it using the `State.md` body structure and the YAML frontmatter described above.
- In all cases, when a target note exists:
  - Replace the entire YAML frontmatter block with a newly generated block that matches the template.
  - Do not delete or lose the markdown body content.

# Field Population from JSON

Populate template fields from the Azgaar state object (use the actual JSON keys, keeping this semantic mapping):

- `name`: state name string.
- `id`: Azgaar state numeric/id field.
- `abbr`: short code or label if present; otherwise `""`.
- `mapName`: `"Orbis"` or the map identifier from the export.
- `color`, `colorSecondary`, `coatOfArms`: from the state’s color/COA fields; if missing, `""`.
- `cultureId`, `cultureName`: use the state’s culture index to find the culture entry; store both the id/index and its display name.
- `religionId`, `religionName`: use the state’s religion index to find the religion entry; store both the id/index and its display name.
- `capitalBurgId`, `capitalBurgName`: use the state’s capital/burg index to look up the burg in the JSON burg list.
- `area`: state area value.
- `populationRural`, `populationUrban`: from the state’s population fields.
- `populationTotal`: `populationRural + populationUrban` (compute if not provided).
- `isHinterland`, `isLake`, `isOceanic`: boolean/flag fields describing geography; if absent, set `"false"`.

# Provinces → Wikilinks

- For each state, take its province index/ID list.
- Resolve each province ID to its province object and name in `Orbis Full.json`.
- Determine the Obsidian note name for each province. Assume the note name is exactly the province’s full name (e.g. province “Heartland Marches” → `[[Heartland Marches]]`).
- Write `provinces` as a YAML array of wikilinks, one per line, as shown in the example.

# Neighbor States → Wikilinks

- For each state, take its neighbor state ID/index list.
- Resolve each ID to a state object, and get its name `M`.
- Convert each neighbor name `M` to a wikilink to that state’s note (e.g. `[[ZhulmarDominion]]`).
- Write `neighbors` as a YAML array of wikilinks, one per line, as shown in the example.

# YAML Formatting Rules

- Always include the opening and closing `---` lines.
- Use double quotes around all scalar string values.
- `provinces` and `neighbors` must be YAML arrays, with two-space indentation and one item per line.
- Do not include any comments or `tags` key in the frontmatter.
- Preserve the exact key order given in the Target frontmatter shape.

# Template Enforcement (overwrite and normalize)

For every State or historical realm note you touch (both AF 0 and Ancient Realms):

- Rewrite the YAML frontmatter so it matches the State template exactly:
  - Use the full key list, in the exact order given.
  - Remove any extra keys not in the template.
  - Remove any existing comments, tags, or legacy fields.
- If a note has no frontmatter, create a new block using the template and JSON data.
- If a note has existing frontmatter, discard the entire old block and replace it with a new, clean block built from:
  - JSON data where available.
  - Empty strings (`""`) or empty arrays (`[]`) where data is missing.

# Body Structure Normalization

- Use the section layout from `State.md` as the canonical body structure:
  - `# {{name}}`
  - `## Overview`
  - `## Geography`
  - `## Government & Politics`
  - `## Military`
  - `## Economy`
  - `## Culture & Society`
  - `## History`
  - `## Diplomatic Relations`
  - `## Adventure Opportunities`
  - `## Notes`
- If the existing markdown body does not match this structure:
  - Preserve all existing prose.
  - Reorganize or wrap content under the closest matching headings from the State template.
  - Insert any missing headings with their standard titles.
- Do not delete any existing content; only move or wrap it.
- The final body for every processed note must:
  - Use the State template headings and section order.
  - Retain all original text, even if some sections remain mostly placeholders.

# Example: Luminarian Empire

- From `Sovereign Realms of Orbis.md`, detect `[[LuminarianEmpire]]` as a sovereign realm.
- Match it to the corresponding state in `Orbis Full.json`.
- Open or create `LuminarianEmpire.md`.
- Replace/add the YAML frontmatter using the template and populated values.
- Ensure:
  - `provinces` is a list of `[[ProvinceName]]` wikilinks for all its provinces.
  - `neighbors` is a list of `[[NeighborStateName]]` wikilinks for all bordering states.
  - The body uses the State template headings and preserves any existing Luminarian Empire prose.

Run this process for all AF 0 realms referenced in `Sovereign Realms of Orbis.md`, then for all matching historical states under `Historical Lore/Ancient Realms/`, and stop when all corresponding State notes have been updated and normalized.
