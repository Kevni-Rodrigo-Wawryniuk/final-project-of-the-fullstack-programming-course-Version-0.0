/* eslint-disable react/jsx-key */
import '../css/carga.css';
import * as API from '../Service/Service.js';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EditarEmpresas() {


    // lugar del dato
    const { idempresas } = useParams();

    // datos a traer
    const [nombre_empresa_A_Editar, setnombreEmpresaAEditar] = useState('');

    // traer los datos por empresa
    const traerDatos = async () => {

        const datos = await API.getEmpresasByID(idempresas);

        if (nombre_empresa === '') {
            setnombreEmpresaAEditar(datos.nombre_empresa);
            let valorN = document.getElementById('nombreEm').value = nombre_empresa_A_Editar;
            setEmpresas(valorN);
        }

        if (id_modelo === '') {

            let numeroID = datos.id_modelos;
            let valorM = document.getElementById('numeroidM').value = numeroID;
            setModelo(valorM);
        }

        if (id_droides === '') {
            let numeroID = datos.id_droides;
            let valorD = document.getElementById('numeroidd').value = numeroID;
            setDroide(valorD);
        }

        if (id_vehiculos === '') {
            let numeroID = datos.id_vehiculos;
            let valorV = document.getElementById('numeroidv').value = numeroID;
            setVehiculos(valorV);
        }

        if (id_estado === '') {
            let numeroID = datos.id_estados;
            let valorE = document.getElementById('numeroide').value = numeroID;
            setEstados(valorE);
        }
        if (id_tipo_producto === '') {
            let numeroID =datos.id_tipo_productos;
            let valorTP = document.getElementById('numeroidtp').value = numeroID;
            setTipoProductos(valorTP);
        }
    }

    // traer datos que se van a editar
    document.addEventListener('DOMContentLoaded', traerDatos());

    // traer datos de otras tablas
    const [modelo, setmodelo] = useState([]);
    const [droide, setdroide] = useState([]);
    const [vehiculo, setvehiculo] = useState([]);
    const [estado, setestado] = useState([]);
    const [tipodeproducto, settipodeproducto] = useState([]);

    // traer los datos de las otras tablas
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

    const editarempresas = async (event) => {

        event.preventDefault();

        const request = await API.putEmpresas(idempresas, { nombre_empresa, id_modelo, id_droides, id_vehiculos, id_estado, id_tipo_producto });

        if (request.status) {
            setMensaje(request.mensaje);
            setTimeout(() => {
                setMensaje('');
                window.location.href = `/Empresas/${usuario}`;
            }, 2500);
        } else {
            setMensaje(request.mensaje);
        }
    }

    // usuario editando el dato
    const { usuario } = useParams();

    return (
        <>
            <div className='containeBody'>
                <main className='maincarga'>
                    <form onSubmit={editarempresas}>
                        <div className='mensaje'>
                            <h3> Editar Empresa</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                                type="text"
                                id='nombreEm'
                                value={nombre_empresa}
                                onChange={(event) => setEmpresas(event.target.value)}
                                required
                            />
                        </div>
                        <div className='cont4'>
                            <select className='cont5' id='numeroidM' onChange={(event) => setModelo(event.target.value)}>
                                <option value='' disabled>selecciones un nuevo modelo</option>
                                {modelo.map((m) => (
                                    <option value={m.id_modelos} required>{m.nombre_modelos}</option>
                                ))}
                            </select>
                        </div>
                        <div className='cont4'>
                            <select className='cont5' id='numeroidd' onChange={(event) => setDroide(event.target.value)}>
                                <option value='' disabled>seleccione un nuevo droide</option>
                                {droide.map((d) => (
                                    <option value={d.id_droides}>{d.nombre_droides}</option>
                                ))}
                            </select>
                        </div>
                        <div className='cont4'>
                            <select className='cont5' id='numeroidv' onChange={(event) => setVehiculos(event.target.value)}>
                                <option value='' disabled>seleccione un nuevo vehiculo</option>
                                {vehiculo.map((v) => (
                                    <option value={v.id_vehiculos}>{v.nombre_vehiculos}</option>
                                ))}
                            </select>
                        </div>
                        <div className='cont4'>
                            <select className='cont5' id='numeroide' onChange={(event) => setEstados(event.target.value)}>
                                <option value='' disabled>seleccione un nuevo estado</option>
                                {estado.map((e) => (
                                    <option value={e.id_estados}>{e.nombre_estados}</option>
                                ))}
                            </select>
                        </div>
                        <div className='cont4'>

                            <select className='cont5' id='numeroidtp' onChange={(event) => setTipoProductos(event.target.value)}>
                                <option value='' disabled>seleccione un nuevo tipo de producto</option>
                                {tipodeproducto.map((tp) => (
                                    <option value={tp.id_tipo_productos}>{tp.nombre_tipo_productos}</option>
                                ))}
                            </select>
                        </div>
                        <div className='cont4'>

                            <button type='submit'> Editar </button>
                            <Link to={`/Empresas/${usuario}`}> <button> volver </button></Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default EditarEmpresas;