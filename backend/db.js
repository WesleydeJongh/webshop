// ===========================================
// db.js - Verbind met PostgreSQL (Supabase)
// ===========================================
// LET OP: In Railway zet je DATABASE_URL, in Supabase kopieer je de
// connection string onder "Project Settings" -> "Database".

const { Pool } = require("pg");

const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  //ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // nodig voor Render
  },
});

module.exports = pool;
