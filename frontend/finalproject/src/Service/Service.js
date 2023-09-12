const URL ='http://localhost:2000';

export async function login(date){

    const options={

        method:'POST',
        body:JSON.stringify(date),
        Headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = await fetch(`${URL}/login`,options);

    const dato = await request.json();
    
    console.log(dato);

    return dato;
}