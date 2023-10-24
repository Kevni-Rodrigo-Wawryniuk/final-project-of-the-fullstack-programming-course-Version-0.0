import { useEffect, useState } from 'react';
import * API from '../components/Service/Service.js';
import { useLocation } from "react-router-dom";

function LookOut() {

  const route = useLocation();

  const [permiso, setPermiso] = useState(false);

  useEffect(() => {

    const datos_usuario = JSON.parse(localStorage.getItem('correo'));

    verpermiso(datos_usuario.correo);

  }, []);

  const ver_permisos = async (id_rol) => {

    const menu = ruta.pathname;

    const respuesta = await API.postVerificarCorreo({ correo, menu });

    if (respuesta.status) {

      setPermisoDenegado(true)
      console.log('puedo')

    } else {

      let timerInterval
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: ' No tiene permiso <b></b> .',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/'
        }
      })
    }
  }

  return (
    <>

    </>
  )
    ;
}

