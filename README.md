# Circle of Care 關懷圈 — board frontend

Volunteer board for Circle of Care (HK Hack 2026, challenge 4). The Django backend (WhatsApp bot, API, admin) is in
[HK-Hack26-circle-of-care-backend](https://github.com/FaithTechHongKong/HK-Hack26-circle-of-care-backend).

Next.js (App Router, TypeScript, styled-components) frontend for the volunteer boards.
People message the WhatsApp bot; the Django backend turns each chat into an anonymous
care request or an offer of help. This app shows both boards:

- `/` — **Need help**: open care requests, filter by category and district, "I can help".
- `/requests/[id]` — offer form for one request (name, phone/WhatsApp, church, note).
- `/offers` — **Offering help**: what volunteers have offered (browse only).

Boards refresh every 30 seconds, so new WhatsApp chats appear during a demo.

## Run locally

Needs Node 22+ and the Django backend running on port 8000 (`python manage.py runserver`
in the repo root).

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start` (serve the build), `npm run lint`.

## Environment

| Variable  | Default                 | What it does |
|-----------|-------------------------|--------------|
| `API_URL` | `http://localhost:8000` | Django origin, no trailing slash. |

Copy `.env.example` to `.env.local` to change it. The browser only talks to this Next app:
`next.config.ts` rewrites `/api/:path*` to `${API_URL}/api/:path*/` (adding the trailing
slash Django expects, keeping the query string), so no CORS setup is needed.
`API_URL` is read when the server starts / at build time, so restart or redeploy after changing it.

If Django has a board passcode set, the app shows a passcode screen on the first 401 and
remembers the code in `localStorage` (sent as the `X-Board-Passcode` header).

## Deploy to Vercel

1. Import the repo in Vercel and set **Root Directory** to `frontend` (framework: Next.js).
2. Add the environment variable `API_URL` = your deployed Django URL, e.g. `https://ecc-api.example.com`.
3. Deploy. Django must be reachable from Vercel over HTTPS; since requests are proxied
   server-side, Django needs no CORS config (just make sure its `ALLOWED_HOSTS` includes its own domain).

## Layout

```
src/app/                  routes (layout, /, /offers, /requests/[id])
src/components/           UI (styled-components; every file is "use client")
src/lib/api.ts            fetch helpers, passcode storage, ApiError
src/lib/types.ts          API types
src/lib/theme.ts          design tokens (colours, category tints, fonts)
src/lib/registry.tsx      styled-components SSR registry
src/lib/useResource.ts    fetch + poll hook
```
