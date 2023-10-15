// aqui estan todas las paginas o archivos jsx para que solo se tenga que llamar un componente


///////////////////////////////// PAGINAS DE LOGIN / REGISTRO / RECUPERACION DE CUENTA /////////////////////////////////////////////////
// pagina de login
import Login from "../components/Login/Login.jsx";

export const Logins = () => <Login />;

// registrar a los usuarios
import Registro from "../components/Registro/Registro.jsx";

export const Registros = () => <Registro />;

// RESTAURAR LA CONTRASEÑA
import OlvideContraseña from "../components/OlvideLaContraseña/OlvideContraseñas.jsx";

export const OlvideContraseñas = () => <OlvideContraseña />;
/////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////// PAGINAS CON TODAS LAS RUTAS /////////////////////////////
import Home from "../components/Home/Home.jsx";

export const Homes = () => <Home />;
////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////// PAGINAS DE EMPRESAS ////////////////////////////////////
import Empresas from "../components/Empresas/Empresas.jsx";

export const Empresa = () => <Empresas />;

// CARGAR EMPRESAS
import CargarEmpresas from "../components/Empresas/CargarEmpresas.jsx";

export const CargarEmpresa = () => <CargarEmpresas />

// EDITAR EMPRESAS
import EditarEmpresas from "../components/Empresas/EditarEmpresas.jsx";

export const EditarEmpresa = () => <EditarEmpresas />;
//////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////// PAGINAS DE DROIDES ////////////////////////////
// Pagina principal de la tabla de droides
import Droides from "../components/Droides/Droides.jsx";

export const Droide = () => <Droides />;

// Cargar 
import CargarDroides from "../components/Droides/CargarDroides.jsx";

export const CargarDroide = () => <CargarDroides />;

// Editar
import EditarDroides from "../components/Droides/EditarDroides.jsx";

export const EditarDroide = () => <EditarDroides />;
//////////////////////////////////////////////////////////////////////////////////





/////////////////////////////// PAGINAS DE LOS ESTADOS //////////////////////////
import Estados from "../components/Estados/Estados.jsx";

export const Estado = () => <Estados />;

// Cargar
import CargarEstados from "../components/Estados/CargarEstados.jsx";

export const CargarEstado = () => <CargarEstados />;

// Editar
import EditarEstados from "../components/Estados/EditarEstados.jsx";

export const EditarEstado = () => <EditarEstados />;
/////////////////////////////////////////////////////////////////////////





///////////////////////////////// PAGINAS DE VEHICULOS ////////////////////////////////
import Vehiculos from "../components/Vehiculos/Vehiculos.jsx";

export const Vehiculo = () => <Vehiculos />;

// CARGAR VEHICULOS
import CargarVehiculos from "../components/Vehiculos/CargarVehiculos.jsx";

export const CargarVehiculo = () => <CargarVehiculos />;

// EDITAR VEHICULOS
import EditarVehiculos from "../components/Vehiculos/EditarVehiculos.jsx";

export const EditarVehiculo = () => <EditarVehiculos />;
//////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////// PAGINAS DE MODELOS //////////////////////////////////
import Modelos from "../components/Modelos/Modelos.jsx";

export const Modelo = () => <Modelos />;

// CARGAR MODELOS
import CargarModelos from "../components/Modelos/CargarModelos.jsx";

export const CargarModelo = () => <CargarModelos />;

// EDITAR MODELOS
import EditarModelos from "../components/Modelos/EditarModelos.jsx";

export const EditarModelo = () => <EditarModelos />;
////////////////////////////////////////////////////////////////////////////////////




//////////////////////////// PAGINAS TIPOS DE PRODUCTOS ///////////////////////////
import TipoDeProductos from "../components/TipoDeProductos/TipoDeProductos.jsx";

export const TipoDeProducto = () => <TipoDeProductos />;

// CARGAR TIPO DE PRODUCTO
import CargarTipoDeProductos from "../components/TipoDeProductos/CargarTipoDeProductos.jsx";

export const CargarTipoDeProducto = () => <CargarTipoDeProductos />;

// EDITAR TIPO DE PRODUCTO
import EditarTipoDeProductos from "../components/TipoDeProductos/EditarTipoDeProductos.jsx";

export const EditarTipoDeProducto = () => <EditarTipoDeProductos />;
//////////////////////////////////////////////////////////////////////////////////