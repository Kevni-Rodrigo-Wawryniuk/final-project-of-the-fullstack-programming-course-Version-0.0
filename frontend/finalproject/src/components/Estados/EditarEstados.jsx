import '../css/carga.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarEstados() {

    // datos a cargar
    const [nombre_estado, setNombre_Estados] = useState('');
    const [codigo, setCodigos] = useState('');
    const [mensaje, setmensaje] = useState('');

    // datos a editar
    const [estadoNombre, setEstadoNombre] = useState('');
    const [estadoCodigo, setEstadosCodigo] = useState('');

    const { id_estados } = useParams();

    useEffect(() => {
        traerDatos();
    });

    const traerDatos = async () => {
        const dato = await API.getEstadosByID(id_estados);
        setEstadoNombre(dato.nombre_estados);
        setEstadosCodigo(dato.codigo);
    }

    const editarEstado = async (event) => {

        event.preventDefault();

        const request = await API.putEstados(id_estados, { nombre_estado, codigo });

        if (request.status) {
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = `/Estados/${usuario}`
            }, 1000);
        }else{
            setmensaje(request.mensaje);
        }
    }

    const {usuario} = useParams();

    return (
        <>
            <div className='containeBody'>
                <main className='maincarga'>            
                    <form onSubmit={editarEstado}>
                        <div className='mensaje'>
                            <h3> Editar Estado</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_estado}
                            onChange={(event) => setNombre_Estados(event.target.value)}
                            placeholder='Nombre del Estado'
                        />
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="number"
                            value={codigo}
                            onChange={(event) => setCodigos(event.target.value)}
                            placeholder='Codgigo'
                        />
                        </div>
                        <div className='cont4'>
                            <button type='submit'> Guardar Edicion</button>
                            <Link to={`/Estados/${usuario}`}>
                                <button > Volver </button>
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default EditarEstados;