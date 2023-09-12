// pagina de registro
import './Registro.css';
// para redireccionar a otra pagina
import {Link} from 'react-router-dom';
import { useState } from 'react';

import * as API from '../Service/Service.js';

function Registro(){

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setpassword] = useState('');
    const [roles, setRoles] = useState('');

    const Registrar = async(event)=>{

        event.preventDefault();

        const registro = await API.registrar({nombre,apellido,edad,usuario,correo,contraseña,roles});

        if(registro.status){
            alert(registro.mensaje);
            window.location.href='/';
        }else{
            alert(registro.mensaje);
        }
    }

    return(

        <div className='containeBodyRegistro'>
            <div>
                <div className='containeLogin'>
                    <Link to='/'>
                        <button>Volver</button>
                    </Link>
                </div>

                <form onSubmit={Registrar} className='containeRegistros'>
                    <h5> Registro </h5>

                    <input
                        type='text'
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        placeholder='Nombre'
                    />

                    <input
                        type='text'
                        value={apellido}
                        onChange={(event) => setApellido(event.target.value)}
                        placeholder='Apellido'
                    />
                    
                    <input
                        type='numero'
                        value={edad}
                        onChange={(event) => setEdad(event.target.value)}
                        placeholder='Edad'
                    />
                    
                    <input
                        type='text'
                        value={usuario}
                        onChange={(event) => setUsuario(event.target.value)}
                        placeholder='Usuario'
                    />
                    
                    <input
                        type='text'
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        placeholder='Correo'
                    />
                    
                    <input
                        type='password'
                        value={contraseña}
                        onChange={(event) => setpassword(event.target.value)}
                        placeholder='Contraseña'
                    />
                    
                    <input
                        type='numero'
                        value={roles}
                        onChange={(event) => setRoles(event.target.value)}
                        placeholder='Rol'
                    />

                    <button type='submit'> Registrar </button>
                </form>
            </div>
        </div>
    )
}

export default Registro;