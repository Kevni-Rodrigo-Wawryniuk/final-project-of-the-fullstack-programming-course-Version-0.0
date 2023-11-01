import './Home.css';
import { Link, useParams } from 'react-router-dom';
import * as API from '../Service/Service.js';

function Home() {

    // salir del sistema
    const LoqOut = async (event) => {
        event.preventDefault();

        localStorage.removeItem('correo');
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const {usuario} = useParams();

    // verificar usuarios
    const userVerification = async () => {

        
        const verUsuario = await API.postUsuario(usuario);

        if (verUsuario.status) {
            console.log('El usuario esta logeado');

        } else {
            window.location.href = '/';

            localStorage.removeItem('correo');
            localStorage.removeItem('token');

            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());

    return (
        <div className='containeBodyHome'>

            <div className='usuario'>
                <h3> Usuario: {usuario} </h3>
            </div>

            <div className='containeHomeButtons'>

                <h2> Tablas </h2>
                <div className='re'>
                    <Link to={`/Empresas/${usuario}`}>
                        <button>Empresas</button>
                    </Link>
                </div>
                <div className='re'>
                    <Link to={`/Droides/${usuario}`}>
                        <button>Droides</button>
                    </Link>
                </div>
                <div className='re'>
                    <Link to={`/Vehiculos/${usuario}`}>
                        <button>Vehiculos</button>
                    </Link>
                </div>
                <div className='re'>
                    <Link to={`/Modelos/${usuario}`}>
                        <button>Modelos</button>
                    </Link>
                </div>
                <div className='re'>
                    <Link to={`/TipoDeProductos/${usuario}`}>
                        <button>Tipos de productos</button>
                    </Link>
                </div>
                <div className='re'>
                    <Link to={`/Estados/${usuario}`}>
                        <button>Estados</button>
                    </Link>
                </div>
                <div className='re'>
                    <button onClick={(event) => LoqOut(event)}> Salir </button>
                </div>
            </div>
        </div>
    )
}

export default Home;