const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeModelos = express();

// ver Modelos
routeModelos.get('/verModelos', verificationToken, (req, res) => {

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {

            mysqlconnecction.query('select * from modelos', (err, reg) => {

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
routeModelos.get('/verModelo/:id_modelos', verificationToken, (req, res) => {

    const { id_modelos } = req.params;

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('select * from modelos where id_modelos =?', [id_modelos], (err, reg) => {

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
routeModelos.post('/cargarModelos', verificationToken, bodyparser.json(), (req, res) => {

    const { nombre_modelos, codigo } = req.body;

    if (!nombre_modelos) {
        res.json({
            status: false,
            mensaje: "El nombre del modelo es un campo obligatorio"
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
                mysqlconnecction.query('insert into modelos (nombre_modelos, codigo) value (?,?)', [nombre_modelos, codigo], (err, reg) => {

                    if (err) {
                        console.log("Error en la base de datos al cargar un modelo --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El modelo se cargo correctamente"
                        })
                    }
                })
            }
        })
    }
})

// modificar modelos
routeModelos.put('/modificarModelo/:id_modelos', verificationToken, bodyparser.json(), (req, res) => {

    const { id_modelos } = req.params;

    const { nombre_modelos, codigo } = req.body;

    if (!nombre_modelos) {
        res.json({
            status: false,
            mensaje: "El nombre del modelo es un campo obligatorio"
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
                mysqlconnecction.query('update modelos set nombre_modelos =?, codigo =? where id_modelos =?', [nombre_modelos, codigo, id_modelos], (err, reg) => {
                    if (err) {
                        console.log("Error en la base de datos al modificar un modelo --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El modelo se modifico de manera correcta"
                        })
                    }
                })
            }
        })
    }
})

// permiso para borrar
routeModelos.post('/permisoModelo/:id_modelos', verificationToken, (req, res) => {

    const { id_modelos } = req.params;

    if (!id_modelos) {
        res.json({
            status: false,
            mensaje: 'falta un id'
        })
    } else {
        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('select emp.id_modelo, models.id_modelos from modelos as models left join empresas as emp on models.id_modelos = emp.id_modelo where emp.id_modelo =?', [id_modelos], (err, reg) => {
                    if (err) {
                        console.log('error en la base de datos --->', err);
                    } else {
                        if (reg.length > 0) {
                            res.json({
                                status: false,
                                mensaje: "El modelo se esta usando en la tabla empresas"
                            })
                        } else {
                            res.json({
                                status: true,
                                mensaje: 'El modelo se puede borrar'
                            })
                        }
                    }
                })
            }
        })
    }
})
// borrar modelos
routeModelos.delete('/BorrarModelo/:id_modelos', verificationToken, bodyparser.json(), (req, res) => {

    const { id_modelos } = req.params;

    if (!id_modelos) {
        res.json({
            status: false,
            mensaje: 'El id es un campo necesaro'
        })
    } else {

        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('delete from modelos where id_modelos =?', [id_modelos], (err, reg) => {
                    if (err) {
                        console.log("Error en la base de datos al borrar un modelo --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El modelo se borro correctamente"
                        })
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

module.exports = routeModelos;