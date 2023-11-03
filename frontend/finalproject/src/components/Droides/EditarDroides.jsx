import '../css/carga.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function EditarDroides() {

    // datos a cargar
    const [nombre_droides, setDroide] = useState('');
    const [codigo, setCodigo] = useState('');


    // lugar del dato a editar
    const { id_droides } = useParams();

    const editarDroide = async (event) => {

        event.preventDefault();

        const request = await API.putDroides(id_droides, { nombre_droides, codigo });

        if (request.status) {
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = `/Droides/${usuario}`;
            }, 1000);
        } else {
            setmensaje(request.mensaje);
        }
    }

    const [nombreAEditar, setNombreAEditar] = useState('');
    const [codigoAEditar, setCodigoAEditar] = useState('');

    const traerDatos = async () => {
        const datos = await API.getDroidesByID(id_droides);

        if(nombre_droides === ''){
        setNombreAEditar(datos.nombre_droides);
        let valorN = document.getElementById('nombreD').value = nombreAEditar;
            setDroide(valorN);
        }
        if(codigo === ''){
        setCodigoAEditar(datos.codigo);
        let valorD = document.getElementById('codigoD').value = codigoAEditar;
            setCodigo(valorD);
        }
    }

    document.addEventListener('loadstart', traerDatos());


    // mensaje de si la edicion se realizo 
    const [mensaje, setmensaje] = useState('');

    // usuario editando dato
    const { usuario } = useParams();

    return (
        <>
            <div className='containeBody'>

                <main className='maincarga'>
                    <form onSubmit={editarDroide}>
                        <div className='mensaje'>
                            <h3> Editar Droides</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                                type="text"
                                id='nombreD'
                                value={nombre_droides}
                                onChange={(event) => setDroide(event.target.value)}
                            />
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                                type="number"
                                id='codigoD'
                                value={codigo}
                                onChange={(event) => setCodigo(event.target.value)}
                            />
                        </div>
                        <div className='cont4'>
                            <button type='submit'> Editar </button>
                            <Link to={`/Droides/${usuario}`} > <button> volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}

export default EditarDroides;