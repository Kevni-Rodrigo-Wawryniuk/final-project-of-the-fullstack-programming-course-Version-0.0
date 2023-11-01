/* eslint-disable no-unused-vars */
import './Vehiculos.css';
import { Link, useParams } from 'react-router-dom';
import * as API from '../Service/Service.js';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function Vehiculos() {

    // ver datos de los vehiculos
    const [vehiculo, setVehiculos] = useState([]);

    useEffect(() => {
        API.getVehiculos().then(setVehiculos);
    }, []);

    // borrar datos
    const borrarDato = async (event, id_Vehiculo) => {

        event.preventDefault();

        const request = await API.deleteVehiculos(id_Vehiculo);

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
            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());


    return (
        <>
            <div className='containtBodyVehiculos'>
                <div className='containeTituloVehiculos'>
                    <h2>Vehiculos</h2>
                </div>
                <div className='containeButtonsVehiculos'>

                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                        <Nav className="justify-content-center">
                            <Nav.Link href={`/Empresas/${usuario}`}>Empresas</Nav.Link>
                            <Nav.Link href={`/Droides/${usuario}`}>Droides</Nav.Link>
                            <Nav.Link href={`/Estados/${usuario}`}>Estado</Nav.Link>
                            <Nav.Link href={`/Modelos/${usuario}`}>Modelos</Nav.Link>
                            <Nav.Link href={`/TipoDeProductos/${usuario}`}>Tipo de productos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                </div>

                <div className='containeButtonCargarVehiculos'>
                    <Link to={`/AgregarVehiculos/${usuario}`}>
                    <Button variant="dark">Cargar Vehiculos</Button>
                    </Link>
                </div>

                <div className='containeTablaVehiculos'>
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Codigo</th>
                                <th>Configuraciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculo.map((vehi) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    
                                    <td>{vehi.nombre_vehiculos}</td>
                                    <td>{vehi.codigo}</td>
                                    <td>
                                        <Link to={`/ModificarVehiculos/${vehi.id_vehiculos}/${usuario}`}> <Button variant="warning">Editar</Button>{' '}</Link>
                                        <Button variant="danger" onClick={(event) => borrarDato(event, vehi.id_vehiculos)} > Borrar </Button>{' '} 
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

export default Vehiculos;