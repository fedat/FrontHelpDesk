import { useContext, useState, useEffect } from 'react';
import { config } from "../config";
import AuthContext from '../contexto/Auth';
export const useFetchData = (URL = '', error_msg = 'An error has ocurred getting the data') => {
    const [fetch_data, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const context = useContext(AuthContext);
    const token = context.token;
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    };
    const fetchData = async () => {
        setLoading(true);
        //Pedimos los datos a la api
        try {
            const response = await window.fetch(config.API_URL + URL, requestOptions);
            if (!response.ok) {
                throw new Error(`Http status ${response.status}`);
                //console.error(`Http status ${response.status}`);
            }
            const data = await response.json();
            if (data) {
                setFetchData(data);
            }

        } catch (error) {
            //Si hay un error ...
            console.error(error.message);
            setError(error_msg)
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchData()
    }, [URL]); //Hacer enfasis en la url
    return { data: fetch_data, loading, error };
}