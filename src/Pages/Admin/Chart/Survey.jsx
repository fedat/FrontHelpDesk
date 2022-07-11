import React, { useContext, useState, useEffect } from "react";
import { useFetchData } from "../../../Hooks/UseFetch";
import Nav from '../Components/Nav/index'
import NavUp from "../Components/Nav/NavUp";
import NavSuper from "../../SuperAdmin/Components/Nav";
import AuthContext from "../../../contexto/Auth";
import ChartsPie from "../Components/Charts/ChartsPie";

const SurveyByAdmin = () => {
    const { superAd, admin, identifier } = useContext(AuthContext);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let marcaTemporal = new Date().toLocaleDateString("es-LA", options)
    const [chartDataCase, setChartDataCase] = useState({});
    const [chartDataTec, setChartDataTec] = useState({});
    const { data: ratingCase } = useFetchData(`/chart/admin/survey-case/${identifier}`);
    const { data: ratingTec } = useFetchData(`/chart/admin/survey-tec/${identifier}`);

    useEffect(() => {
        setChartDataCase({
            labels: ratingCase.map((ratCase) => "calificación " + ratCase.calificacion_caso+" puntos"),
            datasets: [
                {
                    data: ratingCase.map((ratCase) => ratCase.cantidad),
                    backgroundColor: [
                        "#C14F37",
                        "#FFDC18",
                        "#1CC640",
                        "#1CB8C6",
                        "#9651C8"
                    ]
                }
            ]
        });

        setChartDataTec({
            labels: ratingTec.map((ratTec) => "calificación " + ratTec.calificacion_tecnico+" puntos"),
            datasets: [
                {
                    data: ratingTec.map((ratCase) => ratCase.cantidad),
                    backgroundColor: [
                        "#C14F37",
                        "#FFDC18",
                        "#1CC640",
                        "#1CB8C6",
                        "#9651C8"
                    ]
                }
            ]
        });
    }, [ratingCase, ratingTec])
    return (
        <>
            {superAd || admin ?
                <div className="sb-nav-fixed">
                    <NavUp></NavUp>
                    <div id="layoutSidenav">
                        {superAd ? <NavSuper></NavSuper> : <Nav></Nav>}
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid px-4">
                                    <h1 align="center">ENCUESTA DE SATISFACCIÓN </h1>
                                    <div className="card mb-4"></div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <i className="fas fa-chart-bar me-1"></i>
                                                    Calificaciones a casos resueltos
                                                </div>
                                                <div className="card-body"><ChartsPie chartData={chartDataCase}></ChartsPie></div>
                                                <div className="card-footer small text-muted">Actualizado {marcaTemporal} </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <i className="fas fa-chart-bar me-1"></i>
                                                    calificaciones a tecnicos
                                                </div>
                                                <div className="card-body"><ChartsPie chartData={chartDataTec}></ChartsPie></div>
                                                <div className="card-footer small text-muted">Actualizado {marcaTemporal} </div>
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
export default SurveyByAdmin;