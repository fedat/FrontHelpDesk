import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../Hooks/UseFetch";
import AuthContext from "../../contexto/Auth";
import NavUp from "./components/Nav/NavUp";
import NavUser from "./components/Nav/index";
import NavSuper from "../SuperAdmin/Components/Nav";
import Nav from "../Admin/Components/Nav";
import { Rating } from 'react-simple-star-rating'
import { config } from "../../config";
import Swal from "./components/Swal";
const SatisfactionSurvey = () => {
    const { id } = useParams();
    const { token, superAd, admin } = useContext(AuthContext);
    const { data: encuesta } = useFetchData(`/encuesta/${id}`);
    var readonly = false;
    let navigate = useNavigate()
    const [ratingCase, setRatingCase] = useState(0)

    const [ratingTechnician, setRatingTechnician] = useState(0)
    const [Survey, setSurvey] = useState({
        noTicket: parseInt(id),
        calificacionCaso: 0,
        calificacionTecnico: 0,
        cerrarCaso: false,
        fecha_respuesta: new Date().toISOString(),
    });
    const handleRatingCase = (rate) => {
        var convertedRate = rate * 0.05;
        setRatingCase(convertedRate);
        setSurvey({ ...Survey, calificacionCaso: convertedRate })
    };
    const handleRatingTechnician = (rate) => {
        var convertedRate = rate * 0.05
        setRatingTechnician(convertedRate);
        setSurvey({ ...Survey, calificacionTecnico: convertedRate })
    }
    const validateCase = () => {
        let reOpen = document.querySelector("#reopen").checked;
        if (reOpen) {
            setSurvey({ ...Survey, cerrarCaso: true })
        } else {
            setSurvey({ ...Survey, cerrarCaso: false })
        }
        console.log(reOpen);
    }
    const validateSurvey = () => {
        if (ratingCase !== 0 && ratingTechnician !== 0)
            return true;
        else
            return false
    }
    const onSubmitSurvey = async (e) => {
        e.preventDefault();
        let data = {};
        let fetchDatos = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Survey),
        };
        console.log(fetchDatos.body)
        if (validateSurvey() === true) {
            try {
                const result = await fetch(config.API_URL + '/encuesta', fetchDatos);
                data = await result.json();
                Swal.exitoSurvey();
                navigate('/user-requests');
            } catch (error) {
                console.log(error);
                Swal.errorSurvey();
            }
        } else {
            Swal.errorSurvey();
        }
    }
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
                                            <div className="row">
                                                <div className="col-lg-6" align="center"> <h4>ENCUESTA DE SATISFACCION CASO {id}</h4></div>
                                            </div>
                                        </div>
                                        <div className="card-body">

                                            <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                                <h5>Califique la resolución del caso siendo 1 estrella la calificación más baja y 5 estrellas la calificación más alta.</h5>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">Calificación caso</label>
                                                    </div>
                                                    {!encuesta.cerrarCaso ? readonly = true : readonly = false}
                                                    <div className="col-auto col-lg-8">
                                                        <Rating showTooltip
                                                            readonly={readonly}
                                                            name="simple-controlled"
                                                            
                                                            onClick={(newValue1) => {
                                                                handleRatingCase(newValue1);
                                                           }}
                                                            initialValue={encuesta.calificacionCaso}
                                                            fillColorArray={['#9C2020', '#BD7E22', '#BDA322', '#BDBD22', '#80BD22']}
                                                        />
                                                    </div>
                                                </div>
                                                <h5>Califique la atención prestada por el técnico siendo 1 estrella la calificación más baja y 5 estrellas la calificación más alta.</h5>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">Calificación técnico</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <Rating showTooltip
                                                            readonly={readonly}
                                                            name="simple-controlled"
                                                            
                                                            onClick={(newValue2) => {
                                                                handleRatingTechnician(newValue2);
                                                            }}
                                                            initialValue={encuesta.calificacionTecnico}
                                                         fillColorArray={['#9C2020', '#BD7E22', '#BDA322', '#BDBD22', '#80BD22']}
                                                        />
                                                    </div>
                                                </div>
                                                <h5>Si no está coforme con la atención prestada, reabra el caso seleccionando la casilla que se encuentra a continuación: </h5>
                                                <div className="mb-2 row g-3 align-items-center">
                                                    <div className="col-auto col-lg-3">
                                                        <label className="col-form-label">Reabrir caso</label>
                                                    </div>
                                                    <div className="col-auto col-lg-8">
                                                        <div className="m-2 form-check">
                                                            <div className="form-check form-check-inline">
                                                                {readonly ? <input className="form-check-input" checked onChange={validateCase} type="checkbox" id="reopen" /> :
                                                                    <input className="form-check-input" onChange={validateCase} type="checkbox" id="reopen" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-grid gap-2 col-6 mx-auto">
                                            <button className="btn btn-primary mb-6px" onClick={onSubmitSurvey} type="button" disabled={readonly}>Enviar encuesta</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

        </>);
}
export default SatisfactionSurvey;