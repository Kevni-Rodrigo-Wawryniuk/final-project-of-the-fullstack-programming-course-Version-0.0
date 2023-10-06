const URL ='http://localhost:2000';

///////////////////////// LOGEO Y REGISTRO DE USUARIO /////////////////////
export async function logeo(date){

    const options={

        method:'POST',
        body:JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/login`,options);

    const dato = await request.json();
    
    console.log(dato);

    return dato;
}

export async function registrar(date){

    const Options={
        method:'POST',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/Registros`, Options);

    const dato = await request.json();

    return dato;
}
///////////////////////////////////////////////////////////////////////////




///////////////////////// DATOS DE LOS ESTADOS //////////
// TRAER LOS DATOS DE LOS ESTADOS
export async function getEstados(){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const request = await fetch(`${URL}/verEstados`, Options);
    const dato = await request.json();
    return dato;
}
// CARGAR DATOS DE LOS ESTADOS
export async function postEstados(date){

    const Options={
        method:'POST',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/cargarEstado`,Options);
    const dato = await request.json();
    return dato;
}
// MODIFICAR LOS DATOS DE LOS ESTADOS
export async function putEstados(id_estados, date){
    
    const Options={
        method:'PUT',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }
    
    const request = await fetch(`${URL}/modificarEstado/${id_estados}`, Options);

    const dato = await request.json();

    return dato;
}
// LLEVAR DATOS POR ID
export async function getEstadosByID(id_estados){
   
    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verEstado/${id_estados}`, Options);
 
    const dato = await request.json();
 
    return dato[0];
}
// BORRAR LOS DATOS POR ID
export async function deleteEstados(id_estados){

    const Options={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/borrarEstado/${id_estados}`, Options);

    const dato = await request.json();

    return dato[0];
}
/////////////////////////////////////////////////////////




//////////////////////// DATOS DE LOS DROIDES //////////
// TRAER LOS DATOS DE LOS DROIDES
export async function getDroides(){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verDriodes`, Options);
    
    const dato = await request.json();

    return dato;    
}
// CARGAR DATOS DE LOS DROIDES
export async function postDroides(date){

    const Options ={
        method:'POST',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/cargarDroides`, Options);
    const dato = await request.json();
    return dato;
}
// BORRAR LOS DATOS POR ID
export async function deleteDroides(id_Droides){

    const Options={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/BorrarDroide/${id_Droides}`, Options);

    const dato = await request.json();

    return dato[0];
}
// MODIFICAR DATOS POR ID
export async function putDroides(id_Droide, date){
    
    const Options={
        method:'PUT',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }
    
    const request = await fetch(`${URL}/modificarDroides/${id_Droide}`, Options);

    const dato = await request.json();

    return dato;
}
// LLEVAR DATOS POR ID
export async function getDroidesByID(id_droide){
   
    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verDriode/${id_droide}`, Options);
 
    const dato = await request.json();
 
    return dato[0];
}
////////////////////////////////////////////////////////




/////////////////////////// DATOS DE LOS VEHICULOS //////////
export async function getVehiculos(){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/verVehiculos`, Options);
    const dato = await request.json();
    return dato;
}
// CARGAR DATOS DE LOS VEHICULOS
export async function postVehiculos(date){

    const Options={
        method:'POST',
        body:JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/cargarVehiculos`, Options);
    const dato = await request.json();
    return dato;
}
// MODIFICAR DATOS POR ID
export async function putVehiculos(id_Vehiculos, date){

    const Options={
        method:'PUT',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/modificarVehiculos/${id_Vehiculos}`,Options);
    const dato = await request.json();
    return dato;
}
// LLEVAR DATOS POR ID
export async function getVehiculosByID(id_vehiculos){
   
    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verVehiculo/${id_vehiculos}`, Options);
    const dato = await request.json();
    return dato[0];
}
// BORRAR DATOS POR ID
export async function deleteVehiculos(id_vehiculo){

    const Options ={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/BorrarVehiculo/${id_vehiculo}`, Options);
    const dato = await request.json();
    return dato;
}
/////////////////////////////////////////////////////////////




////////////////////////// DATOS TIPO DE PRODUCTOS ////////
export async function getTipoDeProductos(){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/verTipoProducto`, Options);
    const dato = await request.json();
    return dato;
}
// CARGAT TIPO DE PRODUCTO
export async function postTipoDeProductos(date){

    const Options={
        method:'POST',
        body:JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/cargarTipoProducto`, Options);
    const dato = await request.json();
    return dato;
}
// MODIFICAR DATOS
export async function putTipoDeProductos(id_tipo_productos, date){
  
    const Options={
        method:'PUT',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/modificarTipoProducto/${id_tipo_productos}`, Options);
    const dato = await request.json();
    return dato;
}
// TRAER DATOS POR ID
export async function getTipoDeProductosByID(id_tipo_productos){

     const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/verTipoProductos/${id_tipo_productos}`, Options);
    const dato = await request.json();
    return dato[0];
}
// BORRAR DATOS POR ID
export async function deleteTipoDeProductos(id_tipo_productos){

     const Options={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/BorrarTipoProducto/${id_tipo_productos}`, Options);
    const dato = await request.json();
    return dato;
}
//////////////////////////////////////////////////////////




///////////////////////// DATOS DE MODELOS /////////////
export async function getModelos(){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verModelos`, Options);
    const dato = await request.json();
    return dato;
}
// CARGAR MODELO
export async function postModelos(date){

    const Options={
        method:'POST',
        body:JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/cargarModelos`,Options);
    const dato = await request.json();
    return dato;
}
// MODIFICAR DATOS
export async function putModelos(id_modelos, date){
    
    const Options={
        method:'PUT',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    } 
    const request = await fetch(`${URL}/modificarModelo/${id_modelos}`, Options);
    const dato = await request.json();
    return dato;
}
// TRAER MODELOS POR ID
export async function getModelosByID(id_modelos){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/verModelo/${id_modelos}`, Options);
    const dato = await request.json();
    return dato[0];
}
// BORRAR MODELOS
export async function deleteModelos(id_modelos){

    const Options={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/BorrarModelo/${id_modelos}`, Options);
    const dato = await request.json();
    return dato;
}
///////////////////////////////////////////////////////




///////////////////////  DATOS DE LAS EMPRESAS ////////

// TRAER Y MOSTRAR LOS DATOS
export async function getEmpreas(){
    
    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/verTodasLasEmpresas`, Options);
    
    const dato = await request.json();

    return dato;    
}

// TRAER LOS DATOS POR ID
export async function getEmpresasByID(id_Empresa){

    const Options={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`${URL}/VerEmpresas/${id_Empresa}`, Options);
    const dato = await request.json();
    return dato [0];
}
// MODIFICAR LOS DATOS
export async function putEmpresas(id_Empresa, modificar){

    const Options={
        method:'PUT',
        body: JSON.stringify(modificar),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/modificarEmpresas/${id_Empresa}`, Options);

    const dato = await request.json();

    return dato;
}
// CARGAR DATOS
export async function postEmpresas(date){

    const Options={
        method:'POST',
        body: JSON.stringify(date),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/cargarEmpresas`, Options);

    const dato = await request.json();

    return dato;
}
// BORRAR DATOS
export async function deleteEmpresas(idempresa){

    const Options = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/BorrarEmpresa/${idempresa}`, Options);
    const dato = request.json();
    return dato;
}
///////////////////////////////////////////////////////