# Habita: Business Requirement Documents

This directory holds every BRD for Habita. Each BRD gets its own folder. Wireframes live only in Figma, not in this folder.

```
brds/
  README.md                              <- this index
  BRD-standard-project-bootstrap/
    brd.md                               <- one BRD: shared front section, Part A (admin access control, ADM-), Part B (audience accounts, AUD-); requirements, rules, UML, API contract, acceptance criteria
    intent.md                            <- short statement of intent
    acceptance.md                        <- owner's cross-repo acceptance walkthrough (runs against the local Docker stack, mail in Mailpit)
```

BRD-001 and BRD-002 were merged into BRD-standard-project-bootstrap on 2026-11-05.

## Index

| ID | Title | Status | Repos affected | Wireframes (Figma) | Build plans (`plan` issues) |
|----|-------|--------|----------------|--------------------|-----------------------------|
| [BRD-standard-project-bootstrap](BRD-standard-project-bootstrap/brd.md) | Platform bootstrap: admin access control (Part A) and audience accounts (Part B) | Approved and delivered, v1.0 (2026-11-05). Part B live-API tests (FE-M3, #9) still open | habita-backend, habita-frontend | [Habita file](https://www.figma.com/design/Knmt6pvU4GRvL3M5dCd1Mj/Habita?node-id=0-1), page "BRD-standard-project-bootstrap" (sections "Admin (ADM)" and "Audience (AUD)") | Part A: BE [#3](https://github.com/alvibd/Habita-backend/issues/3) · [#4](https://github.com/alvibd/Habita-backend/issues/4) · [#5](https://github.com/alvibd/Habita-backend/issues/5) · [#6](https://github.com/alvibd/Habita-backend/issues/6), FE [#2](https://github.com/alvibd/habita-frontend/issues/2) · [#3](https://github.com/alvibd/habita-frontend/issues/3) · [#4](https://github.com/alvibd/habita-frontend/issues/4) · [#5](https://github.com/alvibd/habita-frontend/issues/5). Part B: BE [#8](https://github.com/alvibd/Habita-backend/issues/8) · [#9](https://github.com/alvibd/Habita-backend/issues/9), FE [#7](https://github.com/alvibd/habita-frontend/issues/7) · [#8](https://github.com/alvibd/habita-frontend/issues/8) · [#9](https://github.com/alvibd/habita-frontend/issues/9) |

BRD-001 and BRD-002 were merged into BRD-standard-project-bootstrap on 2026-11-05.

## Conventions

- BRD folders are named `BRD-<slug>` (or `BRD-NNN-<slug>` for numbered ones).
- IDs inside a BRD: `BR-` business rule, `UC-` use case, `FR-` functional requirement, `NFR-` non-functional requirement, `AC-` acceptance criterion, `D-` decision, `Q-` open question, `R-` risk, `T-` implementation task, `S-` screen, `IX-` screen interaction (one per control that does something). When one BRD combines several parts, every ID carries the part's prefix (`ADM-BR-06`, `AUD-FR-UI-04`, `ADM-IX-S10-05`), and rules shared by the parts are `SH-`.
- Diagrams are Mermaid, so they render in VS Code's Markdown preview and on GitHub.
- `/mnt/d/habita` is a git repository, so this folder is version-controlled with the rest of the hub.
