import { useEffect, useState } from 'react';
import './TipotDeProductos.css';
import { useParams } from 'react-router';
import * as API from '../Service/Service.js';
import { Link } from 'react-router-dom';

function EditarTipoDeProductos() {

    // datos a editar
    const [nombre_tipo_productos, setTipoDeProductos] = useState('');
    const [codigo, setCodigo] = useState('');

    // mensaje si se edita bien el parametro o no
    const [mensaje, setmensaje] = useState('');

    // lugar a editar
    const { id_tipo_productos } = useParams();

    const editarTipoDeProducto = async (event) => {

        event.preventDefault();

        const request = await API.putTipoDeProductos(id_tipo_productos, { nombre_tipo_productos, codigo });

        if (request.status) {
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href = `/TipoDeProductos/${usuario}`;
            }, 1000);
        } else {
            setmensaje(request.mensaje);
        }
    }

    // viendo datos a editar
    const [nombre_A_editar, setnombreAEditar] = useState('');
    const [codigo_A_editar, setcodigoAEditar] = useState('');

    const traerDatos = async () => {
        const datos = await API.getTipoDeProductosByID(id_tipo_productos);
        setnombreAEditar(datos.nombre_tipo_productos);
        setcodigoAEditar(datos.codigo);
    }

    useEffect(() => {
        traerDatos();
    });

    const {usuario} = useParams();

    return (
        <>
            <div className='containtBodyTipoDeProductos'>
                <table>
                    <thead>
                        <tr>
                            <td> Tipo de Producto </td>
                            <td> Codigo </td>
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
                <form onSubmit={editarTipoDeProducto}>
                    <input
                        type="text"
                        value={nombre_tipo_productos}
                        onChange={(event) => setTipoDeProductos(event.target.value)}
                        placeholder='Nombre Del Producto'
                    />

                    <input
                        type="text"
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        placeholder='Codigo'
                    />

                    <button type='submit'> Editar </button>
                    <Link to={`/TipoDeProductos/${usuario}`}> <button> Volver </button> </Link>
                </form>
            </div>
        </>
    )
}

export default EditarTipoDeProductos;