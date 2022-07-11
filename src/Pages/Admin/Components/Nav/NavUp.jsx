import React, { useContext } from "react";
import AuthContext from "../../../../contexto/Auth";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../../Hooks/UseFetch";
const NavUp = () => {
    const { logOut, identifier } = useContext(AuthContext);
    let navigate = useNavigate();
    const { data } = useFetchData(`/users/${identifier}`);
    const logout = () => {
        logOut();
        navigate("/");
    }

    return (
        <>
            <div className="sb-topnav navbar navbar-expand navbar-dark bg-dark" style={{
                flexDirection: 'row', justifyContent: 'flex-end'
            }}>
                <div style={{color:'#ffffff', margin:'30px'}}>{data.nombre + ' ' + data.apellido}</div>
                <button className="btn btn-secondary" type="button" onClick={logout}>Salir</button>
            </div>
        </>);
}
export default NavUp;