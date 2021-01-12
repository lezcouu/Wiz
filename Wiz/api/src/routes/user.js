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
        const us = {
            id: req.body.id,
            first_name: first_name,
            last_name: last_name,
            adress: adress,
            email: email
        }
        res.status(200).send(us);
    }).catch(next);
});


server.get('/', (req, res, next) => {
    User.findAll({
        attributes: ["id","first_name","last_name","email","adress","active"]
    })
        .then(usuarios => {
            res.send(usuarios);
        }).catch(next);
});
//desactiva el usuario
server.put('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, email, adress } = req.body.row
    User.update(
        {
            active: false,
        },
        { where: { id } }
    ).then((usuario) => {
        const us = {
            id: req.params.id,
            active: false,
            first_name: first_name,
            last_name: last_name,
            email: email,
            adress: adress
        }
        res.status(200).send(us);
    }).catch(next);
})

server.put('/recovery/:id', (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, adress, email, active } = req.body.row
    User.update(
        {
            active: true,
        },
        { where: { id } }
    ).then((usuario) => {
        const us = {
            id,
            first_name,
            last_name,
            adress,
            email,
            active: true
        }
        res.status(200).send(us);
    }).catch(next);
})
//muestra los inicios de sesion por usuarios.
server.post("/:id/conteosession", (req,res) => {
    console.log(req.body)
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