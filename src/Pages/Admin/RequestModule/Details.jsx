import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../Hooks/UseFetch";
import { config } from "../../../config";
import Swal from "../Components/Swal";
import Nav from '../Components/Nav/index';
import NavUp from "../Components/Nav/NavUp";
import NavRequest from "../Components/Nav/navRequest";
import NavSuper from "../../SuperAdmin/Components/Nav";
import AuthContext from "../../../contexto/Auth";
import ImagesCarousel from "./ImagesCarousel";

const Details = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const { superAd, admin, token, identifier } = useContext(AuthContext);
    const { data: solicitudData } = useFetchData(`/solicitud/${id}`);
    const { data: administradores } = useFetchData('/users/admins');
    const { data: adminEncargado } = useFetchData(`/asignacion/admin/${id}`);
    const [soportes, setSoportes] = useState([]);
    const [subsoportes, setSubsoportes] = useState([]);
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
    const loadSoporte = async e => {
        const dataResponse = await fetch(config.API_URL + `/solicitud/${id}`, datosPeticion("get"));
        const data = await dataResponse.json()
        document.querySelector('#tipoSolicitud').value = data.id_tipo;
        const soportesResponse = await fetch(config.API_URL + `/soporte/${data.id_tipo}`, datosPeticion("get"));
        const soportes = await soportesResponse.json();
        setSoportes(soportes);
        document.querySelector('#soporte').value = data.id_soporte;
        const subcategoriasResponse = await fetch(config.API_URL + `/subsoporte/${data.id_soporte}`, datosPeticion("get"));
        const subcategorias = await subcategoriasResponse.json();
        setSubsoportes(subcategorias);
        document.querySelector('#idSubcategoria').value = data.id_subcategoria;
        document.querySelector('#nivelCriticidad').value = data.nivel_criticidad;
        document.querySelector('#estadoSolicitud').value = data.estado;
    }
    const [solicitudEditada, setSolicitudEditada] = useState({
        noTicket: id,
        solicitudPadre: 0,
        idFuncionario: 0,
        estado: "",
        idDependencia: 0,
        nivelCriticidad: "",
        tiempoRespuesta: "",
        marcaTemporal: "",
        fechaCierre: "",
        detalleSolicitud: "",
        idSubcategoria: "",
    });
    const [asignacion, setAsignacion] = useState({
        idAdministrador: 0,
        noTicket: 0,
        estado: true
    });
    const [modificacion, setModificacion] = useState({
        noTicket: solicitudData.no_ticket,
        capturaSolicitud: "",
        motivo: "",
        detalles: "",
        fechaAtencion: ""
    });
    useEffect(() => {
        loadSoporte();
        setSolicitudEditada({
            noTicket: id,
            solicitudPadre: solicitudData.solicitud_padre,
            idFuncionario: solicitudData.id_funcionario,
            estado: solicitudData.estado,
            idDependencia: solicitudData.id_dependencia,
            nivelCriticidad: solicitudData.nivel_criticidad,
            tiempoRespuesta: solicitudData.tiempo_respuesta,
            marcaTemporal: solicitudData.fecha_creacion,
            fechaCierre: solicitudData.fecha_cierre,
            detalleSolicitud: solicitudData.detalle_solicitud,
            idSubcategoria: solicitudData.id_subcategoria,
        });
        setAsignacion({
            idAdministrador: adminEncargado.id_funcionario,
            noTicket: id,
            estado: true
        });
        setModificacion({
            noTicket: solicitudData.no_ticket,
            capturaSolicitud: "",
            motivo: "",
            detalles: "",
            fechaAtencion: ""
        })
    }, [solicitudData, adminEncargado]);

    const filterSoporte = async e => {
        e.preventDefault();
        let identificador = document.querySelector("#tipoSolicitud").value;
        changeTiempoRespuesta();
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
        if (identificador === "seleccione una opción") {
            setSoportes([]);
            setSubsoportes([]);
        }
    };

    const filterSubSoporte = async e => {
        let identificador = document.querySelector("#soporte").value;
        console.log(identificador);
        e.preventDefault();
        let data = {};
        if (identificador !== "seleccione una opción") {
            try {
                const result = await fetch(config.API_URL + '/subsoporte/' + identificador, datosPeticion("get"));
                data = await result.json();
                setSubsoportes(data);
            } catch (error) {
                console.log(error.message)
            }
        } if (identificador === "seleccione una opción") {
            setSubsoportes([])
        }
    };
    const changeTiempoRespuesta = (e) => {
        var criticidad = document.querySelector("#tipoSolicitud").value;
        var textHours = document.querySelector('#tiempoRespuesta');
        criticidad === '1' ? textHours.innerText = '6 horas' :
            criticidad === '2' ? textHours.innerText = '12 horas' :
                textHours.innerText = '0 horas'
        console.log(criticidad)
    };
    const validarIdeExistente = async (e) => {
        e.preventDefault();
        let data = {};
        let dataAsig = {};
        var valida = false;
        try {
            const result = await fetch(config.API_URL + '/solicitud/' + e.target.value, datosPeticion("get"));
            data = await result.json();
            valida = true;

            const asignado = await fetch(config.API_URL + '/asignacion/admin/' + data.no_ticket, datosPeticion("get"));
            dataAsig = await asignado.json();
            if (dataAsig !== null) {
                setAsignacion({
                    idAdministrador: parseInt(dataAsig.id_funcionario),
                    noTicket: parseInt(id),
                    estado: true
                });
                document.querySelector('#reasignacion').value = dataAsig.id_funcionario;
                document.querySelector("#estadoSolicitud").value = "escalado";
                setSolicitudEditada({ ...solicitudEditada, estado: "escalado", solicitudPadre: data.no_ticket });
            } else {
                setAsignacion({ ...asignacion, idAdministrador: undefined });
                document.querySelector('#reasignacion').value = undefined;
                document.querySelector("#estadoSolicitud").value = "en proceso";
                setSolicitudEditada({ ...solicitudEditada, estado: "en proceso", solicitudPadre: data.no_ticket });
            }
        } catch (error) {
            valida = false;
            Swal.errorSolicitudPadre(error);
        }
        return valida
    };

    const handleOnChange = (e) => {
        if (e.target.name === "idSubcategoria") {
            setSolicitudEditada({ ...solicitudEditada, [e.target.name]: parseInt(e.target.value) });
        } else {
            setSolicitudEditada({ ...solicitudEditada, [e.target.name]: e.target.value });
        }
        console.log(e.target.name, e.target.value)
    };

    const reasignar = (e) => {
        if (e.target.value !== "seleccione una opción") {
            document.querySelector("#estadoSolicitud").value = "escalado";
            setSolicitudEditada({ ...solicitudEditada, estado: "escalado" });
        }
        setAsignacion({
            idAdministrador: parseInt(e.target.value),
            noTicket: parseInt(id),
            estado: true
        })
    };

    const validateFields = () => {
        var valido = true
        var fields = []
        var tipoSolicitud = document.querySelector("#tipoSolicitud").value;
        var soporte = document.querySelector("#soporte").value;
        var subsoporte = document.querySelector("#idSubcategoria").value;
        var criticidad = document.querySelector("#nivelCriticidad").value;
        if (tipoSolicitud === "seleccione una opción") {
            fields.push("tipo solicitud");
            valido = false
        }
        if (soporte === "seleccione una opción") {
            fields.push("soporte");
            valido = false
        }
        if (subsoporte === "seleccione una opción") {
            fields.push("subsoporte");
            valido = false
        }
        if (criticidad === "seleccione una opción" || criticidad === "") {
            fields.push("criticidad");
            valido = false
        }
        if (valido === false)
            Swal.errorEditarValidacion(fields)
        return valido;
    };

    const validateChangeFields = () => {
        var editadaSub = solicitudEditada.idSubcategoria;
        var sub = solicitudData.id_subcategoria;
        var editadaCrit = solicitudEditada.nivelCriticidad
        var crit = solicitudData.nivel_criticidad;
        var editadaEst = solicitudEditada.estado;
        var est = solicitudData.estado;
        var nuevoAsign = asignacion.idAdministrador;
        var asign = adminEncargado.id_funcionario;
        var editadaPadre = solicitudEditada.solicitudPadre;
        var padre = solicitudData.solicitud_padre;
        var change = false
        if (editadaSub !== sub || editadaCrit !== crit || editadaEst !== est || asign !== nuevoAsign || editadaPadre !== padre) {
            change = true
        } else {
            change = false
        }
        return change;
    };

    const changeModificacion = async (e) => {
        var captura = `tipo solicitud: ${solicitudData.nombre_tipo}\n
        soporte: ${solicitudData.nombre_soporte}\n
        subsoporte: ${solicitudData.subcategoria}\n
        criticidad: ${solicitudData.nivel_criticidad}\n
        asignado: ${adminEncargado.nombre_funcionario} ${adminEncargado.apellido_funcionario}\n
        solicitud padre: ${solicitudData.solicitud_padre}
         `
        setModificacion({
            ...modificacion, noTicket: solicitudData.no_ticket,
            capturaSolicitud: captura,
            fechaAtencion: new Date().toISOString(),
            [e.target.name]: e.target.value
        });
    };

    const redirectSuccess = () => {
        Swal.exitoEdicionSolicitud();
        if (superAd) {
            if (solicitudEditada.estado !== "solucionado") {
                navigate(`/request-details/${id}`)
            }
            else {
                navigate("/requests/general");
            }
        }
        if (admin) {
            if (solicitudEditada.estado !== "solucionado") {
                navigate(`/request-details/${id}`);
            } else {
                navigate("/admin/general");
            }
        }

    };
    const sumbitSolicitud = async e => {
        e.preventDefault();
        console.log(modificacion);
        console.log(solicitudEditada);
        let data = {};
        var cambiosForm = validateChangeFields();
        var camposValidos = validateFields();
        if (camposValidos === true) {
            if (cambiosForm === true && (modificacion.detallesMotivo === "" || modificacion.motivo === "")) {
                Swal.justificarCambios();
                cambiosForm = validateChangeFields();
            }
            if (cambiosForm === false) {
                redirectSuccess()
            } else if (cambiosForm === false && modificacion.detallesMotivo !== "" || modificacion.motivo !== "") {
                try {
                    console.log(solicitudEditada);
                    const result = await fetch(config.API_URL + '/solicitud/' + id, datosPeticion("put", solicitudEditada));
                    data = await result.json();
                    if (data) {
                        if (asignacion.idAdministrador === undefined) {
                            //  setAsignacion({...asignacion, idAdministrador:identifier});
                            redirectSuccess();
                        } else {
                            await fetch(config.API_URL + '/asignacion', datosPeticion("post", asignacion));
                            redirectSuccess();
                        }
                        await fetch(config.API_URL + '/modificacion/', datosPeticion("post", modificacion));
                    }
                    else {
                        Swal.errorEliminar();
                    }
                } catch (error) {
                    Swal.errorEditar();
                    console.log(error.message);
                }
            }
        }
    }

    return (
        <>
            {superAd || admin ?
                <div className="sb-nav-fixed">
                    <NavUp></NavUp>
                    <div id="layoutSidenav">
                        {superAd ? <NavSuper></NavSuper> : <Nav></Nav>}
                        <div id="layoutSidenav_content">
                            <main>
                                <NavRequest></NavRequest>
                                <div className="mt-3">
                                    <div className=" container-fluid px-4">
                                        <div className="row">
                                            <div className="col-lg-6 card">
                                                <div className="card-header">
                                                    <div align="center"> <h4>DATOS SOLICITUD No {solicitudData.no_ticket}</h4></div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 row align-items-center">
                                                            <div className="col-auto col-lg-6">
                                                                <label className="col-form-label">No ticket</label>
                                                            </div>
                                                            <div className="col-auto col-lg-6">
                                                                <label className="col-form-label">{solicitudData.noTicket}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 row align-items-center">
                                                            <div className="col-auto col-lg-4">
                                                                <label className="col-form-label">Estado</label>
                                                            </div>
                                                            <div className="col-auto col-lg-8">
                                                                <label className="col-form-label">{solicitudData.estado}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Tipo solicitud</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="tipoSolicitud" className="form-select" onChange={filterSoporte} aria-label="Default select example">
                                                                <option value="seleccione una opción">seleccione una opción</option>
                                                                <option value="1">requerimiento</option>
                                                                <option value="2">incidente</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Soporte</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="soporte" className="form-select" aria-label="Default select example" onChange={filterSubSoporte}>
                                                                <option value="seleccione una opción">seleccione una opción</option>
                                                                {soportes.map((soporte) =>
                                                                    <option value={soporte.idSoporte} key={soporte.idSoporte}>
                                                                        {soporte.nombreSoporte}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Subsoporte</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select id="idSubcategoria" name="idSubcategoria" onChange={handleOnChange} className="form-select" aria-label="Default select example">
                                                                <option value="seleccione una opción">seleccione una opción</option>
                                                                {subsoportes.map((subsoporte) =>
                                                                    <option value={subsoporte.idSubcategoria} key={subsoporte.idSubcategoria}>
                                                                        {subsoporte.subcategoria}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Criticidad</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8 ">
                                                            <select onChange={handleOnChange} id="nivelCriticidad" name="nivelCriticidad" className="form-select" aria-label="Default select example">
                                                                <option value="seleccione una opción">seleccione una opción</option>
                                                                <option value="alta">Alta</option>
                                                                <option value="media">Media</option>
                                                                <option value="baja">Baja</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Tiempo de respuesta</label>
                                                        </div>
                                                        <div className="input-group-sm col-auto col-lg-8">
                                                            <label id="tiempoRespuesta" name="tiempoRespuesta" className="col-form-label" >{solicitudEditada.tiempoRespuesta} horas</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 card">
                                                <div className="card-header">
                                                    <div align="center"> <h4>DATOS SOLICITANTE</h4></div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Nombre funcionario</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={solicitudData.nombre_funcionario === undefined ? "" : solicitudData.nombre_funcionario} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Apellido Funcionario</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={solicitudData.apellido_funcionario === undefined ? "" : solicitudData.apellido_funcionario} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Número contacto</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={solicitudData.telefono_funcionario === undefined ? "" : solicitudData.telefono_funcionario} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Correo</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={solicitudData.correo_institucional === undefined ? "" : solicitudData.correo_institucional} readOnly></input>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <div align="center"> <h4>DETALLES SOLICITUD</h4></div>
                                            </div>
                                            <div className="card-body" >
                                                <div className="row">
                                                    <div className="p-10 col-lg-6">
                                                        <div className="mb-2 row g-3 align-items-center">
                                                            <div className="col-auto col-lg-3">
                                                                <label className="col-form-label">Fecha creación</label>
                                                            </div>
                                                            <div className="col-auto col-lg-8">
                                                                <input name="marcaTemporal" type="text" className="form-control" value={solicitudData.fecha_creacion === undefined ? "" : solicitudData.fecha_creacion} readOnly></input>
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 row g-3 align-items-center">
                                                            <div className="col-auto col-lg-3">
                                                                <label className="col-form-label">Fecha cierre</label>
                                                            </div>
                                                            <div className="col-auto col-lg-8">
                                                                <input name="marcaTemporal" type="text" className="form-control" value={solicitudData.fecha_cierre === undefined ? "" : solicitudData.fecha_cierre} readOnly></input>
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 row g-3 align-items-center">
                                                            <div className="col-auto col-lg-3">
                                                                <label className="col-form-label">Dependencia</label>
                                                            </div>
                                                            <div className="col-auto col-lg-8">
                                                                <input type="text" className="form-control" value={solicitudData.nombre_dependencia === undefined ? "" : solicitudData.nombre_dependencia} readOnly></input>
                                                            </div>
                                                        </div>
                                                        <div className="row g-3 align-items-center">
                                                            <div className="col-auto col-lg-3">
                                                                <label className="col-form-label">Detalle de la solicitud</label>
                                                            </div>
                                                            <div className="col-auto col-lg-8">
                                                                <textarea className="form-control" value={solicitudData.detalle_solicitud === undefined ? "" : solicitudData.detalle_solicitud} style={{ resize: "none" }} rows="5" cols="40" aria-label="With textarea" readOnly></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <ImagesCarousel></ImagesCarousel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 card">
                                                <div className="card-header">
                                                    <div align="center"> <h4>MOTIVO DE MODIFICACIÓN</h4></div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">MOTIVO MODIFICACIÓN</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" onChange={changeModificacion} id="motivo" name="motivo" className="form-control" aria-describedby="passwordHelpInline" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">DETALLES:</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <textarea className="form-control" onChange={changeModificacion} id="detalles" name="detalles" style={{ resize: "none" }} rows="5" cols="30" aria-label="With textarea"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 card">
                                                <div className="card-header">
                                                    <div align="center"> <h4>REASIGNACION</h4></div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">estado</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <select onChange={handleOnChange} id="estadoSolicitud" name="estado" className="form-select" aria-label="Default select example">
                                                                <option value="seleccione una opción" >seleccione una opción</option>
                                                                <option value="escalado">Escalado</option>
                                                                <option value="solucionado">Solucionado</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-4">
                                                            <label className="col-form-label">Actualmente asignado a:</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={adminEncargado.nombre_funcionario === undefined ? "sin asignar" : adminEncargado.nombre_funcionario + " " + adminEncargado.apellido_funcionario} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">Reasignar a:</label>
                                                        </div>

                                                        <div className="col-auto col-lg-8">
                                                            {solicitudData.solicitud_padre !== null ?
                                                                < select id="reasignacion" name="reasignacion" className="form-select" aria-label="Default select example" disabled>
                                                                    <option value="seleccione una opción">seleccione una opción</option>
                                                                </select>
                                                                : < select id="reasignacion" name="reasignacion" className="form-select" aria-label="Default select example" onChange={reasignar}>
                                                                    <option value="seleccione una opción">seleccione una opción</option>
                                                                    {administradores.map((admin) =>
                                                                        <option value={admin.id} key={admin.id}>
                                                                            {admin.nombre + " " + admin.apellido}
                                                                        </option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <div align="center"> <h4>SOLICITUD PADRE</h4></div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-2 row g-3 align-items-center">
                                                            <div className="col-auto col-lg-6">
                                                                <label className="col-form-label">Identificador de la solicitud padre:</label>
                                                            </div>
                                                            <div className="col-auto col-lg-6">
                                                                {solicitudData.solicitud_padre !== null ?
                                                                    <div className="col-auto col-lg-8 input-group-sm">
                                                                        <input name="solicitudPadre" type="number" value={solicitudData.solicitud_padre} className="form-control" aria-describedby="passwordHelpInline" readOnly />
                                                                    </div> :
                                                                    <div className="col-auto col-lg-8 input-group-sm">
                                                                        <input name="solicitudPadre" type="number" className="form-control" onBlur={validarIdeExistente} aria-describedby="passwordHelpInline" />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 row col-6 mx-auto">
                                            {solicitudData.fecha_cierre === null || solicitudData.solicitud_padre !== null ?
                                                <button className="mb-2  btn btn-secondary" type="button" onClick={sumbitSolicitud}>Guardar</button> :
                                                <button className="mb-2  btn btn-secondary" type="button" disabled >Guardar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div >
                </div >
                : <div>No autorizado</div>
            }
        </>
    );

}

export default Details;