import React, { useContext, useMemo } from 'react'
import { usePagination, useTable, useGlobalFilter } from 'react-table'
import GlobalFilter from '../Components/ColumnsTables/Filter';
import { useParams } from 'react-router';
import { useFetchData } from "../../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../contexto/Auth';
import { COLUMNS_ADMIN } from '../Components/ColumnsTables/columnsAdmin';
export const Table = () => {
    const { param } = useParams();
    const {identifier} = useContext(AuthContext);
    const { data: DATA } = useFetchData(`/solicitud/admin/${identifier}/estado/${param}`);
    let navigate = useNavigate()
    const columns = useMemo(() => COLUMNS_ADMIN, [])
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
        gotoPage,
        pageCount,
        state,
        prepareRow,
        setGlobalFilter
    } = useTable({
        columns,
        data: DATA,
        initialState: { pageSize: 15 }
    }, useGlobalFilter, usePagination,
    )
    const { globalFilter, pageIndex } = state

    const redirect = (identifier) => {
        navigate(`/request-details/${identifier}`)
    }
    return (
        <>
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
                            prepareRow(row);
                            var estado = row.values.estado;
                            var Color = ""
                            if (estado=="en proceso") {
                                Color="#F9B2B2"
                            } else if(estado=="escalado") {
                                Color="#F9EEB2"
                            }else{
                                Color = "#DDF9B2"
                            }
                            return (
                                <tr style={{backgroundColor:Color }}  {...row.getRowProps()} onClick={() => {
                                    redirect(row.cells[0].value)
                                }}>
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
                    <div class="input-group mb-3">
                        <input className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="number" defaultValue={pageIndex + 1}
                           placeholder="Ir a página"
                           onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber);
                            }} />
</div>
                        <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">anterior</span>
                            </a>
                        </li>
                        <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden="true">Siguiente </span>
                            </a>
                        </li>
                        <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
