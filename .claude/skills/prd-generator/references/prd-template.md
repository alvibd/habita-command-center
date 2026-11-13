# `prd.md` template

Use these headings in this order. Drop a section only if it truly doesn't apply, and then keep the heading with one line saying why, so a reader knows it wasn't forgotten.

````markdown
# PRD: <Title>

| Field | Value |
|---|---|
| Status | Draft |
| Date | YYYY-MM-DD |
| Diagrams | [Use cases](use-cases.md) · [Activity](activity-diagrams.md) · [Sequence](sequence-diagrams.md) |
| Repos affected | the repos from CLAUDE.md this touches, e.g. habita-backend, habita-frontend |
| Figma | pending (filled in by the design stage) |
| Repo issues | pending (each repo's design and plan issue links, recorded once the repo sessions create them) |

## Purpose and scope
Why this exists and why now, in the owner's terms. Then:
- **Goals:** `G-01` … one observable outcome each, as the owner agreed them.
- **In scope:** bullets.
- **Out of scope:** bullets. The owner's non-goals, so no repo builds them.

## Actors and glossary
| Actor / term | Meaning |
|---|---|
Who uses this (people and external systems) and any word that has a specific meaning here.

## Business rules
| ID | Rule |
|---|---|
| BR-01 | A rule that holds regardless of screen or API (limits, permissions, uniqueness, timing). Include worked examples for anything subtle. |

## Use cases
| ID | Name | Actor | Summary |
|---|---|---|---|
| UC-01 | | | One line. Full specs are in [use-cases.md](use-cases.md). |

## Functional requirements
| ID | Requirement | Repo | Use case |
|---|---|---|---|
| FR-01 | The system shall … (one testable behaviour) | Backend / Frontend / Both | UC-01 |

## Non-functional requirements
| ID | Requirement |
|---|---|
| NFR-01 | Performance, security, accessibility, privacy, compatibility, observability: with a number or a checkable condition each. |

## Screens and interactions
Skip for a feature with no UI, and say so.

**S-00 flow map.** A Mermaid flowchart or a list of `S-xx → S-yy (on which control)` showing how screens connect.

For each screen:

### S-01 <Screen name>
- **Who / when:** actor and the moment they land here.
- **Purpose:** one sentence.
- **States:** empty · loading · error · success, and what each shows (include the exact copy for messages).
- **Controls and interactions:**

| # | Control | What happens | Result / next screen | Requirement |
|---|---|---|---|---|
| 1 | "Create account" button | Validates fields, calls the registration API | Success → S-02. Failure → inline errors | IX-S01-01 · FR-03 |

## Interface contract
Include when a backend API is involved; this is what both repos' plans copy from.

| Method | Path | Auth | Purpose | Requirement |
|---|---|---|---|---|

For each endpoint: request body, validation rules, success response, and every error response with its status code, as literal JSON. State the error envelope once. Anything a client relies on (a redirect target, a link format in an email) goes here too.

## Acceptance criteria
| ID | Given / When / Then | Covers |
|---|---|---|
| AC-01 | **Given** … **When** … **Then** … | FR-01, UC-01 |

## Decisions, assumptions, questions, risks
| ID | Type | Entry | Reason / owner |
|---|---|---|---|
| D-01 | Decision | Something the owner decided while pinning down intent. | |
| A-01 | Assumption | A call you made where the owner was silent. | Why. Owner may overrule. |
| Q-01 | Open question | | Who can answer |
| R-01 | Risk | | Mitigation |

## Traceability
| Goal | Requirements | Acceptance |
|---|---|---|
| G-01 | FR-01, FR-02 | AC-01 |
````
