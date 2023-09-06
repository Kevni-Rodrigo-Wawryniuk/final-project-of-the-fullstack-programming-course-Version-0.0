const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeEmpresas = express();

// Traer todos los datos de la tabla empresas
routeEmpresas.get('/Vertodoslosregistros', (req,res)=>{

    mysqlconnecction.query('select * from empresas',(err, reg)=>{
        if(err){
            console.log("Error en la base de datos al traer todos los registros de las empresas --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// cargar datos 
routeEmpresas.post('/cargarEmpresas', bodyparser.json(), (req, res)=>{

    const {nombre_empresa, codigo_tipo_producto, codigo_droides, codigo_vehiculos, codigo_modelo, codigo_estado} = req.body;

    if(!nombre_empresa){
        res.json({
            status:false,
            mensaje:"El nombre de la empresa es un campo obligatorio"
        })
    }
    if(!codigo_tipo_producto){
        res.json({
            status:false,
            mensaje:"El codigo del tipo de producto es un campo obligatorio"
        })
    }
    if(!codigo_droides){
        res.json({
            status:false,
            mensaje:"El codigo del droide es un campo obligatorio"
        })
    }
    if(!codigo_vehiculos){
        res.json({
            status:false,
            mensaje:"El codigo del vehiculo es un campo obligatorio"
        })
    }
    if(!codigo_modelo){
        res.json({
            status:false,
            mensaje:"El codigo de modelo es un campo obligatorio"
        })
    }
    if(!codigo_estado){
        res.json({
            status:false,
            mensaje:"El codigo de los estados es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into empresas (nombre_empresa,codigo_tipo_producto,codigo_droides,codigo_vehiculos,codigo_modelo,codigo_estado) value (?,?,?,?,?,?)', [nombre_empresa,codigo_tipo_producto,codigo_droides,codigo_vehiculos,codigo_modelo,codigo_estado], (err, reg)=>{

        if(err){
            console.log("Error en la base de datos al cargar una nueva empresa --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"La empresa se acargado de manera correcta"
            })
        }
    })
})




module.exports = routeEmpresas;