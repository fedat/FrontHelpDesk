import swal from "sweetalert";

const errorEliminar = () => {
    swal({
        title: "FALLO AL ELIMINAR",
        icon: "warning",
        text: "Usuario con solicitudes abiertas.",
        timer: 2000,
        button: false,
    });
};
const exitoEliminar = () => {
    swal({
        title: "USUARIO ELIMINADO",
        icon: "success",
        text: "Usuario eliminado con éxito.",
        timer: 2000,
        button: false,
    });
};
const errorEditar = () => {
    swal({
        title: "FALLO AL EDITAR",
        icon: "warning",
        text: "Por favor intente de nuevo.",
        timer: 2000,
        button: false,
    });
};
const exitoEditar = () => {
    swal({
        title: "USUARIO EDITADO",
        icon: "success",
        text: "Usuario editado con éxito.",
        timer: 2000,
        button: false,
    });
};

const errorCrear = () => {
    swal({
        title: "FALLO AL CREAR",
        icon: "warning",
        text: "Por favor intente de nuevo.",
        timer: 2000,
        button: false,
    });
};

const errorRoles = () => {
    swal({
        title: "FALLO AL CREAR",
        icon: "warning",
        text: "Sólo puede seleccionar un rol (admin o superadmin).",
        timer: 2000,
        button: false,
    });
};
const errorPassword = () => {
    swal({
        title: "FALLO AL VALIDAR",
        icon: "warning",
        text: "Verifica que la nueva contraseña y la verificación sean iguales.",
        timer: 2000,
        button: false,
    });
};

const errorChangePassword = () => {
    swal({
        title: "FALLO AL EDITAR",
        icon: "warning",
        text: "Por favor intenta de nuevo.",
        timer: 2000,
        button: false,
    });
};
const exitoEditPassword = () => {
    swal({
        title: "CONTRASEÑA EDITADA",
        icon: "success",
        text: "Contraseña ediatda con éxito.",
        timer: 2000,
        button: false,
    });
};
const exitoCrear = () => {
    swal({
        title: "USUARIO CREADO",
        icon: "success",
        text: "Usuario creado con éxito.",
        timer: 2000,
        button: false,
    });
};
export default{
    errorEliminar,
    errorEditar,
    exitoEditar,
    exitoEliminar,
    errorCrear,
    exitoCrear,
    errorRoles,
    errorPassword,
    errorChangePassword,
    exitoEditPassword
}