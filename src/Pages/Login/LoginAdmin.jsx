import React, { useContext, useState, useEffect } from 'react';
import LogoGov from '../Styles/Assets/logo-gov.png';
import helpDesk from '../Styles/Assets/helpdesk.png';
import Icanh from '../Styles/Assets/icanh.png';
import { LoginService } from '../../contexto';
import AuthContext from '../../contexto/Auth';
import jwt_decode from "jwt-decode";
import './../Styles/styles.css';
import { useNavigate } from "react-router-dom";
import Swal from '../Admin/Components/Swal';
function Login() {
    const { logIn } = useContext(AuthContext);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const onChangeEmail = (e) => {
        const correo = e.target.value;
        setCorreo(correo);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const redirect = (admin, superAd) => {
        if (admin === true && superAd === false) {
            navigate("/admin/general");
        } else if (superAd === true && admin === false) {
            navigate("/super");
        }
        if (admin === false && superAd === false) {
            navigate("/user-request");
        }
    }
    const handleLogin = async e => {

        e.preventDefault();
        if (correo.trim() === "" || password.trim() === "") {
            Swal.errorLogin();
        } else {
            try {
                const res = await LoginService({ email: correo, password: password });
                const decoded = jwt_decode(res.data.token);
                logIn({
                    token: res.data.token,
                    admin: decoded.roleadmin,
                    superAd: decoded.rolesuper,
                    identifier: decoded.sub
                });
                redirect(decoded.roleadmin, decoded.rolesuper);
            } catch (error) {
                Swal.errorLogin();
            }
        }
    };
    return (
        <>
            <header className='bg-primary'>
                <img style={{ paddingLeft: '15%' }} src={LogoGov} height="40" />
                <div className='container-fluid top-box bg-white mt-3' style={{ height: '100px', width: '100%' }}>
                    <div className='nav-header '>
                        <img style={{ paddingLeft: '30%' }} src={Icanh} height="90" />
                        <img src={helpDesk} height="60" />
                    </div>
                </div>
            </header>
            <div className="bg-gray">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header">
                                                <div align="center">
                                                    <h4 className="">Mesa de ayuda</h4>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <form>
                                                    <div className="form-floating mb-3">
                                                        <input name="correo" className="form-control" type="email"
                                                            onChange={onChangeEmail}
                                                            value={correo}
                                                            
                                                        />
                                                        <label>correo</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input name="password" className="form-control" type="password"
                                                            onChange={onChangePassword}
                                                            value={password}
                                                        />
                                                        <label>contraseña</label>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;