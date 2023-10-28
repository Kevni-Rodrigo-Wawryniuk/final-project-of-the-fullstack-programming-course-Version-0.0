import './Home.css';
import { Link } from 'react-router-dom';
import * as API from '../Service/Service.js';

function Home() {

    // salir del sistema
    const LoqOut = () => {
        localStorage.removeItem('correo');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/';
    }
    // verificar usuarios
    const userVerification = async () => {

        let correo;
        let token;

        correo = localStorage.getItem('correo');
        token = localStorage.getItem('token');

        const traerCorreo = await API.postCorreo({ correo });


        if (traerCorreo.status && token) {
            console.log('El usuario esta logeado');
        } else {
            window.location.href = '/';
            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());

    // traer al usuario para mostrarlo
    const user = localStorage.getItem('usuario');


    return (
        <div className='containeBodyHome'>

            <div>
                <h3> EL usuario logeado es: {user} </h3>
            </div>

            <div className='containeHomeButtons'>

                <h2> Tablas </h2>

                <Link to='/Empresas'>
                    <button>Empresas</button>
                </Link>
                <Link to='/Droides'>
                    <button>Droides</button>
                </Link>
                <Link to='/Vehiculos'>
                    <button>Vehiculos</button>
                </Link>
                <Link to='/Modelos'>
                    <button>Modelos</button>
                </Link>
                <Link to='/TipoDeProductos'>
                    <button>Tipos de productos</button>
                </Link>
                <Link to='/Estados'>
                    <button>Estados</button>
                </Link>

                <button onClick={(event) => LoqOut(event)}> Salir </button>

            </div>
        </div>
    )
}

export default Home;