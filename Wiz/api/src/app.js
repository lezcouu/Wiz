const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
//const cors = require('cors');
const json = require('express');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const { Sess , User } = require('./db.js');
const server = express();
const session = require("express-session");
const passport = require('passport');
server.name = 'API';

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

// PASO 1 - CREAR ESTRATEGIA

// SIGUIENDO LA DOCUMENTACION
passport.use(new LocalStrategy({
  // El primer parametro es un objeto en el cual le decimos a passport como se llama el campo donde esta el username de nuestro usuario (en este caso es email)
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  // En esta funcion comprobaremos que existe el email y que su contraseña sea correcta
  User.findOne({ where: { email: email } })
    .then(user => {
      //if (err) { return done(err) }
      if (!user) {
        return done(null, false, { status: 'error', message: "Email incorrecto" });
      }
      const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if (passwordKey !== user.password) {
        return done(null, false, { status: 'error', message: 'Contraseña incorrecta' });
      }
      //Esta es la funcion que va a mantener la sesion en la cookie, para poder usarlo en la app
      return done(null, user, { status: 'ok' });
    })
    .catch(err => {
      return done(err);
    })
}))

//2)A) SERIALIZAR
// El primer parametro user hace referencia a un objeto que viene de nuestra base de datos con toda la iformacion del mismo
// El segundo parametro, es una funcion de callback que nos notifica cuando terminamos de hacer la serializacion
passport.serializeUser((user, done) => {
  done(null, user.id); // En la cookie solo mando la id desde la base de datos para identificar el usuario, no el email,password,etc
  // Passport utiliza el user.id para matchear entre las sesiones y los objetos de la base de datos
});
//2)B) DESSERIALIZAR
// Cuando llegue un Id en un cookie, passport va a preguntarle a la base de datos a que usuario corresponde este Id
passport.deserializeUser((id, done) => {
  User.findByPk(id) //Tambien funciona con User.findOne({ where: { id } })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
});

// PASO 3 MANEJAR SESION
// Passport no sabe manejar las sesiones, sino que agrega informacion a esa sesion
server.use(session({
  secret: 'String secreto, Luego pasarlo a salt', // posible problema con cookie parser
  resave: false, // Fuerza a que por cada llamada que se haga al servidor, la informacion de la sesion se guarde en la base de datos independientemente de que haya cambios o no
  saveUninitialized: false // la sesion es un objeto en blanco al cual se le agrega informacion. Este guarda el objeto aunque el objeto este vacio
}));

// PASO 4 INICIALIZAR PASSPORT Y RECUPERAR EL ESTADO DE AUTENTICACION DE LA SESION
server.use(passport.initialize());
server.use(passport.session());
/* 
// Middleware para debuguear
server.use((req, res, next) => {
  console.log('Middleware para verificar sesion. App en la linea 134')
  console.log("Session: ", req.session);
  console.log("User:", req.user);
  next();
});
 */
//todos los pedidos http pasan por estos middlewares
//server.use(cors()) // EL CORS VA A JODER LA SESSION
server.use(json());
server.use(cookieParser());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: false /* o true? */, limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware. 
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
