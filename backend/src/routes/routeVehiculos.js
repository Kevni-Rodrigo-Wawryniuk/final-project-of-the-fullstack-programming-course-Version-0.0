const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeVehiculos = express();

// ver Modelos
routeVehiculos.get('/verVehiculos', verificationToken, (req, res) => {

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403, '>>>  Error al enivar el token');
        } else {

            mysqlconnecction.query('select * from vehiculos', (err, reg) => {

                if (err) {
                    console.log("Error en la base de datos --> ", err);
                } else {
                    res.json(reg);
                }
            })
        }
    })
})

// ver modelos por id
routeVehiculos.get('/verVehiculo/:id_vehiculos', verificationToken, (req, res) => {

    const { id_vehiculos } = req.params;

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {

            mysqlconnecction.query('select * from vehiculos where id_vehiculos =?', [id_vehiculos], (err, reg) => {

                if (err) {
                    console.log("Error en la base de datos --> ", err);
                } else {
                    res.json(reg);
                }
            })
        }
    })
})

// cargar modelos
routeVehiculos.post('/cargarVehiculos', verificationToken, bodyparser.json(), (req, res) => {

    const { nombre_vehiculos, codigo } = req.body;

    if (!nombre_vehiculos) {
        res.json({
            //status: false,
            mensaje: "El nombre del vehiculo es un campo obligatorio"
        })
    } else if (!codigo) {
        res.json({
            //status: false,
            mensaje: "El codigo es un campo obligatorio"
        })
    } else {

        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {

                mysqlconnecction.query('insert into vehiculos (nombre_vehiculos, codigo) value (?,?)', [nombre_vehiculos, codigo], (err, reg) => {

                    if (err) {
                        console.log("Error en la base de datos al cargar un vehiculo --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El vehiculo se cargo correctamente"
                        })
                    }
                })
            }
        })
    }
})

// modificar modelos
routeVehiculos.put('/modificarVehiculos/:id_vehiculos', verificationToken, bodyparser.json(), (req, res) => {

    const { id_vehiculos } = req.params;

    const { nombre_vehiculos, codigo } = req.body;

    if (!nombre_vehiculos) {
        res.json({
            status: false,
            mensaje: "El nombre del vehiculo es un campo obligatorio"
        })
    } else if (!codigo) {
        res.json({
            status: false,
            mensaje: "El codigo es un campo obligatorio"
        })
    } else {

        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('update vehiculos set nombre_vehiculos =?, codigo =? where id_vehiculos =?', [nombre_vehiculos, codigo, id_vehiculos], (err, reg) => {
                    if (err) {
                        console.log("Error en la base de datos al modificar un Vehiculo --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El vehiculo se modifico de manera correcta"
                        })
                    }
                })
            }
        })
    }
})

// borrar modelos
routeVehiculos.delete('/BorrarVehiculo/:id_vehiculos', verificationToken, (req, res) => {

    const { id_vehiculos } = req.params;

    if (!id_vehiculos) {
        re.json({
            status: false,
            mensaje: 'el id es un campo obligatorio'
        })
    } else {
        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('select * from vehiculos as vehi left join empresas as emp on vehi.id_vehiculos = emp.id_vehiculos where emp.id_vehiculos =?', [id_vehiculos], (err, reg) => {
                    if (err) {
                        console.log('Error en la base de datos -----> ', err);
                    } else {
                        if (reg.length > 0) {
                            res.json({
                                status: false,
                                mensaje: ' El vehiculo esta siendo usado'
                            })
                        } else {
                            mysqlconnecction.query('delete from vehiculos where id_vehiculos =?', [id_vehiculos], (err, reg) => {
                                if (err) {
                                    console.log("Error en la base de datos al borrar un vehiculo --> ", err);
                                } else {
                                    res.json({
                                        status: true,
                                        mensaje: "El vehiculo se borro correctamente"
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }
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
module.exports = routeVehiculos;