const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeTipo_producto = express();

// ver tipo de productos
routeTipo_producto.get('/verTipoProducto', verificationToken, (req, res) => {

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('select * from tipo_productos', (err, reg) => {

                if (err) {
                    console.log("Error en la base de datos --> ", err);
                } else {
                    res.json(reg);
                }
            })

        }
    })
})

// ver tipo de producto por id
routeTipo_producto.get('/verTipoProductos/:id_tipo_productos', verificationToken, (req, res) => {

    const { id_tipo_productos } = req.params;

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('select * from tipo_productos where id_tipo_productos =?', [id_tipo_productos], (err, reg) => {

                if (err) {
                    console.log("Error en la base de datos --> ", err);
                } else {
                    res.json(reg);
                }
            })

        }
    })
})

// cargar tipo de productos
routeTipo_producto.post('/cargarTipoProducto', verificationToken, bodyparser.json(), (req, res) => {

    const { nombre_tipo_productos, codigo } = req.body;

    if (!nombre_tipo_productos) {
        res.json({
            status: false,
            mensaje: "El nombre del Tipo de producto es un campo obligatorio"
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
                mysqlconnecction.query('insert into tipo_productos (nombre_tipo_productos, codigo) value (?,?)', [nombre_tipo_productos, codigo], (err, reg) => {

                    if (err) {
                        console.log("Error en la base de datos al cargar un tipo de producto --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El tipo de producto se cargo correctamente"
                        })
                    }
                })
            }
        })
    }
})

// modificar tipo de productos
routeTipo_producto.put('/modificarTipoProducto/:id_tipo_productos', verificationToken, bodyparser.json(), (req, res) => {

    const { id_tipo_productos } = req.params;
    const { nombre_tipo_productos, codigo } = req.body;

    if (!nombre_tipo_productos) {
        res.json({
            status: false,
            mensaje: "El nombre tipo de producto es un campo obligatorio"
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
                mysqlconnecction.query('update tipo_productos set nombre_tipo_productos =?, codigo =? where id_tipo_productos =?', [nombre_tipo_productos, codigo, id_tipo_productos], (err, reg) => {
                    if (err) {
                        console.log("Error en la base de datos al modificar un tipo de producto --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El tipo de producto se modifico de manera correcta"
                        })
                    }
                })
            }
        })
    }
})

// permiso para borrar dato
routeTipo_producto.post('/permisoTP/:id_tipo_productos', verificationToken, (req, res) => {
    const { id_tipo_productos } = req.params;

    if (!id_tipo_productos) {
        res.json({
            status: false,
            mensaje: 'falta un id'
        })
    } else {
        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('select emp.id_tipo_producto, tp.id_tipo_productos from tipo_productos as tp left join empresas as emp on tp.id_tipo_productos = emp.id_tipo_producto where emp.id_tipo_producto =?', [id_tipo_productos], (err, reg) => {
                    if (err) {
                        console.log('error en la base de datos --->', err);
                    } else {
                        if (reg.length > 0) {
                            res.json({
                                status: false,
                                mensaje: 'el tipo de producto no se puede borrar '
                            })
                        } else {
                            res.json({
                                status: true,
                                mensaje: 'el tipo de producto se puede borrar'
                            })
                        }
                    }
                })
            }
        })
    }
})
// borrar modelos
routeTipo_producto.delete('/BorrarTipoProducto/:id_tipo_productos', verificationToken, bodyparser.json(), (req, res) => {

    const { id_tipo_productos } = req.params;

    if (!id_tipo_productos) {
        res.json({
            status: false,
            mensaje: 'El id es un campo obligatorio'
        })
    } else {
        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {

                mysqlconnecction.query('delete from tipo_productos where id_tipo_productos =?', [id_tipo_productos], (err, reg) => {
                    if (err) {
                        console.log("Error en la base de datos al borrar un tipo de producto --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "El tipo de producto se borro correctamente"
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

module.exports = routeTipo_producto;