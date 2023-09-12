// aqui estan todas las paginas o archivos jsx para que solo se tenga que llamar un componente

// pagina de login
import Login from "../components/Login/Login.jsx";

export const Logins = () => <Login/>;

// registrar a los usuarios
import Registro from "../components/Registro/Registro.jsx";

export const Registros = () => <Registro/>;

// Pagina Home Donde se pueden obtener todas las rutas disponibles
import Home from "../components/Home/Home.jsx";

export const Homes = () => <Home/>;

// pagina de Empresas
import Empresas from "../components/Empresas/Empresas.jsx";

export const Empresa = () => <Empresas/>;