# Eenvoudige Webshop (Gratis tiers)

Dit project bestaat uit:

- **frontend/**: Next.js (Vercel) – productoverzicht, detail, winkelmand, checkout, admin, logs
- **backend/**: Express (Railway) – API voor producten, orders (met e-mail via Resend), admin CRUD, logs
- **database/**: SQL schema + seed voor Supabase (PostgreSQL)

## Snel starten (lokaal)

1. **Database** (lokaal of Supabase):
   - Maak een nieuwe database (bijv. Supabase project).
   - Voer `database/schema.sql` uit, daarna `database/seed.sql`.

2. **Backend** (Node 18+):
   ```bash
   cd backend
   cp .env.example .env
   # Vul DATABASE_URL, RESEND_API_KEY (optioneel), ADMIN_TOKEN, enz. in
   npm install
   npm run dev
   ```

3. **Frontend** (Node 18+):
   ```bash
   cd ../frontend
   cp .env.example .env.local
   # Zet NEXT_PUBLIC_API_URL naar je backend, en NEXT_PUBLIC_ADMIN_TOKEN
   npm install
   npm run dev
   ```

Open http://localhost:3000

## Deploy (gratis tiers)

- **Database**: Supabase (gratis)
  - Maak project, kopieer `DATABASE_URL` (connection string).
  - Voer `schema.sql` en `seed.sql` uit in de SQL editor.

- **Backend**: Railway
  - Nieuw project → deploy van GitHub repo of handmatig.
  - Zet environment variables uit `.env.example`.
  - Zet `PORT` (Railway doet dat automatisch), `PGSSLMODE=require`.
  - Noteer de publieke URL van je backend, bv: `https://xxx.up.railway.app`

- **Frontend**: Vercel
  - Importeer `frontend` map als project.
  - Zet environment variables uit `frontend/.env.example`.
  - Zet `NEXT_PUBLIC_API_URL` naar `https://xxx.up.railway.app/api`.

- **Resend** (optioneel voor e-mail)
  - Maak een account aan bij https://resend.com (gratis tier).
  - Zet `RESEND_API_KEY` in backend.
  - Pas `EMAIL_FROM` en `OWNER_EMAIL` aan.

## Let op (beveiliging)

- Admin-beveiliging is **simpel** en bedoeld voor **persoonlijk gebruik**.
- Gebruik lange willekeurige tokens en deel ze niet.
- Voor een echte productieomgeving zijn extra maatregelen nodig (auth, rate-limit, validatie).

## Structuur
```
webshop/
├── frontend/
│   ├── pages/
│   │   ├── _app.js
│   │   ├── index.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── logs.js
│   │   └── product/[id].js
│   ├── components/
│   │   └── ProductCard.js
│   ├── lib/api.js
│   ├── styles/globals.css
│   ├── package.json
│   ├── next.config.js
│   └── .env.example
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── admin.js
│   │   └── logs.js
│   ├── server.js
│   ├── db.js
│   ├── .env.example
│   └── package.json
└── database/
    ├── schema.sql
    └── seed.sql
```
