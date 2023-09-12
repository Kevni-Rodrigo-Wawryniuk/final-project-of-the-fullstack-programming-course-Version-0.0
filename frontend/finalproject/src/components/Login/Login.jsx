//import React,{useState} from "react";
import './Login.css';
// esto es para redireccionar a otra pagina
import { Link } from "react-router-dom";

function Login() {

    return (
        // el primer div es el que use para el fondo de pantalla 
        <div className='bodyContaine'>
            <div>
                <div className='containeRegistro'>
                    <Link to='/Registro'>
                        <button> Registrar </button>
                    </Link>
                </div>

                <form /*</div>onSubmit={ingreso}*/ className='containeIngreso'>

                    <h5> Login </h5>

                    <input
                        type='text'
                        //value=''
                        //    onChange={}
                        placeholder='Correo'
                    />
                    <input
                        type='password'
                        //value=''
                        //    onChange={}
                        placeholder='Password'
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