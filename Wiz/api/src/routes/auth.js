const server = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');
const { Sess, User } = require('../db.js');


function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}


function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


server.post('/register', async function (req, res, next) {
  console.log("QUE LLEGA A REGISTER EN BACK ",req.body)
  const salt = crypto.randomBytes(64).toString('hex');
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64');

  if (!isValidPassword(req.body.password)) {
    return res.json({ status: 'error', message: 'La contraseña debe tener 8 o más carácteres' });
  }
  if (!isValidEmail(req.body.email)) {
    return res.json({ status: 'error', message: 'Email address not formed correctly.' });
  }

  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      adress: req.body.adress,
      email: req.body.email,
      active: true,
      password: password,
      salt: salt,
      admin: false,
      date: req.body.date
    });
    if (user) {
      passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          return res.json({ status: 'error', message: info.message, err });
        }

        req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.json({ status: 'ok' });
        });
      })(req, res, next);
    }
  } catch (err) {
    console.log(err)
    return res.json({ status: 'error', message: 'Esta dirección de email ya está registrada' });
  }
});

server.put('/:id/passwordReset', (req, res, next) => {
  const { id } = req.params;
  const salt = crypto.randomBytes(64).toString('hex')
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64')

  User.findByPk(id)
    .then((user) => {
      if (user) {
        user.password = password
        user.salt = salt
        return user.save()
      }
    }).then((user) => {
      res.sendStatus(200);
    }).catch(next)
})

server.put('/promote/:id', (req, res, next) => {
  const userChange = req.params.id;
  User.update({
    admin: true
  }, { where: { id: userChange } })
    .then(change => {
      res.sendStatus(200)
    }).catch(err => {
      next(err);
      res.status(400);
    })
})
server.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user || user.active === "false") {
      return res.status(400).json({ status: 'error', message: info.message, err });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
        const sess = Sess.create({
          userId: user.dataValues.id,
          first_name: user.dataValues.first_name,
          last_name: user.dataValues.last_name,
          email: user.dataValues.email,
          fecha: req.body.fecha
        })
        console.log(user.dataValues,"EN BACK")
        const us = {
          userId: user.dataValues.id,
          first_name: user.dataValues.first_name,
          last_name: user.dataValues.last_name,
          email: user.dataValues.email,
          active: user.dataValues.active
        }
     return res.json({ status: 'ok', us });
    });
  })(req, res, next);

});


function isAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Para acceder a este recurso debes estar logueado')
  }
}

server.get('/logout', isAutenticated, (req, res) => {
  req.logOut();
  res.redirect('/');
});


server.get('/me', isAutenticated, (req, res) => {
  res.json(req.user);
});


module.exports = server, isAutenticated;