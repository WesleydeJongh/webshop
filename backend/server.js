// ===========================================
// Eenvoudige Express server
// Doel: API voor producten, bestellingen en logging
// Host: Railway (gratis tier)
// ===========================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const adminRoute = require("./routes/admin");
const logsRoute = require("./routes/logs");
const pool = require("./db");

dotenv.config();

const app = express();

// CORS: sta requests toe vanaf je frontend (Vercel)
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

// Body parser voor JSON
app.use(express.json());

// Klein middlewaretje om alle requests te loggen in de database
app.use(async (req, res, next) => {
  try {
    await pool.query(
      "INSERT INTO logs (level, message, context) VALUES ($1, $2, $3)",
      ['info', `HTTP ${req.method} ${req.path}`, JSON.stringify({ query: req.query, body: req.body })]
    );
  } catch (e) {
    // Fout bij loggen mag de request niet blokkeren: enkel naar console
    console.error("Kon niet loggen naar DB:", e.message);
  }
  next();
});

// Routes
app.use("/api/products", productsRoute);
app.use("/api/order", ordersRoute);
app.use("/api/admin", adminRoute);
app.use("/api/logs", logsRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});
