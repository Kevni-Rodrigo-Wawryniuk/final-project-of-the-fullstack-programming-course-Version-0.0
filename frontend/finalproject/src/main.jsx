import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// Esto es para redireccionar el main al app.jsx y desde ay recien usar las paginas
// esto solo se hace una ves ya que despues las seguridad y el resto se colocan el las paginas
import {BrowserRouter} from 'react-router-dom';

// aqui simplemente colocamos la importacion a la app.jsx que en ese archivo van a estar todas las rutas a las otras paginas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
