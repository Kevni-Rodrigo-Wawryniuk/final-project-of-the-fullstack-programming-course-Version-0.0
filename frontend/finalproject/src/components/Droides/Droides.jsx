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



function Droides() {

    // ver los datos cargados
    const [droides, setDroides] = useState([]);

    useEffect(() => {
        API.getDroides().then(setDroides)
    }, []);

    // borrar los datos
    const borrarDroide = async (event, id_Droide) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteDroides(id_Droide);

        setInterval("location.reload()",1000);

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
                    <h2>Droides</h2>
                </div>
                <div className='containeButtons'>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                        <Nav className="justify-content-center">
                            <Nav.Link href={`/Empresas/${usuario}`}>Empresas</Nav.Link>
                            <Nav.Link href={`/Vehiculos/${usuario}`}>Vehiculos</Nav.Link>
                            <Nav.Link href={`/Estados/${usuario}`}>Estado</Nav.Link>
                            <Nav.Link href={`/Modelos/${usuario}`}>Modelos</Nav.Link>
                            <Nav.Link href={`/TipoDeProductos/${usuario}`}>Tipo de productos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
    
                </div>

                <div className='containeButtonCargar'>

  
                    <Link to={`/AgregarDroides/${usuario}`}>
                    <Button variant="dark">Cargar Droide</Button>
                    </Link>
                </div>

                <div className='containeTabla'>
                    <Table responsive="md">                        
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Codigo</th>
                                <th>Configuraciones</th>
                            </tr>
                        </thead>
                            <tbody>
                                {droides.map((droid) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <tr> 
                                        <td>{droid.nombre_droides}</td>
                                        <td>{droid.codigo}</td>
                                        <td>
                                            <Link to={`/ModificarDroides/${droid.id_droides}/${usuario}`}> <Button variant="warning">Editar</Button>{' '}</Link>
                                            <Button variant="danger" onClick={(event) => borrarDroide(event, droid.id_droides)}> Borrar </Button>{' '} 
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

export default Droides;