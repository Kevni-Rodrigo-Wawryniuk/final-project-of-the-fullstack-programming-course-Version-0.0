import './Droides.css';
import * as API from '../Service/Service.js';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Droides() {

    // ver los datos cargados
    const [droides, setDroides] = useState([]);

    useEffect(() => {
        API.getDroides().then(setDroides)
    }, [])
    // 

    // borrar los datos
    const borrarDroide = async (event, id_Droide) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteDroides(id_Droide);

        setInterval("location.reload()",1000);
    }
    // verificar usuarios

    const {usuario} = useParams();

    const userVerification = async () => {

        let token;

        token = localStorage.getItem('token');

        const traerCorreo = await API.postUsuario(usuario );

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
            <div className='containtBodyDroides'>
                <div className='containTituloDroides'>
                    <h2>Droides</h2>
                </div>
                <div className='containeButtonsDroides'>
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
                    <Link to={`/TipoDeProductos/${usuario}`}>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div className='containeButtonCargarDroides'>
                    <Link to={`/AgregarDroides/${usuario}`}>
                        <button> Cargar </button>
                    </Link>
                </div>

                <div className='containeTablaDroides'>
                    <table>
                        <nav>                        
                        <thead>
                            <tr>
                                <th>Configuraciones</th>
                                <th>Nombre</th>
                                <th>Codigo</th>
                            </tr>
                        </thead>
                            <tbody>
                                {droides.map((droid) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <tr>
                                        <td>
                                            <Link to={`/ModificarDroides/${droid.id_droides}/${usuario}`}> <button> Editar </button> </Link>
                                            <button onClick={(event) => borrarDroide(event, droid.id_droides)}> Borrar </button>
                                        </td>
                                        <td>{droid.nombre_droides}</td>
                                        <td>{droid.codigo}</td>
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

export default Droides;