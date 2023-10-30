const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeEmpresas = express();

// Traer todos los datos de la tabla empresas
routeEmpresas.get('/Vertodoslosregistros', verificationToken, (req, res) => {

    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('select * from empresas', (err, reg) => {
                if (err) {
                    console.log("Error en la base de datos al traer todos los registros de las empresas --> ", err);
                } else {
                    res.json(reg);
                }
            })
        }
    })

})

routeEmpresas.get('/VerEmpresas/:idempresas', verificationToken, (req, res) => {

    const { idempresas } = req.params;
    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('select emp.idempresas, emp.nombre_empresa, model.nombre_modelos, droid.nombre_droides, vehi.nombre_vehiculos, esta.nombre_estados, tipoprod.nombre_tipo_productos from empresas as emp inner join modelos as model on model.id_modelos = emp.id_modelo inner join droides as droid on droid.id_droides = emp.id_droides inner join vehiculos as vehi on vehi.id_vehiculos = emp.id_vehiculos inner join estados as esta on esta.id_estados = emp.id_estado inner join tipo_productos as tipoprod on tipoprod.id_tipo_productos = emp.id_tipo_producto where emp.idempresas =?', [idempresas], (err, reg) => {

                if (err) {
                    console.log("Error en la base de datos al buscar todos los registros por los codigos --> ", err);
                } else {
                    res.json(reg);
                }
            })
        }
    })

})

// cargar datos 
routeEmpresas.post('/cargarEmpresas', verificationToken, bodyparser.json(), (req, res) => {

    const { nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto } = req.body;

    if (!id_modelo) {
        res.json({
            status: false,
            mensaje: "El modelo es un campo obligatorio"
        })
    } else if (!id_droides) {
        res.json({
            status: false,
            mensaje: "El droide es un campo obligatorio"
        })
    } else if (!id_vehiculos) {
        res.json({
            status: false,
            mensaje: "El Vehiculo es un campo obligatorio"
        })
    } else if (!id_estado) {
        res.json({
            status: false,
            mensaje: "El estado es un campo obligatorio"
        })
    } else if (!id_tipo_producto) {
        res.json({
            status: false,
            mensaje: "El tipo de producto es un campo obligatorio"
        })
    } else {
        jwt.verify(req.token, 'Pase', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                mysqlconnecction.query('insert into empresas (nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto) value (?,?,?,?,?,?)', [nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto], (err, reg) => {

                    if (err) {
                        console.log("Error en la base de datos al cargar una nueva empresa --> ", err);
                    } else {
                        res.json({
                            status: true,
                            mensaje: "La empresa se acargado de manera correcta"
                        })
                    }
                })
            }
        })
    }
})

// MODIFICAR LOS DATOS DE LAS EMPRESAS
routeEmpresas.put('/modificarEmpresas/:idempresas', verificationToken, bodyparser.json(), (req, res) => {

    const { idempresas } = req.params;
    const { nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto } = req.body;
    
    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('update empresas set nombre_empresa = ?, id_modelo = ?, id_droides = ?, id_vehiculos = ?, id_estado = ?, id_tipo_producto = ? where idempresas = ?', [nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto, idempresas], (err, reg) => {
                if (err) {
                    console.log("Error en la base de datos al modificar una empresa --> ", err);
                } else {
                    res.json({
                        status: true,
                        mensaje: "La empresa se modifico de manera correcta"
                    })
                }
            })
        }
    })
})

// BORRAR LOS DATOS DE LAS EMPRESAS
routeEmpresas.delete('/BorrarEmpresa/:idempresas', verificationToken, (req, res) => {

    const { idempresas } = req.params;
    jwt.verify(req.token, 'Pase', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlconnecction.query('delete from empresas where idempresas = ?', [idempresas], (err, registro) => {

                if (err) {

                    console.log("Error en la base de datos al borrar un estado --> ", err);

                } else {
                    res.json({
                        status: true,
                        mensaje: "La empresa se a borrado de manera correcta"
                    })
                }

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


// ACA VOY A PONER LOS METHODOS PARA VER LOS REGISTROS LAS FORMAS DE LLAMAR Y VER LOS REGISTROS

// LLAMAR TODOS LOS REGISTROS ENLAZANDO TODAS LAS TABLAS 

routeEmpresas.get('/verTodasLasEmpresas', (req, res) => {

    mysqlconnecction.query('select emp.idempresas, emp.nombre_empresa, model.nombre_modelos, droid.nombre_droides, vehi.nombre_vehiculos, esta.nombre_estados, tipoprod.nombre_tipo_productos from empresas as emp inner join modelos as model on model.id_modelos = emp.id_modelo inner join droides as droid on droid.id_droides = emp.id_droides inner join vehiculos as vehi on vehi.id_vehiculos = emp.id_vehiculos inner join estados as esta on esta.id_estados = emp.id_estado inner join tipo_productos as tipoprod on tipoprod.id_tipo_productos = emp.id_tipo_producto', (err, reg) => {

        if (err) {
            console.log("Error en la base de datos al buscar todos los registros por los codigos --> ", err);
        } else {
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR EL MODELO
routeEmpresas.get('/verlosmodelosdelasempresas', (req, res) => {

    mysqlconnecction.query('select emp.nombre_empresa, modelo.nombre_modelos from empresas as emp left join modelos as modelo on modelo.codigo = emp.codigo_modelo', (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al buscar los registros por los modelos --> ", err);
        } else {
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR LOS DROIDES
routeEmpresas.get('/verlosdroidesdelasempresas', (req, res) => {

    mysqlconnecction.query('select emp.nombre_empresa, droide.nombre_droides from empresas as emp left join droides as droide on droide.codigo = emp.codigo_droides', (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al buscar los registros por los droides --> ", err);
        } else {
            res.json(reg);
        }
    })
})

//  TRAER LAS EMPRESAS POR LOS VEHICULOS
routeEmpresas.get('/verlosvehiculosdelasempresas', (req, res) => {

    mysqlconnecction.query('select emp.nombre_empresa, vehiculo.nombre_vehiculos from empresas as emp left join vehiculos as vehiculo on vehiculo.codigo = emp.codigo_vehiculos', (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al bucar los registros por vehiculo --> ", err);
        } else {
            res.json(reg);
        }
    })
})

// TREAR LAS EMPRESAS POR LOS ESTADOS
routeEmpresas.get('/verlosestadosdelasempresas', (req, res) => {

    mysqlconnecction.query('select emp.nombre_empresa, estado.nombre_estados from empresas as emp left join estados as estado on estado.codigo = emp.codigo_estado', (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al buscar los registros por los estados --> ", err);
        } else {
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR LOS TIPO DE PRODUCTOS
routeEmpresas.get('/verlostipoproductodelasempresas', (req, res) => {

    mysqlconnecction.query('select emp.nombre_empresa, tipo_producto.nombre_tipo_productos from empresas as emp left join tipo_productos as tipo_producto on tipo_producto.codigo = emp.codigo_tipo_producto', (err, reg) => {
        if (err) {
            console.log("Error en la base de datos al buscar los registros por los tipo de producto --> ", err);
        } else {
            res.json(reg);
        }
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = routeEmpresas;