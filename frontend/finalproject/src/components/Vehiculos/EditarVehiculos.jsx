import './Vehiculos.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarVehiculos() {

    // dato a cargar 
    const [nombre_vehiculos, setVehiculos] = useState('');
    const [codigo, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');
    
    // lugar del dato a editar
    const { id_vehiculos } = useParams();

    const editarVehiculo = async (event) =>{
        event.preventDefault();

        const request = await API.putVehiculos(id_vehiculos, {nombre_vehiculos, codigo});

        if(request.status){
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href ='/Vehiculos';
            }, 2500);
        }else{
            setmensaje(request.mensaje);
        }
    }

    // dato a editar 
    const [nombre_A_Editar, setnombreAEditar] = useState('');
    const [codigoAEditar, setcodigoAEditar] = useState('');

    const traerDatos = async () => {
        const datos = await API.getVehiculosByID(id_vehiculos);
        setnombreAEditar(datos.nombre_vehiculos);
        setcodigoAEditar(datos.codigo);
    }

    useEffect(() => {
        traerDatos();
    });

    return (
        <>
            <div className='containtBodyVehiculos'>
                <div>
                    <h3> Editar Vehiculo </h3>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>nombre</td>
                                <td>Codigo</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{nombre_A_Editar}</td>
                                <td>{codigoAEditar}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {mensaje}
                <div>
                    <form onSubmit={editarVehiculo}>
                        <input
                            type="text"
                            value={nombre_vehiculos}
                            onChange={(event) => setVehiculos(event.target.value)}
                            placeholder='Nombre del vehiculo'
                        />

                        <input
                            type="text"
                            value={codigo}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder='Codigo'
                        />

                        <button type='submit'> Editar </button>
                        <Link to='/Vehiculos'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarVehiculos;