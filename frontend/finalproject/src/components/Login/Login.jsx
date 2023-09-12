//import React,{useState} from "react";
import './Login.css';
import { Link } from "react-router-dom";

function Login() {

    return (
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
                        value='usuario'
                        //    onChange={}
                        placeholder='Usuario'
                    />
                    <input
                        type='password'
                        value='Contraseña'
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