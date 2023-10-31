import './Estados.css';
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
            <div className='containeBodyEstados'>
                <h4> Estado a cambiar </h4>
                <div>{mensaje}</div>
                <table>
                    <thead>
                        <tr>
                            <td> nombre </td>
                            <td> codigo </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{estadoNombre}</td>
                            <td>{estadoCodigo}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <form onSubmit={editarEstado}>
                        <input
                            type="text"
                            value={nombre_estado}
                            onChange={(event) => setNombre_Estados(event.target.value)}
                            placeholder='Nombre del Estado'
                        />
                        <input
                            type="text"
                            value={codigo}
                            onChange={(event) => setCodigos(event.target.value)}
                            placeholder='Codgigo'
                        />

                        <button type='submit'> Guardar Edicion</button>
                        <Link to={`/Estados/${usuario}`}>
                            <button > Volver </button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarEstados;