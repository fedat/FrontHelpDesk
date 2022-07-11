import React, { useContext } from "react";
import Logo from "../Styles/Assets/iCANH-logo.png";
import AuthContext from "../../contexto/Auth";
const NotFound = () => {
    const context = useContext(AuthContext);
    const superAd = context.superAd;
    const admin = context.admin;
    return (
        <>
            {superAd || admin ?
                <div>
                    <header className="bg-primary py-1">
                        <div className="container m-1 px-2 ">
                            <div className="text-center text-white">
                                <div className="row">
                                    <div className="col">
                                        <a className="navbar-brand ps-5" href="/admin"><img src={Logo} alt="..." height="250" /></a>
                                    </div>
                                    <div className="col-md-8">
                                        <div>
                                            <h1 className="m-2 text-start display-4 fw-bolder">Mesa de ayuda ICANH</h1>
                                        </div>
                                        <div>
                                            <p className="mt-4 lead fw-normal text-white-50 mb-4">Bienvenido, en la mesa de ayuda del departamento de TI estamos para ayudarte, por favor llena el siguiente formulario para poder atender tu solicitud lo más pronto posible.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header><div className="bg-secondary">
                        <div>
                            <div>
                                <main>
                                    <div className="container-sm mt-8">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-12">
                                                <div className="container-fluid px-4">
                                                    <div className="card mb-1">
                                                        <h1>Página no encontrada</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>No autorizado</div>
            }
        </>);
}
export default NotFound;