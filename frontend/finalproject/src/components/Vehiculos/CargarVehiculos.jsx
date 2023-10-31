import './Vehiculos.css';
import * as API from '../Service/Service.js';
import { Link, useParams } from 'react-router-dom';
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
                window.location.href=`/Vehiculos/${usuario}`;
            }, 1000);
        }else{
            setmensaje(request.mensaje);
        }
    }

    const {usuario} = useParams();

    return(
        <>
            <div className='containtBodyVehiculos1'>
                <div className='mensaje'>
                    <h3> Cargar Vehiculos </h3>
                    {mensaje}
                </div>    
                <div>
                    <form onSubmit={CargarVehiculo}>
                        <div className='cont4'>
                            <input className='cont5'
                            type="text"
                            value={nombre_vehiculos}
                            onChange={(event) => setnombre_vehiculo(event.target.value)}
                            placeholder='Nombre del Vehiculo' 
                            />
                        </div>
                        <div className='cont4'>
                            <input className='cont5'
                            type="number"
                            pattern="[0-9]" 
                            value={codigo}
                            onChange={(event) => setCodigo(event.target.value)}
                            placeholder='Codigo'
                            />
                        </div>  
                        <div className='cont4'>
                            <button type='submit' > Cargar </button>
                            <Link to={`/Vehiculos/${usuario}`}> <button> Volver </button> </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CargarVehiculos;