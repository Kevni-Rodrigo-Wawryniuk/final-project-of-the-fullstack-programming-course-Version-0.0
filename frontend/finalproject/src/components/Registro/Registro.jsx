// pagina de registro
import './Registro.css';
// para redireccionar a otra pagina
import {Link} from 'react-router-dom';

function Registro(){

    return(

        <div className='containeBodyRegistro'>
            <div>
                <div className='containeLogin'>
                    <Link to='/'>
                        <button>Volver</button>
                    </Link>
                </div>

                <form className='containeRegistros'>
                    <h5> Registro </h5>

                    <input
                        type='text'
                        //value=''
                        //    onChange={}
                        placeholder='Nombre'
                    />

                    <input
                        type='text'
                        //value=''
                        //    onChange={}
                        placeholder='Apellido'
                    />
                    
                    <input
                        type='numero'
                        //value=''
                        //    onChange={}
                        placeholder='Edad'
                    />
                    
                    <input
                        type='text'
                        //value=''
                        //    onChange={}
                        placeholder='Usuario'
                    />
                    
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
                        placeholder='Contraseña'
                    />
                    
                    <input
                        type='text'
                        //value=''
                        //    onChange={}
                        placeholder='Rol'
                    />

                    <button> Registrar </button>
                </form>
            </div>
        </div>
    )
}

export default Registro;