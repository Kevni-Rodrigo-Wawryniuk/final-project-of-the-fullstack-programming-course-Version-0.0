/* eslint-disable react/jsx-key */
import './Estados.css';
import * as API from '../Service/Service.js';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Estados() {

    // Esto es para mostrar los datos en pantalla
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        API.getEstados().then(setEstados)
    }, []);

    // BORRAR LOS DATOS
    const borrarEstado = async (event, id_estados) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteEstados(id_estados);

        setInterval("location.reload()",1000);
    }

    // verificar usuarios

    const { usuario }= useParams();

    const userVerification = async () => {

        let token;

        token = localStorage.getItem('token');

        const traerCorreo = await API.postUsuario( usuario );

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
            <div className='containeBodyEstados'>
                <div className='containeTituloEstados'>
                    <h2>Estados</h2>
                </div>
                <div className='containeButtonsEstados'>
                <Link to={`/Home/${usuario}`}>
                        <button> Volver </button>
                    </Link>
                    <Link to={`/Empresas/${usuario}`}>
                        <button> Empresas </button>
                    </Link>
                    <Link to={`/Vehiculos/${usuario}`}>
                        <button> Vehiculos </button>
                    </Link>
                    <Link to={`/Droides/${usuario}`}>
                        <button> Droides </button>
                    </Link>
                    <Link to={`/Modelos/${usuario}`}>
                        <button> Modelos </button>
                    </Link>
                    <Link to={`/TipoDeProductos/${usuario}`}>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div className='containeButtonCargarEstados'>
                    <Link to={`/AgregarEstados/${usuario}`}>
                        <button>Cargar</button>
                    </Link>
                </div>

                <div className='containeTablaEstados'>
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
                            {estados.map((estad) => (
                                <tr>
                                    <td>
                                        <Link to={`/ModificarEstados/${estad.id_estados}/${usuario}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarEstado(event, estad.id_estados)} > Borrar </button>
                                    </td>
                                    <td>{estad.nombre_estados}</td>
                                    <td>{estad.codigo}</td>
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

export default Estados;