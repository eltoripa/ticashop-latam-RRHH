const express = require("express");
const router = express.Router();
const db = require("./db");

// Registrar una nueva cotización
router.post("/", (req, res) => {
  const { cliente, producto_id, cantidad, total } = req.body;
  db.query(
    "INSERT INTO cotizaciones (cliente, producto_id, cantidad, total) VALUES (?, ?, ?, ?)",
    [cliente, producto_id, cantidad, total],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
});

// Ver todas las cotizaciones
router.get("/", (req, res) => {
  db.query("SELECT * FROM cotizaciones", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
