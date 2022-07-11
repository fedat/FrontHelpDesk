import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable, useGlobalFilter } from 'react-table';
import { SOLICITUDES_COLUMNS } from './components/ColumnsTable/columnsSolicitudes';
import GlobalFilter from "../Admin/Components/ColumnsTables/Filter";
import NavUp from "./components/Nav/NavUp";
import NavUser from "./components/Nav/index";
import NavSuper from "../SuperAdmin/Components/Nav";
import Nav from "../Admin/Components/Nav";
import { useFetchData } from "../../Hooks/UseFetch";
import AuthContext from "../../contexto/Auth";
const RequestsUser = () => {
    const { identifier, admin, superAd } = useContext(AuthContext);
    const { data: DATA } = useFetchData(`/solicitud/user/${identifier}`);
    let navigate = useNavigate()
    var estado = "";
    var solicitudId = 0;
    const columns = useMemo(() => SOLICITUDES_COLUMNS, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
        setGlobalFilter
    } = useTable({
        columns,
        data: DATA
    }, useGlobalFilter, usePagination,
    )
    const { globalFilter, pageIndex } = state

    const createSolicitud = () => {
        navigate(`/user-request`)
    };
    const encuestaSatisfaccion = (identifier) => {
        navigate(`/user-survey/${identifier}`)
    }
    return (
        <>
            <div className="sb-nav-fixed">
                <NavUp></NavUp>
                <div id="layoutSidenav">
                    {superAd ? <NavSuper></NavSuper> : admin ? <Nav></Nav> : <NavUser></NavUser>}
                    <div id="layoutSidenav_content">
                        <div>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4 text-align-center">ENCUESTAS DE MIS SOLICITUDES</h1>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="form-group lg-4 mx-sm-3 mb-2 row">
                                            <div className="col-lg-8">
                                                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                            </div>
                                            <div className="col-lg-4">
                                                <button className="btn btn-primary mb-6px" onClick={(createSolicitud)} type="button">CREAR</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-hover" {...getTableProps()}>
                                            <thead>
                                                {headerGroups.map(headerGroup => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map(column => (
                                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody  {...getTableBodyProps()}>
                                                {page.map(row => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr id="solicitud" {...row.getRowProps()} value={row.values.noTicket}>
                                                            {
                                                                row.cells.map(cell => {
                                                                    estado = row.cells[4].value;
                                                                    return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                                                                })
                                                            }
                                                            {
                                                                estado !== "solucionado" ?
                                                                    <td>
                                                                        <button className="btn btn-primary" type="button" disabled>Encuesta</button>
                                                                    </td> :
                                                                    <td>
                                                                        <button className="btn btn-primary" onClick={() => {
                                                                            encuestaSatisfaccion(row.cells[0].value)
                                                                        }
                                                                        }
                                                                            type="button">Encuesta</button>
                                                                    </td>
                                                            }
                                                        </tr>
                                                    )
                                                }
                                                )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <span>
                                                Page{' '}
                                                <strong>
                                                    {pageIndex + 1} of {pageOptions.length}
                                                </strong>{' '}
                                            </span>
                                        </div>
                                        <nav className="col-lg-4" aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                                    <a className="page-link" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo; anterior</span>
                                                    </a>
                                                </li>
                                                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                                                    <a className="page-link" aria-label="Next">
                                                        <span aria-hidden="true">Siguiente &raquo; </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RequestsUser;