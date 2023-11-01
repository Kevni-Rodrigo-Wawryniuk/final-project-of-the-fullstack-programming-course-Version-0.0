/* eslint-disable no-unused-vars */
import './Vehiculos.css';
import { Link, useParams } from 'react-router-dom';
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

        setInterval("location.reload()",1000);
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
            
            localStorage.removeItem('correo');
            localStorage.removeItem('token');
            
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
                <Link to={`/Home/${usuario}`}>
                        <button> Volver </button>
                    </Link>
                    <Link to={`/Empresas/${usuario}`}>
                        <button> Empresas </button>
                    </Link>
                    <Link to={`/Droides/${usuario}`}>
                        <button> Droides </button>
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

                <div className='containeButtonCargarVehiculos'>
                    <Link to={`/AgregarVehiculos/${usuario}`}>
                        <button> Cargar </button>
                    </Link>
                </div>

                <div className='containeTablaVehiculos'>
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
                            {vehiculo.map((vehi) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarVehiculos/${vehi.id_vehiculos}/${usuario}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarDato(event, vehi.id_vehiculos)} > Borrar </button>
                                    </td>
                                    <td>{vehi.nombre_vehiculos}</td>
                                    <td>{vehi.codigo}</td>
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

export default Vehiculos;