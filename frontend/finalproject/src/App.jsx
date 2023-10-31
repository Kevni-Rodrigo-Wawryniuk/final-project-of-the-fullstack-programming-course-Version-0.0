//import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
//Estas son las rutas de las paginas
import { Empresa, Homes, Logins, Registros, OlvideContraseñas, Droide, CargarDroide, Estado, CargarEstado, EditarEstado, EditarDroide, Vehiculo, Modelo, CargarModelo, EditarModelo, TipoDeProducto, EditarTipoDeProducto, CargarTipoDeProducto, CargarVehiculo, EditarVehiculo, CargarEmpresa, EditarEmpresa } from './pages/Pages.jsx';

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<Logins />} />
        <Route path='/Registro' element={<Registros />} />
        <Route path='/OlvidelaContraseña' element={<OlvideContraseñas />} />

        <Route path='/Home/:usuario' element={<Homes />} />

        <Route path='/Empresas/:usuario' element={<Empresa />} />
        <Route path='/AgregarEmpresas/:usuario' element={<CargarEmpresa />} />
        <Route path='/ModificarEmpresas/:idempresas/:usuario' element={<EditarEmpresa />} />

        <Route path='/Droides/:usuario' element={<Droide />} />
        <Route path='/AgregarDroides/:usuario' element={<CargarDroide />} />
        <Route path='/ModificarDroides/:id_droides/:usuario' element={<EditarDroide />} />

        <Route path='/Estados/:usuario' element={<Estado />} />
        <Route path='/AgregarEstados/:usuario' element={<CargarEstado />} />
        <Route path='/ModificarEstados/:id_estados/:usuario' element={<EditarEstado />} />

        <Route path='/Vehiculos/:usuario' element={<Vehiculo />} />
        <Route path='/AgregarVehiculos/:usuario' element={<CargarVehiculo />} />
        <Route path='/ModificarVehiculos/:id_vehiculos/:usuario' element={<EditarVehiculo />} />

        <Route path='/Modelos/:usuario' element={<Modelo />} />
        <Route path='/AgregarModelos/:usuario' element={<CargarModelo />} />;
        <Route path='/ModificarModelos/:id_modelos/:usuario' element={<EditarModelo />} />

        <Route path='/TipoDeProductos/:usuario' element={<TipoDeProducto />} />
        <Route path='/AgregarTipoDeProductos/:usuario' element={<CargarTipoDeProducto />} />
        <Route path='/ModificarTipoDeProductos/:id_tipo_productos/:usuario' element={<EditarTipoDeProducto />} />

      </Routes>
    </>
  )
}

export default App
