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

// cargar modelos
routeModelos.post('/cargarModelos', bodyparser.json(),(req,res)=>{

    const {nombre_modelo, codigo} = req.body;

    if(!nombre_modelo){
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

    mysqlconnecction.query('insert into modelos (nombre_modelos, codigo) value (?,?)', [nombre_modelo,codigo], (err,reg)=>{

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
routeModelos.put('/modificarModelo', bodyparser.json(), (req,res)=>{

    const {nombre_modelo, codigo} = req.body;

    if(!nombre_modelo){
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

    mysqlconnecction.query('update modelos set nombre_modelos =? where codigo =?', [nombre_modelo, codigo], (err,reg)=>{
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
routeModelos.delete('/BorrarModelo', bodyparser.json(), (req, res)=>{

    const {codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('delete from modelos where codigo =?', [codigo], (err, reg)=>{
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