const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeTipo_producto = express();

// ver Modelos
routeTipo_producto.get('/verTipoProducto', (req,res)=>{

    mysqlconnecction.query('select * from tipo_productos',(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// cargar modelos
routeTipo_producto.post('/cargarTipoProducto', bodyparser.json(),(req,res)=>{

    const {nombre_tipo_producto, codigo} = req.body;

    if(!nombre_tipo_producto){
        res.json({
            status:false,
            mensaje:"El nombre del Tipo de producto es un campo obligatorio"
        })
    }
    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('insert into tipo_productos (nombre_tipo_productos, codigo) value (?,?)', [nombre_tipo_producto,codigo], (err,reg)=>{

        if(err){
            console.log("Error en la base de datos al cargar un tipo de producto --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El tipo de producto se cargo correctamente"
            })
        }
    })
})

// modificar modelos
routeTipo_producto.put('/modificarTipoProducto', bodyparser.json(), (req,res)=>{

    const {nombre_tipo_producto, codigo} = req.body;

    if(!nombre_tipo_producto){
        res.json({
            status:false,
            mensaje:"El nombre tipo de producto es un campo obligatorio"
        })
    }
    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('update tipo_productos set nombre_tipo_productos =? where codigo =?', [nombre_tipo_producto, codigo], (err,reg)=>{
        if(err){
            console.log("Error en la base de datos al modificar un tipo de producto --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El tipo de producto se modifico de manera correcta"
            })
        }
    })
})

// borrar modelos
routeTipo_producto.delete('/BorrarTipoProducto', bodyparser.json(), (req, res)=>{

    const {codigo} = req.body;

    if(!codigo){
        res.json({
            status:false,
            mensaje:"El codigo es un campo obligatorio"
        })
    }

    mysqlconnecction.query('delete from tipo_productos where codigo =?', [codigo], (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al borrar un tipo de producto --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"El tipo de producto se borro correctamente"
            })
        }
    })
})

module.exports = routeTipo_producto;