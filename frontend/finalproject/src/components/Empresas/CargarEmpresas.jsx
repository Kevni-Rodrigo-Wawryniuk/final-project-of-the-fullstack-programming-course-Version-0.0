import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../Service/Service.js';


export function CargarEmpresa() {

    const [nombre_empresa, setNombre] = useState('');
    const [codigo_modelo, setModelo] = useState('');
    const [codigo_droides, setDroide] = useState('');
    const [codigo_vehiculos, setVehiculo] = useState('');
    const [codigo_estado, setEstado] = useState('');
    const [codigo_tipo_producto, setTipoProducto] = useState('');

    const { mensaje, setmensaje } = useState('');

    const cargarEmpresa = async (event) => {

        event.preventDefault();

        const request = await API.addEmpresas({ nombre_empresa, codigo_modelo, codigo_droides, codigo_vehiculos, codigo_estado, codigo_tipo_producto });

        if (request.status) {

            setmensaje(request.mensaje);

            setTimeout(() => {
                setmensaje('')
                window.location.href = '/Empresas'
            }, 5000);
        }

        return;
    }

    return (
        <>
            <main>
                <form onSubmit={cargarEmpresa}>
                    <div>
                        {mensaje}
                    </div>

                    <div>
                        <input
                            type="text"
                            value={nombre_empresa}
                            onChange={(event) => setNombre(event.target.value)}
                            placeholder=" Nombre de la empresa "
                        />

                    </div>
                </form>
            </main>

        </>
    )
}