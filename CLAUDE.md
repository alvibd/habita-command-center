# Habita: product hub

This directory is the planning hub, not a codebase. Sessions here own planning. The two child repos own everything after an approved plan.

Planning always goes through the `ai-native-sdlc-customized-planning` skill, which asks which SDLC stage the plan is for:

| Stage | When | Owner | Artifact | Where |
|---|---|---|---|---|
| Plan: BRD generation | No clear idea of what or how | owner + Claude, here | Figma wireframes (approved plan), then `intent.md` + `brd.md` with UML derived from Figma | Figma file "Habita" (one page per BRD); `brds/BRD-NNN-<slug>/` |
| Build planning | No design change (optimization, security, integration), or building an approved BRD | Claude here, approved by the owner | one `plan` GitHub issue per repo per milestone | issues in `habita-backend` and `habita-frontend` |
| Build, test | | Sonnet sessions in each repo | code, tests, PR | `habita-backend/`, `habita-frontend/` |

The owner's last step is approving the plan issues. Ask the owner only about intent, scope and plans. Everything after that is the child repos' job.

## Rules

- Never write or change product code in `habita-backend/` or `habita-frontend/` from here. Read them for research. The hub writes nothing into them except their `.claude/skills/writing-plans/` skill.
- Planning: use the `ai-native-sdlc-customized-planning` skill. It replaces `superpowers:brainstorming` in this workspace, so don't invoke brainstorming here.
- BRD generation: wireframes live only in Figma, built by a subagent; no local prototype files. Approving the plan triggers the `brd-generator` skill, whose UML must match the Figma design.
- Build plans: written by each repo's own `.claude/skills/writing-plans/` skill, run by one subagent per repo (two in parallel when both change). They publish GitHub issues, not files. Don't call `superpowers:writing-plans` anywhere.
- Plain-language notes for the owner go in `sessions/<session-id>/explanation.md` and `Glossary.md`.
- Never run `superpowers:executing-plans`, `superpowers:subagent-driven-development` or `superpowers:using-git-worktrees` here. Execution happens in the child repo.
- Each child repo must build from its own files. Nothing a child session needs may live only in `brds/`, in Figma, or in the other repo.
- Status of the child repos: the `progress` skill (`/progress`).
