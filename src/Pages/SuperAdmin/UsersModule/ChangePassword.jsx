import React, { useContext, useEffect, useState } from "react";
import NavUp from "../Components/Nav/NavUp";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";
import Swal from "../Components/Swal";
import NavSuper from "../Components/Nav";
import Nav from "../../Admin/Components/Nav";
import AuthContext from "../../../contexto/Auth";
function ChangePassword() {

    const { superAd, admin, token, identifier } = useContext(AuthContext);
    const [password, setPassword] = useState({
        contrasena:""
    });
    let navigate = useNavigate();
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
    const handleOnChange = (e) => {
        setPassword({ ...password, contrasena: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        let confirm = document.querySelector("#nuevaContraseña").value;
        if (password.contrasena === confirm) {
            try {
                await fetch(config.API_URL + '/users/password/' + identifier, datosPeticion("put", password));
                Swal.exitoEditPassword();
                if (admin === true && superAd === false) {
                    navigate("/admin/general");
                }
                if (superAd === true && admin === false) {
                    navigate("/super")
                }
            } catch (error) {
                Swal.errorChangePassword();
            }
        } else {
            Swal.errorPassword();
        }
    };

    const superuser = true;
    return (
        <>{superAd || admin ?
            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    {superAd ? <NavSuper></NavSuper> : <Nav></Nav>}
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="mt-3">
                                <div className="container-fluid px-4">
                                    <div className="card mb-1">
                                        <div className="card-header mb-8">
                                            <div className="row">
                                                <div className="col-lg-6" align="center"> <h4>FORMULARIO DE CAMBIO DE CONTRASEÑA</h4></div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form className="col-lg-12" >
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">NUEVA CONTRASEÑA</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input name='contraseña' onChange={handleOnChange} type="password" id="contraseña" className="form-control" aria-describedby="passwordHelpInline" />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">VERIFIQUE NUEVA CONTRASEÑA</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <input name='nuevaContraseña' type="password" id="nuevaContraseña" className="form-control" aria-describedby="passwordHelpInline" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                            <button className="btn btn-primary mb-6px" onClick={onSubmit} type="button">EDITAR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div >
            </div >
            : <div>No autorizado</div>}
        </>);
}
export default ChangePassword;