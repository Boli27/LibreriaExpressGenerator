const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController.js');

// Ruta para registrar
router.post('/register', UsersController.register);
//mostrar formulario de registro
router.get('/register', (req, res) => {
  res.render('register', { error: null, title: 'Registro' }); // No hay error inicialmente
});


router.post('/login', UsersController.login);

router.get('/login', (req, res) => {
  res.render('login', { error: null,title: 'Iniciar Sesion' }); // No hay error inicialmente
});

router.get('/logout', UsersController.logout);
module.exports = router;