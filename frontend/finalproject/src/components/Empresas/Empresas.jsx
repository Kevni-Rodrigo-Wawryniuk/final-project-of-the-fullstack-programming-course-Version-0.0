import '../css/pantallas.css';
import { Link, useParams } from 'react-router-dom';
import * as API from '../Service/Service.js';
import { useEffect, useState } from 'react';
  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Empresas() {

    const [empresas, setEmpresas] = useState([]);
    //const [mensaje, setMensaje] = useState([]);

    useEffect(() => {
        API.getEmpreas().then(setEmpresas)
    }, [])

    // borrar datos

    const borrarEmpresa = async (event, idempresa) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteEmpresas(idempresa);

        setInterval("location.reload()",1000);
        //window.location.href = '/Empresas';
    }

    const {usuario} = useParams();

    // verificar usuarios
    const userVerification = async () => {

        let token = localStorage.getItem('token');

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
        <div className='containeBody'>
            <div className='containeTitulo'>
                <h2> Empresas </h2>
            </div>
                <div className='containeButtons'>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                        <Nav className="justify-content-center">
                            <Nav.Link href={`/Droides/${usuario}`}>Droides</Nav.Link>
                            <Nav.Link href={`/Vehiculos/${usuario}`}>Vehiculos</Nav.Link>
                            <Nav.Link href={`/Estados/${usuario}`}>Estado</Nav.Link>
                            <Nav.Link href={`/Modelos/${usuario}`}>Modelos</Nav.Link>
                            <Nav.Link href={`/TipoDeProductos/${usuario}`}>Tipo de productos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                </div>
            <div className='containeButtonCargar'>
                <Link to={`/AgregarEmpresas/${usuario}`}> <Button variant="dark">Cargar Empresa</Button> </Link>
            </div>
            <div className='containeTabla'>
                
                <Table responsive="md">
                    <thead>
                        <tr>
                            <th>Empresas</th>
                            <th>Droides</th>
                            <th>Vehiculos</th>
                            <th>Estados</th>
                            <th>Modelos</th>
                            <th>Tipos de Productos</th>
                            <th>Configuraciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((emps) => (
                        // eslint-disable-next-line react/jsx-key
                       <tr>
                            <td>{emps.nombre_empresa}</td>
                            <td>{emps.nombre_droides}</td>
                            <td>{emps.nombre_vehiculos}</td>
                            <td>{emps.nombre_estados}</td>
                            <td>{emps.nombre_modelos}</td>
                            <td>{emps.nombre_tipo_productos}</td>
                            <td>
                                <Link to={`/ModificarEmpresas/${emps.idempresas}/${usuario}`}> <Button variant="warning">Editar</Button>{' '}</Link>
                                <Button variant="danger" onClick={(event) => borrarEmpresa(event, emps.idempresas)}>Borrar</Button>{' '} 
                                
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>    
            </div>
        </div>
    )
}

export default Empresas;
