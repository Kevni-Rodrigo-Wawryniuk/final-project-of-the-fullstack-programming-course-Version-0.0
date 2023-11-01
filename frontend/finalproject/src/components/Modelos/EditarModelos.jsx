import '../css/carga.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarModelos() {

    // datos a cargar 
    const [nombre_modelos, setmodelos] = useState('');
    const [codigo, setcodigo] = useState('');

    // lugar del dato a editar
    const { id_modelos } = useParams();

    const [mensaje, setmensaje] = useState('');

    const editarModelo = async (event) => {

        event.preventDefault();

        let token = localStorage.getItem('correo');

        const request = await API.putModelos({ nombre_modelos, codigo }, id_modelos);

        if (request.status && token) {
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = `/Modelos/${usuario}`;
            }, 1000);
        } else {
            setmensaje(request.mensaje);
        }
    }

    // dato a editar
    const [nombre_A_editar, setnombreAEditar] = useState('');
    const [codigo_A_editar, setcodigoAEditar] = useState('');

    const traerDatos = async () => {
        const datos = await API.getModelosByID(id_modelos);
        setnombreAEditar(datos.nombre_modelos);
        setcodigoAEditar(datos.codigo);
    }

    useEffect(() => {
        traerDatos();
    });

    const {usuario} = useParams();
    return (
        <>
            <div className='containeBody'>
                <main className='maincarga'>
                    <form onSubmit={editarModelo}>
                        <div className='mensaje'>
                            <h3> Editar Modelo</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_modelos}
                            onChange={(event) => setmodelos(event.target.value)}
                            placeholder='Nombre del Modelo'
                        />
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                            type="number"
                            value={codigo}
                            onChange={(event) => setcodigo(event.target.value)}
                            placeholder='Codigo'
                        />
                        </div>
                        <div className='cont4'>
                            <button type='submit' > Editar </button>
                            <Link to={`/Modelos/${usuario}`}> <button> volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}

export default EditarModelos;