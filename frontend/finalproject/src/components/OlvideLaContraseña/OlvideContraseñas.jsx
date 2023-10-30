import { useEffect, useState } from 'react';
import './OlvideContraseña.css';
import * as API from '../Service/Service.js';

function OlvideContraseñas() {

    // correo a buscar
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');

    // como mostrar un formulario para cambiar la contraseña
    const Vercorreo = async (event) => {

        event.preventDefault();

        const cambio = await API.postCorreo({ correo });

        localStorage.setItem('correo', correo);

        if (cambio.status) {
            setMensaje(cambio.mensaje);
            document.getElementById('Form0').style.display = 'none';
            document.getElementById('Form1').style.display = 'block';
        } else {
            setMensaje(cambio.mensaje);
        }
    }

    const volver = async (event) => {
        event.preventDefault();

        document.getElementById('Form0').style.display = 'block';
        document.getElementById('Form1').style.display = 'none';
    }

    // traer datos a modificar

    // cambio de contraseña
    const [contraseña, setcontraseña] = useState('');

    const nuevaContraseña = async (event) => {
        event.preventDefault();

        var dato = localStorage.getItem('correo');
        console.log('', dato);

        const nuevacontraseña = await API.putContraseña({ contraseña }, dato);

        console.log('', dato);

        if (nuevacontraseña.status) {

            console.log('', dato);

            setMensaje(nuevacontraseña.mensaje);

            setTimeout(() => {
                
            localStorage.removeItem('correo');
                window.location.href = '/';
            }, 1000);
        } else {
            setMensaje(nuevacontraseña.mensaje);
        }
    }

    const volverAlaPaginaLogin = async (event) => {
        event.preventDefault();

        window.location.href = '/';
    }

    return (
        <>
            <div id='Form0'>
                <h3> Coloca tu correo </h3>
                {mensaje}
                <form onSubmit={Vercorreo}>
                    <input
                        type="email"
                        placeholder='Correo'
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        required
                    />
                    <button type='submit'> cambiar contraseña </button>
                    <button onClick={(event) => volverAlaPaginaLogin(event)}> volver </button>
                </form>
            </div>

            <div id='Form1'>
                <form onSubmit={nuevaContraseña}>
                    <h3> Coloca tu nueva contraseña </h3>
                    {mensaje}
                    <input
                        type="password"
                        placeholder='Nueva Contraseña'
                        value={contraseña}
                        onChange={(event) => setcontraseña(event.target.value)}
                        pattern='^([a-z] + [A-Z] + [0-9] + [!-?]) {10, 12}$'
                        required
                        minLength={10}
                        maxLength={80}
                    />
                    <button type='submit'> cambiar contraseña </button>
                    <button onClick={(event) => volver(event)}> volver </button>
                </form>
            </div>

        </>
    )
}

export default OlvideContraseñas;