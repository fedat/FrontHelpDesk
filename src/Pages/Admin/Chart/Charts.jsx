import React, { useContext, useState, useEffect } from "react";
import { useFetchData } from "../../../Hooks/UseFetch";
import Nav from '../Components/Nav/index';
import NavUp from "../Components/Nav/NavUp";
import NavSuper from "../../SuperAdmin/Components/Nav";
import ChartsPie from '../Components/Charts/ChartsPie';
import ChartsDon from '../Components/Charts/ChartsDon';
import ChartsBar from "../Components/Charts/ChartsBar";
import AuthContext from "../../../contexto/Auth";

const ChartsByAdmin = () => {
    const {superAd, admin, identifier} = useContext(AuthContext);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let marcaTemporal = new Date().toLocaleDateString("es-LA", options)
    const [chartData, setChartData] = useState({});
    const [charDonuData, setChartDonuData] = useState({});
    const [charBartData, setChartBarData] = useState({});
    const { data } = useFetchData(`/chart/admin/estado/${identifier}`);
    const { data: dataTipo } = useFetchData(`/chart/admin/tipo/${identifier}`);
    const { data: dataDep } = useFetchData(`/chart/admin/dependencia/${identifier}`);
    console.log()
    useEffect(() => {
        setChartData({
            labels: data.map((estado) => estado.estado),
            datasets: [
                {
                    data: data.map((estado) => estado.cantidad),
                    backgroundColor: [

                        "#C14F37",
                        "#FFDC18",
                        "#1CC640"
                    ]
                }
            ]
        });
        setChartDonuData({
            labels: dataTipo.map((tipo) => tipo.nombre_tipo),
            datasets: [
                {
                    data: dataTipo.map((tipo) => tipo.cantidad),
                    backgroundColor: [
                        "#1CB8C6",
                        "#9651C8"
                    ]
                }
            ]
        });
        setChartBarData({
            labels: dataDep.map((dependencia) => dependencia.nombre_dependencia),
            datasets: [
                {
                    label: "Cantidad de solicitudes",
                    data: dataDep.map((dependencia) => dependencia.cantidad),
                    backgroundColor: "#F477E3"
                }
            ]
        });
    }, [data, dataTipo, dataDep])

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
                                    <h1 align="center">SOLICITUDES DEL SISTEMA </h1>
                                    <div className="card mb-4"></div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <i className="fas fa-chart-bar me-1"></i>
                                                    Estado de solicitudes asignadas
                                                </div>
                                                <div className="card-body"><ChartsPie chartData={chartData}></ChartsPie></div>
                                                <div className="card-footer small text-muted">Actualizado {marcaTemporal} </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <i className="fas fa-chart-pie me-1"></i>
                                                    Tipo de soporte de solicitudes asignadas
                                                </div>
                                                <div className="card-body">
                                                    <ChartsDon chartData={charDonuData}></ChartsDon>
                                                </div>
                                                <div className="card-footer small text-muted">Actualizado {marcaTemporal}</div>
                                            </div>
                                        </div>
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-pie me-1"></i>
                                                Solicitudes asignadas por dependencia
                                            </div>
                                            <div className="card-body">
                                                <ChartsBar chartData={charBartData}></ChartsBar>
                                            </div>
                                            <div className="card-footer small text-muted">Actualizado {marcaTemporal}</div>
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
export default ChartsByAdmin;