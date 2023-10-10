//import React,{useState} from "react";
import './Login.css';
// esto es para redireccionar a otra pagina
import { Link } from "react-router-dom";

import {useState} from 'react';

import * as API from '../Service/Service.js';

function Login() {

    //datos a mandar deben tener el mismo nombre que los datos resividos en el backend
    // ejemplo correo debe ser igual al correo que se encuentra en el backend o ruta de login
    const [correo, setCorreo] = useState('');
    const [contraseña, setpassword] = useState('');

    const ingreso = async(event) =>{

        event.preventDefault();
        const ingreos = await API.logeo({correo, contraseña});

        if(ingreos.status){
            //alert('Pase Señor');
            window.localStorage.setItem('correo', JSON.stringify(ingreos.dato[0]));
            window.localStorage.setItem('token', JSON.stringify(ingreos.token));
            window.location.href='/Home';
        }else{
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
                        type='text'
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        placeholder='Correo'
                    />

                    <input
                        type='password'
                        value={contraseña}
                        onChange={(event) => setpassword(event.target.value)}
                        placeholder='contraseña'
                    />

                    <button type='submit'> ingresar </button>

                    <p>
                        <a href="#"> olvidaste tu Contraseña </a>
                    </p>

                </form>

            </div>
        </div>
    );
}
export default Login;