const express = require("express");
const router = express.Router();
const pool = require("../db");

/**
 * GET /api/products
 * Haal producten op met eenvoudige paginering.
 * Query parameters:
 *  - limit (default 12)
 *  - offset (default 0)
 */
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "12", 10), 50); // max 50 per pagina
    const offset = parseInt(req.query.offset || "0", 10);

    const { rows } = await pool.query(
      "SELECT id, name, description, price, image_url, article1, article2, article3 FROM products ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const totalResult = await pool.query("SELECT COUNT(*)::int AS total FROM products");
    const total = totalResult.rows[0].total;

    res.json({ items: rows, total, limit, offset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Er ging iets mis bij het ophalen van producten." });
  }
});

/**
 * GET /api/products/:id
 * Haal details op van één product.
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Product niet gevonden" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Er ging iets mis bij het ophalen van het product." });
  }
});

module.exports = router;
