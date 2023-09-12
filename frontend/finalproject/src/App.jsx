
// yo kevin saque los iconos de vite y de react
//import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
//Estas son las rutas de las paginas
import { Empresa, Homes, Logins, Registros } from './pages/Pages';

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Logins/>}/>
      <Route path='/Registro' element={<Registros/>}/>
      <Route path='/Home' element={<Homes/>}/>
      <Route path='/Empresas' element={<Empresa/>}/>
     </Routes>
    </>
  )
}

export default App
