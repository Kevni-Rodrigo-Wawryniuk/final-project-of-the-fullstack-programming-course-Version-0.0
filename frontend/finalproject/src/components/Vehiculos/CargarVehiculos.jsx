import './Vehiculos.css';
import * as API from '../Service/Service.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CargarVehiculos(){

    const [nombre_vehiculos, setnombre_vehiculo] = useState('');
    const [codigo, setCodigo] = useState('');

    const [mensaje, setmensaje] = useState('');

    const CargarVehiculo = async (event) =>{

        event.preventDefault();

        const request = await API.postVehiculos({nombre_vehiculos, codigo});

        if(request.status){
            setmensaje(request.mensaje);
            setTimeout(() => {
                setmensaje('');
                window.location.href='/Vehiculos';
            }, 2500);
        }else{
            setmensaje(request.mensaje);
        }
    }

    return(
        <>
            <div className='containtBodyVehiculos'>
                <h3> Cargar Vehiculos </h3>
                {mensaje}
                <div>
                    <form onSubmit={CargarVehiculo}>
                        <input 
                        type="text"
                        value={nombre_vehiculos}
                        onChange={(event) => setnombre_vehiculo(event.target.value)}
                        placeholder='Nombre del Vehiculo' 
                        />

                        <input 
                        type="text" 
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        placeholder='Codigo'
                        />

                        <button type='submit' > Cargar </button>
                        <Link to='/Vehiculos'> <button> volver </button> </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CargarVehiculos;