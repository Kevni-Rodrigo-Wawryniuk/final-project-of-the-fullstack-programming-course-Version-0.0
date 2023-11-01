import { useEffect, useState } from 'react';
import './TipotDeProductos.css';
import { Link, useParams } from 'react-router-dom';
import * as API from '../Service/Service.js';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TipoDeProductos() {

    const [tipoProductos, setTipoDeProducto] = useState([]);

    useEffect(() => {
        API.getTipoDeProductos().then(setTipoDeProducto);
    }, []);

    // datos a borrar
    const borrarTipoDeProductos = async (event, id_tipo_productos) => {

        event.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const request = await API.deleteTipoDeProductos(id_tipo_productos);

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
            console.log('El usuario no esta logeado');
        }
    }

    document.addEventListener('DOMContentLoaded', userVerification());
    
    return (
        <>
            <div className='containtBodyTipoDeProductos'>
                <div className='containeTituloTipoDeProductos'>
                    <h2> Tipo de Productos </h2>
                </div>
                <div className='containeButtonsTipoDeProductos'>

                    <Navbar bg="dark" data-bs-theme="dark">
                        <Container>
                            <Navbar.Brand href={`/Home/${usuario}`}>Volver</Navbar.Brand>
                            <Nav className="justify-content-center">
                                <Nav.Link href={`/Empresas/${usuario}`}>Empresas</Nav.Link>
                                <Nav.Link href={`/Vehiculos/${usuario}`}>Vehiculos</Nav.Link>
                                <Nav.Link href={`/Estados/${usuario}`}>Estado</Nav.Link>
                                <Nav.Link href={`/Modelos/${usuario}`}>Modelos</Nav.Link>
                                <Nav.Link href={`/Droides/${usuario}`}>Droides</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>

                <div className='containeButtonCargarTipoDeProductos'>
                    <Link to={`/AgregarTipoDeProductos/${usuario}`}>
                    <Button variant="dark">Cargar Tipo de productos</Button>
                    </Link>
                </div>

                <div className='containeTablaTipoDeProductos'>
                    <Table responsive="md">
                        <thead>
                            <tr>
                                
                                <th>nombre</th>
                                <th>codigo</th>
                                <th>Configuraciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipoProductos.map((tipoProd) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    
                                    <td>{tipoProd.nombre_tipo_productos}</td>
                                    <td>{tipoProd.codigo}</td>
                                    <td>
                                        <Link to={`/ModificarTipoDeProductos/${tipoProd.id_tipo_productos}/${usuario}`}> <Button variant="warning">Editar</Button>{' '} </Link>
                                        <Button variant="danger" onClick={(event) => borrarTipoDeProductos(event, tipoProd.id_tipo_productos)} > Borrar </Button>{' '}
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

export default TipoDeProductos;