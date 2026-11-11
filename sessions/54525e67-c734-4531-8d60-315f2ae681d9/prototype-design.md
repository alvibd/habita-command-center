# Clickable prototype page: short design

Date: 2026-11-07. Figma file: https://www.figma.com/design/Knmt6pvU4GRvL3M5dCd1Mj/Habita

## Intent
Make the approved Habita screens playable: clicking a control (for example "Edit" on the Roles list) opens the screen or dialog it leads to. The existing spec page stays as it is.

## Goals / non-goals
- Goal: the main path, where everything succeeds, can be played from start to finish in Figma's Present mode, for both Admin and Audience.
- Non-goal: validation errors, failure states and their interactions (owner's decision).
- Non-goal: alternate views (Admin viewer, self view, cannot modify, link expired, session expired, too many attempts, system states, mobile layouts).
- Anti-goal: changing anything on the spec page "BRD-standard-project-bootstrap".

## Approaches
- **A. Separate "Prototype" page with plain copies (picked by owner).** Clean screens, spec page untouched. Cost: copies don't follow later spec edits; re-copy a screen when it changes.
- B. Link the spec page in place. Rejected: Play would show the spec notes and badges, and the spec page would change.
- C. Turn the screens into components and use linked copies. Rejected: restructures the spec page, and hidden badges come back whenever an original changes.

## Design
New page **"Prototype"**. Copy each screen below (the screen frame, not its board or Interactions panel). On the copies, remove the numbered badges, the spec header lines ("ADM-S-20 · /admin/roles · …") and screen-title captions. Lay the copies out in two rows: Admin and Audience.

Two flow starting points: **"Admin"** (start: ADM-S-01 Login) and **"Audience"** (start: AUD-S-01 Register).

**Admin** (destinations follow the ADM-IX rows):
- ADM-S-01 Login: "Log in" → ADM-S-10 Users list.
- Sidebar Users / Roles / Permissions → that list, on every admin screen. "Log out" → ADM-S-01.
- ADM-S-10 Users list: "New user" → ADM-S-11 Create user. Row "Edit" → ADM-S-12 Edit user.
- ADM-S-11: Save → ADM-S-10. Cancel → ADM-S-10.
- ADM-S-12 Edit user: "← Back to users" → ADM-S-10. "Save details" and "Save roles" stay on ADM-S-12 (no link). "Change password" → ADM-S-13 dialog; its save closes the dialog. "Deactivate" → ADM-S-15 dialog; its confirm → ADM-S-12 (deactivated) copy, whose "Reactivate" → ADM-S-12. "Delete user" → ADM-S-14 dialog; its confirm → ADM-S-10. The ADM-S-12 confirm-remove-admin dialog is opened by a hotspot on "Save roles"; Continue and Cancel both close it.
- ADM-S-20 Roles list: "New role" → ADM-S-21 (create mode). Row "Edit" → ADM-S-21 Role form. Row "Delete" → ADM-S-22 dialog.
- ADM-S-21: Save / Cancel → ADM-S-20.
- ADM-S-30 Permissions list: New / Edit → ADM-S-31 Permission form. Delete → ADM-S-32 dialog.
- ADM-S-31: Save / Cancel → ADM-S-30.
- Dialogs open as centered overlays with a dimmed background. Cancel closes the overlay. Confirm closes it, except as noted above (ADM-S-14 → ADM-S-10, ADM-S-15 → deactivated view).

**Audience** (destinations follow the AUD-IX rows):
- AUD-S-01 Register: "Create account" → AUD-S-01b Check your email. "Log in" → AUD-S-02 Log in.
- AUD-S-01b: clicking the card → the "Verify your Habita email" email. Its Verify button → AUD-S-02 Log in (email verified). "Back to log in" → AUD-S-02.
- AUD-S-02 Log in: "Log in" → AUD-S-05 Home. "Forgot password?" → AUD-S-03. "Create an account" → AUD-S-01.
- AUD-S-05 Home: "Log out" → AUD-S-02.
- AUD-S-03 Forgot password: "Send reset link" → AUD-S-03b. "Back to log in" → AUD-S-02.
- AUD-S-03b: clicking the card → the "Reset your Habita password" email. Its button → AUD-S-04 Reset password.
- AUD-S-04: "Update password" → AUD-S-04b Password updated → "Continue to log in" → AUD-S-02.

Transitions: instant for page changes, dissolve for overlays.

## Calls made by Claude (correct if wrong)
- Desktop screens only; mobile variants left out.
- No success toasts after Save or Delete: each would need an extra screen copy.
- Search, pagination, checkboxes and field typing have no links (a Figma prototype can't take input).
- The two email frames are included so verification and reset can be played end to end.

## Left to the builder
Exact hotspot placement, overlay positioning, and the canvas layout of the copies. Built by a subagent using the Figma MCP. The spec page is read only.
