import { useEffect, useState } from 'react';
import './TipotDeProductos.css';
import { Link } from 'react-router-dom';
import * as API from '../Service/Service.js';

function TipoDeProductos() {

    const [tipoProductos, setTipoDeProducto] = useState([]);

    useEffect(() => {
        API.getTipoDeProductos().then(setTipoDeProducto);
    }, []);

    // datos a borrar
    const borrarTipoDeProductos = async (event, id_tipo_productos) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteTipoDeProductos(id_tipo_productos);

        window.location.href = '/TipoDeProductos';
    }
    // verificar usuarios
    const userVerification = async () => {

        let correo;
        let token;

        correo = localStorage.getItem('correo');
        token = localStorage.getItem('token');

        const traerCorreo = await API.postCorreo({ correo });

        if (traerCorreo.status && token) {
            console.log('El usuario esta logeado');

        } else {
            window.location.href = '/';
            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());
    
    return (
        <>
            <div className='containtBodyTipoDeProductos'>
                <div className='containeTituloTipoDeProductos'>
                    <h2> Tipo de Productos </h2>
                </div>
                <div className='containeButtonsTipoDeProductos'>
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

                <div className='containeButtonCargarTipoDeProductos'>
                    <Link to='/AgregarTipoDeProductos'>
                        <button> cargar </button>
                    </Link>
                </div>

                <div className='containeTablaTipoDeProductos'>
                    <table>
                        <thead>
                            <tr>
                                <th>Configuraciones</th>
                                <th>nombre</th>
                                <th>codigo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipoProductos.map((tipoProd) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarTipoDeProductos/${tipoProd.id_tipo_productos}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarTipoDeProductos(event, tipoProd.id_tipo_productos)} > Borrar </button>
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