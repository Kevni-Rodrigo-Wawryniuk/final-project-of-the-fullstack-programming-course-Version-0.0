import './Modelos.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
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
                window.location.href=`/Modelos/${usuario}`;
            }, 1000);
        }else{
            setmensaje(request.mensaje);
        }
    }

    const {usuario} = useParams();
    return(
        <>
            <div className='containtBodyModelos1'>
                <div className='mensaje'>
                <h3> Cargar Modelos </h3>
                    {mensaje}
                </div>   
                <div>
                    <form onSubmit={CargarModelo}>
                        <div className='cont4'>
                        <input className='cont5'
                        type="text"
                        value={nombre_modelos}
                        onChange={(event) => setModelos(event.target.value)}
                        placeholder='Nombre del Modelos' 
                        />
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                                type="number"
                                pattern="[0-9]"
                                value={codigo}
                                onChange={(event) => setCodigo(event.target.value)}
                                placeholder='Codigo'
                            />
                        </div>
                        <div className='cont4'>
                            <button type='submit'> Cargar </button>
                            <Link to={`/Modelos/${usuario}`}> <button> volver </button> </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CargarModelos;