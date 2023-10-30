import './Droides.css';
import { Link } from 'react-router-dom';
import * as API from '../Service/Service.js';
import { useState } from 'react';

function CargarDroides() {
    
    const [nombre_droides, setDroides] = useState('');
    const [codigo, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');

    const CargarDroide = async (event) => {
       
        event.preventDefault();

        const respuesta = await API.postDroides({ nombre_droides, codigo })
        console.log(respuesta);
        if (respuesta.status) {
            setmensaje(respuesta.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href ='/Droides';
            }, 2500);
        } else {
            setmensaje(respuesta.mensaje);
        }
    }

    return (
        <>
            <div className='containtBodyDroides1'>
                {mensaje}
                <div>
                    <form onSubmit={CargarDroide}>
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_droides}
                            onChange={(event) => setDroides(event.target.value)}
                            placeholder='Nombre del Droide'
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
                        <Link to='/Droides'> <button> volver </button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default CargarDroides;