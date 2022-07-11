import React, { useState, useEffect, useContext } from "react";
import { useFetchData } from "../../Hooks/UseFetch";
import NavUp from "./components/Nav/NavUp";
import NavUser from "./components/Nav";
import NavSuper from "../SuperAdmin/Components/Nav";
import Nav from "../Admin/Components/Nav";
import AuthContext from "../../contexto/Auth";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import Swal from "./components/Swal";
const UserIndex = () => {
    const { token, identifier, superAd, admin } = useContext(AuthContext);
    let navigate = useNavigate();
    const { data: userLog } = useFetchData(`/users/${identifier}`);
    const { data: dependencias } = useFetchData('/dependencia');
    const [soportes, setSoportes] = useState([]);
    const [subsoportes, setSubsoportes] = useState([]);
    const [solicitud, setSolicitud] = useState({
        solicitudPadre: null,
        idFuncionario: 0,
        estado: "en proceso",
        idDependencia: 0,
        nivelCriticidad: null,
        tiempoRespuesta: null,
        marcaTemporal: new Date().toISOString(),
        fechaCierre: null,
        detalleSolicitud: null,
        idSubcategoria: 0
    });
    var arrImages = [];

    useEffect(() => {
        if (!superAd && !admin) {
            setSolicitud({ ...solicitud, idFuncionario: userLog.id });
        }
    }, [userLog]);

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

    const validarCedula = async e => {
        let data = {};
        var valida = false
        console.log(e.target.value);
        try {
            const result = await fetch(config.API_URL + '/users/ced/' + [e.target.value], datosPeticion("get"));
            data = await result.json();
            console.log(data);
            if (data) {
                valida = true;
                setSolicitud({ ...solicitud, idFuncionario: data.id });
            } else {
                Swal.errorCedula()
            }
        } catch (error) {
            valida = false;
            Swal.errorCedula()
            console.log(error.message)
        }
        return valida
    };

    const filterSoporte = async e => {
        e.preventDefault();
        let identificador = document.querySelector("#tipoSolicitud").value;
        identificador == 1 ? setSolicitud({ ...solicitud, tiempoRespuesta: "12" }) :
            identificador == 2 ? setSolicitud({ ...solicitud, tiempoRespuesta: "6" }) :
                setSolicitud({ ...solicitud, tiempoRespuesta: null });
        let data = {};

        if (identificador !== "seleccione una opción") {
            try {
                const result = await fetch(config.API_URL + '/soporte/' + identificador, datosPeticion("get"));
                data = await result.json();
                setSoportes(data);
            } catch (error) {
                console.log(error.message)
            }
        }
    };

    const filterSubSoporte = async e => {
        e.preventDefault();
        let identificador = document.querySelector("#soporte").value;
        console.log(identificador);
        let data = {};
        if (identificador !== "seleccione una opción") {
            try {
                const result = await fetch(config.API_URL + '/subsoporte/' + identificador, datosPeticion("get"));
                data = await result.json();
                setSubsoportes(data);
                setSolicitud({ ...solicitud, idSubcategoria: identificador });
                return true
            } catch (error) {
                console.log(error.message)
            }
        }
    };
    const handleOnChange = (e) => {
        if (e.target.name === "idDependencia" || e.target.name === "idSubcategoria") {
            setSolicitud({ ...solicitud, [e.target.name]: parseInt(e.target.value) });
        } else {
            setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
        }
    };
    const validateFields = () => {
        let cedula = document.querySelector("#cedula").value;
        let dependencia = document.querySelector("#idDependencia").value;
        let tipoSolicitud = document.querySelector("#tipoSolicitud").value;
        let soporte = document.querySelector("#soporte").value;
        let subcategoria = document.querySelector("#idSubcategoria").value;
        let detalleSolicitud = document.querySelector("#detalleSolicitud").value;
        var valido = false;
        console.log(dependencia, tipoSolicitud, soporte, subcategoria, detalleSolicitud);
        if (cedula === "" || dependencia === "seleccione una opción" || tipoSolicitud === "seleccione una opción" || soporte === "seleccione una opción" || subcategoria === "seleccione una opción" || detalleSolicitud === "") {
            valido = false;
        } else {
            valido = true;
        }
        return valido;
    };
    const handleFile = async (e) => {
        // Getting the files from the input
        arrImages = [];
        console.log(e.target.files);
        var imagenes = Object.values(e.target.files);
        imagenes.forEach(async (file) => {
            let base64 = await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (dato) => resolve(fileReader.result);
            });
            let images = {
                nombreImagen: file.name,
                tipo: file.type,
                baseImg: base64
            };
            arrImages.push(images);
        })
        console.log(arrImages);
    };

    const sendImages = async (e) => {
        e.preventDefault();
        var idSolicitud = 10
        try {
            await fetch(config.API_URL + '/evidencia/' + idSolicitud, datosPeticion("post", arrImages));
        } catch (error) {
            console.log(error)
        }

    }

    const sumbitSolicitud = async e => {
        e.preventDefault();
        console.log(solicitud);
        console.log(arrImages);
        var formValido = validateFields();
        let data = {};
        console.log(formValido);
        if (formValido) {
            try {
                const result = await fetch(config.API_URL + '/solicitud', datosPeticion("post", solicitud));
                data = await result.json();
                console.log(data);
                if (data) {
                    if (arrImages.length !== 0) {
                        var idSolicitud = data.noTicket;
                        await fetch(config.API_URL + '/evidencia/' + idSolicitud, datosPeticion("post", arrImages));
                    }
                    Swal.exitoSolicitud();
                    if (admin === true && superAd === false) {
                        navigate("/admin/general");
                    }
                    if (superAd === true && admin === false) {
                        navigate("/super")
                    }
                    if (superAd === false && admin === false) {
                        navigate("/user-requests");
                    }

                }
                else {
                    Swal.errorSolicitud();
                }
            } catch (error) {
                Swal.errorSolicitud();
                console.log(error.message);
            }
        } else {
            Swal.errorSurvey()
        }
    };


    return (
        <>

            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    {superAd ? <NavSuper></NavSuper> : admin ? <Nav></Nav> : <NavUser></NavUser>}
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="mt-3">
                                <div className="container-fluid px-4">
                                    <div className="card mb-1">
                                        <div className="card-header mb-8">
                                            <div align="center"> <h4>FORMULARIO DE SOLICITUD</h4></div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">CEDULA</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            {superAd || admin ?
                                                                < input type="list" id="cedula" onBlur={validarCedula} className="form-control" aria-describedby="passwordHelpInline" /> :
                                                                < input type="number" id="cedula" className="form-control" aria-describedby="passwordHelpInline" value={userLog.cedula === undefined ? " " : userLog.cedula} readOnly />}
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">DEPENDENCIA</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="idDependencia" name="idDependencia" onChange={handleOnChange} className="form-select" aria-label="Default select example" >
                                                                <option>seleccione una opción</option>
                                                                {dependencias.map((dependencia) =>
                                                                    <option type='number' value={dependencia.idDependencia} key={dependencia.idDependencia}>
                                                                        {dependencia.nombreDependencia}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">TIPO SOLICITUD</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="tipoSolicitud" className="form-select" onChange={filterSoporte} aria-label="Default select example">
                                                                <option value="seleccione una opción">seleccione una opción</option>
                                                                <option value="1">requerimiento</option>
                                                                <option value="2">incidente</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">SOPORTE</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="soporte" className="form-select" aria-label="Default select example" onChange={filterSubSoporte}>
                                                                <option>seleccione una opción</option>
                                                                {soportes.map((soporte) =>
                                                                    <option value={soporte.idSoporte} key={soporte.idSoporte}>
                                                                        {soporte.nombreSoporte}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">SUBSOPORTE</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="idSubcategoria" name="idSubcategoria" onChange={handleOnChange} className="form-select" aria-label="Default select example">
                                                                <option>seleccione una opción</option>
                                                                {subsoportes.map((subsoporte) =>
                                                                    <option value={subsoporte.idSubcategoria} key={subsoporte.idSubcategoria}>
                                                                        {subsoporte.subcategoria}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">DETALLE DE LA SOLICITUD</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <textarea id="detalleSolicitud" name="detalleSolicitud" onChange={handleOnChange} className="form-control" style={{ resize: "none" }} rows="11" cols="40" aria-label="With textarea"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">ADJUNTAR EVIDENCIAS</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input id="inputTicket" className="form-control" type="file" onChange={(e) => handleFile(e)} aria-describedby="passwordHelpInline" accept="image/jpg, image/jpeg, image/png" multiple />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                            <button onClick={sumbitSolicitud} className="btn btn-primary mb-6px" type="button">Enviar solicitud</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div >
            </div >
        </>);
}
export default UserIndex;