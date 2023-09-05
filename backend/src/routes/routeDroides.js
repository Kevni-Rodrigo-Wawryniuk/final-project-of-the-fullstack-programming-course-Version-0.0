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

// Cargar datos de los droides
routeDroides.post('/cargarDroides', bodyparser.json(), (req, res)=>{
    
    const {nombre_Droide, codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    if(!nombre_Droide){
        
        res.json({
        
            status:false,
            mensaje:"El nombre del Droide es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into droides (nombre_droides, codigo) value (?,?)', [nombre_Droide,codigo], (err, registro)=>{
        
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
routeDroides.put('/modificarDroides', bodyparser.json(), (req, res)=>{
    
    const {codigo, nuevoDroide} = req.body;

    if(!codigo){
     
        res.json({
            status:false,
            mensaje:"El nombre de estado es un campo obligatorio"
        })
    
    }
    if(!nuevoDroide){

        res.json({
            status:false,
            mensaje:"El nuevo estado es un campo obligatorio"
        })
    }

    mysqlconnecction.query('update droides set nombre_droides = ? where codigo =?', [nuevoDroide, codigo], (err, registro) =>{
                    
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
routeDroides.delete('/BorrarDroide',bodyparser.json(), (req,res)=>{

    const {codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('delete from droides where codigo =?',[codigo],(err,reg)=>{

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

            
module.exports = routeDroides;