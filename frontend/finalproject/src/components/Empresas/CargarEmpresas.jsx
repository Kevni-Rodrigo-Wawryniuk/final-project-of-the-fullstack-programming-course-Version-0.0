/* eslint-disable react/jsx-key */
import './Empresa.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../Service/Service.js';


export function CargarEmpresas() {

    // datos a cargar
    const [nombre_empresa, setNombre] = useState('');
    const [id_modelo, setModelo] = useState('');
    const [id_droides, setDroide] = useState('');
    const [id_vehiculos, setVehiculo] = useState('');
    const [id_estado, setEstado] = useState('');
    const [id_tipo_producto, setTipoProducto] = useState('');

    // mensaje a mostrar
    const [mensaje, setmensaje] = useState('');

    // traer datos de otras tablas
    const [modelos, setDatosModelos] = useState([]);
    const [droides, setDatosDroides] = useState([]);
    const [vehiculos, setDatosVehiculos] = useState([]);
    const [estados, setDatosEstados] = useState([]);
    const [tipoDeProducto, setDatosTiposDeProducto] = useState([]);

    useEffect(() => {
        API.getModelos().then(setDatosModelos);
        API.getDroides().then(setDatosDroides);
        API.getVehiculos().then(setDatosVehiculos);
        API.getEstados().then(setDatosEstados);
        API.getTipoDeProductos().then(setDatosTiposDeProducto);
    }, []);

    // datos a cargar 
    const cargarEmpresas = async (event) => {

        event.preventDefault();

        const request = await API.postEmpresas({ nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto });

        if (request.status) {

            setmensaje(request.mensaje);

            setTimeout(() => {
                setmensaje('')
                window.location.href = '/Empresas';
            }, 2500);
        } else {
            setmensaje(request.mensaje);
        }
    }

    return (
        <>
            <div className='containeBodyEmpresa'>
                <main className='maincarga'>
                    <form onSubmit={cargarEmpresas}>
                        <div>
                            {mensaje}
                        </div>
                        <div>
                        <input
                            type="text"
                            value={nombre_empresa}
                            onChange={(event) => setNombre(event.target.value)}
                            placeholder=" Nombre de la empresa "
                        />
                        </div>
                        <div>
                        <select onChange={(event) => setModelo(event.target.value)}>

                            <option value="" selected> Seleccione un Modelo </option>
                            {modelos.map((M) => (
                                <option value={M.id_modelos}>{M.nombre_modelos}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select onChange={(event) => setDroide(event.target.value)}>

                            <option value="" selected> Seleccione un Droide </option>
                            {droides.map((D) => (
                                <option value={D.id_droides} >{D.nombre_droides}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select onChange={(event) => setVehiculo(event.target.value)}>

                            <option value="" selected> Seleccione un Vehiculo </option>
                            {vehiculos.map((V) => (
                                <option value={V.id_vehiculos} >{V.nombre_vehiculos}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select onChange={(event) => setEstado(event.target.value)}>

                            <option value="" selected> Seleccione un Estado </option>
                            {estados.map((E) => (
                                <option value={E.id_estados} >{E.nombre_estados}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select onChange={(event) => setTipoProducto(event.target.value)}>

                            <option value="" selected> Seleccione un Tipo de Producto </option>
                            {tipoDeProducto.map((T) => (
                                <option value={T.id_tipo_productos}>{T.nombre_tipo_productos}</option>
                            ))}
                        </select>
                        </div>
                        <button type='submit'> Cargar </button>
                        <Link to='/Empresas'> <button> Volver </button> </Link>

                    </form>
                </main>
            </div >
        </>
    )
}

export default CargarEmpresas;