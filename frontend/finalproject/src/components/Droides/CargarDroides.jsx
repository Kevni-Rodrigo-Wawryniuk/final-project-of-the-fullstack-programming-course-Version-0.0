import '../css/carga.css';
import { Link, useParams } from 'react-router-dom';
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
                window.location.href =`/Droides/${usuario}`;
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
                
                    <form onSubmit={CargarDroide}>
                        <div className='mensaje'>
                            <h3> Cargar de Droides</h3>
                            {mensaje}
                        </div>
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
                        <Link to={`/Droides/${usuario}`}> <button> Volver </button></Link>
                        </div>
                    </form>
                
            </main>
            </div>
        </>
    );
}
export default CargarDroides;