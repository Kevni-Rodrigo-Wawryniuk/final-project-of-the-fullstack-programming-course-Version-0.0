// pagina de registro
import './Registro.css';
// para redireccionar a otra pagina
import { Link } from 'react-router-dom';
import { useState } from 'react';

import * as API from '../Service/Service.js';

function Registro() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setpassword] = useState('');
    const [roles, setRoles] = useState('');

    // registrar
    const Registrar = async (event) => {

        event.preventDefault();

        const registro = await API.registrar({ nombre, apellido, edad, usuario, correo, contraseña, roles });

        if (registro.status) {
            alert(registro.mensaje);
            window.location.href = '/';
        } else {
            alert(registro.mensaje);
        }
    }

    return (

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
                        required
                        placeholder='Nombre'
                    />

                    <input
                        type='text'
                        value={apellido}
                        onChange={(event) => setApellido(event.target.value)}
                        required
                        placeholder='Apellido'
                    />

                    <input
                        type='number'
                        value={edad}
                        onChange={(event) => setEdad(event.target.value)}
                        step={1}
                        min={0}
                        max={100}
                        required
                        placeholder='Edad'
                    />

                    <input
                        type='text'
                        value={usuario}
                        onChange={(event) => setUsuario(event.target.value)}
                        required
                        placeholder='Usuario'
                    />

                    <input
                        type='email'
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        required
                        placeholder='Correo'
                    />

                    <input
                        type='password'
                        value={contraseña}
                        onChange={(event) => setpassword(event.target.value)}
                        minLength={10}
                        maxLength={80}
                        pattern='^([a-z] + [A-Z] + [0-9] + [!-?]) {10, 12}$'
                        required
                        placeholder='Contraseña'
                    />

                    <input
                        type='number'
                        value={roles}
                        onChange={(event) => setRoles(event.target.value)}
                        step={0}
                        min={0}
                        max={10000000000000000000}
                        required
                        placeholder='Rol'
                    />

                    <button type='submit'> Registrar </button>
                </form>
            </div>
        </div>
    )
}

export default Registro;