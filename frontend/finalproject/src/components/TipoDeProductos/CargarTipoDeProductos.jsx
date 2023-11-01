import '../css/carga.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function CargarTipoDeProductos() {

    const [nombre_tipo_productos, setTipo_Producto] = useState('');
    const [codigo, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');

    const CargarTipoProduto = async (event) => {

        event.preventDefault();

        const request = await API.postTipoDeProductos({ nombre_tipo_productos, codigo });

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
    const {usuario} = useParams();

    return (
        <>
            <div className='containeBody'>
               
                <main className='maincarga'>
                    <form onSubmit={CargarTipoProduto}>
                        <div className='mensaje'>
                            <h3> Cargar de Tipo de Productos</h3>
                            {mensaje}
                        </div>  
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_tipo_productos}
                            onChange={(event) => setTipo_Producto(event.target.value)}
                            placeholder='Nombre del Producto'
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
                            <Link to={`/TipoDeProductos/${usuario}`}> <button> volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default CargarTipoDeProductos;