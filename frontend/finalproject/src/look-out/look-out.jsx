import { useEffect, useState } from 'react';
import * API from '../components/Service/Service.js';
import { useLocation } from "react-router-dom";

function LookOut(){

    const route = useLocation();

    const [permiso, setPermiso] = useState(false);

    useEffect(()=>{

        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        
        verpermiso(datos_usuario.roles);
        
    })
}

export default LookOut;