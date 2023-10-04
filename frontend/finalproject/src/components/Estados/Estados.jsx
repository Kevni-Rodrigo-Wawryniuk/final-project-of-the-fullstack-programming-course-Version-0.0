import './Estados.css';
import * as API from '../Service/Service.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

        window.location.href = '/Estados'
    }
    return (
        <>
            <div className='containeBodyEstados'>
                <div>
                    <h2>Estados</h2>
                </div>
                <div>
                    <Link to='/Home'>
                        <button> volver </button>
                    </Link>
                    <Link to='/Empresas'>
                        <button> Empresas </button>
                    </Link>
                    <Link to='/Vehiculos'>
                        <button> Vehiculos </button>
                    </Link>
                    <Link to='/Droides'>
                        <button> Droides </button>
                    </Link>
                    <Link to='/Modelos'>
                        <button> Modelos </button>
                    </Link>
                    <Link to='/TipoDeProductos'>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div>
                    <Link to='/AgregarEstados'>
                        <button>Cargar</button>
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
                            {estados.map((estad) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarEstados/${estad.id_estados}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarEstado(event, estad.id_estados)} > Borrar </button>
                                    </td>
                                    <td>{estad.nombre_estados}</td>
                                    <td>{estad.codigo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Estados;