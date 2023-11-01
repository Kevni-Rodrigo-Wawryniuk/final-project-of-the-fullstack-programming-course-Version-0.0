import '../css/carga.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

    // dato a editar
    const [nombre_A_editar, setnombreAEditar] = useState('');
    const [codigo_A_editar, setcodigoAEditar] = useState('');

    const traerDatos = async () => {
        const datos = await API.getDroidesByID(id_droides);
        setnombreAEditar(datos.nombre_droides);
        setcodigoAEditar(datos.codigo);
    }

    useEffect(() => {
        traerDatos();
    });

    // mensaje de si la edicion se realizo 
    const [mensaje, setmensaje] = useState('');

    // usuario editando dato
    const {usuario} = useParams();

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
                        value={nombre_droides}
                        onChange={(event) => setDroide(event.target.value)}
                        placeholder={nombre_A_editar}
                    />
                    </div>
                    <div className='cont4'>
                    <input className='cont5'
                        type="number"
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        placeholder={codigo_A_editar}
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