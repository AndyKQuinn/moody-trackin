# Moody Trackin

Simply daily tracker application to keep tabs on mood and things that you learn

[Website](https://moody-trackin.vercel.app/)

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mantine UI](https://mantine.dev/)
- [Supabase](https://supabase.com/)

## Local Development

```sh
# Install packages

npm i
yarn
pnpm i
bun i
```

```sh
# Run code

npm run dev
yarn dev
pnpm run dev
bun run dev
```

### Setup .env file

```sh
# .env or .env.local

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Add SQL Tables

Use the `database.sql` file to seed the database tables

### Start the app

```sh
npm run dev
```

### Run supabase locally (requires Docker)

```sh
supabase start
```

```sh
supabase stop
```

```sh
supabase db reset
```
