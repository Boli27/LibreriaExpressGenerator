var express = require('express');
var router = express.Router();
const BooksController = require('../controllers/BooksController.js');
const { isAuthenticated } = require('../middlewares/auth.js'); // Middleware de autenticación

// Consultar libros, solo si está logueado
router.get('/', isAuthenticated, BooksController.index);

// Mostrar el formulario de agregar libro
router.get('/add', isAuthenticated, (req, res) => {
    res.render('add-book', {
        title: 'Añadir Libro', username: req.session.user.name,
        messages: {
            success: req.flash('success'),
            error: req.flash('error')
        }
    });
});

// Procesar la adición del libro
router.post('/add', isAuthenticated, BooksController.add);

// Mostrar el formulario de edición
router.get('/edit/:id', isAuthenticated, BooksController.edit);

// Actualizar los datos del libro
router.post('/edit/:id', isAuthenticated, BooksController.update);

// Eliminar un libro
router.post('/delete/:id', isAuthenticated, BooksController.delete);

module.exports = router;
