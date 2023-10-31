import './Modelos.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as API from '../Service/Service.js';

function Modelos() {

    // ver los modelos
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        API.getModelos().then(setModelos);
    }, []);

    // borrar modelos
    const borrarModelo = async (event, id_modelos) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteModelos(id_modelos);

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
            <div className='containtBodyModelos'>
                <div className='containeTituloModelos'>
                    <h2>Modelos</h2>
                </div>
                <div className='containeButtonsModelos'>
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
                    <Link to={`/Droides/${usuario}`}>
                        <button> Droides </button>
                    </Link>
                    <Link to={`/TipoDeProductos/${usuario}`}>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div className='containeButtonCargarModelos'>
                    <Link to={`/AgregarModelos/${usuario}`}>
                        <button> Cargar </button>
                    </Link>
                </div>

                <div className='containeTablaModelos'>
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
                            {modelos.map((modelo) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarModelos/${modelo.id_modelos}/${usuario}`} > <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarModelo(event, modelo.id_modelos)}> Borrar </button>
                                    </td>
                                    <td>{modelo.nombre_modelos}</td>
                                    <td>{modelo.codigo}</td>
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

export default Modelos;