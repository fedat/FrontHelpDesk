import React, { useContext, useMemo } from "react";
import { usePagination, useTable, useGlobalFilter } from 'react-table'
import { useParams } from 'react-router';
import { COLUMNS_HIJAS } from "../Components/ColumnsTables/columnsHijas";
import { useFetchData } from "../../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import GlobalFilter from '../Components/ColumnsTables/Filter';
import Nav from "../Components/Nav";
import NavUp from "../Components/Nav/NavUp";
import NavRequest from "../Components/Nav/navRequest";
import NavSuper from "../../SuperAdmin/Components/Nav";
import AuthContext from "../../../contexto/Auth";
import { config } from "../../../config";
export const ChildRequest = () => {
    const { id } = useParams();
    const {superAd,admin, token} = useContext(AuthContext);
    let navigate = useNavigate();
    const columns = useMemo(() => COLUMNS_HIJAS, [])
    const { data: DATA } = useFetchData(`/solicitud/childs/${id}`);
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

    const redirect = (identifier) => {
        navigate(`/request-details/${identifier}`)
    }
    const deletePadre = async e => {
        const fetchDatos = {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        }
        let data = {};
        try {
            const result = await fetch(config.API_URL + '/solicitud/father/' + e, fetchDatos);
            data = await result.json();
        } catch (error) {
            console.log(error.message)
        }
        navigate('/requests/general')
    };
    return (
        <>
            {superAd || admin ?
                <div className="sb-nav-fixed">
                    <NavUp></NavUp>
                    <div id="layoutSidenav">
                        {superAd ? <NavSuper></NavSuper> : <Nav></Nav>}
                        <div id="layoutSidenav_content">
                            <main>
                                <NavRequest></NavRequest>
                                <div className="container-fluid px-4">
                                    <h1 className="mt-4 text-align-center">SOLICITUDES HIJAS</h1>
                                    <div className="card mb-4"></div>
                                    <div className="card-header">
                                        <div className="form-group lg-4 mx-sm-3 mb-2">
                                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                                            <tbody {...getTableBodyProps()}>
                                                {page.map(row => {
                                                    prepareRow(row)
                                                    return (
                                                        <tr {...row.getRowProps()} onClick={() => {
                                                        }}>
                                                            {row.cells.map(cell => {
                                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            })}
                                                            <td>
                                                                <button onClick={()=>deletePadre(row.cells[0].value)} className="btn btn-primary" type="button">Desvincular del padre</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
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
                            </main>
                        </div>
                    </div>
                </div >
                : <div>No autorizado</div>
            }
        </>
    );
}
