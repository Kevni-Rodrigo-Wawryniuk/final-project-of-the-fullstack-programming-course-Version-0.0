const express = require('express');
const bodyparser = require('body-parser');
const mysqlconnecction = require('../database/db.js');

const jwt = require('jsonwebtoken');

const routeTipo_producto = express();

// ver tipo de productos
routeTipo_producto.get('/verTipoProducto', (req,res)=>{

    mysqlconnecction.query('select * from tipo_productos',(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// ver tipo de producto por id
routeTipo_producto.get('/verTipoProductos/:id_tipo_productos', (req,res)=>{

    const {id_tipo_productos} = req.params;

    mysqlconnecction.query('select * from tipo_productos where id_tipo_productos =?', [id_tipo_productos],(err,reg)=>{

        if(err){
            console.log("Error en la base de datos --> ", err);
        }else{
            res.json(reg);
        }
    })
})


// cargar tipo de productos
routeTipo_producto.post('/cargarTipoProducto', bodyparser.json(),(req,res)=>{

    const {nombre_tipo_productos, codigo} = req.body;

    if(!nombre_tipo_productos){
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

    mysqlconnecction.query('insert into tipo_productos (nombre_tipo_productos, codigo) value (?,?)', [nombre_tipo_productos,codigo], (err,reg)=>{

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

// modificar tipo de productos
routeTipo_producto.put('/modificarTipoProducto/:id_tipo_productos', bodyparser.json(), (req,res)=>{

    const {id_tipo_productos} = req.params;
    const {nombre_tipo_productos, codigo} = req.body;

    if(!nombre_tipo_productos){
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

    mysqlconnecction.query('update tipo_productos set nombre_tipo_productos =?, codigo =? where id_tipo_productos =?', [nombre_tipo_productos, codigo, id_tipo_productos], (err,reg)=>{
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
routeTipo_producto.delete('/BorrarTipoProducto/:id_tipo_productos', bodyparser.json(), (req, res)=>{

    const {id_tipo_productos} = req.params;

    mysqlconnecction.query('delete from tipo_productos where id_tipo_productos =?', [id_tipo_productos], (err, reg)=>{
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
module.exports = routeTipo_producto;