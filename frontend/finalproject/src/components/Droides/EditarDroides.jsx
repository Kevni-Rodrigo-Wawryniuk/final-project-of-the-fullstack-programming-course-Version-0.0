import '../css/pantallas.css';
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
            <div className='contaiteBody'>
                <table>
                    <thead>
                        <tr>
                            <td> nombre </td>
                            <td> codigo </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{nombre_A_editar}</td>
                            <td>{codigo_A_editar}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    {mensaje}
                </div>
                <form onSubmit={editarDroide}>
                    <input
                        type="text"
                        value={nombre_droides}
                        onChange={(event) => setDroide(event.target.value)}
                        placeholder='Nombre del droide'
                    />

                    <input
                        type="text"
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        placeholder='codigo'
                    />

                    <button type='submit'> Editar </button>
                    <Link to={`/Droides/${usuario}`} > <button> volver </button> </Link>
                </form>
            </div>
        </>
    );
}

export default EditarDroides;