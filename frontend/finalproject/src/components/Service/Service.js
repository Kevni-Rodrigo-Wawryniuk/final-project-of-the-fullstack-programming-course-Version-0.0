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

//////////////////////// DATOS DE LOS DROIDES //////////
/*
export async function getDroides(){

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
*/
////////////////////////////////////////////////////////

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

// MODIFICAR LOS DATOS
export async function updateEmpresas(id_Empresa, modificar){

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
export async function addEmpresas(date){

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
/*
export async function deleteEmpresas(id_Empresa, borrar){

    const Options = {
        method:'DELETE',
        body: JSON.stringify(borrar),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    //const request = await fetch(`${URL}/`)
}*/
///////////////////////////////////////////////////////