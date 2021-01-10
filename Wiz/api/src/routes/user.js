const server = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');
const { Op, Sequelize} = require("sequelize");
const { User, Sess } = require('../db.js');


server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, adress, email } = req.body;
    User.update(
        {
            first_name,
            last_name,
            adress,
            email
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
});


server.get('/', (req, res, next) => {
    User.findAll({
        where:{active: true}
    })
        .then(usuarios => {
            res.send(usuarios);
        }).catch(next);
});
//desactiva el usuario
server.put('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    User.update(
        {
            active: false,
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
})

server.put('/recovery/:id', (req, res, next) => {
    const { id } = req.params;
    User.update(
        {
            active: true,
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
})
//muestra los inicios de sesion por usuarios.
server.post("/:id/conteosession", (req,res) => {
    const { id } = req.params
    const {createdAtA, createdAtB } = req.body

    Sess.findAll({
          where: {
            userId:id,
            fecha: {
            [Op.between]: [createdAtA ,  createdAtB]
                }
          },
          attributes: [
              "fecha",
              "userId",
            [Sequelize.fn('sum', Sequelize.col('session')), 'inicios'],
          ],
          group: ["fecha","userId"],
        }).then(respuesta => {
          res.send(respuesta)
        }).catch(err => {
           res.send(err)
     }) ;
  })
//muestra los registros por dia.
  server.post("/registerday", (req,res) => {
    const {createdAtA, createdAtB } = req.body
    console.log(createdAtA, createdAtB)

    User.findAll({
          where: {
            date: {
            [Op.between]: [createdAtA ,  createdAtB]
                }
          },
          attributes: [
              "date",
        [Sequelize.fn('sum', Sequelize.col('count')), 'Registro'],
          ],
          group: ["date"],
        }).then(respuesta => {
          res.send(respuesta)
        }).catch(err => {
           res.send(err)
     }) ;
  })
  

module.exports = server;