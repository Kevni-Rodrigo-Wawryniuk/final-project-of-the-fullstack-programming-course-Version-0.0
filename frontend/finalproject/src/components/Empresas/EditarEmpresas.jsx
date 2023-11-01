import './Empresa.css';
import * as API from '../Service/Service.js';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EditarEmpresas() {


    // lugar del dato
    const { idempresas } = useParams();

    // datos a traer
    const [nombre_empresa_A_Editar, setnombreEmpresaAEditar] = useState('');
    const [nombre_modelo_A_Editar, setnombreModeloAEditar] = useState('');
    const [nombre_droide_A_Editar, setnombreDroideAEditar] = useState('');
    const [nombre_vehiculo_A_Editar, setnombreVehiculoAEditar] = useState('');
    const [nombre_estado_A_Editar, setnombreEstadoAEditar] = useState('');
    const [nombre_tipo_de_producto_A_Editar, setnombreTipoDeProductoAEditar] = useState('');

    // traer los datos por empresa
    const traerDatos = async () => {
        const datos = await API.getEmpresasByID(idempresas);
        setnombreEmpresaAEditar(datos.nombre_empresa);
        setnombreModeloAEditar(datos.nombre_modelos);
        setnombreDroideAEditar(datos.nombre_droides);
        setnombreVehiculoAEditar(datos.nombre_vehiculos);
        setnombreEstadoAEditar(datos.nombre_estados);
        setnombreTipoDeProductoAEditar(datos.nombre_tipo_productos);
    }

    // traer datos que se van a editar
    useEffect(() => {
        traerDatos();
    });

    // traer datos de otras tablas
    const [modelo, setmodelo] = useState([]);
    const [droide, setdroide] = useState([]);
    const [vehiculo, setvehiculo] = useState([]);
    const [estado, setestado] = useState([]);
    const [tipodeproducto, settipodeproducto] = useState([]);

    useEffect(() => {
        API.getModelos().then(setmodelo);
        API.getDroides().then(setdroide);
        API.getVehiculos().then(setvehiculo);
        API.getEstados().then(setestado);
        API.getTipoDeProductos().then(settipodeproducto);
    }, []);

    // datos a editar
    const [nombre_empresa, setEmpresas] = useState('');
    const [id_modelo, setModelo] = useState('');
    const [id_droides, setDroide] = useState('');
    const [id_vehiculos, setVehiculos] = useState('');
    const [id_estado, setEstados] = useState('');
    const [id_tipo_producto, setTipoProductos] = useState('');

    const [mensaje, setMensaje] = useState('');

    const editarempresas = async (event) =>{

        event.preventDefault();

        const request = await API.putEmpresas(idempresas,{nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto});

        if(request.status){
            setMensaje(request.mensaje);
            setTimeout(() => {
                setMensaje('');
                window.location.href=`/Empresas/${usuario}`;
            }, 2500);
        }else{
            setMensaje(request.mensaje);
        }
    }

    // usuario editando el dato
    const {usuario} = useParams();

    return (
        <>
            <div className='containeBodyEmpresa'>
                <h2>Empresa a Editar</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td> Empresa </td>
                                <td> Modelo </td>
                                <td> Droide </td>
                                <td> Vehiculo </td>
                                <td> Estado </td>
                                <td> Tipo de producto </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{nombre_empresa_A_Editar}</td>
                                <td>{nombre_modelo_A_Editar}</td>
                                <td>{nombre_droide_A_Editar}</td>
                                <td>{nombre_vehiculo_A_Editar}</td>
                                <td>{nombre_estado_A_Editar}</td>
                                <td>{nombre_tipo_de_producto_A_Editar}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>{mensaje}</div>
                    <form onSubmit={editarempresas}>
                        <input
                            type="text"
                            value={nombre_empresa}
                            onChange={(event)=> setEmpresas(event.target.value)}
                            placeholder={nombre_empresa_A_Editar}
                        />

                        <select onChange={(event) => setModelo(event.target.value)}>
                            <option value="" selected> {nombre_modelo_A_Editar} </option>
                            {modelo.map((m)=>(
                                <option value={m.id_modelos} required>{m.nombre_modelos}</option>
                            ))}
                        </select>

                        <select onChange={(event) => setDroide (event.target.value)}>
                            <option value="" selected> Seleccione un Droide </option>
                            {droide.map((d)=>(
                                <option value={d.id_droides}>{d.nombre_droides}</option>
                            ))}
                        </select>

                        <select onChange={(event) => setVehiculos(event.target.value)}>
                            
                        <option value="" selected> Seleccione un Vehiculo </option>
                            {vehiculo.map((v)=>(
                                <option value={v.id_vehiculos}>{v.nombre_vehiculos}</option>
                            ))}
                        </select>

                        <select onChange={(event) => setEstados(event.target.value)}>
                            
                        <option value="" selected> Seleccione un Estado </option>
                            {estado.map((e)=>(
                                <option value={e.id_estados}>{e.nombre_estados}</option>
                            ))}
                        </select>

                        <select onChange={(event)=>setTipoProductos(event.target.value)}>
                            
                        <option value="" selected> Seleccione un Tipo de Producto </option>
                            {tipodeproducto.map((tp)=>(
                                <option value={tp.id_tipo_productos}>{tp.nombre_tipo_productos}</option>
                            ))}
                        </select>

                        <button type='submit'> Editar </button>
                        <Link to={`/Empresas/${usuario}`}> <button> volver </button></Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarEmpresas;