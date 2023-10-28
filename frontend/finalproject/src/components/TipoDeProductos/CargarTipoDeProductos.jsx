import './TipotDeProductos.css';
import * as API from '../Service/Service.js';
import { Link } from 'react-router-dom';
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
                window.location.href = '/TipoDeProductos';
            }, 2500);
        } else {
            setmensaje(request.mensaje);
        }
    }

    return (
        <>
            <div className='containtBodyTipoDeProductos'>
                <h2> Cargar tipo de producto </h2>
                <div>
                    {mensaje}
                    <form onSubmit={CargarTipoProduto}>
                        <input
                            type="text"
                            value={nombre_tipo_productos}
                            onChange={(event) => setTipo_Producto(event.target.value)}
                            placeholder='Nombre del Producto'
                        />

                        <input
                            type="text"
                            value={codigo}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder='Codigo'
                        />

                        <button type='submit'> Cargar </button>
                        <Link to='/TipoDeProductos'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CargarTipoDeProductos;