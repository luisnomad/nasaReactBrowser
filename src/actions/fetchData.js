import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';

const fetchData = (criteria = '', url = '') => {
    const ENDPOINT = `https://images-api.nasa.gov/search?q=${criteria}&media_type=image,video`;
    const request = axios.get(url !== '' ? url : ENDPOINT);

    return {
        type: FETCH_DATA,
        payload: request
    }
};

export default fetchData;