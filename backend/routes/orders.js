const express = require("express");
const router = express.Router();
const pool = require("../db");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/order
 * Verwerk een bestelling: sla op in de database en stuur een e-mail.
 * Body:
 *  - customer_name (string)
 *  - customer_email (string)
 *  - cart (array van items met id, name, price, qty)
 */
router.post("/", async (req, res) => {
  try {
    const { customer_name, customer_email, cart } = req.body;

    if (!customer_name || !customer_email || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Ontbrekende velden: naam, e-mail of winkelmand." });
    }

    // Sla bestelling op
    await pool.query(
      "INSERT INTO orders (customer_name, customer_email, cart) VALUES ($1, $2, $3)",
      [customer_name, customer_email, JSON.stringify(cart)]
    );

    // Bouw een simpele HTML e-mail op
    const cartHtml = `<ul>` + cart.map(i => `<li>${i.name} x ${i.qty} – €${i.price}</li>`).join("") + `</ul>`;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "webshop@yourdomain.dev",
        to: process.env.EMAIL_TO || (process.env.OWNER_EMAIL || "owner@example.com"),
        subject: "Nieuwe bestelling ontvangen",
        html: `<h3>Bestelling van ${customer_name}</h3>
               <p>Email: ${customer_email}</p>
               <h4>Winkelmand</h4>
               ${cartHtml}`,
      });
    }

    // Log een bericht
    await pool.query(
      "INSERT INTO logs (level, message, context) VALUES ($1, $2, $3)",
      ["info", "Nieuwe bestelling geplaatst", JSON.stringify({ customer_email, items: cart.length })]
    );

    res.json({ ok: true, message: "Bestelling geplaatst en (indien ingesteld) e-mail verzonden." });
  } catch (err) {
    console.error(err);
    try {
      await pool.query(
        "INSERT INTO logs (level, message, context) VALUES ($1, $2, $3)",
        ["error", "Fout bij plaatsen bestelling", JSON.stringify({ error: err.message })]
      );
    } catch {}
    res.status(500).json({ error: "Er ging iets mis bij het verwerken van de bestelling." });
  }
});

module.exports = router;
