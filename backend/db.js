// ===========================================
// db.js - Verbind met PostgreSQL (Supabase)
// ===========================================
// LET OP: In Railway zet je DATABASE_URL, in Supabase kopieer je de
// connection string onder "Project Settings" -> "Database".

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Belangrijk voor SSL bij Supabase/Cloud om foutmeldingen te voorkomen
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
