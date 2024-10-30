var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');

var bookRouter = require('./routes/books.js');
var usersRouter = require('./routes/users.js');
var inicioRouter = require('./routes/inicio.js');

var app = express();

app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mi-clave-secreta', // Cambia esto a una clave secreta más segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Si usas HTTPS, cambia esto a true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/books', bookRouter);
app.use('/users', usersRouter);
app.use('/', inicioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
