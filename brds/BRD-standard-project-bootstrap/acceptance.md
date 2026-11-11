# BRD-standard-project-bootstrap: acceptance walkthrough

The owner's manual Test step for the whole bootstrap: Part A (admin access control, `ADM-`) and Part B (audience accounts, `AUD-`). It runs against the local Docker stack, and every email is read in Mailpit. Spec: [brd.md](brd.md) v1.0. Wireframes: [Figma, page "BRD-standard-project-bootstrap"](https://www.figma.com/design/Knmt6pvU4GRvL3M5dCd1Mj/Habita?node-id=0-1).

Part A and Part B step numbers are separate (A1, A2, B1, B2, ...). Run Setup first, then Part A, then Part B, then the cross-part checks. Cross-part checks need the users made in both parts.

> **Status note.** The live-API test milestone for Part B (FE-M3, issue #9) is still open, so `AUD-AC-LIVE-01…03` are not yet automated. Steps B1 to B30 below are the manual equivalent.

## Setup

1. Pull `master` in `habita-backend` and `habita-frontend`.
2. Check `habita-backend/.env`. In the local stack the API is published on port 8000, and `APP_URL` must match the address the API answers on:
   ```
   APP_PORT=8000
   APP_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:5173
   MAIL_MAILER=smtp
   MAIL_HOST=mailpit
   MAIL_PORT=1025
   QUEUE_CONNECTION=database
   ```
   `habita-frontend/.env.local` has `VITE_API_BASE_URL=http://localhost:8000`. If you run on port 80 instead (the `.env.example` defaults), drop `:8000` everywhere below.
3. From `/mnt/d/habita`, run `docker compose up -d --build`. This starts Laravel, Postgres, Redis, the `queue` worker, Mailpit and the Vite frontend together.
4. Run `docker compose exec laravel.test php artisan migrate:fresh --seed`. This seeds the access-control catalogue and the development Super Admin **`test@example.com`** with password **`password`** (development only).
5. Open three tabs: the app at `http://localhost:5173`, the admin panel at `http://localhost:5173/admin`, and the Mailpit inbox at `http://localhost:8025`.
6. Optional: `docker compose exec laravel.test php artisan app:create-super-admin` creates a real first Super Admin (for example `sa@habita.app`). Its password must meet `SH-03`.

---

# Part A: admin access control

Use `test@example.com` / `password` as the Super Admin in these steps.

## Happy paths

A1. Open `http://localhost:5173/admin/login` and log in as the Super Admin. You land on Users, and the sidebar shows Users, Roles and Permissions.

A2. Open DevTools, Application, Local Storage. `habita.admin.token` changes after each page load or save (token rotation, `ADM-FR-AUTH-12`, `ADM-FR-AUTH-13`).

A3. **Roles:** create role `support` with only `users.view` ("Role created."). Edit it and save ("Role updated.").

A4. **Permissions:** create `habits.view` ("Permission created."). Try `Habits View`: the name-format message appears under Name.

A5. **Users:** create `amy@habita.app` with role `admin` and a password that meets `SH-03` ("User created."). Also create a throwaway user `temp@habita.app` with role `admin`. Open Amy, change her name ("User updated."), then change her password ("Password changed."). Note the new password: you need it in the cross-part checks.

## Denials (at least one per rule)

A6. Log in as Amy in a private window:
   - the sidebar shows only Users
   - the Super Admin's row reads "View"
   - opening it shows no Save, Deactivate, Change password or Delete button (`ADM-BR-07`)
   - on Amy's own page, Roles is read-only and the self note shows (`ADM-BR-09`)

A7. As Amy, open `/admin/roles` directly. It shows "You don't have permission to view this page." (`ADM-FR-UI-03`)

A8. As Amy, open another user's Roles card. `super-admin` is disabled with "You can't assign this role", while `support` and `admin` can be ticked (`ADM-BR-06`).

A9. Route permission check (`ADM-FR-AZ-05`): with Amy's token from DevTools, run
   `curl -i -H "Authorization: Bearer <token>" -H "Accept: application/json" http://localhost:8000/api/v1/admin/roles`
   It returns 403 `{"message":"This action is unauthorized.","code":"forbidden"}`.

A10. Log in with a wrong password 6 times. The 6th shows "Too many login attempts. Please try again in N seconds." (`ADM-BR-20`, `SH-04`)

## Session and access changes

A11. As the Super Admin, deactivate Amy. Amy's next click lands on login with "Your account has been deactivated." (`ADM-BR-03`)

A12. Reactivate Amy and log her in again. As the Super Admin, remove all of Amy's roles and confirm "This user will lose access to the admin panel. Continue?". Amy's next click lands on login with "You do not have access to the admin panel." (`ADM-BR-19`)

A13. Give Amy role `admin` back. In Amy's tab, delete `habita.admin.token` in DevTools and click anything. The app lands on login with "Your session has expired. Please log in again."

## Recovery paths (risks)

A14. **ADM-R-01:** as the Super Admin, delete role `support`, then delete permission `users.view`. Give Amy role `admin`: she now gets 403 pages. Run `docker compose exec laravel.test php artisan db:seed --class=AccessControlSeeder`. Amy's access is restored without logging in again.

A15. **ADM-R-01 (lockout):** run `docker compose exec laravel.test php artisan app:create-super-admin` with a new email and log in with it.

A16. **ADM-R-04:** reload a user edit page, which loads two calls in parallel, ten times quickly. You're never logged out.

## Sign-off

A17. Keep Amy for the cross-part checks. Delete `temp@habita.app` instead ("User deleted.") and confirm that user can't log in ("These credentials do not match our records.").

A18. Check the layout at 1024 px in the latest Chrome and Firefox (`ADM-NFR-09`).

A19. Compare the screens against the Figma section "Admin (ADM)": the wording matches, and every control's badge matches its `ADM-IX-` row.

---

# Part B: audience accounts

Register fresh addresses as you go, such as `sam+1@example.com`. Mailpit catches every address, so none of them need to exist.

## Register and verify

B1. Open `http://localhost:5173`. You land on Log in.

B2. Press **Create an account**, then **Create account** with the form empty. Five messages appear and nothing is sent.

B3. Fill the form properly, tick the terms and submit. The card changes to Check your email and shows your address.

B4. Open Mailpit. Within 10 seconds there's a "Verify your Habita email" message, in plain Habita styling with no name in it.

B5. Back in the app, press **Resend email**. The card confirms, and a second message arrives.

B6. Press **Back to log in** and log in. The banner says to verify first, with a Resend link.

B7. Open **Verify email** in the message. The link points at `http://localhost:8000/api/v1/auth/email/verify/...` (`AUD-AC-MAIL-05`) and you land on Log in with "Email verified. You can log in now."

B8. Open the same link again. Same result.

## Log in and stay logged in

B9. Log in with **Remember me** off. You see the Logged in placeholder.

B10. Reload. You stay logged in. Open the app in a new tab: you're on Log in, because the session belongs to that tab.

B11. Press **Log out**. You're on Log in, and visiting `/` sends you back there.

B12. Log in with **Remember me** on, close the browser and reopen it. You're still logged in.

## Password recovery

B13. Log out, then press **Forgot password?** and submit your address. The card says Check your email.

B14. Open **Reset password** in the new message. Type a weak password: a message appears under the field and nothing is sent.

B15. Set a good password. The card says Password updated. Press **Continue to log in** and log in with it. The old password fails.

B16. Open that reset link again and submit a password. The card says This link has expired. Press **Request a new link**: you're on Forgot password.

B17. With a session open in one browser, reset the password from another. Reload the first: you land on Log in with "Your session has expired. Please log in again."

## Denials

B18. Register with an address already in use. "This email is already in use." appears under Email and every field keeps its value.

B19. On Forgot password, submit an address that doesn't exist. The wording matches step B13 exactly and no message arrives.

B20. Log in with a wrong password six times. "Too many login attempts…" appears with a wait time.

B21. Press Resend or Send reset link four times within a minute. A banner gives the wait time.

B22. Try the audience token on the admin API. While logged in to the app, copy the token from DevTools (`habita.audience.token`) and run:
   `curl -i -H "Accept: application/json" -H "Authorization: Bearer <token>" http://localhost:8000/api/v1/admin/auth/me`
   The answer is `401`.

B23. In the admin panel (log in as the Super Admin), open Users. Your audience account is there with no roles. Deactivate it. In the app, reload: you land on Log in with "Your account has been deactivated." Logging in shows the same banner, and Forgot password sends nothing. Reactivate the account afterwards.

## Recovery paths

B24. **No mail arrives** (`AUD-R-01`). Run `docker compose ps`, then `docker compose logs queue`, then `docker compose restart queue`. Queued mail goes out once the worker is back.

B25. **The link in an email is dead** (`AUD-R-02`). The host doesn't match `APP_URL`. Correct `habita-backend/.env`, run `docker compose restart queue laravel.test`, and request a new link.

B26. **Expired verification link.** Open an old link. Log in shows the expired banner. Log in, then press Resend email.

B27. **A stranger registered your email** (`AUD-D-11`). Use Forgot password, set a password, and log in without ever opening the verification email (`AUD-BR-15`).

## Look and feel

B28. Compare all audience screens against the Figma section "Audience (AUD)": glass card, Milky Way backdrop, exact wording.

B29. Narrow the window to phone width. Nothing scrolls sideways.

B30. Open the admin panel. It looks exactly as it did in Part A.

---

# Cross-part checks

X1. **Admin-created users are unverified for audience login** (`AUD-BR-04`). At `http://localhost:5173/login`, log in as Amy (`amy@habita.app`, with the password you set in A5). The banner says to verify your email first. Press **Forgot password?**, submit Amy's address, open the reset link in Mailpit, set a password and log in: Amy now reaches the Logged in placeholder (`AUD-BR-15`), and still has her admin role.

X2. **Admin token on the audience API** (`AUD-AC-SES-11`). Copy `habita.admin.token` from DevTools while logged in as the Super Admin and run:
   `curl -i -H "Accept: application/json" -H "Authorization: Bearer <token>" http://localhost:8000/api/v1/auth/me`
   The answer is `401`.

X3. **An admin password change ends audience sessions** (`AUD-BR-16`). Log in as a Part B account in the app. As the Super Admin, change that account's password (Users, open the account, Change password). Reload the app tab: you land on Log in with "Your session has expired. Please log in again."

X4. **Audience accounts follow the admin rules.** As the Admin (Amy, after X1, log in at `/admin/login`), open an audience account: you can deactivate and reactivate it (`ADM-BR-07`, `AUD-BR-01`), but not a Super Admin.
