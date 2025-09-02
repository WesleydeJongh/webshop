# Eenvoudige Webshop (Gratis tiers)

Dit project bestaat uit:

- **frontend/**: Next.js (Render.com) – productoverzicht, detail, winkelmand, checkout, admin, logs
- **backend/**: Express (Render.com) – API voor producten, orders (met e-mail via Resend), admin CRUD, logs
- **database/**: SQL schema + seed (Render.com) (via PostgreSQL)

## Snel starten (lokaal)

1. **Database** (lokaal of Supabase):
   - Maak een nieuwe database (bijv. Supabase project).
   - Voer `database/schema.sql` uit, daarna `database/seed.sql`.

2. **Backend** (Node 18+):
   ```bash
   cd backend
   cp .env.example .env
   # Vul DATABASE_URL, ADMIN_TOKEN, enz. in
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
