import './Droides.css';
import * as API from '../Service/Service.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

        window.location.href = '/Droides';
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
            <div className='containtBodyDroides'>
                <div className='containTituloDroides'>
                    <h2>Droides</h2>
                </div>
                <div className='containeButtonsDroides'>
                    <Link to='/Home'>
                        <button> Volver </button>
                    </Link>
                    <Link to='/Empresas'>
                        <button> Empresas </button>
                    </Link>
                    <Link to='/Vehiculos'>
                        <button> Vehiculos </button>
                    </Link>
                    <Link to='/Estados'>
                        <button> Estado </button>
                    </Link>
                    <Link to='/Modelos'>
                        <button> Modelos </button>
                    </Link>
                    <Link to='/TipoDeProductos'>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div className='containeButtonCargarDroides'>
                    <Link to='/AgregarDroides'>
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
                                            <Link to={`/ModificarDroides/${droid.id_droides}`}> <button> Editar </button> </Link>
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