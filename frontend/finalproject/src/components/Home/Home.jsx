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
                <Link to='/'>
                    <button>Salir</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;