const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routeEstado = express();
 
// ver los estados disponibles
routeEstado.get('/verEstados', (req,res)=>{

    mysqlconnecction.query('select * from estados', (err, registro)=>{
       
        if(err){
       
            console.log('Error en la base de datos --> ', err);
       
        }else{
       
            res.json(registro);
        }
    })
})

// insertar los estados disponibles
routeEstado.post('/cargarEstado', bodyparser.json(), (req, res)=>{
    
    const {nombre_estado, codigo} = req.body;

    if(!nombre_estado){
        
        res.json({
        
            status:false,
            mensaje:"El nombre del estado es un campo obligatorio"
        })
    }

    if(!codigo){
         
        res.json({
        
            status:false,
            mensaje:"El codigo del estado es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into estados (nombre_estados, codigo) value (?,?)', [nombre_estado,codigo],(err,reg)=>{
        if(err){
            console.log("Error en la base de datos al cargar un estado --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El estado se cargo correctamente"
            })
        }
    })

})

// modificar los estados
routeEstado.put('/modificarEstado', bodyparser.json(), (req, res)=>{
    
    const {nombre_estado, codigo, estadoModificado} = req.body;

    if(!codigo){

        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    if(!estadoModificado){

        res.json({
            status:false,
            mensaje:"El nuevo estado es un campo obligatorio"
        })
    }
    mysqlconnecction.query('update estados set nombre_estados = ? where codigo =?', [estadoModificado, codigo], (err, registro) =>{
                            
        if(err){
            
            console.log("Error en la base de datos al modificar el estado --> ", err);
        
        }else{

            res.json({
                status:true,
                mensaje:"El estado se a modificado de manera correcta"
            })

        }
    })
})

 
// Borrar datos
routeEstado.delete('/borrarEstado', bodyparser.json(), (req,res) =>{

    const {codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo del estado a borrar es un campo obligatorio"
        })
    }

    mysqlconnecction.query('delete from estados where codigo =?', [codigo], (err, registro)=>{

        if(err){

            console.log("Error en la base de datos al borrar un estado --> ", err);

        }else{
            res.json({
                status:true,
                mensaje:"El estado se a borrado de manera correcta"
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

module.exports = routeEstado;