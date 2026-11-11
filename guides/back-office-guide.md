# Habita Back Office: User's Guide

For Habita staff who run the admin panel: **Super Admins, Admins, and any custom role such as Moderator or Support**.

Customers have their own guide: [customer-guide.md](customer-guide.md).

---

## 1. What the back office does

The admin panel is where staff manage **who can do what** on Habita:

| Section | What you manage |
|---|---|
| **Users** | People's accounts: their details, roles, status (active or deactivated), password, and deletion. |
| **Roles** | Named bundles of permissions, like "Admin" or "Moderator". |
| **Permissions** | The individual things a person may do, like "View users". |

You only see the sections your role allows. If a section is missing from your sidebar, your role doesn't include it. Ask a Super Admin.

## 2. Roles that come with Habita

Two roles are created automatically:

| Permission | Super Admin | Admin |
|---|:-:|:-:|
| Access admin panel | ✅ | ✅ |
| View users | ✅ | ✅ |
| Update users (name, email) | ✅ | ✅ |
| Assign roles to users | ✅ | ✅ |
| Activate or deactivate users | ✅ | ✅ |
| Create users | ✅ | |
| Change a user's password | ✅ | |
| Delete users | ✅ | |
| View / create / update / delete **roles** | ✅ | |
| View / create / update / delete **permissions** | ✅ | |

