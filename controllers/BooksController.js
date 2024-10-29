const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ruta al archivo de datos
const dataPath = path.join(__dirname, '../data/books.json');

// Función para leer libros
const readBooks = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Función para escribir libros
const writeBooks = (books) => fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));

const BooksController = {
   // Mostrar la lista de libros
   index: (req, res) => {
      const books = readBooks();
      res.render('index', { title: 'Catálogo de Libros', books, username: req.session.user.name,
         messages: {
            success: req.flash('success'),
            error: req.flash('error')
         }
       });
   },

   // Agregar un nuevo libro
   add: (req, res) => {
      const { title, author, year, price, cover } = req.body;
      const newBook = { id: uuidv4(), title, author, year, price, cover };
      const books = readBooks();

      books.push(newBook);
      writeBooks(books); // Guardar el archivo actualizado
      req.flash('success', 'Libro agregado exitosamente');
      res.redirect('/books'); // Redirigir a la lista de libros
   },

   // Editar un libro existente
   edit: (req, res) => {
      const books = readBooks();
      const book = books.find(b => b.id === req.params.id);

      if (book) {
         res.render('edit-book', {
            book, title: 'Editar Libro', username: req.session.user.name,
            messages: {
               success: req.flash('success'),
               error: req.flash('error')
            }
         });
      } else {
         res.status(404).send('Libro no encontrado');
      }
   },

   // Actualizar los datos del libro
   update: (req, res) => {
      const { title, author, year, price, cover } = req.body;
      const books = readBooks();
      const bookIndex = books.findIndex(book => book.id === req.params.id);

      if (bookIndex !== -1) {
         books[bookIndex] = {
            id: books[bookIndex].id,
            title,
            author,
            year,
            price,
            cover
         };

         writeBooks(books); // Guardar los cambios
         req.flash('success', 'Libro actualizado exitosamente');
         res.redirect('/books');
      } else {
         req.flash('error', 'Libro no encontrado');
         res.status(404).send('Libro no encontrado');
      }
   },

   // Eliminar un libro
   delete: (req, res) => {
      let books = readBooks();
      const bookId = req.params.id;
      const bookToDelete = books.find(book => book.id === bookId); // Buscar el libro para confirmar su existencia

      if (bookToDelete) {
         books = books.filter(book => book.id !== bookId);
         writeBooks(books);
         req.flash('success', 'Libro eliminado exitosamente'); // Guardar el mensaje en la sesión
      } else {
         req.flash('error', 'Libro no encontrado'); // Guardar mensaje de error en caso de que no se encuentre el libro
      }

      res.redirect('/books'); // Redirigir a la lista de libros
   }

};

module.exports = BooksController;
