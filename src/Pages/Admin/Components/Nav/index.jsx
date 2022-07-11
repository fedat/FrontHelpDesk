import React from "react";
import Logo from "./../../../Styles/Assets/iCANH-logo.png"
import { useNavigate } from "react-router-dom";
const Nav = () => {

    const navigate = useNavigate()
    async function chartRequest(event) {
        navigate("/admin-chart-request");
    };

    async function chartSurvey(event) {
        navigate("/admin-chart-survey");
    };
    async function createRequest(event) {
        navigate("/user-request");
    };
    async function request(elem) {
        navigate(`/admin/${elem}`);
    };
    async function myRequest() {
        navigate(`/user-requests`);
};
    async function password() {
        navigate(`/password`);
    };
    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="bg-primary sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div align="center">
                            <a className="navbar-brand ps-7" href={`/chart-request`}><img src={Logo} alt="..." height="200" /></a>
                        </div>
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading" > MIS SOLICITUDES</div>
                            <a className="nav-link collapsed" name="general" value="generales" onClick={myRequest} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Mis solicitudes
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <a className="nav-link collapsed" name="general" value="generales" onClick={password} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                               Mi contraseña
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="sb-sidenav-menu-heading">ESTADISTICAS</div>
                            <a className="nav-link" onClick={chartSurvey}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Encuesta de satisfacción
                            </a>
                            <a className="nav-link" onClick={chartRequest}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Solicitudes al sistema
                            </a>
                            <div className="sb-sidenav-menu-heading" >SOLICITUDES</div>
                            <a className="nav-link collapsed" name="general" onClick={(e) => request(e.target.name)} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Generales
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <a className="nav-link collapsed" onClick={createRequest} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Crear solicitud
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="sb-sidenav-menu-heading">ASIGNADAS</div>
                            <a className="nav-link collapsed" name="escalado" onClick={(e) => request(e.target.name)} data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Escalado
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <a className="nav-link collapsed" name="solucionado" onClick={(e) => request(e.target.name)} data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Solucionado
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>

                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        ADMIN
                    </div>
                </nav>
            </div>
        </>
    );
}
export default Nav;