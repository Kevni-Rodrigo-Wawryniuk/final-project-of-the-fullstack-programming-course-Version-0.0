/* eslint-disable react/jsx-key */
import './Empresa.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
                window.location.href = `/Empresas/${usuario}`;
            }, 2500);
        } else {
            setmensaje(request.mensaje);
        }
    }

    // usuario cargando el dato
    const { usuario } = useParams();

    return (
        <>
            <div className='containeBodyEmpresa1'>
                <main className='maincarga'>
                    
                    <form onSubmit={cargarEmpresas}>
                        <div className='mensaje'>
                            <h3> Cargar de Empresa </h3>
                        </div>   
                        <div className='cont12'>
                            {mensaje}
                        </div>
                        <div className='cont1'>
                        <input className='cont'
                            type="text"
                            value={nombre_empresa}
                            onChange={(event) => setNombre(event.target.value)}
                            placeholder=" Nombre de la empresa "
                            required
                        />
                        </div>
                        <div className='cont1'>
                        <select className='cont' onChange={(event) => setModelo(event.target.value)}>

                            <option value="" selected> Seleccione un Modelo </option>
                            {modelos.map((M) => (
                                <option value={M.id_modelos}>{M.nombre_modelos}</option>
                            ))}
                        </select>
                        </div>
                        <div className='cont1'>
                        <select className='cont' onChange={(event) => setDroide(event.target.value)}>

                            <option value="" selected> Seleccione un Droide </option>
                            {droides.map((D) => (
                                <option value={D.id_droides} >{D.nombre_droides}</option>
                            ))}
                        </select>
                        </div>
                        <div className='cont1'>
                        <select className='cont' onChange={(event) => setVehiculo(event.target.value)}>

                            <option value="" selected> Seleccione un Vehiculo </option>
                            {vehiculos.map((V) => (
                                <option value={V.id_vehiculos} >{V.nombre_vehiculos}</option>
                            ))}
                        </select>
                        </div>
                        <div className='cont1'>
                        <select className='cont' onChange={(event) => setEstado(event.target.value)}>

                            <option value="" selected> Seleccione un Estado </option>
                            {estados.map((E) => (
                                <option value={E.id_estados} >{E.nombre_estados}</option>
                            ))}
                        </select>
                        </div>
                        <div className='cont1'>
                        <select className='cont' onChange={(event) => setTipoProducto(event.target.value)}>

                            <option value="" selected> Seleccione un Tipo de Producto </option>
                            {tipoDeProducto.map((T) => (
                                <option value={T.id_tipo_productos}>{T.nombre_tipo_productos}</option>
                            ))}
                        </select>
                        </div>
                        <div className='cont1'>
                            <button type='submit'> Cargar </button>
                            <Link to={`/Empresas/${usuario}`}> <button> Volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div >
        </>
    )
}

export default CargarEmpresas;