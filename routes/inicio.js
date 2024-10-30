const express = require('express');
const router = express.Router();

// Ruta para bienvenida
router.get('/', (req, res) => {
  res.render('inicio'); // No hay error inicialmente
});

module.exports = router;