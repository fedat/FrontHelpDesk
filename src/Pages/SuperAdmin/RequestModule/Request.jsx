import React, {useContext}from "react";
import NavSuper from "../Components/Nav/index";
import NavUp from "../Components/Nav/NavUp";
import { TableSup } from "./Table"
import AuthContext from "../../../contexto/Auth";
const Request = () => {
    const {superAd} = useContext(AuthContext);
    return (
        <>{superAd ?
            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    <NavSuper></NavSuper>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4 text-align-center">SOLICITUDES</h1>
                                <div className="card mb-4">
                                    <TableSup></TableSup>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div >
            : <div>No autorizado</div>}
        </>);
}

export default Request;