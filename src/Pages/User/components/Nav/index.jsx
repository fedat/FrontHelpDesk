import React from "react";
import Logo from "./../../../Styles/Assets/iCANH-logo.png";
import { useNavigate } from "react-router-dom";
const NavUser = () => {

    const navigate = useNavigate()
    async function createRequest() {
        navigate("/user-request");
    };
    async function request() {
            navigate(`/user-requests`);
    };
    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="bg-primary sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div align="center">
                            <a className="navbar-brand ps-7" ><img src={Logo} alt="..." height="200" /></a>
                        </div>
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading" >SOLICITUDES</div>
                            <a className="nav-link collapsed" name="general" value="generales" onClick={request} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Mis solicitudes
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <a className="nav-link collapsed" onClick={createRequest} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Crear solicitud
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        USER 
                    </div>
                </nav>
            </div>
        </>
    );
}
export default NavUser;