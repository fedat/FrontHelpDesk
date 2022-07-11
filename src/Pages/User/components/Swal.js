import swal from "sweetalert";
const errorCedula = () => {
    swal({
        title: "CEDULA INCORRECTA",
        icon: "warning",
        text: "Por favor ingrese la cédula de nuevo",
        timer: 2000,
        button: false,
    });
};
const errorSolicitud = () => {
    swal({
        title: "FALLO AL REALIZAR SOLICITUD",
        icon: "warning",
        text: "Por favor intente de nuevo.",
        timer: 2000,
        button: false,
    });
};
const exitoSolicitud = () => {
    swal({
        title: "SOLICITUD REALIZADA",
        icon: "success",
        text: "Tu solicitud fue realizada con éxito.",
        timer: 2000,
        button: false,
    });
};

const errorSurvey= () => {
    swal({
        title: "FALLO AL ENVIAR SOLICITUD",
        icon: "warning",
        text: "Por favor ingrese valor valido en los campos.",
        timer: 2000,
        button: false,
    });
};

const exitoSurvey = () => {
    swal({
        title: "ENVIÍO DE ENCUESTA REALIZADO",
        icon: "success",
        text: "La respuesta a tu encuesta fue enviada con éxito.",
        timer: 2000,
        button: false,
    });
};

export default {
    errorCedula,
    exitoSolicitud,
    errorSolicitud,
    errorSurvey,
    exitoSurvey
}