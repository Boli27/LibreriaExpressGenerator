function isAuthenticated(req, res, next) {
    if (req.session.user) {
       return next(); // Si el usuario está autenticado, pasa al siguiente middleware o ruta
    } else {
       res.redirect('/users/login'); // Si no, redirige al login
    }
 }
 
 module.exports = { isAuthenticated };