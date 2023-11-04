/* eslint-disable react/jsx-key */
import '../css/pantallas.css';
import * as API from '../Service/Service.js';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function Estados() {

    // Esto es para mostrar los datos en pantalla
    const [estados, setEstados] = useState([]);

    // mensaje de permiso 
    const [mensaje, setmensaje] = useState('');

    useEffect(() => {
        API.getEstados().then(setEstados)
    }, []);

    // BORRAR LOS DATOS
    const borrarEstado = async (event, id_estados) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.postEstadosPermisoByID(id_estados);

        if(request.status){
            setmensaje(request.mensaje);
            
            const borrar = await API.deleteEstados(id_estados);

            setInterval("location.reload()",1000);
        }else{
            setmensaje(request.mensaje);
        }
    }

    // verificar usuarios

    const { usuario }= useParams();

    const userVerification = async () => {

        let token;

        token = localStorage.getItem('token');

        const traerCorreo = await API.postUsuario( usuario );

        if (traerCorreo.status && token) {
            console.log('El usuario esta logeado');

        } else {
            window.location.href = '/';
            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());

    return (
        <>
            <div className='containeBody'>
                <div className='containeTitulo'>
                    <h2>Estados</h2>
                </div>
                <div className='containeButtons'>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                        <Nav className="justify-content-center">
                            <Nav.Link href={`/Empresas/${usuario}`}>Empresas</Nav.Link>
                            <Nav.Link href={`/Droides/${usuario}`}>Droides</Nav.Link>
                            <Nav.Link href={`/Vehiculos/${usuario}`}>Vehiculos</Nav.Link>
                            <Nav.Link href={`/Modelos/${usuario}`}>Modelos</Nav.Link>
                            <Nav.Link href={`/TipoDeProductos/${usuario}`}>Tipo de productos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                </div>

                <div className='containeButtonCargar'>
                    <Link to={`/AgregarEstados/${usuario}`}>
                    <Button variant="dark">Cargar Estado</Button>
                    </Link>
                </div>

                <div className='mensaje'>
                    {mensaje}
                </div>

                <div className='containeTabla'>
                    <Table responsive="md">
                        
                        <thead>
                            <tr>
                                
                                <th>nombre</th>
                                <th>codigo</th>
                                <th>Configuraciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estados.map((estad) => (
                                <tr>
                                   <td>{estad.nombre_estados}</td>
                                    <td>{estad.codigo}</td>
                                    <td>
                                        <Link to={`/ModificarEstados/${estad.id_estados}/${usuario}`}> <Button variant="warning">Editar</Button>{' '}</Link>
                                        <Button variant="danger" onClick={(event) => borrarEstado(event, estad.id_estados)} > Borrar</Button>{' '} 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Estados;