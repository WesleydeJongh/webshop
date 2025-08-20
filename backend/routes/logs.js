// Heel simpel endpoint om logs op te halen voor het dashboard
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "100", 10), 500);
    const offset = parseInt(req.query.offset || "0", 10);

    const { rows } = await pool.query(
      "SELECT id, level, message, context, created_at FROM logs ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.json({ items: rows, limit, offset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kon logs niet ophalen." });
  }
});

module.exports = router;
