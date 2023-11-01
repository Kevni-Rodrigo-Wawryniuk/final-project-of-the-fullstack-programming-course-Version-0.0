import '../css/pantallas.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as API from '../Service/Service.js';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Modelos() {

    // ver los modelos
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        API.getModelos().then(setModelos);
    }, []);

    // borrar modelos
    const borrarModelo = async (event, id_modelos) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteModelos(id_modelos);

        setInterval("location.reload()", 1000);
    }
    // verificar usuarios
    const {usuario} = useParams();
    const userVerification = async () => {

        let token;

        token = localStorage.getItem('token');

        const traerCorreo = await API.postUsuario(usuario);

        if (traerCorreo.status && token) {
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
        <>
            <div className='containeBody'>
                <div className='containeTitulo'>
                    <h2>Modelos</h2>
                </div>
                <div className='containeButtons'>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                        <Nav className="justify-content-center">
                            <Nav.Link href={`/Empresas/${usuario}`}>Empresas</Nav.Link>
                            <Nav.Link href={`/Vehiculos/${usuario}`}>Vehiculos</Nav.Link>
                            <Nav.Link href={`/Estados/${usuario}`}>Estado</Nav.Link>
                            <Nav.Link href={`/Droides/${usuario}`}>Droides</Nav.Link>
                            <Nav.Link href={`/TipoDeProductos/${usuario}`}>Tipo de productos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                
                </div>

                <div className='containeButtonCargar'>
                    <Link to={`/AgregarModelos/${usuario}`}>
                    <Button variant="dark">Cargar Modelo</Button>
                    </Link>
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
                            {modelos.map((modelo) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    
                                    <td>{modelo.nombre_modelos}</td>
                                    <td>{modelo.codigo}</td>
                                    <td>
                                        <Link to={`/ModificarModelos/${modelo.id_modelos}/${usuario}`} > <Button variant="warning">Editar</Button>{' '} </Link>
                                        <Button variant="danger" onClick={(event) => borrarModelo(event, modelo.id_modelos)}> Borrar </Button>{' '}
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

export default Modelos;