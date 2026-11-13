# Habita: AI-native SDLC hub

This directory is the planning hub, not a codebase. It turns an idea into an approved PRD and an approved Figma design. Everything after that (repo design, planning, build, review, PR) happens in each product repo's own session, with that repo's own skills.

## Repositories

All paths are siblings of this hub's root (`/mnt/d/habita`). Work them out from the hub root, not from the current directory.

| Repo | Path | What it is | GitHub |
|---|---|---|---|
| Hub (this one) | `.` | Pipeline skills, `showcase/`, `figma.md` | |
| Backend | `../habita-backend` | Laravel API | `alvibd/Habita-backend` |
| Frontend | `../habita-frontend` | React + Vite web client | `alvibd/habita-frontend` |
| Mobile app | not created yet | | |
| Planning files | `../habita-sdlc` | PRDs, outside every repo | |

When a new repo is created (the mobile app, for example), add a row here with its path and `owner/name` (from `git -C <path> remote get-url origin`). A PRD tags each requirement with the repos in this table.

## The pipeline

| # | Stage | Where | Skill | Input | Output | Owner approves |
|---|---|---|---|---|---|---|
| 1 | PRD | hub | `prd-generator` | an idea | `../habita-sdlc/PRDs/YYYY-MM-DD-<topic>-prd/` (requirements plus Mermaid use case, activity and sequence diagrams) | the PRD |
| 2 | Design | hub | `stageshow` + Figma MCP | the PRD | frames in the Figma file named in `figma.md`, links written into the PRD's `Figma` field | that the design reflects the PRD, verified in Figma |
| 3 | Repo design, plan, build | each product repo | that repo's `brainstorming`, then `writing-plans`, then build | the PRD file + the Figma design | a `design` issue, a `plan` issue, then code on a branch | each repo's design and plan issues |
| 4 | Review and PR | each product repo | `code-review`, `security-review` | the branch | a PR that closes its issues | merge (the owner's call) |

Ask the owner only about intent, scope and approvals. File names, folder layout and diagram choices are yours to decide; say what you did.

### Where am I?

Look at what exists instead of asking: an idea with no PRD folder is stage 1; a PRD not marked `Approved` is still stage 1; an approved PRD whose `Figma` field says `pending` is stage 2; a PRD with verified Figma links is ready for stage 3, which the owner starts in each repo's session.

### Traceability

The PRD is the root. Stage 2 writes the Figma page and frame links into the PRD's `Figma` field. When the repo sessions create their design and plan issues, record the links in the PRD's `Repo issues` field if the owner shares them. Each repo's PR closes its own issues.

### Stage notes

**PRD (1).** `prd-generator` asks the owner about intent, then writes the PRD pack. It tags every requirement with the repo that builds it and states the API contract literally, because every repo's session plans from the same file.

**Design (2).** Read the PRD's screens (`S-` ids, states, `IX-` controls); design nothing it doesn't mention. Use `stageshow` to build the screens and interactions as faux UI, as throwaway scratch work in the session scratchpad. The Figma file is the design record, not that code. Put the result into the Figma file with the Figma MCP: call `create_session` with the file key from `figma.md` first, and load the `figma-use` skill before `use_figma`. One Figma page per PRD, named after the PRD folder, frames named with their `S-` id. Show the owner screenshots, fix what they flag, and when they say the design reflects the PRD, record the links in the PRD. That ends the hub's part.

**Repo stages (3, 4).** These run in the product repos, not here. Each repo's `.claude/skills/` holds its customized `brainstorming` and `writing-plans`, and its `CLAUDE.md` says how it reads the PRD and Figma. To hand off, give the owner the PRD folder path and the Figma page link to start each repo's session with.

## Rules

- Never write or change code in the product repos from here. Read them for research.
- PRDs never go inside this repo or a product repo, and never under `docs/superpowers/`. Use `../habita-sdlc`.
- Don't brainstorm repo designs or write plans from here; that is the repo sessions' job. Don't run `superpowers:brainstorming`, `superpowers:writing-plans`, `superpowers:executing-plans`, `superpowers:subagent-driven-development` or `superpowers:using-git-worktrees` from here.
- Plain-language notes for the owner go in `sessions/<session-id>/explanation.md` and `Glossary.md`.

## Hub contents

- `.claude/skills/stageshow/`: upstream copy of [benjitaylor/skills/stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow), kept unmodified. Run `npm ci` in it before use (`node_modules/` is git-ignored). Put scratch work in the session scratchpad, not in its `examples/`.
- `showcase/`: the Habita Stageshow demos (`habita-phone`, `habita-web`) as a standalone Vite app with its own copy of the kit. `npm ci`, then `npm run dev`, or `npm run build` for a single-file `dist/habita.html`.
- `figma.md`: the Figma file and its key.

## Legacy

`brds/` holds the older BRD (`BRD-standard-project-bootstrap`) from the previous workflow. It is reference material; new work does not add to it.
