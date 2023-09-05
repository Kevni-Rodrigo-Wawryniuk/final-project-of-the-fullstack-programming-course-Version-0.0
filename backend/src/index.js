// libreria de express
const express = require('express');
const app = express();

// libreria de morgan
const morgan = require('morgan');

// seteando el puerto
app.set('puerto', 2000);

// usando morgan
app.use(morgan('dev'));

// Rutas
app.use(require('./routes/routeLogin.js'));
app.use(require('./routes/routeEmpresas.js'));
app.use(require('./routes/routeEstado.js'));
app.use(require('./routes/routeDroides.js'));
app.use(require('./routes/routeModelos.js'));
app.use(require('./routes/routeVehiculos.js'));
app.use(require('./routes/routeTipoProducto.js'));

// prueba de si funcionan los methodos de llamada
app.get('/PruebaGet',(req,res)=>{
    res.send('methodo GET');
})

// verificando que el servidor se levanto correctamente
app.listen(app.get('puerto'),() =>{
    console.log('El servidor esta corriendo en el puerto --> ', app.get('puerto'));
});
