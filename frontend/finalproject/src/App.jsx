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

        <Route path='/Home' element={<Homes />} />

        <Route path='/Empresas' element={<Empresa />} />
        <Route path='/AgregarEmpresas' element={<CargarEmpresa />} />
        <Route path='/ModificarEmpresas/:idempresas' element={<EditarEmpresa />} />

        <Route path='/Droides' element={<Droide />} />
        <Route path='/AgregarDroides' element={<CargarDroide />} />
        <Route path='/ModificarDroides/:id_droides' element={<EditarDroide />} />

        <Route path='/Estados' element={<Estado />} />
        <Route path='/AgregarEstados' element={<CargarEstado />} />
        <Route path='/ModificarEstados/:id_estados' element={<EditarEstado />} />

        <Route path='/Vehiculos' element={<Vehiculo />} />
        <Route path='/AgregarVehiculos' element={<CargarVehiculo />} />
        <Route path='/ModificarVehiculos/:id_vehiculos' element={<EditarVehiculo />} />

        <Route path='/Modelos' element={<Modelo />} />
        <Route path='/AgregarModelos' element={<CargarModelo />} />;
        <Route path='/ModificarModelos/:id_modelos' element={<EditarModelo />} />

        <Route path='/TipoDeProductos' element={<TipoDeProducto />} />
        <Route path='/AgregarTipoDeProductos' element={<CargarTipoDeProducto />} />
        <Route path='/ModificarTipoDeProductos/:id_tipo_productos' element={<EditarTipoDeProducto />} />

      </Routes>
    </>
  )
}

export default App
