# Glam Essence

Editorial beauty e-commerce storefront with a complete shopping flow and a transactional SQLite commerce backend.

![Glam Essence](./docs/cover.webp)

## Case study

- **Live demo:** [glam-essence.netlify.app](https://glam-essence.netlify.app/)
- **Design and build case study:** [lumax.agency/work/glam-essence](https://www.lumax.agency/work/glam-essence)

## Status

Independent portfolio project. Products and prices are demonstration content.

## Overview

Glam Essence is an online beauty store built with React, TypeScript, Vite and Tailwind CSS on the front end, backed by a Node server with SQLite persistence. The storefront covers the full customer journey — browsing by category, product pages, wishlist, cart, checkout and order confirmation — with a bilingual (Romanian/English) interface.

The backend is intentionally dependency-free: it runs on `node:http` and the built-in `node:sqlite` driver, with no framework or ORM. It owns the catalog and orders, decrements stock transactionally, recomputes every price on the server, and exposes a session-protected admin panel for managing products and orders.

## Features

- Complete shopping flow: catalog, product pages, wishlist, cart, checkout, order confirmation
- Persistent catalog and orders in SQLite (WAL mode, foreign keys, `CHECK` constraints)
- Order placement and stock decrement in a single SQLite transaction — overselling is rejected at the database level
- Server-side price recalculation: totals, discounts and shipping are computed from the database; prices are never trusted from the browser
- Session-protected admin panel for products and orders (HttpOnly cookie, rate-limited login)
- Optional card payments via Stripe Checkout — orders are recorded only after a signature-verified webhook confirms payment
- Optional order-confirmation emails via Resend
- Newsletter signup persisted in SQLite
- Bilingual UI (Romanian/English) with a runtime language switcher
- Product seeding workflow: first run seeds 18 products from `server/seed-products.json`

## Tech stack

- **Front end:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix primitives), React Router, TanStack Query, React Hook Form + Zod
- **Back end:** Node.js 22+ — `node:http` and `node:sqlite` only, no runtime dependencies
- **Database:** SQLite (auto-created at `data/glam-essence.sqlite`)
- **Integrations (optional, env-gated):** Stripe Checkout, Resend

## Technical decisions

- **One transaction for order + stock.** Creating an order and decrementing stock happen inside a single `BEGIN IMMEDIATE` transaction, and the stock update is guarded with `WHERE stock >= ?`. Concurrent checkouts cannot oversell; a failed line item rolls back the whole order.
- **The server owns the money math.** The browser sends only product ids and quantities. Unit prices, discounts, shipping and the order total are recomputed from the database on every checkout, so a tampered cart payload cannot change what is charged.
- **Admin auth without client-side secrets.** Login sets an HttpOnly, `SameSite=Strict` session cookie (with `Secure` in production), so the admin password never reaches the front-end bundle. Credentials are compared in constant time, login attempts are rate-limited per IP, and in production the server refuses admin login unless `ADMIN_EMAIL`/`ADMIN_PASSWORD` are explicitly configured.
- **Pay first, record second.** With Stripe enabled, checkout intent is parked in a `pending_checkouts` table and the order is only created when the webhook — verified with an HMAC signature and timestamp check — reports the session as paid.

## Running locally

Requires Node.js 22.13+ (Node 24 recommended) and npm.

```bash
npm install
cp .env.example .env
```

Run the API and the front end in two terminals:

```bash
npm run dev:api
npm run dev
```

The app is available at `http://localhost:8080` and the API at `http://localhost:3001`. Vite proxies `/api` requests to the backend automatically.

For a production run:

```bash
npm run build
npm start
```

The server serves the built app from `dist` and exposes the API on the same port.

### Database

On first start the backend creates `data/glam-essence.sqlite` and seeds the 18 products from `server/seed-products.json`. The database file and SQLite journals are git-ignored.

If you change `src/data/products.ts`, regenerate the seed:

```bash
npm run seed:generate
```

### Admin panel

Configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the environment. In development, if these variables are not set, the fallback demo account is:

- email: `admin@glam-essence.local`
- password: `glam-demo-2026`

Do not use the demo credentials in any public deployment.

### Useful commands

```bash
npm run lint
npm run build
npm test
npm run seed:generate
```

`npm test` builds the production app and exercises the real HTTP server against an isolated temporary SQLite database, including health, SPA fallback, production auth, and server-owned checkout totals.

## License / Portfolio use

Source published for portfolio review.
