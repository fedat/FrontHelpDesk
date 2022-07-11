import React, { useContext, useState, useEffect } from "react";
import { useFetchData } from "../../../Hooks/UseFetch";
import AuthContext from "../../../contexto/Auth";
import NavUp from "../Components/Nav/NavUp";
import NavSuper from "../Components/Nav";
import ChartsBar from "../../Admin/Components/Charts/ChartsBar";

const ChartsSuper = () => {
    const context = useContext(AuthContext);
    const superAd = context.superAd;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let marcaTemporal = new Date().toLocaleDateString("es-LA", options)
    const [charBartData, setChartBarData] = useState({});
    const { data } = useFetchData(`/chart/estado`);
    const { data: dataTipo } = useFetchData(`/chart/tipo`);
    const { data: dataDep } = useFetchData(`/chart/asignaciones`);
    console.log()
    useEffect(() => {
        setChartBarData({
            labels: dataDep.map((asignacion) => (asignacion.nombre_funcionario + ' ' + asignacion.apellido_funcionario)),
            datasets: [
                {
                    label: "Cantidad de asignaciones",
                    data: dataDep.map((asignacion) => asignacion.cantidad),
                    backgroundColor: "#9B54F1"
                }
            ]
        });
    }, [data, dataTipo, dataDep])

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
                                <h1 align="center">INFORMACION ASIGNACIONES </h1>
                                    <div className="card mb-4"></div>
                                    <div className="row">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-pie me-1"></i>
                                                Solicitudes asignadas por administrador
                                            </div>
                                            <div className="card-body">
                                                <ChartsBar chartData={charBartData}></ChartsBar>
                                            </div>
                                            <div className="card-footer small text-muted">Actualizado {marcaTemporal}</div>
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
export default ChartsSuper;