// Eenvoudige admin-routes om producten toe te voegen/bewerken/verwijderen
// Let op: Dit is geen productie-waardige beveiliging, enkel voor persoonlijk gebruik.
//
// Auth: zeer simpel via 'ADMIN_TOKEN' header die gelijk moet zijn aan process.env.ADMIN_TOKEN.
// Je admin-pagina stuurt deze header mee.

const express = require("express");
const router = express.Router();
const pool = require("../db");

function checkAdmin(req, res, next) {
  const token = req.headers["admin-token"];
  if (!process.env.ADMIN_TOKEN) {
    return res.status(500).json({ error: "ADMIN_TOKEN niet ingesteld op de server." });
  }
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Niet geautoriseerd." });
  }
  next();
}

/**
 * POST /api/admin/products
 * Voeg een product toe
 */
router.post("/products", checkAdmin, async (req, res) => {
  try {
    const { name, description, price, image_url, article1, article2, article3 } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, image_url, article1, article2, article3)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [name, description, price, image_url, article1, article2, article3]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kon product niet toevoegen." });
  }
});

/**
 * PUT /api/admin/products/:id
 * Werk een product bij
 */
router.put("/products/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url, article1, article2, article3 } = req.body;
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, article1=$5, article2=$6, article3=$7
       WHERE id=$8 RETURNING *`,
      [name, description, price, image_url, article1, article2, article3, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Product niet gevonden." });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kon product niet bijwerken." });
  }
});

/**
 * DELETE /api/admin/products/:id
 * Verwijder een product
 */
router.delete("/products/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ ok: true, deleted: result.rowCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kon product niet verwijderen." });
  }
});

module.exports = router;
