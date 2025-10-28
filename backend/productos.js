const express = require("express");
const router = express.Router();
const db = require("./db");

// Obtener todos los productos
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Crear producto
router.post("/", (req, res) => {
  const { nombre, stock, precio } = req.body;
  db.query(
    "INSERT INTO productos (nombre, stock, precio) VALUES (?, ?, ?)",
    [nombre, stock, precio],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nombre, stock, precio });
    }
  );
});

// Editar producto
router.put("/:id", (req, res) => {
  const { nombre, stock, precio } = req.body;
  db.query(
    "UPDATE productos SET nombre=?, stock=?, precio=? WHERE id=?",
    [nombre, stock, precio, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id: req.params.id, nombre, stock, precio });
    }
  );
});

// Eliminar producto
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM productos WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;

// Actualizar stock después de venta o ingreso
router.put("/:id/stock", (req, res) => {
  const { cantidad } = req.body; // puede ser positiva o negativa
  db.query(
    "UPDATE productos SET stock = stock + ? WHERE id = ?",
    [cantidad, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

