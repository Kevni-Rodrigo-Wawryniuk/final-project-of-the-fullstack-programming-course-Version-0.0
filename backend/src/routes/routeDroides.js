const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db');

const jwt = require('jsonwebtoken');

const routeDroides = express();

// ver Droides
routeDroides.get('/verDriodes', (req,res)=>{

    mysqlconnecction.query('select * from droides', (err, registro)=>{
       
        if(err){
       
            console.log('Error en la base de datos --> ', err);
       
        }else{
       
            res.json(registro);
        }
    })
})
// ver Droides
routeDroides.get('/verDriode/:id_droides', (req,res)=>{

    const {id_droides} = req.params;

    mysqlconnecction.query('select * from droides where id_droides =?', [id_droides], (err, registro)=>{
       
        if(err){
       
            console.log('Error en la base de datos --> ', err);
       
        }else{
       
            res.json(registro);
        }
    })
})


// Cargar datos de los droides
routeDroides.post('/cargarDroides', bodyparser.json(), (req, res)=>{
    
    const {nombre_droides, codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    if(!nombre_droides){
        
        res.json({
        
            status:false,
            mensaje:"El nombre del Droide es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into droides (nombre_droides, codigo) value (?,?)', [nombre_droides,codigo], (err, registro)=>{
        
        if(err){

            console.log('Error al cargar el dato al cargar un droide --> ', err);

        }else{
            res.json({
                status:false,
                mensaje:"El Droide se cargo correctamente"
            })
        }
    })
})

// modificar datos de los droides
routeDroides.put('/modificarDroides/:id_droide', bodyparser.json(), (req, res)=>{
    
    const {id_droide} = req.params;
    const {codigo, nombre_droides} = req.body;

    if(!codigo){
     
        res.json({
            status:false,
            mensaje:"El nombre de estado es un campo obligatorio"
        })
    
    }
    if(!nombre_droides){

        res.json({
            status:false,
            mensaje:"El nuevo estado es un campo obligatorio"
        })
    }

    mysqlconnecction.query('update droides set nombre_droides = ?, codigo =? where id_droides =?', [nombre_droides, codigo, id_droide], (err, registro) =>{
                    
        if(err){
                        
            console.log("Error en la base de datos al modificar el droide --> ", err);
                    
        }else{

            res.json({
                status:true,
                mensaje:"El droide se a modificado de manera correcta"
            })

        }
    })
})

// borrar Droides
routeDroides.delete('/BorrarDroide/:id_droides', (req,res)=>{

    const {id_droides} = req.params;


    mysqlconnecction.query('delete from droides where id_droides =?',[id_droides],(err,reg)=>{

        if(err){
            console.log("Error en la base de datos al borrar el droide --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El registro se borro correctamente"
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
            
module.exports = routeDroides;