// librerias usadas
const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routelogin = express();

// esto es para ver los registros cargados Y verificando si esta el usuario logeado con el token 
routelogin.get('/verRegistros', (req, res) => {

    mysqlconnecction.query('select * from usuario', (err, registros) => {

        if (err) {

            console.log('error en la base de datos ---> ', err);

        } else {

            res.json(registros);

        }
    })
})
// registrar a los usuarios
routelogin.post('/Registros', bodyparser.json(), (req, res) => {

    // variables de los datos a resivir
    const { nombre, apellido, edad, usuario, correo, contraseña, roles } = req.body;
    // variable a encriptar
    let hash = bcrypt.hashSync(contraseña, 10);
    let hash_roles = bcrypt.hashSync(roles, 10);

    // datos obligatorios 
    if (!nombre) {
        res.json({
            status: false,
            mensaje: "El nombre es un campo obligatorio"
        })
    } else if (!apellido) {
        res.json({
            status: false,
            mensaje: "El apellido es un campo obligatorio"
        })
    } else if (!edad) {
        res.json({
            status: false,
            mensaje: "La edad es un campo obligatorio"
        })
    } else if (!usuario) {
        res.json({
            status: false,
            mensaje: "El usuaio es un campo obligatorio"
        })
    } else if (!correo) {
        res.json({
            status: false,
            mensaje: "El correo es un campo obligatorio"
        })
    } else if (!contraseña) {
        res.json({
            status: false,
            mensaje: "La contraseña es un campo obligatorio"
        })
    } else {


        // buscar los registros y comparar 
        mysqlconnecction.query('select * from usuario where correo =?', [correo], (err, reg) => {

            if (err) {

                console.log('Error en la base de datos al buscar los registros --> ', err);

            } else {

                if (reg.length > 0) {
                    res.json({
                        status: false,
                        mensaje: "El Correo ya existe"
                    })

                } else {

                    mysqlconnecction.query('insert into usuario(nombre, apellido, edad, usuario, correo, contraseña, roles) value (?,?,?,?,?,?,?)', [nombre, apellido, edad, usuario, correo, hash, hash_roles], (err, reg) => {

                        if (err) {

                            console.log('Error en la base de datos al registrar un nuevo usuario --> ', err);

                        } else {

                            res.json({
                                status: true,
                                mensaje: "El registro a sido exitoso"
                            })
                        }
                    })
                }
            }
        })
    }
})
// logear usuario
routelogin.post('/Login', bodyparser.json(), (req, res) => {

    const { correo, contraseña } = req.body;

    if (!correo) {

        res.json({
            status: false,
            mensaje: "El correo es un campo obligatorio"
        })

    } else if (!contraseña) {

        res.json({
            status: false,
            mensaje: "La contraseña es un campo obligatorio"
        })

    } else {

        mysqlconnecction.query('select * from usuario where correo =?', [correo], (err, reg) => {

            if (err) {

                console.log('Error en la base de datos al buscar el registro del usuario --> ', err);

            } else {

                if (reg.length > 0) {

                    const compare = bcrypt.compareSync(contraseña, reg[0].contraseña);

                    if (compare) {

                        // generar el token
                        jwt.sign({ reg }, 'Pase', (err, token) => {

                            res.json({
                                status: true,
                                dato: correo,
                                token: token
                            })
                        })
                    } else {

                        res.json({
                            status: false,
                            mensaje: "La contraseña es incorrecta"
                        })
                    }

                } else {

                    res.json({
                        status: false,
                        mensaje: "El correo es incorrecto"
                    })
                }
            }
        })
    }
})
// borrar Registros
routelogin.delete('/ClearLog', bodyparser.json(), (req, res) => {

    const { correo, contraseña } = req.body;

    if (!correo) {
        res.json({
            status: false,
            mensaje: "El correo es un campo obligatorio"
        })
    } else if (!contraseña) {
        res.json({
            status: false,
            mensaje: "La contraseña es un campo obligatorio"
        })
    } else {

        mysqlconnecction.query('delete from usuario where correo =? ', [correo], (err, reg) => {
            if (err) {
                console.log('Error en la base de datos al borrar al ususario --> ', err);
            } else {
                res.send('El registro se borro de forma exitosa');
            }
        })
    }
})
// restaurar la contraseña
// buscar el correo
routelogin.post('/traerCorreo', bodyparser.json(), (req, res) => {

    const { correo } = req.body;

    if (!correo) {
        res.json({
            status: false,
            mensaje: 'Falta el correo'
        })
    } else {
        mysqlconnecction.query('select * from usuario where correo =?', [correo], (err, reg) => {
            if (err) {
                console.log("Error en la base de datos ----> ", err);
            } else {
                if (reg.length > 0) {
                    res.json({
                        status: true,
                        mensaje: 'El correo esta correcto'
                    })
                } else {
                    res.json({
                        status: false,
                        mensaje: 'El correo no existe'
                    })
                }
            }
        })
    }
})
routelogin.post('/verUsuario/:usuario', bodyparser.json(), (req, res)=>{
    const {usuario} = req.params;

    if(!usuario){
        res.json({
            status:false,
            mensaje:'Falta un usuario'
        })
    } else {

        mysqlconnecction.query('select * from usuario where usuario =?', [usuario], (err, reg)=>{

            if(err){
                console.log('error en la base de datos ---> ', err);
            } else {
                if(reg.length > 0){
                    res.json({
                        status:true,
                        mensaje: 'El usuario existe'
                    })
                } else {
                    res.json({
                        status:false,
                        mensaje:'El usuario no existe'
                    })
                }
            }
        })
    }
})
// traer id por correo 
routelogin.get('/usuarios/:correo', bodyparser.json(), (req, res) => {

    const { correo } = req.params;

    if (!correo) {
        res.json({
            status: false,
            mensaje: 'falta un correo'
        })
    } else {
        mysqlconnecction.query('select * from usuario where correo =?', [correo], (err, reg) => {

            if (err) {

                console.log('Error en la base de datos --->', err);

            } else {
                res.json(reg);
            }
        })
    }
})
// modificar contraseña
routelogin.put('/restaurar/:correo', bodyparser.json(), (req, res) => {

    const { contraseña } = req.body;
    const { correo } = req.params;

    let hash = bcrypt.hashSync(contraseña, 10);

    if (!correo) {
        res.json({
            status: false,
            mensaje: "El correo es un campo obligatorio"
        })
    } else if (!contraseña) {
        res.json({
            status: false,
            mensaje: "La nueva contraseña es un campo obligatorio"
        })
    } else {

        mysqlconnecction.query('update usuario set contraseña =? where correo =?', [hash, correo], (err, reg) => {
            if (err) {
                res.send("Error en la base de datos ----> ", err);
            } else {
                res.json({
                    status: true,
                    mensaje: "La contraseña se a modificado de manera correcta"
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

module.exports = routelogin;