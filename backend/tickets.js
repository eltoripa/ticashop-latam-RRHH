const express = require("express");
const router = express.Router();
const db = require("./db");

// Crear ticket
router.post("/", (req, res) => {
  const { cliente, asunto, descripcion } = req.body;
  db.query(
    "INSERT INTO tickets (cliente, asunto, descripcion) VALUES (?, ?, ?)",
    [cliente, asunto, descripcion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
});

// Listar tickets
router.get("/", (req, res) => {
  db.query("SELECT * FROM tickets", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
