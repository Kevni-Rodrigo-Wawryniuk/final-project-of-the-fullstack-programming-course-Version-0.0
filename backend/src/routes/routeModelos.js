const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeModelos = express();

// ver Modelos
routeModelos.get('/verModelos', (req,res)=>{

    mysqlconnecction.query('select * from modelos',(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// ver modelos por id
routeModelos.get('/verModelo/:id_modelos', (req,res)=>{
    
    const {id_modelos} = req.params;

    mysqlconnecction.query('select * from modelos where id_modelos =?', [id_modelos],(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// cargar modelos
routeModelos.post('/cargarModelos', bodyparser.json(),(req,res)=>{

    const {nombre_modelos, codigo} = req.body;

    if(!nombre_modelos){
        res.json({
            status:false,
            mensaje:"El nombre del modelo es un campo obligatorio"
        })
    }
    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into modelos (nombre_modelos, codigo) value (?,?)', [nombre_modelos,codigo], (err,reg)=>{

        if(err){
            console.log("Error en la base de datos al cargar un modelo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El modelo se cargo correctamente"
            })
        }
    })
})

// modificar modelos
routeModelos.put('/modificarModelo/:id_modelos', bodyparser.json(), (req,res)=>{

    const {id_modelos} = req.params;

    const {nombre_modelos, codigo} = req.body;

    if(!nombre_modelos){
        res.json({
            status:false,
            mensaje:"El nombre es un campo obligatorio"
        })
    }
    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('update modelos set nombre_modelos =?, codigo =? where id_modelos =?', [nombre_modelos, codigo, id_modelos], (err,reg)=>{
        if(err){
            console.log("Error en la base de datos al modificar un modelo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El modelo se modifico de manera correcta"
            })
        }
    })
})

// borrar modelos
routeModelos.delete('/BorrarModelo/:id_modelos', bodyparser.json(), (req, res)=>{

    const {id_modelos} = req.params;

    mysqlconnecction.query('delete from modelos where id_modelos =?', [id_modelos], (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al borrar un modelo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El modelo se borro correctamente"
            })
        }
    })
})

// verificar el token del usuario
function verificationToken (req,res,next){

    const bearer = req.headers['authorization'];

    if(typeof bearer !== 'undefined'){

        const token = bearer.split(" ")[1];

        req.token = token;

        next();
    }else{

        res.send('Debe contener un token');
    }
}

module.exports = routeModelos;