import React, { useContext, useMemo } from "react";
import { usePagination, useTable, useGlobalFilter } from 'react-table'
import { MODIFICACION_COLUMNS } from '../Components/ColumnsTables/columnModificacion'
import GlobalFilter from '../Components/ColumnsTables/Filter';
import { useParams } from 'react-router';
import { useFetchData } from '../../../Hooks/UseFetch';
import Nav from "../Components/Nav";
import NavUp from "../Components/Nav/NavUp";
import NavRequest from "../Components/Nav/navRequest";
import NavSuper from "../../SuperAdmin/Components/Nav";
import AuthContext from "../../../contexto/Auth";
export const Historial = () => {
    const { id } = useParams();
    const {superAd, admin} = useContext(AuthContext);
    const { data: DATA } = useFetchData(`/modificacion/${id}`);
    const columns = useMemo(() => MODIFICACION_COLUMNS, [])
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
        data:DATA
    }, useGlobalFilter, usePagination,
    )
    const { globalFilter, pageIndex } = state
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
                                    <h1 className="mt-4 text-align-center">HISTORIAL</h1>
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
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map(cell => {
                                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            })}
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
