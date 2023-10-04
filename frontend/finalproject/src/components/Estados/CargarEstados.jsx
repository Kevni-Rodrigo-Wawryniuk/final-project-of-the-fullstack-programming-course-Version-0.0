import './Estados.css';
import { useState } from "react";
import { Link } from "react-router-dom";
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
                window.location.href = '/Estados';
            }, 2500);
        } else {
            setmensaje(respuesta.mensaje);
        }
    }

    return (
        <>
            <div className='containeBodyEstados'>
                {mensaje}
                <div>
                    <form onSubmit={GuardarEstados}>
                        <input
                            type='text'
                            value={nombre_estado}
                            onChange={(event) => setNombre_Estados(event.target.value)}
                            placeholder='Nombre del Estado'
                        />

                        <input
                            type='text'
                            value={codigos}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder='Codigo'
                        />

                        <button type='submit'> Cargar </button>
                        <Link to='/Estados'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CargarEstados;