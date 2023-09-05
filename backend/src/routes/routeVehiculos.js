const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeVehiculos = express();

// ver Modelos
routeVehiculos.get('/verVehiculos', (req,res)=>{

    mysqlconnecction.query('select * from vehiculos',(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// cargar modelos
routeVehiculos.post('/cargarVehiculos', bodyparser.json(),(req,res)=>{

    const {nombre_vehiculo, codigo} = req.body;

    if(!nombre_vehiculo){
        res.json({
            status:false,
            mensaje:"El nombre del vehiculo es un campo obligatorio"
        })
    }
    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into vehiculos (nombre_vehiculos, codigo) value (?,?)', [nombre_vehiculo,codigo], (err,reg)=>{

        if(err){
            console.log("Error en la base de datos al cargar un vehiculo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El vehiculo se cargo correctamente"
            })
        }
    })
})

// modificar modelos
routeVehiculos.put('/modificarVehiculos', bodyparser.json(), (req,res)=>{

    const {nombre_vehiculo, codigo} = req.body;

    if(!nombre_vehiculo){
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

    mysqlconnecction.query('update vehiculos set nombre_vehiculos =? where codigo =?', [nombre_vehiculo, codigo], (err,reg)=>{
        if(err){
            console.log("Error en la base de datos al modificar un Vehiculo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El vehiculo se modifico de manera correcta"
            })
        }
    })
})

// borrar modelos
routeVehiculos.delete('/BorrarVehiculo', bodyparser.json(), (req, res)=>{

    const {codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('delete from vehiculos where codigo =?', [codigo], (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al borrar un vehiculo --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El vehiculo se borro correctamente"
            })
        }
    })
})

module.exports = routeVehiculos;