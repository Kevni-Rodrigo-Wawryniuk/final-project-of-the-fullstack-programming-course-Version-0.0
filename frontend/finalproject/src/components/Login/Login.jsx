//import React,{useState} from "react";
import './Login.css';
// esto es para redireccionar a otra pagina
import { Link } from "react-router-dom";

import { useState } from 'react';

import * as API from '../Service/Service.js';

function Login() {

    //datos a mandar deben tener el mismo nombre que los datos resividos en el backend
    // ejemplo correo debe ser igual al correo que se encuentra en el backend o ruta de login
    const [correo, setCorreo] = useState('');
    const [contraseña, setpassword] = useState('');

    const ingreso = async (event) => {

        event.preventDefault();

        const ingreos = await API.logeo({ correo, contraseña });
        const user = await API.getUsuario(correo);
        
        if (ingreos.status) {
            //alert('Pase Señor');
            window.localStorage.setItem('correo', JSON.stringify(ingreos.dato[0]));
            window.localStorage.setItem('token', JSON.stringify(ingreos.token));
            window.localStorage.setItem('usuario', JSON.stringify(user.usuario));

            window.location.href = '/Home';

        } else {
            alert(ingreos.mensaje);
        }
    }

    return (
        // el primer div es el que use para el fondo de pantalla 
        <div className='bodyContaine'>
            <div>
                <div className='containeRegistro'>
                    <Link to='/Registro'>
                        <button> Registrar </button>
                    </Link>
                </div>

                <form onSubmit={ingreso} className='containeIngreso'>

                    <h5> Login </h5>

                    <input
                        type='email'
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        placeholder='Correo'
                        required
                    />

                    <input
                        type='password'
                        value={contraseña}
                        onChange={(event) => setpassword(event.target.value)}
                        placeholder='contraseña'
                        minLength={10}
                        maxLength={80}
                        pattern='^([a-z] + [A-Z] + [0-9] + [!-?]) {10, 12}$'
                        required
                    />

                    <button type='submit'> Ingresar </button>

                    <p>
                        <a href="/OlvidelaContraseña"> Olvidaste tu Contraseña </a>
                    </p>
                </form>
            </div>
        </div>
        
    );
}
export default Login;