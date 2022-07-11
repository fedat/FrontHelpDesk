import '../../../App.css';
import React, { useContext, useEffect, useState } from "react";
import NavUp from "../Components/Nav/NavUp";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";
import Swal from "../Components/Swal";
import NavSuper from "../Components/Nav";
import AuthContext from "../../../contexto/Auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function CreateUser() {
    const { superAd, token } = useContext(AuthContext);
    let navigate = useNavigate()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
    });

    function validateRole() {
        let id = document.querySelector("#admin").checked;
        let ids = document.querySelector("#super").checked;
        if (id && ids) {
            return false;
        } else
            return true;
    };
    const password = (e) => {
        setValue('contrasena', e.target.value);
    }
    const redirect = (e) => {
        navigate(`/super`)
    };

    const onSubmit = async (register) => {
       let data = {};
        let fetchDatos = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(register),
        };
        if (validateRole() === true) {
            console.log(register);
            console.log(fetchDatos.body);
            try {
                const result = await fetch(config.API_URL + '/users', fetchDatos);
                data = await result.json();
                if (data) Swal.exitoCrear();
                redirect();
            } catch (error) {
                console.log(error);
                Swal.errorCrear();
            }
        } else (
            Swal.errorRoles()
        )
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
                                                <div className="col-lg-6" align="center"> <h4>FORMULARIO DE CREACIóN DE USUARIO</h4></div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form className="col-lg-12" onSubmit={handleSubmit(onSubmit)} >
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">NOMBRE FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input
                                                            {...register("nombre", {
                                                                required: "el campo nombre es requerido"
                                                            })}
                                                            className="form-control"
                                                            aria-describedby="passwordHelpInline"
                                                        />
                                                        <ErrorMessage errors={errors} name="nombre" as="p" />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">APELLIDO FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input
                                                            {...register("apellido", {
                                                                required: "el campo apellido es requerido"
                                                            })}
                                                            className="form-control"
                                                            aria-describedby="passwordHelpInline"
                                                        />
                                                        <ErrorMessage errors={errors} name="apellido" as="p" />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">CEDULA FUNCIONARIO</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input
                                                            {...register("cedula", {
                                                                required: "La cédula es requerida.",
                                                                minLength: {
                                                                    value: 6,
                                                                    message: "Debe tener al menos 6 dígitos."
                                                                }
                                                            })}
                                                            onChange={password}
                                                            type="number"
                                                            className="form-control"
                                                            aria-describedby="passwordHelpInline"
                                                        />
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
                                                        <input
                                                            {...register("telefono", {
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
                                                            type="number"
                                                            className="form-control"
                                                            aria-describedby="passwordHelpInline"
                                                        />
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
                                                        <input
                                                            {...register("email", {
                                                                required: "El correo es requerido.",
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                                    message: "Sólo se admiten correos."
                                                                },
                                                                pattern: {
                                                                    value: /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
                                                                    message: "Sólo se admiten minusculas."
                                                                },
                                                            })}
                                                            className="form-control"
                                                            aria-describedby="passwordHelpInline"
                                                        />
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
                                                            <input {...register("administrador")} className="form-check-input" type="checkbox" id="admin" />
                                                            <label className="form-check-label" >ADMIN</label>
                                                        </div>
                                                        <div className="form-check form-switch">
                                                            <input {...register("superadministrador")} className="form-check-input" type="checkbox" id="super" />
                                                            <label className="form-check-label" >SUPER ADMIN</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                                    <button onClick={handleSubmit} className="btn btn-primary mb-6px" type="submit">CREAR</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div >
            </div >
            : <div>No autorizado</div>
        }
        </>);
}
export default CreateUser;