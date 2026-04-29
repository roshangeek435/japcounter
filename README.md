# Japa Counter

Next.js 16.2.4 App Router migration of the Japa Counter experience.

## Commands

- `npm run dev` starts the local Next dev server
- `npm run build` creates the production build
- `npm run start` runs the production server
- `npm run lint` runs ESLint
- `npm run smoke` runs route, redirect, metadata, sitemap, and robots smoke checks against a running server

## Environment

- `NEXT_PUBLIC_SITE_URL` preferred canonical site origin
- `NEXT_PUBLIC_CONTACT_EMAIL` optional contact override
- `NEXT_PUBLIC_ALLOW_CRAWL=false` disables crawler access in `robots.txt`

The app still reads the older `REACT_APP_*` equivalents as fallbacks during migration.
