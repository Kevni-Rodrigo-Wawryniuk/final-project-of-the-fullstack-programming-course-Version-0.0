// libreria de mysql
const mysql = require('mysql');

// creando coneccion con la base de datos
const mysqlconnecction = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'stockst'
})

// verificando que se alla conectado correctamente la base de datos
mysqlconnecction.connect(function(err){
    if(err)
    {
        console.log('El error es: ---> ', err)
        return;
    }else{
        console.log('la coneccion con la base de dato a sido exitosa');
    }
})

// exportando el modulo para poder usarlo en otros componentes
module.exports = mysqlconnecction;