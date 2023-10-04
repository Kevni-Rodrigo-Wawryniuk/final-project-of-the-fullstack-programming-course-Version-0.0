import './Modelos.css';
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

        const request = await API.putModelos(id_modelos, { nombre_modelos, codigo });

        if (request.status) {
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = '/Modelos';
            }, 2500);
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

    return (
        <>
            <div className='containtBodyModelos'>
                <table>
                    <thead>
                        <tr>
                            <td> modelo </td>
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
                    <form onSubmit={editarModelo}>
                        <input
                            type="text"
                            value={nombre_modelos}
                            onChange={(event) => setmodelos(event.target.value)}
                            placeholder='Nombre del Modelo'
                        />

                        <input
                            type="text"
                            value={codigo}
                            onChange={(event) => setcodigo(event.target.value)}
                            placeholder='Codigo'
                        />
                        <button type='submit' > Editar </button>
                        <Link to='/Modelos'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditarModelos;