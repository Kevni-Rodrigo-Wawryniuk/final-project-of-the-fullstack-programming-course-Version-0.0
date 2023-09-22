import './Home.css';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='containeBodyHome'>
            <div className='containeHomeButtons'>
                <h2> Tablas </h2>
                <Link to='/Empresas'>
                    <button>Empresas</button>
                </Link>
                <Link>
                    <button>Droides</button>
                </Link>
                <Link>
                    <button>Vehiculos</button>
                </Link>
                <Link>
                    <button>Modelos</button>
                </Link>
                <Link>
                    <button>Tipos de productos</button>
                </Link>
                <Link>
                    <button>Estados</button>
                </Link>
                <Link to='/'>
                    <button>Salir</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;