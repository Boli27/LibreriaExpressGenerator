const fs = require('fs');
const path = require('path');

const UsersController = {
   // Procesar el registro de usuarios
   register: (req, res) => {
      const { name, email, password } = req.body;
      const newUser = { name, email, password, role: 'client' };
      const dataPath = path.join(__dirname, '../data/users.json');

      // Leer los usuarios existentes desde el archivo
      const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

      // Verificar si el correo ya está registrado
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
         // Si el correo ya está en uso, enviar un mensaje de error
         return res.render('register', { error: 'Este correo ya está registrado.',title: 'Registro', } );
      }

      // Agregar el nuevo usuario
      users.push(newUser);

      // Guardar el archivo
      fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

      // Redirigir a la página de inicio de sesión
      res.redirect("/users/login")
   },

   // Procesar el inicio de sesión
   login: (req, res) => {
      const { email, password } = req.body; // Asegurarse de extraer email y password de req.body
      const dataPath = path.join(__dirname, '../data/users.json');
      const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
         req.session.user = user;
         res.redirect('/books');
      } else {
         res.render('login', { error: 'Credenciales incorrectas' , title: 'Iniciar Sesión',});
      }
   },

   logout:(req, res) =>{
      req.session.destroy(err => {
         if (err) {
            return res.redirect('/');
         }
         res.render('login', { error: null,title: 'Iniciar Sesion' });
      });
   }
};

module.exports = UsersController;