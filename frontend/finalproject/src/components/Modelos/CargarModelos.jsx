import './Modelos.css';
import * as API from '../Service/Service.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CargarModelos(){

    const [nombre_modelos, setModelos] = useState('');
    const [codigo, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');

    const CargarModelo = async (event) =>{

        event.preventDefault();

        const request = await API.postModelos({nombre_modelos, codigo});

        if(request.status){
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href='/Modelos';
            }, 2500);
        }else{
            setmensaje(request.mensaje);
        }
    }
    return(
        <>
            <div className='containtBodyModelos'>
                <h2> Cargar Modelo </h2>
                <div>
                    {mensaje}
                    <form onSubmit={CargarModelo}>
                        <input 
                        type="text"
                        value={nombre_modelos}
                        onChange={(event) => setModelos(event.target.value)}
                        placeholder='Nombre del Vehiculo' 
                        />

                        <input 
                        type="text" 
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        placeholder='Codigo'
                        />

                        <button type='submit'> Cargar </button>
                        <Link to='/Modelos'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CargarModelos;