---
name: prd-generator
description: Turn the owner's idea for a feature into a PRD pack, meaning product requirements plus Mermaid UML use case, activity and sequence diagrams, all in markdown, saved to ../habita-sdlc/PRDs/YYYY-MM-DD-<topic>-prd/. This is the first stage of the Habita pipeline. Use it whenever the owner brings a new feature or idea, says "make the PRD" or "write the requirements" or "draw the use case / activity / sequence diagrams", or asks where to start. Use it even if they say BRD or spec instead of PRD.
---

# PRD Generator

The PRD is the first artifact in the pipeline and the one everything downstream works from:

- **Design stage** (`stageshow` + Figma, in this hub) reads the PRD to know which screens exist, what each control does and which states to draw.
- **Repo stages** (each child repo's own `brainstorming` → `writing-plans` → build) read the PRD and the Figma design to write that repo's design issue, plan issue and code.

None of those readers can ask the owner what was meant, so whatever they need has to be in the PRD. Write for them.

**Announce at start:** "I'm using the prd-generator skill to turn your idea into a PRD."

## Where files live

`habita-sdlc` is the directory next to the hub repo (the hub is the git root that holds `CLAUDE.md`, so `<sdlc>` is `/mnt/d/habita-sdlc`). Work out the path from the hub root, not from the current directory, because sessions sometimes start in subfolders.

| What | Path |
|---|---|
| Input | the owner's idea, in the conversation or in notes they point you to |
| Output folder | `<sdlc>/PRDs/YYYY-MM-DD-<topic>-prd/` |

The output folder holds four files: `prd.md`, `use-cases.md`, `activity-diagrams.md`, `sequence-diagrams.md`. Create the folder with `mkdir -p`. Write nothing into the hub repo or the product repos: planning artifacts don't mix with code history.

## Steps

1. **Ground yourself.** Skim `CLAUDE.md` and earlier folders in `<sdlc>/PRDs/` so IDs, names and tone stay consistent. If the idea changes something that already exists, read the relevant code in the product repos listed in `CLAUDE.md` (read only) and note how it works today, so the PRD describes a change rather than a guess. Do this before asking anything, so you never ask what the code already answers.
2. **Pin down intent.** Ask the owner only what you can't settle yourself: the problem and who has it, the goals (what success looks like), the non-goals, the actors, and which repos are in play. Ask one question at a time, prefer multiple choice, and stop once you can write goals and scope the owner would recognise. Play the goals and non-goals back in a few lines and get a yes before writing.
3. **Pick the folder name.** Date is today. Topic is a short kebab-case slug for the feature.
4. **Write `prd.md`** from `references/prd-template.md`.
5. **Write the three diagram files** following `references/diagram-guide.md`.
6. **Run the self-check** below and fix what it finds.
7. **Hand over.** Reply with the folder path, the list of assumptions you made, and a request for approval. On approval set `Status: Approved (YYYY-MM-DD)` in `prd.md`. The next stage is design (see the pipeline in CLAUDE.md). Don't start it unasked.

## Judgment calls

**Gaps.** Once intent is pinned down, don't reopen it. When something the PRD needs is still open (an actor's limits, a validation rule, an error message), decide, write it down as an assumption `A-n` with your reason, and list the assumptions in your hand-over so the owner can overrule them. Ask first only when the answer would change scope or what gets built. Something the owner ruled out stays out, even when it looks like an obvious extension.

**Product, not developer.** Describe behaviour, rules and what the user sees. Leave class, table, migration and file names to the repo plans, where the sessions that know each codebase decide them. The exception is the interface contract (the "Interface contract" section of `prd.md`): when the feature has a backend API, the contract is the one thing every repo's plan must agree on, so state endpoints and literal request/response bodies there.

**Screens carry their interactions.** The owner wants designs that show what happens when a control is used, not static pictures. So for every screen, list its numbered controls and what each does (`IX-` rows), and its states (empty, loading, error, success). The design stage turns these rows into Figma frames and interactions, and the owner checks the design against them.

**Tag each requirement with the repo that builds it** (Backend, Frontend, Mobile, or several). The backend learns which APIs to build and each client which APIs to call, and each repo's session plans only the rows tagged for it.

**Diagrams are Mermaid.** It renders in VS Code's Markdown preview and on GitHub. Mermaid has no native use case diagram, so use cases are drawn as a styled flowchart (actors, an ellipse per use case, a system boundary). The guide shows the recipe.

## IDs

`G-` goal · `BR-` business rule · `UC-` use case · `FR-` functional requirement · `NFR-` non-functional requirement · `AC-` acceptance criterion · `S-` screen · `IX-` screen interaction · `D-` decision · `A-` assumption · `Q-` open question · `R-` risk. Number from 01 within the PRD. If one PRD covers several parts, prefix every ID with a short part tag (`ADM-FR-03`) so they stay unique.

## Self-check before handing over

- Every goal (`G-`) maps to at least one FR and one AC (the "Traceability" table in `prd.md` shows it); every non-goal appears under out-of-scope.
- Every UC appears in the use case diagram, has a spec in `use-cases.md`, and has an activity diagram or a stated reason it needs none.
- Every sequence diagram's messages match the interface contract's endpoints exactly.
- Every FR names a repo and cites a UC. Every AC cites an FR.
- Every screen has a flow-map entry, numbered controls and all four states.
- Each Mermaid block parses. Mermaid fails on unquoted parentheses or colons in flowchart labels, and on the bare word `end` as a node label. See the guide for how to avoid both.
- `Figma` and `Repo issues` header fields say `pending`. Later stages fill them in.
