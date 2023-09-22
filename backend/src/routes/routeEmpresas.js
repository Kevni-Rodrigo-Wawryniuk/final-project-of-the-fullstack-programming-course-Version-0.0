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

// ACA VOY A PONER LOS METHODOS PARA VER LOS REGISTROS LAS FORMAS DE LLAMAR Y VER LOS REGISTROS

// LLAMAR TODOS LOS REGISTROS ENLAZANDO TODAS LAS TABLAS 
 
routeEmpresas.get('/verTodasLasEmpresas', (req, res) =>{

    mysqlconnecction.query('select emp.idempresas, emp.nombre_empresa, modelo.nombre_modelos, droide.nombre_droides, vehiculo.nombre_vehiculos, estado.nombre_estados, tipo_producto.nombre_tipo_productos from empresas as emp left join modelos as modelo on modelo.codigo = emp.codigo_modelo left join droides as droide on droide.codigo = emp.codigo_droides left join vehiculos as vehiculo on vehiculo.codigo = emp.codigo_vehiculos left join estados as estado on estado.codigo = emp.codigo_estado left join tipo_productos as tipo_producto on tipo_producto.codigo = emp.codigo_tipo_producto', (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al buscar todos los registros por los codigos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR EL MODELO
routeEmpresas.get('/verlosmodelosdelasempresas', (req,res)=>{

    mysqlconnecction.query('select emp.nombre_empresa, modelo.nombre_modelos from empresas as emp left join modelos as modelo on modelo.codigo = emp.codigo_modelo', (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al buscar los registros por los modelos --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR LOS DROIDES
routeEmpresas.get('/verlosdroidesdelasempresas', (req,res)=>{

    mysqlconnecction.query('select emp.nombre_empresa, droide.nombre_droides from empresas as emp left join droides as droide on droide.codigo = emp.codigo_droides',(err,reg)=>{
        if(err){
            console.log("Error en la base de datos al buscar los registros por los droides --> ", err);
        }else{
            res.json(reg);
        }
    })
})

//  TRAER LAS EMPRESAS POR LOS VEHICULOS
routeEmpresas.get('/verlosvehiculosdelasempresas', (req,res)=>{

    mysqlconnecction.query('select emp.nombre_empresa, vehiculo.nombre_vehiculos from empresas as emp left join vehiculos as vehiculo on vehiculo.codigo = emp.codigo_vehiculos', (err, reg) =>{
        if(err){
            console.log("Error en la base de datos al bucar los registros por vehiculo --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// TREAR LAS EMPRESAS POR LOS ESTADOS
routeEmpresas.get('/verlosestadosdelasempresas', (req, res) =>{

    mysqlconnecction.query('select emp.nombre_empresa, estado.nombre_estados from empresas as emp left join estados as estado on estado.codigo = emp.codigo_estado', (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al buscar los registros por los estados --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// TRAER LAS EMPRESAS POR LOS TIPO DE PRODUCTOS
routeEmpresas.get('/verlostipoproductodelasempresas', (req, res)=>{

    mysqlconnecction.query('select emp.nombre_empresa, tipo_producto.nombre_tipo_productos from empresas as emp left join tipo_productos as tipo_producto on tipo_producto.codigo = emp.codigo_tipo_producto', (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al buscar los registros por los tipo de producto --> ", err);
        }else{
            res.json(reg);
        }
    })
})

// MODIFICAR LOS DATOS DE LAS EMPRESAS
routeEmpresas.put('/modificarEmpresas', bodyparser.json(),(req,res)=>{

    const {nombre_empresa, codigo_modelo, codigo_droides, codigo_vehiculos, codigo_estado, codigo_tipo_producto, idempresas} = req.body;

    mysqlconnecction.query('update empresas set nombre_empresas = ?, codigo_modelo = ?, codigo_droides = ?, codigo_vehiculos = ?, codigo_estado = ?, codigo_tipo_producto = ? where idempresas = ?', [nombre_empresa,codigo_modelo,codigo_droides,codigo_vehiculos,codigo_estado,codigo_tipo_producto], (err, reg)=>{
        if(err){
            console.log("Error en la base de datos al modificar una empresa --> ", err);
        }else{
            res.json({
                status:true,
                mensaje:"La empresa se modifico de manera correcta"
            })
        }
    })
})

// BORRAR LOS DATOS DE LAS EMPRESAS
routeEmpresas.delete('/BorrarEmpresa', bodyparser.json(), (req, res)=>{

    const {idempresas} = req.body;

    if(!idempresas){

        res.json({
            status:false,
            mensaje:"El id de la empresa a borrar es un campo obligatorio"
        })

    }

    mysqlconnecction.query('delete from empresas where idempresas =?', [idempresas], (err, registro)=>{

        if(err){

            console.log("Error en la base de datos al borrar un estado --> ", err);

        }else{
            res.json({
                status:true,
                mensaje:"La empresa se a borrado de manera correcta"
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
module.exports = routeEmpresas;