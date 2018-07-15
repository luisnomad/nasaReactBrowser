import axios from 'axios';

const fetchData = (criteria = '') => {
    const ENDPOINT = `https://images-api.nasa.gov/search?q=${criteria}&media_type=image`;
    const request = axios.get(ENDPOINT);

    return {
        type: 'FETCH_DATA',
        payload: request
    }
};

export default fetchData;