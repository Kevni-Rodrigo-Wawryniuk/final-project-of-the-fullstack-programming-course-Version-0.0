import '../css/carga.css';
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
                window.location.href =`/Vehiculos/${usuario}`;
            }, 1000);
        }else{
            setmensaje(request.mensaje);
        }
    }

    const { usuario} = useParams();

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
            <div className='containeBody'>
                <main className='maincarga'>
                    <form onSubmit={editarVehiculo}>
                        <div className='mensaje'>
                            <h3> Editar  Vehiculo</h3>
                            {mensaje}
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="text"
                            value={nombre_vehiculos}
                            onChange={(event) => setVehiculos(event.target.value)}
                            placeholder={nombre_A_Editar}
                        />
                        </div>
                        <div className='cont4'>
                        <input className='cont5'
                            type="number"
                            value={codigo}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder={codigoAEditar}
                        />
                        </div>
                        <div className='cont4'>
                            <button type='submit'> Editar </button>
                            <Link to={`/Vehiculos/${usuario}`}> <button> volver </button> </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default EditarVehiculos;