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

module.exports = routeEmpresas;