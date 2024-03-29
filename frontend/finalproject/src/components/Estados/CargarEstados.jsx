import '../css/carga.css';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../Service/Service.js';

function CargarEstados() {

    const [nombre_estado, setNombre_Estados] = useState('');
    const [codigos, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');

    const GuardarEstados = async (event) => {

        event.preventDefault();

        const respuesta = await API.postEstados({ nombre_estado, codigos });

        if (respuesta.status) {
            setmensaje(respuesta.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = `/Estados/${usuario}`;
            }, 2500);
        } else {
            setmensaje(respuesta.mensaje);
        }
    }

    const {usuario} = useParams();
    
    return (
        <>
            <div className='containeBody'>
            <main className='maincarga'>

                    <form onSubmit={GuardarEstados}>
                        <div className='mensaje'>
                            <h3> Cargar Estados </h3>
                            {mensaje}
                        </div>    
                        <div className='cont4'>
                        <input className='cont5'
                            type='text'
                            value={nombre_estado}
                            onChange={(event) => setNombre_Estados(event.target.value)}
                            placeholder='Nombre del Estado'
                        />
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="number"
                            pattern="[0-9]"
                            value={codigos}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder='Codigo'
                        />
                        </div>
                        <div className='cont4'>
                            <button type='submit'> Cargar </button>
                            <Link to={`/Estados/${usuario}`}> <button> volver </button> </Link>
                        </div>
                    </form>
                    </main>
            </div>
        </>
    );
}

export default CargarEstados;