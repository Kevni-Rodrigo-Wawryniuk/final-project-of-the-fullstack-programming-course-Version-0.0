import { useEffect, useState } from 'react';
import './TipotDeProductos.css';
import { Link, useParams } from 'react-router-dom';
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

        setInterval("location.reload()", 1000);
    }
    // verificar usuarios

    const {usuario} = useParams();
    const userVerification = async () => {

        let token;

        token = localStorage.getItem('token');

        const traerCorreo = await API.postUsuario(usuario);

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
                <Link to={`/Home/${usuario}`}>
                        <button> Volver </button>
                    </Link>
                    <Link to={`/Empresas/${usuario}`}>
                        <button> Empresas </button>
                    </Link>
                    <Link to={`/Vehiculos/${usuario}`}>
                        <button> Vehiculos </button>
                    </Link>
                    <Link to={`/Estados/${usuario}`}>
                        <button> Estado </button>
                    </Link>
                    <Link to={`/Modelos/${usuario}`}>
                        <button> Modelos </button>
                    </Link>
                    <Link to={`/Droides/${usuario}`}>
                        <button> Droides </button>
                    </Link>
                </div>

                <div className='containeButtonCargarTipoDeProductos'>
                    <Link to={`/AgregarTipoDeProductos/${usuario}`}>
                        <button> Cargar </button>
                    </Link>
                </div>

                <div className='containeTablaTipoDeProductos'>
                    <table>
                        <nav>
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
                                        <Link to={`/ModificarTipoDeProductos/${tipoProd.id_tipo_productos}/${usuario}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarTipoDeProductos(event, tipoProd.id_tipo_productos)} > Borrar </button>
                                    </td>
                                    <td>{tipoProd.nombre_tipo_productos}</td>
                                    <td>{tipoProd.codigo}</td>
                                </tr>
                            ))}
                        </tbody>
                        </nav>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TipoDeProductos;