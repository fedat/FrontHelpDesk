import React from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import {Nav} from "react-bootstrap";
const NavRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Nav variant="tabs" className="mb-2">
            <Nav.Item>
                <Nav.Link href={`/request-details/${id}`} >DETALLES</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href={`/request-historial/${id}`}>HISTORIAL</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href={`/request-childs/${id}`}>SOLICITUDES HIJAS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href={`/survey-details/${id}`}>ENCUESTA</Nav.Link>
            </Nav.Item>
        </Nav>
    );

}
export default NavRequest
