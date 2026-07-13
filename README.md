# Glam Essence

Magazin online de beauty construit cu React, TypeScript, Vite și Tailwind. Proiectul include un backend Node, catalog și comenzi persistente în SQLite, actualizare tranzacțională a stocului și un panou de administrare protejat prin sesiune server-side.

## Pornire locală

Cerință: Node.js 22.13+ (recomandat Node 24) și npm.

```bash
npm install
cp .env.example .env
```

În două terminale:

```bash
npm run dev:api
npm run dev
```

Aplicația este disponibilă la `http://localhost:8080`, iar API-ul la `http://localhost:3001`. Vite redirecționează automat cererile `/api` către backend.

Pentru o rulare de producție:

```bash
npm run build
npm start
```

Serverul livrează aplicația din `dist` și expune API-ul pe același port.

## Baza de date

La prima pornire, backend-ul creează automat `data/glam-essence.sqlite` și însămânțează cele 18 produse din `server/seed-products.json`. Fișierul bazei și jurnalele SQLite sunt ignorate de Git.

Schema include:

- `products` — catalog, preț, media și stoc;
- `orders` — client, total și status;
- `order_items` — produsele și prețurile fixate în momentul comenzii.

Plasarea unei comenzi și scăderea stocului au loc într-o singură tranzacție SQLite. Prețul și disponibilitatea sunt recalculate pe server, nu sunt acceptate direct din browser.

Dacă modifici `src/data/products.ts`, regenerează seed-ul:

```bash
npm run seed:generate
```

## Administrare

Configurează `ADMIN_EMAIL` și `ADMIN_PASSWORD` în mediul de rulare. Autentificarea folosește un cookie `HttpOnly`, `SameSite=Strict`; parola nu ajunge în bundle-ul frontend.

În dezvoltare, dacă variabilele nu sunt setate, contul demo este:

- email: `admin@glam-essence.local`
- parolă: `glam-demo-2026`

Nu folosi datele demo într-un deployment public.

## Comenzi utile

```bash
npm run lint
npm run build
npm run seed:generate
```
