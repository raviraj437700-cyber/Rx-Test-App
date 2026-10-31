# RX Test App

A mobile-first Bihar Board Class 10 learning platform with a student app and a separate admin workspace.

## UI foundation committed

### Student app
- Home dashboard with learning overview and progress cards
- Six subject cards and chapter library
- Test catalogue and test-entry preview
- Student-to-admin chat interface
- Profile with rank, tests attempted, average percentage, best score and logout entry

### Admin workspace
- Dashboard cards for registered users, active users, tests and attempts
- Registered-user directory with search and direct-chat entry
- Content manager entry points for subjects, chapters, PDFs and question bank
- Test manager
- Student conversations
- Analytics overview

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Important implementation status

The screens currently use sample/demo values. This commit is the UI foundation, not a production-ready backend. The following work remains before inviting students:
1. Connect Supabase email/password authentication and password reset.
2. Add a secure profile table and trusted admin role; enforce access with Row Level Security.
3. Connect subjects, chapters, PDFs, questions, tests, attempts and results to the database.
4. Implement real-time student/admin messaging with per-student conversation access.
5. Calculate rank, average percentage, best score, total attempts and daily active users from real records.
6. Test all student and admin flows on mobile and desktop.

Never expose a Supabase service-role key in browser code. Admin mode in this UI is only a design preview; it is not an access-control mechanism.
