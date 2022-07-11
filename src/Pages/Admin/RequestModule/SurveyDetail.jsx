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

const SurveyDetail = () => {
    const { id } = useParams();
    const {superAd, admin, token} = useContext(AuthContext);
    const { data } = useFetchData(`/encuesta/${id}`);
    const [encuesta, setEncuesta] = useState({
        calificacionCaso: "",
        calificacionTecnico: "",
        fechaRespuesta: "",
        cerrarCaso: false
    })

    useEffect(() => {
        setEncuesta({
            calificacionCaso: data.calificacionCaso,
            calificacionTecnico:data.calificacionTecnico,
            fechaRespuesta:data.fecha_respuesta,
            cerrarCaso:data.cerrarCaso
        });
    }, [data]);
    console.log(data)
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
                                        <div className="card">
                                            <div className="card-header">
                                                <div align="center"> <h4>ENCUESTA DE SATISFACCION SOLICITUD No {id}</h4></div>
                                            </div>
                                            <div className="card-body" >
                                                <div className="p-10 col-lg-12">
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">Calificación caso</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input name="marcaTemporal" type="text" className="form-control" value={encuesta.calificacionCaso===""? "no se ha respondido la encuesta":encuesta.calificacionCaso} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">Calificación técnico</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={encuesta.calificacionTecnico===""? "no se ha respondido la encuesta":encuesta.calificacionTecnico} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">Fecha atención</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input name="marcaTemporal" type="text" className="form-control" value={encuesta.fechaRespuesta===""? "no se ha respondido la encuesta":encuesta.fechaRespuesta} readOnly></input>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 row g-3 align-items-center">
                                                        <div className="col-auto col-lg-3">
                                                            <label className="col-form-label">Caso cerrado</label>
                                                        </div>
                                                        <div className="col-auto col-lg-8">
                                                            <input type="text" className="form-control" value={encuesta.cerrarCaso===undefined?"no se ha cerrado el caso":"se cerró el caso"} readOnly></input>
                                                        </div>
                                                    </div>

                                                </div>
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
        </>
    );

}

export default SurveyDetail;