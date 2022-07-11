import React, { useContext, useMemo } from "react";
import { usePagination, useTable, useGlobalFilter } from 'react-table'
import NavSuper from "../Components/Nav/index";
import GlobalFilter from '../../Admin/Components/ColumnsTables/Filter';
import { COLUMNS } from '../../Admin/Components/ColumnsTables/columnsSurveys';
import { useFetchData } from '../../../Hooks/UseFetch';
import NavUp from "../../Admin/Components/Nav/NavUp";
import AuthContext from "../../../contexto/Auth";
const Surveys = () => {
    const {superAd} = useContext(AuthContext);
    const { data: DATA } = useFetchData(`/encuesta`);
    const columns = useMemo(() => COLUMNS, [])
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

    return (
        <>
            {superAd ?
                <div className="sb-nav-fixed">
                    <NavUp></NavUp>
                    <div id="layoutSidenav">
                        <NavSuper></NavSuper>
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid px-4">
                                    <h1 className="mt-4 text-align-center">SOLICITUDES</h1>
                                    <div className="card mb-4">

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
                                                        var caso=row.values.cerrarCaso;
                                                        var color=""
                                                        if(caso){
                                                            color="#DDF9B2"
                                                        }else{
                                                            color="#F9B2B2"
                                                        }
                                                        return (
                                                            <tr  style={{backgroundColor:color}} {...row.getRowProps()}>
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
                                </div>
                            </main>
                        </div>
                    </div>
                </div >
                : <div>No autorizado</div>}</>
    );
}

export default Surveys;