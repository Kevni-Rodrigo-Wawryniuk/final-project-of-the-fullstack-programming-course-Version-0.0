import { useEffect, useState } from 'react';
import '../css/carga.css';
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
            <div className='containeBody'>
                <main className='maincarga'>
                    <form onSubmit={editarTipoDeProducto}>
                        <div className='mensaje'>
                            <h3> Editar Tipo de producto</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_tipo_productos}
                            onChange={(event) => setTipoDeProductos(event.target.value)}
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
                        <Link to={`/TipoDeProductos/${usuario}`}> <button> Volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default EditarTipoDeProductos;