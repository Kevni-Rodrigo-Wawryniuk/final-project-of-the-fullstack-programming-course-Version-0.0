const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routeEstado = express();

// ver los estados disponibles
routeEstado.get('/verEstados', (req, res) => {

    mysqlconnecction.query('select * from estados', (err, registro) => {

        if (err) {

            console.log('Error en la base de datos --> ', err);

        } else {

            res.json(registro);
        }
    })
})
// ver los fabricantes por id
routeEstado.get('/verEstado/:id_estados', (req, res) => {
    
    const {id_estados} = req.params;

    mysqlconnecction.query('select * from estados where id_estados =?', [id_estados], (err, reg) => {
        if (err) {
            console.log('Error en la base de datos --> ', err);
        }else{
            res.json(reg);
        }
    })

})

// insertar los estados disponibles
routeEstado.post('/cargarEstado', bodyparser.json(), (req, res) => {

    const { nombre_estado, codigos } = req.body;

    if (!nombre_estado) {

        res.json({

            status: false,
            mensaje: "El nombre del estado es un campo obligatorio"
        })
    }

    if (!codigos) {

        res.json({

            status: false,
            mensaje: "El codigo del estado es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into estados (nombre_estados, codigo) value (?,?)', [nombre_estado, codigos], (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al cargar un estado --> ", err);
        } else {
            res.json({
                status: true,
                mensaje: "El estado se cargo correctamente"
            })
        }
    })

})

// modificar los estados
routeEstado.put('/modificarEstado/:id_estados', bodyparser.json(), (req, res) => {

    const {id_estados} = req.params;

    const { nombre_estado, codigo } = req.body;

    if (!codigo) {

        res.json({
            status: false,
            mensaje: "El codigo es un campo obligatorio"
        })
    }

    if (!nombre_estado) {

        res.json({
            status: false,
            mensaje: "El nuevo estado es un campo obligatorio"
        })
    }
    mysqlconnecction.query('update estados set nombre_estados = ?, codigo = ?', [nombre_estado, codigo], (err, registro) => {

        if (err) {

            console.log("Error en la base de datos al modificar el estado --> ", err);

        } else {

            res.json({
                status: true,
                mensaje: "El estado se a modificado de manera correcta"
            })

        }
    })
})

// Borrar datos
routeEstado.delete('/borrarEstado/:id_estados', (req, res) => {

    const {id_estados} = req.params;

    mysqlconnecction.query('delete from estados where id_estados =?', [id_estados], (err, registro) => {

        if (err) {

            console.log("Error en la base de datos al borrar un estado --> ", err);

        } else {
            res.json({  
                status: true,
                mensaje: "El registro se borro correctamente"
            })
        }
    })

})

// verificar el token del usuario
function verificationToken(req, res, next) {

    const bearer = req.headers['authorization'];

    if (typeof bearer !== 'undefined') {

        const token = bearer.split(" ")[1];

        req.token = token;

        next();
    } else {

        res.send('Debe contener un token');
    }
}

module.exports = routeEstado;