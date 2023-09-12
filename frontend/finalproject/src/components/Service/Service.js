const URL ='http://localhost:2000';

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