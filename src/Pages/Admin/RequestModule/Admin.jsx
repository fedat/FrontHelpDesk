import React, {useContext} from "react";
import NavSuper from "../../SuperAdmin/Components/Nav";
import Nav from '../Components/Nav/index'
import NavUp from "../Components/Nav/NavUp";
import { Table } from "./Table";
import AuthContext from "../../../contexto/Auth";
const Admin = () => {
    const {admin} = useContext(AuthContext);
    return (
        <>
        {admin?
            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    <Nav></Nav>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4 text-align-center">SOLICITUDES</h1>
                                <div className="card mb-4">
                                    <Table></Table>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div >
         :<div>No autorizado</div>}</>
    );
}

export default Admin;