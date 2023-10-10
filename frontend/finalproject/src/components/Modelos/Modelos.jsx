import './Modelos.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as API from '../Service/Service.js';

function Modelos() {

    // ver los modelos
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        API.getModelos().then(setModelos);
    }, []);

    // borrar modelos
    const borrarModelo = async (event, id_modelos) =>{

        event.preventDefault();

        const request = await API.deleteModelos(id_modelos);

        window.location.href='/Modelos';
    }

    return (
        <>
            <div className='containtBodyModelos'>
                <div>
                    <h2>Modelos</h2>
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
                    <Link to='/TipoDeProductos'>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div>
                    <Link to='/AgregarModelos'>
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
                            {modelos.map((modelo) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarModelos/${modelo.id_modelos}`} > <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarModelo(event, modelo.id_modelos)}> Borrar </button>
                                    </td>
                                    <td>{modelo.nombre_modelos}</td>
                                    <td>{modelo.codigo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Modelos;