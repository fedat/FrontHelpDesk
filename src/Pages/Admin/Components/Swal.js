
import swal from "sweetalert";
const errorLogin=()=>{
    swal({
        title: "NO AUTORIZADO",
        text: "Usuario o contraseña invalidos.",
        timer: 2000,
        button: false,
      });
}
const exitoEdicionSolicitud = () => {
  swal({
      title: "SOLICITUD EDITADA",
      icon: "success",
      text: "Tu solicitud fue editada con éxito.",
      timer: 2000,
      button: false,
  });
};
const errorEditarValidacion = (array) => {
  let error=' '
  for(var i=0; i<array.length; i++){
    error=error+i
   }
  swal({
      title: "FALLO AL EDITAR SOLICITUD",
      icon: "warning",
      text: `Ingrese un valor valido en ${array}`,
      timer: 2000,
      button: false,
  });
};

const errorEditar = () => {
  swal({
      title: "FALLO AL EDITAR SOLICITUD",
      icon: "warning",
      text: "Falló al editar",
      timer: 2000,
      button: false,
  });
};

const errorSolicitudPadre = (error) => {
  swal({
      title: "SOLICITUD PADRE INVALIDA",
      icon: "warning",
      text: `Ingresa un identificador de solicitud valido ${error}`,
      timer: 2000,
      button: false,
  });
};


const errorCamposModificacion = () => {
  swal({
      title: "CAMPOS VACIOS",
      icon: "warning",
      text: "Ingrese valores validos en los campos de 'motivo modificación' y 'detalles",
      timer: 2000,
      button: false,
  });
};


const justificarCambios = () => {
  swal({
      title: "JUSTIFIQUE LOS CAMBIOS",
      icon: "warning",
      text: "Por favpr explique el motivo y detalles de modificación",
      timer: 2000,
      button: false,
  });
};


export default {errorLogin, exitoEdicionSolicitud, errorEditarValidacion, errorSolicitudPadre,errorEditar, justificarCambios, errorCamposModificacion} 