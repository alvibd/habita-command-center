# BRD-standard-project-bootstrap: intent

| Field | Value |
|---|---|
| Status | Approved and delivered (version 1.0, 2026-11-05). Merges the intent of BRD-001 (approved 2026-10-26) and BRD-002 (approved 2026-11-01). One milestone, the Part B live-API test run (FE-M3, issue #9), is still open |
| Date | 2026-11-05 |

## What
Bootstrap the Habita platform so it knows who its people are and what each may do.

- **Staff** get an admin panel to manage roles, permissions and administrative users, with two seeded tiers: Super Admin and Admin (Part A).
- **The audience** can create an account, prove they own their email, log in, stay logged in on their device, and recover a forgotten password (Part B).

## Why now
Everything Habita adds later needs both: admin features need to know who may administer what, and every audience feature needs an account. This is the foundation, so it was built first.

## Who
- **Super Admins and Admins** run the admin panel. Admins can never grant or touch more than they hold.
- **Visitors** create an account and verify their email.
- **Account holders** log in, stay logged in, log out, and recover their password. They show up in the admin Users list with no roles, where admins can deactivate them.

## Success
- A Super Admin can create staff, roles and permissions, and an Admin can only act within their own limits. Changes apply on the next request.
- Someone goes from Register to logged in using only the emails they receive. Someone who forgot their password recovers it the same way.
- All of it works on a laptop with no real mail provider: development mail lands in a local inbox the owner can open.
- A locked-out admin team can recover with a seeder run or a command.

## Non-goals
- Self-service profile, change-email and change-password screens, for staff or audience.
- Restoring deleted users, an audit log, cleaning up accounts that never verify.
- Social or passwordless login.
- The audience home screen (a marked placeholder stands in).
- Terms of Service and Privacy Policy pages (the links are placeholders).
- A real mail provider.
- A forgot-password link on the admin login.

## Anti-goals
- No one can escalate their own privileges: nobody assigns a role, or modifies a user, holding more permissions than they do.
- The forgot-password and resend flows must not reveal who has an account.
- Audience styling must not change the admin panel, and the approved glass design must not be restyled.

## Already decided
- Wireframes live only in Figma (page "BRD-standard-project-bootstrap" of the Habita file), not as local prototype files (owner, 2026-11-05).
- The admin panel is a React single-page app calling a JSON API, with JWT sessions and permission-based (not role-name-based) authorisation.
- Register gains a Name field. Mail templates are Markdown and, in development, go to a Mailpit inbox. Forgot password and email verification are in scope.
- The full list of decisions is in the BRD's §A17 and §B17.

## Open for the BRD
Nothing. The BRD records every owner decision.
