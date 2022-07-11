import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useFetchData } from "../../../Hooks/UseFetch";
import NavUp from "../Components/Nav/NavUp";
import NavSuper from "../Components/Nav";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import Swal from "../Components/Swal";
import AuthContext from "../../../contexto/Auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const EditUser = () => {
    const {superAd, token} = useContext(AuthContext);
    const created=new Date().toISOString()
    const { id } = useParams();
    const { data } = useFetchData(`/users/${id}`);
    let navigate = useNavigate();
    useEffect(() => {
       reset({
           nombre: data.nombre,
           apellido: data.apellido,
           cedula: data.cedula,
           telefono: data.telefono,
           email: data.email,
           contraseña: data.contraseña
       });
        if (data.administrador === true) {
            document.querySelector("#admin").checked = true;
        }
        if (data.superadministrador === true) {
            document.querySelector("#super").checked = true;
        }
        if (data.activo === true) {
            document.querySelector("#active").checked = true;
        }
    }, [data]);
    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all",
    });
    function validateRole() {
        let id = document.querySelector("#admin").checked;
        let ids = document.querySelector("#super").checked;
        if (id && ids) {
            return false;
        } else
            return true;
    }
    const redirect = (e) => {
        navigate(`/super`)
    }
    const datosPeticion = (metodo, body) => {
        const fetchDatos = {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        }
        return fetchDatos;
    };
    const onSubmit = async (register) => {
        let data = {};
        if (validateRole() === true) {
            console.log(register);
            try {
                const result = await fetch(config.API_URL + '/users/' + id, datosPeticion("put",register));
                data = await result.json();
                if (data) Swal.exitoEditar();
                redirect();
            } catch (error) {
                console.log(error.message)
                Swal.errorEditar();
            }
        } else (
            Swal.errorRoles()
        )
    };

    const resetPassword = async e => {
        e.preventDefault();
        let data = {};
        try {
            const result = await fetch(config.API_URL + '/users/password/solicitante/'+id ,datosPeticion("put"));
            data = await result.json();
            if (data) Swal.exitoEditPassword();
            redirect();
        } catch (error) {
            console.log(error.message)
            Swal.errorChangePassword();
        }
        redirect();
    };
    return (
        <>{superAd ?
            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    <NavSuper></NavSuper>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="mt-3">
                                <div className="container-fluid px-4">
                                    <div className="card mb-1">
                                        <div className="card-header mb-8">
                                            <div className="row">
                                                <div className="col-lg-6" align="center"> <h4>FORMULARIO DE USUARIO: {id}</h4></div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form className="col-lg-12" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">NOMBRE FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input  {...register("nombre", {
                                                            required: "el campo nombre es requerido"
                                                        })} className="form-control" aria-describedby="passwordHelpInline" />
                                                        <ErrorMessage errors={errors} name="nombre" as="p" />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">APELLIDO FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input  {...register("apellido", {
                                                            required: "el campo apellido es requerido"
                                                        })}className="form-control" aria-describedby="passwordHelpInline" />
                                                        <ErrorMessage errors={errors} name="apellido" as="p" />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">CEDULA FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input  {...register("cedula", {
                                                            required: "La cédula es requerida.",
                                                            minLength: {
                                                                value: 6,
                                                                message: "Debe tener al menos 6 dígitos."
                                                            }
                                                        })}
                                                            type="number"
                                                            className="form-control" aria-describedby="passwordHelpInline" />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="cedula"
                                                            render={({ messages }) =>
                                                                messages &&
                                                                Object.entries(messages).map(([type, message]) => (
                                                                    <p key={type}>{message}</p>
                                                                ))
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">NÚMERO DE CONTACTO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input  {...register("telefono", {
                                                            required: "El número telefónico es requerido.",
                                                            maxLength: {
                                                                value: 10,
                                                                message: "Caracteres máximos calcanzado."
                                                            },
                                                            minLength: {
                                                                value: 10,
                                                                message: "Debe tener 10 dígitos."
                                                            }
                                                        })}
                                                            type="number" className="form-control" aria-describedby="passwordHelpInline" />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="telefono"
                                                            render={({ messages }) =>
                                                                messages &&
                                                                Object.entries(messages).map(([type, message]) => (
                                                                    <p key={type}>{message}</p>
                                                                ))
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">CORREO INSTITUCIONAL</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input  {...register("email", {
                                                            required: "El correo es requerido.",
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                                message: "Sólo se admiten correos."
                                                            },   pattern: {
                                                                value: /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
                                                                message: "Sólo se admiten minusculas."
                                                            },
                                                        })}
                                                        className="form-control" 
                                                        aria-describedby="passwordHelpInline" />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="email"
                                                            render={({ messages }) =>
                                                                messages &&
                                                                Object.entries(messages).map(([type, message]) => (
                                                                    <p key={type}>{message}</p>
                                                                ))
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="card mb-1" >
                                                    <div className="card-header mb-8">
                                                        <div align="center"> <h4>PERMISOS DE USUARIO</h4></div>
                                                    </div>
                                                    <div></div>
                                                    <div className="card-body col-lg-4"  >
                                                        <div className="form-check form-switch ">
                                                            <input className="form-check-input" {...register("administrador")} type="checkbox" role="switch" id="admin" />
                                                            <label className="form-check-label" > ADMIN</label>
                                                        </div>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" {...register("superadministrador")} type="checkbox" role="switch" id="super" />
                                                            <label className="form-check-label" >SUPER ADMIN</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mb-1" >
                                                    <div className="card-header mb-8">
                                                        <div align="center"> <h4>ESTADO DE USUARIO</h4></div>
                                                    </div>
                                                    <div></div>
                                                    <div className="card-body col-lg-4"  >
                                                        <div className="form-check form-switch ">
                                                            <input className="form-check-input" {...register("activo")} type="checkbox" role="switch" id="active" />
                                                            <label className="form-check-label" > ACTIVO</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                                    <button onClick={handleSubmit} className="btn btn-primary mb-6px" type="submit">EDITAR</button>
                                                    <button onClick={resetPassword} className="btn btn-outline-primary" type="button">REESTABLECER CONTRASEÑA</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div >
                </div >
            </div >
            : <div>No autorizado</div>}
        </>);
}
export default EditUser;