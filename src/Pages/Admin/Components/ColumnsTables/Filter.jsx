import React from 'react'
const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <>
            <input type="text"
                className="form-control"
                placeholder="Digita tu búsqueda"
                value={filter || ''}
                onChange={e => {
                    setFilter(e.target.value);
                }}
            />
        </>
    )
}
export default GlobalFilter;
/*import React from 'react'

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            Search:{' '}
            <input type="text"
                className="form-control"
                placeholder="Digita el número de ticket"
                value={filter || ''}
                onChange={e => {
                    setFilter(e.target.value);
                }}
            />
        </span>
    )
}
export default GlobalFilter*/