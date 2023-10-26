/* eslint-disable no-unused-vars */
import './Vehiculos.css';
import { Link } from 'react-router-dom';
import * as API from '../Service/Service.js';
import { useEffect, useState } from 'react';

function Vehiculos() {

    // ver datos de los vehiculos
    const [vehiculo, setVehiculos] = useState([]);

    useEffect(() => {
        API.getVehiculos().then(setVehiculos);
    }, []);

    // borrar datos
    const borrarDato = async (event, id_Vehiculo) => {

        event.preventDefault();

        const request = await API.deleteVehiculos(id_Vehiculo);

        window.location.href = '/Vehiculos'
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
            <div className='containtBodyVehiculos'>
                <div className='containeTituloVehiculos'>
                    <h2>Vehiculos</h2>
                </div>
                <div className='containeButtonsVehiculos'>
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
                    <Link to='/Modelos'>
                        <button> Modelos </button>
                    </Link>
                    <Link to='/TipoDeProductos'>
                        <button> Tipo de productos </button>
                    </Link>
                </div>

                <div className='containeButtonCargarVehiculos'>
                    <Link to='/AgregarVehiculos'>
                        <button> cargar </button>
                    </Link>
                </div>

                <div className='containeTablaVehiculos'>
                    <table>
                        <thead>
                            <tr>
                                <th>Configuraciones</th>
                                <th>nombre</th>
                                <th>codigo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculo.map((vehi) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarVehiculos/${vehi.id_vehiculos}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarDato(event, vehi.id_vehiculos)} > Borrar </button>
                                    </td>
                                    <td>{vehi.nombre_vehiculos}</td>
                                    <td>{vehi.codigo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Vehiculos;