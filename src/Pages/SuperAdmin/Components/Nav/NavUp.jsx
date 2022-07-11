import React, { useContext } from "react";
import AuthContext from "../../../../contexto/Auth";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../../Hooks/UseFetch";
const NavUp = () => {

    const {logOut, admin, superAd, identifier}= useContext(AuthContext);
    const { data } = useFetchData(`/users/${identifier}`);
    let navigate = useNavigate();
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
                <button className="mb-2 btn btn-secondary" type="button" onClick={logout}> Salir</button>
            </div>
        </>);
}
export default NavUp;