**There is no built-in Moderator role.** You create one (or any other) in **Roles**. See [section 7](#7-example-create-a-moderator-role).

### Two safety rules that apply to everyone

1. **You can never give or change more power than you have.** You can only assign a role whose permissions are all ones you also hold, and you can only change a user whose permissions are all ones you hold. In practice an Admin can never touch a Super Admin or hand out the Super Admin role.
2. **You can't deactivate, delete, or change the roles of your own account.** Another person with the right permission has to do it. You can still edit your own name and email if you can update users.

## 3. Logging in

1. Open the admin address: **`/admin/login`** (locally, `http://localhost:5173/admin/login`).
2. Enter your **Email** and **Password** and select **Log in**.
3. You land on the first section you're allowed to see.

| You see | Meaning |
|---|---|
| "Your session has expired. Please log in again." | You were idle too long. Log in again. |
| An error banner on login | Wrong email or password, or the account is deactivated or has no admin access. |
| "Too many login attempts. Please try again in N seconds." | 5 wrong tries in a minute. Wait for the countdown. |
| "403: You don't have permission to view this page." | Your role doesn't include that page. Use the link back. |

To leave, select **Log out** in the top bar. The top bar shows your name.

**Changing your own password:** there is no self-service screen yet. Ask a Super Admin to change it from your user page.

## 4. Users

**Sidebar → Users** (needs *View users*).

### Find people

The list shows **Name, Email, Roles, Status, Created**. Above it:

- **Search**: type part of a name or email. It filters as you type.
- **Status**: All / Active / Deactivated.
- **Role**: show only people with one role.
- **Previous / Next** under the list, with "Showing x–y of z".

Your filters stay in the address bar, so Back returns you to the same filtered list. "No users match your filters." means nothing matched.

> **Customers appear here too.** A person who signs up on the public site is a user with **no roles**. You can see them, deactivate them, and so on, but they can't enter the admin panel.

### Create a staff user

Needs *Create users* (Super Admin by default).

1. **Users → New user**.
2. Fill in **Name**, **Email**, **Password**, **Confirm password**.
3. Tick at least one **Role**. Roles you aren't allowed to give are greyed out ("You can't assign this role").
4. **Create user**. You'll see "User created."

Password rule: at least 12 characters, with an upper-case letter, a lower-case letter, and a number. Habita does **not** email the new person. Share the password with them yourself, securely.

> Staff created this way are treated as *unverified* for the **customer** site login. That doesn't affect their admin login.

### Edit a user

Select **Edit** on a row (or **View** if you can only look). The page is a set of cards, each with its own Save button:

| Card | What it does | Needs |
|---|---|---|
| **Details** | Change name and email. **Save details**. | Update users |
| **Roles** | Tick the roles, then **Save roles**. Changes take effect on the person's next action; they don't need to log in again. | Assign roles |
| **Status** | Shows Active or Deactivated. **Deactivate** or **Reactivate**. | Activate or deactivate |
| **Danger zone** | **Change password** and **Delete user**. | Change password / Delete users |

Good to know:

- If you remove a user's last way into the admin panel, you get "This user will lose access to the admin panel. Continue?"
- **Deactivate** asks first: *"Deactivate [name]? They will be logged out and unable to log in until reactivated."* Their roles are kept. **Reactivate** needs no confirmation and restores access with the same roles.
- **Change password** opens a dialog with *New password* and *Confirm*. After you change a customer's password, every device they were logged in on is signed out.
- **Delete user** asks you to type the person's **email** to confirm. Deleted users disappear everywhere, can't log in, and **their email can never be reused**. There is no undelete screen yet.
- On your own page you'll see "This is your account. Some actions are unavailable."

## 5. Roles

**Sidebar → Roles** (needs *View roles*).

The list shows **Display name, Name, Permissions (count), Users (count)**.

- **New role** → give it a **Name** (a short machine name such as `moderator`, unique), a **Display name** ("Moderator") and a **Description**. Tick the permissions it should include. Permissions are grouped; use **Select all** on a group to tick them all. Select **Create role**.
- **Edit** a role to change its details or permissions, then **Save changes**. People holding the role get the new permissions on their next action.
- **Delete** warns you with the number of people who have the role. Deleting removes the role from all of them.

⚠ The two built-in roles can be edited or deleted like any other, so be careful. If a built-in role is damaged, a developer can restore it by re-running the access-control seeder.

## 6. Permissions

**Sidebar → Permissions** (needs *View permissions*; Super Admin only by default).

The list shows **Display name, Name, Description, Roles (count)**. You can create, edit, and delete permissions, with the same warning on delete about how many roles lose it.

Normally you won't need this screen. Permissions are tied to code, so a permission you invent here does nothing until a developer builds a feature that checks for it. Treat this screen as a reference unless a developer asks you to add something.

## 7. Example: create a Moderator role

Goal: someone who can see users and deactivate abusive accounts, but not edit details, roles, or passwords.

1. **Roles → New role**.
2. Name `moderator`, Display name `Moderator`, Description "Reviews users and deactivates abusive accounts".
3. Tick **Access admin panel**, **View users**, and **Activate or deactivate users**.
4. **Create role**.
5. **Users → New user** (or **Edit** an existing one → Roles), tick **Moderator**.

You can only do this if you yourself hold those three permissions (rule 1 in section 2).

## 8. Messages you may see

| Message | What to do |
|---|---|
| "Something went wrong. Please try again." | Try once more. If it keeps happening, tell a developer. |
| A red message under a field | Fix that field. Typical causes: weak password, email already in use, passwords don't match. |
| "You can't assign this role" (tooltip) | The role has permissions you don't hold. Ask a Super Admin. |
| "This email is already in use." | Emails are unique across everyone, including deleted users. |

---

## Appendix A: running Habita on your own computer (development)

| What | Where |
|---|---|
| Customer site | http://localhost:5173 |
| Admin panel | http://localhost:5173/admin/login |
| API | http://localhost:8000 |
| **Test inbox (all emails land here)** | **http://localhost:8025** |

**Start everything:** from the `habita` folder run `docker compose up -d`. The first start builds images and takes a few minutes. Check progress with `docker compose ps`; all six services (`frontend`, `laravel.test`, `pgsql`, `redis`, `queue`, `mailpit`) should be Up.

**First-time database setup** (once, on a fresh database): `docker compose exec laravel.test php artisan migrate`, then `docker compose exec laravel.test php artisan db:seed`.

**Sign-in for a fresh development database:** the seeder creates a Super Admin, `test@example.com` with password `password`. This is a development-only account. Never seed it on a real server.

**Creating the first real Super Admin** (any environment):

```
docker compose exec laravel.test php artisan app:create-super-admin
```

It asks for a name, email, and password (typed twice, hidden) and prints `Super admin <email> created.`

**Emails in development:** nothing is really sent. Verification and password-reset emails are caught by **Mailpit** at http://localhost:8025. Open it, click the newest message, and click the link inside. Emails go out through a background worker (`queue`), so allow up to about 30 seconds on a slow machine.

**Stop:** `docker compose down` (keeps your data). `docker compose down -v` also **erases the database**.
