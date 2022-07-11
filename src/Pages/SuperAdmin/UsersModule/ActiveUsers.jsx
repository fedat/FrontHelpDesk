import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable, useGlobalFilter } from 'react-table';
import { USER_COLUMNS } from '../../Admin/Components/ColumnsTables/columnsUser';
import GlobalFilter from "../../Admin/Components/ColumnsTables/Filter";
import NavUp from "../Components/Nav/NavUp";
import NavSuper from "../Components/Nav";
import { useFetchData } from "../../../Hooks/UseFetch";
import AuthContext from "../../../contexto/Auth";
const SuperAdmin = () => {
    const {superAd} = useContext(AuthContext);
    const { data: DATA } = useFetchData('/users/active');
    let navigate = useNavigate()
    const columns = useMemo(() => USER_COLUMNS, [])
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

    const createUser = () => {
        navigate(`/super-createUser`)
    }
    const redirect = (identifier) => {
        navigate(`/super-editUser/${identifier}`)
    }
    return (
        <>
            {superAd?
                <div className="sb-nav-fixed">
                    <NavUp></NavUp>
                    <div id="layoutSidenav">
                        <NavSuper></NavSuper>
                        <div id="layoutSidenav_content">
                            <div>
                                <div className="container-fluid px-4">
                                    <h1 className="mt-4 text-align-center">FUNCIONARIOS ICANH</h1>
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <div className="form-group lg-4 mx-sm-3 mb-2 row">
                                                <div className="col-lg-8">
                                                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <button className="btn btn-primary mb-6px" onClick={(createUser)} type="button">AGREGAR</button>
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
                                                <tbody {...getTableBodyProps()}>
                                                    {page.map(row => {
                                                        prepareRow(row)
                                                        return (
                                                            <tr  {...row.getRowProps()} onClick={() => {
                                                                redirect(row.cells[0].value)
                                                            }}>
                                                                {row.cells.map(cell => {
                                                                    return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            :<div>No autorizado</div>}</>
    );
}
export default SuperAdmin;