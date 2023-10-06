import { useEffect, useState } from 'react';
import './TipotDeProductos.css';
import { Link } from 'react-router-dom';
import * as API from '../Service/Service.js';

function TipoDeProductos() {

    const [tipoProductos, setTipoDeProducto] = useState([]);

    useEffect(() =>{
        API.getTipoDeProductos().then(setTipoDeProducto);
    }, []);

    // datos a borrar
    const borrarTipoDeProductos = async (event, id_tipo_productos) =>{

        event.preventDefault();
        
        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteTipoDeProductos(id_tipo_productos);

        window.location.href='/TipoDeProductos';
    }
    return (
        <>
            <div className='containtBodyTipoDeProductos'>
                <div>
                    <h2> Tipo de Productos </h2>
                </div>
                <div>
                    <Link to='/Home'>
                        <button> volver </button>
                    </Link>
                    <Link to='/Empresas'>
                        <button> Empresas </button>
                    </Link>
                    <Link to='/Droides'>
                        <button> Droides </button>
                    </Link>
                    <Link to='/Estados'>
                        <button> Estado </button>
                    </Link>
                    <Link to='/Vehiculos'>
                        <button> Vehiculos </button>
                    </Link>
                    <Link to='/Modelos'>
                        <button> Modelos </button>
                    </Link>
                </div>

                <div>
                    <Link to='/AgregarTipoDeProductos'>
                        <button> cargar </button>
                    </Link>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Configuraciones</th>
                                <th>nombre</th>
                                <th>codigo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipoProductos.map((tipoProd) =>(
                            // eslint-disable-next-line react/jsx-key
                            <tr>
                                <td>
                                    <Link to={`/ModificarTipoDeProductos/${tipoProd.id_tipo_productos}`}> <button> Editar </button> </Link>
                                    <button onClick={(event) => borrarTipoDeProductos (event, tipoProd.id_tipo_productos)} > Borrar </button>
                                </td>
                                <td>{tipoProd.nombre_tipo_productos}</td>
                                <td>{tipoProd.codigo}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TipoDeProductos;