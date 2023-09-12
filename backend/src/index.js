// libreria de express
const express = require('express');
const app = express();

// libreria de morgan
const morgan = require('morgan');

// seteando el puerto
app.set('puerto', 2000);

// usando morgan
app.use(morgan('dev'));

// permiso para poder usar los methodos en el frontend
app.use(function(req,res,next){

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Rutas
// LOGIN
app.use(require('./routes/routeLogin.js'));
// EMPRESAS
app.use(require('./routes/routeEmpresas.js'));
// ESTADOS
app.use(require('./routes/routeEstado.js'));
// DROIDES
app.use(require('./routes/routeDroides.js'));
// MODELOS
app.use(require('./routes/routeModelos.js'));
// VEHICULOS
app.use(require('./routes/routeVehiculos.js'));
// TIPO DE PRODUCTOS
app.use(require('./routes/routeTipoProducto.js'));

// prueba de si funcionan los methodos de llamada
app.get('/PruebaGet',(req,res)=>{
    res.send('methodo GET');
})

// verificando que el servidor se levanto correctamente
app.listen(app.get('puerto'),() =>{
    console.log('El servidor esta corriendo en el puerto --> ', app.get('puerto'));
});
