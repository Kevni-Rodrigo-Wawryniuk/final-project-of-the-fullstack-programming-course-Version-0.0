import './Empresa.css';
import { Link, useParams } from 'react-router-dom';
import * as API from '../Service/Service.js';
import { useEffect, useState } from 'react';

function Empresas() {

    const [empresas, setEmpresas] = useState([]);
    //const [mensaje, setMensaje] = useState([]);

    useEffect(() => {
        API.getEmpreas().then(setEmpresas)
    }, [])

    // borrar datos

    const borrarEmpresa = async (event, idempresa) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteEmpresas(idempresa);

        setInterval("location.reload()",1000);
        //window.location.href = '/Empresas';
    }

    const {usuario} = useParams();

    // verificar usuarios
    const userVerification = async () => {

        let token = localStorage.getItem('token');

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
        <div className='containeBodyEmpresa'>
            <div className='containeTituloEmpresa'>
                <h2> Empresas </h2>
            </div>
                <div className='containeButtonsEmpresa'>
                    <Link to={`/Home/${usuario}`}>
                        <button> Volver </button>
                    </Link>
                    <Link to={`/Droides/${usuario}`}>
                        <button> Droides </button>
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
            <div className='containeButtonCargarEmpresa'>
                <Link to={`/AgregarEmpresas/${usuario}`}> <button> Cargar </button> </Link>
            </div>
            <div className='containeTablaEmpresa'>
                <table>
                    <nav>
                        <thead>
                            <tr>
                                <th>Configuraciones</th>
                                <th>Empresas</th>
                                <th>Droides</th>
                                <th>Vehiculos</th>
                                <th>Estados</th>
                                <th>Modelos</th>
                                <th>Tipos de Productos</th>
                            </tr>

                        </thead>

                        <tbody>
                            {empresas.map((emps) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>
                                        <Link to={`/ModificarEmpresas/${emps.idempresas}/${usuario}`}> <button> Editar </button> </Link>
                                        <button onClick={(event) => borrarEmpresa(event, emps.idempresas)}> Borrar </button>
                                    </td>
                                    <td>{emps.nombre_empresa}</td>
                                    <td>{emps.nombre_droides}</td>
                                    <td>{emps.nombre_vehiculos}</td>
                                    <td>{emps.nombre_estados}</td>
                                    <td>{emps.nombre_modelos}</td>
                                    <td>{emps.nombre_tipo_productos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </nav>
                </table>
            </div>
        </div>
    )
}

export default Empresas;
